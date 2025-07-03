"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

interface QuoteCardProps {
  quote: string
  source?: string
  delay?: number
}

export default function QuoteCard({ quote, source, delay = 0 }: QuoteCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: delay * 0.1 }}
      className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 my-12 relative"
    >
      <Quote className="absolute top-4 left-4 h-8 w-8 text-purple-400/30" />
      <div className="text-xl md:text-2xl text-gray-100 italic ml-6 mb-4">{quote}</div>
      {source && <div className="text-right text-gray-400 text-sm">— {source}</div>}
    </motion.div>
  )
}
