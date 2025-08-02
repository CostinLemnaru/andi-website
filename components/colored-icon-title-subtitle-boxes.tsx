"use client"

import { getLucideIcon } from "@/lib/icons-map"
import ScrollReveal from "./scroll-reveal"
import GradientText from "./gradient-text"

interface BoxItem {
  id: number
  Title: string
  Subtitle: string
  Color: string
  Icon: string
}

interface ColoredIconTitleSubtitleBoxesProps {
  data: {
    __component: string
    id: number
    Title: string
    highlightWords?: string
    Boxes: BoxItem[]
  }
}

export default function ColoredIconTitleSubtitleBoxes({ data }: ColoredIconTitleSubtitleBoxesProps) {
  const { Title, highlightWords, Boxes = [] } = data

  const highlightText = (text: string, highlights?: string) => {
    if (!highlights) return text
    const words = highlights.split(",").map((w) => w.trim().toLowerCase())
    return text.split(/(\s+)/).map((word, i) => {
      const clean = word.replace(/[^a-z0-9]/gi, "").toLowerCase()
      return words.includes(clean) ? (
        <GradientText key={i}>{word}</GradientText>
      ) : (
        <span key={i}>{word}</span>
      )
    })
  }

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-20">
          <h3 className="text-3xl font-light text-center mb-12 text-white">
            {highlightText(Title, highlightWords)}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Boxes.map((box) => {
              const Icon = getLucideIcon(box.Icon)
              const bgColor = `from-${box.Color}-500 to-${box.Color}-700`

              return (
                <div key={box.id} className="group">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${bgColor} mb-4 flex items-center justify-center`}>
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
                      {box.Title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{box.Subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
