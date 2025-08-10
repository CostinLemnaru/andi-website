"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getLucideIcon } from "@/lib/icons-map"

const formatText = (text: string) => {
  if (!text) return null
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **bold**
    .replace(/\n/g, "<br/>") // newline
}

export interface CardCodeBlockData {
  __component: string
  id: number
  Title: string
  Icon: string
  Color: string
  CodeBlockTitle: string
  CodeBlockText: string
  ColumnLeftText: string
  ColumnRightText: string
}


interface CardCodeBlockProps {
  data: CardCodeBlockData
}

export default function CardCodeBlock({ data }: CardCodeBlockProps) {
  const MainIcon = getLucideIcon(data.Icon) || getLucideIcon("FileText")

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-12">
        <Card className="bg-gray-900/50 border-gray-700/50">
        <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
            {MainIcon && <MainIcon className="h-6 w-6 text-blue-400" />}
            {data.Title}
            </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
            {/* Code Block */}
            <div>
            <h4 className="font-semibold text-white">{data.CodeBlockTitle}</h4>
            <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
                {data.CodeBlockText}
            </pre>
            </div>

            {/* Columns */}
            <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
                <div
                className="space-y-2 text-gray-300"
                dangerouslySetInnerHTML={{ __html: formatText(data.ColumnLeftText) || "" }}
                />
            </div>
            <div className="space-y-3">
                <div
                className="space-y-2 text-gray-300"
                dangerouslySetInnerHTML={{ __html: formatText(data.ColumnRightText) || "" }}
                />
            </div>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
