"use client"

import { LightbulbIcon, LineChart, Zap, Brain, MessageSquare, BarChart3, Workflow, Link2, Tag } from "lucide-react"
import ScrollReveal from "./scroll-reveal"

export default function Roadmap() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Vertical line */}
      <div className="absolute h-full w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 left-1/2 transform -translate-x-1/2 z-0"></div>

      {/* MVP Phase - RIGHT side */}
      <div className="relative z-10 mb-24 w-full">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:justify-end">
            <div className="order-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full p-4 shadow-lg shadow-blue-500/20">
              <div className="bg-[#0c0c14] rounded-full p-3">
                <MessageSquare className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="flex-1 order-2 text-left md:max-w-[350px]">
              <h3 className="text-2xl font-light mb-6 text-gray-400">MVP Phase</h3>
              <ul className="space-y-6 text-gray-300">
                <li className="flex md:flex-row-reverse items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="md:max-w-[300px]">
                    <p className="font-medium">NLP Query Engine</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Ask questions in plain language and receive structured insights
                    </p>
                  </div>
                </li>
                <li className="flex md:flex-row-reverse items-start gap-3">
                  <Link2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="md:max-w-[300px]">
                    <p className="font-medium">LinkDNA™ Correlation Engine</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Links records without shared IDs using synthetic identifiers
                    </p>
                  </div>
                </li>
                <li className="flex md:flex-row-reverse items-start gap-3">
                  <Tag className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="md:max-w-[300px]">
                    <p className="font-medium">Insight Labeling</p>
                    <p className="text-sm text-gray-400 mt-1">Automatically tags findings by business impact</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Version 1 - LEFT side */}
      <div className="relative z-10 mb-24 w-full">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="flex-1 order-2 md:order-1 text-left md:text-right md:max-w-[350px]">
              <h3 className="text-2xl font-light mb-6 text-gray-400">Version 1</h3>
              <ul className="space-y-6 text-gray-300">
                <li className="flex md:flex-row items-start gap-3">
                  <div className="md:max-w-[300px]">
                    <p className="font-medium">Graph Generation & Visuals via NLP</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Generate charts and visual summaries using natural language
                    </p>
                  </div>
                  <BarChart3 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                </li>
                <li className="flex md:flex-row items-start gap-3">
                  <div className="md:max-w-[300px]">
                    <p className="font-medium">Anomaly Detection</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Flag abnormal patterns in spend, usage, churn, and more
                    </p>
                  </div>
                  <LightbulbIcon className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                </li>
                <li className="flex md:flex-row items-start gap-3">
                  <div className="md:max-w-[300px]">
                    <p className="font-medium">Forecasting Engine</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Predict revenue, churn, and other KPIs based on historical patterns
                    </p>
                  </div>
                  <LineChart className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full p-4 shadow-lg shadow-purple-500/20">
              <div className="bg-[#0c0c14] rounded-full p-3">
                <LineChart className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Version 2 - RIGHT side */}
      <div className="relative z-10 w-full">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:justify-end">
            <div className="order-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full p-4 shadow-lg shadow-pink-500/20">
              <div className="bg-[#0c0c14] rounded-full p-3">
                <Brain className="h-8 w-8 text-pink-400" />
              </div>
            </div>
            <div className="flex-1 order-2 text-left md:max-w-[350px]">
              <h3 className="text-2xl font-light mb-6 text-gray-400">Version 2</h3>
              <ul className="space-y-6 text-gray-300">
                <li className="flex md:flex-row-reverse items-start gap-3">
                  <Zap className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div className="md:max-w-[300px]">
                    <p className="font-medium">"Act With ANDI" Assistant</p>
                    <p className="text-sm text-gray-400 mt-1">Suggests strategic actions based on detected insights</p>
                  </div>
                </li>
                <li className="flex md:flex-row-reverse items-start gap-3">
                  <Brain className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div className="md:max-w-[300px]">
                    <p className="font-medium">Root Cause Explorer</p>
                    <p className="text-sm text-gray-400 mt-1">Guides users to uncover the 'why' behind key trends</p>
                  </div>
                </li>
                <li className="flex md:flex-row-reverse items-start gap-3">
                  <Workflow className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div className="md:max-w-[300px]">
                    <p className="font-medium">Scenario Simulator</p>
                    <p className="text-sm text-gray-400 mt-1">Models the outcome of potential business changes</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
