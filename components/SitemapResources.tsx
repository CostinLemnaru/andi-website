"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getLucideIcon } from "@/lib/icons-map"

// Icone folosite în UI (importă-le cum trebuie sau adaptează)
import {
  Bot,
  FileText,
  Filter,
  Search,
  ExternalLink,
  TrendingUp,
  Globe,
  Calendar,
  Clock,
  User,
} from "lucide-react"

interface Resource {
  id: number
  Title: string
  Description: string
  Purpose: string
  Url: string
  Priority: string
  Changefreq: string
  Category: string
  Icon: string
  aiOptimized: boolean
}

interface SitemapResourcesData {
  __component: string
  id: number
  Resources: Resource[]
}

interface SitemapResourcesProps {
  data: SitemapResourcesData
}

export default function SitemapResources({ data }: SitemapResourcesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const categories = Array.from(new Set(data.Resources.map((r) => r.Category)))
  
  // Filtrare resurse după căutare, categorie și prioritate
  const filteredResources = useMemo(() => {
    return data.Resources.filter((r) => {
      const matchesSearch =
        r.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.Description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        categoryFilter === "all" || r.Category === categoryFilter

      const priorityNum = parseFloat(r.Priority)
      let matchesPriority = true
      if (priorityFilter === "high") matchesPriority = priorityNum >= 0.8
      else if (priorityFilter === "medium") matchesPriority = priorityNum >= 0.6 && priorityNum < 0.8
      else if (priorityFilter === "low") matchesPriority = priorityNum < 0.6

      return matchesSearch && matchesCategory && matchesPriority
    })
  }, [searchTerm, categoryFilter, priorityFilter, data.Resources])

  // Ajutor pentru culoarea badge-ului după prioritate numerică
  function getPriorityColor(priority: string) {
    const p = parseFloat(priority)
    if (p >= 0.8) return "bg-green-600 text-green-100"
    if (p >= 0.6) return "bg-yellow-600 text-yellow-100"
    return "bg-red-600 text-red-100"
  }

  // Eticheta prioritate
  function getPriorityLabel(priority: string) {
    const p = parseFloat(priority)
    if (p >= 0.8) return "High"
    if (p >= 0.6) return "Medium"
    return "Low"
  }

  // Icon wrapper
  function ResourceIcon({ icon }: { icon: string }) {
    const Icon = getLucideIcon(icon) || User
    return <Icon className="h-5 w-5 text-gray-300" />
  }

  // Numar total resurse si cate sunt optimizate AI
  const totalResources = data.Resources.length
  const aiOptimizedCount = data.Resources.filter((r) => r.aiOptimized).length

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Overview */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bot className="h-8 w-8 text-blue-400" />
            <div>
              <CardTitle className="text-2xl text-white">AI-Optimized Resources</CardTitle>
              <p className="text-blue-200 mt-2">
                {totalResources} total resources | {aiOptimizedCount} AI-optimized | Last updated: January 24, 2025
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-lg leading-relaxed">
            This hub provides both human-readable information and machine-readable resources for AI systems. Our
            content is structured with metadata, semantic markup, and clear categorization to help AI systems
            understand and analyze our platform effectively.
          </p>
          {/* (Poți adăuga cards suplimentare aici dacă vrei) */}
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-gray-900/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-3">
            <Filter className="h-6 w-6 text-purple-400" />
            Filter Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-600/50 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High (0.8+)</SelectItem>
                  <SelectItem value="medium">Medium (0.6-0.8)</SelectItem>
                  <SelectItem value="low">Low (&lt;0.6)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">AI Resources ({filteredResources.length})</h3>
          <Badge variant="outline" className="text-gray-300">
            {filteredResources.length} of {totalResources} resources
          </Badge>
        </div>

        <div className="grid gap-4">
          {filteredResources.map((resource) => {
            const Icon = getLucideIcon(resource.Icon) || User
            return (
              <Card
                key={resource.id}
                className="bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2 text-white">
                          <Icon className="h-5 w-5 text-gray-300" />
                          <h4 className="font-semibold text-white text-lg">{resource.Title}</h4>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(resource.Priority)}>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {getPriorityLabel(resource.Priority)}
                          </Badge>
                          {resource.aiOptimized && (
                            <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                              <Bot className="h-3 w-3 mr-1" />
                              AI Optimized
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-400 mb-2">{resource.Description}</p>
                      <p className="text-gray-500 text-sm mb-3 italic">{resource.Purpose}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          {resource.Url}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {resource.Changefreq}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {resource.Changefreq}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="text-xs text-gray-300">
                        {resource.Category}
                      </Badge>
                      <Link href={resource.Url}>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="bg-gray-800/30 rounded-md p-3">
                    <div className="text-xs text-gray-400 font-mono">
                      Priority: {resource.Priority} | Change Frequency: {resource.Changefreq} | Last Modified: N/A
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
