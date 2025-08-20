"use client"

import { useState } from "react"
import GradientText from "./gradient-text"
import RotatingWords from "./rotating-words"
import ActionWords from "./action-words"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import HubspotForm from "@/components/HubspotForm";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL

export default function HeroSection({ data }: { data: any }) {
  const [email, setEmail] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [fullName, setFullName] = useState("")
  const [company, setCompany] = useState("")
  const [department, setDepartment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const { Title, Description, CtaText, Image } = data

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDialogOpen(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      await new Promise((r) => setTimeout(r, 1000))

      setIsDialogOpen(false)
      setIsSuccessDialogOpen(true)
      setEmail("")
      setFullName("")
      setCompany("")
      setDepartment("")
    } catch (err) {
      setError("Submission failed. Try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToExplore = () => {
    const el = document.getElementById("explore")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  // fallback la alt text și url
  const imgUrl = Image?.url ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Image.url}` : ""
  const imgAlt = Image?.alternativeText ?? Title?.highlight ?? "Hero image"

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-0">
      <div className="w-full mx-auto flex flex-col md:flex-row items-center relative">
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 px-4 sm:px-6 md:pl-12 lg:pl-16 md:pr-0 z-10">
          <div className="mb-8 flex flex-col items-center md:items-start">
            <div className="mb-1 text-4xl sm:text-5xl md:text-6xl">
              <span className="text-gray-400">{Title?.prefix} </span>
              <GradientText>{Title?.highlight}</GradientText>
            </div>
            <div className="mb-6 text-xl sm:text-2xl md:text-3xl font-light text-gray-400">
              {Title?.subtitle}
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 text-gray-400">
              <div className="mb-3">
                {Description?.tagline_plain}{" "}
                <ActionWords words={Description?.action_words ?? []} />
              </div>
              <div className="flex flex-wrap items-center md:justify-start justify-center">
                <span className="whitespace-normal">The ultimate</span>
                <RotatingWords words={Description?.rotating_words ?? []} className="mx-1 sm:mx-3" />
                <span className="whitespace-normal mt-6 md:mt-3 block md:inline w-full md:w-auto">
                  {Description?.tagline_suffix}
                </span>
              </div>
            </h1>
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailSubmit} className="w-full max-w-md mb-16">
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
                {CtaText ?? "Get Early Access"}
              </Button>
            </div>
          </form>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2">
          <div className="relative w-full max-w-lg md:max-w-none md:w-auto px-4 md:px-0">
            {imgUrl && (
              <img
                src={imgUrl}
                alt={imgAlt}
                className="w-full object-contain max-h-[70vh] md:max-h-[80vh] lg:max-h-[90vh]"
              />
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center">
        <button
          onClick={scrollToExplore}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
          aria-label="Scroll down to explore"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDelay: "0ms" }} />
          <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDelay: "150ms" }} />
          <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDelay: "300ms" }} />
        </button>
      </div>

      {/* Modal - Registration Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white">
          <HubspotForm />
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#0c0c14]/90 backdrop-blur-sm border border-gray-800/50 text-white text-center">
          <div className="py-6 flex flex-col items-center">
            <div className="mb-4 text-2xl sm:text-3xl md:text-4xl">
              <GradientText>Welcome to the future!</GradientText>
            </div>
            <p className="text-lg text-gray-400 mb-6">
              The next era of AI is coming... and you'll be among the first to experience it!
            </p>
            <Button onClick={() => setIsSuccessDialogOpen(false)}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
