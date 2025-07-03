"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bot, User, Check, Clock } from "lucide-react"
import GradientText from "./gradient-text"

interface AutomationStep {
  type: "ai" | "human" | "system"
  content: string
}

interface AutomationExample {
  title: string
  description: string
  steps: AutomationStep[]
  outcome: string
}

interface AutomationExamplesProps {
  title: string
  examples: AutomationExample[]
}

export default function AutomationExamples({ title, examples }: AutomationExamplesProps) {
  const [activeExample, setActiveExample] = useState(0)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
        <GradientText>{title}</GradientText>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveExample(index)}
            className={`text-left p-6 rounded-xl transition-all duration-300 ${
              activeExample === index
                ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-purple-500/30"
                : "bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50"
            }`}
          >
            <h3 className="text-lg font-medium text-white mb-2">{example.title}</h3>
            <p className="text-gray-400 text-sm">{example.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-medium text-white mb-2">{examples[activeExample].title}</h3>
          <p className="text-gray-300">{examples[activeExample].description}</p>
        </div>

        <div className="space-y-4 mb-8">
          {examples[activeExample].steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-start gap-4 p-4 rounded-lg ${
                step.type === "ai"
                  ? "bg-blue-500/10 border border-blue-500/20"
                  : step.type === "human"
                    ? "bg-purple-500/10 border border-purple-500/20"
                    : "bg-green-500/10 border border-green-500/20"
              }`}
            >
              <div
                className={`rounded-full p-2 flex-shrink-0 ${
                  step.type === "ai" ? "bg-blue-500/20" : step.type === "human" ? "bg-purple-500/20" : "bg-green-500/20"
                }`}
              >
                {step.type === "ai" ? (
                  <Bot className="h-5 w-5 text-blue-400" />
                ) : step.type === "human" ? (
                  <User className="h-5 w-5 text-purple-400" />
                ) : (
                  <Check className="h-5 w-5 text-green-400" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-400 mb-1">
                  {step.type === "ai" ? "ANDI" : step.type === "human" ? "Human" : "System"}
                </div>
                <p className="text-gray-300">{step.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <h4 className="text-lg font-medium text-white">Outcome</h4>
          </div>
          <p className="text-gray-300">{examples[activeExample].outcome}</p>
        </div>
      </div>
    </div>
  )
}
