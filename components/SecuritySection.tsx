"use client"

import GradientText from "./gradient-text"
import { CheckCircle, ChevronDown } from "lucide-react"
import { useRef } from "react"

export default function SecuritySection({ data }: { data: any }) {
  const exploreRef = useRef<HTMLElement>(null)

  const {
    title = "We bring ANDI to your data, not your data to us.",
    subtitle = "ANDI learns, reasons, and acts securely where your data lives. Simple. Safe. Effortless.",
    badges = [],
    closing = "The moment your business stops guessing... and starts knowing.",
  } = data ?? {}

  return (
    <section ref={exploreRef} className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="scroll-fade text-3xl sm:text-4xl font-light mb-6 text-gray-400">
            {title.split("ANDI").map((part: string, i: number, arr: string[]) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <GradientText>ANDI</GradientText>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h2>
          <p className="scroll-fade text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-16 text-gray-300">
          {badges.map((text: string) => (
            <div
              key={text}
              className="scroll-fade flex items-center gap-3 bg-gray-900/30 backdrop-blur-sm p-4 rounded-lg border border-gray-800/50"
            >
              <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="scroll-fade text-3xl sm:text-4xl font-light leading-relaxed w-full mx-auto text-gray-400 text-center">
          {closing.split("knowing").map((part: string, i: number, arr: string[]) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <GradientText>knowing</GradientText>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
      </div>
    </section>
  )
}
