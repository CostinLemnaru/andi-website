"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, X, AlertCircle, HelpCircle } from "lucide-react"

type Rating = 0 | 1 | 2 | 3
type Platform = "BI" | "RPA" | "CDP" | "SAGE"

interface Capability {
  name: string
  description: string
  ratings: Record<Platform, Rating>
}

export default function CapabilityMatrix() {
  const capabilities: Capability[] = [
    {
      name: "Historical Reporting",
      description: "Ability to analyze and visualize past performance data",
      ratings: { BI: 3, RPA: 0, CDP: 1, SAGE: 3 },
    },
    {
      name: "Predictive Analytics",
      description: "Forecasting future trends based on historical data",
      ratings: { BI: 1, RPA: 0, CDP: 2, SAGE: 3 },
    },
    {
      name: "Action/Execution",
      description: "Ability to take automated actions based on insights",
      ratings: { BI: 0, RPA: 3, CDP: 0, SAGE: 3 },
    },
    {
      name: "Strategic Guidance",
      description: "Providing recommendations for business decisions",
      ratings: { BI: 0, RPA: 0, CDP: 0, SAGE: 3 },
    },
    {
      name: "Real-Time Collaboration",
      description: "Enabling teams to work together on insights and actions",
      ratings: { BI: 0, RPA: 0, CDP: 0, SAGE: 2 },
    },
    {
      name: "AI-Powered Suggestions",
      description: "Using AI to recommend next best actions",
      ratings: { BI: 1, RPA: 0, CDP: 0, SAGE: 3 },
    },
    {
      name: "Natural Language Interface",
      description: "Ability to interact using conversational language",
      ratings: { BI: 1, RPA: 0, CDP: 0, SAGE: 3 },
    },
    {
      name: "Cross-System Integration",
      description: "Connecting with multiple data sources and systems",
      ratings: { BI: 2, RPA: 1, CDP: 2, SAGE: 3 },
    },
  ]

  const [activeCapability, setActiveCapability] = useState<string | null>(null)
  const [activePlatform, setActivePlatform] = useState<Platform | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  const renderRating = (rating: Rating) => {
    switch (rating) {
      case 0:
        return <X className="h-5 w-5 text-red-500" />
      case 1:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Check className="h-5 w-5 text-blue-500" />
      case 3:
        return (
          <div className="flex">
            <Check className="h-5 w-5 text-emerald-500" />
            <Check className="h-5 w-5 text-emerald-500 -ml-2" />
          </div>
        )
    }
  }

  const platformColors = {
    BI: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    RPA: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
    CDP: "bg-purple-500/20 border-purple-500/30 text-purple-400",
    SAGE: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
  }

  const platformDescriptions = {
    BI: "Business Intelligence tools focus on data visualization and reporting.",
    RPA: "Robotic Process Automation tools automate repetitive tasks.",
    CDP: "Customer Data Platforms unify customer data across touchpoints.",
    SAGE: "Strategic AI Guidance & Execution platforms combine intelligence with action.",
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="my-12"
    >
      <h3 className="text-xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500">
        SAGE vs. Traditional Platforms: Capability Comparison
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-left text-gray-300 font-medium">Capability</th>
              {(["BI", "RPA", "CDP", "SAGE"] as Platform[]).map((platform) => (
                <th
                  key={platform}
                  className={`p-3 text-center font-medium cursor-pointer transition-colors ${
                    activePlatform === platform ? platformColors[platform] : "text-gray-300"
                  }`}
                  onMouseEnter={() => setActivePlatform(platform)}
                  onMouseLeave={() => setActivePlatform(null)}
                >
                  {platform}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {capabilities.map((capability) => (
              <tr
                key={capability.name}
                className={`border-t border-gray-800 hover:bg-gray-800/30 transition-colors ${
                  activeCapability === capability.name ? "bg-gray-800/50" : ""
                }`}
                onMouseEnter={() => setActiveCapability(capability.name)}
                onMouseLeave={() => setActiveCapability(null)}
              >
                <td className="p-3 text-gray-200">
                  <div className="flex items-center">
                    <span>{capability.name}</span>
                    <HelpCircle className="h-4 w-4 ml-2 text-gray-500" />
                  </div>
                </td>
                {(["BI", "RPA", "CDP", "SAGE"] as Platform[]).map((platform) => (
                  <td
                    key={`${capability.name}-${platform}`}
                    className={`p-3 text-center ${
                      activePlatform === platform ? platformColors[platform].split(" ")[0] : ""
                    }`}
                  >
                    {renderRating(capability.ratings[platform])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info box */}
      <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
        {activeCapability ? (
          <div>
            <h4 className="font-medium text-white mb-1">
              {capabilities.find((c) => c.name === activeCapability)?.name}
            </h4>
            <p className="text-gray-300 text-sm">
              {capabilities.find((c) => c.name === activeCapability)?.description}
            </p>
          </div>
        ) : activePlatform ? (
          <div>
            <h4 className={`font-medium mb-1 ${platformColors[activePlatform].split(" ")[2]}`}>{activePlatform}</h4>
            <p className="text-gray-300 text-sm">{platformDescriptions[activePlatform]}</p>
          </div>
        ) : (
          <div className="text-gray-400 text-sm italic">
            Hover over capabilities or platforms for more information. SAGE provides comprehensive coverage across all
            critical capabilities.
          </div>
        )}
      </div>
    </motion.div>
  )
}
