"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface StatCardProps {
  value: string
  label: string
  color?: "blue" | "purple" | "pink"
  delay?: number
}

export default function StatCard({ value, label, color = "blue", delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" })

  const gradients = {
    blue: "from-blue-500 to-blue-700",
    purple: "from-purple-500 to-purple-700",
    pink: "from-pink-500 to-pink-700",
  }

  const borders = {
    blue: "border-blue-500/30",
    purple: "border-purple-500/30",
    pink: "border-pink-500/30",
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`bg-gray-900/40 backdrop-blur-sm border ${borders[color]} rounded-lg p-6 hover:shadow-lg hover:shadow-${color}-500/10 transition-all duration-300`}
    >
      <div
        className={`text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${gradients[color]}`}
      >
        {value}
      </div>
      <div className="text-gray-300 text-sm">{label}</div>
    </motion.div>
  )
}
