"use client"

import ScrollReveal from "@/components/scroll-reveal"

type RichTextChild = {
  type: "text"
  text: string
}

type RichTextNode =
  | {
      type: "heading"
      level: number
      children: RichTextChild[]
    }
  | {
      type: "paragraph"
      children: RichTextChild[]
    }

type Props = {
  data: {
    __component: string
    id: number
    Text: RichTextNode[]
  }
}

export default function PostContent({ data }: Props) {
  const content = data.Text ?? []

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <ScrollReveal>
        {content.map((block, index) => {
          if (block.type === "heading") {
            const headingText = block.children.map((c) => c.text).join("")
            return (
              <h2 key={index} className="text-2xl font-bold mb-6 text-white">
                {headingText}
              </h2>
            )
          }

          if (block.type === "paragraph") {
            const text = block.children.map((c) => c.text).join("").trim()

            // Nu afișa paragrafe goale
            if (!text) return null

            return (
              <p key={index} className="text-gray-300 mb-4">
                {text}
              </p>
            )
          }

          return null
        })}
    </ScrollReveal>
      </div>
  )
}
