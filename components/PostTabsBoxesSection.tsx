"use client"

import ScrollReveal from "@/components/scroll-reveal"
import InteractiveTimeline from "@/components/interactive-timeline"

type Tab = {
  id: number
  TabTitle: string
  TabContentTitle: string
  TabContentDescription: string
}

type Props = {
  data: {
    __component: string
    id: number
    Tabs: Tab[]
  }
}

export default function PostTabsBoxesSection({ data }: Props) {
  const events = data.Tabs.map((tab) => ({
    year: tab.TabTitle,
    title: tab.TabContentTitle,
    description: tab.TabContentDescription,
  }))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <InteractiveTimeline events={events} />
      </ScrollReveal>
    </div>
  )
}
