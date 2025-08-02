"use client"

import { useRef } from "react"
import ScrollReveal from "@/components/scroll-reveal"
import DecisionFlow from "@/components/decision-flow"

interface Props {
  data: {
    __component: string
    id: number
    Title: string
    Config: {
      steps: any[]
    }
  }
}

export default function PostDecisionFlowSection({ data }: Props) {
  const sectionRef = useRef(null)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div id="decision-flow-section" ref={sectionRef} className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">{data.Title}</h2>
          <DecisionFlow title={data.Title} steps={data.Config?.steps} />
        </div>
      </ScrollReveal>
    </div>
  )
}
