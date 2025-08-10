"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { getLucideIcon } from "@/lib/icons-map"

export interface ResourceItem {
  id: number
  Title: string
  Icon: string
  Description: string
  Link: string
  TagName: string
}

export interface CardResourcesData {
  __component: string
  id: number
  Title: string
  Description: string
  Icon: string
  Resources: ResourceItem[]
}

interface CardResourcesProps {
  data: CardResourcesData
}

export default function CardResources({ data }: CardResourcesProps) {
  const MainIcon = getLucideIcon(data.Icon) || getLucideIcon("Database")
  const router = useRouter()

  const handleCardClick = (url: string) => {
    router.push(url)
  }

  const handleJsonClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation()
    window.open(url, "_blank")
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-12">

        <Card className="bg-gray-900/50 border-gray-700/50">
        <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3">
            {MainIcon && <MainIcon className="h-6 w-6 text-purple-400" />}
            {data.Title}
            </CardTitle>
            {data.Description && (
            <p className="text-gray-400 mt-2">{data.Description.trim()}</p>
            )}
        </CardHeader>

        <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.Resources.map((resource) => {
                const IconComponent = getLucideIcon(resource.Icon) || getLucideIcon("FileText")
                return (
                <div
                    key={resource.id}
                    className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6 hover:bg-gray-700/50 transition-colors cursor-pointer group"
                    onClick={() => handleCardClick(resource.Link)}
                >
                    <div className="flex items-start justify-between mb-4">
                    {IconComponent && (
                        <IconComponent className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    )}
                    <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                        {resource.TagName}
                        </Badge>
                        {/* Exemplu pentru jsonUrl dacă vei adăuga */}
                        {false && (
                        <button
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                            onClick={(e) => handleJsonClick(e, "/path-to-json")}
                            title="View raw JSON/XML"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </button>
                        )}
                    </div>
                    </div>
                    <h4 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {resource.Title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">{resource.Description}</p>
                    <div className="text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
                    View Resource →
                    </div>
                </div>
                )
            })}
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
