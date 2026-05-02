import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  console.log("POST /api/generate started (Gemini 3 SDK)");
  try {
    const { prompt, userName } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Please tell Bli Tourah your travel plans." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing, returning mock response.");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      return NextResponse.json({
        insight: `Om Swastyastu ${userName || "Traveler"}! I have crafted this perfect itinerary considering the specific details you shared. The balance of culture, relaxation, and adventure is ideal for a memorable stay in Bali.`,
        days: [
          {
            day: 1,
            title: "Arrival & Serene Beginnings in Ubud",
            recommended_restaurant: {
              name: "Warung Bambu Ubud",
              cuisine: "Traditional Balinese",
              why_its_good: "Authentic flavors in a peaceful bamboo setting, perfect for your first night."
            },
            activities: [
              { 
                time: "14:00", 
                title: "Airport Arrival & Transfer",
                location: "Ngurah Rai International Airport",
                start_time: "14:00",
                end_time: "16:00",
                description: "Arrival at Ngurah Rai International Airport. Private transfer to your luxury villa in Ubud." 
              },
              { 
                time: "16:30", 
                title: "Welcome Massage",
                location: "Your Villa in Ubud",
                start_time: "16:30",
                end_time: "18:00",
                description: "Settle in and enjoy a welcome traditional Balinese massage at the villa." 
              },
              { 
                time: "19:00", 
                title: "Welcome Dinner at Locavore NXT",
                location: "Locavore NXT, Ubud",
                start_time: "19:00",
                end_time: "21:30",
                description: "Welcome dinner at Locavore NXT, featuring hyper-local modern cuisine." 
              }
            ]
          }
        ]
      });
    }

    // New @google/genai SDK implementation
    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `You are Bli Tourah, a seasoned Balinese local travel concierge with deep knowledge of Bali's culture, hidden gems, and traditions. 
    The user's name is ${userName || "Traveler"}. 
    
    PERSONALITY:
    - Extremely helpful, warm, professional, and spiritual.
    - You treat every traveler like family.
    - You use Balinese greetings and expressions naturally:
        * Start with "Om Swastyastu".
        * Use "Suksma" for thank you.
        * Use "Astungkara" for "God willing" or "Hopefully".
    
    GOAL:
    Craft a hyper-personalized daily itinerary based on the user's input (days, budget, companions, preferences, and things to avoid).
    
    RESPONSE FORMAT:
    Respond strictly in JSON format with the following structure:
    {
      "insight": "A specific local warning or tip as Bli Tourah (e.g., traffic tips, local etiquette, or a hidden spot)",
      "days": [
        {
          "day": 1,
          "title": "Short poetic title for the day",
          "recommended_restaurant": {
            "name": "Name of a real, family-friendly local restaurant",
            "cuisine": "Type of food",
            "why_its_good": "1 sentence on why it fits this family's constraints."
          },
          "activities": [
            {
              "time": "HH:MM",
              "title": "Short title for the activity (for calendar)",
              "location": "Specific location name",
              "start_time": "HH:MM",
              "end_time": "HH:MM",
              "description": "Activity description (be descriptive and include local flavor)"
            }
          ]
        }
      ]
    }`;

    // Using the exact syntax and model from your documentation
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: "system", parts: [{ text: systemInstruction }] },
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    console.log("Gemini 3 response received");
    
    const text = result.text;
    if (!text) {
      throw new Error("No response text from Bli Tourah.");
    }

    // Clean up potential markdown formatting
    const jsonString = text.replace(/```json\n?|```/g, "").trim();
    const jsonResponse = JSON.parse(jsonString);

    console.log("Successfully parsed JSON response");
    return NextResponse.json(jsonResponse);

  } catch (error: unknown) {
    console.error("Error in /api/generate:", error);
    const errorMessage = error instanceof Error ? error.message : "Bli Tourah is having trouble connecting to the spirits. Please try again later.";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
