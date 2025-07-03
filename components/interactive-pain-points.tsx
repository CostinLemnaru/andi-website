"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Database, Layers, AlertTriangle, Lock, Users } from "lucide-react"

interface PainPoint {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

export default function InteractivePainPoints() {
  const painPoints: PainPoint[] = [
    {
      id: "silos",
      title: "Data Silos & Integration Headaches",
      description:
        "When data is spread across different systems and departments, it's difficult to get a single source of truth. Critical information gets stuck in silos – an estimated 40% of business-critical data is trapped in isolated systems – making comprehensive analysis a nightmare.",
      icon: <Database className="h-6 w-6" />,
      color: "blue",
    },
    {
      id: "overload",
      title: "Tool Overload & Productivity Loss",
      description:
        "The average enterprise today juggles a multitude of analytics and BI applications. One survey found 86% of organizations use at least two different BI platforms, and 61% use four or more. This overload leads to context-switching and duplicated effort.",
      icon: <Layers className="h-6 w-6" />,
      color: "purple",
    },
    {
      id: "inconsistent",
      title: "Inconsistent Metrics & Truth Issues",
      description:
        "When each department uses its own reporting tool or spreadsheet, defining consistent metrics becomes difficult. Marketing's definition of 'active customer' might differ from Finance's, simply because their tools aggregate data differently.",
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "pink",
    },
    {
      id: "security",
      title: "Security & Governance Risks",
      description:
        "Disconnected tools mean disconnected security protocols. Data might be exported to Excel or third-party apps with minimal oversight. This patchwork approach makes it harder to enforce data governance policies uniformly.",
      icon: <Lock className="h-6 w-6" />,
      color: "blue",
    },
    {
      id: "adoption",
      title: "Limited Adoption & Accessibility",
      description:
        "Perhaps the most ironic consequence of siloed, complex toolsets is that the vast majority of employees can't easily use data at all. Traditional BI tools have typically been designed for specialists – the data analysts and data scientists.",
      icon: <Users className="h-6 w-6" />,
      color: "purple",
    },
  ]

  const [activePainPoint, setActivePainPoint] = useState(painPoints[0].id)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  const getActivePainPoint = () => painPoints.find((p) => p.id === activePainPoint) || painPoints[0]

  const colors = {
    blue: "from-blue-500 to-blue-700 border-blue-500/30",
    purple: "from-purple-500 to-purple-700 border-purple-500/30",
    pink: "from-pink-500 to-pink-700 border-pink-500/30",
  }

  const activePoint = getActivePainPoint()
  const activeColor = colors[activePoint.color as keyof typeof colors]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="my-12"
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {painPoints.map((point) => (
          <button
            key={point.id}
            onClick={() => setActivePainPoint(point.id)}
            className={`p-4 rounded-lg flex flex-col items-center text-center transition-all ${
              activePainPoint === point.id
                ? `bg-gradient-to-br ${colors[point.color as keyof typeof colors].split(" ")[0]} ${
                    colors[point.color as keyof typeof colors].split(" ")[1]
                  } text-white`
                : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60"
            }`}
          >
            <div className="mb-2">{point.icon}</div>
            <div className="text-xs md:text-sm font-medium">{point.title.split("&")[0]}</div>
          </button>
        ))}
      </div>

      <motion.div
        key={activePainPoint}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-gray-900/40 backdrop-blur-sm border rounded-lg p-6 bg-gradient-to-br from-${activePoint.color}-900/20 to-gray-900/40 border-${activePoint.color}-500/20`}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full bg-gradient-to-br ${activeColor} text-white flex-shrink-0 hidden md:flex`}>
            {activePoint.icon}
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-2 text-${activePoint.color}-400`}>{activePoint.title}</h3>
            <p className="text-gray-200">{activePoint.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
