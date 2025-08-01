"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContactForm } from "./contact-form"
import { getLucideIcon } from "@/lib/icons-map"

interface PricingSectionProps {
  data: {
    Title: string
    Subtitle: string
    Plan: {
      id: number
      Title: string
      Description: string
      Icon: string
      Color: string
      isMostPopular: boolean | null
      Items: {
        id: number
        Name: string
        Checked: boolean | null
      }[]
    }[]
  }
}

export default function PricingSection({ data }: PricingSectionProps) {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")

  const openContactForm = (planName: string) => {
    setSelectedPlan(planName)
    setIsFormOpen(true)
  }

  return (
    <section className="relative">
      <div className="mx-auto mt-20 mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">{data.Title}</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{data.Subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {data.Plan.map((tier) => {
            const Icon = getLucideIcon(tier.Icon)
            const color = tier.Color.toLowerCase()
            const colorGradient = `from-${color}-500 to-${color}-700`
            const colorShadow = `shadow-${color}-500/20`

            return (
              <motion.div
                key={tier.id}
                className={cn(
                  "relative rounded-2xl border p-8 shadow-lg transition-all duration-300",
                  tier.isMostPopular ? `border-${color}-500` : "border-gray-700",
                  hoveredTier === tier.Title ? "scale-105" : "scale-100",
                  "bg-gray-900/60 backdrop-blur-sm"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredTier(tier.Title)}
                onMouseLeave={() => setHoveredTier(null)}
                whileHover={{
                  boxShadow: `0 0 25px 0 rgba(0, 0, 0, 0.3)`
                }}
              >
                {tier.isMostPopular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-purple-500 px-3 py-1 text-xs font-medium text-white text-center">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{tier.Title}</h3>
                  <div className={cn("rounded-full p-2", `bg-gradient-to-r ${colorGradient}`, colorShadow)}>
                    {Icon && <Icon className="h-5 w-5 text-white" />}
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-400">{tier.Description}</p>

                <ul className="mt-8 space-y-4">
                  {tier.Items.map((feature) => (
                    <li key={feature.id} className="flex items-start">
                      <div className="flex-shrink-0">
                        {feature.Checked ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <p className="ml-3 text-sm text-gray-300">{feature.Name}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium",
                      tier.isMostPopular
                        ? `border-${color}-500 bg-${color}-500 text-white hover:bg-${color}-600`
                        : `border-gray-700 bg-gray-800 text-white hover:bg-gray-700`
                    )}
                    onClick={() => openContactForm(tier.Title)}
                  >
                    Contact Us
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} selectedPlan={selectedPlan} />
    </section>
  )
}
