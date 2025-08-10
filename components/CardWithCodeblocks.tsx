"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Code, Shield } from "lucide-react"
import { getLucideIcon } from "@/lib/icons-map"

interface ButtonData {
  id: number
  Text: string
  Url: string
}

interface CardWithCodeblocksData {
  __component: string
  id: number
  Title: string
  Icon: string
  Color: string
  CodeBlockTitle: string
  CodeBlockText: string
  Button: ButtonData
}

interface CardWithCodeblocksProps {
  data: CardWithCodeblocksData
}

export default function CardWithCodeblocks({ data }: CardWithCodeblocksProps) {
  const [showFullJson, setShowFullJson] = useState(false)

  const Icon = getLucideIcon(data.Icon) || Shield

  const jsonPreview = JSON.stringify(data, null, 2)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Card className={`bg-gradient-to-r from-${data.Color}-900/20 to-purple-900/20 border-${data.Color}-500/30`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Icon className={`h-8 w-8 text-${data.Color}-400`} />
            <div>
              <CardTitle className="text-2xl text-white">{data.Title}</CardTitle>
              <p className={`text-${data.Color}-200 mt-2`}>{data.CodeBlockTitle}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-300 text-lg leading-relaxed">{data.CodeBlockText}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => window.open(data.Button.Url, "_blank")}
              className={`bg-${data.Color}-500 hover:bg-${data.Color}-700`}
            >
              <Download className="h-4 w-4 mr-2" />
              {data.Button.Text}
            </Button>

            <Button variant="outline" onClick={() => setShowFullJson(!showFullJson)}>
              <Code className="h-4 w-4 mr-2" />
              {showFullJson ? "Hide" : "Show"} Full JSON
            </Button>
          </div>

          {showFullJson && (
            <div className="bg-gray-800/50 rounded-md p-4 overflow-x-auto mt-4">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">{jsonPreview}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
