"use client"

import ScrollReveal from "@/components/scroll-reveal"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { getLucideIcon } from "@/lib/icons-map"

interface Tab {
  id: number
  TabTitle: string
  TabContentTitle: string
  TabContentDescription: string
  Icon: string
  Color: "blue" | "purple" | "pink" | "red"
}

interface Props {
  data: {
    __component: string
    id: number
    Tabs: Tab[]
  }
}

const colorGradients = {
  blue: "from-blue-500 to-blue-700 border-blue-500/30",
  purple: "from-purple-500 to-purple-700 border-purple-500/30",
  pink: "from-pink-500 to-pink-700 border-pink-500/30",
  red: "from-red-500 to-red-700 border-red-500/30",
}

const textColors = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
  red: "text-red-400",
}

export default function PostTabsColoredBoxesSection({ data }: Props) {
  const [activeId, setActiveId] = useState<number>(data.Tabs[0]?.id || 0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  const activeTab = data.Tabs.find((t) => t.id === activeId) || data.Tabs[0]
  const Icon = getLucideIcon(activeTab?.Icon || "Circle")
  const bgColor = colorGradients[activeTab?.Color] || colorGradients.purple
  const textColor = textColors[activeTab?.Color] || textColors.purple

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="my-12"
    >
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
          {data.Tabs.map((tab) => {
            const TabIcon = getLucideIcon(tab.Icon || "Circle")
            const active = tab.id === activeId
            return (
              <button
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                className={`p-4 rounded-lg flex flex-col items-center text-center transition-all ${
                  active
                    ? `bg-gradient-to-br ${bgColor} text-white`
                    : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60"
                }`}
              >
                <div className="mb-2">
                  {TabIcon && <TabIcon className="h-6 w-6" />}
                </div>
                <div className="text-xs md:text-sm font-medium">
                  {tab.TabTitle.split("&")[0]}
                </div>
              </button>
            )
          })}
        </div>

        <motion.div
          key={activeTab?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`bg-gray-900/40 backdrop-blur-sm rounded-lg p-6 bg-gradient-to-br`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full bg-gradient-to-br ${bgColor} text-white flex-shrink-0 hidden md:flex`}>
              {Icon && <Icon className="h-6 w-6" />}
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{activeTab.TabContentTitle}</h3>
              <p className="text-gray-200">{activeTab.TabContentDescription}</p>
            </div>
          </div>
        </motion.div>
      </ScrollReveal>
    </motion.div>
    </div>
  )
}