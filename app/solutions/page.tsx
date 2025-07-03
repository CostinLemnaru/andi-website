import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import SectionCard from "@/components/section-card"
import { Home, Building, Building2 } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function SolutionsPage() {
  return (
    <PageLayout>
      <PageHeader title="Segments" subtitle="Tailored to ANDI's Value as a Strategic AI Intelligence Layer" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ScrollReveal>
            <SectionCard
              title="Emerging Businesses"
              description="For fast-moving teams with lean resources. Emerging businesses gain the superpower of a virtual analyst who watches the business 24/7, surfaces what matters, and helps you take action before it costs you."
              icon={<Home className="h-6 w-6 text-white" />}
              link="/solutions/emerging-businesses"
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionCard
              title="Growth Companies"
              description="For scaling organizations with cross-functional complexity. Growth companies can act on insights in real time, align faster across functions, and drive compounding improvements each quarter."
              icon={<Building className="h-6 w-6 text-white" />}
              link="/solutions/growth-companies"
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <SectionCard
              title="Enterprise Organizations"
              description="For global organizations with complex structure. ANDI helps executives make faster, smarter decisions based on holistic signals from the business, without waiting weeks for analysts to prep the data."
              icon={<Building2 className="h-6 w-6 text-white" />}
              link="/solutions/enterprise-organizations"
            />
          </ScrollReveal>
        </div>

        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-light mb-6 text-gray-400">
              ANDI is not a dashboard. It's the thinking layer that makes your business more intelligent—without adding
              headcount.
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
