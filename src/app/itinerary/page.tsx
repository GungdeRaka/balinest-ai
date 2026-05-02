"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Activity {
  time: string;
  description: string;
}

interface DayPlan {
  day: number;
  title: string;
  activities: Activity[];
}

interface ItineraryResponse {
  insight: string;
  days: DayPlan[];
}

export default function ItineraryPage() {
  const [userName, setUserName] = useState("Traveler");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [error, setError] = useState("");
  
  const MAX_CHARS = 1000;

  useEffect(() => {
    // Read the username from localStorage
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("balinest_username");
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, []);

  const handleGenerate = async () => {
    if (!userInput.trim() || userInput.length > MAX_CHARS) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput, userName }),
      });
      
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response received:", text);
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      if (!response.ok) {
        throw new Error(data?.error || `Failed to generate itinerary (${response.status})`);
      }
      
      setItinerary(data);
    } catch (err: any) {
      console.error("Itinerary generation error details:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setItinerary(null);
    setUserInput("");
    setError("");
  };

  const avatarSrc = isLoading ? "/bli-tourah-panic.png" : "/bli-tourah-smile.png";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-6 relative overflow-hidden font-sans">
      {/* Gapura Transition Overlay */}
      <div className="fixed inset-0 z-50 flex pointer-events-none">
        {/* Left Gate */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="w-1/2 h-full bg-gradient-to-r from-background to-maroon border-r-4 border-gold shadow-[10px_0_30px_rgba(0,0,0,0.8)] relative"
        >
          {/* Gate Detailing Placeholder */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-[url('/pattern-placeholder.png')] opacity-20"></div>
          <div className="absolute right-4 top-1/4 w-12 h-12 bg-gold rotate-45 transform origin-center"></div>
          <div className="absolute right-4 top-2/4 w-12 h-12 bg-gold rotate-45 transform origin-center"></div>
          <div className="absolute right-4 top-3/4 w-12 h-12 bg-gold rotate-45 transform origin-center"></div>
        </motion.div>

        {/* Right Gate */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="w-1/2 h-full bg-gradient-to-l from-background to-maroon border-l-4 border-gold shadow-[-10px_0_30px_rgba(0,0,0,0.8)] relative"
        >
          {/* Gate Detailing Placeholder */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-[url('/pattern-placeholder.png')] opacity-20"></div>
          <div className="absolute left-4 top-1/4 w-12 h-12 bg-gold rotate-45 transform origin-center"></div>
          <div className="absolute left-4 top-2/4 w-12 h-12 bg-gold rotate-45 transform origin-center"></div>
          <div className="absolute left-4 top-3/4 w-12 h-12 bg-gold rotate-45 transform origin-center"></div>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto w-full flex flex-col pt-12 md:pt-20 gap-8 z-10 pb-20">
        
        {/* Bli Tourah Greeting Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-6"
        >
          {/* Avatar */}
          <div className="relative group shrink-0">
            <div className={`absolute -inset-2 bg-linear-to-r from-maroon to-gold rounded-full blur-md opacity-40 transition duration-500 ${isLoading ? 'animate-pulse opacity-80' : 'group-hover:opacity-60'}`}></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gold bg-[#1a1a1a] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Image src={avatarSrc} alt="Bli Tourah" fill className="object-cover" priority />
            </div>
          </div>

          {/* Chat Bubble / Greeting */}
          <div className="relative bg-[#1a1a1a] border border-[#333] rounded-3xl p-6 md:p-8 shadow-xl mt-4 md:mt-0 flex-1">
            {!itinerary ? (
              <p className="text-lg md:text-xl font-light leading-relaxed text-gray-200">
                {isLoading ? "Working on your magic itinerary..." : (
                  <>Suksma, <span className="text-gold font-medium">{userName}</span> family! Now, tell me everything. How many days, what is your budget, who is traveling, and what do you want to avoid?</>
                )}
              </p>
            ) : (
              <p className="text-lg md:text-xl font-light leading-relaxed text-gray-200">
                Here is your personalized magic itinerary, <span className="text-gold font-medium">{userName}</span> family! Let me know if you want to make any changes.
              </p>
            )}
            {/* Desktop Tail */}
            <div className="hidden md:block absolute top-12 -left-4 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[16px] border-r-[#333]"></div>
            <div className="hidden md:block absolute top-[49px] -left-[14px] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[14px] border-r-[#1a1a1a]"></div>
            
            {/* Mobile Tail */}
            <div className="block md:hidden absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#333]"></div>
            <div className="block md:hidden absolute -top-[14px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[14px] border-b-[#1a1a1a]"></div>
          </div>
        </motion.div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {!itinerary ? (
          /* Input Section */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col gap-6 w-full"
          >
            <div className="relative">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                maxLength={MAX_CHARS}
                disabled={isLoading}
                className="w-full min-h-[240px] md:min-h-[300px] bg-[#111] border-2 border-[#333] focus:border-gold hover:border-[#444] disabled:opacity-50 disabled:cursor-not-allowed text-white p-6 rounded-2xl focus:outline-none transition-all text-lg placeholder-gray-600 shadow-inner resize-y"
                placeholder="E.g., We're staying for 7 days. Budget is around $2000. It's just my wife and me. We hate crowded tourist traps and love hidden waterfalls and authentic food..."
              ></textarea>
              <div className={`absolute bottom-4 right-6 text-sm ${userInput.length >= MAX_CHARS ? 'text-red-500' : 'text-gray-500'}`}>
                {userInput.length}/{MAX_CHARS}
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGenerate}
              disabled={userInput.trim().length === 0 || userInput.length > MAX_CHARS || isLoading}
              className="w-full bg-gold hover:bg-gold-hover disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-black font-bold py-5 rounded-2xl transition-all text-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transform hover:-translate-y-1 active:translate-y-0"
            >
              {isLoading ? "Bli Tourah is thinking..." : "Generate Magic Itinerary"}
            </button>
          </motion.div>
        ) : (
          /* Result Section */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 w-full"
          >
            {/* Insight Card */}
            <div className="bg-maroon/20 border-l-4 border-gold p-6 rounded-r-2xl">
              <h3 className="text-gold font-bold text-xl mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span> Bli Tourah's Local Insight
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed">{itinerary.insight}</p>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-6 mt-4">
              {itinerary.days.map((day, dayIndex) => (
                <motion.div 
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: dayIndex * 0.15 }}
                  className="bg-[#111] border border-[#333] rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="bg-gradient-to-r from-[#1a1a1a] to-[#222] p-5 border-b border-[#333]">
                    <h4 className="text-gold font-bold text-xl">Day {day.day}: {day.title}</h4>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex gap-4">
                        <div className="text-gold font-medium w-16 shrink-0 pt-1">{activity.time}</div>
                        <div className="relative pl-6 pb-2 before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:bg-maroon before:rounded-full after:absolute after:left-[3px] after:top-5 after:bottom-[-16px] after:w-[2px] after:bg-[#333] last:after:hidden">
                          <p className="text-gray-300">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <button 
              type="button"
              onClick={handleStartOver}
              className="w-full mt-6 bg-transparent border-2 border-gold hover:bg-gold hover:text-black text-gold font-bold py-4 rounded-2xl transition-all text-lg"
            >
              Start Over
            </button>
          </motion.div>
        )}

      </main>
    </div>
  );
}
