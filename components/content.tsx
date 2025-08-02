"use client"

import ScrollReveal from "./scroll-reveal"

interface ContentProps {
  data: {
    __component: string
    id: number
    Text: string
  }
}

// Regex combinat pentru bold, italic, underline, links
const TOKEN_REGEX =
  /(\*\*[^\*]+\*\*|\*[^\*]+\*|__[^\_]+__|\[[^\]]+\]\([^)]+\))/g

function parseContent(text: string) {
  const paragraphs = text.split(/\n{2,}/g)

  return paragraphs.map((paragraph, idx) => {
    const parts = paragraph.split(TOKEN_REGEX)

    return (
      <p key={idx} className="text-gray-300 leading-relaxed">
        {parts.map((part, index) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={index} className="font-bold text-white">
                {part.slice(2, -2)}
              </strong>
            )
          }

          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <em key={index} className="italic text-gray-300">
                {part.slice(1, -1)}
              </em>
            )
          }

          if (part.startsWith("__") && part.endsWith("__")) {
            return (
              <u key={index} className="underline underline-offset-4">
                {part.slice(2, -2)}
              </u>
            )
          }

          if (part.match(/^\[.+\]\(.+\)$/)) {
            const label = part.match(/^\[(.+?)\]/)?.[1]
            const href = part.match(/\((.+?)\)$/)?.[1]
            return (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 underline hover:text-purple-300 transition-colors"
              >
                {label}
              </a>
            )
          }

          return <span key={index}>{part}</span>
        })}
      </p>
    )
  })
}

export default function Content({ data }: ContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ScrollReveal>
        <div className="prose prose-invert max-w-none mb-16">
          {parseContent(data.Text)}
        </div>
      </ScrollReveal>
    </div>
  )
}
