"use client"

import { getLucideIcon } from "@/lib/icons-map"
import GradientText from "./gradient-text"

interface Props {
  data: {
    Title: string
    Subtitle: string
    Icon?: string | null
    highlightWords?: string
  }
}

function highlightText(text: string, highlightWords?: string) {
  if (!highlightWords) return text

  const words = highlightWords.split(",").map((w) => w.trim().toLowerCase())
  const parts = text.split(new RegExp(`(${words.join("|")})`, "gi"))

  return parts.map((part, i) =>
    words.includes(part.toLowerCase()) ? <GradientText key={i}>{part}</GradientText> : part
  )
}

export default function HeaderIcon({ data }: Props) {
  const Icon = data.Icon ? getLucideIcon(data.Icon) : getLucideIcon("Video")

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        {Icon && (
          <div className="mb-8">
            <Icon className="h-16 w-16 text-purple-400 mx-auto mb-6" />
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-8 text-white">
          {highlightText(data.Title, data.highlightWords)}
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          {highlightText(data.Subtitle, data.highlightWords)}
        </p>
      </div>
    </section>
  )
}
