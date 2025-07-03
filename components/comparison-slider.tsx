"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"

interface ComparisonSliderProps {
  leftTitle: string
  rightTitle: string
  leftContent: React.ReactNode
  rightContent: React.ReactNode
}

export default function ComparisonSlider({ leftTitle, rightTitle, leftContent, rightContent }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" })

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(newPosition)
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(newPosition)
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="relative h-80 my-12 select-none touch-none"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
        <div
          className="absolute top-0 left-0 h-full bg-gray-900/60 backdrop-blur-sm border-r border-white/20 z-10 flex items-center"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="p-6 max-w-full">
            <h3 className="text-xl font-bold mb-4 text-blue-400">{leftTitle}</h3>
            <div className="text-gray-200 overflow-hidden">{leftContent}</div>
          </div>
        </div>

        <div
          className="absolute top-0 right-0 h-full bg-gray-900/40 backdrop-blur-sm flex items-center"
          style={{ width: `${100 - sliderPosition}%` }}
        >
          <div className="p-6 max-w-full">
            <h3 className="text-xl font-bold mb-4 text-purple-400">{rightTitle}</h3>
            <div className="text-gray-200 overflow-hidden">{rightContent}</div>
          </div>
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center -ml-4">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 text-sm font-medium text-blue-400 z-30">{leftTitle}</div>
      <div className="absolute bottom-4 right-4 text-sm font-medium text-purple-400 z-30">{rightTitle}</div>
    </motion.div>
  )
}
