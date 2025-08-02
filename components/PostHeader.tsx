"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type Props = {
  Title: string
  Subtitle: string
  createdAt: string
}

export default function PostHeader({ Title, Subtitle, createdAt }: Props) {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px 0px" })

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
      <div className="max-w-4xl mx-auto lg:px-8 py-12">
    <motion.div
      ref={headerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="mb-12"
    >
      <div className="flex items-center text-sm text-gray-400 mb-4">
        <span>{formattedDate}</span>
        {/* <span className="mx-2">•</span>
        <span>15 min read</span>
        <span className="mx-2">•</span>
        <span>Zamora AI Research</span> */}
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500">
        {Title}
      </h1>

      <p className="text-xl text-gray-300 mb-8">
        {Subtitle}
      </p>
    </motion.div>
    </div>
  )
}
