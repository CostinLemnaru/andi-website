"use client"

import { useState, useEffect } from "react"
import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FaqItem {
  question: string
  answer: string
}

interface FaqCategory {
  category: string
  questions: FaqItem[]
}

interface FaqData {
  version: string
  lastUpdated: string
  categories: FaqCategory[]
}

export default function Faqs() {
  const [faqData, setFaqData] = useState<FaqData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCategories, setFilteredCategories] = useState<FaqCategory[]>([])

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const response = await fetch("/faqs.json")
        if (!response.ok) {
          throw new Error("Failed to fetch FAQ data.")
        }
        const data = await response.json()
        setFaqData(data)
        setFilteredCategories(data.categories)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.")
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [])

  useEffect(() => {
    if (!faqData) return

    if (!searchTerm) {
      setFilteredCategories(faqData.categories)
      return
    }

    const filtered = faqData.categories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      }))
      .filter((category) => category.questions.length > 0)

    setFilteredCategories(filtered)
  }, [searchTerm, faqData])

  const totalQuestions = faqData?.categories.reduce((total, category) => total + category.questions.length, 0) || 0

  return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Stats and Search */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Knowledge Base</h3>
                <p className="text-gray-400">
                  {totalQuestions} questions across {faqData?.categories.length || 0} categories
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {loading && (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, categoryIndex) => (
              <Card key={categoryIndex} className="bg-gray-900/50 border-gray-700/50">
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-48 mb-4" />
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, questionIndex) => (
                      <div key={questionIndex} className="border-b border-gray-700/50 pb-3">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
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

        {!loading && !error && faqData && (
          <>
            {/* Category Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {faqData.categories.map((category) => (
                <div
                  key={category.category}
                  className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 text-center"
                >
                  <Badge variant="outline" className="mb-2 border-gray-500/50 text-gray-300">
                    {category.category}
                  </Badge>
                  <p className="text-sm text-gray-400">{category.questions.length} questions</p>
                </div>
              ))}
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {filteredCategories.map((category, categoryIndex) => (
                <Card key={category.category} className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">{category.category}</Badge>
                      <span className="text-gray-400 text-sm">
                        {category.questions.length} question{category.questions.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, questionIndex) => (
                        <AccordionItem
                          value={`category-${categoryIndex}-question-${questionIndex}`}
                          key={questionIndex}
                          className="border-gray-700/50"
                        >
                          <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-blue-300 transition-colors">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-base text-gray-300 leading-relaxed pt-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCategories.length === 0 && searchTerm && (
              <Card className="bg-gray-900/50 border-gray-700/50">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400">No FAQs found matching "{searchTerm}"</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Try a different search term or browse all categories above.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card className="bg-gray-800/30 border-gray-600/30">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-400">
                  <span>FAQ Version: {faqData.version}</span>
                  <span>Last Updated: {faqData.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
  )
}
