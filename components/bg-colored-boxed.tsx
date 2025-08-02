"use client"

import { motion } from "framer-motion"

interface BgColoredBoxedProps {
  data: {
    __component: string
    id: number
    Title: string
    Description: string
    Color: string // ex: "blue", "purple", "cyan"
  }
}

export default function BgColoredBoxed({ data }: BgColoredBoxedProps) {
  const { Title, Description, Color = "blue" } = data

  const fromColor = `from-${Color}-900/70`
  const toColor = `to-cyan-900/70` // you can also derive this dynamically if needed
  const borderColor = `border-${Color}-700/50`

  const classes = [
    "mt-12 p-6",
    "backdrop-blur-sm rounded-xl text-white text-center",
    "bg-gradient-to-r",
    fromColor,
    toColor,
    "border",
    borderColor,
  ].join(" ")

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{
        boxShadow: `0 0 30px 0 rgba(59, 130, 246, 0.3)`, // Optional: can be color-dynamic too
      }}
    >
      <h3 className="text-xl font-bold mb-2">{Title}</h3>
      <p>{Description}</p>
    </motion.div>
          </div>
    </section>
  )
}
