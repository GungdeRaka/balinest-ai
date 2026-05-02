"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlossaryTooltipProps {
  word: string;
  definition: string;
}

export const GlossaryTooltip = ({ word, definition }: GlossaryTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span 
      className="relative inline-block group cursor-help border-b border-dotted border-gold/50 hover:border-gold text-gold font-medium transition-colors"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      {word}
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-[#1a1a1a] border border-gold/30 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-sm md:text-base text-gray-200 w-56 md:w-64 z-[100] pointer-events-none text-center"
          >
            <span className="block font-bold text-gold mb-1">{word}</span>
            <span className="block text-gray-300 font-light leading-relaxed">{definition}</span>
            {/* Tooltip Tail */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gold/30"></span>
            <span className="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-[#1a1a1a]"></span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
