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
import HubspotForm from "@/components/HubspotForm";

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
            <HubspotForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
