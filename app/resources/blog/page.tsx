"use client"

import type React from "react"

import { useState } from "react"
import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import GradientText from "@/components/gradient-text"
import ScrollReveal from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PenTool, BookOpen, Lightbulb, TrendingUp, Users, Zap, Bell, CheckCircle } from "lucide-react"

export default function BlogPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
  }

  const upcomingTopics = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "AI Innovation Insights",
      description: "Deep dives into cutting-edge AI technologies and their real-world applications across industries.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Data Strategy & Analytics",
      description: "Expert guidance on building robust data strategies that drive measurable business outcomes.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Success Stories",
      description:
        "Behind-the-scenes looks at how organizations transform their operations with intelligent analytics.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Industry Transformation",
      description: "Analysis of how AI and analytics are reshaping entire industries and creating new opportunities.",
    },
  ]

  const contentPillars = [
    {
      title: "Thought Leadership",
      description: "Industry insights from our team of AI and analytics experts",
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Technical Deep Dives",
      description: "In-depth explorations of AI technologies and implementation strategies",
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Business Impact",
      description: "Real-world case studies and ROI analysis from successful deployments",
      color: "from-pink-500 to-red-600",
    },
    {
      title: "Future Trends",
      description: "Predictions and analysis of emerging technologies and market shifts",
      color: "from-red-500 to-orange-600",
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="The ANDI Intelligence Hub"
        subtitle="Where insights meet innovation. Our blog will be your go-to resource for AI-driven analytics, industry trends, and transformational success stories."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
              <PenTool className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium">Content in Development</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-300">
              <GradientText>Stories</GradientText> are being written, <GradientText>insights</GradientText> are being
              crafted
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Our editorial team is curating compelling content that will help you navigate the future of AI-powered
              analytics. Be the first to access our premium insights when we launch.
            </p>

            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <Bell className="w-5 h-5 mr-2" />
              Get Notified at Launch
            </Button>
          </div>
        </ScrollReveal>

        {/* Content Pillars */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="text-3xl font-light text-center mb-12">
              What to <GradientText>Expect</GradientText>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contentPillars.map((pillar, index) => (
                <div key={index} className="group">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${pillar.color} mb-4 flex items-center justify-center`}
                    >
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Upcoming Topics */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="text-3xl font-light text-center mb-12">
              <GradientText>Topics</GradientText> We're Exploring
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {upcomingTopics.map((topic, index) => (
                <div key={index} className="group">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
                    <div className="flex items-start gap-4">
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0">
                        {topic.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-gray-400 leading-relaxed">{topic.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Launch Timeline */}
        <ScrollReveal>
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-light mb-4">
                Expected Launch: <GradientText>Q3 2025</GradientText>
              </h3>
              <p className="text-gray-300 mb-6">
                We're taking the time to create truly valuable content that will help you stay ahead in the rapidly
                evolving world of AI and analytics.
              </p>
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
      </div>

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
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    placeholder="john@company.com"
                    required
                  />
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
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Notify Me at Launch
                </Button>
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
    </PageLayout>
  )
}
