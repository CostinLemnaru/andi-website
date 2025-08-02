"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getLucideIcon } from "@/lib/icons-map"

export interface TabsVerticalSectionProps {
  data: {
    Title: string
    Subtitle: string
    Tabs: {
      id: number
      Title: string
      Icon: string
      Color: string
      Content: {
        id: number
        Title: string
        Icon: string
        Description: string
        ItemsTitle: string
        Items: {
          id: number
          Title: string
          Icon: string
        }[]
      }
    }[]
  }
}

export default function TabsVerticalSection({ data }: TabsVerticalSectionProps) {
  const [activeTabId, setActiveTabId] = useState<number>(data.Tabs[0]?.id ?? 0)

  const activeTab = data.Tabs.find((tab) => tab.id === activeTabId)

  const IconComponent = activeTab?.Icon ? getLucideIcon(activeTab.Icon) : null

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{data.Title}</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{data.Subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-2">
            {data.Tabs.map((tab) => {
              const TabIcon = getLucideIcon(tab.Icon)
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg flex items-center transition-all",
                    activeTabId === tab.id
                      ? `bg-gradient-to-r from-${tab.Color}-400 to-${tab.Color}-500 text-white`
                      : "bg-gray-800 hover:bg-gray-700 text-gray-200",
                  )}
                  whileHover={{ x: activeTabId === tab.id ? 0 : 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {TabIcon && <TabIcon className="h-5 w-5 mr-3" />}
                  <span className="font-medium">{tab.Title}</span>
                </motion.button>
              )
            })}
          </div>

          <div className="lg:col-span-2">
            {activeTab && (
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className={cn("rounded-full p-3 mr-4", `bg-gradient-to-r from-${activeTab.Color}-400 to-${activeTab.Color}-500`)}>
                    {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{activeTab.Content.Title}</h3>
                </div>

                <p className="text-gray-300 mb-6">{activeTab.Content.Description}</p>

                <h4 className="font-semibold text-lg mb-4 text-white">{activeTab.Content.ItemsTitle}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeTab.Content.Items.map((item, index) => {
                    const ItemIcon = getLucideIcon(item.Icon)
                    return (
                      <motion.div
                        key={item.id}
                        className="flex items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {ItemIcon && <ItemIcon className="h-4 w-4 text-gray-400 mr-2" />}
                        <span className="text-sm text-gray-300">{item.Title}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
