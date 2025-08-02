"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import ScrollReveal from "./scroll-reveal"
import GradientText from "./gradient-text"
import { getLucideIcon } from "@/lib/icons-map"

interface TagIconProps {
  data: {
    __component: string
    id: number
    Title: string
    TagName: string
    TagIcon: string
    Description: string
    highlightWords?: string
    ButtonName: string
    IconButton: string
  }
}

export default function TagIcon({ data }: TagIconProps) {
  const {
    Title,
    TagName,
    TagIcon,
    Description,
    highlightWords,
    ButtonName,
    IconButton,
  } = data

  const TagLucideIcon = getLucideIcon(TagIcon)
  const ButtonLucideIcon = getLucideIcon(IconButton)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // send formData to backend or service
    setIsSubmitted(true)
  }

  const highlightTitle = (text: string, highlights?: string) => {
    if (!highlights) return text

    const words = highlights.split(",").map((w) => w.trim().toLowerCase())
    return text.split(/(\s+)/).map((word, i) => {
      const clean = word.replace(/[^a-z0-9]/gi, "").toLowerCase()
      return words.includes(clean) ? (
        <GradientText key={i}>{word}</GradientText>
      ) : (
        <span key={i}>{word}</span>
      )
    })
  }

  return (
    <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8">
            {TagLucideIcon && <TagLucideIcon className="w-5 h-5 text-purple-400" />}
            <span className="text-sm font-medium text-white">{TagName}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-300">
            {highlightTitle(Title, highlightWords)}
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">{Description}</p>

          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            {ButtonLucideIcon && <ButtonLucideIcon className="w-5 h-5 mr-2" />}
            {ButtonName}
          </Button>
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
    </div>
  )
}
