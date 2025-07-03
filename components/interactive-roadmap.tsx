"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { wrap } from "popmotion"
import { BarChartIcon as ChartBar, Lock, Puzzle, Gauge, ChevronLeft, ChevronRight } from "lucide-react"

interface RoadmapItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  timeframe: string
  phase: string
}

const roadmapItems: RoadmapItem[] = [
  {
    id: "forecasting",
    title: "Advanced Forecasting & Predictive Analytics",
    description:
      "In upcoming releases, ANDI will offer more powerful forecasting tools that allow companies to literally see what's coming around the corner. This goes beyond basic trend lines to full AI-powered forecasting models.",
    icon: <ChartBar className="h-8 w-8" />,
    timeframe: "V1 - Early 2026",
    phase: "MVP",
  },
  {
    id: "governance",
    title: "Automated Data Governance & Quality Management",
    description:
      "As companies scale up their data usage, maintaining data quality and governance can become a bottleneck. ANDI's roadmap addresses this through automated data governance features.",
    icon: <Lock className="h-8 w-8" />,
    timeframe: "V2 - Late 2026",
    phase: "Platform",
  },
  {
    id: "integrations",
    title: "Customizable Integrations & Open API Ecosystem",
    description:
      "Recognizing that every enterprise has a unique tech stack, Zamora plans to make ANDI even more flexible through custom integrations. Beyond the connectors it already provides, ANDI will offer an open API and integration framework.",
    icon: <Puzzle className="h-8 w-8" />,
    timeframe: "Early 2027",
    phase: "Scale",
  },
  {
    id: "realtime",
    title: "Real-Time Analytics & Alerts",
    description:
      "Business doesn't happen in batch intervals – it's continuous. To support truly agile decision-making, ANDI is slated to introduce full real-time analytics processing.",
    icon: <Gauge className="h-8 w-8" />,
    timeframe: "2-5 years",
    phase: "Long-term",
  },
]

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }
  },
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function InteractiveRoadmap() {
  const [[page, direction], setPage] = useState([0, 0])
  const itemIndex = wrap(0, roadmapItems.length, page)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-200px 0px" })

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const handleDotClick = (newIndex: number) => {
    const diff = newIndex - itemIndex
    if (diff === 0) return
    paginate(diff)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center w-full my-16 md:my-24"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        Roadmap to the Future
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl">
        Our vision extends beyond today. Drag, swipe, or click through our interactive roadmap to see how we're building
        the future of analytics, one phase at a time.
      </p>

      <div className="relative w-full h-[450px] md:h-[500px] max-w-4xl flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="roadmap-card absolute w-[80%] md:w-[60%] h-[420px] md:h-[450px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-lg">
                  {roadmapItems[itemIndex].icon}
                </div>
                <span className="px-3 py-1 text-sm font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full">
                  {roadmapItems[itemIndex].phase}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{roadmapItems[itemIndex].title}</h3>
              <p className="text-gray-300 leading-relaxed">{roadmapItems[itemIndex].description}</p>
            </div>
            <div className="text-right font-mono text-sm text-blue-300">{roadmapItems[itemIndex].timeframe}</div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="next absolute top-1/2 right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.div>
        <motion.div
          className="prev absolute top-1/2 left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        {roadmapItems.map((item, i) => (
          <div
            key={item.id}
            onClick={() => handleDotClick(i)}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="relative w-4 h-4">
              <motion.div
                className="w-full h-full rounded-full bg-gray-600"
                animate={{ scale: itemIndex === i ? 1.5 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              {itemIndex === i && (
                <motion.div
                  layoutId="active-dot-outline"
                  className="absolute inset-0 rounded-full border-2 border-purple-500"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
            <span
              className={`text-xs font-medium transition-colors ${
                itemIndex === i ? "text-purple-300" : "text-gray-500 group-hover:text-gray-300"
              }`}
            >
              {item.phase}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
