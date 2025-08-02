"use client"

import { useState, useRef, useEffect } from "react"
import { CheckCircle, Info } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { submitToGoogleSheets } from "@/lib/google-sheets"
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [reportForm, setReportForm] = useState({
    firstName: "",
    lastName: "",
    role: "",
    department: "",
    email: "",
    company: "",
  })
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

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


    const [email, setEmail] = useState("")
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
    const [fullName, setFullName] = useState("")
    const [company, setCompany] = useState("")
    const [department, setDepartment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const formRef = useRef<HTMLFormElement>(null)
    const exploreRef = useRef<HTMLDivElement>(null)
    const sectionsRef = useRef<HTMLDivElement>(null)
    const [selectedVersion, setSelectedVersion] = useState("mvp")
  
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

  const fallbackSubmit = async () => {
    return new Promise<void>((resolve) => {
      try {
        // Set all form values in the hidden form
        const directEmailInput = document.getElementById("direct-email") as HTMLInputElement
        const directNameInput = document.getElementById("direct-fullName") as HTMLInputElement
        const directCompanyInput = document.getElementById("direct-company") as HTMLInputElement
        const directDepartmentInput = document.getElementById("direct-department") as HTMLInputElement

        if (directEmailInput) directEmailInput.value = email
        if (directNameInput) directNameInput.value = fullName
        if (directCompanyInput) directCompanyInput.value = company
        if (directDepartmentInput) directDepartmentInput.value = department

        // Submit the form
        if (formRef.current) {
          formRef.current.submit()
        }

        // Consider this successful regardless of actual result
        // since we can't track the result of a no-cors form submission
        setTimeout(resolve, 500)
      } catch (err) {
        console.error("Fallback error:", err)
        // Resolve anyway to prevent blocking the UI
        resolve()
      }
    })
  }
    const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError("")
  
      try {
        // Only submit to Google Sheets when the dialog form is submitted
        await fallbackSubmit()
  
        // Also try the server action as a backup
        const result = await submitToGoogleSheets({
          email,
          fullName,
          company,
          department,
        })
  
        // Close the form dialog and show the success dialog
        setIsDialogOpen(false)
        setIsSuccessDialogOpen(true)
  
        // Reset form fields
        setEmail("")
        setFullName("")
        setCompany("")
        setDepartment("")
      } catch (err) {
        console.error("Form submission error:", err)
        setError("Failed to submit. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }

  const entries = Object.entries(config.inputs)
  const firstThreeEntries = entries.slice(0, 3)
  const lastThreeEntries = entries.slice(3, 6)

    const handleReportGeneration = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsGeneratingReport(true)
  
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))
  
      // Create report data
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
  
      // Store in localStorage with error handling
      try {
        localStorage.setItem("roiReportData", JSON.stringify(reportData))
        console.log("Report data stored:", reportData)
  
        // Also store in sessionStorage as backup
        sessionStorage.setItem("roiReportData", JSON.stringify(reportData))
  
        // Create URL with data as backup
        const encodedData = encodeURIComponent(JSON.stringify(reportData))
        const reportUrl = `/roi-report?data=${encodedData}`
  
        // Open report in new tab
        window.open(reportUrl, "_blank")
      } catch (error) {
        console.error("Error storing report data:", error)
        alert("Error generating report. Please try again.")
      }
  
      setIsReportDialogOpen(false)
      setIsGeneratingReport(false)
      setReportForm({
        firstName: "",
        lastName: "",
        role: "",
        department: "",
        email: "",
        company: "",
      })
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
                          <button
                            onClick={() => setIsDialogOpen(true)}
                            className="w-full py-3 md:py-4 mt-6 md:mt-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105"
                            style={{
                              animation: "gradient 8s linear infinite",
                              backgroundSize: "300% 100%",
                              backgroundPosition: "left",
                            }}
                          >
                            Contact Sales
                          </button>
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

      {/* Dialog with additional details form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white">
          <DialogHeader>
            <DialogTitle>Complete your registration</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please provide additional information to get free POCs at launch.
            </DialogDescription>
          </DialogHeader>
          {/* This form submits to Google Sheets when submitted */}
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-gray-400">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="company" className="text-gray-400">
                Company
              </Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="department" className="text-gray-400">
                Department
              </Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white"
                style={{
                  animation: "gradient 8s linear infinite",
                  backgroundSize: "300% 100%",
                  backgroundPosition: "left",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

            {/* Report Generation Dialog */}
            <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
              <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white">
                <DialogHeader>
                  <DialogTitle>Generate Detailed ROI Report</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Please provide your information to generate a comprehensive ROI analysis report.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleReportGeneration} className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="firstName" className="text-gray-400">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={reportForm.firstName}
                        onChange={(e) => setReportForm({ ...reportForm, firstName: e.target.value })}
                        required
                        className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lastName" className="text-gray-400">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={reportForm.lastName}
                        onChange={(e) => setReportForm({ ...reportForm, lastName: e.target.value })}
                        required
                        className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="reportCompany" className="text-gray-400">
                      Company
                    </Label>
                    <Input
                      id="reportCompany"
                      value={reportForm.company}
                      onChange={(e) => setReportForm({ ...reportForm, company: e.target.value })}
                      required
                      className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="role" className="text-gray-400">
                      Role
                    </Label>
                    <Input
                      id="role"
                      value={reportForm.role}
                      onChange={(e) => setReportForm({ ...reportForm, role: e.target.value })}
                      required
                      className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="reportDepartment" className="text-gray-400">
                      Department
                    </Label>
                    <Input
                      id="reportDepartment"
                      value={reportForm.department}
                      onChange={(e) => setReportForm({ ...reportForm, department: e.target.value })}
                      required
                      className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="reportEmail" className="text-gray-400">
                      Email
                    </Label>
                    <Input
                      id="reportEmail"
                      type="email"
                      value={reportForm.email}
                      onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                      required
                      className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isGeneratingReport}
                      className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 hover:opacity-90 text-white"
                      style={{
                        animation: "gradient 8s linear infinite",
                        backgroundSize: "300% 100%",
                        backgroundPosition: "left",
                      }}
                    >
                      {isGeneratingReport ? "Generating Report..." : "Generate Report"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
    </section>
  )
}
