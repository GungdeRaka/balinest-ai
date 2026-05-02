"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Typewriter } from "@/components/Typewriter";

const GREETING_TEXT = "Om Swastyastu! Welcome to BaliNest AI. I am Bli Tourah, your local AI concierge. Before we craft your perfect island getaway, what name should I put on your itinerary?";

const GLOSSARY = {
  "Om Swastyastu": "A Balinese greeting, meaning 'May God bless you' or 'May you be in a state of goodness.'",
  "Bli": "A respectful term for an older brother or a peer male."
};

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    // Save username for the next step
    if (typeof window !== "undefined") {
      localStorage.setItem("balinest_username", name.trim());
    }
    
    // Navigate to itinerary page
    router.push("/itinerary");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <main className="max-w-2xl w-full flex flex-col items-center gap-8 z-10">
        
        {/* Chat Bubble */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#1a1a1a] border-2 border-maroon rounded-3xl p-6 md:p-8 shadow-2xl max-w-xl w-full"
        >
          <div className="text-lg md:text-xl font-light leading-relaxed text-gray-200 min-h-[120px]">
            <Typewriter text={GREETING_TEXT} glossary={GLOSSARY} />
          </div>
          {/* Chat Bubble Tail pointing downwards to the avatar */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-t-[16px] border-t-maroon border-r-[16px] border-r-transparent"></div>
          <div className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-t-[14px] border-t-[#1a1a1a] border-r-[14px] border-r-transparent"></div>
        </motion.div>

        {/* Avatar */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative group mt-4"
        >
          <div className="absolute -inset-4 bg-linear-to-r from-maroon to-gold rounded-full blur-lg opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gold bg-[#1a1a1a] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.2)]">
            <Image src="/bli-tourah-greeting.png" alt="Bli Tourah Greeting" fill className="object-cover" priority />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-4 mt-8"
        >
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            required
            className="w-full bg-[#111] border-2 border-[#333] focus:border-gold hover:border-maroon text-white px-6 py-4 rounded-xl focus:outline-none transition-all text-xl placeholder-gray-600 shadow-inner text-center"
          />
          <button 
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-gold hover:bg-gold-hover text-black font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
          >
            Continue
          </button>
        </motion.form>

      </main>
    </div>
  );
}
