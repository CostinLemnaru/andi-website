import PageLayout from "@/components/page-layout"
import { PricingTiers } from "@/components/pricing-tiers"
import { FunctionalModules } from "@/components/functional-modules"
import { UsagePricing } from "@/components/usage-pricing"
import { PricingFAQ } from "@/components/pricing-faq"
import { PricingParticles } from "@/components/pricing-particles"
import { PlanComparison } from "@/components/plan-comparison"

export default function PricingPage() {
  return (
    <PageLayout
      title="Flexible Pricing for Every Business"
      subtitle="Pay for insights, not seats. Scale as your value grows."
    >
      <PricingParticles />
      <div className="space-y-24 py-10 relative z-10">
        <PricingTiers />
        <UsagePricing />
        <PlanComparison />
        <FunctionalModules />
        <PricingFAQ />
      </div>
    </PageLayout>
  )
}
