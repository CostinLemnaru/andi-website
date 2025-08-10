"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getLucideIcon } from "@/lib/icons-map"

interface CardButton {
  id: number
  Text: string
  Url: string
}

interface CardNestedItem {
  id: number
  Title: string
  Description: string
  Icon: string
  Color: string
  Button: CardButton
}

interface CardNestedData {
  __component: string
  id: number
  Title: string
  Subtitle: string
  Icon: string
  Description: string
  Cards: CardNestedItem[]
}

interface AIOptimizedResourcesProps {
  data: CardNestedData
}

export default function CardNested({ data }: AIOptimizedResourcesProps) {
  const IconComponent = getLucideIcon(data.Icon) || getLucideIcon("User")

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Card className={`bg-gradient-to-r from-${data.Cards[0]?.Color || "blue"}-900/20 to-${data.Cards[1]?.Color || "purple"}-900/20 border-${data.Cards[0]?.Color || "blue"}-500/30`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            {IconComponent && <IconComponent className="h-8 w-8 text-blue-400" />}
            <div>
              <CardTitle className="text-2xl text-white">{data.Title}</CardTitle>
              <p className="text-blue-200 mt-2">{data.Subtitle} | Last updated: January 24, 2025</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">{data.Description}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {data.Cards.map((card) => {
              const CardIcon = getLucideIcon(card.Icon) || getLucideIcon("User")
              return (
                <div
                  key={card.id}
                  className={`bg-${card.Color}-900/20 rounded-lg p-4 border border-${card.Color}-500/30`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {CardIcon && <CardIcon className={`h-5 w-5 text-${card.Color}-400`} />}
                    <span className="font-semibold text-white">{card.Title}</span>
                  </div>
                  <p className={`text-${card.Color}-200 text-sm mb-3 whitespace-pre-line`}>{card.Description}</p>
                  <Button onClick={() => window.open(card.Button.Url, "_blank")} size="sm" variant="outline" className={`border-${card.Color}-500/30 text-${card.Color}-300 hover:bg-${card.Color}-900/30 bg-transparent`}>
                    <span className="h-4 w-4 mr-2">↗</span>
                    {card.Button.Text}
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
