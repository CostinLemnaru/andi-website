'use client'

import React from 'react';
import ScrollReveal from "@/components/scroll-reveal"

interface ColumnTextAndBoxProps {
  data: {
    __component: string;
    id: number;
    Title: string;
    Content: string;
    highlightWords: string;
    FeatureTitle1: string;
    FeatureDescription1: string;
    FeatureTitle2: string;
    FeatureDescription2: string;
    FeatureTitle3: string;
    FeatureDescription3: string;
    FeatureTitle4: string;
    FeatureDescription4: string;
  };
}

export default function ColumnTextAndBox({ data }: ColumnTextAndBoxProps) {
  // Functie pentru evidențierea cuvintelor
  const highlightText = (text: string, highlightWords: string) => {
    const wordsToHighlight = highlightWords.split(',');
    let parts: JSX.Element[] = [];
    let currentIndex = 0;

    // Parcurgem textul și cautăm cuvintele de evidențiat
    wordsToHighlight.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      let match;
      let lastIndex = 0;

      // Căutăm toate aparițiile cuvintelor de evidențiat
      while ((match = regex.exec(text)) !== null) {
        const beforeText = text.slice(lastIndex, match.index);
        const highlightedWord = match[0];

        // Adăugăm părțile textului care nu sunt evidențiate
        if (beforeText) {
          parts.push(<span key={currentIndex++}>{beforeText}</span>);
        }

        // Adăugăm cuvântul evidențiat cu stilul
        parts.push(
          <span key={currentIndex++} className="text-purple-400 font-semibold">
            {highlightedWord}
          </span>
        );

        lastIndex = regex.lastIndex;
      }

      // Adăugăm restul textului după ultima apariție
      const remainingText = text.slice(lastIndex);
      if (remainingText) {
        parts.push(<span key={currentIndex++}>{remainingText}</span>);
      }
    });

    return parts;
  };

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
    <ScrollReveal delay={200}>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Secțiunea de text */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">
            {highlightText(data.Title, data.highlightWords)}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {data.Content}
          </p>
        </div>

        {/* Secțiunea de boxuri */}
        <div className="relative">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-800/50">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">{data.FeatureTitle1}</div>
                <div className="text-gray-300 text-sm">{data.FeatureDescription1}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">{data.FeatureTitle2}</div>
                <div className="text-gray-300 text-sm">{data.FeatureDescription2}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">{data.FeatureTitle3}</div>
                <div className="text-gray-300 text-sm">{data.FeatureDescription3}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">{data.FeatureTitle4}</div>
                <div className="text-gray-300 text-sm">{data.FeatureDescription4}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
      </div>
  );
}
