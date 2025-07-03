"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, ChevronRight, Zap, Database, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContactForm } from "./contact-form"

const tiers = [
  {
    name: "Launch",
    description: "Perfect for startups and small teams getting started with data-driven insights",
    features: [
      { name: "Unlimited Users (Role-Based)", included: true },
      { name: "3 Standard Integrations", included: true },
      { name: "500 GB Hot / 2 TB Cold Storage", included: true },
      { name: "5K Generated Insights/Month", included: true },
      { name: "TLS & Basic Authentication", included: true },
      { name: "Community & Email Support", included: true },
      { name: "3,000 Total NLP Queries/Month", included: true },
      { name: "Self-Built Dashboards", included: true },
      { name: "Automated Alerts", included: true },
      { name: "KPI Change Explanations", included: true },
      { name: "Custom NLP Add-On", included: false },
    ],
    icon: Zap,
    color: "from-blue-500 to-cyan-400",
    shadowColor: "shadow-blue-500/20",
  },
  {
    name: "Scale",
    description: "For growing businesses ready to unlock deeper insights across their organization",
    features: [
      { name: "Unlimited Users (Role-Based)", included: true },
      { name: "10 Standard Integrations + Plugin Support", included: true },
      { name: "1 TB Hot / 5 TB Cold Storage", included: true },
      { name: "50K Generated Insights/Month", included: true },
      { name: "SOC2-Ready Encryption", included: true },
      { name: "Priority Support + Onboarding", included: true },
      { name: "15,000 Total NLP Queries/Month", included: true },
      { name: "Self-Built Dashboards", included: true },
      { name: "Insight API / Webhooks", included: true },
      { name: "Forecast Drift Reports", included: true },
      { name: "Custom NLP Add-On", included: false },
    ],
    icon: BarChart,
    color: "from-purple-500 to-indigo-500",
    shadowColor: "shadow-purple-500/20",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations requiring advanced capabilities and customization",
    features: [
      { name: "Unlimited Users (Role-Based)", included: true },
      { name: "Unlimited Integrations + Custom APIs", included: true },
      { name: "2 TB Hot / 10 TB Cold Storage", included: true },
      { name: "500K Generated Insights/Month", included: true },
      { name: "Full RBAC, Audit Logs, Data Zones", included: true },
      { name: "Dedicated CSM, SLA, Onboarding Team", included: true },
      { name: "250,000 Total NLP Queries/Month", included: true },
      { name: "Self + System-Generated Dashboards", included: true },
      { name: "Data Residency Options", included: true },
      { name: "Multi-BU Forecasting", included: true },
      { name: "Custom NLP Add-On Available", included: true },
    ],
    icon: Database,
    color: "from-amber-500 to-orange-500",
    shadowColor: "shadow-amber-500/20",
  },
]

export function PricingTiers() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")

  const openContactForm = (planName: string) => {
    setSelectedPlan(planName)
    setIsFormOpen(true)
  }

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Choose the right plan for your business
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            All plans include unlimited users with role-based access. You only pay for the insights and capabilities you
            need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              className={cn(
                "relative rounded-2xl border p-8 shadow-lg transition-all duration-300",
                tier.popular ? "border-purple-500" : "border-gray-700",
                hoveredTier === tier.name ? "scale-105" : "scale-100",
                "bg-gray-900/60 backdrop-blur-sm",
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredTier(tier.name)}
              onMouseLeave={() => setHoveredTier(null)}
              whileHover={{
                boxShadow: `0 0 25px 0 rgba(${
                  tier.name === "Launch" ? "59, 130, 246" : tier.name === "Scale" ? "139, 92, 246" : "245, 158, 11"
                }, 0.3)`,
              }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-purple-500 px-3 py-1 text-xs font-medium text-white text-center">
                  Most Popular
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <div className={cn("rounded-full p-2", `bg-gradient-to-r ${tier.color}`, tier.shadowColor)}>
                  <tier.icon className="h-5 w-5 text-white" />
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-400">{tier.description}</p>

              <motion.div
                className="mt-8 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              ></motion.div>

              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    <div className="flex-shrink-0">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <p className="ml-3 text-sm text-gray-300">{feature.name}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium",
                    tier.popular
                      ? "border-purple-500 bg-purple-500 text-white hover:bg-purple-600"
                      : `border-gray-700 bg-gray-800 text-white hover:bg-gray-700`,
                  )}
                  onClick={() => openContactForm(tier.name)}
                >
                  Contact Us
                  <ChevronRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} selectedPlan={selectedPlan} />
    </section>
  )
}
