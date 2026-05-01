import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, userName } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Mock response for demonstration when no API key is provided
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate loading
      
      const mockResponse = {
        insight: `Om Swastyastu ${userName}! I have crafted this perfect itinerary considering the specific details you shared. The balance of culture, relaxation, and adventure is ideal for a memorable stay in Bali.`,
        days: [
          {
            day: 1,
            title: "Arrival & Serene Beginnings in Ubud",
            activities: [
              {
                time: "14:00",
                description: "Arrival at Ngurah Rai International Airport. Private transfer to your luxury villa in Ubud.",
              },
              {
                time: "16:30",
                description: "Settle in and enjoy a welcome traditional Balinese massage at the villa.",
              },
              {
                time: "19:00",
                description: "Welcome dinner at Locavore NXT, featuring hyper-local modern cuisine.",
              }
            ]
          },
          {
            day: 2,
            title: "Cultural Immersion & Rice Terraces",
            activities: [
              {
                time: "08:00",
                description: "Morning yoga session overlooking the lush jungle.",
              },
              {
                time: "10:00",
                description: "Guided walk through the iconic Tegalalang Rice Terrace. Don't forget your camera!",
              },
              {
                time: "13:00",
                description: "Lunch at a local warung overlooking the valley.",
              },
              {
                time: "15:30",
                description: "Visit the sacred Tirta Empul Temple for a traditional water purification ceremony (Melukat).",
              }
            ]
          },
          {
            day: 3,
            title: "Coastal Charm & Farewell",
            activities: [
              {
                time: "09:00",
                description: "Transfer to Seminyak for a change of scenery.",
              },
              {
                time: "11:00",
                description: "Relax at a premium beach club like Potato Head.",
              },
              {
                time: "17:00",
                description: "Sunset cocktails followed by a seafood feast at Jimbaran Bay.",
              }
            ]
          }
        ]
      };
      
      return NextResponse.json(mockResponse);
    }

    // Real Gemini integration
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemInstruction = `You are Bli Tourah, a friendly, professional Balinese travel concierge. 
    The user's name is ${userName}. 
    Craft a hyper-personalized daily itinerary based on their input.
    Respond strictly in JSON format with the following structure:
    {
      "insight": "A specific warning or tip as Bli Tourah",
      "days": [
        {
          "day": 1,
          "title": "Title of the day",
          "activities": [
            {
              "time": "HH:MM",
              "description": "Activity description"
            }
          ]
        }
      ]
    }`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: systemInstruction + "\n\nUser Input: " + prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const text = result.response.text();
    const jsonResponse = JSON.parse(text);

    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error("Error generating itinerary:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary. Please try again." },
      { status: 500 }
    );
  }
}
