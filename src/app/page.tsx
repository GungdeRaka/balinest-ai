"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Info } from "lucide-react";

type Activity = {
  time: string;
  description: string;
};

type DayItinerary = {
  day: number;
  title: string;
  activities: Activity[];
};

type ItineraryResponse = {
  insight: string;
  days: DayItinerary[];
};

export default function Home() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGapuraOpen, setIsGapuraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);

  const handleStart = () => {
    if (!name.trim()) return;
    setIsGapuraOpen(true);
    setTimeout(() => {
      setStep(2);
    }, 800);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setStep(3);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, userName: name }),
      });
      const data = await res.json();
      setItinerary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden font-sans">
      
      {/* GAPURA (Candi Bentar) OVERLAY */}
      <AnimatePresence>
        {!isGapuraOpen && (
          <div className="fixed inset-0 z-50 flex pointer-events-none">
            {/* Left Half */}
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-1/2 h-full bg-[#0a0a0a] border-r-8 border-maroon relative flex items-center justify-end pr-8 pointer-events-auto shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
            >
              <div className="w-24 h-full bg-maroon opacity-10 absolute right-0"></div>
              {/* Decorative elements to represent Candi Bentar texture */}
              <div className="w-4 h-full bg-gold absolute right-0 opacity-80"></div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-64 border-2 border-gold opacity-30"></div>
            </motion.div>
            
            {/* Right Half */}
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-1/2 h-full bg-[#0a0a0a] border-l-8 border-maroon relative flex items-center justify-start pl-8 pointer-events-auto shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
            >
              <div className="w-24 h-full bg-maroon opacity-10 absolute left-0"></div>
              <div className="w-4 h-full bg-gold absolute left-0 opacity-80"></div>
              <div className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-64 border-2 border-gold opacity-30"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="max-w-4xl mx-auto px-6 py-12 min-h-screen flex flex-col relative z-10">
        
        {/* SCREEN 1: INTRODUCTION */}
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 flex flex-col items-center justify-center space-y-12"
          >
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-linear-to-r from-maroon to-gold rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gold bg-[#1a1a1a] flex items-center justify-center shadow-2xl">
                <Image src="/bli-tourah-greeting.png" alt="Bli Tourah Greeting" fill className="object-cover" />
              </div>
            </div>

            <div className="text-center space-y-6 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-light tracking-wide text-gold drop-shadow-lg">
                Om Swastyastu!
              </h1>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
                Welcome to <span className="font-semibold text-white">BaliNest AI</span>. I am Bli Tourah, your local AI concierge. Before we craft your perfect island getaway, what name should I put on your itinerary?
              </p>
            </div>

            <div className="flex flex-col w-full max-w-md space-y-6">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="Enter your name..."
                className="w-full bg-[#111] border border-[#333] hover:border-maroon text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold transition-all text-xl placeholder-gray-600 shadow-inner"
              />
              <button 
                onClick={handleStart}
                disabled={!name.trim()}
                className="w-full bg-linear-to-r from-gold to-[#e5c049] hover:from-gold-hover hover:to-gold text-black font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Mulai / Start
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 2: THE MAGIC TEXT AREA */}
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full space-y-10"
          >
            <div className="flex items-start gap-4 md:gap-8">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gold bg-[#1a1a1a] shrink-0 flex items-center justify-center shadow-lg">
                <Image src={prompt.length > 450 ? "/bli-tourah-panic.png" : "/bli-tourah-smile.png"} alt="Bli Tourah Note Taking" fill className="object-cover" />
              </div>
              <div className="bg-[#111] border border-maroon p-6 md:p-8 rounded-3xl rounded-tl-none shadow-xl relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-maroon rounded-l-3xl"></div>
                <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-200">
                  <span className="text-gold font-medium">Suksma, {name} family!</span><br/>
                  Now, tell me everything. How many days, what is your budget, who is traveling, and what do you want to avoid?
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  maxLength={500}
                  placeholder="e.g., We are a family of 4 (2 kids, 8 and 10) staying for 5 days. We love culture and beaches but want to avoid very crowded tourist traps. Budget is moderate..."
                  className="w-full h-56 bg-[#111] border border-[#333] hover:border-[var(--color-maroon)] text-white px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold transition-all resize-none text-lg md:text-xl placeholder-gray-600 shadow-inner leading-relaxed"
                />
                <div className={`absolute bottom-4 right-6 text-sm ${prompt.length > 450 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                  {prompt.length}/500
                </div>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="w-full bg-linear-to-r from-gold to-[#e5c049] hover:from-gold-hover hover:to-gold text-black font-bold py-5 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg md:text-xl flex items-center justify-center gap-3 uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Generate Magic Itinerary <Send size={24} />
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: LOADING & OUTPUT */}
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full space-y-12 py-8 max-w-4xl mx-auto"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[60vh] space-y-8">
                 <div className="relative">
                   <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#333] bg-[#1a1a1a] flex items-center justify-center relative z-10">
                      <Image src="/bli-tourah-smile.png" alt="Bli Tourah Thinking" fill className="object-cover opacity-80" />
                   </div>
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                     className="absolute -inset-4 border-t-4 border-r-4 border-[var(--color-gold)] rounded-full z-0 opacity-80"
                   />
                   <motion.div 
                     animate={{ rotate: -360 }}
                     transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                     className="absolute -inset-8 border-b-4 border-l-4 border-[var(--color-maroon)] rounded-full z-0 opacity-50"
                   />
                 </div>
                 <p className="text-2xl font-light text-[var(--color-gold)] flex items-center gap-3 animate-pulse tracking-wide">
                   <Loader2 className="animate-spin" /> Bli Tourah is crafting your magic...
                 </p>
              </div>
            ) : itinerary ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12"
              >
                {/* Concierge Insight Card */}
                <div className="bg-[#111] border border-[var(--color-maroon)] p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-6 md:gap-8 items-start relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--color-maroon)] to-transparent opacity-10 rounded-bl-full pointer-events-none"></div>
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-gold)] bg-[#1a1a1a] flex-shrink-0 flex items-center justify-center z-10 shadow-lg">
                    <Image src="/bli-tourah-greeting.png" alt="Bli Tourah Insight" fill className="object-cover" />
                  </div>
                  <div className="z-10 flex-1">
                    <h3 className="text-[var(--color-gold)] font-medium text-xl mb-3 flex items-center gap-2">
                      <Info size={20} /> Concierge Insight
                    </h3>
                    <p className="text-gray-200 leading-relaxed font-light text-xl italic">
                      "{itinerary.insight}"
                    </p>
                  </div>
                </div>

                {/* Day-by-Day Timeline */}
                <div className="relative pl-6 md:pl-4 mt-12">
                  {/* Timeline vertical line */}
                  <div className="absolute left-[34px] md:left-[36px] top-4 bottom-0 w-1 bg-gradient-to-b from-[var(--color-maroon)] to-transparent rounded-full opacity-50"></div>
                  
                  <div className="space-y-10">
                    {itinerary.days.map((day, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2, duration: 0.5 }}
                        key={day.day} 
                        className="relative flex items-start gap-6 md:gap-10"
                      >
                        <div className="flex-shrink-0 w-14 h-14 rounded-full border-4 border-[#111] bg-[var(--color-gold)] text-black font-bold text-xl flex items-center justify-center z-10 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                          {day.day}
                        </div>
                        <div className="flex-1 bg-[#111] border border-[#333] hover:border-[var(--color-gold)] transition-all duration-300 p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 group">
                          <h4 className="text-2xl font-medium text-[var(--color-gold)] mb-6 group-hover:text-white transition-colors">{day.title}</h4>
                          <div className="space-y-6">
                            {day.activities.map((activity, actIdx) => (
                              <div key={actIdx} className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-[#222] pb-4 last:border-0 last:pb-0">
                                <span className="text-[var(--color-maroon)] font-mono text-base sm:text-lg sm:pt-0.5 shrink-0 sm:w-20 font-bold tracking-wider">{activity.time}</span>
                                <p className="text-gray-300 font-light text-base sm:text-lg leading-relaxed">{activity.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center pt-12 pb-8">
                   <button 
                     onClick={() => { setStep(2); setItinerary(null); setPrompt(""); }}
                     className="text-gray-400 hover:text-[var(--color-gold)] transition-colors font-light text-lg px-6 py-3 rounded-full hover:bg-[#111]"
                   >
                     ← Plan another magic trip
                   </button>
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        )}
      </main>
    </div>
  );
}
