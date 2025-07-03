"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, DollarSign, TrendingUp, Users, BarChart4, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

const modules = [
  {
    id: "finance",
    name: "Finance Ops",
    description:
      "Optimize financial operations with deep insights into working capital, variance drivers, and revenue leakage detection.",
    capabilities: [
      "Working capital optimization",
      "Variance driver analysis",
      "Revenue leakage detection",
      "Budget vs. actual tracking",
      "Cash flow forecasting",
      "Expense anomaly detection",
    ],
    icon: DollarSign,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "gtm",
    name: "GTM Intelligence",
    description:
      "Enhance your go-to-market strategy with insights into customer acquisition costs, lifetime value, churn predictors, and funnel analysis.",
    capabilities: [
      "CAC vs LTV analysis",
      "Churn prediction",
      "Funnel conversion analysis",
      "Campaign performance tracking",
      "Market segment insights",
      "Competitive positioning",
    ],
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "hr",
    name: "HR & People Analytics",
    description:
      "Understand your workforce better with insights into attrition risk, employee sentiment, and diversity, equity, and inclusion metrics.",
    capabilities: [
      "Attrition risk prediction",
      "Employee sentiment analysis",
      "DEI insights and tracking",
      "Performance metrics",
      "Talent acquisition analytics",
      "Workforce planning",
    ],
    icon: Users,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "strategy",
    name: "Strategy Planning",
    description:
      "Make better strategic decisions with scenario modeling, OKR alignment, and multi-business unit forecasting capabilities.",
    capabilities: [
      "Scenario modeling",
      "OKR alignment tracking",
      "Multi-BU forecasting",
      "Strategic initiative impact",
      "Market opportunity sizing",
      "Risk assessment",
    ],
    icon: BarChart4,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "iaas",
    name: "Insight-as-a-Service",
    description:
      "Get fully managed insights with board packs, curated insights, and custom dashboards created by ANDI experts or partners.",
    capabilities: [
      "Board pack preparation",
      "Curated executive insights",
      "Custom dashboard creation",
      "Periodic insight reviews",
      "Strategic recommendation reports",
      "Dedicated insight analyst",
    ],
    icon: Brain,
    color: "from-rose-500 to-pink-500",
  },
]

export function FunctionalModules() {
  const [activeModule, setActiveModule] = useState(modules[0].id)

  const activeModuleData = modules.find((m) => m.id === activeModule)

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Functional Intelligence Modules</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Enhance your core platform with specialized modules that deliver deeper insights for specific business
            functions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {modules.map((module) => (
                <motion.button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg flex items-center transition-all",
                    activeModule === module.id
                      ? `bg-gradient-to-r ${module.color} text-white`
                      : "bg-gray-800 hover:bg-gray-700 text-gray-200",
                  )}
                  whileHover={{ x: activeModule === module.id ? 0 : 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <module.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{module.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {activeModuleData && (
              <motion.div
                key={activeModuleData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700"
                whileHover={{
                  boxShadow: `0 0 25px 0 rgba(${
                    activeModuleData.id === "finance"
                      ? "16, 185, 129"
                      : activeModuleData.id === "gtm"
                        ? "59, 130, 246"
                        : activeModuleData.id === "hr"
                          ? "139, 92, 246"
                          : activeModuleData.id === "strategy"
                            ? "245, 158, 11"
                            : "244, 63, 94"
                  }, 0.3)`,
                }}
              >
                <div className="flex items-center mb-6">
                  <div className={cn("rounded-full p-3 mr-4", `bg-gradient-to-r ${activeModuleData.color}`)}>
                    <activeModuleData.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{activeModuleData.name}</h3>
                </div>

                <p className="text-gray-300 mb-6">{activeModuleData.description}</p>

                <h4 className="font-semibold text-lg mb-4 text-white">Key Capabilities:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeModuleData.capabilities.map((capability, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">{capability}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white",
                      `bg-gradient-to-r ${activeModuleData.color}`,
                    )}
                  >
                    Learn more about {activeModuleData.name}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
