import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function MarketingPage() {
  const challenges = [
    { text: "Marketing performance is disconnected from revenue and retention" },
    { text: "Campaign ROI is hard to measure across the funnel" },
    { text: "Teams over-invest in what feels urgent, not what truly performs" },
    { text: "Manual reporting kills time and agility" },
  ]

  const capabilities = [
    { text: "Connects ad spend, lead gen, sales outcomes, and retention" },
    { text: "Flags underperforming segments or channels in real time" },
    { text: "Simulates ROI impact of budget shifts across paid, email, or events" },
    { text: "Surfaces which campaigns drive actual revenue and LTV" },
  ]

  const result =
    'Marketing moves from "launch and hope" to targeted, data-backed growth that proves ROI—and drives it higher.'

  return (
    <PageLayout>
      <PageHeader title="Marketing" subtitle="Make Every Dollar Count and Every Campaign Smarter" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-light mb-8 text-center">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Marketing Performance Dashboard
          </span>
        </h2>

        <ScrollReveal>
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-3 mb-4">
                <h3 className="text-xl font-medium text-white text-center">Channel Performance</h3>
                <p className="text-gray-400 text-center mt-2">30-day performance metrics across marketing channels</p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-white">Paid Search</h4>
                  <div className="flex items-center gap-1 text-green-400">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm">+18%</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Cost per Lead</span>
                      <span className="text-green-400">$42 (-12%)</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Conversion Rate</span>
                      <span className="text-green-400">4.8% (+0.6%)</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Revenue Attribution</span>
                      <span className="text-green-400">3.2x ROAS</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <p>
                    ANDI Insight: High-intent keywords are outperforming branded terms. Consider reallocating 15% of
                    branded budget to high-intent keywords.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-white">Social Media</h4>
                  <div className="flex items-center gap-1 text-red-400">
                    <ArrowDownRight className="h-4 w-4" />
                    <span className="text-sm">-8%</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Cost per Lead</span>
                      <span className="text-red-400">$68 (+22%)</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Conversion Rate</span>
                      <span className="text-yellow-400">2.1% (-0.3%)</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full"
                        style={{ width: "58%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Revenue Attribution</span>
                      <span className="text-red-400">1.4x ROAS</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <p>
                    ANDI Insight: Performance is declining across platforms. Consider pausing underperforming campaigns
                    and testing new creative approaches.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-white">Email Marketing</h4>
                  <div className="flex items-center gap-1 text-green-400">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm">+24%</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Open Rate</span>
                      <span className="text-green-400">28% (+5%)</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Click-Through Rate</span>
                      <span className="text-green-400">4.2% (+0.8%)</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Revenue Attribution</span>
                      <span className="text-green-400">4.8x ROAS</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <p>
                    ANDI Insight: Personalized subject lines and segmented campaigns are driving strong performance.
                    Consider increasing email frequency for high-engagement segments.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <h4 className="font-medium text-white mb-4">Budget Optimization Recommendation</h4>
                <p className="text-gray-300 mb-4">
                  Based on current performance, ANDI recommends the following budget reallocation:
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Paid Search</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white">+15%</span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Social Media</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white">-30%</span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Email Marketing</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white">+25%</span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Content Marketing</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white">+10%</span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <p>Projected impact: +18% overall marketing ROI based on current performance trends.</p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg">
                <h4 className="font-medium text-white mb-4">Campaign Performance Insights</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span className="text-white font-medium">Top Performing: Product Demo Webinar</span>
                    </div>
                    <p className="text-gray-400 text-sm">5.2x ROAS, 32% conversion rate, $38 cost per lead</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span className="text-white font-medium">Top Performing: Case Study Email Series</span>
                    </div>
                    <p className="text-gray-400 text-sm">4.8x ROAS, 28% open rate, 5.2% click-through rate</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <span className="text-white font-medium">Underperforming: Social Media Contest</span>
                    </div>
                    <p className="text-gray-400 text-sm">0.8x ROAS, high engagement but low conversion quality</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <span className="text-white font-medium">Underperforming: Generic Display Ads</span>
                    </div>
                    <p className="text-gray-400 text-sm">1.1x ROAS, high impression count but low click-through rate</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <p>
                    ANDI Recommendation: Scale successful webinar and email formats while pausing underperforming social
                    and display campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ModernChallengesCapabilities
        title="Marketing Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />
    </PageLayout>
  )
}
