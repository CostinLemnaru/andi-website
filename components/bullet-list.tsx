"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface BulletListProps {
  items: string[]
  delay?: number
}

export default function BulletList({ items, delay = 0 }: BulletListProps) {
  const ref = useRef<HTMLUListElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.ul
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="space-y-4 my-6"
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: (delay + index) * 0.1 }}
          className="flex items-start"
        >
          <CheckCircle className="h-5 w-5 text-purple-400 mr-3 mt-1 flex-shrink-0" />
          <span className="text-gray-200">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
