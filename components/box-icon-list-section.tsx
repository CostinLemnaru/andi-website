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
    isTransparent?: boolean
    isWideLayout?: boolean
    hasBackground?: boolean
  }
}

export default function BoxIconListSection({ data }: BoxIconListSectionProps) {
  let {
    Title,
    Items,
    isTransparent = false,
    isWideLayout = false,
    hasBackground = false,
  } = data

  const wrapperClasses = [
    isWideLayout ? "w-full" : "max-w-5xl",
    "mx-auto px-4 sm:px-6 py-12",
  ].join(" ")

  const containerClasses = [
    "rounded-xl p-8",
    !isTransparent && hasBackground
      ? "bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50"
      : ""
  ].join(" ")

  const boxClasses = !hasBackground
    ? `${isTransparent ? "border border-white/10 bg-white/5" : "bg-gray-800/50"} p-6 rounded-lg`
    : "bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800/50 hover:border-purple-500/30 transition-colors"
  return (
    <div className={wrapperClasses}>
      <ScrollReveal>
        <div className={containerClasses}>
          {hasBackground ? (
            <h3 className="text-xl font-medium text-white mb-6 text-center">{Title}</h3>
          ) : (
            <h2 className="text-3xl sm:text-4xl font-light mb-16 text-center">{Title}</h2>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Items.map((item) => {
              const Icon = getLucideIcon(item.Icon)
              const color = item.Color?.toLowerCase() || "gray"

              return (
                <div key={item.id} className={boxClasses}>
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
