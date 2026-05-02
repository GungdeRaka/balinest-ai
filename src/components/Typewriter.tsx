"use client";

import { useState, useEffect } from "react";
import { GlossaryText } from "./GlossaryText";

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  glossary?: Record<string, string>;
}

export const Typewriter = ({ text, speed = 40, onComplete, glossary = {} }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  if (!isComplete) {
    return (
      <>
        {displayedText}
        <span className="animate-pulse inline-block ml-1 w-2 h-5 bg-gold align-middle"></span>
      </>
    );
  }

  return <GlossaryText text={text} glossary={glossary} />;
};
