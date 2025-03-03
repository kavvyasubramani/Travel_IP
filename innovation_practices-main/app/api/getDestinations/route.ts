import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_API_KEY!;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    console.log("Received query:", query);

    if (!query) {
        return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `Suggest 10 must-visit destinations for the query: "${query}". Provide a short description for each.
        Format: JSON array with objects containing "name" and "description".`;

        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        console.log("Raw AI Response:", responseText);

        const jsonData = responseText.replace(/```json|```/g, "").trim();

        let destinations;
        try {
            destinations = JSON.parse(jsonData);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError);
            return NextResponse.json({ error: "Invalid JSON received from AI" }, { status: 500 });
        }

        // Fetch images for each destination
        const destinationsWithImages = await Promise.all(
            destinations.map(async (destination: { name: string; description: string }) => {
                const imageUrl = await fetchImage(destination.name);
                return { ...destination, imageUrl };
            })
        );

        return NextResponse.json({ destinations: destinationsWithImages });
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
    }
}

// Function to fetch images from Unsplash
const fetchImage = async (destinationName: string): Promise<string> => {
    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(destinationName)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
        );
        const data = await response.json();
        return data.results[0]?.urls?.regular || "/placeholder.jpg";
    } catch (error) {
        console.error("Error fetching image:", error);
        return "/placeholder.jpg";
    }
};
