"use client"

import ScrollReveal from "@/components/scroll-reveal"
import { getLucideIcon } from "@/lib/icons-map"

interface MetricItem {
  icon: string
  color: string
  title: string
  change: string
  description: string
}

interface CenterBox {
  icon: string
  color: string
  title: string
  description: string
}

interface BusinessPulseConfig {
  id: number
  Title: string
  Subtitle: string
  Config: {
    centerBox: CenterBox
    metrics: MetricItem[]
  }
}

interface BusinessPulseSectionProps {
  __component: string
  id: number
  Title: string
  Config: BusinessPulseConfig
}

type Props = {
  data: BusinessPulseSectionProps
}

export default function BusinessPulseSection({ data }: Props) {
  const { Title, Config } = data
  const { Title: sectionTitle, Subtitle, Config: innerConfig } = Config
  const { centerBox, metrics } = innerConfig

  const CenterIcon = getLucideIcon(centerBox.icon)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {Title && (
        <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {Title}
          </span>
        </h2>
      )}

      <ScrollReveal>
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-3 mb-4 text-center">
              <h3 className="text-xl font-medium text-white">{sectionTitle}</h3>
              <p className="text-gray-400 mt-2">{Subtitle}</p>
            </div>

            {/* Left Column Metrics */}
            <div className="space-y-6">
              {metrics.slice(0, 3).map((metric, index) => {
                const Icon = getLucideIcon(metric.icon)
                return (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className={`h-4 w-4 ${metric.color}`} />}
                        <h4 className="font-medium text-white">{metric.title}</h4>
                      </div>
                      <span className={`${metric.color} text-sm`}>{metric.change}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{metric.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Center Box */}
            <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center text-center h-full">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4">
                {CenterIcon && <CenterIcon className={`h-6 w-6 ${centerBox.color}`} />}
            </div>
            <h4 className="font-medium text-white mb-2">{centerBox.title}</h4>
            <p className="text-gray-400 text-sm">{centerBox.description}</p>
            </div>

            {/* Right Column Metrics */}
            <div className="space-y-6">
              {metrics.slice(3).map((metric, index) => {
                const Icon = getLucideIcon(metric.icon)
                return (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className={`h-4 w-4 ${metric.color}`} />}
                        <h4 className="font-medium text-white">{metric.title}</h4>
                      </div>
                      <span className={`${metric.color} text-sm`}>{metric.change}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{metric.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
