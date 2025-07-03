"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence, type PanInfo } from "framer-motion"
import { ArrowRight, AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface FlowStep {
  id: string
  title: string
  description: string
  traditional: {
    outcome: string
    result: "positive" | "negative" | "neutral"
  }
  sage: {
    outcome: string
    result: "positive" | "negative" | "neutral"
  }
}

export default function DecisionFlow() {
  const flowSteps: FlowStep[] = [
    {
      id: "identify",
      title: "1. Identify Issue",
      description: "A potential problem or opportunity is detected in business operations.",
      traditional: {
        outcome: "Manual monitoring of dashboards or reports. Issues often spotted after they become significant.",
        result: "negative",
      },
      sage: {
        outcome: "AI continuously monitors data patterns and proactively alerts when anomalies are detected.",
        result: "positive",
      },
    },
    {
      id: "analyze",
      title: "2. Analyze Context",
      description: "Gathering relevant information to understand the situation fully.",
      traditional: {
        outcome: "Analysts manually pull data from multiple systems. Context is limited to available dashboards.",
        result: "neutral",
      },
      sage: {
        outcome: "System automatically gathers cross-functional data and provides comprehensive context.",
        result: "positive",
      },
    },
    {
      id: "decide",
      title: "3. Determine Action",
      description: "Deciding what steps to take based on the analysis.",
      traditional: {
        outcome: "Decision-makers interpret data and determine actions based on experience and intuition.",
        result: "neutral",
      },
      sage: {
        outcome: "AI suggests optimal actions based on historical outcomes, current context, and business goals.",
        result: "positive",
      },
    },
    {
      id: "execute",
      title: "4. Execute Response",
      description: "Implementing the decided course of action.",
      traditional: {
        outcome: "Manual handoffs between teams. Actions documented in emails or tickets. Execution delays common.",
        result: "negative",
      },
      sage: {
        outcome:
          "Automated workflows trigger immediate actions. Human intervention is required only if specifically requested.",
        result: "positive",
      },
    },
    {
      id: "monitor",
      title: "5. Monitor Results",
      description: "Tracking the outcomes of the actions taken.",
      traditional: {
        outcome: "Results tracked in separate systems. Follow-up often depends on individual diligence.",
        result: "negative",
      },
      sage: {
        outcome:
          "Continuous monitoring of action outcomes with automatic adjustments and learning for future scenarios.",
        result: "positive",
      },
    },
  ]

  const [activeStep, setActiveStep] = useState(0)
  const [showComparison, setShowComparison] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  const handleNext = () => {
    if (activeStep < flowSteps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      setShowComparison(true)
    }
  }

  const handlePrev = () => {
    if (showComparison) {
      setShowComparison(false)
    } else if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const getResultIcon = (result: "positive" | "negative" | "neutral") => {
    switch (result) {
      case "positive":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "negative":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "neutral":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="my-12"
      drag={!showComparison ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, info: PanInfo) => {
        if (!showComparison) {
          if (info.offset.x < -50 && activeStep < flowSteps.length - 1) {
            // Swiped left - go to next step
            handleNext()
          } else if (info.offset.x > 50 && activeStep > 0) {
            // Swiped right - go to previous step
            handlePrev()
          }
        }
      }}
    >
      <h3 className="text-xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500">
        Decision Flow: Traditional BI vs. SAGE
      </h3>
      {!showComparison && (
        <p className="text-center text-sm text-gray-400 mb-4 md:hidden">Swipe left or right to navigate</p>
      )}

      {!showComparison ? (
        <div className="relative">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700">
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeStep + 1) / flowSteps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="pt-6"
            >
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-2 text-emerald-400">{flowSteps[activeStep].title}</h4>
                <p className="text-gray-300 mb-6">{flowSteps[activeStep].description}</p>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-gray-800/50 rounded-lg p-4">
                    <h5 className="text-lg font-medium mb-2 text-blue-400">Traditional Approach</h5>
                    <p className="text-gray-300">{flowSteps[activeStep].traditional.outcome}</p>
                  </div>
                  <div className="flex-1 bg-gray-800/50 rounded-lg p-4">
                    <h5 className="text-lg font-medium mb-2 text-emerald-400">SAGE Approach</h5>
                    <p className="text-gray-300">{flowSteps[activeStep].sage.outcome}</p>
                  </div>
                </div>

                {/* Navigation buttons - hidden on mobile */}
                <div className="hidden md:flex justify-between mt-8">
                  <button
                    onClick={handlePrev}
                    className={`px-4 py-2 rounded-md ${
                      activeStep === 0 ? "text-gray-500 cursor-not-allowed" : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    disabled={activeStep === 0}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 flex items-center"
                  >
                    {activeStep === flowSteps.length - 1 ? "See Full Comparison" : "Next"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
        >
          <h4 className="text-xl font-bold mb-4 text-center text-white">Complete Decision Flow Comparison</h4>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left text-gray-300 font-medium">Decision Stage</th>
                  <th className="p-3 text-left text-blue-400 font-medium">Traditional Approach</th>
                  <th className="p-3 text-left text-emerald-400 font-medium">SAGE Approach</th>
                </tr>
              </thead>
              <tbody>
                {flowSteps.map((step, index) => (
                  <tr key={step.id} className="border-t border-gray-800">
                    <td className="p-3 text-gray-200 font-medium">{step.title}</td>
                    <td className="p-3">
                      <div className="flex items-start">
                        <div className="mt-1 mr-2">{getResultIcon(step.traditional.result)}</div>
                        <span className="text-gray-300">{step.traditional.outcome}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-start">
                        <div className="mt-1 mr-2">{getResultIcon(step.sage.result)}</div>
                        <span className="text-gray-300">{step.sage.outcome}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-lg">
            <h5 className="text-lg font-medium mb-2 text-emerald-400">Key Takeaway</h5>
            <p className="text-gray-200">
              SAGE platforms transform the entire decision flow from reactive to proactive, from manual to automated,
              and from siloed to integrated. This results in faster, more accurate decisions and actions that drive
              business outcomes.
            </p>
          </div>

          <div className="flex justify-start mt-6">
            <button onClick={handlePrev} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
              Back to Step-by-Step View
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
