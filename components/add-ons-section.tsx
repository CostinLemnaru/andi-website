"use client"

import { motion } from "framer-motion"
import { getLucideIcon } from "@/lib/icons-map"
import { cn } from "@/lib/utils"

interface AddOnsSectionProps {
  data: {
    Title: string
    Subtitle: string
    AddOns: {
      id: number
      Title: string
      Description: string
      Icon: string
      Color: string
      Tag: string
    }[]
  }
}

export default function AddOnsSection({ data }: AddOnsSectionProps) {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-sm bg-gradient-to-r border border-purple-700/50 from-purple-900/70 mt-16 p-8 rounded-xl text-white to-indigo-900/70">
        
            <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{data.Title}</h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">{data.Subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.AddOns.map((addOn, i) => {
                const Icon = getLucideIcon(addOn.Icon)
                const color = addOn.Color.toLowerCase()

                return (
                <motion.div
                    key={addOn.id}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm"
                    whileHover={{
                    y: -5,
                    boxShadow: `0 10px 25px -5px rgba(${color === "blue"
                        ? "59,130,246"
                        : color === "green"
                        ? "16,185,129"
                        : color === "red"
                        ? "239,68,68"
                        : "107,114,128"}, 0.5)`,
                    borderColor:
                        color === "blue"
                        ? "rgba(59,130,246,0.5)"
                        : color === "green"
                        ? "rgba(16,185,129,0.5)"
                        : color === "red"
                        ? "rgba(239,68,68,0.5)"
                        : "rgba(107,114,128,0.3)"
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <div
                    className={cn(
                        "rounded-full w-12 h-12 flex items-center justify-center mb-4",
                        {
                        "bg-gradient-to-r from-blue-600 to-indigo-600": color === "blue",
                        "bg-gradient-to-r from-teal-600 to-emerald-600": color === "green",
                        "bg-gradient-to-r from-purple-600 to-pink-600": color === "red",
                        "bg-gray-700": !["blue", "green", "red"].includes(color)
                        }
                    )}
                    >
                    {Icon && <Icon className="h-6 w-6 text-white" />}
                    </div>

                    <h4 className="text-lg font-bold mb-2 text-white">{addOn.Title}</h4>
                    <p className="text-gray-300 text-sm mb-4">{addOn.Description}</p>
                    <div
                    className={cn(
                        "text-xs font-medium px-2.5 py-1 rounded-full inline-block",
                        {
                        "bg-blue-900/30 text-blue-300": color === "blue",
                        "bg-purple-900/30 text-purple-300": color === "red",
                        "bg-teal-900/30 text-teal-300": color === "green",
                        "bg-gray-700/40 text-gray-300": !["blue", "green", "red"].includes(color)
                        }
                    )}
                    >
                    {addOn.Tag}
                    </div>
                </motion.div>
                )
            })}
            </div>
        </div>
      </div>
    </section>
  )
}
