"use client"

import QuoteCard from "@/components/quote-card"
import ScrollReveal from "@/components/scroll-reveal"

interface Props {
  data: {
    __component: string
    id: number
    Text: string
    FooterText?: string | null
  }
}

export default function PostQuoteSection({ data }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <QuoteCard
          quote={data.Text.trim()}
          source={data.FooterText?.trim() || undefined}
          delay={0}
        />
      </ScrollReveal>
    </div>
  )
}
