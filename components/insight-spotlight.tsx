"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, ArrowRight, Zap } from "lucide-react"
import GradientText from "./gradient-text"

interface Insight {
  observation: string
  recommendation: string
  impact: string
}

interface InsightSpotlightProps {
  title: string
  insights: Insight[]
}

export default function InsightSpotlight({ title, insights }: InsightSpotlightProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextInsight = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
        <GradientText>{title}</GradientText>
      </h2>

      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 rounded-full p-3 flex-shrink-0 mt-1">
                <Lightbulb className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">ANDI Observed</h3>
                <p className="text-gray-300">{insights[currentIndex].observation}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 rounded-full p-3 flex-shrink-0 mt-1">
                <ArrowRight className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">ANDI Recommended</h3>
                <p className="text-gray-300">{insights[currentIndex].recommendation}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-pink-500/20 rounded-full p-3 flex-shrink-0 mt-1">
                <Zap className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Business Impact</h3>
                <p className="text-gray-300">{insights[currentIndex].impact}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <button
            onClick={nextInsight}
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Next Insight
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex gap-2">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-400 to-purple-500 w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to insight ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
