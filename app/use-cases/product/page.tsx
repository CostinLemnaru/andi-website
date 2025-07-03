import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import InsightSpotlight from "@/components/insight-spotlight"
import ScrollReveal from "@/components/scroll-reveal"

export default function ProductPage() {
  const challenges = [
    { text: "Usage data is siloed from revenue and support" },
    { text: "It's unclear what features drive growth or churn" },
    { text: "Feedback loops are too slow or anecdotal" },
    { text: "Product teams don't see the business impact of changes" },
  ]

  const capabilities = [
    { text: "Connects product usage, support tickets, revenue, and NPS in one view" },
    { text: "Flags adoption drops, usage spikes, or customer friction by cohort or feature" },
    { text: "Predicts churn based on behavioral signals" },
    { text: "Helps prioritize roadmap based on financial and customer impact" },
  ]

  const result =
    "Product teams make roadmap decisions with clarity, backed by real data from the field—not guesses or internal debates."

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
      <PageHeader title="Product" subtitle="Turn Usage, Feedback, and Financial Impact into One Insight Loop" />

      <InsightSpotlight title="Product Insights from ANDI" insights={insights} />

      <ModernChallengesCapabilities
        title="Product Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <h3 className="text-xl font-medium text-white mb-6 text-center">Feature Impact Analysis</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-gray-400 font-medium">Feature</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Adoption Rate</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Retention Impact</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Revenue Impact</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Priority Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="py-3 px-4 text-white">API Integrations</td>
                    <td className="py-3 px-4 text-yellow-400">34%</td>
                    <td className="py-3 px-4 text-green-400">+24%</td>
                    <td className="py-3 px-4 text-green-400">+32%</td>
                    <td className="py-3 px-4 text-purple-400 font-medium">92</td>
                  </tr>
                  <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="py-3 px-4 text-white">Data Visualization</td>
                    <td className="py-3 px-4 text-red-400">23%</td>
                    <td className="py-3 px-4 text-green-400">+18%</td>
                    <td className="py-3 px-4 text-green-400">+45%</td>
                    <td className="py-3 px-4 text-purple-400 font-medium">88</td>
                  </tr>
                  <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="py-3 px-4 text-white">Team Collaboration</td>
                    <td className="py-3 px-4 text-green-400">78%</td>
                    <td className="py-3 px-4 text-green-400">+15%</td>
                    <td className="py-3 px-4 text-green-400">+28%</td>
                    <td className="py-3 px-4 text-purple-400 font-medium">85</td>
                  </tr>
                  <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="py-3 px-4 text-white">Advanced Reporting</td>
                    <td className="py-3 px-4 text-yellow-400">42%</td>
                    <td className="py-3 px-4 text-yellow-400">+8%</td>
                    <td className="py-3 px-4 text-green-400">+22%</td>
                    <td className="py-3 px-4 text-purple-400 font-medium">76</td>
                  </tr>
                  <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="py-3 px-4 text-white">Mobile Access</td>
                    <td className="py-3 px-4 text-red-400">28%</td>
                    <td className="py-3 px-4 text-yellow-400">+6%</td>
                    <td className="py-3 px-4 text-yellow-400">+12%</td>
                    <td className="py-3 px-4 text-purple-400 font-medium">65</td>
                  </tr>
                  <tr className="hover:bg-gray-800/20">
                    <td className="py-3 px-4 text-white">Custom Branding</td>
                    <td className="py-3 px-4 text-green-400">68%</td>
                    <td className="py-3 px-4 text-gray-400">+2%</td>
                    <td className="py-3 px-4 text-yellow-400">+8%</td>
                    <td className="py-3 px-4 text-purple-400 font-medium">42</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              <p>
                Priority Score is calculated based on adoption rate, retention impact, revenue impact, and development
                effort.
              </p>
              <p>
                Green indicates positive performance, yellow indicates moderate concerns, and red indicates areas
                needing immediate attention.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageLayout>
  )
}
