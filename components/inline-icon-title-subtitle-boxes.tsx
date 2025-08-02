"use client"

import { getLucideIcon } from "@/lib/icons-map"

interface Props {
  data: {
    Boxes: {
      id: number
      Icon: string
      Title: string
      Subtitle: string
    }[]
  }
}

export default function InlineIconTitleSubtitleBoxes({ data }: Props) {
  return (
    <section className="relative z-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {data.Boxes?.map((box) => {
          const Icon = getLucideIcon(box.Icon)
          return (
            <div
              key={box.id}
              className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800/50"
            >
              {Icon && <Icon className="h-8 w-8 text-purple-400 mb-4 mx-auto" />}
              <h3 className="text-lg font-medium text-white mb-2 text-center">{box.Title}</h3>
              <p className="text-gray-400 text-sm text-center">{box.Subtitle}</p>
            </div>
          )
        })}
      </div>
      </div>
    </section>
  )
}
