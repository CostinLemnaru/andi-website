"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building, ArrowRight, CheckCircle } from "lucide-react"
import GradientText from "./gradient-text"

interface CaseStudy {
  company: string
  challenge: string
  solution: string
  results: string[]
}

interface CaseStudiesProps {
  title: string
  studies: CaseStudy[]
}

export default function CaseStudies({ title, studies }: CaseStudiesProps) {
  const [activeStudy, setActiveStudy] = useState(0)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
        <GradientText>{title}</GradientText>
      </h2>

      <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
        <div className="flex gap-4">
          {studies.map((study, index) => (
            <button
              key={index}
              onClick={() => setActiveStudy(index)}
              className={`flex-shrink-0 px-6 py-3 rounded-full transition-all duration-300 ${
                activeStudy === index
                  ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white"
                  : "bg-gray-900/40 text-gray-400 hover:text-white"
              }`}
            >
              {study.company}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStudy}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 rounded-full p-3 flex-shrink-0 mt-1">
                <Building className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Challenge</h3>
                <p className="text-gray-300">{studies[activeStudy].challenge}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 rounded-full p-3 flex-shrink-0 mt-1">
                <ArrowRight className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">ANDI Solution</h3>
                <p className="text-gray-300">{studies[activeStudy].solution}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studies[activeStudy].results.map((result, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
