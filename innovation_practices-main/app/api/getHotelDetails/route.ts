import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

if (!apiKey) console.error("❌ Missing GEMINI_API_KEY in environment variables.");

const genAI = new GoogleGenerativeAI(apiKey);

// Utility function to handle exponential backoff
async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error: any) {
            if (error.status === 429 && i < retries - 1) {
                console.warn(`⚠️ 429 Too Many Requests. Retrying in ${delay}ms...`);
                await new Promise((res) => setTimeout(res, delay));
                delay *= 2; // Increase delay for next retry
            } else {
                throw error;
            }
        }
    }
    throw new Error("❌ Exceeded retry attempts due to 429 Too Many Requests");
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const hotelName = searchParams.get("name");

        if (!hotelName) {
            return NextResponse.json({ error: "No hotel name provided" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `Provide detailed information about the hotel "${hotelName}", including:
        - "name" (string)
        - "location" (string)
        - "amenities" (array of strings)
        - "nearby_attractions" (array of strings)
        - "ratings" (object with "score" (number) and "reviews" (array of strings))
        - "price_range" (string)
        - "booking_options" (array of strings)
        -"rules"(string)
        -"description"(string)
        -"address"(string)
        -"features"(string)
        
        Format the response as a valid JSON object.`;

        // 🛑 Retry API call with backoff if 429 is encountered
        const result = await retryWithBackoff(() => model.generateContent(prompt));

        let responseText = await result.response.text();
        responseText = responseText.replace(/```json|```/g, "").trim(); // ✅ Fix AI JSON formatting

        console.log("🔍 AI Hotel Response:", responseText);

        let response;
        try {
            response = JSON.parse(responseText);
        } catch (parseError) {
            console.error("❌ JSON Parsing Error:", parseError);
            return NextResponse.json({ error: "Invalid JSON received from AI" }, { status: 500 });
        }

        return NextResponse.json({ details: response });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
