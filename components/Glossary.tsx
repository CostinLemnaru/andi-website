"use client"

import { useState, useEffect } from "react"
import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, BookOpen, Filter } from "lucide-react"

interface GlossaryTerm {
  term: string
  fullForm?: string
  definition: string
  category: string
}

interface GlossaryData {
  version: string
  lastUpdated: string
  terms: GlossaryTerm[]
}

export default function Glossary() {
  const [glossaryData, setGlossaryData] = useState<GlossaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [filteredTerms, setFilteredTerms] = useState<GlossaryTerm[]>([])

  useEffect(() => {
    async function fetchGlossary() {
      try {
        const response = await fetch("/glossary/index.json")
        if (!response.ok) {
          throw new Error("Failed to fetch glossary data.")
        }
        const data = await response.json()
        setGlossaryData(data)
        setFilteredTerms(data.terms)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.")
      } finally {
        setLoading(false)
      }
    }
    fetchGlossary()
  }, [])

  useEffect(() => {
    if (!glossaryData) return

    let filtered = glossaryData.terms

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((term) => term.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (term) =>
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (term.fullForm && term.fullForm.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Sort alphabetically
    filtered.sort((a, b) => a.term.localeCompare(b.term))

    setFilteredTerms(filtered)
  }, [searchTerm, selectedCategory, glossaryData])

  const categories = glossaryData ? [...new Set(glossaryData.terms.map((term) => term.category))].sort() : []
  const categoryColors: { [key: string]: string } = {
    "Core Technology": "bg-purple-600/20 text-purple-300 border-purple-500/30",
    Product: "bg-blue-600/20 text-blue-300 border-blue-500/30",
    Technology: "bg-green-600/20 text-green-300 border-green-500/30",
    Feature: "bg-yellow-600/20 text-yellow-300 border-yellow-500/30",
    General: "bg-gray-600/20 text-gray-300 border-gray-500/30",
    Analytics: "bg-cyan-600/20 text-cyan-300 border-cyan-500/30",
    Problem: "bg-red-600/20 text-red-300 border-red-500/30",
    Concept: "bg-indigo-600/20 text-indigo-300 border-indigo-500/30",
    Interface: "bg-pink-600/20 text-pink-300 border-pink-500/30",
    Metrics: "bg-orange-600/20 text-orange-300 border-orange-500/30",
    Infrastructure: "bg-teal-600/20 text-teal-300 border-teal-500/30",
    Process: "bg-lime-600/20 text-lime-300 border-lime-500/30",
    Management: "bg-amber-600/20 text-amber-300 border-amber-500/30",
    "Business Model": "bg-violet-600/20 text-violet-300 border-violet-500/30",
  }

  return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Stats and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-purple-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Knowledge Dictionary</h3>
                <p className="text-gray-400">
                  {glossaryData?.terms.length || 0} terms across {categories.length} categories
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800/50 border-gray-600/50 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all" className="text-white hover:bg-gray-700">
                  All Categories
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="bg-gray-900/50 border-gray-700/50">
                <CardHeader>
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <Card className="bg-red-900/20 border-red-500/30">
            <CardContent className="p-6 text-center">
              <p className="text-red-300">{error}</p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && glossaryData && (
          <>
            {/* Category Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categories.map((category) => {
                const termCount = glossaryData.terms.filter((term) => term.category === category).length
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? "all" : category)}
                    className={`p-3 rounded-lg border transition-all hover:scale-105 ${
                      selectedCategory === category
                        ? "bg-blue-600/30 border-blue-500/50"
                        : "bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50"
                    }`}
                  >
                    <Badge className={`mb-2 ${categoryColors[category] || categoryColors["General"]}`}>
                      {category}
                    </Badge>
                    <p className="text-sm text-gray-400">{termCount} terms</p>
                  </button>
                )
              })}
            </div>

            {/* Terms Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTerms.map((term, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/50 transition-colors"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white mb-2">{term.term}</CardTitle>
                        {term.fullForm && <p className="text-sm text-gray-400 font-mono">{term.fullForm}</p>}
                      </div>
                      <Badge className={`${categoryColors[term.category] || categoryColors["General"]} text-xs`}>
                        {term.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-300 leading-relaxed">{term.definition}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTerms.length === 0 && (searchTerm || selectedCategory !== "all") && (
              <Card className="bg-gray-900/50 border-gray-700/50">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">
                    No terms found {searchTerm && `matching "${searchTerm}"`}
                    {selectedCategory !== "all" && ` in category "${selectedCategory}"`}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">Try adjusting your search or browse all categories.</p>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card className="bg-gray-800/30 border-gray-600/30">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-400">
                  <span>Glossary Version: {glossaryData.version}</span>
                  <span>Last Updated: {glossaryData.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
  )
}