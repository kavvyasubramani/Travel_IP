import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
const unsplashKey = process.env.UNSPLASH_API_KEY ?? "";

if (!apiKey) console.error("❌ Missing GEMINI_API_KEY in environment variables.");
if (!unsplashKey) console.error("❌ Missing UNSPLASH_API_KEY in environment variables.");

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Fetch images for multiple queries from Unsplash in parallel.
 */
async function fetchImagesFromUnsplash(queries: string[]): Promise<Record<string, string>> {
    const imageMap: Record<string, string> = {};

    await Promise.all(
        queries.map(async (query) => {
            try {
                const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashKey}`;
                const res = await fetch(url);
                const data = await res.json();

                console.log(`🖼️ Fetched image for ${query}:`, data?.urls?.regular);
                imageMap[query] = data.urls?.regular || "/fallback.jpg";
            } catch (error) {
                console.error(`❌ Error fetching image for ${query}:`, error);
                imageMap[query] = "/fallback.jpg"; // Fallback image
            }
        })
    );

    return imageMap;
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const destination = searchParams.get("name");

        if (!destination) {
            return NextResponse.json({ error: "No destination provided" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `Provide a detailed travel guide for ${destination}, including:
        - Location (country and coordinates)
        - Top attractions (minimum 6)
        - Best time to visit
        - Activities
        - Local cuisine
        - Travel tips
        - Top hotels (minimum 6 with name and brief description)

        Format: JSON object with keys:
        - "location" (object with "country" and "coordinates" {latitude, longitude})
        - "popular_attractions" (array of objects {name, description})
        - "best_time_to_visit" (string)
        - "activities" (array of objects {name, description})
        - "local_cuisine" (array of objects {name, description})
        - "travel_tips" (array of objects {tip, description})
        - "hotels" (array of objects {name, description})`;

        const result = await model.generateContent(prompt);
        let responseText = await result.response.text();
        responseText = responseText.replace(/```json|```/g, "").trim(); // Remove Markdown formatting

        console.log("🔍 AI Response:", responseText);

        let response;
        try {
            response = JSON.parse(responseText);
        } catch (parseError) {
            console.error("❌ JSON Parsing Error:", parseError);
            return NextResponse.json({ error: "Invalid JSON received from AI" }, { status: 500 });
        }

        // ✅ Fetch images for attractions, hotels, and local cuisine
        const attractionNames = response.popular_attractions?.map((a: { name: string }) => a.name) || [];
        const hotelNames = response.hotels?.map((h: { name: string }) => h.name) || [];
        const cuisineNames = response.local_cuisine?.map((c: { name: string }) => c.name) || [];
        const allQueries = [...attractionNames, ...hotelNames, ...cuisineNames];

        const imageMap = await fetchImagesFromUnsplash(allQueries);

        // ✅ Assign images to attractions
        if (response.popular_attractions) {
            response.popular_attractions.forEach((attraction: { name: string; image?: string }) => {
                attraction.image = imageMap[attraction.name] || "/fallback.jpg";
            });
        }

        // ✅ Assign images to hotels
        if (response.hotels) {
            response.hotels.forEach((hotel: { name: string; image?: string }) => {
                hotel.image = imageMap[hotel.name] || "/fallback.jpg";
            });
        }

        // ✅ Assign images to local cuisine
        if (response.local_cuisine) {
            response.local_cuisine.forEach((dish: { name: string; image?: string }) => {
                dish.image = imageMap[dish.name] || "/fallback.jpg";
            });
        }

        return NextResponse.json({ details: response });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
