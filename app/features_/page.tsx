import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import SectionCard from "@/components/section-card"
import { MessageSquare, Link2, Tag, CheckCircle, Database } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"
import GradientText from "@/components/gradient-text"

export default function FeaturesPage() {
  return (
    <PageLayout>
      <PageHeader
        title="ANDI Features"
        subtitle="Empower business teams to turn disjointed, siloed, and inconsistent data into intelligent, actionable insights with zero code, zero clean-up, and total confidence."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <ScrollReveal>
            <SectionCard
              title="NLP Query Engine"
              description="Ask questions in plain language and receive structured insights. No more complex query languages or technical jargon."
              icon={<MessageSquare className="h-6 w-6 text-white" />}
              link="/features/nlp-query-engine"
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionCard
              title="LinkDNA™ Correlation Engine"
              description="Links records without shared IDs using synthetic identifiers and fuzzy logic, connecting data across disparate systems."
              icon={<Link2 className="h-6 w-6 text-white" />}
              link="/features/linkdna"
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <SectionCard
              title="Insight Labeling"
              description="Automatically tags findings by business impact (e.g., churn, revenue, cost) to prioritize what matters most."
              icon={<Tag className="h-6 w-6 text-white" />}
              link="/features/insight-labeling"
            />
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <SectionCard
              title="Confidence-Based NLP Output"
              description="Every insight comes with a confidence score and reasoning trail, so you always know how reliable the information is."
              icon={<CheckCircle className="h-6 w-6 text-white" />}
              link="/features/confidence-based-nlp"
            />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <SectionCard
              title="Multi-Dataset Analysis"
              description="Correlates siloed data sources like sales, finance, and marketing to provide a complete picture of your business."
              icon={<Database className="h-6 w-6 text-white" />}
              link="/features/multi-dataset-analysis"
            />
          </ScrollReveal>
        </div>

        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-light mb-6 text-gray-400">
              ANDI is not a dashboard. It's the <GradientText>thinking layer</GradientText> that makes your business
              more intelligent.
            </h2>
            <p className="text-lg text-gray-300">
              It doesn't just describe what's happening. It explains why, simulates what's next, and helps you act
              inside your workflow.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  )
}
