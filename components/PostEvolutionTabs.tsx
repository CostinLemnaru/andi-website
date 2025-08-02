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
  color: "blue" | "purple" | "pink" | "green"
}

type Props = {
  data: {
    __component: string
    id: number
    Title: string
    Config: TimelineEra[]
  }
}

export default function PostEvolutionTabs({ data }: Props) {
  const timelineData = data.Config
  const [activeEra, setActiveEra] = useState(timelineData.at(-1)?.id || timelineData[0].id)

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
  const activeColor = colors[activeItem.color]
  const colorClass = activeColor.split(" ")[3]

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="my-12"
    >
      <h3 className="text-xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500">
        {data.Title}
      </h3>

      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2"></div>
        <div className="flex justify-between relative">
          {timelineData.map((era) => (
            <button
              key={era.id}
              onClick={() => setActiveEra(era.id)}
              className={`w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                activeEra === era.id
                  ? `bg-gradient-to-br ${colors[era.color].split(" ")[0]} ${colors[era.color].split(" ")[1]}`
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
                  {activeItem.capabilities.map((cap, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-start"
                    >
                      <span className={`mr-2 ${colorClass}`}>•</span>
                      <span className="text-gray-200">{cap}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              {activeItem.limitations.length > 0 && (
                <div>
                  <h5 className="text-lg font-medium mb-2 text-gray-400">Limitations</h5>
                  <ul className="space-y-1">
                    {activeItem.limitations.map((lim, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="mr-2 text-gray-400">•</span>
                        <span className="text-gray-400">{lim}</span>
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
    </div>
  )
}
