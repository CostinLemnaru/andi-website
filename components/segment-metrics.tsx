"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import GradientText from "./gradient-text"

interface SegmentMetric {
  label: string
  value: string
  description: string
  icon: React.ReactNode
}

interface SegmentMetricsProps {
  title: string
  metrics: SegmentMetric[]
}

export default function SegmentMetrics({ title, metrics }: SegmentMetricsProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-light mb-12 text-center">
        <GradientText>{title}</GradientText>
      </h2>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-colors duration-500 group"
          >
            <div className="flex items-start gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500">
                {metric.icon}
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{metric.label}</h3>
                <p className="text-gray-400">{metric.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
