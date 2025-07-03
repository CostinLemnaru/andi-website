"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Slider } from "@/components/ui/slider"

export default function BenefitsCalculator() {
  const [employees, setEmployees] = useState(100)
  const [dataUsers, setDataUsers] = useState(20)
  const [toolsCount, setToolsCount] = useState(4)
  const [integrationTime, setIntegrationTime] = useState(40)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  // Calculate benefits
  const currentDataUsers = dataUsers
  const potentialDataUsers = Math.round(employees * 0.7) // 70% of employees could use data with unified platform
  const additionalDataUsers = potentialDataUsers - currentDataUsers

  const hoursPerWeekSaved = Math.round((toolsCount - 1) * 2 * dataUsers) // Each additional tool costs 2 hours per week per data user
  const hoursPerYearSaved = hoursPerWeekSaved * 50 // 50 working weeks per year

  const integrationHoursSaved = Math.round(integrationTime * (toolsCount - 1)) // Integration time saved by having one platform

  const totalHoursSaved = hoursPerYearSaved + integrationHoursSaved
  const productivityGain = Math.round((totalHoursSaved / (dataUsers * 40 * 50)) * 100) // Productivity gain as percentage

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="my-12 bg-gray-900/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
    >
      <h3 className="text-xl font-bold mb-6 text-center text-purple-400">Business Impact Calculator</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of analysts in your organization: {employees}
            </label>
            <Slider
              value={[employees]}
              min={1}
              max={100}
              step={1}
              onValueChange={(value) => setEmployees(value[0])}
              className="my-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hours spent analyzing data per week per analyst: {integrationTime}
            </label>
            <Slider
              value={[integrationTime]}
              min={1}
              max={40}
              step={1}
              onValueChange={(value) => setIntegrationTime(value[0])}
              className="my-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hours spent sharing/communicating insights per week: {dataUsers}
            </label>
            <Slider
              value={[dataUsers]}
              min={1}
              max={20}
              step={1}
              onValueChange={(value) => setDataUsers(value[0])}
              className="my-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of decision-makers receiving reports: {toolsCount}
            </label>
            <Slider
              value={[toolsCount]}
              min={1}
              max={50}
              step={1}
              onValueChange={(value) => setToolsCount(value[0])}
              className="my-4"
            />
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6">
          <h4 className="text-lg font-medium mb-4 text-blue-400">Estimated Benefits</h4>

          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-400 mb-1">Tangible Benefits</div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white">Analysis time saved</span>
                <span className="text-lg font-bold text-white">
                  {Math.round(integrationTime * employees * 0.4 * 50)} hours/year
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white">Communication time saved</span>
                <span className="text-lg font-bold text-white">
                  {Math.round(dataUsers * toolsCount * 0.7 * 50)} hours/year
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white">Decision-making time reduced</span>
                <span className="text-lg font-bold text-white">{Math.round(toolsCount * 3 * 50)}%</span>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-1">Strategic Benefits</div>
              <div className="bg-gray-700/30 p-3 rounded-md mb-2">
                <div className="text-sm font-medium text-blue-300 mb-1">Improved Decision Quality</div>
                <div className="text-xs text-gray-300">
                  Unified analytics provides a complete picture, reducing the risk of decisions based on partial
                  information.
                </div>
              </div>
              <div className="bg-gray-700/30 p-3 rounded-md mb-2">
                <div className="text-sm font-medium text-blue-300 mb-1">Competitive Advantage</div>
                <div className="text-xs text-gray-300">
                  Faster insights-to-action cycle creates market opportunities and faster response to changes.
                </div>
              </div>
              <div className="bg-gray-700/30 p-3 rounded-md">
                <div className="text-sm font-medium text-blue-300 mb-1">Strategic Alignment</div>
                <div className="text-xs text-gray-300">
                  Shared insights create alignment between departments and leadership on strategic priorities.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
