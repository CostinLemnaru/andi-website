import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import SectionCard from "@/components/section-card"
import { Brain, LineChart, Zap, MessageSquare, BarChart3 } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function ProductsPage() {
  return (
    <PageLayout>
      <PageHeader
        data={{
          Title: "Our Products",
          Subtitle: "Discover how ANDI's AI-powered solutions can transform your business intelligence"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ScrollReveal>
            <SectionCard
              title="ANDI Core Platform"
              description="The foundation of our AI intelligence layer that connects to your existing systems, learns from your data, and provides actionable insights without requiring you to change your tech stack."
              icon={<Brain className="h-6 w-6 text-white" />}
              link="/products/core-platform"
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionCard
              title="LinkDNA™ Correlation Engine"
              description="Our proprietary technology that creates traceable matches across disparate systems even without shared IDs, enabling holistic business intelligence across all your data sources."
              icon={<Zap className="h-6 w-6 text-white" />}
              link="/products/linkdna"
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <SectionCard
              title="Insight Labeling & Confidence Scoring"
              description="Advanced analytics that explain every insight with logic trails and audit-ready narratives, making your AI-driven decisions transparent and defensible."
              icon={<BarChart3 className="h-6 w-6 text-white" />}
              link="/products/insight-labeling"
            />
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <SectionCard
              title="Forecasting & Scenario Simulation"
              description="Powerful modeling tools that allow you to test different business scenarios and predict outcomes before committing resources."
              icon={<LineChart className="h-6 w-6 text-white" />}
              link="/products/forecasting"
            />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <SectionCard
              title="Conversational Interface"
              description="Talk to ANDI naturally via voice, dashboard, email, or embedded directly in tools like Slack, Teams, Notion, and more."
              icon={<MessageSquare className="h-6 w-6 text-white" />}
              link="/products/conversational-interface"
            />
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  )
}
