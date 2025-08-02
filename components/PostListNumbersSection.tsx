"use client"

import ScrollReveal from "@/components/scroll-reveal"

interface Item {
  id: number
  Title: string
  Description: string
}

interface Props {
  data: {
    __component: string
    id: number
    Title: string
    Items: Item[]
  }
}

export default function PostListNumbersSection({ data }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div id="adoption" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">{data.Title}</h2>

          <div className="space-y-4 mb-6">
            {data.Items.map((item, index) => (
              <div key={item.id} className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emerald-400 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-white">{item.Title}</h3>
                  <p className="text-gray-300">{item.Description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
