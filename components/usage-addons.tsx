"use client"

import { motion } from "framer-motion"

type UsageAddon = {
  name: string
  description: string
  availableFor: string
}

const usageAddons: UsageAddon[] = [
  {
    name: "Extra 10K System Queries",
    description:
      "Additional capacity for automated insights from scheduled dashboards and system scans beyond your plan's included allocation.",
    availableFor: "All tiers",
  },
  {
    name: "Extra 10K Ad-Hoc NLQs",
    description:
      "Additional capacity for user-generated natural language queries beyond your plan's included allocation.",
    availableFor: "All tiers",
  },
  {
    name: "Unlimited NLQs",
    description: "Remove all limits on user-generated natural language queries for unlimited exploration and analysis.",
    availableFor: "Enterprise only",
  },
  {
    name: "Extra 10K Generated Insights",
    description: "Additional capacity for AI-powered insights generation beyond your plan's included allocation.",
    availableFor: "All tiers",
  },
  {
    name: "Extra 1 TB Cold Storage",
    description: "Additional archived data storage for historical reference and long-term analysis.",
    availableFor: "All tiers",
  },
  {
    name: "Custom Model Hosting (BYO AI)",
    description:
      "Host your own AI models within the ANDI platform for specialized analysis and custom intelligence capabilities.",
    availableFor: "Scale, Enterprise",
  },
  {
    name: "Data Residency (EU, US, etc.)",
    description: "Specify where your data is physically stored to meet regulatory requirements for data sovereignty.",
    availableFor: "Enterprise only",
  },
  {
    name: "Insight API / Webhooks",
    description: "Programmatic access to ANDI insights for integration with your existing systems and workflows.",
    availableFor: "Scale, Enterprise",
  },
  {
    name: "Dedicated Integration Support",
    description: "Expert assistance with connecting your data sources and systems to ANDI for optimal performance.",
    availableFor: "Scale, Enterprise",
  },
]

export function UsageAddons() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Usage-Based Add-Ons</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Customize your ANDI experience with these flexible add-ons that scale with your usage.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {usageAddons.map((addon, index) => (
            <motion.div
              key={addon.name}
              className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                boxShadow: "0 0 15px 0 rgba(107, 114, 128, 0.3)",
                y: -5,
              }}
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-2">{addon.name}</h3>
                <p className="text-sm text-gray-300 mb-4">{addon.description}</p>
                <div className="flex items-center mt-auto pt-2 border-t border-gray-700">
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Available for:</span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-200">
                    {addon.availableFor}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
