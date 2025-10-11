"use client"

import { useEffect, useMemo, useState } from "react"
import { CheckCircle, Rocket } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AnimatedBackground from "@/components/animated-background"

type Props = {
  data: any
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
  "yahoo.it",
  "yahoo.es",
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

const validateBusinessEmail = (value: string) => {
  const okFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  if (!okFormat) return { ok: false, msg: "Please enter a valid email" }
  const domain = value.split("@")[1]?.toLowerCase()
  if (domain && personalDomains.includes(domain)) {
    return { ok: false, msg: "Please use a valid business email address" }
  }
  return { ok: true, msg: "" }
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

export default function AndiLoginComponent({ data }: Props) {
  const router = useRouter()

  // Waitlist dialog state
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const [waitlistFirstName, setWaitlistFirstName] = useState("")
  const [waitlistLastName, setWaitlistLastName] = useState("")
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [waitlistCompany, setWaitlistCompany] = useState("")
  const [waitlistDepartment, setWaitlistDepartment] = useState("")
  const [waitlistUseCase, setWaitlistUseCase] = useState("")
  const [waitlistEmailError, setWaitlistEmailError] = useState("")

  // Feature dialog state
  const [isFeatureOpen, setIsFeatureOpen] = useState(false)
  const [featureSubmitted, setFeatureSubmitted] = useState(false)
  const [featureFirstName, setFeatureFirstName] = useState("")
  const [featureLastName, setFeatureLastName] = useState("")
  const [featureEmail, setFeatureEmail] = useState("")
  const [featureCompany, setFeatureCompany] = useState("")
  const [featureRole, setFeatureRole] = useState("")
  const [featureRequest, setFeatureRequest] = useState("")
  const [featurePriority, setFeaturePriority] = useState("")
  const [featureUseCase, setFeatureUseCase] = useState("")
  const [featureEmailError, setFeatureEmailError] = useState("")

  useEffect(() => {
    if (!isWaitlistOpen) {
      setWaitlistEmailError("")
    }
  }, [isWaitlistOpen])

  useEffect(() => {
    if (!isFeatureOpen) {
      setFeatureEmailError("")
    }
  }, [isFeatureOpen])

  const resetWaitlist = useMemo(
    () => () => {
      setWaitlistFirstName("")
      setWaitlistLastName("")
      setWaitlistEmail("")
      setWaitlistCompany("")
      setWaitlistDepartment("")
      setWaitlistUseCase("")
      setWaitlistEmailError("")
      setWaitlistSubmitted(false)
    },
    [],
  )

  const resetFeature = useMemo(
    () => () => {
      setFeatureFirstName("")
      setFeatureLastName("")
      setFeatureEmail("")
      setFeatureCompany("")
      setFeatureRole("")
      setFeatureRequest("")
      setFeaturePriority("")
      setFeatureUseCase("")
      setFeatureEmailError("")
      setFeatureSubmitted(false)
    },
    [],
  )

  const handleWaitlistSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const validation = validateBusinessEmail(waitlistEmail)
    if (!validation.ok) {
      setWaitlistEmailError(validation.msg)
      return
    }

    try {
      const hutk = getCookie("hubspotutk")
      const payload = {
        formGuid: "ccf23d19-c4e5-46cd-a928-d8b5a7d607d3",
        fields: [
          { name: "email", value: waitlistEmail },
          { name: "firstname", value: waitlistFirstName },
          { name: "lastname", value: waitlistLastName },
          { name: "company", value: waitlistCompany },
          { name: "role_department", value: waitlistDepartment },
          { name: "use_case", value: waitlistUseCase },
          { name: "LEGAL_CONSENT.subscription_type_1062787159", value: "true" },
          { name: "LEGAL_CONSENT.processing", value: "true" },
        ],
        context: {
          pageUri: typeof window !== "undefined" ? window.location.href : "https://www.zamora.ai/andi-login",
          pageName: typeof document !== "undefined" ? document.title : "ANDI Login",
          hutk: hutk || undefined,
        },
      }

      await submitToHubSpot(payload)
      setWaitlistSubmitted(true)
    } catch (error) {
      console.error("Waitlist submission error:", error)
      setWaitlistEmailError("Failed to submit. Please try again.")
    }
  }

  const handleFeatureSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const validation = validateBusinessEmail(featureEmail)
    if (!validation.ok) {
      setFeatureEmailError(validation.msg)
      return
    }

    try {
      const hutk = getCookie("hubspotutk")
      const payload = {
        formGuid: "f1cdff9a-10ae-45a5-9061-77b0761dc55d",
        fields: [
          { name: "firstname", value: featureFirstName },
          { name: "lastname", value: featureLastName },
          { name: "email", value: featureEmail },
          { name: "company", value: featureCompany },
          { name: "role_department", value: featureRole },
          { name: "message", value: featureRequest },
          { name: "priority_level", value: featurePriority },
          { name: "use_case", value: featureUseCase },
          { name: "LEGAL_CONSENT.subscription_type_1062787159", value: "true" },
          { name: "LEGAL_CONSENT.processing", value: "true" },
        ],
        context: {
          pageUri: typeof window !== "undefined" ? window.location.href : "https://www.zamora.ai/andi-login",
          pageName: typeof document !== "undefined" ? document.title : "ANDI Login",
          hutk: hutk || undefined,
        },
      }

      await submitToHubSpot(payload)
      setFeatureSubmitted(true)
    } catch (error) {
      console.error("Feature submission error:", error)
      setFeatureEmailError("Failed to submit. Please try again.")
    }
  }

  const handleWaitlistOpenChange = (value: boolean) => {
    setIsWaitlistOpen(value)
    if (!value) resetWaitlist()
  }

  const handleFeatureOpenChange = (value: boolean) => {
    setIsFeatureOpen(value)
    if (!value) resetFeature()
  }

  const heading = data?.Title ?? "ANDI is Launching Soon!"
  const subtitle =
    data?.Description ??
    "We're putting the finishing touches on ANDI, your Strategic AI-Guidance & Execution platform. Get ready to transform how you analyze data, make decisions, and act across your business."
  const waitlistCta = data?.WaitlistCta ?? "Join the Waitlist"
  const backCta = data?.BackToHomeCta ?? "← Back to Home"

  const waitlistDialogTitle = data?.WaitlistDialogTitle ?? "Join Early Access"
  const waitlistDialogSuccessTitle = data?.WaitlistDialogSuccessTitle ?? "Welcome to the Waitlist!"
  const waitlistDialogSuccessMessage =
    data?.WaitlistDialogSuccessMessage ??
    "You're all set! We'll send you updates about ANDI's launch and exclusive early access opportunities."

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white" style={{ marginTop: "-65px" }}>
      <AnimatedBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-purple-500/40 bg-purple-500/10">
            <Rocket className="h-8 w-8 text-purple-300" />
          </div>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">{heading}</span>
          </h1>
          <p className="mb-10 text-lg text-gray-300 md:text-xl">{subtitle}</p>

          <div className="mb-10 flex flex-col items-center justify-center">
            <Button
              onClick={() => setIsWaitlistOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-purple-500"
            >
              <Rocket className="h-5 w-5" />
              {waitlistCta}
            </Button>
          </div>

          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-white"
          >
            {backCta}
          </Button>
        </div>
      </div>

      <Dialog open={isWaitlistOpen} onOpenChange={handleWaitlistOpenChange}>
        <DialogContent className="sm:max-w-md border border-gray-800/50 bg-[#0c0c14]/90 text-white backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {waitlistSubmitted ? waitlistDialogSuccessTitle : waitlistDialogTitle}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              {waitlistSubmitted
                ? "Thank you for joining! We'll notify you when ANDI launches."
                : "Be among the first to experience ANDI's powerful analytics capabilities."}
            </DialogDescription>
          </DialogHeader>

          {waitlistSubmitted ? (
            <div className="py-6 text-center">
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
              <p className="mb-6 text-gray-300">{waitlistDialogSuccessMessage}</p>
              <Button
                onClick={() => handleWaitlistOpenChange(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all hover:from-blue-500 hover:to-purple-500"
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="waitlist-first-name" className="text-gray-400">
                    First Name
                  </Label>
                  <Input
                    id="waitlist-first-name"
                    value={waitlistFirstName}
                    onChange={(e) => setWaitlistFirstName(e.target.value)}
                    className="border border-gray-800 bg-gray-900/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="waitlist-last-name" className="text-gray-400">
                    Last Name
                  </Label>
                  <Input
                    id="waitlist-last-name"
                    value={waitlistLastName}
                    onChange={(e) => setWaitlistLastName(e.target.value)}
                    className="border border-gray-800 bg-gray-900/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="waitlist-email" className="text-gray-400">
                  Business Email
                </Label>
                <Input
                  id="waitlist-email"
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => {
                    setWaitlistEmail(e.target.value)
                    setWaitlistEmailError("")
                  }}
                  onBlur={(e) => {
                    const validation = validateBusinessEmail(e.target.value)
                    if (!validation.ok) setWaitlistEmailError(validation.msg)
                  }}
                  className="border border-gray-800 bg-gray-900/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
                {waitlistEmailError && <p className="mt-1 text-sm text-red-400">{waitlistEmailError}</p>}
              </div>

              <div>
                <Label htmlFor="waitlist-company" className="text-gray-400">
                  Company
                </Label>
                <Input
                  id="waitlist-company"
                  value={waitlistCompany}
                  onChange={(e) => setWaitlistCompany(e.target.value)}
                  className="border border-gray-800 bg-gray-900/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="waitlist-department" className="text-gray-400">
                  Department
                </Label>
                <Input
                  id="waitlist-department"
                  value={waitlistDepartment}
                  onChange={(e) => setWaitlistDepartment(e.target.value)}
                  className="border border-gray-800 bg-gray-900/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="waitlist-use-case" className="text-gray-400">
                  How do you plan to use ANDI?
                </Label>
                <Textarea
                  id="waitlist-use-case"
                  value={waitlistUseCase}
                  onChange={(e) => setWaitlistUseCase(e.target.value)}
                  rows={3}
                  className="border border-gray-800 bg-gray-900/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <Button
                type="submit"
                disabled={!!waitlistEmailError}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-colors hover:from-blue-500 hover:to-purple-500 disabled:opacity-60"
              >
                {waitlistCta}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
