"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface Props {
  data: {
    __component: string
    id: number
    Text: string
    centered?: boolean
  }
}

export default function PostTitleSection({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
        className="my-8"
        >
        <p
            className={`text-xl font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500 ${
            data.centered ? "text-center" : ""
            }`}
        >
            {data.Text.split("\n").map((line, i) => (
            <span key={i} className="block">
                {line}
            </span>
            ))}
        </p>
        </motion.div>
    </div>
  )
}