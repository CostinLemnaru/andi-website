"use client"

import ScrollReveal from "@/components/scroll-reveal"

interface Item {
  id: number
  Title: string
  Description: string
  Color: string | null
}

interface BoxItemsProps {
  __component: string
  id: number
  Title: string
  Description: string | null
  ShowInColumns: boolean | null
  Items: Item[]
}

type Props = {
  data: BoxItemsProps
}

export default function BoxItems({ data }: Props) {
  const { Title, Description, Items, ShowInColumns } = data

  return (
    <ScrollReveal>
      <div className="max-w-4xl mx-auto mb-12 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
        <h3 className="text-xl font-medium text-white mb-4">{Title}</h3>
        {Description && <p className="text-gray-300 mb-6">{Description}</p>}

        <div className={`${ShowInColumns ? "grid md:grid-cols-2 gap-6" : "space-y-4"}`}>
          {Items?.map((item) => (
            <div key={item.id} className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-purple-400 font-medium">{item.Title}</p>
              <p className="text-gray-300">{item.Description}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
