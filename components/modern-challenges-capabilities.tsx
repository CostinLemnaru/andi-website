"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"
import GradientText from "./gradient-text"

interface Challenge {
  text: string
}

interface Capability {
  text: string
}

interface ModernChallengesCapabilitiesProps {
  title?: string
  challenges: Challenge[]
  capabilities: Capability[]
  result: string
}

export default function ModernChallengesCapabilities({
  title,
  challenges,
  capabilities,
  result,
}: ModernChallengesCapabilitiesProps) {
  const [activeTab, setActiveTab] = useState<"challenges" | "capabilities">("challenges")

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {title && (
        <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
          <GradientText>{title}</GradientText>
        </h2>
      )}

      <div className="flex justify-center mb-8">
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-full p-1 flex">
          <button
            onClick={() => setActiveTab("challenges")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === "challenges"
                ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Challenges
          </button>
          <button
            onClick={() => setActiveTab("capabilities")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === "capabilities"
                ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            ANDI Capabilities
          </button>
        </div>
      </div>

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === "challenges" ? (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 flex items-start gap-3"
                  >
                    <div className="bg-red-500/20 rounded-full p-2 flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <p className="text-gray-300 text-sm">{challenge.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="capabilities"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 flex items-start gap-3"
                  >
                    <div className="bg-purple-500/20 rounded-full p-2 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-purple-400" />
                    </div>
                    <p className="text-gray-300 text-sm">{capability.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
      >
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-2 mr-4">
            <ArrowRight className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-medium text-white">Result</h3>
        </div>
        <p className="text-gray-300">{result}</p>
      </motion.div>
    </div>
  )
}
