import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import CaseStudies from "@/components/case-studies"
import { LineChart, BarChart3, Users, ArrowUpRight, AlertTriangle } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function GrowthCompaniesPage() {
  const challenges = [
    { text: "Rapid SaaS tool growth leads to fragmented KPIs between teams" },
    { text: "Analysts are bottlenecks, and BI tools require too much upkeep" },
    { text: "Leadership wants strategy insights but teams are stuck in reporting cycles" },
    { text: "Scenarios are guessed, not modeled, due to lack of forecasting capabilities" },
  ]

  const capabilities = [
    { text: "Multi-source ingestion layer plugs directly into your tools without needing a warehouse" },
    { text: "Anomaly detection and churn prediction surface early warnings" },
    { text: "Root cause explorer helps teams understand what's driving results" },
    { text: "Action playbooks let teams trigger tasks without coding" },
  ]

  const result =
    "Growth companies act on insights in real time, align faster across functions, and drive compounding improvements each quarter."

  const caseStudies = [
    {
      company: "B2B SaaS Platform",
      challenge:
        "The company was experiencing inconsistent growth across different customer segments and couldn't identify which acquisition channels and product features were driving the most valuable customers.",
      solution:
        "ANDI connected their CRM, product analytics, and financial systems to create a unified view of the customer journey from acquisition through retention and expansion.",
      results: [
        "Identified that mid-market customers from content marketing had 2.3x higher LTV",
        "Discovered specific feature adoption patterns that predicted expansion revenue",
        "Reallocated marketing budget to highest-performing channels, improving CAC by 28%",
        "Created targeted onboarding flows that increased key feature adoption by 42%",
      ],
    },
    {
      company: "E-commerce Marketplace",
      challenge:
        "The company was scaling rapidly but struggling with inconsistent data across their marketing, inventory, and customer service systems, leading to reactive decision-making and missed opportunities.",
      solution:
        "ANDI implemented a cross-functional intelligence layer that connected all their systems and provided real-time insights and recommendations to each department.",
      results: [
        "Reduced stockouts by 35% through predictive inventory management",
        "Improved customer retention by 22% with early warning system for at-risk accounts",
        "Optimized marketing spend across channels, improving ROAS by 40%",
        "Enabled data-driven decisions without expanding the analytics team",
      ],
    },
    {
      company: "FinTech Startup",
      challenge:
        "The company had recently raised a Series B and needed to scale efficiently while maintaining compliance and security. Their existing analytics couldn't keep up with growth or provide the insights needed for strategic decisions.",
      solution:
        "ANDI created a secure, compliant intelligence layer that connected their financial, customer, and operational data while maintaining strict data governance.",
      results: [
        "Accelerated reporting cycles from weeks to hours",
        "Identified high-potential customer segments that were previously overlooked",
        "Improved operational efficiency by 32% through process optimization",
        "Maintained compliance while scaling from 50 to 200 employees",
      ],
    },
  ]

  return (
    <PageLayout>
      <PageHeader title="Growth Companies" subtitle="For scaling organizations with cross-functional complexity" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Growth Stage Intelligence
          </span>
        </h2>

        <ScrollReveal>
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-3 mb-4">
                <h3 className="text-xl font-medium text-white text-center">Real-Time Business Pulse</h3>
                <p className="text-gray-400 text-center mt-2">
                  ANDI continuously monitors your key metrics and alerts you to significant changes
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-400" />
                      <h4 className="font-medium text-white">Customer Acquisition</h4>
                    </div>
                    <span className="text-green-400 text-sm">+18% MoM</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    New customer growth is accelerating, primarily driven by referrals and content marketing.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <h4 className="font-medium text-white">Churn Rate</h4>
                    </div>
                    <span className="text-yellow-400 text-sm">+3% MoM</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Slight increase in churn among SMB customers, potentially related to recent pricing changes.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-blue-400" />
                      <h4 className="font-medium text-white">Revenue Growth</h4>
                    </div>
                    <span className="text-blue-400 text-sm">+22% MoM</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Revenue growth outpacing customer acquisition due to successful expansion strategies.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col justify-center">
                <div className="text-center">
                  <div className="inline-block bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 mb-4">
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                  <h4 className="font-medium text-white mb-2">Cross-Functional Alignment</h4>
                  <p className="text-gray-400 text-sm">
                    ANDI connects data across departments to create a single source of truth, aligning teams around
                    common goals and metrics.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <h4 className="font-medium text-white">Support Volume</h4>
                    </div>
                    <span className="text-red-400 text-sm">+32% WoW</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Significant increase in support tickets following the latest product release, primarily related to
                    the new reporting feature.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-400" />
                      <h4 className="font-medium text-white">Feature Adoption</h4>
                    </div>
                    <span className="text-green-400 text-sm">+45% MoM</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Strong adoption of the new collaboration features, particularly among enterprise customers.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <LineChart className="h-4 w-4 text-purple-400" />
                      <h4 className="font-medium text-white">Cash Runway</h4>
                    </div>
                    <span className="text-purple-400 text-sm">18 months</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Current burn rate and revenue projections indicate 18 months of runway, in line with growth targets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ModernChallengesCapabilities
        title="Growth Companies Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <CaseStudies title="Growth Company Success Stories" studies={caseStudies} />
    </PageLayout>
  )
}
