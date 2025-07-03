import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import CaseStudies from "@/components/case-studies"
import { LineChart, PieChart, BarChart3, Lightbulb } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function LeadershipPage() {
  const challenges = [
    { text: "Execs get conflicting reports from each team" },
    { text: "They want strategy—not spreadsheets" },
    { text: "Board and investor updates take weeks to compile" },
    { text: "Scenario planning is reactive, not predictive" },
  ]

  const capabilities = [
    { text: "Centralized insight stream from all departments" },
    { text: "Highlights key risks and opportunities by business outcome" },
    { text: "Scenario simulation lets leaders compare paths before committing" },
    { text: "Produces ready-to-share executive PDFs with plain-language insights" },
  ]

  const result =
    "Leaders spend less time questioning the data and more time shaping outcomes—with forward-looking clarity in every decision."

  const caseStudies = [
    {
      company: "Global SaaS Company",
      challenge:
        "The executive team was spending 70% of their meeting time debating data accuracy from different departments rather than making strategic decisions. Each function presented metrics that seemed to contradict others, creating confusion and delays.",
      solution:
        "ANDI created a unified executive dashboard that integrated data from all departments with consistent definitions and calculations. It highlighted strategic risks and opportunities with clear explanations of interdependencies between functions.",
      results: [
        "Executive meeting time spent on strategic discussion increased from 30% to 80%",
        "Decision cycle time decreased from weeks to days",
        "Cross-functional alignment improved dramatically according to internal surveys",
        "Board presentations became insight-driven rather than data-reconciliation exercises",
      ],
    },
    {
      company: "Mid-Market Retailer",
      challenge:
        "The leadership team struggled to make timely decisions about store expansions, inventory investments, and marketing allocations because they lacked a way to model different scenarios and their potential outcomes.",
      solution:
        "ANDI implemented a scenario planning capability that allowed executives to model the impact of different decisions across the business. Leaders could compare multiple scenarios side-by-side with clear projections of financial and operational outcomes.",
      results: [
        "Reduced planning cycle time by 65%",
        "Improved forecast accuracy by over 40%",
        "Successfully navigated supply chain disruptions by testing mitigation strategies",
        "Optimized new store opening strategy, improving ROI by 28%",
      ],
    },
    {
      company: "Healthcare Provider Network",
      challenge:
        "The executive team had limited visibility into how decisions in one area (staffing, patient scheduling, facility utilization) impacted outcomes in others, leading to unintended consequences and reactive management.",
      solution:
        "ANDI created an integrated leadership intelligence layer that showed the relationships between decisions and outcomes across the organization. It provided early warning of potential issues and recommended coordinated actions.",
      results: [
        "Improved resource utilization by 22% across facilities",
        "Reduced unexpected staffing shortages by 35%",
        "Increased patient satisfaction scores by 18 points",
        "Enabled proactive management of regulatory compliance",
      ],
    },
  ]

  return (
    <PageLayout>
      <PageHeader title="Leadership" subtitle="Clarity on What Matters. Confidence in What Comes Next." />

      <CaseStudies title="Leadership Success Stories" studies={caseStudies} />

      <ModernChallengesCapabilities
        title="Leadership Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h3 className="text-xl font-medium text-white mb-6 text-center">Executive Decision Support</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500/20 rounded-full p-2">
                    <LineChart className="h-5 w-5 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-medium text-white">Strategic Forecasting</h4>
                </div>
                <p className="text-gray-300">
                  ANDI provides executives with forward-looking projections that integrate data from across the
                  organization. Instead of relying on historical trends alone, leaders can see how current signals
                  predict future outcomes.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-500/20 rounded-full p-2">
                    <PieChart className="h-5 w-5 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-medium text-white">Resource Allocation</h4>
                </div>
                <p className="text-gray-300">
                  Make confident decisions about where to invest resources based on comprehensive impact analysis. ANDI
                  shows the potential return on different investments across departments, products, and initiatives.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-pink-500/20 rounded-full p-2">
                    <BarChart3 className="h-5 w-5 text-pink-400" />
                  </div>
                  <h4 className="text-lg font-medium text-white">Performance Monitoring</h4>
                </div>
                <p className="text-gray-300">
                  Track key business metrics in real-time with automatic alerts for significant changes. ANDI explains
                  not just what changed, but why it changed and what it means for the business.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/20 rounded-full p-2">
                    <Lightbulb className="h-5 w-5 text-green-400" />
                  </div>
                  <h4 className="text-lg font-medium text-white">Strategic Insights</h4>
                </div>
                <p className="text-gray-300">
                  Receive proactive insights about emerging opportunities and risks. ANDI connects patterns across the
                  business that might otherwise go unnoticed, helping leaders stay ahead of market changes.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageLayout>
  )
}
