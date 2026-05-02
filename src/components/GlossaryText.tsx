"use client";

import { ReactNode } from "react";
import { GlossaryTooltip } from "./GlossaryTooltip";

interface GlossaryTextProps {
  text: string;
  glossary: Record<string, string>;
}

export const GlossaryText = ({ text, glossary }: GlossaryTextProps) => {
  let parts: (string | ReactNode)[] = [text];
  
  // Sort glossary keys by length descending to handle overlapping terms
  const sortedKeys = Object.keys(glossary).sort((a, b) => b.length - a.length);

  sortedKeys.forEach((word) => {
    const definition = glossary[word];
    const newParts: (string | ReactNode)[] = [];
    parts.forEach(part => {
      if (typeof part === 'string') {
        const splitPart = part.split(word);
        splitPart.forEach((subPart, index) => {
          newParts.push(subPart);
          if (index < splitPart.length - 1) {
            newParts.push(<GlossaryTooltip key={`${word}-${index}`} word={word} definition={definition} />);
          }
        });
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
  });

  return <>{parts}</>;
};
