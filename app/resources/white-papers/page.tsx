"use client"

import PageLayout from "@/components/page-layout"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Calendar } from "lucide-react"

export default function WhitePapersPage() {
  const whitepapers = [
    {
      id: "sage-new-frontier",
      title: "The Rise of SAGE: Why Strategic AI Guidance & Execution is the New Frontier Beyond BI",
      description:
        "From insight to execution, discover how Strategic AI Guidance & Execution (SAGE) platforms are transforming business decision-making beyond traditional BI.",
      date: "May 2025",
      readTime: "15 min read",
      featured: true,
    },
    {
      id: "ai-business-unified-analytics",
      title:
        "AI in Business: Why Unified Analytics & Business Intelligence Platforms are the Future of Data-Driven Decisions",
      description:
        "Explore how unified analytics platforms are transforming business intelligence and why organizations are moving away from fragmented tools to comprehensive, AI-powered solutions.",
      date: "May 2025",
      readTime: "15 min read",
    },
    {
      id: "coming-soon-1",
      title: "The ROI of AI: Measuring the Business Impact of Artificial Intelligence",
      description:
        "A comprehensive guide to calculating and maximizing the return on investment for AI initiatives across different business functions.",
      date: "Coming Soon 2025",
      readTime: "",
      comingSoon: true,
    },
    {
      id: "coming-soon-2",
      title: "Data Governance in the Age of AI: Best Practices for Modern Enterprises",
      description:
        "Learn how to implement effective data governance strategies that balance innovation with compliance in AI-driven organizations.",
      date: "Coming Soon 2025",
      readTime: "",
      comingSoon: true,
    },
  ]

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            White Papers
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            In-depth research and analysis on AI, analytics, and business intelligence trends to help you make informed
            decisions.
          </p>
        </div>

        {/* Featured Whitepaper */}
        {whitepapers.find((wp) => wp.featured) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <span className="bg-emerald-900/60 text-emerald-400 px-3 py-1 rounded-full text-xs mr-3">NEW</span>
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{whitepapers.find((wp) => wp.featured)?.date}</span>
                  <span className="mx-2">•</span>
                  <span>{whitepapers.find((wp) => wp.featured)?.readTime}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  {whitepapers.find((wp) => wp.featured)?.title}
                </h2>

                <p className="text-gray-300 mb-6 md:text-lg">{whitepapers.find((wp) => wp.featured)?.description}</p>

                <Link
                  href={`/resources/white-papers/${whitepapers.find((wp) => wp.featured)?.id}`}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md"
                >
                  <span>Read Featured White Paper</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whitepapers
            .filter((wp) => !wp.featured)
            .map((whitepaper, index) => (
              <motion.div
                key={whitepaper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full ${
                  whitepaper.comingSoon ? "opacity-80" : ""
                }`}
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{whitepaper.date}</span>
                    {whitepaper.readTime && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{whitepaper.readTime}</span>
                      </>
                    )}
                  </div>

                  <h2 className="text-xl font-bold mb-3 text-white">{whitepaper.title}</h2>
                  <p className="text-gray-300 mb-6">{whitepaper.description}</p>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  {whitepaper.comingSoon ? (
                    <div className="inline-flex items-center text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Coming Soon</span>
                    </div>
                  ) : (
                    <Link
                      href={`/resources/white-papers/${whitepaper.id}`}
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <span>Read White Paper</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </PageLayout>
  )
}
