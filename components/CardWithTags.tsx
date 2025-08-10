"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getLucideIcon } from "@/lib/icons-map"

export interface CardTag {
  id: number
  Name: string
  Icon: string
  Color: string
}

export interface CardWithTagsData {
  __component: string
  id: number
  Title: string
  Subtitle: string
  Description: string
  Icon: string
  Tags: CardTag[]
}

interface CardWithTagsProps {
  data: CardWithTagsData
}


export default function CardWithTags({ data }: CardWithTagsProps) {
  const MainIcon = getLucideIcon(data.Icon) || getLucideIcon("FileText")

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      green: "bg-green-600/20 text-green-300 border-green-500/30",
      blue: "bg-blue-600/20 text-blue-300 border-blue-500/30",
      purple: "bg-purple-600/20 text-purple-300 border-purple-500/30",
      red: "bg-red-600/20 text-red-300 border-red-500/30",
      yellow: "bg-yellow-600/20 text-yellow-300 border-yellow-500/30",
    }
    return colorMap[color] || "bg-gray-600/20 text-gray-300 border-gray-500/30"
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-12">
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardHeader>
            <div className="flex items-center gap-3">
            {MainIcon && <MainIcon className="h-8 w-8 text-blue-400" />}
            <div>
                <CardTitle className="text-2xl text-white">{data.Title}</CardTitle>
                <p className="text-blue-200 mt-2">{data.Subtitle}</p>
            </div>
            </div>
        </CardHeader>

        <CardContent className="space-y-4">
            <p className="text-gray-300 text-lg leading-relaxed">{data.Description}</p>

            <div className="flex flex-wrap gap-3">
            {data.Tags?.map((tag) => {
                const TagIcon = getLucideIcon(tag.Icon) || getLucideIcon("Tag")
                return (
                <Badge key={tag.id} className={getColorClasses(tag.Color)}>
                    {TagIcon && <TagIcon className="h-4 w-4 mr-1" />}
                    {tag.Name}
                </Badge>
                )
            })}
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
