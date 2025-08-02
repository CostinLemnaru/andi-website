"use client"

import GradientText from "@/components/gradient-text"
import { getLucideIcon } from "@/lib/icons-map"

interface Props {
  data: {
    Title: string
    highlightWords?: string
    Items: {
      id: number
      Title: string
      Icon: string
      Description: string
    }[]
  }
}

export default function ColumnsListSection({ data }: Props) {
  const half = Math.ceil(data.Items.length / 2)
  const columns = [data.Items.slice(0, half), data.Items.slice(half)]

  const renderTitle = () => {
    const [before, highlight, after] = data.Title.split(new RegExp(`(${data.highlightWords})`, "i"))
    return (
      <h2 className="text-3xl sm:text-4xl font-light mb-16 text-center">
        {before}
        {highlight && <GradientText>{highlight}</GradientText>}
        {after}
      </h2>
    )
  }

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {renderTitle()}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="space-y-6">
              {col.map((item) => {
                const Icon = getLucideIcon(item.Icon)
                return (
                  <div key={item.id} className="flex items-start gap-4">
                    {Icon && <Icon className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">{item.Title}</h3>
                      <p className="text-gray-400">{item.Description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
