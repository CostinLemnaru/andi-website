"use client"

import ScrollReveal from "@/components/scroll-reveal"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type ColoredBox = {
  id: number
  Title: string
  Content: string
  Color?: "blue" | "purple" | "pink" | "green" | null
  bigTitle?: string | null
}

type Props = {
  data: {
    __component: string
    id: number
    Text: string
    Subtitle: string
    Columns: "one" | "two" | "three"
    ColoredBox: ColoredBox[]
  }
}

const borderColors = {
  blue: "border-blue-500/20 text-blue-400",
  purple: "border-purple-500/20 text-purple-400",
  pink: "border-pink-500/20 text-pink-400",
  green: "border-emerald-500/20 text-emerald-400",
}

export default function PostColoredBoxesSection({ data }: Props) {
  const columnClass = {
    one: "grid-cols-1",
    two: "grid-cols-1 md:grid-cols-2",
    three: "grid-cols-1 md:grid-cols-3",
  }[data.Columns]

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <div id="what-is-sage" className="">
            <h2 className="text-2xl font-bold mb-6 text-white">{data.Text}</h2>

            <p className="text-gray-300 mb-6">{data.Subtitle}</p>

            <div className={`grid ${columnClass} gap-4 mb-6`}>
            {Array.isArray(data.ColoredBox) &&
            data.ColoredBox.map((box) => {
                const safeColor = box.Color && borderColors[box.Color] ? box.Color : "purple"
                const colorClass = borderColors[safeColor]

                return (
                <div
                    key={box.id}
                    className={`bg-gray-800/50 p-4 rounded-lg border ${colorClass.split(" ")[0]}`}
                >
                    <h3 className={`text-lg font-medium mb-2 ${colorClass.split(" ")[1]}`}>{box.Title}</h3>
                    <p className="text-gray-300 whitespace-pre-line">{box.Content?.trim?.()}</p>
                </div>
                )
            })}
            </div>
          </div>
        </motion.div>
      </ScrollReveal>
    </div>
  )
}