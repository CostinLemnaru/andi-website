"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getLucideIcon } from "@/lib/icons-map"

const formatContent = (text: string) => {
  if (!text) return null
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>")
}

interface CardSimpleProps {
  data: CardSimpleData
}


const colorMap = {
  orange: {
    bg: "bg-yellow-900/20",
    border: "border-yellow-500/30",
    icon: "text-yellow-400",
  },
  yellow: {
    bg: "bg-yellow-900/20",
    border: "border-yellow-500/30",
    icon: "text-yellow-400",
  },
  red: {
    bg: "bg-red-900/20",
    border: "border-red-500/30",
    icon: "text-red-400",
  },
  blue: {
    bg: "bg-blue-900/20",
    border: "border-blue-500/30",
    icon: "text-blue-400",
  },
  green: {
    bg: "bg-green-900/20",
    border: "border-green-500/30",
    icon: "text-green-400",
  },
} as const

// Tipul tuturor cheilor colorMap
type ColorKey = keyof typeof colorMap

export interface CardSimpleData {
  __component: string
  id: number
  Title: string
  Icon: string
  Content: string
  FooterText: string
  Color: ColorKey
}



export default function CardSimple({ data }: CardSimpleProps) {
  const MainIcon = getLucideIcon(data.Icon) || getLucideIcon("FileText")
  const color = colorMap[data.Color] || colorMap.orange

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-12">

        <Card className={`${color.bg} ${color.border}`}>
        <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
            {MainIcon && <MainIcon className={`h-6 w-6 ${color.icon}`} />}
            {data.Title}
            </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
            <div
            className="text-gray-300 space-y-3"
            dangerouslySetInnerHTML={{ __html: formatContent(data.Content) || "" }}
            />
            <div className="pt-4 border-t border-gray-600/50">
            <p className="text-gray-400 text-sm">
                {data.FooterText.split("contact us at ")[0]}
                <a
                href="mailto:hello@zamora.ai"
                className="text-blue-400 hover:text-blue-300"
                >
                hello@zamora.ai
                </a>
            </p>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
