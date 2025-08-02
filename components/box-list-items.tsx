"use client"

import GradientText from "./gradient-text"
import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import SectionCard from "@/components/section-card"
import { MessageSquare, CheckCircle } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"
import { getLucideIcon } from "@/lib/icons-map"

interface ListItem {
  id: number
  Title: string
  Description: string
  Color: string | null
}

interface BoxListItemsProps {
  __component: string
  id: number
  Title: string
  Icon: string
  Description: string
  ListTitle: string
  ListItems: ListItem[]
}

type Props = {
  data: BoxListItemsProps
}

export default function BoxListItems({ data }: Props) {
  const { Title, Description, ListTitle, ListItems, Icon: iconName } = data
  const Icon = getLucideIcon(iconName)

  return (
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-12 bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-3 mr-4">
                {Icon && <Icon className="h-8 w-8 text-white" />}
              </div>
              <h2 className="text-2xl font-light text-white">{Title}</h2>
            </div>

            <p className="text-gray-300 mb-6">{Description}</p>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white mb-4">{ListTitle}</h3>

              {ListItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">{item.Title}</span> – {item.Description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </div>
        </ScrollReveal>
    )
}
