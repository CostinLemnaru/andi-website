import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import SectionCard from "@/components/section-card"
import { DollarSign, LineChart, Layers, BarChart3, Settings } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"
import GradientText from "@/components/gradient-text"

export default function UseCasesPage() {
  return (
    <PageLayout>
      <PageHeader title="Functional Use Cases" subtitle="Built for how real business teams think, act, and lead" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ScrollReveal>
            <SectionCard
              title="Finance"
              description="The Business Brain Behind Every Line Item. Finance leaders move from back-office reporting to real-time financial strategy—confident, traceable, and faster than ever before."
              icon={<DollarSign className="h-6 w-6 text-white" />}
              link="/use-cases/finance"
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionCard
              title="Leadership"
              description="Clarity on What Matters. Confidence in What Comes Next. Leaders spend less time questioning the data and more time shaping outcomes—with forward-looking clarity in every decision."
              icon={<LineChart className="h-6 w-6 text-white" />}
              link="/use-cases/leadership"
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <SectionCard
              title="Product"
              description="Turn Usage, Feedback, and Financial Impact into One Insight Loop. Product teams make roadmap decisions with clarity, backed by real data from the field—not guesses or internal debates."
              icon={<Layers className="h-6 w-6 text-white" />}
              link="/use-cases/product"
            />
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <SectionCard
              title="Marketing"
              description="Make Every Dollar Count and Every Campaign Smarter. Marketing moves from 'launch and hope' to targeted, data-backed growth that proves ROI—and drives it higher."
              icon={<BarChart3 className="h-6 w-6 text-white" />}
              link="/use-cases/marketing"
            />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <SectionCard
              title="Operations"
              description="Operational Precision Without Manual Oversight. Ops leaders gain a live command center where the system thinks with them—reducing waste, accelerating throughput, and improving team performance."
              icon={<Settings className="h-6 w-6 text-white" />}
              link="/use-cases/operations"
            />
          </ScrollReveal>
        </div>

        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-light mb-6 text-gray-400">
              ANDI gives every team their own <GradientText>cognitive strategy layer</GradientText>
            </h2>
            <p className="text-lg text-gray-300">
              It doesn't matter if you're managing spend, people, projects, or product.
              <br />
              ANDI connects the dots, explains what's happening, and helps you decide what to do next.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  )
}
