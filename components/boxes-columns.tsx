"use client"

import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getLucideIcon } from "@/lib/icons-map"
import ScrollReveal from "./scroll-reveal"

interface Spec {
  id: number
  Title: string
}

interface Item {
  id: number
  Title: string
  Description: string
  icon: string
  Specs: Spec[]
}

interface BoxesColumnsProps {
  data: {
    __component: string
    id: number
    Title: string
    whiteTheme?: boolean
    Columns?: "two" | "three"
    Items: Item[]
  }
}

export default function BoxesColumns({ data }: BoxesColumnsProps) {
  const { Title, Items, Columns = "two", whiteTheme = false } = data

  const gridCols =
    Columns === "three"
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2"

  const cardClasses = whiteTheme
    ? "rounded-lg border text-card-foreground shadow-sm bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10"
    : "backdrop-blur-sm bg-gray-900/30 border border-gray-800/50 hover:bg-gray-900/50"

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-light mb-16 text-center text-white">
            {Title}
          </h2>

          <div className={`grid gap-6 ${gridCols}`}>
            {Items.map((item, index) => {
              const Icon = getLucideIcon(item.icon)

              return (
                <ScrollReveal key={item.id} delay={index * 100}>
                  <Card
                    className={`${cardClasses} transition-all duration-300 h-full`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                          {Icon && <Icon className="w-5 h-5 text-purple-400" />}
                        </div>
                        <CardTitle className="text-white text-lg">{item.Title}</CardTitle>
                      </div>
                      <p className="text-gray-300 text-sm">{item.Description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {item.Specs.map((spec) => (
                          <li key={spec.id} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {spec.Title}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
