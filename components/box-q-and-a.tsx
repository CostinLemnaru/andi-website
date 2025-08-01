"use client"

import ScrollReveal from "@/components/scroll-reveal"

interface QAItem {
  id: number
  Question: string
  QuestionLabel: string
  AnswerLabel: string
  Answer: string
}

interface BoxQandAProps {
  __component: string
  id: number
  Title: string
  Description: string | null
  qa: QAItem[]
}

type Props = {
  data: BoxQandAProps
}

export default function BoxQandA({ data }: Props) {
  const { Title, Description, qa } = data

  return (
    <ScrollReveal>
      <div className="max-w-4xl mx-auto mb-12 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
        <h3 className="text-xl font-medium text-white mb-4">{Title}</h3>
        {Description && <p className="text-gray-300 mb-6">{Description}</p>}
        <div className="space-y-4">
          {qa.map((item) => (
            <div key={item.id} className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-purple-400 font-medium">{item.QuestionLabel}</p>
              <p className="text-white">{item.Question}</p>
              <p className="text-purple-400 font-medium mt-2">{item.AnswerLabel}</p>
              <p className="text-gray-300">{item.Answer}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
