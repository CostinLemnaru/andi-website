"use client"

import { useState } from "react"

const SageRoiCalculator = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState("")
  const [department, setDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [employees, setEmployees] = useState(100)
  const [decisionMakers, setDecisionMakers] = useState(1)
  const [avgSalary, setAvgSalary] = useState(100000)
  const [currentToolCost, setCurrentToolCost] = useState(30000)
  const [decisionTime, setDecisionTime] = useState(1)
  const [decisionsPerWeek, setDecisionsPerWeek] = useState(1)
  const [hourlyRate, setHourlyRate] = useState(50)
  const [annualCostSaved, setAnnualCostSaved] = useState(25000)
  const [annualTimeSaved, setAnnualTimeSaved] = useState(20)
  const [toolConsolidationSavings, setToolConsolidationSavings] = useState(5000)
  const [opportunityCostSavings, setOpportunityCostSavings] = useState(8000)
  const [totalAnnualSavings, setTotalAnnualSavings] = useState(38000)
  const [suggestedPlan, setSuggestedPlan] = useState("Basic")
  const [toolsConsolidated, setToolsConsolidated] = useState(2)
  const [consolidationSavingsRate, setConsolidationSavingsRate] = useState(0.1)
  const [showForm, setShowForm] = useState(true)
  const [showThankYou, setShowThankYou] = useState(false)

  const generateReport = () => {
    const reportData = {
      firstName,
      lastName,
      role,
      department,
      email,
      company,
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

    // Store in multiple places for reliability
    try {
      localStorage.setItem("roiReportData", JSON.stringify(reportData))
      sessionStorage.setItem("roiReportData", JSON.stringify(reportData))
    } catch (error) {
      console.warn("Storage failed:", error)
    }

    // Open report in new window with data in URL as backup
    const encodedData = encodeURIComponent(JSON.stringify(reportData))
    const reportUrl = `/roi-report?data=${encodedData}`
    window.open(reportUrl, "_blank")

    setShowForm(false)
    setShowThankYou(true)
  }

  return (
    <div>
      {showForm && (
        
      )}

      {showThankYou && (
        <div>
          <h2>Thank You!</h2>
          <p>Your report has been generated in a new window.</p>
        </div>
      )}
    </div>
  )
}

export default SageRoiCalculator
