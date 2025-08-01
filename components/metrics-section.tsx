"use client"

import { getLucideIcon } from "@/lib/icons-map"
import ScrollReveal from "@/components/scroll-reveal"

interface Metric {
  label: string
  status: string
  icon: string
  color: string
}

interface Category {
  title: string
  metrics: Metric[]
}

interface MetricsSectionProps {
  data: {
    Title: string
    Icon: string
    Config: {
      categories: Category[]
    }
  }
}

export default function MetricsSection({ data }: MetricsSectionProps) {
  const { Title, Icon, Config } = data
  const SectionIcon = getLucideIcon(Icon)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <ScrollReveal>
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 mb-16">
          <div className="flex items-center mb-6 justify-center">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-2 mr-4">
              {SectionIcon && <SectionIcon className="h-6 w-6 text-white" />}
            </div>
            <h3 className="text-xl font-medium text-white">{Title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Config.categories.map((cat, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg">
                <h4 className="font-medium text-white mb-4">{cat.title}</h4>
                <div className="space-y-4">
                {cat.metrics.map((metric, i) => {
                    const Icon = getLucideIcon(metric.icon)
                    return (
                    <div key={i}>
                        <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center gap-2 text-gray-400">
                            {Icon && (
                            <Icon className={`h-4 w-4 ${metric.color}`} />
                            )}
                            <span>{metric.label}</span>
                        </div>
                        <span className={metric.color}>{metric.status}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full"
                            style={{ width: `${Math.floor(40 + Math.random() * 60)}%` }}
                        />
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
