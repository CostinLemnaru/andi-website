"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import GradientText from "@/components/gradient-text"
import PageLayout from "@/components/page-layout"
import { Video, Calendar, Users, Lightbulb, Target, TrendingUp } from "lucide-react"

export default function WebinarsPage() {
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
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Close the form dialog and show the success dialog
      setIsDialogOpen(false)
      setIsSuccessDialogOpen(true)

      // Reset form fields
      setFirstName("")
      setLastName("")
      setEmail("")
      setCompany("")
      setRole("")
      setUseCase("")
    } catch (err) {
      console.error("Form submission error:", err)
      setError("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const upcomingTopics = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "AI-Driven Decision Making",
      description: "Transform your business intelligence with AI that thinks, learns, and acts on your data",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Predictive Analytics Mastery",
      description: "Unlock the power of forecasting and trend analysis with andi's advanced algorithms",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Cross-Department Collaboration",
      description: "Break down data silos and enable seamless insights sharing across your organization",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Custom AI Solutions",
      description: "Learn how to tailor andi to your specific industry and business requirements",
    },
  ]

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Video className="h-16 w-16 text-purple-400 mx-auto mb-6" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-8">
            <span className="text-gray-400">Coming soon to a </span>
            <GradientText>Zoom</GradientText>
            <span className="text-gray-400"> near you</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get ready for exclusive webinars where we'll dive deep into
            <span className="mx-2">
              <GradientText>andi's</GradientText>
            </span>
            revolutionary capabilities and show you how AI can transform your business intelligence.
          </p>

          <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm p-8 rounded-lg border border-gray-800/50 mb-12">
            <Calendar className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-light mb-4 text-white">
              <GradientText>Interactive sessions</GradientText> launching Q2 2025
            </h3>
            <p className="text-gray-300">
              Join industry experts, early adopters, and the Zamora team for live demonstrations, Q&A sessions, and
              exclusive insights into the future of AI-powered business intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Topics Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-light mb-16 text-center">
            What to <GradientText>expect</GradientText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {upcomingTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800/50 hover:border-purple-500/30 transition-colors"
              >
                <div className="text-purple-400 mb-4">{topic.icon}</div>
                <h3 className="text-xl font-medium text-white mb-3">{topic.title}</h3>
                <p className="text-gray-400">{topic.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-lg border border-gray-800/50 mb-8">
              <h3 className="text-2xl font-light mb-4 text-white">Can't wait for the webinars?</h3>
              <p className="text-gray-300 mb-6">
                Get a personalized demo of <GradientText>andi</GradientText> today and see how it can revolutionize your
                business intelligence.
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

            <p className="text-sm text-gray-500">
              Be among the first to know when webinars go live • Priority access for demo participants
            </p>
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
                <Label htmlFor="firstName" className="text-gray-400">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-gray-400">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-gray-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Label htmlFor="role" className="text-gray-400">
                Role
              </Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-800 text-white">
                  <SelectItem value="ceo">CEO/Founder</SelectItem>
                  <SelectItem value="cto">CTO/Technical Lead</SelectItem>
                  <SelectItem value="data-analyst">Data Analyst</SelectItem>
                  <SelectItem value="business-analyst">Business Analyst</SelectItem>
                  <SelectItem value="product-manager">Product Manager</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="useCase" className="text-gray-400">
                Potential Use Case
              </Label>
              <Textarea
                id="useCase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                placeholder="Tell us about your specific needs or challenges..."
                required
                className="bg-gray-900/50 border border-gray-800 text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500 min-h-[80px]"
              />
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
    </PageLayout>
  )
}
