"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TimelineEvent {
  year: string
  title: string
  description: string
}

interface InteractiveTimelineProps {
  events: TimelineEvent[]
}

export default function InteractiveTimeline({ events }: InteractiveTimelineProps) {
  const [activeEvent, setActiveEvent] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="my-12"
    >
      <div className="flex overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex space-x-1">
          {events.map((event, index) => (
            <button
              key={index}
              onClick={() => setActiveEvent(index)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeEvent === index
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {event.year}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeEvent}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 mt-4"
      >
        <h3 className="text-xl font-bold mb-2 text-purple-400">{events[activeEvent].title}</h3>
        <p className="text-gray-200">{events[activeEvent].description}</p>
      </motion.div>
    </motion.div>
  )
}
