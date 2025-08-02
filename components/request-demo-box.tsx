"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import GradientText from "./gradient-text"

interface RequestDemoBoxProps {
  data: {
    __component: string
    id: number
    Title: string
    Description: string
    FooterText: string
  }
}

export default function RequestDemoBox({ data }: RequestDemoBoxProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [useCase, setUseCase] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleDemoRequest = () => {
    setIsDialogOpen(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Simulează trimiterea datelor
      await new Promise((res) => setTimeout(res, 1000))
      setIsDialogOpen(false)
      setIsSuccessDialogOpen(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-lg border border-gray-800/50 mb-8">
              <h3 className="text-2xl font-light mb-4 text-white">Can't wait for the webinars?</h3>
              <p className="text-gray-300 mb-6">
                {data.Description.includes("andi") ? (
                  <>
                    Get a personalized demo of <GradientText>andi</GradientText> today and see how it can revolutionize your business intelligence.
                  </>
                ) : (
                  data.Description
                )}
              </p>

              <Button
                onClick={handleDemoRequest}
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-3 text-lg"
                style={{
                  animation: "gradient 8s linear infinite",
                  backgroundSize: "300% 100%",
                  backgroundPosition: "left",
                }}
              >
                Request a Demo
              </Button>
            </div>

            <p className="text-sm text-gray-500">{data.FooterText}</p>
          </div>
        </div>
      </section>

      {/* Demo Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white">
          <DialogHeader>
            <DialogTitle>Request Your Personal Demo</DialogTitle>
            <DialogDescription className="text-gray-400">
              Tell us about your needs and we'll schedule a personalized demonstration of andi's capabilities.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-gray-400">First Name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-gray-400">Last Name</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500" />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-gray-400">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="company" className="text-gray-400">Company</Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="role" className="text-gray-400">Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-800 text-white">
                  {[
                    "ceo", "cto", "data-analyst", "business-analyst", "product-manager",
                    "operations", "marketing", "finance", "other",
                  ].map((val) => (
                    <SelectItem key={val} value={val}>
                      {val.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="useCase" className="text-gray-400">Potential Use Case</Label>
              <Textarea id="useCase" value={useCase} onChange={(e) => setUseCase(e.target.value)} placeholder="Tell us about your specific needs or challenges..." required className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500 min-h-[80px]" />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6"
                style={{
                  animation: "gradient 8s linear infinite",
                  backgroundSize: "300% 100%",
                  backgroundPosition: "left",
                }}
              >
                {isSubmitting ? "Submitting..." : "Request Demo"}
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
              <GradientText>Demo requested!</GradientText>
            </div>
            <p className="text-lg text-gray-400 mb-6">
              Thank you for your interest! Our team will reach out within 24 hours to schedule your personalized demo.
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
    </>
  )
}
