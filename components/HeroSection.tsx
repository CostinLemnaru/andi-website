"use client"

import RotatingWords from "./rotating-words"
import GradientText from "./gradient-text"
import ActionWords from "./action-words"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function HeroSection({ data }: { data: any }) {
  const [email, setEmail] = useState("")
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add your submit logic
  }

  const scrollToExplore = () => {
    const el = document.getElementById("explore")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const { Title, Description, CtaText } = data

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-0">
      <div className="w-full mx-auto flex flex-col md:flex-row items-center relative">
        {/* Text Content */}
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
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ANDI%20by%20Zamora11-Photoroom-cgAFATavdXXslUkpuaJAj3M0HiIj8Y.png"
              alt="ANDI Dashboard Interface"
              className="w-full object-contain md:object-contain max-h-[70vh] md:max-h-[80vh] lg:max-h-[90vh]"
            />
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
    </section>
  )
}
