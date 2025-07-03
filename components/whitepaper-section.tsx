"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface WhitepaperSectionProps {
  title: string
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function WhitepaperSection({ title, children, className = "", delay = 0 }: WhitepaperSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: delay * 0.1 }}
      className={`mb-16 ${className}`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        {title}
      </h2>
      <div className="text-gray-200 space-y-4">{children}</div>
    </motion.section>
  )
}
