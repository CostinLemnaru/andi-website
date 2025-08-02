"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getLucideIcon } from "@/lib/icons-map"
import GradientText from "./gradient-text"
import { ArrowRight } from "lucide-react"

interface TabItem {
  id: number
  Title: string
  Icon: string
}

interface Tab {
  id: number
  Title: string
  Items: TabItem[]
}

interface TabsSectionProps {
  __component: string
  id: number
  Title: string | null
  Tabs: Tab[]
  Result?: string
}

type Props = {
  data: TabsSectionProps
}

export default function TabsSection({ data }: Props) {
  const { Title, Tabs, Result } = data
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTab = Tabs?.[activeIndex]

  if (!Array.isArray(Tabs) || Tabs.length === 0) return null

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {Title && (
        <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
          <GradientText>{Title}</GradientText>
        </h2>
      )}

      {/* Tab Buttons */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-full p-1 flex flex-wrap">
          {Tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveIndex(index)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeIndex === index
                  ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.Title}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative min-h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTab?.Items?.map((item, index) => {
                const Icon = getLucideIcon(item.Icon)
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 flex items-start gap-3"
                  >
                    <div className="bg-purple-500/20 rounded-full p-2 flex-shrink-0">
                      {Icon && <Icon className="h-5 w-5 text-purple-400" />}
                    </div>
                    <p className="text-gray-300 text-sm">{item.Title}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Optional Result Section */}
      {Result && (
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
          <p className="text-gray-300">{Result}</p>
        </motion.div>
      )}
    </div>
  )
}