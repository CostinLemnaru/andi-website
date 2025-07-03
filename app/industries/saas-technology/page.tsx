import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import InsightSpotlight from "@/components/insight-spotlight"
import { Lightbulb } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function SaasTechnologyPage() {
  const challenges = [
    {
      text: "Revenue leakage happens because product usage, customer success, and billing data live in separate systems",
    },
    { text: "Churn warning signs are buried in support tickets and usage logs" },
    { text: "Expansion opportunities are missed because customer health data is scattered" },
    { text: "Teams spend weeks manually gathering data for board meetings" },
    { text: "Product teams can't see how features actually impact revenue and retention" },
    { text: "Growth decisions are based on incomplete data, leading to wasted resources" },
  ]

  const capabilities = [
    { text: "Connects product usage, billing, CRM, and support systems" },
    { text: "Spots early churn risks by analyzing usage drops, support issues, and payment patterns" },
    { text: "Identifies upsell and cross-sell opportunities based on usage patterns" },
    { text: "Creates executive-ready reports that explain key metrics and trends" },
    { text: "Shows which features drive revenue and retention for product roadmap prioritization" },
    { text: "Tests different scenarios before you invest resources" },
  ]

  const result =
    "SaaS and technology companies gain a unified intelligence layer that connects product, customer, and financial data to drive growth, reduce churn, and optimize unit economics."

  const insights = [
    {
      observation:
        "Enterprise customers who use your API integration features have a 92% retention rate compared to 68% for those who don't. However, only 34% of enterprise customers have successfully implemented these integrations.",
      recommendation:
        "Create an integration adoption program targeting the 66% of enterprise customers not using APIs. Prioritize the 28 accounts with renewal dates in the next 90 days.",
      impact:
        "Increasing API adoption among enterprise customers could potentially reduce churn by 24%, representing significant annual recurring revenue protection.",
    },
    {
      observation:
        "Free users who discover your data visualization features are 3.2x more likely to convert to paid plans, but only 23% of free users ever find these features in the current UI.",
      recommendation:
        "Redesign the free user onboarding flow to highlight data visualization capabilities within the first 7 days. Add an in-app tutorial specifically for this feature set.",
      impact:
        "Based on current conversion rates, improving feature discovery could increase free-to-paid conversion by approximately 40-50%.",
    },
    {
      observation:
        "Support tickets about performance issues have increased 47% in the last 30 days, concentrated among customers using your reporting module. Usage data shows these reports are processing 3x more data than six months ago.",
      recommendation:
        "Implement query optimization for the reporting module and add database indexes for the most common report types. Consider adding a caching layer for frequently run reports.",
      impact:
        "Similar optimizations have reduced report processing time by 65-80% in other modules, which would bring performance back to acceptable levels and reduce support ticket volume.",
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="SaaS & Technology"
        subtitle="Connect product, customer, and financial signals for sustainable growth"
      />

      <InsightSpotlight title="SaaS & Technology Insights from ANDI" insights={insights} />

      <ModernChallengesCapabilities
        title="SaaS & Technology Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 mb-16">
            <div className="flex items-center mb-6 justify-center">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-2 mr-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white">SaaS Metrics Dashboard</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <h4 className="font-medium text-white mb-2">Customer Acquisition</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">CAC Trend</span>
                      <span className="text-yellow-400">⚠️ Increasing</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Conversion Rate</span>
                      <span className="text-green-400">✓ Stable</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full"
                        style={{ width: "72%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Trial-to-Paid</span>
                      <span className="text-green-400">↑ Improving</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full"
                        style={{ width: "58%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg">
                <h4 className="font-medium text-white mb-2">Retention & Growth</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Gross Retention</span>
                      <span className="text-green-400">✓ Strong</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Net Retention</span>
                      <span className="text-green-400">↑ Growing</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                        style={{ width: "112%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Expansion Revenue</span>
                      <span className="text-yellow-400">⚠️ Slowing</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg">
                <h4 className="font-medium text-white mb-2">Product Health</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Feature Adoption</span>
                      <span className="text-yellow-400">⚠️ Mixed</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full"
                        style={{ width: "62%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Active Usage</span>
                      <span className="text-green-400">↑ Growing</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Support Volume</span>
                      <span className="text-red-400">⚠️ High</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageLayout>
  )
}
