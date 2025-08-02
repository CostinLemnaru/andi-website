"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { getLucideIcon } from "@/lib/icons-map"
import { Clock } from "lucide-react"
import GradientText from "./gradient-text"

interface DialogueItem {
  id: number
  Title: string
  Icon: string
  Description: string
}

interface TabContent {
  id: number
  Title: string
  Description: string
  Items: DialogueItem[]
}

interface TabBox {
  id: number
  Title: string
  Description: string
  Items: TabContent[]
}

interface TabsBoxSectionProps {
  __component: string
  id: number
  Title: string
  Tabs: TabBox[]
}

type Props = {
  data: TabsBoxSectionProps
}

export default function TabsBoxSection({ data }: Props) {
  const { Title, Tabs } = data
  const [activeIndex, setActiveIndex] = useState(0)

  const active = Tabs[activeIndex]
  const conversation = active?.Items?.[0] // Each tab has 1 conversation

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {Title && (
        <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
          <GradientText>{Title}</GradientText>
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveIndex(index)}
            className={`text-left p-6 rounded-xl transition-all duration-300 ${
              activeIndex === index
                ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-purple-500/30"
                : "bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50"
            }`}
          >
            <h3 className="text-lg font-medium text-white mb-2">{tab.Title}</h3>
            <p className="text-gray-400 text-sm">{tab.Description}</p>
          </button>
        ))}
      </div>

      {conversation && (
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-medium text-white mb-2">{conversation.Title}</h3>
            <p className="text-gray-300">{conversation.Description}</p>
          </div>

          <div className="space-y-4 mb-8">
            {conversation.Items.map((step, index) => {
              const Icon = getLucideIcon(step.Icon)
              const type =
                step.Title.toLowerCase() === "andi"
                  ? "ai"
                  : step.Title.toLowerCase() === "human"
                  ? "human"
                  : step.Title.toLowerCase() === "system"
                  ? "system"
                  : step.Title.toLowerCase() === "outcome"
                  ? "outcome"
                  : "neutral"

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-start gap-4 p-4 rounded-lg ${
                    type === "ai"
                      ? "bg-blue-500/10 border border-blue-500/20"
                      : type === "human"
                      ? "bg-purple-500/10 border border-purple-500/20"
                      : type === "system"
                      ? "bg-green-500/10 border border-green-500/20"
                      : type === "outcome"
                      ? "bg-indigo-500/10 border border-indigo-500/20"
                      : "bg-gray-800/30 border border-gray-700/30"
                  }`}
                >
                  <div
                    className={`rounded-full p-2 flex-shrink-0 ${
                      type === "ai"
                        ? "bg-blue-500/20"
                        : type === "human"
                        ? "bg-purple-500/20"
                        : type === "system"
                        ? "bg-green-500/20"
                        : type === "outcome"
                        ? "bg-indigo-500/20"
                        : "bg-gray-700/20"
                    }`}
                  >
                    {Icon && <Icon className="h-5 w-5 text-white" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">{step.Title}</div>
                    <p className="text-gray-300">{step.Description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Outcome Box */}
          {conversation.Items.some((item) => item.Title.toLowerCase() === "outcome") && (
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <h4 className="text-lg font-medium text-white">Outcome</h4>
              </div>
              <p className="text-gray-300">
                {
                  conversation.Items.find((i) => i.Title.toLowerCase() === "outcome")?.Description
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
