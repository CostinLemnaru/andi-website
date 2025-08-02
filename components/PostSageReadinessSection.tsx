"use client"

import SageReadinessQuiz from "@/components/sage-readiness-quiz"
import ScrollReveal from "@/components/scroll-reveal"

interface Props {
  data: {
    __component: string
    id: number
    Title: string
    Config: {
      questions: any[]
      results: any[]
    }
  }
}

export default function PostSageReadinessSection({ data }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">{data.Title}</h2>
          <SageReadinessQuiz questions={data.Config.questions} results={data.Config.results} />
        </div>
      </ScrollReveal>
    </div>
  )
}
