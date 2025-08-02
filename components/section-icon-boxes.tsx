"use client"

import { getLucideIcon } from "@/lib/icons-map"
import ScrollReveal from "@/components/scroll-reveal"

interface IconBox {
  id: number
  Title: string
  Subtitle: string
  Icon: string
  Description: string
}

interface SectionIconBoxesProps {
  __component: string
  id: number
  Title: string
  SectionIconBoxes: IconBox[]
}

type Props = {
  data: SectionIconBoxesProps
}


export default function SectionIconBoxes({ data }: Props) {
  const { Title, SectionIconBoxes } = data

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-light mb-12 text-center">
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {Title}
        </span>
      </h2>

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SectionIconBoxes.map((box) => {
            const Icon = getLucideIcon(box.Icon)

            return (
              <div
                key={box.id}
                className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-colors duration-500 group"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500">
                    {Icon && <Icon className="h-8 w-8 text-purple-400" />}
                  </div>
                  <div>
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                      {box.Title}
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">{box.Subtitle}</h3>
                    <p className="text-gray-400">{box.Description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollReveal>
    </div>
  )
}
