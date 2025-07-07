"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Share2,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Copy,
  Home,
} from "lucide-react"
import { motion } from "framer-motion"
import GradientText from "@/components/gradient-text"

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
  generatedAt: string
}

function ROIReportContent() {
  const searchParams = useSearchParams()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  // Safe storage access function
  const safeGetStorage = (key: string, storageType: "localStorage" | "sessionStorage" = "localStorage") => {
    try {
      if (typeof window === "undefined") return null
      const storage = storageType === "localStorage" ? localStorage : sessionStorage
      return storage.getItem(key)
    } catch (error) {
      console.warn(`Failed to access ${storageType}:`, error)
      return null
    }
  }

  useEffect(() => {
    const loadReportData = async () => {
      try {
        console.log("Loading report data...")

        // Try multiple sources for data
        let data: ReportData | null = null

        // 1. Try localStorage first
        const localData = safeGetStorage("roiReportData")
        if (localData) {
          try {
            data = JSON.parse(localData)
            console.log("Data loaded from localStorage:", data)
          } catch (e) {
            console.warn("Failed to parse localStorage data:", e)
          }
        }

        // 2. Try sessionStorage as backup
        if (!data) {
          const sessionData = safeGetStorage("roiReportData", "sessionStorage")
          if (sessionData) {
            try {
              data = JSON.parse(sessionData)
              console.log("Data loaded from sessionStorage:", data)
            } catch (e) {
              console.warn("Failed to parse sessionStorage data:", e)
            }
          }
        }

        // 3. Try URL parameters as final fallback
        if (!data) {
          const urlData = searchParams.get("data")
          if (urlData) {
            try {
              data = JSON.parse(decodeURIComponent(urlData))
              console.log("Data loaded from URL:", data)
            } catch (e) {
              console.warn("Failed to parse URL data:", e)
            }
          }
        }

        if (data) {
          setReportData(data)
          console.log("Report data successfully loaded")
        } else {
          console.error("No report data found in any source")
          setError("No report data found. Please generate a new report from the calculator.")
        }
      } catch (error) {
        console.error("Error loading report data:", error)
        setError("Failed to load report data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadReportData()
  }, [searchParams])

  const generatePDF = async () => {
    setIsGeneratingPDF(true)

    try {
      // Dynamic import for better Safari compatibility
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([import("jspdf"), import("html2canvas")])

      const reportElement = document.getElementById("roi-report-content")
      if (!reportElement) {
        throw new Error("Report content not found")
      }

      // Create PDF with proper dimensions
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Get all sections to capture
      const sections = reportElement.querySelectorAll(".pdf-section")
      let yPosition = 20

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement

        try {
          // Capture section with reduced scale for Safari compatibility
          const canvas = await html2canvas(section, {
            scale: 1.5, // Reduced from 2 for better Safari performance
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#0c0c14",
            timeout: 10000, // Add timeout
          })

          const imgData = canvas.toDataURL("image/png", 0.8) // Reduced quality for smaller file
          const imgWidth = pageWidth - 20
          const imgHeight = (canvas.height * imgWidth) / canvas.width

          // Add new page if needed
          if (i > 0 && yPosition + imgHeight > pageHeight - 20) {
            pdf.addPage()
            yPosition = 20
          }

          pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight)
          yPosition += imgHeight + 10

          // Add page break for major sections
          if (i < sections.length - 1 && yPosition > pageHeight * 0.7) {
            pdf.addPage()
            yPosition = 20
          }
        } catch (sectionError) {
          console.warn(`Failed to capture section ${i}:`, sectionError)
          // Continue with next section
        }
      }

      // Add footer to all pages
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setTextColor(128, 128, 128)
        pdf.text(`Generated by ANDI ROI Calculator - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, {
          align: "center",
        })
        pdf.text(`${new Date().toLocaleDateString()}`, pageWidth - 20, pageHeight - 10, { align: "right" })
      }

      // Generate filename
      const fileName = `ANDI_ROI_Report_${reportData?.company?.replace(/[^a-zA-Z0-9]/g, "_") || "Company"}_${new Date().toISOString().split("T")[0]}.pdf`

      pdf.save(fileName)
    } catch (error) {
      console.error("PDF generation failed:", error)
      alert(
        "Failed to generate PDF. This might be due to browser restrictions. Please try again or use a different browser.",
      )
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const shareReport = async () => {
    const shareData = {
      title: `ANDI ROI Report - ${reportData?.company}`,
      text: `ROI Analysis showing potential savings of $${reportData?.totalAnnualSavings?.toLocaleString()} annually`,
      url: window.location.href,
    }

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert("Report link copied to clipboard!")
      }
    } catch (error) {
      console.error("Share failed:", error)
      // Final fallback: show the URL
      prompt("Copy this link to share the report:", window.location.href)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        alert("Copied to clipboard!")
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        alert("Copied to clipboard!")
      }
    } catch (error) {
      console.error("Copy failed:", error)
      prompt("Copy this text:", text)
    }
  }

  // Plan-specific content
  const getPlanSpecificContent = (plan: string) => {
    switch (plan) {
      case "Launch":
        return {
          executiveSummary:
            "Your organization is well-positioned to begin its AI-powered analytics journey with ANDI's Launch plan. This foundational approach focuses on establishing core intelligent capabilities while delivering immediate productivity gains for your decision-making team.",
          timeEfficiencyDescription:
            "The Launch plan emphasizes streamlining your most time-consuming analytical tasks. By automating routine data gathering and basic reporting, your team can focus on interpreting insights rather than creating them.",
          timeEfficiencyWhy:
            "For growing teams, every hour saved on manual analysis directly translates to more strategic thinking time. The Launch plan's focused approach ensures quick wins while building the foundation for future expansion.",
          toolConsolidationDescription:
            "The Launch plan reduces tool complexity by consolidating your essential analytics needs into a single, intuitive platform. This eliminates the learning curve of multiple systems while providing unified insights.",
          toolConsolidationWhy:
            "Smaller teams benefit most from simplicity. By reducing tool sprawl early, you avoid the complexity and costs that come with managing multiple disconnected systems as you grow.",
          opportunityDescription:
            "With faster access to insights, your team can respond more quickly to market opportunities and make data-driven decisions without waiting for complex analysis cycles.",
          opportunityWhy:
            "Speed is crucial for growing businesses. The Launch plan ensures you can capitalize on opportunities quickly while building the analytical capabilities needed for future growth.",
          implementationFocus: "Quick deployment with minimal complexity",
          roiTimeline: "Immediate productivity gains with 3-month full ROI realization",
        }
      case "Scale":
        return {
          executiveSummary:
            "Your organization demonstrates the scale and complexity that makes ANDI's Scale plan ideal. With multiple decision makers and sophisticated analytical needs, this plan delivers advanced capabilities while maintaining the agility your growing business requires.",
          timeEfficiencyDescription:
            "The Scale plan tackles complex analytical workflows across multiple departments. Advanced automation handles sophisticated data correlations, multi-source analysis, and dynamic reporting that would typically require dedicated analysts.",
          timeEfficiencyWhy:
            "Growing organizations face exponentially increasing data complexity. The Scale plan's advanced automation prevents analytical bottlenecks from slowing down your expansion, ensuring insights scale with your business.",
          toolConsolidationDescription:
            "The Scale plan consolidates enterprise-grade tools while providing the flexibility to integrate with your existing systems. This hybrid approach maximizes savings while minimizing disruption to established workflows.",
          toolConsolidationWhy:
            "Mid-size organizations often struggle with tool proliferation as different departments adopt their own solutions. The Scale plan provides centralized intelligence while respecting departmental needs, preventing future integration headaches.",
          opportunityDescription:
            "Advanced forecasting and predictive analytics help you identify market opportunities before competitors, while real-time insights enable rapid strategic pivots and market expansion decisions.",
          opportunityWhy:
            "Growth-stage companies must balance speed with sophistication. The Scale plan provides enterprise-level insights with startup agility, ensuring you can compete with larger organizations while maintaining your competitive edge.",
          implementationFocus: "Phased rollout across departments with advanced integration",
          roiTimeline: "25% efficiency gains in month 1, scaling to 70% by month 6",
        }
      case "Enterprise":
        return {
          executiveSummary:
            "Your organization's scale and complexity require ANDI's most comprehensive solution. The Enterprise plan delivers unlimited analytical power, custom integrations, and dedicated support to transform how your large organization makes strategic decisions.",
          timeEfficiencyDescription:
            "The Enterprise plan handles massive-scale analytical operations across global teams. Unlimited processing power, custom workflows, and AI-driven insights management ensure that even your most complex analytical challenges are automated and optimized.",
          timeEfficiencyWhy:
            "Large enterprises face unique challenges: massive data volumes, complex organizational structures, and high-stakes decisions. The Enterprise plan's unlimited capabilities ensure that scale becomes an advantage, not a limitation, in your analytical operations.",
          toolConsolidationDescription:
            "The Enterprise plan provides complete platform consolidation with unlimited custom integrations. Legacy systems, specialized tools, and departmental solutions all connect seamlessly, creating a unified intelligence layer across your entire organization.",
          toolConsolidationWhy:
            "Enterprise tool sprawl can cost millions annually in licensing, integration, and maintenance. The Enterprise plan's unlimited integration capabilities and custom API support ensure maximum consolidation savings while preserving critical specialized functionality.",
          opportunityDescription:
            "Enterprise-grade predictive analytics, market intelligence, and strategic planning tools enable your organization to identify and capitalize on opportunities at global scale, often months before competitors recognize emerging trends.",
          opportunityWhy:
            "Enterprise success depends on strategic foresight and execution speed. The Enterprise plan's advanced capabilities ensure your organization can identify, evaluate, and act on opportunities faster than smaller, more agile competitors, maintaining market leadership.",
          implementationFocus: "Enterprise-grade deployment with dedicated success team",
          roiTimeline: "Immediate impact across multiple divisions with full ROI by month 4",
        }
      default:
        return {
          executiveSummary:
            "Your organization is well-positioned to benefit from ANDI's intelligent analytics platform, delivering measurable improvements in decision-making speed and quality.",
          timeEfficiencyDescription:
            "ANDI automates routine analytical tasks, allowing your team to focus on strategic thinking and implementation rather than data gathering and basic analysis.",
          timeEfficiencyWhy:
            "Time is your most valuable resource. Every hour saved on manual data work is an hour that can be invested in innovation, strategy, and growth initiatives that drive real business value.",
          toolConsolidationDescription:
            "ANDI consolidates multiple disconnected tools into a unified platform, reducing complexity while improving insights quality and accessibility.",
          toolConsolidationWhy:
            "Tool sprawl creates inefficiency and data silos. A unified platform eliminates context switching, reduces maintenance overhead, and ensures consistent insights across your entire organization.",
          opportunityDescription:
            "Faster access to insights enables quicker response to market opportunities and more agile strategic decision-making.",
          opportunityWhy:
            "In today's fast-paced business environment, the speed of decision-making often determines market leadership. Faster, data-driven decisions translate directly into competitive advantage and revenue growth.",
          implementationFocus: "Tailored deployment approach",
          roiTimeline: "Progressive efficiency gains with full ROI realization",
        }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your ROI report...</p>
          <p className="text-sm text-gray-500 mt-2">This works best in Chrome, Firefox, and Safari</p>
        </div>
      </div>
    )
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Report Not Found</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="space-y-3">
            <p className="text-sm text-gray-400">Debug info:</p>
            <p className="text-xs text-gray-500">
              localStorage: {safeGetStorage("roiReportData") ? "✓ Found" : "✗ Empty"}
            </p>
            <p className="text-xs text-gray-500">
              sessionStorage: {safeGetStorage("roiReportData", "sessionStorage") ? "✓ Found" : "✗ Empty"}
            </p>
            <p className="text-xs text-gray-500">URL params: {searchParams.get("data") ? "✓ Found" : "✗ Empty"}</p>
          </div>
          <Button
            onClick={() => (window.location.href = "/")}
            className="mt-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Main Page
          </Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const planFeatures = {
    Launch: [
      "5K Generated Insights/Month",
      "3,000 Total NLP Queries/Month",
      "3 Standard Integrations",
      "Community & Email Support",
    ],
    Scale: [
      "50K Generated Insights/Month",
      "15,000 Total NLP Queries/Month",
      "10 Standard Integrations + Plugin Support",
      "Priority Support + Onboarding",
    ],
    Enterprise: [
      "500K Generated Insights/Month",
      "250,000 Total NLP Queries/Month",
      "Unlimited Integrations + Custom APIs",
      "Dedicated CSM, SLA, Onboarding Team",
    ],
  }

  const planContent = getPlanSpecificContent(reportData.suggestedPlan)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/zamora-logo.png"
                alt="Zamora"
                className="h-8 w-auto"
                onError={(e) => {
                  // Fallback if logo doesn't load
                  e.currentTarget.style.display = "none"
                }}
              />
              <div>
                <h1 className="text-xl font-bold text-white">ROI Analysis Report</h1>
                <p className="text-sm text-gray-400">Generated on {formatDate(reportData.generatedAt)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={shareReport}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 hover:opacity-90"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPDF ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div id="roi-report-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Executive Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pdf-section"
        >
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Target className="w-6 h-6 mr-3 text-purple-400" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-3">Company Profile</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Company:</span>
                      <span className="text-white font-medium">{reportData.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contact:</span>
                      <span className="text-white">
                        {reportData.firstName} {reportData.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Role:</span>
                      <span className="text-white">{reportData.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Department:</span>
                      <span className="text-white">{reportData.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Employees:</span>
                      <span className="text-white">{reportData.employees.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-3">Key Findings</h3>
                  <div className="space-y-3">
                    <div className="bg-emerald-900/30 rounded-lg p-4 border border-emerald-500/30">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-400">
                          ${Math.round(reportData.totalAnnualSavings).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-300">Total Annual Savings Potential</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-purple-500 text-white px-4 py-2">
                        Recommended: {reportData.suggestedPlan} Plan
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <p className="text-gray-300 leading-relaxed">
                  {planContent.executiveSummary} Our analysis shows potential annual savings of{" "}
                  <strong className="text-emerald-400">
                    ${Math.round(reportData.totalAnnualSavings).toLocaleString()}
                  </strong>{" "}
                  through time efficiency gains, tool consolidation, and faster decision-making capabilities.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current State Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pdf-section"
        >
          <Card className="bg-gray-900/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-3 text-blue-400" />
                Current State Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Users className="w-5 h-5 text-blue-400 mr-2" />
                    <h3 className="font-semibold text-gray-200">Decision Making Team</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Decision Makers:</span>
                      <span className="text-white">{reportData.decisionMakers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg. Salary:</span>
                      <span className="text-white">${reportData.avgSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hourly Rate:</span>
                      <span className="text-white">${Math.round(reportData.hourlyRate)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Clock className="w-5 h-5 text-orange-400 mr-2" />
                    <h3 className="font-semibold text-gray-200">Decision Process</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Decisions/Week:</span>
                      <span className="text-white">{reportData.decisionsPerWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hours/Decision:</span>
                      <span className="text-white">{reportData.decisionTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Annual Hours:</span>
                      <span className="text-white">
                        {Math.round(
                          (reportData.decisionsPerWeek * reportData.decisionTime * reportData.decisionMakers * 50) /
                            1000,
                        )}
                        K
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <DollarSign className="w-5 h-5 text-green-400 mr-2" />
                    <h3 className="font-semibold text-gray-200">Current Costs</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tool Costs:</span>
                      <span className="text-white">${reportData.currentToolCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Labor Costs:</span>
                      <span className="text-white">
                        $
                        {Math.round(
                          reportData.decisionsPerWeek *
                            reportData.decisionTime *
                            reportData.decisionMakers *
                            50 *
                            reportData.hourlyRate,
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Annual:</span>
                      <span className="text-white font-semibold">
                        $
                        {Math.round(
                          reportData.currentToolCost +
                            reportData.decisionsPerWeek *
                              reportData.decisionTime *
                              reportData.decisionMakers *
                              50 *
                              reportData.hourlyRate,
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Savings Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pdf-section"
        >
          <Card className="bg-gray-900/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-emerald-400" />
                Projected Savings with ANDI {reportData.suggestedPlan} Plan
              </CardTitle>
              <p className="text-gray-300 mt-2">
                Comprehensive analysis of value creation tailored to your {reportData.suggestedPlan.toLowerCase()}-level
                needs
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Time Efficiency Savings */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-8 border border-blue-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-400 rounded-full mr-4"></div>
                    <h3 className="text-2xl font-bold text-white">Time Efficiency Savings</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-blue-400">
                      ${Math.round(reportData.annualCostSaved).toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-300">Annual Savings</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-blue-300 mb-4">What it measures:</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">{planContent.timeEfficiencyDescription}</p>

                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/20">
                      <h5 className="text-lg font-semibold text-blue-200 mb-3">Key Metrics:</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Time Reduction:</span>
                          <span className="text-blue-400 font-bold text-lg">70%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Hours Saved Annually:</span>
                          <span className="text-blue-400 font-bold text-lg">
                            {Math.round(reportData.annualTimeSaved).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Decisions Accelerated:</span>
                          <span className="text-blue-400 font-bold text-lg">
                            {reportData.decisionsPerWeek * 50}/year
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-blue-300 mb-4">Department Impact:</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">Executive Leadership</span>
                          <span className="text-blue-400 font-bold">
                            ${Math.round(reportData.annualCostSaved * 0.4).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          Strategic decision acceleration, board reporting automation
                        </p>
                        <div className="text-xs text-gray-500 bg-gray-900/50 rounded p-2">
                          <strong>Calculation:</strong> 40% of time savings allocated to C-suite and senior leadership
                          who spend 60% of their time on strategic decisions. Based on {reportData.decisionMakers}{" "}
                          decision makers at ${Math.round(reportData.hourlyRate)} avg hourly rate, saving{" "}
                          {Math.round(reportData.annualTimeSaved * 0.4)} hours annually on executive-level analysis and
                          reporting.
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">Operations</span>
                          <span className="text-blue-400 font-bold">
                            ${Math.round(reportData.annualCostSaved * 0.35).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          Process optimization, performance monitoring, resource allocation
                        </p>
                        <div className="text-xs text-gray-500 bg-gray-900/50 rounded p-2">
                          <strong>Calculation:</strong> 35% allocation reflects operational teams spending 50% of
                          decision time on data gathering and analysis. Estimated{" "}
                          {Math.round(reportData.decisionMakers * 0.6)} operational decision makers saving
                          {Math.round(reportData.annualTimeSaved * 0.35)} hours annually on KPI reporting, process
                          analysis, and resource planning.
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">Finance & Analytics</span>
                          <span className="text-blue-400 font-bold">
                            ${Math.round(reportData.annualCostSaved * 0.25).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          Financial modeling, forecasting, variance analysis automation
                        </p>
                        <div className="text-xs text-gray-500 bg-gray-900/50 rounded p-2">
                          <strong>Calculation:</strong> 25% represents finance teams who typically spend 70% of their
                          time on manual data preparation and analysis. For companies with{" "}
                          {reportData.employees.toLocaleString()} employees, estimated
                          {Math.round(reportData.employees * 0.02)} finance/analytics staff saving{" "}
                          {Math.round(reportData.annualTimeSaved * 0.25)} hours annually on financial reporting and
                          forecasting tasks.
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-blue-800/20 rounded-lg p-4 border border-blue-400/30">
                      <h5 className="text-lg font-semibold text-blue-200 mb-2">Why it matters:</h5>
                      <p className="text-gray-300">{planContent.timeEfficiencyWhy}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tool Consolidation Savings */}
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-8 border border-purple-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-400 rounded-full mr-4"></div>
                    <h3 className="text-2xl font-bold text-white">Tool Consolidation Savings</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-purple-400">
                      ${Math.round(reportData.toolConsolidationSavings).toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-300">Annual Savings</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-purple-300 mb-4">What it measures:</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">{planContent.toolConsolidationDescription}</p>

                    <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/20">
                      <h5 className="text-lg font-semibold text-purple-200 mb-3">Consolidation Impact:</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Tools Consolidated:</span>
                          <span className="text-purple-400 font-bold text-lg">{reportData.toolsConsolidated}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Cost Reduction:</span>
                          <span className="text-purple-400 font-bold text-lg">
                            {Math.round(reportData.consolidationSavingsRate * 100)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Integration Savings:</span>
                          <span className="text-purple-400 font-bold text-lg">
                            ${Math.round(reportData.toolConsolidationSavings * 0.3).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-purple-300 mb-4">Department Impact:</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">IT & Infrastructure</span>
                          <span className="text-purple-400 font-bold">
                            ${Math.round(reportData.toolConsolidationSavings * 0.5).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          Reduced maintenance, fewer integrations, simplified architecture
                        </p>
                        <div className="text-xs text-gray-500 bg-gray-900/50 rounded p-2">
                          <strong>Calculation:</strong> 50% allocation based on IT managing{" "}
                          {reportData.toolsConsolidated} consolidated tools. Estimated savings: $
                          {Math.round(reportData.currentToolCost * 0.3).toLocaleString()} in licensing, $
                          {Math.round(reportData.currentToolCost * 0.15).toLocaleString()} in integration costs, $
                          {Math.round(reportData.currentToolCost * 0.05).toLocaleString()} in maintenance overhead
                          reduction.
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">Training & Support</span>
                          <span className="text-purple-400 font-bold">
                            ${Math.round(reportData.toolConsolidationSavings * 0.3).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Single platform training, unified support model</p>
                        <div className="text-xs text-gray-500 bg-gray-900/50 rounded p-2">
                          <strong>Calculation:</strong> 30% represents training cost reduction from single platform vs{" "}
                          {reportData.toolsConsolidated} separate tools. Estimated $
                          {Math.round(reportData.employees * 150).toLocaleString()} annual training budget reduction ($
                          {150} per employee × {reportData.employees.toLocaleString()} employees) plus $
                          {Math.round(reportData.employees * 50).toLocaleString()} in reduced support tickets and help
                          desk costs.
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">Licensing & Procurement</span>
                          <span className="text-purple-400 font-bold">
                            ${Math.round(reportData.toolConsolidationSavings * 0.2).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          Consolidated vendor relationships, volume discounts
                        </p>
                        <div className="text-xs text-gray-500 bg-gray-900/50 rounded p-2">
                          <strong>Calculation:</strong> 20% from procurement efficiency and volume discounts. Current
                          tool spend: ${reportData.currentToolCost.toLocaleString()}, consolidated savings rate:{" "}
                          {Math.round(reportData.consolidationSavingsRate * 100)}%, plus estimated 15% volume discount
                          on unified platform licensing and ${Math.round(reportData.employees * 25).toLocaleString()} in
                          reduced vendor management overhead.
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-purple-800/20 rounded-lg p-4 border border-purple-400/30">
                      <h5 className="text-lg font-semibold text-purple-200 mb-2">Why it matters:</h5>
                      <p className="text-gray-300">{planContent.toolConsolidationWhy}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opportunity Cost Savings */}
              <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/20 rounded-xl p-8 border border-pink-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-pink-400 rounded-full mr-4"></div>
                    <h3 className="text-2xl font-bold text-white">Faster Decision Value</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-pink-400">
                      ${Math.round(reportData.opportunityCostSavings).toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-300">Annual Value</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-pink-300 mb-4">What it measures:</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">{planContent.opportunityDescription}</p>

                    <div className="bg-pink-900/30 rounded-lg p-4 border border-pink-500/20">
                      <h5 className="text-lg font-semibold text-pink-200 mb-3">Speed Advantages:</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Decision Speed Increase:</span>
                          <span className="text-pink-400 font-bold text-lg">3x Faster</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Market Response Time:</span>
                          <span className="text-pink-400 font-bold text-lg">-60%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Opportunity Capture:</span>
                          <span className="text-pink-400 font-bold text-lg">+40%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-pink-300 mb-4">Department Impact:</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">Sales & Marketing</span>
                          <span className="text-pink-400 font-bold">
                            ${Math.round(reportData.opportunityCostSavings * 0.45).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          Faster campaign optimization, real-time customer insights
                        </p>
                        <div className="text-xs text-gray-500 bg-gray-900/50 rounded p-2">
                          <strong>Calculation:</strong> 45% allocation based on sales/marketing representing highest
                          opportunity cost impact. Estimated revenue acceleration: 15% faster time-to-market on
                          campaigns, 25% improvement in lead conversion from real-time insights, calculated as{" "}
                          {Math.round(reportData.employees * 0.15)} sales/marketing staff × $
                          {Math.round(reportData.avgSalary * 2)} average revenue per employee impact.
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">Product Development</span>
                          <span className="text-pink-400 font-bold">
                            ${Math.round(reportData.opportunityCostSavings * 0.35).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Accelerated feature development, market validation</p>
                        <div className="text-xs text-gray-500 bg-gray-900/50 rounded p-2">
                          <strong>Calculation:</strong> 35% reflects product development cycle acceleration. Estimated
                          30% faster feature validation and 20% reduction in development cycles. Based on{" "}
                          {Math.round(reportData.employees * 0.12)} product/engineering staff, average project value $
                          {Math.round(reportData.avgSalary * 3).toLocaleString()}, with 2-3 additional product releases
                          per year enabled by faster decision-making.
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">Strategic Planning</span>
                          <span className="text-pink-400 font-bold">
                            ${Math.round(reportData.opportunityCostSavings * 0.2).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Rapid market analysis, competitive intelligence</p>
                        <div className="text-xs text-gray-500 bg-gray-900/50 rounded p-2">
                          <strong>Calculation:</strong> 20% represents strategic planning acceleration value. Faster
                          market entry decisions worth estimated 5-10% revenue impact, competitive response time
                          improvement from {reportData.decisionTime} hours to{" "}
                          {Math.round(reportData.decisionTime * 0.3)} hours average, enabling capture of time-sensitive
                          opportunities valued at $
                          {Math.round(reportData.avgSalary * reportData.decisionMakers * 0.1).toLocaleString()}{" "}
                          annually.
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-pink-800/20 rounded-lg p-4 border border-pink-400/30">
                      <h5 className="text-lg font-semibold text-pink-200 mb-2">Why it matters:</h5>
                      <p className="text-gray-300">{planContent.opportunityWhy}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Savings Summary */}
              <div className="bg-gradient-to-r from-emerald-900/40 to-green-900/40 rounded-xl p-8 border border-emerald-500/40">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">Total Annual Value Potential</h3>
                  <div className="text-6xl font-bold text-emerald-400 mb-4">
                    ${Math.round(reportData.totalAnnualSavings).toLocaleString()}
                  </div>
                  <div className="text-xl text-gray-300">
                    in measurable business savings with {reportData.suggestedPlan} Plan
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      ${Math.round(reportData.annualCostSaved).toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-300 mb-2">Time Efficiency</div>
                    <div className="text-sm text-gray-400">
                      {Math.round((reportData.annualCostSaved / reportData.totalAnnualSavings) * 100)}% of total savings
                    </div>
                  </div>
                  <div className="text-center bg-purple-900/20 rounded-lg p-6 border border-purple-500/30">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      ${Math.round(reportData.toolConsolidationSavings).toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-300 mb-2">Tool Consolidation</div>
                    <div className="text-sm text-gray-400">
                      {Math.round((reportData.toolConsolidationSavings / reportData.totalAnnualSavings) * 100)}% of
                      total savings
                    </div>
                  </div>
                  <div className="text-center bg-pink-900/20 rounded-lg p-6 border border-pink-500/30">
                    <div className="text-3xl font-bold text-pink-400 mb-2">
                      ${Math.round(reportData.opportunityCostSavings).toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-300 mb-2">Decision Value</div>
                    <div className="text-sm text-gray-400">
                      {Math.round((reportData.opportunityCostSavings / reportData.totalAnnualSavings) * 100)}% of total
                      savings
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-emerald-800/20 rounded-lg p-6 border border-emerald-400/30">
                  <h4 className="text-xl font-semibold text-emerald-300 mb-4 text-center">
                    ROI Breakdown by Business Function
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">
                        ${Math.round(reportData.totalAnnualSavings * 0.35).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">Executive & Strategy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">
                        ${Math.round(reportData.totalAnnualSavings * 0.3).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">Operations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">
                        ${Math.round(reportData.totalAnnualSavings * 0.2).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">Sales & Marketing</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">
                        ${Math.round(reportData.totalAnnualSavings * 0.15).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">IT & Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommended Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pdf-section"
        >
          <Card className="bg-gray-900/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Zap className="w-5 h-5 mr-3 text-yellow-400" />
                Recommended ANDI Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-center mb-6">
                    <Badge className="bg-purple-500 text-white px-6 py-3 text-lg">
                      {reportData.suggestedPlan} Plan
                    </Badge>
                    <p className="text-gray-300 mt-4 leading-relaxed">
                      {reportData.suggestedPlan === "Launch"
                        ? "Perfect for smaller teams with straightforward decision-making processes and basic analytics needs. This plan provides essential AI-powered insights without overwhelming complexity, making it ideal for organizations beginning their intelligent analytics journey."
                        : reportData.suggestedPlan === "Scale"
                          ? "Ideal for growing organizations with multiple decision makers requiring advanced analytics and integrations. This plan scales with your business, providing sophisticated capabilities while maintaining operational agility."
                          : "Built for large enterprises with complex decision environments requiring maximum insights and custom capabilities. This plan delivers unlimited analytical power with dedicated support for mission-critical operations."}
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-200 mb-3">Plan Selection Factors</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>Company Size:</span>
                        <span className="text-purple-400">{reportData.employees.toLocaleString()} employees</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Decision Makers:</span>
                        <span className="text-purple-400">{reportData.decisionMakers} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Decision Frequency:</span>
                        <span className="text-purple-400">{reportData.decisionsPerWeek}/week</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Decision Complexity:</span>
                        <span className="text-purple-400">{reportData.decisionTime} hours avg</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-200 mb-4">Key Features Included</h4>
                  <div className="space-y-3">
                    {planFeatures[reportData.suggestedPlan as keyof typeof planFeatures].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                    <h5 className="font-semibold text-blue-300 mb-2">Implementation Benefits</h5>
                    <div className="space-y-1 text-sm text-gray-300">
                      {reportData.suggestedPlan === "Launch" ? (
                        <>
                          <div>• Rapid deployment and quick wins</div>
                          <div>• Simplified user experience</div>
                          <div>• Foundation for future growth</div>
                          <div>• Cost-effective entry point</div>
                        </>
                      ) : reportData.suggestedPlan === "Scale" ? (
                        <>
                          <div>• Advanced analytics capabilities</div>
                          <div>• Scalable integration framework</div>
                          <div>• Multi-department coordination</div>
                          <div>• Growth-oriented feature set</div>
                        </>
                      ) : (
                        <>
                          <div>• Enterprise-scale processing power</div>
                          <div>• Unlimited customization options</div>
                          <div>• Dedicated success management</div>
                          <div>• Mission-critical reliability</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Implementation Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pdf-section"
        >
          <Card className="bg-gray-900/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-indigo-400" />
                Implementation Roadmap - {reportData.suggestedPlan} Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {reportData.suggestedPlan === "Launch" ? (
                    <>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-indigo-400 mb-2">Week 1</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Quick Setup</div>
                        <div className="text-xs text-gray-400">
                          • Streamlined deployment
                          <br />• Core data connections
                          <br />• Basic configuration
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-2">Week 2</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Team Onboarding</div>
                        <div className="text-xs text-gray-400">
                          • Basic training sessions
                          <br />• Workflow introduction
                          <br />• Initial best practices
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-emerald-400 mb-2">Month 1</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Pilot Deployment</div>
                        <div className="text-xs text-gray-400">
                          • Focused rollout
                          <br />• Performance monitoring
                          <br />• Optimization tuning
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-2">Month 2+</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Full ROI</div>
                        <div className="text-xs text-gray-400">
                          • Measurable savings
                          <br />• Continuous improvement
                          <br />• Advanced features
                        </div>
                      </div>
                    </>
                  ) : reportData.suggestedPlan === "Scale" ? (
                    <>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-indigo-400 mb-2">Week 1-2</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Setup & Integration</div>
                        <div className="text-xs text-gray-400">
                          • Platform deployment
                          <br />• Data source connections
                          <br />• Initial configuration
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-2">Week 3-4</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Training & Onboarding</div>
                        <div className="text-xs text-gray-400">
                          • Team training sessions
                          <br />• Workflow optimization
                          <br />• Best practices setup
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-emerald-400 mb-2">Month 2</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Full Deployment</div>
                        <div className="text-xs text-gray-400">
                          • Complete rollout
                          <br />• Performance monitoring
                          <br />• Optimization tuning
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-2">Month 3+</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">ROI Realization</div>
                        <div className="text-xs text-gray-400">
                          • Measurable savings
                          <br />• Advanced features
                          <br />• Continuous improvement
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-indigo-400 mb-2">Week 1-4</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Enterprise Setup</div>
                        <div className="text-xs text-gray-400">
                          • Custom deployment
                          <br />• Data migration
                          <br />• System integrations
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-2">Month 2</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Team Enablement</div>
                        <div className="text-xs text-gray-400">
                          • Dedicated training
                          <br />• Workflow design
                          <br />• Best practices
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-emerald-400 mb-2">Month 3</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Global Rollout</div>
                        <div className="text-xs text-gray-400">
                          • Full deployment
                          <br />• Performance tuning
                          <br />• Custom workflows
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-2">Month 4+</div>
                        <div className="text-sm font-semibold text-gray-200 mb-2">Strategic ROI</div>
                        <div className="text-xs text-gray-400">
                          • Measurable savings
                          <br />• Advanced analytics
                          <br />• Continuous improvement
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-200 mb-4">Expected ROI Timeline</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-yellow-400">Month 1</div>
                      <div className="text-sm text-gray-300">25% efficiency gain</div>
                      <div className="text-xs text-gray-400">Initial productivity boost</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-400">Month 3</div>
                      <div className="text-sm text-gray-300">50% efficiency gain</div>
                      <div className="text-xs text-gray-400">Workflow optimization</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-emerald-400">Month 6+</div>
                      <div className="text-sm text-gray-300">70% efficiency gain</div>
                      <div className="text-xs text-gray-400">Full ROI realization</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pdf-section"
        >
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <ArrowRight className="w-5 h-5 mr-3 text-blue-400" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-4">Immediate Actions</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-medium text-gray-200">Schedule a Demo</div>
                        <div className="text-sm text-gray-400">See ANDI in action with your specific use cases</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <div>
                        <div className="font-medium text-gray-200">Pilot Program</div>
                        <div className="text-sm text-gray-400">
                          Start with a focused pilot to validate ROI projections
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <div>
                        <div className="font-medium text-gray-200">Full Implementation</div>
                        <div className="text-sm text-gray-400">Scale across your organization for maximum impact</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-200 mb-4">Contact Information</h4>
                  <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="text-sm text-gray-400">Sales Team</div>
                      <div className="text-white">sales@zamora.ai</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Technical Support</div>
                      <div className="text-white">support@zamora.ai</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Website</div>
                      <div className="text-blue-400">www.zamora.ai</div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => copyToClipboard("sales@zamora.ai")}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Email
                    </Button>
                    <Button
                      onClick={() =>
                        window.open("mailto:sales@zamora.ai?subject=ANDI ROI Report - " + reportData.company, "_blank")
                      }
                      size="sm"
                      className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90"
                    >
                      Contact Sales
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pdf-section text-center py-8 border-t border-gray-700"
        >
          <div className="flex items-center justify-center mb-4">
            <img
              src="/zamora-logo.png"
              alt="Zamora"
              className="h-6 w-auto mr-3"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
            <GradientText className="text-xl font-bold">ANDI by Zamora</GradientText>
          </div>
          <p className="text-gray-400 text-sm">
            This report was generated on {formatDate(reportData.generatedAt)} using the ANDI ROI Calculator.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Results are estimates based on provided inputs and industry benchmarks. Actual results may vary.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function ROIReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading ROI report...</p>
          </div>
        </div>
      }
    >
      <ROIReportContent />
    </Suspense>
  )
}
