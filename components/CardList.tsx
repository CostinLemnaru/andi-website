"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getLucideIcon } from "@/lib/icons-map"

export interface CardListItem {
  id: number
  Title: string
}

export interface CardListData {
  __component: string
  id: number
  Title: string
  Icon: string
  Color: string
  List: CardListItem[]
}


interface CardListProps {
  data: CardListData
}

export default function CardList({ data }: CardListProps) {
  const MainIcon = getLucideIcon(data.Icon) || getLucideIcon("FileText")

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { border: string; bg: string; text: string }> = {
      green: {
        border: "border-green-500/20",
        bg: "bg-green-900/10",
        text: "text-green-400",
      },
      blue: {
        border: "border-blue-500/20",
        bg: "bg-blue-900/10",
        text: "text-blue-400",
      },
      purple: {
        border: "border-purple-500/20",
        bg: "bg-purple-900/10",
        text: "text-purple-400",
      },
      red: {
        border: "border-red-500/20",
        bg: "bg-red-900/10",
        text: "text-red-400",
      },
      yellow: {
        border: "border-yellow-500/20",
        bg: "bg-yellow-900/10",
        text: "text-yellow-400",
      },
    }
    return (
      colorMap[color] || {
        border: "border-gray-500/20",
        bg: "bg-gray-900/10",
        text: "text-gray-400",
      }
    )
  }

  const colorClasses = getColorClasses(data.Color)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-12">
        <Card className="bg-gray-900/50 border-gray-700/50">
        <CardHeader>
            <CardTitle className={`text-xl text-white flex items-center gap-3`}>
            {MainIcon && <MainIcon className={`h-6 w-6 ${colorClasses.text}`} />}
            {data.Title}
            </CardTitle>
        </CardHeader>

        <CardContent>
            <div className="grid gap-4">
            {data.List?.map((item) => {
                const ItemIcon = getLucideIcon(data.Icon) || getLucideIcon("CheckCircle")
                return (
                <div
                    key={item.id}
                    className={`flex items-start gap-3 p-4 ${colorClasses.bg} ${colorClasses.border} rounded-lg`}
                >
                    {ItemIcon && (
                    <ItemIcon
                        className={`h-5 w-5 ${colorClasses.text} mt-0.5 flex-shrink-0`}
                    />
                    )}
                    <p className="text-gray-300">{item.Title}</p>
                </div>
                )
            })}
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
