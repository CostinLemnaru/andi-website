import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import SectionCard from "@/components/section-card"
import { Server, Building, ShoppingBag, Stethoscope, Factory, Briefcase, GraduationCap } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"
import GradientText from "@/components/gradient-text"

export default function IndustriesPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Industries"
        subtitle="ANDI delivers tailored intelligence for your specific industry challenges"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <ScrollReveal>
            <SectionCard
              title="SaaS & Technology"
              description="Connect product usage, billing, and customer success data to predict churn, identify expansion opportunities, and optimize growth metrics."
              icon={<Server className="h-6 w-6 text-white" />}
              link="/industries/saas-technology"
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionCard
              title="Financial Services"
              description="Correlate risk data, client information, and transactions to improve compliance, detect fraud, and enhance client relationship management."
              icon={<Building className="h-6 w-6 text-white" />}
              link="/industries/financial-services"
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <SectionCard
              title="Retail & E-commerce"
              description="Connect inventory, marketing, and customer behavior data to optimize stock levels, improve promotions, and enhance customer loyalty."
              icon={<ShoppingBag className="h-6 w-6 text-white" />}
              link="/industries/retail-ecommerce"
            />
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <SectionCard
              title="Healthcare & Life Sciences"
              description="Unify clinical, operational, and financial data to improve patient outcomes, optimize resource allocation, and ensure compliance."
              icon={<Stethoscope className="h-6 w-6 text-white" />}
              link="/industries/healthcare"
            />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <SectionCard
              title="Manufacturing & Logistics"
              description="Connect sensor data, supply chain information, and production metrics to prevent downtime, optimize operations, and improve forecasting."
              icon={<Factory className="h-6 w-6 text-white" />}
              link="/industries/manufacturing-logistics"
            />
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <SectionCard
              title="Consulting & Professional Services"
              description="Link time tracking, project management, and client data to improve resource utilization, prevent budget overruns, and identify growth opportunities."
              icon={<Briefcase className="h-6 w-6 text-white" />}
              link="/industries/consulting-services"
            />
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <SectionCard
              title="Public Sector & Education"
              description="Unify funding, program performance, and operational data to improve resource allocation, demonstrate impact, and enhance transparency."
              icon={<GraduationCap className="h-6 w-6 text-white" />}
              link="/industries/public-sector-education"
            />
          </ScrollReveal>
        </div>

        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-light mb-6 text-gray-400">
              Every industry has disconnected signals. ANDI becomes the{" "}
              <GradientText>cognitive strategy layer</GradientText> that connects them.
            </h2>
            <p className="text-lg text-gray-300">
              No matter your industry, ANDI adapts to your specific data landscape, terminology, and business
              objectives.
              <br />
              It explains what's happening, predicts what's next, and helps you take action.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  )
}
