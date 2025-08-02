"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Item {
  id: number
  Title: string
  Description: string
  Color: string | null
}

interface InlineBoxesSectionProps {
  data: {
    __component: string
    id: number
    whiteTheme: boolean | null
    Items: Item[]
  }
}

export default function InlineBoxesSection({ data }: InlineBoxesSectionProps) {
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

    const element = document.getElementById("inline-boxes-section")
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  let layoutClasses = data.whiteTheme ? "max-w-6xl mx-auto" : "";
  let themeClasses = data.whiteTheme 
  ? "rounded-lg border text-card-foreground shadow-sm bg-white/5 backdrop-blur-sm border-white/10 p-6 flex flex-col items-center justify-center text-center"
  : "bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 flex flex-col items-center justify-center text-center"
  return (
    <div id="inline-boxes-section" className={`${layoutClasses} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12`}>
      {data.Items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`${themeClasses}`}
        >
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            {item.Title}
          </div>
          <div className="text-gray-400 text-sm sm:text-base">{item.Description}</div>
        </motion.div>
      ))}
    </div>
  )
}
