"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, PieChart, TrendingUp, Users, Shield } from "lucide-react"

export default function KeyInsightsTabs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
      className="my-12"
    >
      <h3 className="text-xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Key Insights from the Whitepaper
      </h3>

      <Tabs defaultValue="market" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="market" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden md:inline">Market</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden md:inline">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden md:inline">Benefits</span>
          </TabsTrigger>
          <TabsTrigger value="adoption" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Adoption</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="market"
          className="bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6"
        >
          <h4 className="text-lg font-semibold mb-4 text-blue-400">Market Growth & Trends</h4>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>Demand for AI platforms is expected to grow ~40% annually over the next four years</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>
                The AI platform market is projected to soar from $27.9 billion in 2023 to $153 billion by 2028
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>90% of companies consider data and analytics crucial to their business strategy and success</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>
                Organizations are actively seeking solutions that offer "one-stop" analytics – combining business
                intelligence tools, data science, and data management in a single user-friendly platform
              </span>
            </li>
          </ul>
        </TabsContent>

        <TabsContent
          value="challenges"
          className="bg-gray-900/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
        >
          <h4 className="text-lg font-semibold mb-4 text-purple-400">Key Challenges with Fragmented Tools</h4>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>
                40% of business-critical data is trapped in isolated systems, making comprehensive analysis difficult
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>86% of organizations use at least two different BI platforms, and 61% use four or more</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Data silos can cost companies up to 30% of their annual revenue due to inefficiencies</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>
                60% of analytics professionals cite data integration challenges as a major barrier to trusting and using
                data effectively
              </span>
            </li>
          </ul>
        </TabsContent>

        <TabsContent
          value="benefits"
          className="bg-gray-900/40 backdrop-blur-sm border border-pink-500/20 rounded-lg p-6"
        >
          <h4 className="text-lg font-semibold mb-4 text-pink-400">Benefits of Unified Platforms</h4>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-start">
              <span className="text-pink-400 mr-2">•</span>
              <span>
                Single source of truth: Everyone from the CEO to a data analyst works off the same figures and
                dashboards
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2">•</span>
              <span>
                Seamless AI and BI integration: Advanced AI workflows live side-by-side with traditional business
                intelligence reporting
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2">•</span>
              <span>
                Broader adoption: Intuitive interfaces and natural language querying make analytics accessible to every
                decision-maker
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2">•</span>
              <span>
                Efficiency and cost savings: Fewer systems to maintain means lower overhead in licensing,
                infrastructure, and manpower
              </span>
            </li>
          </ul>
        </TabsContent>

        <TabsContent
          value="adoption"
          className="bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6"
        >
          <h4 className="text-lg font-semibold mb-4 text-blue-400">Adoption & Accessibility</h4>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>
                Traditional BI tools have typically been designed for specialists – only about 25% of the workforce
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>
                Only ~24% of companies today consider themselves fully data-driven, but 70% are striving to get there
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>
                Self-service analytics platforms with intuitive interfaces allow users at any level to explore data
                without technical expertise
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>Natural language querying is accelerating in adoption as a preferred interface for BI</span>
            </li>
          </ul>
        </TabsContent>

        <TabsContent
          value="security"
          className="bg-gray-900/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6"
        >
          <h4 className="text-lg font-semibold mb-4 text-purple-400">Security & Governance</h4>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>
                Unified data management greatly improves security by leveraging central controls and consistent
                governance
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>
                Only 46% of data professionals currently fully trust the data they use for decision-making, often due to
                patchwork processes
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>
                Centralized security controls and governance mean permissions, access logs, and data policies are
                managed in one place
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>
                Unified platforms simplify compliance with regulations since there's a clear audit trail and standard
                process for handling data
              </span>
            </li>
          </ul>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
