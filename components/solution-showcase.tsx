"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import GradientText from "./gradient-text"

interface Solution {
  title: string
  description: string
  icon: React.ReactNode
}

interface SolutionShowcaseProps {
  title: string
  solutions: Solution[]
}

export default function SolutionShowcase({ title, solutions }: SolutionShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  const nextSolution = () => {
    setDirection(1) // Moving right
    setCurrentIndex((prev) => (prev + 1) % solutions.length)
  }

  const prevSolution = () => {
    setDirection(-1) // Moving left
    setCurrentIndex((prev) => (prev - 1 + solutions.length) % solutions.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }),
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
        <GradientText>{title}</GradientText>
      </h2>

      <div className="relative">
        <div className="overflow-hidden rounded-xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 p-6 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevSolution}
              className="bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <span className="text-sm text-gray-400">
                {currentIndex + 1} / {solutions.length}
              </span>
            </div>
            <button
              onClick={nextSolution}
              className="bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col md:flex-row items-center gap-8"
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-6 md:p-8">
                  <div className="text-5xl md:text-6xl text-white">{solutions[currentIndex].icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-4">{solutions[currentIndex].title}</h3>
                  <p className="text-gray-300">{solutions[currentIndex].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {solutions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-blue-400 to-purple-500 w-6"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to solution ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
