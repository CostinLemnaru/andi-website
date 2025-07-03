"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import GradientText from "@/components/gradient-text"
import {
  Clock,
  DollarSign,
  Zap,
  Users,
  BarChart3,
  Target,
  ArrowRight,
  Download,
  Share2,
  CheckCircle,
  Building2,
  Briefcase,
  Mail,
  User,
} from "lucide-react"

interface ReportData {
  firstName: string
  lastName: string
  role: string
  department: string
  email: string
  company: string
  employees: number
  decisionMakers: number
  avgSalary: number
  currentToolCost: number
  decisionTime: number
  decisionsPerWeek: number
  hourlyRate: number
  annualCostSaved: number
  annualTimeSaved: number
  toolConsolidationSavings: number
  opportunityCostSavings: number
  totalAnnualSavings: number
  suggestedPlan: string
  toolsConsolidated: number
  consolidationSavingsRate: number
  generatedAt?: string
}

// Separate component for the main content to handle search params
function ROIReportContent() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const searchParams = useSearchParams()

  // Helper function to safely access storage
  const safeGetStorage = (key: string, storageType: "local" | "session" = "local") => {
    try {
      const storage = storageType === "local" ? localStorage : sessionStorage
      if (!storage) return null
      return storage.getItem(key)
    } catch (error) {
      console.warn(`${storageType}Storage access failed:`, error)
      return null
    }
  }

  useEffect(() => {
    const loadReportData = () => {
      const debug: string[] = []

      try {
        debug.push("Starting data load process...")

        // First try to get data from URL parameters
        const urlData = searchParams?.get("data")
        if (urlData) {
          debug.push("Found data in URL parameters")
          try {
            const decodedData = JSON.parse(decodeURIComponent(urlData))
            debug.push("Successfully parsed URL data")
            setReportData(decodedData)
            setIsLoading(false)
            setDebugInfo(debug)
            return
          } catch (parseError) {
            debug.push(`URL data parse error: ${parseError}`)
          }
        } else {
          debug.push("No data found in URL parameters")
        }

        // Then try localStorage
        const localData = safeGetStorage("roiReportData", "local")
        if (localData) {
          debug.push("Found data in localStorage")
          try {
            const parsedData = JSON.parse(localData)
            debug.push("Successfully parsed localStorage data")
            setReportData(parsedData)
            setIsLoading(false)
            setDebugInfo(debug)
            return
          } catch (parseError) {
            debug.push(`localStorage data parse error: ${parseError}`)
          }
        } else {
          debug.push("No data found in localStorage")
        }

        // Finally try sessionStorage
        const sessionData = safeGetStorage("roiReportData", "session")
        if (sessionData) {
          debug.push("Found data in sessionStorage")
          try {
            const parsedData = JSON.parse(sessionData)
            debug.push("Successfully parsed sessionStorage data")
            setReportData(parsedData)
            setIsLoading(false)
            setDebugInfo(debug)
            return
          } catch (parseError) {
            debug.push(`sessionStorage data parse error: ${parseError}`)
          }
        } else {
          debug.push("No data found in sessionStorage")
        }

        // No data found anywhere
        debug.push("No report data found in any storage method")
        setError("Report data not found. Please generate a new report from the main page.")
        setIsLoading(false)
        setDebugInfo(debug)
      } catch (err) {
        debug.push(`General error: ${err}`)
        console.error("Error loading report data:", err)
        setError("Error loading report data. Please try generating a new report.")
        setIsLoading(false)
        setDebugInfo(debug)
      }
    }

    // Add a small delay to ensure the component is fully mounted
    const timer = setTimeout(loadReportData, 100)
    return () => clearTimeout(timer)
  }, [searchParams])

  const generatePDF = async () => {
    if (!reportData) return

    setIsGeneratingPDF(true)

    try {
      // Check if we're in a browser that supports dynamic imports
      if (typeof window === "undefined") {
        throw new Error("PDF generation not available on server")
      }

      // Try to load the PDF libraries with better error handling
      let jsPDF: any
      let html2canvas: any

      try {
        const jsPDFModule = await import("jspdf")
        jsPDF = jsPDFModule.default || jsPDFModule
      } catch (error) {
        console.error("Failed to load jsPDF:", error)
        alert("PDF generation is not available in this browser. Please try using Chrome, Firefox, or Edge.")
        return
      }

      try {
        const html2canvasModule = await import("html2canvas")
        html2canvas = html2canvasModule.default || html2canvasModule
      } catch (error) {
        console.error("Failed to load html2canvas:", error)
        alert("PDF generation is not available in this browser. Please try using Chrome, Firefox, or Edge.")
        return
      }

      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15
      const contentWidth = pageWidth - margin * 2

      // Get all the main content sections with better error handling
      const sectionSelectors = [
        '[data-pdf="header"]',
        '[data-pdf="executive-summary"]',
        '[data-pdf="time-efficiency"]',
        '[data-pdf="faster-decision"]',
        '[data-pdf="platform-optimization"]',
        '[data-pdf="total-roi"]',
        '[data-pdf="department-impact"]',
        '[data-pdf="call-to-action"]',
      ]

      const sections = sectionSelectors
        .map((selector) => document.querySelector(selector))
        .filter(Boolean) as HTMLElement[]

      if (sections.length === 0) {
        throw new Error("No content sections found for PDF generation")
      }

      let currentY = margin
      let pageNumber = 1

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]

        try {
          // Create canvas from section with Safari-compatible options
          const canvas = await html2canvas(section, {
            scale: 1.5, // Reduced scale for better Safari compatibility
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#111827",
            width: section.offsetWidth,
            height: section.offsetHeight,
            logging: false, // Disable logging for cleaner output
            imageTimeout: 15000, // Increase timeout for Safari
          })

          const imgData = canvas.toDataURL("image/png")
          const imgWidth = contentWidth
          const imgHeight = (canvas.height * imgWidth) / canvas.width

          // Check if we need a new page
          if (currentY + imgHeight > pageHeight - margin && pageNumber > 1) {
            pdf.addPage()
            currentY = margin
            pageNumber++
          }

          // Add the section to PDF
          pdf.addImage(imgData, "PNG", margin, currentY, imgWidth, imgHeight)
          currentY += imgHeight + 10

          // Add page break after certain sections
          if (i === 1 || i === 4) {
            pdf.addPage()
            currentY = margin
            pageNumber++
          }
        } catch (sectionError) {
          console.warn(`Failed to process section ${i}:`, sectionError)
          // Continue with other sections
        }
      }

      // Add footer to each page
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(10)
        pdf.setTextColor(128, 128, 128)
        pdf.text(
          `ROI Analysis Report - ${reportData.company} | Page ${i} of ${totalPages} | zamora.ai`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" },
        )
      }

      // Save the PDF with Safari-compatible filename
      const fileName = `Zamora-ROI-Analysis-${reportData.company.replace(/[^a-zA-Z0-9]/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert(
        "Error generating PDF. This feature may not be available in your current browser. Please try using Chrome, Firefox, or Edge for PDF generation.",
      )
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        await navigator.share({
          title: "ROI Analysis Report - Powered by ANDI",
          text: `ROI Analysis for ${reportData?.company} - Total Annual Savings: $${Math.round(reportData?.totalAnnualSavings || 0).toLocaleString()}`,
          url: window.location.href,
        })
      } else {
        // Fallback: copy URL to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(window.location.href)
          alert("Report URL copied to clipboard!")
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea")
          textArea.value = window.location.href
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand("copy")
          document.body.removeChild(textArea)
          alert("Report URL copied to clipboard!")
        }
      }
    } catch (error) {
      console.error("Share failed:", error)
      alert("Sharing not available. You can copy the URL from your browser's address bar.")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading report...</div>
          <div className="text-gray-400 text-sm mt-2">This may take a moment on Safari</div>
        </div>
      </div>
    )
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-8">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <div className="text-white text-xl mb-4">{error || "Report data not found"}</div>
          <p className="text-gray-400 mb-6">
            It looks like the report data couldn't be loaded. This might happen if you navigated directly to this page
            or if your browser's privacy settings blocked data storage.
          </p>

          {/* Debug information for troubleshooting */}
          {debugInfo.length > 0 && (
            <details className="text-left bg-gray-800/50 p-4 rounded-lg mb-6">
              <summary className="text-gray-300 cursor-pointer mb-2">Debug Information</summary>
              <div className="text-xs text-gray-400 space-y-1">
                {debugInfo.map((info, index) => (
                  <div key={index}>• {info}</div>
                ))}
              </div>
            </details>
          )}

          <div className="space-y-4">
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-6 py-2 mr-4"
            >
              Go to Main Page
            </Button>
            <Button
              onClick={() => window.close()}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-2 bg-transparent"
            >
              Close Window
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const totalHoursBefore = reportData.decisionsPerWeek * reportData.decisionTime * reportData.decisionMakers * 52
  const efficiencyGain = 70
  const decisionValueMultiplier = 1.5
  const roiMultiple = Math.round(reportData.totalAnnualSavings / Math.max(reportData.currentToolCost, 1000))

  const departmentImpacts = [
    {
      department: "Sales",
      useCase: "Prioritize pipeline based on intent signals",
      value: "Revenue acceleration",
    },
    {
      department: "Marketing",
      useCase: "Instantly see what's working mid-campaign",
      value: "Spend optimization",
    },
    {
      department: "Operations",
      useCase: "Reallocate resources in real-time",
      value: "Cost avoidance",
    },
    {
      department: "Finance",
      useCase: "Improve forecast accuracy without extra reports",
      value: "Risk mitigation",
    },
    {
      department: "Product",
      useCase: "Get live customer feedback insights",
      value: "Innovation velocity",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-sm" data-pdf="header">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img src="/zamora-logo.png" alt="Zamora Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-3xl font-light">
                  <GradientText>Zamora ROI Analysis</GradientText>
                </h1>
                <p className="text-gray-400">Powered by ANDI</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGeneratingPDF ? "Generating..." : "Download PDF"}
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Report
              </Button>
            </div>
          </div>

          {/* Report Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-gray-800/30 p-4 rounded-lg">
              <User className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Prepared for</p>
                <p className="font-medium">
                  {reportData.firstName} {reportData.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-800/30 p-4 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Company</p>
                <p className="font-medium">{reportData.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-800/30 p-4 rounded-lg">
              <Briefcase className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Role</p>
                <p className="font-medium">{reportData.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-800/30 p-4 rounded-lg">
              <Mail className="h-5 w-5 text-pink-400" />
              <div>
                <p className="text-sm text-gray-400">Department</p>
                <p className="font-medium">{reportData.department}</p>
              </div>
            </div>
          </div>

          {/* Generation timestamp */}
          {reportData.generatedAt && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Report generated on {new Date(reportData.generatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Executive Summary */}
        <Card
          className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 mb-12"
          data-pdf="executive-summary"
        >
          <CardHeader>
            <CardTitle className="text-3xl font-light text-center">Executive Summary</CardTitle>
            <p className="text-gray-300 text-center text-lg">
              Your organization has the opportunity to unlock significant business value by integrating ANDI into your
              decision-making and operational workflows.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-blue-500/20 p-4 rounded-lg mb-3">
                  <Clock className="h-8 w-8 text-blue-400 mx-auto" />
                </div>
                <p className="text-sm text-gray-400 mb-1">Decision Time Saved</p>
                <p className="text-2xl font-bold text-blue-400">
                  {Math.round(reportData.annualTimeSaved).toLocaleString()} hours/year
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-500/20 p-4 rounded-lg mb-3">
                  <DollarSign className="h-8 w-8 text-green-400 mx-auto" />
                </div>
                <p className="text-sm text-gray-400 mb-1">Time Efficiency Savings</p>
                <p className="text-2xl font-bold text-green-400">
                  ${Math.round(reportData.annualCostSaved).toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/20 p-4 rounded-lg mb-3">
                  <Zap className="h-8 w-8 text-purple-400 mx-auto" />
                </div>
                <p className="text-sm text-gray-400 mb-1">Faster Decision Value</p>
                <p className="text-2xl font-bold text-purple-400">
                  ${Math.round(reportData.opportunityCostSavings).toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-pink-500/20 p-4 rounded-lg mb-3">
                  <BarChart3 className="h-8 w-8 text-pink-400 mx-auto" />
                </div>
                <p className="text-sm text-gray-400 mb-1">Platform Stack Optimization</p>
                <p className="text-2xl font-bold text-pink-400">
                  ${Math.round(reportData.toolConsolidationSavings).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-emerald-900/50 to-green-900/50 rounded-lg p-8 border border-emerald-500/30">
              <p className="text-xl font-semibold text-gray-200 mb-2">Total ROI Opportunity</p>
              <p className="text-5xl font-bold text-emerald-400 mb-2">
                ${Math.round(reportData.totalAnnualSavings).toLocaleString()}
              </p>
              <p className="text-gray-400">annually</p>
            </div>
          </CardContent>
        </Card>

        {/* Time Efficiency Savings */}
        <Card className="bg-gray-900/40 border-gray-800/50 mb-8" data-pdf="time-efficiency">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Clock className="h-6 w-6 text-blue-400" />
              Time Efficiency Savings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">What It Measures:</h4>
              <p className="text-gray-400">
                The direct labor cost saved by reducing the number of hours spent preparing, aligning, and finalizing
                strategic decisions.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">Your Calculation:</h4>
              <div className="bg-gray-800/50 p-4 rounded-lg space-y-2">
                <p className="text-gray-300">
                  <span className="text-blue-400 font-bold">{reportData.decisionMakers}</span> decision-makers ×
                  <span className="text-blue-400 font-bold"> {reportData.decisionsPerWeek}</span> decisions/week ×
                  <span className="text-blue-400 font-bold"> {reportData.decisionTime}</span> hours per decision × 52
                  weeks =<span className="text-blue-400 font-bold"> {totalHoursBefore.toLocaleString()}</span>{" "}
                  hours/year
                </p>
                <p className="text-gray-300">
                  ANDI reduces decision time by <span className="text-green-400 font-bold">{efficiencyGain}%</span>,
                  saving:
                </p>
                <p className="text-lg font-semibold text-green-400">
                  → {Math.round(reportData.annualTimeSaved).toLocaleString()} hours × $
                  {Math.round(reportData.hourlyRate)} = ${Math.round(reportData.annualCostSaved).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">Why It Matters:</h4>
              <p className="text-gray-400 mb-4">
                These are executive hours — among the most expensive and most constrained resources in the business.
                Saving them means:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Reducing cognitive load",
                  "Shortening alignment meetings",
                  "Ending decision fatigue",
                  "Reclaiming strategic focus",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 bg-blue-500/10 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 mt-4">
                You're freeing up your top talent to do higher-leverage work instead of wrangling data and chasing
                context.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Faster Decision Value */}
        <Card className="bg-gray-900/40 border-gray-800/50 mb-8" data-pdf="faster-decision">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Zap className="h-6 w-6 text-purple-400" />
              Faster Decision Value
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">What It Measures:</h4>
              <p className="text-gray-400">
                The economic upside of making better decisions faster — capturing revenue earlier, avoiding unnecessary
                cost, and responding to change before competitors.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">Your Calculation:</h4>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-lg font-semibold text-purple-400">
                  {Math.round(reportData.annualTimeSaved).toLocaleString()} saved hours × $
                  {Math.round(reportData.hourlyRate)} × {decisionValueMultiplier} = $
                  {Math.round(reportData.opportunityCostSavings).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">Why It Matters:</h4>
              <p className="text-gray-400 mb-4">
                Speed compounds. Every day a decision is delayed is a day of lost opportunity. Faster decisions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Accelerate product launches",
                  "Improve response to market volatility",
                  "Minimize revenue leakage from inaction",
                  "Reduce the lag between signal → insight → execution",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 bg-purple-500/10 p-3 rounded-lg">
                    <ArrowRight className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 mt-4">
                This metric captures the often-overlooked financial value of velocity.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Platform Stack Optimization */}
        <Card className="bg-gray-900/40 border-gray-800/50 mb-8" data-pdf="platform-optimization">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <BarChart3 className="h-6 w-6 text-pink-400" />
              Platform Stack Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">What It Measures:</h4>
              <p className="text-gray-400">
                The reduction in tool fragmentation, manual process costs, and duplicated software functionalities
                replaced by ANDI.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">Your Calculation:</h4>
              <div className="bg-gray-800/50 p-4 rounded-lg space-y-2">
                <p className="text-gray-300">
                  Estimated current annual stack spend:{" "}
                  <span className="text-pink-400 font-bold">${reportData.currentToolCost.toLocaleString()}</span>
                </p>
                <p className="text-gray-300">
                  ANDI consolidates BI, dashboards, alerts, automations, and insight generation under one intelligent
                  system.
                </p>
                <p className="text-lg font-semibold text-pink-400">
                  → Consolidation Efficiency: ${Math.round(reportData.toolConsolidationSavings).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">Why It Matters:</h4>
              <p className="text-gray-400 mb-4">
                Organizations often overspend on disconnected tools that don't talk to each other. With ANDI:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "You reduce the burden on IT and data teams",
                  "You eliminate redundant licenses",
                  "You minimize user fatigue from tool-hopping",
                  "You centralize intelligence under one secure, actionable platform",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 bg-pink-500/10 p-3 rounded-lg">
                    <Target className="h-5 w-5 text-pink-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 mt-4">
                This is efficiency without compromise — not reducing capability, but multiplying it.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total ROI Value */}
        <Card
          className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30 mb-8"
          data-pdf="total-roi"
        >
          <CardHeader>
            <CardTitle className="text-2xl text-center">Total ROI Value</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <p className="text-xl font-semibold text-gray-200 mb-2">Total Estimated Business Value from ANDI:</p>
              <p className="text-4xl font-bold text-emerald-400 mb-1">
                ${Math.round(reportData.totalAnnualSavings).toLocaleString()}
              </p>
              <p className="text-gray-400">annually</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-200 mb-2">Return on Investment:</p>
              <p className="text-2xl font-bold text-emerald-400">{roiMultiple}× ROI</p>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-300 mb-3">Why It Matters:</h4>
              <p className="text-gray-400">
                This ROI is not theoretical — it's grounded in your current operations. Whether your goal is margin
                protection, scaling without hiring, or outpacing competitors, ANDI creates real, measurable impact.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Department-Level Impact */}
        <Card className="bg-gray-900/40 border-gray-800/50 mb-8" data-pdf="department-impact">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Users className="h-6 w-6 text-cyan-400" />
              Department-Level Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300">Department</th>
                    <th className="text-left py-3 px-4 text-gray-300">Use Case</th>
                    <th className="text-left py-3 px-4 text-gray-300">Value Unlocked</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentImpacts.map((impact, index) => (
                    <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                          {impact.department}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{impact.useCase}</td>
                      <td className="py-4 px-4">
                        <span className="text-emerald-400 font-semibold">{impact.value}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card
          className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 text-center"
          data-pdf="call-to-action"
        >
          <CardContent className="py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-light mb-4">Why is data still stuck in silos in 2025?</h2>
              <div className="space-y-4 text-lg text-gray-300 max-w-3xl mx-auto">
                <p>Sales has one version of the truth.</p>
                <p>Ops another.</p>
                <p>Finance runs its own story.</p>
                <p>Leadership? They're piecing it all together, but sometimes late.</p>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg mb-8 max-w-2xl mx-auto">
              <p className="text-gray-300 italic text-lg">
                "According to Gartner, over 87% of organizations have low analytics maturity, struggling to make
                data-driven decisions at scale."
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-gray-300">
                Visit <span className="text-purple-400 font-semibold">zamora.ai</span> to apply for early access and
                discover how ANDI is redefining business intelligence.
              </p>
              <p className="text-2xl font-light">
                Let's stop reporting and start <GradientText>deciding!</GradientText>
              </p>

              <div className="flex gap-4 justify-center mt-8">
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-3"
                  onClick={() => window.open("https://zamora.ai", "_blank")}
                >
                  Visit zamora.ai
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 bg-transparent"
                  onClick={() => window.close()}
                >
                  Close Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-800/50">
          <p className="text-gray-500">
            Learn more at <span className="text-purple-400">zamora.ai</span> | Built to Think. Ready to Act.
          </p>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense wrapper for better Safari compatibility
export default function ROIReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <div className="text-white text-xl">Loading report...</div>
          </div>
        </div>
      }
    >
      <ROIReportContent />
    </Suspense>
  )
}
