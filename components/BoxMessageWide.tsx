'use client'

import ScrollReveal from "@/components/scroll-reveal"
import React from 'react';


export default function BoxMessageWide({ data }: any) {
  const { TItle, Subtitle, highlightPurpleWords, highlightBlueWords } = data;
  const purpleWords = highlightPurpleWords.split(',');

  // Despărțim titlul în părți, pentru a preveni duplicarea
  let titleParts = TItle.split('.');

  // Creăm un helper pentru a înlocui cuvintele highlightate
  const highlightText = (text: any, words: any) => {
    words.forEach((word: string) => {
      const regex = new RegExp(`\\b${word}\\b`, 'g'); // Căutăm exact cuvântul, nu o subsecvență
      text = text.replace(regex, `<span class="text-purple-400">${word}</span>`);
    });
    return text;
  };

  // Aplicăm funcția de highlight pe fiecare parte a titlului
  titleParts = titleParts.map((part: string) => highlightText(part, purpleWords));

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
    <ScrollReveal delay={700}>
      <div className="text-center">
        <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-gray-800/50">
          <h3 className="text-3xl font-bold text-white mb-4">
            <span dangerouslySetInnerHTML={{ __html: titleParts[0] }} />.
            <span dangerouslySetInnerHTML={{ __html: titleParts[1] }} />.
          </h3>
          <p className="text-xl text-gray-300">
            <span className="text-purple-400 font-semibold">{purpleWords[2]}.</span>{" "}
            <span className="text-blue-400 font-semibold">{highlightBlueWords}.</span>
          </p>
        </div>
      </div>
    </ScrollReveal>
      </div>
  );

}