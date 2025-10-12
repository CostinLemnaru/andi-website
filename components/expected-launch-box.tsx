"use client"

import { useState } from "react"
import ScrollReveal from "./scroll-reveal"
import GradientText from "./gradient-text"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"
import { toast } from "sonner"

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
    return "Please enter a valid email"
  }
  const domain = email.split("@")[1]?.toLowerCase()
  if (domain && personalDomains.includes(domain)) {
    return "Please use a valid business email address"
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

interface ExpectedLaunchBoxProps {
  data: {
    __component: string
    id: number
    Description: string
  }
}

export default function ExpectedLaunchBox({ data }: ExpectedLaunchBoxProps) {
  const { Description } = data
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [submitError, setSubmitError] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    interests: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "email") {
      setEmailError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validateBusinessEmail(formData.email)
    if (validation) {
      setEmailError(validation)
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const hutk = getCookie("hubspotutk")
      const payload = {
        formGuid: "ccf23d19-c4e5-46cd-a928-d8b5a7d607d3",
        fields: [
          { name: "email", value: formData.email },
          { name: "firstname", value: formData.firstName },
          { name: "lastname", value: formData.lastName },
          { name: "company", value: formData.company },
          { name: "role_department", value: formData.role },
          { name: "use_case", value: formData.interests },
          { name: "LEGAL_CONSENT.processing", value: "true" },
        ],
        context: {
          pageUri: typeof window !== "undefined" ? window.location.href : "https://www.zamora.ai",
          pageName: typeof document !== "undefined" ? document.title : "Expected Launch",
          hutk: hutk || undefined,
        },
      }

      await submitToHubSpot(payload)

      setIsSubmitted(true)
      toast.success("You're on the waitlist!")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        role: "",
        interests: "",
      })
    } catch (error) {
      console.error("Expected launch submit error:", error)
      setSubmitError("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-light mb-4">
                Expected Launch: <GradientText>Q3 2025</GradientText>
              </h3>
              <p className="text-gray-300 mb-6">{Description}</p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Notification Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[#0c0c14] border border-white/20 text-white max-w-md">
            {!isSubmitted ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-light text-center">
                    Get <GradientText>Early Access</GradientText>
                  </DialogTitle>
                  <p className="text-gray-400 text-center">
                    Be among the first to read our premium content when we launch.
                  </p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={(e) => {
                        const validation = validateBusinessEmail(e.target.value)
                        if (validation) setEmailError(validation)
                      }}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                      placeholder="john@company.com"
                      required
                    />
                    {emailError && <p className="text-sm text-red-400 mt-1">{emailError}</p>}
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-sm font-medium text-gray-300">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                      placeholder="Your Company"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="role" className="text-sm font-medium text-gray-300">
                      Role
                    </Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0c0c14] border-white/20">
                        <SelectItem value="ceo">CEO/Founder</SelectItem>
                        <SelectItem value="cto">CTO/Technical Lead</SelectItem>
                        <SelectItem value="data-scientist">Data Scientist</SelectItem>
                        <SelectItem value="analyst">Business Analyst</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="interests" className="text-sm font-medium text-gray-300">
                      Content Interests
                    </Label>
                    <Textarea
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => handleInputChange("interests", e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 min-h-[80px]"
                      placeholder="What topics are you most interested in reading about?"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Notify Me at Launch"}
                  </Button>
                  {submitError && <p className="text-sm text-red-400 text-center">{submitError}</p>}
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-light mb-2">
                  <GradientText>You're In!</GradientText>
                </h3>
                <p className="text-gray-400 mb-6">
                  We'll notify you as soon as our blog launches with premium AI and analytics content.
                </p>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
