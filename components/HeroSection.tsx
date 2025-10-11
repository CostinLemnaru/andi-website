"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import GradientText from "./gradient-text"
import RotatingWords from "./rotating-words"
import ActionWords from "./action-words"
import { REQUEST_ACCESS_EVENT, type RequestAccessEventDetail } from "@/lib/request-access-events"

export default function HeroSection({ data }: { data: any }) {
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

  const [implementationScope, setImplementationScope] = useState<"company-wide" | "team">("team")
  const [companySize, setCompanySize] = useState(100)
  const [teamSize, setTeamSize] = useState(5)
  const [numberOfTeams, setNumberOfTeams] = useState(1)
  const [avgAnalystSalary, setAvgAnalystSalary] = useState(85000)
  const [hoursPerWeek, setHoursPerWeek] = useState(20)
  const [currentToolCost, setCurrentToolCost] = useState(30000)

  // Temporary input values for display while typing
  const [companySizeInput, setCompanySizeInput] = useState("100")
  const [teamSizeInput, setTeamSizeInput] = useState("5")
  const [numberOfTeamsInput, setNumberOfTeamsInput] = useState("1")
  const [avgAnalystSalaryInput, setAvgAnalystSalaryInput] = useState("85,000")
  const [hoursPerWeekInput, setHoursPerWeekInput] = useState("20")
  const [currentToolCostInput, setCurrentToolCostInput] = useState("30,000")

  const [employees, setEmployees] = useState(100)
  const [decisionMakers, setDecisionMakers] = useState(1)
  const [avgSalary, setAvgSalary] = useState(100000)
  // const [currentToolCost, setCurrentToolCost] = useState(30000)
  const [decisionTime, setDecisionTime] = useState(1)
  const [decisionsPerWeek, setDecisionsPerWeek] = useState(1)

  // Temporary input values for display while typing
  const [employeesInput, setEmployeesInput] = useState("100")
  const [decisionMakersInput, setDecisionMakersInput] = useState("1")
  const [avgSalaryInput, setAvgSalaryInput] = useState("100,000")
  // const [currentToolCostInput, setCurrentToolCostInput] = useState("30,000")
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

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    message: "",
  })
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [isContactSuccessDialogOpen, setIsContactSuccessDialogOpen] = useState(false)

  const [useCase, setUseCase] = useState("")
  const [keepUpdated, setKeepUpdated] = useState(true)

  const [emailErrors, setEmailErrors] = useState<Record<string, string>>({})
  useEffect(() => {
    if (typeof window === "undefined") return
    const handleRequestAccess = (event: Event) => {
      const customEvent = event as CustomEvent<RequestAccessEventDetail>
      if (customEvent.detail?.handled) return
      if (customEvent.detail) customEvent.detail.handled = true
      setIsDialogOpen(true)
      setIsSuccessDialogOpen(false)
      setIsContactDialogOpen(false)
      setError("")
      setEmailErrors((prev) => ({ ...prev, bottom: "", earlyAccess: "" }))
    }
    window.addEventListener(REQUEST_ACCESS_EVENT, handleRequestAccess as EventListener)
    return () => window.removeEventListener(REQUEST_ACCESS_EVENT, handleRequestAccess as EventListener)
  }, [])

  const validateBusinessEmail = (email: string) => {
    const personalDomains = [
      // Gmail variants
      "gmail.com",
      "gmail.co.uk",
      "gmail.ca",
      "gmail.com.au",
      "gmail.de",
      "gmail.fr",
      "gmail.it",
      "gmail.es",
      // Yahoo variants
      "yahoo.com",
      "yahoo.co.uk",
      "yahoo.ca",
      "yahoo.com.au",
      "yahoo.de",
      "yahoo.fr",
      "yahoo.it",
      "yahoo.es",
      // AOL variants
      "aol.com",
      "aol.co.uk",
      "aol.ca",
      "aol.com.au",
      "aol.de",
      "aol.fr",
      // Other common personal email providers
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
    return !personalDomains.includes(domain)
  }

  const handleEmailBlur = (email: string, fieldName: string) => {
    if (email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailErrors((prev) => ({ ...prev, [fieldName]: "Please enter a valid email" }))
      } else if (!validateBusinessEmail(email)) {
        setEmailErrors((prev) => ({ ...prev, [fieldName]: "Please use a valid business email address" }))
      } else {
        setEmailErrors((prev) => ({ ...prev, [fieldName]: "" }))
      }
    }
  }

  const clearEmailError = (fieldName: string) => {
    if (emailErrors[fieldName]) {
      setEmailErrors((prev) => ({ ...prev, [fieldName]: "" }))
    }
  }

  const [earlyAccessEmail, setEarlyAccessEmail] = useState("")


  const { Title, Description, CtaText, Image } = data

  const handleEarlyAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateBusinessEmail(earlyAccessEmail)) {
      setEmailErrors((prev) => ({ ...prev, earlyAccess: "Please use a valid business email address" }))
      return
    }

    setEmail(earlyAccessEmail)
    setIsDialogOpen(true)
  }

  // This function only opens the dialog, it doesn't submit anything
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateBusinessEmail(email)) {
      setEmailErrors((prev) => ({ ...prev, bottom: "Please use a valid business email address" }))
      return
    }

    if (email) {
      setIsDialogOpen(true)
    }
  }

  const getCookie = (name: string) => {
    if (typeof document === "undefined") return ""
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
    return match ? decodeURIComponent(match[2]) : ""
  }

  const submitToHubSpot = async () => {
    const hutk = getCookie("hubspotutk")
    const payload = {
      fields: [
        { name: "email", value: email },
        { name: "firstname", value: firstName },
        { name: "lastname", value: lastName },
        { name: "company", value: company },
        { name: "use_case", value: useCase || "" },
        { name: "role_department", value: department },
        { name: "LEGAL_CONSENT.subscription_type_1062787159", value: keepUpdated ? "true" : "false" },
        { name: "LEGAL_CONSENT.processing", value: "true" },
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "https://www.zamora.ai",
        pageName: typeof document !== "undefined" ? document.title : "Landing",
        hutk: hutk || undefined,
      },
    }

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // 1) trimite către HubSpot (cererea reală)
      await submitToHubSpot()

      // 2) opțional: și fallbackul tău spre Google Sheets
      // await fallbackSubmit()

      // succes UI
      setIsDialogOpen(false)
      setIsSuccessDialogOpen(true)

      // reset câmpuri
      setEmail("")
      setFirstName("")
      setLastName("")
      setCompany("")
      setDepartment("")
      setUseCase("")
      setKeepUpdated(true)
    } catch (err: any) {
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
        const directUseCaseInput = document.getElementById("direct-useCase") as HTMLInputElement
        const directKeepUpdatedInput = document.getElementById("direct-keepUpdated") as HTMLInputElement

        if (directEmailInput) directEmailInput.value = email
        if (directNameInput) directNameInput.value = `${firstName} ${lastName}`
        if (directCompanyInput) directCompanyInput.value = company
        if (directDepartmentInput) directDepartmentInput.value = department
        if (directUseCaseInput) directUseCaseInput.value = useCase
        if (directKeepUpdatedInput) directKeepUpdatedInput.checked = keepUpdated

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

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const scrollToExplore = () => {
    const el = document.getElementById("explore")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  // fallback la alt text și url
  const imgUrl = Image?.url ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Image.url}` : ""
  const imgAlt = Image?.alternativeText ?? Title?.highlight ?? "Hero image"

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-0">
      <div className="w-full mx-auto flex flex-col md:flex-row items-center relative">
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 px-4 sm:px-6 md:pl-12 lg:pl-16 md:pr-0 z-10">
          <div className="mb-8 flex flex-col items-center md:items-start">
            <div className="mb-1 text-4xl sm:text-5xl md:text-6xl">
              <span className="text-gray-400">{Title?.prefix} </span>
              <GradientText>{Title?.highlight}</GradientText>
            </div>
            <div className="mb-6 text-xl sm:text-2xl md:text-3xl font-light text-gray-400">
              {Title?.subtitle}
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 text-gray-400">
              <div className="mb-3">
                {Description?.tagline_plain}{" "}
                <ActionWords words={Description?.action_words ?? []} />
              </div>
              <div className="flex flex-wrap items-center md:justify-start justify-center">
                <span className="whitespace-normal">The ultimate</span>
                <RotatingWords words={Description?.rotating_words ?? []} className="mx-1 sm:mx-3" />
                <span className="whitespace-normal mt-6 md:mt-3 block md:inline w-full md:w-auto">
                  {Description?.tagline_suffix}
                </span>
              </div>
            </h1>
          </div>

          {/* Email form */}
          <form onSubmit={handleEarlyAccessSubmit} className="w-full max-w-md mb-16 relative">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                value={earlyAccessEmail}
                onChange={(e) => {
                  setEarlyAccessEmail(e.target.value)
                  clearEmailError("earlyAccess")
                }}
                onBlur={(e) => handleEmailBlur(e.target.value, "earlyAccess")}
                placeholder="your.email@company.com"
                required
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />

              {emailErrors.earlyAccess && (
                <p className="text-red-400 text-sm mt-1 absolute top-full left-0">{emailErrors.earlyAccess}</p>
              )}
              <Button
                type="submit"
                className="h-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6 rounded-r-lg"
                style={{
                  animation: "gradient 8s linear infinite",
                  backgroundSize: "300% 100%",
                  backgroundPosition: "left",
                }}
              >
                {CtaText ?? "Get Early Access"}
              </Button>
            </div>
          </form>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2">
          <div className="relative w-full max-w-lg md:max-w-none md:w-auto px-4 md:px-0">
            {imgUrl && (
              <img
                src={imgUrl}
                alt={imgAlt}
                className="w-full object-contain max-h-[70vh] md:max-h-[80vh] lg:max-h-[90vh]"
              />
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center">
        <button
          onClick={scrollToExplore}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          aria-label="Scroll down to explore"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDelay: "0ms" }} />
          <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDelay: "150ms" }} />
          <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDelay: "300ms" }} />
        </button>
      </div>

      {/* Dialog with additional details form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white">
          <DialogHeader>
            <DialogTitle>Thanks for joining! Let’s get you set up for early access</DialogTitle>
            <DialogDescription className="text-gray-400">
              You’re almost in! Share a few details so we can personalize your POC experience at launch.
            </DialogDescription>
          </DialogHeader>
          {/* This form submits to Google Sheets when submitted */}
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
            <div className="relative">
              <input
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearEmailError("dialog")
                }}
                onBlur={(e) => handleEmailBlur(e.target.value, "dialog")}
                className="w-full p-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {emailErrors.dialog && <p className="text-red-400 text-sm mt-1">{emailErrors.dialog}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              required
            />
            <input
              type="text"
              placeholder="Role/Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              required
            />
            <div className="space-y-1">
              <Label htmlFor="useCase" className="text-gray-400">
                Use Case
              </Label>
              <textarea
                id="useCase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                placeholder="What's the #1 challenge you'd like us to help with?"
                rows={3}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md resize-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="keepUpdated"
                checked={keepUpdated}
                onChange={(e) => setKeepUpdated(e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-gray-900/50 border-gray-800 rounded focus:ring-purple-500 focus:ring-2"
              />
              <Label htmlFor="keepUpdated" className="text-gray-400 text-sm">
                Keep me updated with launch news and resources
              </Label>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end">
              <Button
                // type="Submit"
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
              <DialogTitle>
                <GradientText>Welcome to the future!</GradientText>
              </DialogTitle>
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
    </section>
  )
}
