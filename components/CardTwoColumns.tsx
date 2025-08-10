"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getLucideIcon } from "@/lib/icons-map"

const formatText = (text: string) => {
  if (!text) return null
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>")
}

const extractTitle = (text: string) => {
  if (!text) return ""
  const idx = text.indexOf("\n")
  return idx === -1 ? text : text.slice(0, idx).replace(/\*\*/g, "")
}

const colorMap = {
    yellow: {
      bg: "bg-yellow-900/20",
      border: "border-yellow-500/30",
      icon: "text-yellow-400",
    },
    orange: {
      bg: "bg-yellow-900/20",
      border: "border-yellow-500/30",
      icon: "text-yellow-400",
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
    red: {
      bg: "bg-red-900/20",
      border: "border-red-500/30",
      icon: "text-red-400",
    },
  } as const;

  type ColorKey = keyof typeof colorMap
export interface CardTwoColumnsData {
  __component: string
  id: number
  Title: string
  Icon: string
  Color: ColorKey
  LeftColumn: string
  RightColumn: string
}

interface CardTwoColumnsProps {
  data: CardTwoColumnsData
}


function wrapCodeBlocks(html: string | null) {
  if (!html) return "";
  return html.replace(/```([\s\S]*?)```/g, (_, code) => {
    return `<div class="bg-gray-800/50 rounded-md p-3 text-sm text-gray-300 font-mono">${code.trim()}</div>`;
  });
}

export default function CardTwoColumns({ data }: CardTwoColumnsProps) {
  const MainIcon = getLucideIcon(data.Icon) || getLucideIcon("Zap")

  

  const color = colorMap[data.Color] ?? colorMap.yellow

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
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-white">{extractTitle(data.LeftColumn)}</h4>
            <div
              className="space-y-2 text-gray-300"
               dangerouslySetInnerHTML={{ __html: wrapCodeBlocks(formatText(data.LeftColumn.replace(/^[^\n]*\n/, ""))) || "" }}

            />
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-white mt-0">{extractTitle(data.RightColumn)}</h4>
            <div
              className="space-y-2 text-gray-300"
               dangerouslySetInnerHTML={{ __html: wrapCodeBlocks(formatText(data.RightColumn.replace(/^[^\n]*\n/, ""))) || "" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
        </div>
  )
}
