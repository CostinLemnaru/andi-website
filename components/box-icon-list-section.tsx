"use client"

import { getLucideIcon } from "@/lib/icons-map"
import ScrollReveal from "./scroll-reveal"

interface BoxItem {
  id: number
  Title: string
  Icon: string
  Color: string
  Description: string
}

interface BoxIconListSectionProps {
  data: {
    __component: string
    id: number
    Title: string
    Items: BoxItem[]
  }
}

export default function BoxIconListSection({ data }: BoxIconListSectionProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <ScrollReveal>
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
          <h3 className="text-xl font-medium text-white mb-6 text-center">{data.Title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.Items.map((item) => {
              const Icon = getLucideIcon(item.Icon)
              const color = item.Color?.toLowerCase() || "gray"

              return (
                <div key={item.id} className="bg-gray-800/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`bg-${color}-500/20 rounded-full p-2`}>
                      {Icon && <Icon className={`h-5 w-5 text-${color}-400`} />}
                    </div>
                    <h4 className="text-lg font-medium text-white">{item.Title}</h4>
                  </div>
                  <p className="text-gray-300">{item.Description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
