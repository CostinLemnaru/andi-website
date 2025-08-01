"use client"

import ScrollReveal from "@/components/scroll-reveal"
import GradientText from "@/components/gradient-text"
import { getLucideIcon } from "@/lib/icons-map"
import clsx from "clsx"

interface BoxItem {
  title: string
  subtitle: string
  color: string
}

interface BoxConfig {
  Title: string
  Description: string
  Icon: string
  IconColor?: string
  Config: {
    boxes: BoxItem[]
  }
}

interface BoxNestedSectionProps {
  data: {
    Title: string
    Boxes: BoxConfig[]
  }
}

export default function BoxNestedSection({ data }: BoxNestedSectionProps) {
    console.log(data)
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {data?.Title && (
        <h2 className="text-2xl sm:text-3xl font-light mb-12 text-center">
          <GradientText>{data.Title}</GradientText>
        </h2>
      )}

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.Boxes.map((box, index) => {
            const Icon = getLucideIcon(box.Icon)
            const colorClass = `text-${box.IconColor || "white"}-400`

            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
              >
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 mb-4">
                    {Icon && <Icon className={clsx("h-8 w-8", colorClass)} />}
                  </div>
                  <h3 className="text-xl font-medium text-white">{box.Title}</h3>
                </div>
                <p className="text-gray-300">{box.Description}</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    {box.Config?.boxes?.map((item, i) => (

                    <div
                        key={i}
                        className="bg-gray-800/50 p-3 rounded-lg text-center"
                    >
                        <p className="text-sm text-gray-400">{item.title}</p>
                        <p
                        className={clsx(
                            "text-xl font-bold",
                            item.color === "green" ? "text-green-400" : "text-white"
                        )}
                        >
                        {item.subtitle}
                        </p>
                    </div>
                    ))}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollReveal>
    </div>
  )
}