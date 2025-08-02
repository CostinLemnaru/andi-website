"use client"

import { getLucideIcon } from "@/lib/icons-map"
import GradientText from "./gradient-text"

interface Props {
  data: {
    Icon: string
    Title: string
    Description: string
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

export default function IconBox({ data }: Props) {
  const Icon = getLucideIcon(data.Icon)

  return (
    <section className="relative z-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm p-8 rounded-lg border border-gray-800/50 mb-12">
          {Icon && <Icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />}
          <h3 className="text-2xl font-light mb-4 text-white">
            {highlightText(data.Title, data.highlightWords)}
          </h3>
          <p className="text-gray-300">{data.Description}</p>
        </div>
      </div>
    </section>
  )
}
