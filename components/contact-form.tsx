"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

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

const validateBusinessEmail = (email: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, msg: "Please enter a valid email" }
  }
  const domain = email.split("@")[1]?.toLowerCase()
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

type ContactFormProps = {
  isOpen: boolean
  onClose: () => void
  selectedPlan: string
}

export function ContactForm({ isOpen, onClose, selectedPlan }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    useCase: "",
  })
  const [emailError, setEmailError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const planSelected = useMemo(() => selectedPlan || "Unknown", [selectedPlan])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "email" && emailError) {
      setEmailError("")
    }
  }

  const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const validation = validateBusinessEmail(event.target.value)
    if (!validation.ok) {
      setEmailError(validation.msg)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const validation = validateBusinessEmail(formData.email)
    if (!validation.ok) {
      setEmailError(validation.msg)
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const hutk = getCookie("hubspotutk")
      const payload = {
        formGuid: "a4057aad-daeb-4c9c-9d9b-3d6c6e64bdfc",
        fields: [
          { name: "firstname", value: formData.firstName },
          { name: "lastname", value: formData.lastName },
          { name: "email", value: formData.email },
          { name: "company", value: formData.company },
          { name: "role_department", value: formData.role },
          { name: "use_case", value: formData.useCase },
          { name: "plan_selected", value: planSelected },
          { name: "LEGAL_CONSENT.subscription_type_1062787159", value: "true" },
          { name: "LEGAL_CONSENT.processing", value: "true" },
        ],
        context: {
          pageUri: typeof window !== "undefined" ? window.location.href : "https://www.zamora.ai/pricing",
          pageName: typeof document !== "undefined" ? document.title : "Pricing",
          hutk: hutk || undefined,
        },
      }

      await submitToHubSpot(payload)

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        role: "",
        useCase: "",
      })
      setEmailError("")
      onClose()
    } catch (error) {
      console.error("HubSpot contact submission error:", error)
      setSubmitError("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-md bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white"></h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-300 mb-6">
                Interested in our <span className="font-semibold text-white">{selectedPlan}</span> plan? Fill out the
                form below and our team will get in touch with you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-300">
                    Business Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@company.com"
                  />
                  {emailError && <p className="mt-1 text-sm text-red-400">{emailError}</p>}
                </div>

                <div>
                  <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-300">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-300">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your role (e.g., CTO, Marketing Director)"
                  />
                </div>

                <div>
                  <label htmlFor="useCase" className="mb-1 block text-sm font-medium text-gray-300">
                    How would you like to use ANDI?
                  </label>
                  <textarea
                    id="useCase"
                    name="useCase"
                    required
                    value={formData.useCase}
                    onChange={handleChange}
                    rows={4}
                    className="w-full resize-none rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your use case and requirements..."
                  ></textarea>
                </div>

                {submitError && <p className="text-sm text-red-400">{submitError}</p>}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-4 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
