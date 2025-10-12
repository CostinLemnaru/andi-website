"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Info } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type InputConfig = {
  label: string
  help: string
  min: number
  max: number
  step: number
  unit: string
  default: number
}

type Plan = {
  name: string
  description: string
  features: string[]
}

type Config = {
  title: string
  inputs: Record<string, InputConfig>
  plans: Plan[]
  results: any
}

type Data = {
  Title: string
  Description: string
  Disclaimer: string
  Config: Config
}

type Props = {
  data: Data
}

export default function RoiCalculatorSection({ data }: Props) {
    const { Title: title, Description: description, Disclaimer: disclaimer, Config: config } = data;

  const [values, setValues] = useState(
    Object.fromEntries(
      Object.entries(config.inputs).map(([key, input]) => [key, input.default])
    )
  )
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [emailErrors, setEmailErrors] = useState<Record<string, string>>({})
  const [reportForm, setReportForm] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    company: "",
  })

  const validateBusinessEmail = (email: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address"
    }

    const personalDomains = [
      "gmail.com",
      "gmail.co.uk",
      "gmail.ca",
      "gmail.com.au",
      "gmail.de",
      "gmail.fr",
      "gmail.it",
      "gmail.es",
      "yahoo.com",
      "yahoo.co.uk",
      "yahoo.ca",
      "yahoo.com.au",
      "yahoo.de",
      "yahoo.fr",
      "aol.com",
      "aol.co.uk",
      "aol.ca",
      "aol.com.au",
      "aol.de",
      "aol.fr",
      "hotmail.com",
      "hotmail.co.uk",
      "hotmail.ca",
      "hotmail.com.au",
      "hotmail.de",
      "hotmail.fr",
      "outlook.com",
      "outlook.co.uk",
      "outlook.ca",
      "outlook.com.au",
      "outlook.de",
      "outlook.fr",
      "live.com",
      "live.co.uk",
      "live.ca",
      "live.com.au",
      "live.de",
      "live.fr",
    ]

    const domain = email.split("@")[1]?.toLowerCase()
    if (domain && personalDomains.includes(domain)) {
      return "Please use your business email address"
    }

    return ""
  }

  const getCookie = (name: string) => {
    if (typeof document === "undefined") return ""
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
    return match ? decodeURIComponent(match[2]) : ""
  }

  const submitToHubSpot = async (payload: Record<string, unknown>) => {
    const res = await fetch("/api/hubspot/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(`HubSpot submit failed (${res.status}): ${text}`)
    }

    return res.json()
  }

  const roiCalculatorTitle = config.title
  const [inputs, setInputs] = useState(
    Object.fromEntries(
      Object.entries(config.inputs).map(([key, input]) => [key, input.default.toString()])
    )
  )

  const formatNumber = (num: number) => num.toLocaleString()

  const handleChange = (key: string, rawValue: string) => {
    setInputs({ ...inputs, [key]: rawValue.replace(/[^0-9]/g, "") })
  }

  const employees = values.employees
  const decisionMakers = values.decisionMakers
  const avgSalary = values.avgSalary
  const currentToolCost = values.currentToolCost
  const decisionTime = values.decisionTime
  const decisionsPerWeek = values.decisionsPerWeek

  const hourlyRate = avgSalary / 2080
  const usageComplexityScore =
    (employees / 2500) * 0.4 +
    (decisionMakers / 50) * 0.25 +
    (decisionsPerWeek / 25) * 0.15 +
    (decisionTime / 20) * 0.15 +
    (avgSalary / 125000) * 0.05

  const toolsConsolidated = Math.min(Math.floor(employees / 50) + Math.floor(decisionMakers / 5), 15)
  const consolidationSavingsRate = Math.min(0.6, 0.3 + toolsConsolidated * 0.02)
  const toolConsolidationSavings = currentToolCost * consolidationSavingsRate

  const annualCostSaved = values.decisionsPerWeek * values.decisionTime * values.decisionMakers * 50 * hourlyRate * 0.7
  const annualTimeSaved = values.decisionsPerWeek * values.decisionTime * values.decisionMakers * 50 * 0.7
  const opportunityCostSavings = annualCostSaved * 1.5
  const totalAnnualSavings = annualCostSaved + toolConsolidationSavings + opportunityCostSavings

  const planFeatures = Object.fromEntries(
    config.plans.map((plan) => [plan.name, plan.features])
  )

  const suggestedPlan =
    usageComplexityScore <= 0.4 ? config.plans[0].name :
    usageComplexityScore <= 0.8 ? config.plans[1].name :
    config.plans[2].name

  const planDescription = 
    usageComplexityScore <= 0.4 ? planFeatures[config.plans[0].name] : 
    usageComplexityScore <= 0.8 ? planFeatures[config.plans[1].name] :
    planFeatures[config.plans[2].name]

  const entries = Object.entries(config.inputs)
  const firstThreeEntries = entries.slice(0, 3)
  const lastThreeEntries = entries.slice(3, 6)

  const handleEmailBlur = (email: string, field: string) => {
    if (!email) return
    const error = validateBusinessEmail(email)
    setEmailErrors((prev) => ({ ...prev, [field]: error }))
  }

  const clearEmailError = (field: string) => {
    if (emailErrors[field]) {
      setEmailErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleGenerateReport = async (event: React.FormEvent) => {
    event.preventDefault()
    const emailError = validateBusinessEmail(reportForm.email)
    if (emailError) {
      setEmailErrors((prev) => ({ ...prev, report: emailError }))
      return
    }

    setIsGeneratingReport(true)

    try {
      const hutk = getCookie("hubspotutk")
      const payload = {
        formGuid: "6cad5655-f33a-45aa-b115-8fd7bc5c4efb",
        fields: [
          { name: "firstname", value: reportForm.firstName },
          { name: "lastname", value: reportForm.lastName },
          { name: "role_department", value: reportForm.role },
          { name: "email", value: reportForm.email },
          { name: "company", value: reportForm.company },
          { name: "LEGAL_CONSENT.processing", value: "true" },
        ],
        context: {
          pageUri: typeof window !== "undefined" ? window.location.href : "https://www.zamora.ai/roi",
          pageName: typeof document !== "undefined" ? document.title : "ROI Calculator",
          hutk: hutk || undefined,
        },
      }

      await submitToHubSpot(payload)

      if (typeof window !== "undefined") {
        const reportData = {
          ...reportForm,
          employees,
          decisionMakers,
          avgSalary,
          currentToolCost,
          decisionTime,
          decisionsPerWeek,
          hourlyRate,
          annualCostSaved,
          annualTimeSaved,
          toolConsolidationSavings,
          opportunityCostSavings,
          totalAnnualSavings,
          suggestedPlan,
          toolsConsolidated,
          consolidationSavingsRate,
          generatedAt: new Date().toISOString(),
        }

        try {
          const serialized = JSON.stringify(reportData)
          window.localStorage?.setItem("roiReportData", serialized)
          window.sessionStorage?.setItem("roiReportData", serialized)

          const reportUrl = `/roi-report?data=${encodeURIComponent(serialized)}`
          window.open(reportUrl, "_blank", "noopener,noreferrer")
        } catch (storageError) {
          console.error("Error storing ROI report data:", storageError)
          window.alert?.("Error generating report. Please try again.")
        }
      }

      setIsReportDialogOpen(false)
      setReportForm({
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        company: "",
      })
      setEmailErrors({})
    } catch (error) {
      console.error("ROI report submission error:", error)
      setEmailErrors((prev) => ({ ...prev, report: "Failed to submit. Please try again." }))
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const getInputMax = (key: string) => {
    if (key === "decisionMakers") {
      return Math.min(config.inputs.decisionMakers.max, values.employees)
    }
    return config.inputs[key].max
  }

  const resultsTexts = config.results

  return (
    <section className="relative z-10 py-24 md:py-48 px-4 sm:px-6 mt-24 md:mt-0">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="scroll-fade text-3xl sm:text-4xl font-light mb-6">
                    {title}
                </h2>
                <p className="scroll-fade text-lg text-gray-300 max-w-3xl mx-auto">
                    {description}
                </p>
            </div>

            {/* Bottom Insights - REMOVED as they are now detailed in the main calculator */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0"></div>

            <div className="scroll-fade fade-early bg-gray-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                <div className="space-y-12">
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6 md:gap-y-8">
                            <div className="space-y-8">
                                <h3 className="text-2xl font-light text-gray-300 mb-6 col-span-full">
                                    {roiCalculatorTitle}
                                </h3>

                                {firstThreeEntries.map(([key, input]) => (
                                  <div key={key}>
                                    <p className="text-sm text-gray-400 mb-2">{input.help}</p>

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0">
                                      <label className="text-gray-300 font-medium">{input.label}</label>
                                      <div className="flex items-center gap-2">
                                        <span className="text-gray-400 text-sm">{input.unit ?? ""}</span>
                                        <input
                                          type="text"
                                          value={inputs[key]}
                                          onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, "")
                                            handleChange(key, value)
                                          }}
                                          onBlur={(e) => {
                                            const value = parseInt(e.target.value.replace(/[^0-9]/g, ""))
                                            const clamped = Math.max(input.min, Math.min(getInputMax(key), value || input.min))
                                            setValues({ ...values, [key]: clamped })
                                            setInputs({ ...inputs, [key]: formatNumber(clamped) })
                                          }}
                                          className="w-full sm:w-24 px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-purple-400 font-bold text-center sm:text-right focus:ring-1 focus:ring-purple-500 focus:border-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                      </div>
                                    </div>

                                    <input
                                      type="range"
                                      min={input.min}
                                      max={getInputMax(key)}
                                      step={input.step}
                                      value={values[key]}
                                      onChange={(e) => {
                                        const value = parseInt(e.target.value)
                                        setValues({ ...values, [key]: value })
                                        setInputs({ ...inputs, [key]: formatNumber(value) })
                                      }}
                                      className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                      style={{
                                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((values[key] - input.min) / (getInputMax(key) - input.min)) * 100}%, #374151 ${((values[key] - input.min) / (getInputMax(key) - input.min)) * 100}%, #374151 100%)`,
                                      }}
                                    />

                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>{input.min}</span>
                                      <span>{formatNumber(getInputMax(key))}{input.unit ? ` ${input.unit}` : ""}</span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                              <div className="space-y-8">
                                {lastThreeEntries.map(([key, input], index) => (
                                  <div key={key} className={index === 0 ? "pt-16 pb-0" : ""}>
                                    <p className="text-sm text-gray-400 mb-2">{input.help}</p>

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0">
                                      <label className="text-gray-300 font-medium">{input.label}</label>
                                      <div className="flex items-center gap-2">
                                        <span className="text-gray-400 text-sm">{input.unit ?? ""}</span>
                                        <input
                                          type="text"
                                          value={inputs[key]}
                                          onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, "")
                                            handleChange(key, value)
                                          }}
                                          onBlur={(e) => {
                                            const value = parseInt(e.target.value.replace(/[^0-9]/g, ""))
                                            const clamped = Math.max(input.min, Math.min(getInputMax(key), value || input.min))
                                            setValues({ ...values, [key]: clamped })
                                            setInputs({ ...inputs, [key]: formatNumber(clamped) })
                                          }}
                                          className="w-full sm:w-24 px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-purple-400 font-bold text-center sm:text-right focus:ring-1 focus:ring-purple-500 focus:border-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                      </div>
                                    </div>

                                    <input
                                      type="range"
                                      min={input.min}
                                      max={getInputMax(key)}
                                      step={input.step}
                                      value={values[key]}
                                      onChange={(e) => {
                                        const value = parseInt(e.target.value)
                                        setValues({ ...values, [key]: value })
                                        setInputs({ ...inputs, [key]: formatNumber(value) })
                                      }}
                                      className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                      style={{
                                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((values[key] - input.min) / (getInputMax(key) - input.min)) * 100}%, #374151 ${((values[key] - input.min) / (getInputMax(key) - input.min)) * 100}%, #374151 100%)`,
                                      }}
                                    />

                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>{input.min}</span>
                                      <span>{formatNumber(getInputMax(key))}{input.unit ? ` ${input.unit}` : ""}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                        </div>

                        {/* Results Display */}
                        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                          <h3 className="text-2xl font-light text-gray-300 mb-8 text-center">
                            {resultsTexts.title}
                          </h3>
      
                          <div className="space-y-6">
                            {/* Calculation Breakdown */}
                            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                              <h4 className="text-lg font-semibold text-gray-300 mb-4">{resultsTexts.calculationBox.title}</h4>
                              <div className="space-y-3 text-sm text-gray-400">
                                <div className="flex justify-between">
                                  <span>{resultsTexts.calculationBox.labels.decisionMakers}</span>
                                  <span className="text-purple-400">{values.decisionMakers} people</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{resultsTexts.calculationBox.labels.decisionsPerWeek}</span>
                                  <span className="text-purple-400">{values.decisionsPerWeek} decisions</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{resultsTexts.calculationBox.labels.decisionTime}</span>
                                  <span className="text-purple-400">{values.decisionTime} hours</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{resultsTexts.calculationBox.labels.weeklyTime}</span>
                                  <span className="text-purple-400">
                                    {(values.decisionsPerWeek * values.decisionTime * values.decisionMakers).toLocaleString()} hours
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{resultsTexts.calculationBox.labels.annualTime}</span>
                                  <span className="text-purple-400">
                                    {Math.round((values.decisionsPerWeek * values.decisionTime * values.decisionMakers * 50) / 1000)}K hours
                                  </span>
                                </div>
                                <div className="flex justify-between border-t border-gray-600 pt-2">
                                  <span>{resultsTexts.calculationBox.labels.currentCost}</span>
                                  <span className="text-red-400">
                                    {(() => {
                                      const annualCost = Math.round(
                                        (values.decisionsPerWeek * values.decisionTime * values.decisionMakers * 50 * hourlyRate) / 1000,
                                      )
                                      return annualCost > 999 ? `$${(annualCost / 1000).toFixed(1)}M` : `$${annualCost}K`
                                    })()}
                                  </span>
                                </div>
                              </div>
                            </div>
      
                            {/* Time Efficiency Savings */}
                            <div className="bg-gray-800/50 rounded-lg p-6">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                  <span className="text-gray-300">{resultsTexts.timeSavings.title}</span>
                                </div>
                                <span className="text-2xl font-bold text-blue-400">
                                  ${Math.round(annualCostSaved).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">
                                {resultsTexts.timeSavings.description}
                              </p>
                              <div className="text-xs text-gray-500">
                                <div>• Save {Math.round(annualTimeSaved).toLocaleString()} hours annually</div>
                                <div>
                                  • From {Math.round((values.decisionsPerWeek * values.decisionTime * values.decisionMakers * 50) / 1000)}K hours
                                  to {Math.round((values.decisionsPerWeek * values.decisionTime * values.decisionMakers * 50 * 0.3) / 1000)}K hours
                                </div>
                                <div>• Cost per hour: ${Math.round(hourlyRate)}</div>
                              </div>
                            </div>
      
                            {/* Tool Consolidation */}
                            <div className="bg-gray-800/50 rounded-lg p-6">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                                  <span className="text-gray-300">{resultsTexts.toolSavings.title}</span>
                                </div>
                                <span className="text-2xl font-bold text-purple-400">
                                  ${Math.round(toolConsolidationSavings).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">
                                {resultsTexts.toolSavings.description}
                              </p>
                              <div className="text-xs text-gray-500">
                                <div>• Estimated tools consolidated: {toolsConsolidated}</div>
                                <div>• Current tool sprawl cost: ${currentToolCost.toLocaleString()}/year</div>
                                <div>• Consolidation savings rate: {Math.round(consolidationSavingsRate * 100)}%</div>
                                <div>• Eliminates: Licensing overlap, integration costs, training overhead</div>
                              </div>
                            </div>
      
                            {/* Opportunity Cost */}
                            <div className="bg-gray-800/50 rounded-lg p-6">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                                  <span className="text-gray-300">{resultsTexts.opportunityCost.title}</span>
                                </div>
                                <span className="text-2xl font-bold text-pink-400">
                                  ${Math.round(opportunityCostSavings).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{resultsTexts.opportunityCost.description}</p>
                              <div className="text-xs text-gray-500">
                                <div>{resultsTexts.opportunityCost.bullets.first}</div>
                                <div>{resultsTexts.opportunityCost.bullets.second}</div>
                                <div>{resultsTexts.opportunityCost.bullets.third}</div>
                              </div>
                            </div>
      
                            {/* Total Savings */}
                            <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 rounded-lg p-6 border border-emerald-500/30">
                              <div className="text-center mb-6">
                                <span className="text-xl font-semibold text-gray-200">{resultsTexts.total.title}</span>
                                <div className="text-4xl font-bold text-emerald-400 mt-2">
                                  ${Math.round(totalAnnualSavings).toLocaleString()}
                                </div>
                                <p className="text-sm text-gray-400 mt-2">{resultsTexts.total.subtext}</p>
                              </div>
      
                              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                                <div className="text-center mb-4">
                                  <div className="text-lg font-semibold text-purple-400 mb-2">{resultsTexts.total.plan.title}</div>
                                  <div className="text-2xl font-bold text-white">{suggestedPlan}</div>
                                  <p className="text-sm text-gray-400 mt-1">{planDescription}</p>
                                </div>
                                <div className="space-y-2 ml-0 mr-0 text-center">
                                  <h5 className="text-sm font-semibold text-gray-300">{resultsTexts.total.plan.keyFeatures}</h5>
                                  <ul className="space-y-1 text-center mx-auto max-w-xs">
                                    {planFeatures[suggestedPlan as keyof typeof planFeatures].map((feature, index) => (
                                      <li key={index} className="flex items-center gap-2 text-xs text-gray-400 text-left">
                                        <CheckCircle className="h-3 w-3 text-purple-400 flex-shrink-0" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
      
                          {/* CTA Button */}
                          <Link
                            href="/contact?source=sales"
                            className="block w-full"
                          >
                            <span
                              className="inline-flex w-full justify-center py-3 md:py-4 mt-6 md:mt-8 rounded-lg font-semibold text-base md:text-lg text-white bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                              style={{
                                animation: "gradient 8s linear infinite",
                                backgroundSize: "300% 100%",
                                backgroundPosition: "left",
                              }}
                            >
                              Contact Sales
                            </span>
                          </Link>
                          {/* Generate Report Button */}
                          <button
                            onClick={() => setIsReportDialogOpen(true)}
                            className="w-full py-3 md:py-4 mt-6 md:mt-8 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 hover:opacity-90 text-white rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105"
                            style={{
                              animation: "gradient 8s linear infinite",
                              backgroundSize: "300% 100%",
                              backgroundPosition: "left",
                            }}
                          >
                            Generate Detailed Report
                          </button>
                        </div>

                    </div>

                  <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-center font-semibold mb-2">
                      <Info className="w-4 h-4 mr-2 text-gray-400" /> Disclaimer
                    </div>
                    <p>{disclaimer}</p>
                  </div>
                </div>
            </div>
        </div>

      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">Explore ANDI pricing & ROI options</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleGenerateReport} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-400">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={reportForm.firstName}
                  onChange={(e) => setReportForm((prev) => ({ ...prev, firstName: e.target.value }))}
                  required
                  className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-400">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={reportForm.lastName}
                  onChange={(e) => setReportForm((prev) => ({ ...prev, lastName: e.target.value }))}
                  required
                  className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="role" className="text-gray-400">
                Role/Department
              </Label>
              <Input
                id="role"
                value={reportForm.role}
                onChange={(e) => setReportForm((prev) => ({ ...prev, role: e.target.value }))}
                required
                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <Label htmlFor="company" className="text-gray-400">
                Company
              </Label>
              <Input
                id="company"
                value={reportForm.company}
                onChange={(e) => setReportForm((prev) => ({ ...prev, company: e.target.value }))}
                required
                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-400">
                Work Email
              </Label>
              <Input
                id="email"
                type="email"
                value={reportForm.email}
                onChange={(e) => {
                  setReportForm((prev) => ({ ...prev, email: e.target.value }))
                  clearEmailError("report")
                }}
                onBlur={(e) => handleEmailBlur(e.target.value, "report")}
                required
                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
              {emailErrors.report && <p className="text-sm text-red-400 mt-1">{emailErrors.report}</p>}
            </div>

            <div className="flex ">
              <Button type="submit" disabled={isGeneratingReport} className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 py-2 h-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6">
                {isGeneratingReport ? "Sending..." : "Send me pricing & ROI"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
