"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getLucideIcon } from "@/lib/icons-map"
import GradientText from "./gradient-text"

interface IconTitleDescriptionItem {
  id: number
  Title: string
  Icon: string
  Description: string
}

interface IconTextItem {
  id: number
  Title: string
  Icon: string
}

interface IconTextGroup {
  id: number
  Title: string
  IconText: IconTextItem[]
}

interface TabItem {
  id: number
  IconTitleDescription: IconTitleDescriptionItem[]
  IconText: IconTextGroup[]
}

interface Tab {
  id: number
  Title: string
  Items: TabItem[]
}

interface TabsComponentsSectionProps {
  data: {
    __component: string
    id: number
    Title: string
    Tabs: Tab[]
  }
}

export default function TabsComponentsSection({ data }: TabsComponentsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTab = data.Tabs[activeIndex]
  const activeItem = activeTab?.Items?.[0]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
        <GradientText>{data.Title}</GradientText>
      </h2>

      <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
        <div className="flex gap-4">
          {data.Tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 px-6 py-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white"
                  : "bg-gray-900/40 text-gray-400 hover:text-white"
              }`}
            >
              {tab.Title}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {activeItem?.IconTitleDescription?.map((block) => {
              const Icon = getLucideIcon(block.Icon)
              return (
                <div key={block.id} className="flex items-start gap-4">
                  <div className="bg-purple-500/20 rounded-full p-3 flex-shrink-0 mt-1">
                    {Icon && <Icon className="h-6 w-6 text-purple-400" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{block.Title}</h3>
                    <p className="text-gray-300">{block.Description}</p>
                  </div>
                </div>
              )
            })}

            {activeItem?.IconText?.map((resultGroup) => (
              <div key={resultGroup.id}>
                <h3 className="text-lg font-medium text-white mb-4">{resultGroup.Title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resultGroup.IconText.map((result) => {
                    const Icon = getLucideIcon(result.Icon)
                    return (
                      <div key={result.id} className="flex items-start gap-3">
                        {Icon && <Icon className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />}
                        <p className="text-gray-300">{result.Title}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
