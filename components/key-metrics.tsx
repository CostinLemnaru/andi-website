"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Metric {
  value: string
  label: string
  prefix?: string
  suffix?: string
}

interface KeyMetricsProps {
  metrics: Metric[]
}

export default function KeyMetrics({ metrics }: KeyMetricsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("metrics-container")
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <div id="metrics-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 flex flex-col items-center justify-center text-center"
        >
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            {metric.prefix && <span>{metric.prefix}</span>}
            {metric.value}
            {metric.suffix && <span>{metric.suffix}</span>}
          </div>
          <div className="text-gray-400 text-sm sm:text-base">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
