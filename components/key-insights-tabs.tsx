"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getLucideIcon } from "@/lib/icons-map"

interface Props {
  data: {
    __component: string
    id: number
    Title: string
    Description?: string | null
    Tabs: {
      id: number
      Title: string
      TabContent: {
        id: number
        Title: string
        Icon: string
        Color: string
        Description: string
      }
    }[]
  }
}


export default function PostTabsIconsSection({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
        className="my-12"
      >
        <h3 className="text-xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          {data.Title}
        </h3>

        <Tabs defaultValue={data.Tabs[0]?.Title.toLowerCase()} className="w-full">
          <TabsList className={`flex flex-wrap gap-2 mb-6 justify-start`}>
            {data.Tabs.map((tab) => {
              const Icon = getLucideIcon(tab.TabContent.Icon)
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.Title.toLowerCase()}
                  className="flex items-center gap-2"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span className="hidden md:inline">{tab.Title}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {data.Tabs.map((tab) => {
            const Icon = getLucideIcon(tab.TabContent.Icon)
            const color = tab.TabContent.Color
            const colorBorder = `border-${color}-500/20`
            const colorText = `text-${color}-400`
            return (
              <TabsContent
                key={tab.id}
                value={tab.Title.toLowerCase()}
                className={`bg-gray-900/40 backdrop-blur-sm border ${colorBorder} rounded-lg p-6`}
              >
                <h4 className={`text-lg font-semibold mb-4 ${colorText}`}>{tab.TabContent.Title}</h4>
                <ul className="space-y-3 text-gray-200">
                  {tab.TabContent.Description.split("\n").map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`${colorText} mr-2`}>•</span>
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            )
          })}
        </Tabs>
      </motion.div>
      </div>
  )
}
