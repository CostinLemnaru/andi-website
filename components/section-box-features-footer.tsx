"use client"

import { motion } from "framer-motion"
import { getLucideIcon } from "@/lib/icons-map"
import { cn } from "@/lib/utils"

interface SectionBoxFeaturesFooterProps {
  data: {
    Title: string
    Subtitle: string
    Boxes: {
      id: number
      Title: string
      Icon: string
      Color: string
      ListTitle: string
      FooterText: string
      Description: string
      Item: {
        id: number
        Title: string
        Icon: string
      }[]
    }[]
  }
}

export default function SectionBoxFeaturesFooter({ data }: SectionBoxFeaturesFooterProps) {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{data.Title}</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{data.Subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {data.Boxes.map((box, i) => {
            const BoxIcon = getLucideIcon(box.Icon)
            const color = box.Color.toLowerCase()
            const isFirst = i === 0

            return (
              <motion.div
                key={box.id}
                className="bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{
                  boxShadow: `0 0 25px 0 rgba(${color === "blue" ? "59,130,246" : "156,163,175"}, 0.3)`
                }}
              >
                <div className="flex items-center mb-6">
                  <div className={cn(`rounded-full p-3 mr-4 bg-gradient-to-r`, {
                    "from-blue-500 to-cyan-400": color === "blue",
                    "from-gray-500 to-gray-400": color === "gray"
                  })}>
                    {BoxIcon && <BoxIcon className="h-6 w-6 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{box.Title}</h3>
                </div>

                <p className="text-gray-300 mb-8">{box.Description}</p>

                <h4 className="font-semibold text-lg mb-4 text-white">{box.ListTitle}</h4>
                <ul className="space-y-3 mb-8">
                  {box.Item.map((item, j) => {
                    const ItemIcon = getLucideIcon(item.Icon)
                    return (
                      <motion.li
                        key={item.id}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * (j + 1) }}
                      >
                        {ItemIcon && <ItemIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />}
                        <span className="text-gray-300">{item.Title}</span>
                      </motion.li>
                    )
                  })}
                </ul>

                <div
                  className={cn("p-4 rounded-lg border text-sm italic", {
                    "bg-blue-900/30 border-blue-800/50 text-blue-300": isFirst,
                    "bg-gray-800/50 border-gray-700 text-gray-400": !isFirst
                  })}
                >
                  <p>{box.FooterText}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
