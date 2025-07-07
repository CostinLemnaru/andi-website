"use client"

import type React from "react"
import { Zap } from "lucide-react" // Import Zap icon

import { useState, useRef, useEffect } from "react"
import { submitToGoogleSheets } from "@/lib/google-sheets"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import RotatingWords from "./rotating-words"
import GradientText from "./gradient-text"
import ActionWords from "./action-words"
import {
  CheckCircle,
  ChevronDown,
  MessageSquare,
  Link,
  Tag,
  Shield,
  Database,
  Users,
  BarChart3,
  Globe,
  Brain,
  TrendingUp,
  Settings,
  FileText,
  Workflow,
  Target,
  Cpu,
  Info,
} from "lucide-react"
import PageLayout from "./page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  data?: {
    title?: string
    comingSoon?: {
      heroSection?: {
        title?: string
      }
    }
  }
}

export default function ComingSoon({ data }: Props) {
  const heroTitle = data?.comingSoon?.heroSection?.title ?? "Default title"

  const [email, setEmail] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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

  const [employees, setEmployees] = useState(100)
  const [decisionMakers, setDecisionMakers] = useState(1)
  const [avgSalary, setAvgSalary] = useState(100000)
  const [currentToolCost, setCurrentToolCost] = useState(30000)
  const [decisionTime, setDecisionTime] = useState(1)
  const [decisionsPerWeek, setDecisionsPerWeek] = useState(1)

  // Temporary input values for display while typing
  const [employeesInput, setEmployeesInput] = useState("100")
  const [decisionMakersInput, setDecisionMakersInput] = useState("1")
  const [avgSalaryInput, setAvgSalaryInput] = useState("100,000")
  const [currentToolCostInput, setCurrentToolCostInput] = useState("30,000")
  const [decisionTimeInput, setDecisionTimeInput] = useState("1")
  const [decisionsPerWeekInput, setDecisionsPerWeekInput] = useState("1")

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

  // Calculate ROI values
  const hourlyRate = avgSalary / 2080 // 2080 working hours per year
  const decisionMakersHourlyCost = hourlyRate * decisionMakers

  // Calculate usage complexity score based on multiple factors
  const usageComplexityScore =
    (employees / 2500) * 0.4 + // Company size weight (40%)
    (decisionMakers / 50) * 0.25 + // Decision makers weight (25%)
    (decisionsPerWeek / 25) * 0.15 + // Decision frequency weight (15%)
    (decisionTime / 20) * 0.15 + // Decision complexity weight (15%)
    (avgSalary / 125000) * 0.05 // Salary level weight (5%)

  // Tool consolidation savings - based on typical enterprise tool sprawl reduction
  const toolsConsolidated = Math.min(Math.floor(employees / 50) + Math.floor(decisionMakers / 5), 15) // Max 15 tools
  const avgToolCostPerYear = currentToolCost / Math.max(toolsConsolidated, 3) // Assume at least 3 current tools
  const consolidationSavingsRate = Math.min(0.6, 0.3 + toolsConsolidated * 0.02) // 30-60% savings based on tool count
  const toolConsolidationSavings = currentToolCost * consolidationSavingsRate

  const suggestedPlan = usageComplexityScore <= 0.4 ? "Launch" : usageComplexityScore <= 0.8 ? "Scale" : "Enterprise"

  // Opportunity cost savings (faster decisions = faster time to market/action)
  const annualCostSaved = decisionsPerWeek * decisionTime * decisionMakers * 50 * hourlyRate * 0.7 // 70% reduction
  const annualTimeSaved = decisionsPerWeek * decisionTime * decisionMakers * 50 * 0.7 // 70% reduction
  const opportunityCostSavings = annualCostSaved * 1.5 // Conservative multiplier

  // Total savings - subtract additional cost if ANDI is more expensive
  const totalAnnualSavings = annualCostSaved + toolConsolidationSavings + opportunityCostSavings

  const planDescription =
    usageComplexityScore <= 0.4
      ? "Perfect for smaller teams with straightforward decision-making processes and basic analytics needs"
      : usageComplexityScore <= 0.8
        ? "Ideal for growing organizations with multiple decision makers requiring advanced analytics and integrations"
        : "Built for large enterprises with complex decision environments requiring maximum insights and custom capabilities"

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

  // Version Information
  const versions = {
    mvp: {
      title: "MVP - Foundation Intelligence",
      subtitle: "Core capabilities for intelligent data analysis",
      status: "In Development",
      timeline: "Q2 2025",
      color: "bg-blue-500",
    },
    v1: {
      title: "Version 1 - Team Intelligence",
      subtitle: "Collaborative insights and advanced analytics",
      status: "Planned",
      timeline: "Q4 2025",
      color: "bg-purple-500",
    },
    v2: {
      title: "Version 2 - Execution Intelligence",
      subtitle: "Action-oriented insights with autonomous capabilities",
      status: "Roadmap",
      timeline: "Q2 2026",
      color: "bg-pink-500",
    },
    longterm: {
      title: "Long-term Vision",
      subtitle: "Advanced AI co-pilot and enterprise-scale features",
      status: "Vision",
      timeline: "2027-2029",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
  }

  // MVP Features
  const mvpFeatures = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "NLP Query Engine",
      description: "Ask questions in plain language and receive structured insights",
      specs: ["LLM/NLP model hosting", "Natural language parser", "Query translator", "Analytics layer integration"],
    },
    {
      icon: <Link className="h-6 w-6" />,
      title: "LinkDNA™ Correlation Engine",
      description: "Links records without shared IDs using synthetic identifiers",
      specs: [
        "Data normalization services",
        "Fuzzy matching algorithms",
        "Record scoring engine",
        "Confidence-based decisions",
      ],
    },
    {
      icon: <Tag className="h-6 w-6" />,
      title: "Insight Labeling",
      description: "Automatically tags findings by business impact",
      specs: ["Impact taxonomy model", "Tagging engine", "Insight classifier service", "Business impact scoring"],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Confidence-Based Output",
      description: "Every insight delivered with confidence score and reasoning",
      specs: ["Explainability engine", "Scoring model", "Logic trace framework", "Transparency reporting"],
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Multi-Dataset Analysis",
      description: "Correlates siloed data sources across departments",
      specs: ["Multi-source ingestion", "Schema-mapping module", "Cross-dataset joins", "Data correlation engine"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Single-User Workspace",
      description: "Clean, solo-user interface for testing and insights",
      specs: ["Basic user auth", "UI interface", "User storage", "Query state management"],
    },
  ]

  // Version 1 Features
  const v1Features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Graph Generation via NLP",
      description: "Generate charts and visuals using natural language",
      specs: ["Chart rendering library", "NLP-to-visualization parser", "Frontend graphing components"],
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Business Unit Switching",
      description: "Toggle between business units with global view support",
      specs: ["Multi-entity data modeling", "Query scoping engine", "Cross-BU access layer"],
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Embedded Dashboards",
      description: "Each dashboard includes embedded AI assistant",
      specs: ["Embedded NLP interface", "Real-time query processor", "Contextual filtering"],
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Anomaly Detection",
      description: "Flags abnormal patterns in spend, usage, and churn",
      specs: ["Statistical anomaly engine", "Historical baseline analyzer", "Notification system"],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Forecasting Engine",
      description: "Predicts revenue, churn, and KPIs from historical patterns",
      specs: ["Predictive modeling", "Time-series forecasting", "Training pipeline"],
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Plug-in Framework",
      description: "Integrates live data from CRMs, ERPs, support platforms",
      specs: ["Plugin API interface", "Connector SDK", "Data ingestion abstraction"],
    },
  ]

  // Version 2 Features
  const v2Features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Presentation & PDF Creation",
      description: "Auto-generate slide decks and PDFs from insights",
      specs: ["PDF generation engine", "Template designer", "Export module"],
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      title: "Execution Dashboard",
      description: "Track all actions initiated through 'Act With ANDI'",
      specs: ["Workflow status tracker", "Task queue manager", "Execution visualizer"],
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "'Act With ANDI' Assistant",
      description: "Suggests strategic actions based on detected insights",
      specs: ["Action recommendation engine", "Context resolver", "Execution flow handler"],
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Root Cause Explorer",
      description: "Guides users to uncover the 'why' behind trends",
      specs: ["Correlation analysis", "Causal reasoning engine", "Explanation generator"],
    },
  ]

  // Long-term Features
  const longTermFeatures = [
    {
      icon: <Settings className="h-6 w-6" />,
      title: "User-Defined Workflow Builder",
      description: "Create custom workflows for autonomous execution",
      specs: ["Workflow composer UI", "Logic validation", "Autonomous triggers"],
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-Entity Forecasting",
      description: "Forecasts across business units and regions simultaneously",
      specs: ["Aggregated forecasting", "BU-aware projections", "Cross-entity logic"],
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Autonomous Co-Pilot Mode",
      description: "Executes operational tasks via AI-driven decisions",
      specs: ["Task automation engine", "Policy validation", "Execution monitoring"],
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Knowledge Graph Engine",
      description: "Visualizes entity relationships and insight connections",
      specs: ["Graph database", "Relationship extraction", "Graph rendering UI"],
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Voice + Multimodal Interface",
      description: "Natural voice commands and multimodal data input capabilities",
      specs: [
        "Voice recognition engine",
        "Multimodal data processing",
        "Natural speech synthesis",
        "Cross-modal understanding",
      ],
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Narrative Builder",
      description: "Automatically generates comprehensive business narratives from insights",
      specs: [
        "Story generation engine",
        "Context-aware narratives",
        "Executive summary builder",
        "Multi-format output",
      ],
    },
  ]

  const getFeaturesByVersion = (version: string) => {
    switch (version) {
      case "mvp":
        return mvpFeatures
      case "v1":
        return v1Features
      case "v2":
        return v2Features
      case "longterm":
        return longTermFeatures
      default:
        return mvpFeatures
    }
  }

  // Helper function to format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  // Helper function to parse number from formatted string
  const parseFormattedNumber = (str: string) => {
    return Number.parseInt(str.replace(/[^0-9]/g, "")) || 0
  }

  // Setup scroll-based animations
  useEffect(() => {
    let ticking = false
    let animationFrameId: number

    const updateElements = () => {
      const scrollElements = document.querySelectorAll(".scroll-fade")
      const windowHeight = window.innerHeight
      const windowCenter = windowHeight / 2

      // Check if we're at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100

      scrollElements.forEach((element) => {
        const rect = element.getBoundingClientRect()

        // Check for special classes
        const isFadeFromTop = element.classList.contains("fade-from-top")
        const isFadeAtBottom = element.classList.contains("fade-at-bottom")
        const isFadeEarly = element.classList.contains("fade-early")

        let opacity = 0

        // Special case for elements that should be visible at the bottom of the page
        if (isFadeAtBottom && isAtBottom) {
          opacity = 1
        } else if (isFadeFromTop) {
          // For roadmap section:
          // 1. Start fading in when top reaches center
          // 2. Fully visible when top is above center
          // 3. Stay visible until bottom reaches center
          // 4. Start fading out when bottom moves above center

          if (rect.top <= windowCenter) {
            if (rect.bottom >= windowCenter) {
              // Element is still in view (between top passing center and bottom passing center)
              opacity = 1
            } else {
              // Bottom has passed center, start fading out
              const distanceFromCenter = (rect.bottom - windowCenter) / windowHeight
              opacity = Math.max(0, 1 + distanceFromCenter * 2)
            }
          } else {
            // Top hasn't reached center yet, calculate fade in
            const distanceFromCenter = (rect.top - windowCenter) / windowHeight
            opacity = Math.max(0, 1 - distanceFromCenter * 2)
          }
        } else if (isFadeEarly) {
          // For ROI calculator - start fading in as soon as top enters viewport
          if (rect.top <= windowHeight) {
            // Element top is visible in viewport, calculate fade based on how much is visible
            if (rect.top <= windowHeight * 0.8) {
              // Fully visible when top reaches 80% of viewport height
              opacity = 1
            } else {
              // Gradual fade in from 100% to 80% of viewport height
              const fadeProgress = (windowHeight - rect.top) / (windowHeight * 0.2)
              opacity = Math.max(0, Math.min(1, fadeProgress))
            }
          } else {
            // Element not yet visible
            opacity = 0
          }
        } else {
          // For all other elements, use modified calculation to fade out later when scrolling up
          const elementCenter = rect.top + rect.height / 2
          const distanceFromCenter = (elementCenter - windowCenter) / windowHeight
          // If element is above center (scrolling up), use a gentler fade rate
          if (distanceFromCenter < 0) {
            // Element is above center (scrolling up) - fade out more slowly
            opacity = Math.max(0, 1 - Math.abs(distanceFromCenter * 1.2)) // Reduced from 2 to 1.2 for slower fade
          } else {
            // Element is below center (scrolling down) - use original fade rate
            opacity = Math.max(0, 1 - Math.abs(distanceFromCenter * 2))
          }
        }
        // Apply opacity directly without transitions for immediate effect
        ;(element as HTMLElement).style.opacity = opacity.toString()

        // Apply transform based on position (subtle parallax effect)
        const distanceFromCenter = (rect.top + rect.height / 2 - windowCenter) / windowHeight
        const translateY = Math.abs(distanceFromCenter) * 20 // max 20px shift
        ;(element as HTMLElement).style.transform = `translateY(${distanceFromCenter > 0 ? translateY : 0}px)`
      })

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        // Use requestAnimationFrame for smoother animations
        ticking = true
        animationFrameId = window.requestAnimationFrame(updateElements)
      }
    }

    // Initial update
    updateElements()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // Scroll to explore section
  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // This function only opens the dialog, it doesn't submit anything
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsDialogOpen(true)
    }
  }

  // This function handles the actual submission with all details
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

  return (
    <PageLayout className="pt-0">
      {/* Hero Section - Full Height */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-0">
        <div className="w-full mx-auto flex flex-col md:flex-row items-center relative">
          {/* Text Content - Left Side */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 px-4 sm:px-6 md:pl-12 lg:pl-16 md:pr-0 z-10">
            {/* Logo and Brand */}
            <div className="mb-8 flex flex-col items-center md:items-start">
              <div className="mb-1 text-4xl sm:text-5xl md:text-6xl">
                <span className="text-gray-400">Meet </span>
                <GradientText>ANDI</GradientText>
              </div>
              <div className="mb-6 text-xl sm:text-2xl md:text-3xl font-light text-gray-400">by Zamora</div>
            </div>

            {/* Main Tagline */}
            <div className="mb-12">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 text-gray-400">
                <div className="mb-3">
                  The next generation of AI that <ActionWords />
                </div>
                <div className="flex flex-wrap items-center md:justify-start justify-center">
                  <span className="whitespace-normal">The ultimate</span>
                  <RotatingWords className="mx-1 sm:mx-3" />
                  <span className="whitespace-normal mt-6 md:mt-3 block md:inline w-full md:w-auto">
                    Empowering businesses to make smarter decisions.
                  </span>
                </div>
              </h1>
            </div>

            {/* Initial email form */}
            <form onSubmit={handleEmailSubmit} className="w-full max-w-md mb-16">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 flex-1 bg-gray-900/50 border border-gray-800 text-white placeholder:text-gray-400 backdrop-blur-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
                <Button
                  type="submit"
                  className="h-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6"
                  style={{
                    animation: "gradient 8s linear infinite",
                    backgroundSize: "300% 100%",
                    backgroundPosition: "left",
                  }}
                >
                  Get Early Access
                </Button>
              </div>
            </form>
          </div>

          {/* Dashboard Image - Right Side (positioned absolutely) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2">
            <div className="relative w-full max-w-lg md:max-w-none md:w-auto px-4 md:px-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ANDI%20by%20Zamora11-Photoroom-cgAFATavdXXslUkpuaJAj3M0HiIj8Y.png"
                alt="ANDI Dashboard Interface"
                className="w-full object-contain md:object-contain max-h-[70vh] md:max-h-[80vh] lg:max-h-[90vh]"
                style={{ aspectRatio: "auto" }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator - Three Arrows */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center">
          <button
            onClick={scrollToExplore}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll down to explore"
          >
            <div className="flex flex-col items-center">
              <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDelay: "0ms" }} />
              <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDelay: "150ms" }} />
              <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </button>
        </div>
      </section>

      {/* Content Sections with Scroll Fade Effect */}
      <div ref={sectionsRef} className="relative">
        {/* Security Section */}
        <section ref={exploreRef} className="relative z-10 py-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="scroll-fade text-3xl sm:text-4xl font-light mb-6 text-gray-400">
                We bring <GradientText>ANDI</GradientText> to your data, <br />
                not your data to us.
              </h2>
              <p className="scroll-fade text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                ANDI learns, reasons, and acts securely where your data lives. Simple. Safe. Effortless.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-8 mb-16 text-gray-300">
              <div className="scroll-fade flex items-center gap-3 bg-gray-900/30 backdrop-blur-sm p-4 rounded-lg border border-gray-800/50">
                <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span>No central data sharing</span>
              </div>
              <div className="scroll-fade flex items-center gap-3 bg-gray-900/30 backdrop-blur-sm p-4 rounded-lg border border-gray-800/50">
                <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span>No tech stack lock-in risks</span>
              </div>
              <div className="scroll-fade flex items-center gap-3 bg-gray-900/30 backdrop-blur-sm p-4 rounded-lg border border-gray-800/50">
                <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span>Your intelligence stays yours</span>
              </div>
            </div>

            <div className="scroll-fade text-3xl sm:text-4xl font-light leading-relaxed w-full mx-auto text-gray-400 text-center">
              The moment your business stops guessing...
              <br />
              and starts <GradientText>knowing</GradientText>.
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="relative z-10 py-24 px-4 sm:px-6 mb-12 md:mb-0">
          <div className="max-w-5xl mx-auto">
            <div className="scroll-fade fade-from-top transition-all duration-700 ease-in-out">
              <h2 className="text-3xl sm:text-4xl font-light mb-16 text-center">
                <GradientText>Roadmap</GradientText>
              </h2>

              <div className="w-full">
                <div className="relative mb-12">
                  <div className="relative flex justify-between items-start">
                    {Object.keys(versions).map((key, index) => (
                      <div
                        key={key}
                        className="flex-1 flex flex-col items-center cursor-pointer group"
                        onClick={() => setSelectedVersion(key)}
                      >
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full transition-all duration-300 ${
                              selectedVersion === key
                                ? "bg-purple-400 scale-125"
                                : "bg-gray-600 group-hover:bg-gray-400"
                            }`}
                          />
                          {selectedVersion === key && (
                            <motion.div
                              layoutId="active-timeline-dot"
                              className="absolute -inset-2 rounded-full bg-purple-500/30"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </div>
                        <div className="text-center mt-4">
                          <p
                            className={`font-medium transition-colors duration-300 ${
                              selectedVersion === key ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                            }`}
                          >
                            {versions[key as keyof typeof versions].title.split(" - ")[0]}
                          </p>
                          <p
                            className={`text-xs transition-colors duration-300 ${
                              selectedVersion === key ? "text-purple-300" : "text-gray-500 group-hover:text-gray-400"
                            }`}
                          >
                            {versions[key as keyof typeof versions].timeline}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-2.5 left-0 w-full h-0.5 bg-gray-700 -z-10" />
                </div>

                <div className="relative min-h-[600px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedVersion}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute w-full"
                    >
                      <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <Badge
                            className={`${
                              versions[selectedVersion as keyof typeof versions].color
                            } text-white px-4 py-2`}
                          >
                            {versions[selectedVersion as keyof typeof versions].status}
                          </Badge>
                          <span className="text-gray-400">
                            {versions[selectedVersion as keyof typeof versions].timeline}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-light text-gray-400 mb-2">
                          {versions[selectedVersion as keyof typeof versions].title}
                        </h3>
                        <p className="text-gray-300 text-lg">
                          {versions[selectedVersion as keyof typeof versions].subtitle}
                        </p>
                      </div>

                      {/* Features Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFeaturesByVersion(selectedVersion).map((feature, index) => (
                          <Card
                            key={index}
                            className="bg-gray-900/30 backdrop-blur-sm border-gray-800/50 hover:bg-gray-900/50 transition-all duration-300 h-full"
                          >
                            <CardHeader>
                              <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                                  {feature.icon}
                                </div>
                                <CardTitle className="text-gray-400 text-lg">{feature.title}</CardTitle>
                              </div>
                              <p className="text-gray-300 text-sm">{feature.description}</p>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                  Technical Requirements
                                </h4>
                                <ul className="space-y-1">
                                  {feature.specs.map((spec, specIndex) => (
                                    <li key={specIndex} className="flex items-center gap-2 text-sm text-gray-300">
                                      <CheckCircle className="h-3 w-3 text-purple-400 flex-shrink-0" />
                                      {spec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="relative z-10 py-24 md:py-48 px-4 sm:px-6 mt-24 md:mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="scroll-fade text-3xl sm:text-4xl font-light mb-6">
                Calculate Your <GradientText>ROI</GradientText> with ANDI
              </h2>
              <p className="scroll-fade text-lg text-gray-300 max-w-3xl mx-auto">
                See exactly how ANDI transforms your decision-making costs into measurable savings. Every calculation is
                transparent and based on real business metrics.
              </p>
            </div>

            <div className="scroll-fade fade-early bg-gray-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <div className="space-y-12">
                <div className="space-y-12">
                  {" "}
                  {/* This div wraps both the input controls and results */}
                  {/* Input Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6 md:gap-y-8">
                    {/* Column 1 */}
                    <div className="space-y-8">
                      <h3 className="text-2xl font-light text-gray-300 mb-6 col-span-full">
                        Tell us about your business
                      </h3>

                      <div>
                        <p className="text-sm text-gray-400 mb-2">
                          Your company size helps us estimate platform costs and scaling benefits
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0">
                          <label className="text-gray-300 font-medium">Total Employees</label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">people</span>
                            <input
                              type="text"
                              value={employeesInput}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, "")
                                setEmployeesInput(value)
                              }}
                              onBlur={(e) => {
                                const value = parseFormattedNumber(e.target.value)
                                const clampedValue = Math.max(10, Math.min(5000, value || 10))
                                setEmployees(clampedValue)
                                setEmployeesInput(formatNumber(clampedValue))
                              }}
                              className="w-full sm:w-24 px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-purple-400 font-bold text-center sm:text-right focus:ring-1 focus:ring-purple-500 focus:border-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="5000"
                          step="10"
                          value={employees}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            setEmployees(value)
                            setEmployeesInput(formatNumber(value))
                          }}
                          className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((employees - 10) / (5000 - 10)) * 100}%, #374151 ${((employees - 10) / (5000 - 10)) * 100}%, #374151 100%)`,
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>10</span>
                          <span>5,000+</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 mb-2">
                          People who regularly analyze data, create reports, or make data-driven decisions
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0">
                          <label className="text-gray-300 font-medium">Decision Makers & Analysts</label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">people</span>
                            <input
                              type="text"
                              value={decisionMakersInput}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, "")
                                setDecisionMakersInput(value)
                              }}
                              onBlur={(e) => {
                                const value = parseFormattedNumber(e.target.value)
                                const maxValue = Math.min(employees, 200)
                                const clampedValue = Math.max(1, Math.min(maxValue, value || 1))
                                setDecisionMakers(clampedValue)
                                setDecisionMakersInput(formatNumber(clampedValue))
                              }}
                              className="w-full sm:w-24 px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-purple-400 font-bold text-center sm:text-right focus:ring-1 focus:ring-purple-500 focus:border-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max={Math.min(employees, 200)}
                          step="1"
                          value={decisionMakers}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            setDecisionMakers(value)
                            setDecisionMakersInput(formatNumber(value))
                          }}
                          className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((decisionMakers - 1) / (Math.min(employees, 200) - 1)) * 100}%, #374151 ${((decisionMakers - 1) / (Math.min(employees, 200) - 1)) * 100}%, #374151 100%)`,
                          }}
                        />
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 mb-2 pt-[22px]">
                          <strong>Hourly rate: ${Math.round(hourlyRate)}</strong> (based on 2,080 working hours/year)
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0 pt-[18px]">
                          <label className="text-gray-300 font-medium">Average Decision Maker Salary</label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">$</span>
                            <input
                              type="text"
                              value={avgSalaryInput}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, "")
                                setAvgSalaryInput(value ? formatNumber(Number.parseInt(value)) : "")
                              }}
                              onBlur={(e) => {
                                const value = parseFormattedNumber(e.target.value)
                                const clampedValue = Math.max(50000, Math.min(250000, value || 50000))
                                setAvgSalary(clampedValue)
                                setAvgSalaryInput(formatNumber(clampedValue))
                              }}
                              className="w-full sm:w-24 px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-purple-400 font-bold text-center sm:text-right focus:ring-1 focus:ring-purple-500 focus:border-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min="50000"
                          max="250000"
                          step="5000"
                          value={avgSalary}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            setAvgSalary(value)
                            setAvgSalaryInput(formatNumber(value))
                          }}
                          className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((avgSalary - 50000) / (250000 - 50000)) * 100}%, #374151 ${((avgSalary - 50000) / (250000 - 50000)) * 100}%, #374151 100%)`,
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>$50K</span>
                          <span>$250K+</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-8">
                      <div className="pt-16 pb-0">
                        <p className="text-sm text-gray-400 mb-2">
                          Time to gather data, analyze, create reports, and make decisions.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0">
                          <label className="text-gray-300 font-medium">Hours Spent Per Strategic Decision</label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">hours</span>
                            <input
                              type="text"
                              value={decisionTimeInput}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, "")
                                setDecisionTimeInput(value)
                              }}
                              onBlur={(e) => {
                                const value = parseFormattedNumber(e.target.value)
                                const clampedValue = Math.max(1, Math.min(40, value || 1))
                                setDecisionTime(clampedValue)
                                setDecisionTimeInput(formatNumber(clampedValue))
                              }}
                              className="w-full sm:w-24 px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-purple-400 font-bold text-center sm:text-right focus:ring-1 focus:ring-purple-500 focus:border-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="40"
                          step="1"
                          value={decisionTime}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            setDecisionTime(value)
                            setDecisionTimeInput(formatNumber(value))
                          }}
                          className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((decisionTime - 1) / (40 - 1)) * 100}%, #374151 ${((decisionTime - 1) / (40 - 1)) * 100}%, #374151 100%)`,
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>1 hour</span>
                          <span>40+ hours</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 mb-2">
                          The frequency of data-driven decisions across your team.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0">
                          <label className="text-gray-300 font-medium pt-[23px] pb-[3px]">
                            Average decisions made per week
                          </label>
                          <div className="flex items-center gap-2 pt-5 pb-0">
                            <span className="text-gray-400 text-sm">decisions</span>
                            <input
                              type="text"
                              value={decisionsPerWeekInput}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, "")
                                setDecisionsPerWeekInput(value)
                              }}
                              onBlur={(e) => {
                                const value = parseFormattedNumber(e.target.value)
                                const clampedValue = Math.max(1, Math.min(50, value || 1))
                                setDecisionsPerWeek(clampedValue)
                                setDecisionsPerWeekInput(formatNumber(clampedValue))
                              }}
                              className="w-full sm:w-24 px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-purple-400 font-bold text-center sm:text-right focus:ring-1 focus:ring-purple-500 focus:border-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="50"
                          step="1"
                          value={decisionsPerWeek}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            setDecisionsPerWeek(value)
                            setDecisionsPerWeekInput(formatNumber(value))
                          }}
                          className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((decisionsPerWeek - 1) / (50 - 1)) * 100}%, #374151 ${((decisionsPerWeek - 1) / (50 - 1)) * 100}%, #374151 100%)`,
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>1</span>
                          <span>50</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 pt-[-10px] mb-2">
                          Include BI tools, process automation platforms, data connectors, workflow tools, reporting
                          software, and integration costs
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0">
                          <label className="text-gray-300 font-medium">
                            Yearly Data &amp; Process Automation Spend
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">$</span>
                            <input
                              type="text"
                              value={currentToolCostInput}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, "")
                                setCurrentToolCostInput(value ? formatNumber(Number.parseInt(value)) : "")
                              }}
                              onBlur={(e) => {
                                const value = parseFormattedNumber(e.target.value)
                                const clampedValue = Math.max(10000, Math.min(1000000, value || 10000))
                                setCurrentToolCost(clampedValue)
                                setCurrentToolCostInput(formatNumber(clampedValue))
                              }}
                              className="w-full sm:w-24 px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-purple-400 font-bold text-center sm:text-right focus:ring-1 focus:ring-purple-500 focus:border-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min="10000"
                          max="1000000"
                          step="10000"
                          value={currentToolCost}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            setCurrentToolCost(value)
                            setCurrentToolCostInput(formatNumber(value))
                          }}
                          className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((currentToolCost - 10000) / (1000000 - 10000)) * 100}%, #374151 ${((currentToolCost - 10000) / (1000000 - 10000)) * 100}%, #374151 100%)`,
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>$10K</span>
                          <span>$1M+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Results Display */}
                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-light text-gray-300 mb-8 text-center">
                      Your Potential Annual Savings
                    </h3>

                    <div className="space-y-6">
                      {/* Calculation Breakdown */}
                      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                        <h4 className="text-lg font-semibold text-gray-300 mb-4">How We Calculate Your Savings</h4>
                        <div className="space-y-3 text-sm text-gray-400">
                          <div className="flex justify-between">
                            <span>Decision makers:</span>
                            <span className="text-purple-400">{decisionMakers} people</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Decisions per week:</span>
                            <span className="text-purple-400">{decisionsPerWeek} decisions</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hours per decision:</span>
                            <span className="text-purple-400">{decisionTime} hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Weekly time spent:</span>
                            <span className="text-purple-400">
                              {(decisionsPerWeek * decisionTime * decisionMakers).toLocaleString()} hours
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annual time spent:</span>
                            <span className="text-purple-400">
                              {Math.round((decisionsPerWeek * decisionTime * decisionMakers * 50) / 1000)}K hours
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-gray-600 pt-2">
                            <span>Current annual cost:</span>
                            <span className="text-red-400">
                              {(() => {
                                const annualCost = Math.round(
                                  (decisionsPerWeek * decisionTime * decisionMakers * 50 * hourlyRate) / 1000,
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
                            <span className="text-gray-300">Time Efficiency Savings</span>
                          </div>
                          <span className="text-2xl font-bold text-blue-400">
                            ${Math.round(annualCostSaved).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          ANDI reduces decision time by 70% through instant insights and automated analysis
                        </p>
                        <div className="text-xs text-gray-500">
                          <div>• Save {Math.round(annualTimeSaved).toLocaleString()} hours annually</div>
                          <div>
                            • From {Math.round((decisionsPerWeek * decisionTime * decisionMakers * 50) / 1000)}K hours
                            to {Math.round((decisionsPerWeek * decisionTime * decisionMakers * 50 * 0.3) / 1000)}K hours
                          </div>
                          <div>• Cost per hour: ${Math.round(hourlyRate)}</div>
                        </div>
                      </div>

                      {/* Tool Consolidation */}
                      <div className="bg-gray-800/50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                            <span className="text-gray-300">Tool Consolidation Savings</span>
                          </div>
                          <span className="text-2xl font-bold text-purple-400">
                            ${Math.round(toolConsolidationSavings).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          ANDI replaces multiple disconnected tools with a unified intelligent platform
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
                            <span className="text-gray-300">Faster Decision Value</span>
                          </div>
                          <span className="text-2xl font-bold text-pink-400">
                            ${Math.round(opportunityCostSavings).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Revenue impact from making better decisions faster</p>
                        <div className="text-xs text-gray-500">
                          <div>• Faster time-to-market for initiatives</div>
                          <div>• Quicker response to market changes</div>
                          <div>• Conservative 1.5x multiplier on time savings</div>
                        </div>
                      </div>

                      {/* Total Savings */}
                      <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 rounded-lg p-6 border border-emerald-500/30">
                        <div className="text-center mb-6">
                          <span className="text-xl font-semibold text-gray-200">Total Annual Value Potential</span>
                          <div className="text-4xl font-bold text-emerald-400 mt-2">
                            ${Math.round(totalAnnualSavings).toLocaleString()}
                          </div>
                          <p className="text-sm text-gray-400 mt-2">in measurable business savings</p>
                        </div>

                        <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                          <div className="text-center mb-4">
                            <div className="text-lg font-semibold text-purple-400 mb-2">Recommended Plan</div>
                            <div className="text-2xl font-bold text-white">{suggestedPlan}</div>
                            <p className="text-sm text-gray-400 mt-1">{planDescription}</p>
                          </div>
                          <div className="space-y-2 ml-0 mr-0 text-center">
                            <h5 className="text-sm font-semibold text-gray-300">Key Features:</h5>
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

                {/* Bottom Insights - REMOVED as they are now detailed in the main calculator */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0"></div>

                {/* Disclaimer */}
                <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-800 pt-4 flex flex-col items-center">
                  <div className="flex items-center font-semibold mb-2">
                    <Info className="w-4 h-4 mr-2 text-gray-400" />
                    <p>Disclaimer</p>
                  </div>
                  <p className="max-w-3xl">
                    This calculator provides an estimate of potential savings and is intended for illustrative purposes
                    only. It is not meant to replace human analysts but to empower them by automating routine tasks. The
                    hours saved can be reassigned to higher-value activities such as strategic analysis, innovation, and
                    complex problem-solving, driving further business growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative z-10 py-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="scroll-fade fade-at-bottom text-3xl sm:text-4xl font-light mb-6 text-gray-400">
              Ready to transform your business with <GradientText>andi</GradientText>?
            </h2>
            <p className="scroll-fade fade-at-bottom text-lg text-gray-400 mb-8">
              Join our early access program and be among the first to experience the future of business intelligence.
            </p>

            <form onSubmit={handleEmailSubmit} className="scroll-fade fade-at-bottom mx-auto w-full max-w-md px-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 flex-1 bg-gray-900/50 border border-gray-800 text-white placeholder:text-gray-400 backdrop-blur-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
                <Button
                  type="submit"
                  className="h-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6"
                  style={{
                    animation: "gradient 8s linear infinite",
                    backgroundSize: "300% 100%",
                    backgroundPosition: "left",
                  }}
                >
                  Get Early Access
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Hidden form for direct submission fallback - only used when dialog form is submitted */}
      <form
        id="directSubmitForm"
        ref={formRef}
        method="POST"
        action="https://script.google.com/macros/s/AKfycbyUZ6-YLtr13J4Gqmp5JoqmUssQifIIGZrb9jdeVUgm_Ujk4hKATmKpvQ_07O3AyWST/exec"
        target="hidden-iframe"
        style={{ display: "none" }}
      >
        <input type="email" name="email" id="direct-email" />
        <input type="text" name="fullName" id="direct-fullName" />
        <input type="text" name="company" id="direct-company" />
        <input type="text" name="department" id="direct-department" />
        <input type="submit" value="Submit" />
      </form>
      <iframe name="hidden-iframe" style={{ display: "none" }}></iframe>

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

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white text-center">
          <div className="py-6 flex flex-col items-center">
            <div className="mb-4 text-2xl sm:text-3xl md:text-4xl">
              <GradientText>Welcome to the future!</GradientText>
            </div>
            <p className="text-lg text-gray-400 mb-6">
              The next era of AI is coming... and you'll be among the first to experience it!
            </p>
            <Button
              onClick={() => setIsSuccessDialogOpen(false)}
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-8"
              style={{
                animation: "gradient 8s linear infinite",
                backgroundSize: "300% 100%",
                backgroundPosition: "left",
              }}
            >
              OK
            </Button>
          </div>
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
    </PageLayout>
  )
}
