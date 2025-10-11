"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
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

export default function RequestAccessModal({ open, onOpenChange }: Props) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [useCase, setUseCase] = useState("")
  const [company, setCompany] = useState("")
  const [department, setDepartment] = useState("")
  const [keepUpdated, setKeepUpdated] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    setError("")
    setEmailError("")
  }, [open])

  const resetForm = useMemo(
    () => () => {
      setEmail("")
      setFirstName("")
      setLastName("")
      setUseCase("")
      setCompany("")
      setDepartment("")
      setKeepUpdated(true)
      setError("")
      setEmailError("")
      setIsSubmitting(false)
    },
    [],
  )

  const submitToHubSpot = async () => {
    const hutk = getCookie("hubspotutk")

    const payload = {
      fields: [
        { name: "email", value: email },
        { name: "firstname", value: firstName },
        { name: "lastname", value: lastName },
        { name: "company", value: company },
        { name: "use_case", value: useCase },
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    const validation = validateBusinessEmail(email)
    if (!validation.ok) {
      setEmailError(validation.msg)
      setIsSubmitting(false)
      return
    }

    try {
      await submitToHubSpot()
      // optional fallback to Sheets
      // await submitToGoogleSheets({ email, fullName: `${firstName} ${lastName}`, company, department })
      resetForm()
      onOpenChange(false)
      setIsSuccessOpen(true)
    } catch (err) {
      console.error("Request access submit error:", err)
      setError("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      resetForm()
    }
    onOpenChange(value)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md border border-gray-800/50 bg-[#0c0c14]/90 text-white backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Complete your registration</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please provide additional information to get free POCs at launch.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4" data-hs-ignore="true">
            <div className="space-y-1">
              <Label htmlFor="request-access-email" className="text-gray-400">
                Business Email
              </Label>
              <Input
                id="request-access-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError("")
                }}
                onBlur={(e) => {
                  const validation = validateBusinessEmail(e.target.value)
                  if (!validation.ok) setEmailError(validation.msg)
                }}
                placeholder="your.email@company.com"
                className="bg-gray-900/50 text-white placeholder:text-gray-400"
                required
              />
              {emailError && <p className="text-sm text-red-400">{emailError}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-900/50 text-white placeholder:text-gray-400"
                required
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-900/50 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <Input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-gray-900/50 text-white placeholder:text-gray-400"
              required
            />

            <Input
              type="text"
              placeholder="Role/Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-gray-900/50 text-white placeholder:text-gray-400"
              required
            />

            <div className="space-y-1">
              <Label htmlFor="request-access-use-case" className="text-gray-400">
                Use Case
              </Label>
              <textarea
                id="request-access-use-case"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                placeholder="What's the #1 challenge you'd like us to help with?"
                rows={3}
                className="w-full resize-none rounded-md border border-gray-800 bg-gray-900/50 px-3 py-2 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={keepUpdated}
                onChange={(e) => setKeepUpdated(e.target.checked)}
                className="h-4 w-4 rounded border-gray-800 bg-gray-900/50 text-purple-600 focus:ring-2 focus:ring-purple-500"
              />
              Keep me updated with launch news and resources
            </label>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white transition-opacity hover:opacity-90"
                style={{ animation: "gradient 8s linear infinite", backgroundSize: "300% 100%", backgroundPosition: "left" }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md border border-gray-800/50 bg-[#0c0c14]/90 text-white text-center backdrop-blur-sm">
          <div className="flex flex-col items-center py-6">
            <div className="mb-4 text-2xl sm:text-3xl md:text-4xl">
              <DialogTitle>
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent">
                  Welcome to the future!
                </span>
              </DialogTitle>
            </div>
            <p className="mb-6 text-lg text-gray-400">
              The next era of AI is coming... and you'll be among the first to experience it!
            </p>
            <Button
              onClick={() => setIsSuccessOpen(false)}
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 px-8 text-white transition-opacity hover:opacity-90"
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
    </>
  )
}
