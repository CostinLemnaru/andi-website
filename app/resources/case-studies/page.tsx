"use client"

import type React from "react"
import { useState, useRef } from "react"
import { submitToGoogleSheets } from "@/lib/google-sheets"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import GradientText from "@/components/gradient-text"
import PageLayout from "@/components/page-layout"
import { Users, Lightbulb, Target, Rocket, CheckCircle } from "lucide-react"

export default function CaseStudiesPage() {
  const [email, setEmail] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [fullName, setFullName] = useState("")
  const [company, setCompany] = useState("")
  const [department, setDepartment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

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

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-8">
            <span className="text-gray-400">Be the </span>
            <GradientText>first</GradientText>
            <span className="text-gray-400"> to shape the future</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our exclusive group of <GradientText>foundational partners</GradientText> and help us refine
            <span className="mx-2">
              <GradientText>andi</GradientText>
            </span>
            into the ultimate AI business intelligence platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800/50">
              <Users className="h-8 w-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-white mb-2">Beta Testers</h3>
              <p className="text-gray-400 text-sm">Get exclusive early access to cutting-edge features</p>
            </div>

            <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800/50">
              <Lightbulb className="h-8 w-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-white mb-2">Innovation Partners</h3>
              <p className="text-gray-400 text-sm">Shape product development with your insights</p>
            </div>

            <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800/50">
              <Target className="h-8 w-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-white mb-2">Success Stories</h3>
              <p className="text-gray-400 text-sm">Become a featured case study and thought leader</p>
            </div>

            <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800/50">
              <Rocket className="h-8 w-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-white mb-2">First Movers</h3>
              <p className="text-gray-400 text-sm">Gain competitive advantage before your competitors</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-light mb-16 text-center">
            What <GradientText>foundational partners</GradientText> receive
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Exclusive Early Access</h3>
                  <p className="text-gray-400">
                    Be among the first to experience andi's revolutionary capabilities months before public release
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Direct Product Influence</h3>
                  <p className="text-gray-400">
                    Your feedback directly shapes feature development and product roadmap priorities
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Dedicated Support</h3>
                  <p className="text-gray-400">
                    Work directly with our engineering and product teams for personalized assistance
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Preferential Pricing</h3>
                  <p className="text-gray-400">Lock in special founder pricing and terms for your organization</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Thought Leadership</h3>
                  <p className="text-gray-400">
                    Co-create content, speak at events, and establish your organization as an AI pioneer
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Network Access</h3>
                  <p className="text-gray-400">
                    Connect with other forward-thinking organizations in our exclusive partner community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-8 text-gray-400">Real case studies are coming soon...</h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            But the <GradientText>first stories</GradientText> will be written by our foundational partners. Will yours
            be one of them?
          </p>

          <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm p-8 rounded-lg border border-gray-800/50 mb-12">
            <h3 className="text-2xl font-light mb-4 text-white">
              Your success story starts <GradientText>today</GradientText>
            </h3>
            <p className="text-gray-300 mb-8">
              Join our early access program and help us create the case studies that will inspire the next generation of
              AI-powered businesses.
            </p>

            <form onSubmit={handleEmailSubmit} className="w-full max-w-md mx-auto">
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
                  Join Early Access
                </Button>
              </div>
            </form>
          </div>

          <div className="text-sm text-gray-500">Limited spots available • Applications reviewed weekly</div>
        </div>
      </section>

      {/* Hidden form for direct submission fallback */}
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
            <DialogTitle>Join our foundational partners</DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete your application to become an early access partner and help shape the future of AI.
            </DialogDescription>
          </DialogHeader>
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
                {isSubmitting ? "Submitting..." : "Apply Now"}
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
              Thank you for applying to become a foundational partner. We'll review your application and be in touch
              soon!
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
    </PageLayout>
  )
}
