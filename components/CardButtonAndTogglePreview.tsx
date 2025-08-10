"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getLucideIcon } from "@/lib/icons-map"

interface CardButtonAndTogglePreviewProps {
  data: CardButtonAndTogglePreviewData
}

export interface MainButtonData {
  id: number
  Text: string
  Url: string
}

export interface CardButtonAndTogglePreviewData {
  __component: string
  id: number
  Title: string
  Icon: string
  Description: string
  PreviewContent: string
  MainButton: MainButtonData
}


export default function CardButtonAndTogglePreview({ data }: CardButtonAndTogglePreviewProps) {
  const [showJsonPreview, setShowJsonPreview] = useState(false)
  const MainIcon = getLucideIcon(data.Icon) || getLucideIcon("FileText")

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-12">
        <Card className="bg-gray-900/50 border-gray-700/50">
        <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
            {MainIcon && <MainIcon className="h-6 w-6 text-green-400" />}
            {data.Title}
            </CardTitle>
            <p className="text-gray-400 mt-2">{data.Description.trim()}</p>
        </CardHeader>

        <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
            <Button
                onClick={() => window.open(data.MainButton.Url, "_blank")}
                className="bg-green-600 hover:bg-green-700"
            >
                {MainIcon && <MainIcon className="h-4 w-4 mr-2" />}
                {data.MainButton.Text}
            </Button>

            <Button
                variant="outline"
                onClick={() => setShowJsonPreview(!showJsonPreview)}
            >
                {showJsonPreview ? "Hide" : "Show"} Preview
            </Button>
            </div>

            {showJsonPreview && (
            <div className="bg-gray-800/50 rounded-md p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                {data.PreviewContent}
                </pre>
            </div>
            )}
        </CardContent>
        </Card>
    </div>
  )
}
