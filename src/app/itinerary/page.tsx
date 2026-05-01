"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ItineraryPage() {
  const [userName, setUserName] = useState("Traveler");

  useEffect(() => {
    // Read the username from localStorage
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("balinest_username");
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, []);

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
      <main className="max-w-3xl mx-auto w-full flex flex-col pt-12 md:pt-20 gap-8 z-10">
        
        {/* Bli Tourah Greeting Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-6"
        >
          {/* Avatar */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-2 bg-linear-to-r from-maroon to-gold rounded-full blur-md opacity-40 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gold bg-[#1a1a1a] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Image src="/bli-tourah-smile.png" alt="Bli Tourah Smiling" fill className="object-cover" priority />
            </div>
          </div>

          {/* Chat Bubble / Greeting */}
          <div className="relative bg-[#1a1a1a] border border-[#333] rounded-3xl p-6 md:p-8 shadow-xl mt-4 md:mt-0">
            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-200">
              Suksma, <span className="text-gold font-medium">{userName}</span> family! Now, tell me everything. How many days, what is your budget, who is traveling, and what do you want to avoid?
            </p>
            {/* Desktop Tail */}
            <div className="hidden md:block absolute top-12 -left-4 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[16px] border-r-[#333]"></div>
            <div className="hidden md:block absolute top-[49px] -left-[14px] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[14px] border-r-[#1a1a1a]"></div>
            
            {/* Mobile Tail */}
            <div className="block md:hidden absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#333]"></div>
            <div className="block md:hidden absolute -top-[14px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[14px] border-b-[#1a1a1a]"></div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col gap-6 w-full"
        >
          <textarea
            className="w-full min-h-[240px] md:min-h-[300px] bg-[#111] border-2 border-[#333] focus:border-gold hover:border-[#444] text-white p-6 rounded-2xl focus:outline-none transition-all text-lg placeholder-gray-600 shadow-inner resize-y"
            placeholder="E.g., We're staying for 7 days. Budget is around $2000. It's just my wife and me. We hate crowded tourist traps and love hidden waterfalls and authentic food..."
          ></textarea>

          <button 
            type="button"
            className="w-full bg-gold hover:bg-gold-hover text-black font-bold py-5 rounded-2xl transition-all text-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transform hover:-translate-y-1 active:translate-y-0"
          >
            Generate Magic Itinerary
          </button>
        </motion.div>

      </main>
    </div>
  );
}
