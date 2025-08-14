'use client'

import React from 'react';
import ScrollReveal from "@/components/scroll-reveal"

interface BoxMessageSmallProps {
  data: {
    __component: string;
    id: number;
    Content: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>;
    }>;
    highlightWords: string;
  };
}

export default function BoxMessageSmall({ data }: BoxMessageSmallProps) {
  // Functie pentru evidentierea cuvintelor
  const highlightText = (text: string, highlightWords: string) => {
    const wordsToHighlight = highlightWords.split(',');
    let parts: JSX.Element[] = [];
    let currentIndex = 0;

    wordsToHighlight.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      let match;
      let lastIndex = 0;

      while ((match = regex.exec(text)) !== null) {
        const beforeText = text.slice(lastIndex, match.index);
        const highlightedWord = match[0];

        if (beforeText) {
          parts.push(<span key={currentIndex++}>{beforeText}</span>);
        }

        parts.push(
          <span key={currentIndex++} className="text-purple-400 font-semibold">
            {highlightedWord}
          </span>
        );

        lastIndex = regex.lastIndex;
      }

      const remainingText = text.slice(lastIndex);
      if (remainingText) {
        parts.push(<span key={currentIndex++}>{remainingText}</span>);
      }
    });

    return parts;
  };

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
    <ScrollReveal delay={800}>
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50 max-w-3xl mx-auto">
          {data.Content.map((content, index) => {
            return content.type === 'paragraph' ? (
              <p key={index} className="text-lg text-white">
                {highlightText(content.children[0]?.text ?? '', data.highlightWords)}
              </p>
            ) : null;
          })}
        </div>
      </div>
    </ScrollReveal>
      </div>
  );
}
