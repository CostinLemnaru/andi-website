"use client"

import Link from "next/link"
import ScrollReveal from "@/components/scroll-reveal"
import { BookOpen } from "lucide-react"

interface Button {
  id: number
  Text: string
  Url: string
}

interface Props {
  data: {
    __component: string
    id: number
    Title: string
    Description: string
    centered?: boolean
    transparentBackground?: boolean
    MainButton?: Button | null
    SecondaryButton?: Button | null
  }
}

export default function PostBoxButtonsSection({ data }: Props) {
  const {
    Title,
    Description,
    MainButton,
    SecondaryButton,
    centered,
    transparentBackground,
  } = data

  const containerClass = transparentBackground
    ? "p-8 mb-12"
    : "bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 mb-12"

  const alignmentClass = centered ? "text-center" : ""
  const buttonAlignment = centered ? "justify-center" : ""

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className={`${containerClass} ${alignmentClass}`}>
          <h2 className="text-2xl font-bold mb-4 text-white">{Title}</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{Description}</p>
          <div className={`flex flex-col sm:flex-row gap-4 ${buttonAlignment}`}>
            {MainButton?.Text && MainButton?.Url && (
              <Link
                href={MainButton.Url}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md"
              >
                {MainButton.Text}
              </Link>
            )}

            {SecondaryButton?.Text && SecondaryButton?.Url && (
              <Link
                href={SecondaryButton.Url}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center justify-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                <span>{SecondaryButton.Text}</span>
              </Link>
            )}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}