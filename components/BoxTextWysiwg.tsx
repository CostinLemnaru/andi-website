'use client'

import React from 'react';

interface BoxTextWysiwgProps {
  data: {
    __component: string;
    id: number;
    Title: string | null;
    Content: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>;
    }>;
    centered: boolean;
    highlightWords: string;
  };
}


export default function BoxTextWysiwg({ data }: BoxTextWysiwgProps) {

  const highlightText = (text: string, highlightWords: string) => {
    const wordsToHighlight = highlightWords.split(',');
    let highlightedText = text;

    wordsToHighlight.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="text-purple-400 font-semibold">$1</span>');
    });

    return highlightedText;
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 ${data.centered ? 'text-center' : ''}`}>
      {data.Title && (
        <h2 className="text-3xl font-bold text-white mb-6">{data.Title}</h2>
      )}

      <div className="text-center max-w-4xl mx-auto">
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-500">
          {data.Content.map((content, index) => {
            return content.type === 'paragraph' ? (
              <p
                key={index}
                className="text-lg text-gray-300 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{
                  __html: highlightText(content.children[0]?.text ?? '', data.highlightWords),
                }}
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};