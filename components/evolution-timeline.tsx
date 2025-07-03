"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

interface TimelineEra {
  id: string
  era: string
  year: string
  title: string
  description: string
  capabilities: string[]
  limitations: string[]
  color: string
}

export default function EvolutionTimeline() {
  const timelineData: TimelineEra[] = [
    {
      id: "data-warehousing",
      era: "1.0",
      year: "1990s-2000s",
      title: "Data Warehousing",
      description: "Centralized repositories for structured data with basic reporting capabilities.",
      capabilities: ["Data storage", "Basic reporting", "Historical analysis"],
      limitations: ["Limited to technical users", "Slow implementation", "Descriptive only"],
      color: "blue",
    },
    {
      id: "business-intelligence",
      era: "2.0",
      year: "2000s-2015",
      title: "Business Intelligence",
      description: "Visual dashboards and self-service analytics for business users.",
      capabilities: ["Data visualization", "Self-service", "KPI tracking", "Trend analysis"],
      limitations: ["Backward-looking", "Insight without action", "Siloed tools", "Dashboard fatigue"],
      color: "purple",
    },
    {
      id: "advanced-analytics",
      era: "3.0",
      year: "2015-2022",
      title: "Advanced Analytics",
      description: "Predictive capabilities and machine learning for forward-looking insights.",
      capabilities: ["Predictive models", "Data science", "Statistical analysis", "Pattern recognition"],
      limitations: ["Technical complexity", "Disconnected from execution", "Specialized skills required"],
      color: "pink",
    },
    {
      id: "sage",
      era: "4.0",
      year: "2023-Present",
      title: "Strategic AI Guidance & Execution (SAGE)",
      description: "AI-powered platforms that not only analyze but recommend and execute actions.",
      capabilities: [
        "AI-driven recommendations",
        "Automated execution",
        "Natural language interface",
        "Cross-functional collaboration",
        "Decision orchestration",
      ],
      limitations: [],
      color: "green",
    },
  ]

  const [activeEra, setActiveEra] = useState(timelineData[3].id)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  const getActiveEra = () => timelineData.find((era) => era.id === activeEra) || timelineData[0]

  const colors = {
    blue: "from-blue-500 to-blue-700 border-blue-500/30 text-blue-400",
    purple: "from-purple-500 to-purple-700 border-purple-500/30 text-purple-400",
    pink: "from-pink-500 to-pink-700 border-pink-500/30 text-pink-400",
    green: "from-emerald-500 to-emerald-700 border-emerald-500/30 text-emerald-400",
  }

  const activeItem = getActiveEra()
  const activeColor = colors[activeItem.color as keyof typeof colors]
  const colorClass = activeColor.split(" ")[3]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="my-12"
    >
      <h3 className="text-xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500">
        The Evolution of Business Intelligence to SAGE
      </h3>

      {/* Timeline */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2"></div>
        <div className="flex justify-between relative">
          {timelineData.map((era, index) => (
            <button
              key={era.id}
              onClick={() => setActiveEra(era.id)}
              className={`w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                activeEra === era.id
                  ? `bg-gradient-to-br ${colors[era.color as keyof typeof colors].split(" ")[0]} ${
                      colors[era.color as keyof typeof colors].split(" ")[1]
                    }`
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <div className="text-center">
                <div className="text-white font-bold">{era.era}</div>
                <div className="text-xs text-white/80">{era.title.split(" ")[0]}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Era Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEra}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`bg-gray-900/40 backdrop-blur-sm border rounded-lg p-6 border-${activeItem.color}-500/20`}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="text-sm text-gray-400">{activeItem.year}</div>
              <h4 className={`text-2xl font-bold mb-2 ${colorClass}`}>{activeItem.title}</h4>
              <p className="text-gray-300 mb-4">{activeItem.description}</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className={`text-lg font-medium mb-2 ${colorClass}`}>Capabilities</h5>
                <ul className="space-y-1">
                  {activeItem.capabilities.map((capability, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-start"
                    >
                      <span className={`mr-2 ${colorClass}`}>•</span>
                      <span className="text-gray-200">{capability}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              {activeItem.limitations.length > 0 && (
                <div>
                  <h5 className="text-lg font-medium mb-2 text-gray-400">Limitations</h5>
                  <ul className="space-y-1">
                    {activeItem.limitations.map((limitation, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="mr-2 text-gray-400">•</span>
                        <span className="text-gray-400">{limitation}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
