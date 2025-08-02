"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import ScrollReveal from "./scroll-reveal"

interface Metric {
  label: string
  value: string
  color: string
}

interface Channel {
  name: string
  change: {
    text: string
    color: string
    icon: string
  }
  metrics: Metric[]
  insight: string
}

interface BudgetChannel {
  name: string
  change: string
  color: string
}

interface CampaignInsight {
  type: "top" | "underperforming"
  title: string
  description: string
  color: string
}

interface MarketingPerformanceDashboardProps {
  data: {
    Title: string
    Config: {
      channels: Channel[]
      budgetRecommendation: {
        title: string
        description: string
        channels: BudgetChannel[]
        impact: string
      }
      campaignPerformanceInsights: {
        title: string
        items: CampaignInsight[]
        recommendation: string
      }
    }
  }
}

export default function MarketingPerformanceDashboard({ data }: MarketingPerformanceDashboardProps) {
  const { Title, Config } = data

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {Title}
        </span>
      </h2>

      <ScrollReveal>
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
          {/* Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-3 mb-4 text-center">
              <h3 className="text-xl font-medium text-white">Channel Performance</h3>
              <p className="text-gray-400 mt-2">30-day performance metrics across marketing channels</p>
            </div>

            {Config.channels.map((channel, index) => {
              const isPositive = channel.change.icon === "trending-up"
              const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight

              return (
                <div key={index} className="bg-gray-800/50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-white">{channel.name}</h4>
                    <div className={`flex items-center gap-1 ${channel.change.color}`}>
                      <ChangeIcon className="h-4 w-4" />
                      <span className="text-sm">{channel.change.text}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {channel.metrics.map((metric, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">{metric.label}</span>
                          <span className={`${metric.color}`}>{metric.value}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${metric.color.replace(
                              "text-",
                              "from-"
                            )} ${metric.color.replace("text-", "to-")}`}
                            style={{ width: `${Math.floor(40 + Math.random() * 50)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-sm text-gray-400">
                    <p>{channel.insight}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Budget Recommendation */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h4 className="font-medium text-white mb-4">{Config.budgetRecommendation.title}</h4>
              <p className="text-gray-300 mb-4">{Config.budgetRecommendation.description}</p>

              <div className="space-y-3">
                {Config.budgetRecommendation.channels.map((ch, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-400">{ch.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white">{ch.change}</span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${ch.color.replace(
                            "text-",
                            "from-"
                          )} ${ch.color.replace("text-", "to-")}`}
                          style={{ width: `${Math.floor(40 + Math.random() * 50)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-400">
                <p>{Config.budgetRecommendation.impact}</p>
              </div>
            </div>

            {/* Campaign Insights */}
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h4 className="font-medium text-white mb-4">{Config.campaignPerformanceInsights.title}</h4>
              <div className="space-y-4">
                {Config.campaignPerformanceInsights.items.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${item.color.replace("text-", "bg-")}`}></div>
                      <span className="text-white font-medium">{item.title}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-400">
                <p>{Config.campaignPerformanceInsights.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
