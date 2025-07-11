import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import { Tag, CheckCircle } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function InsightLabelingPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Insight Labeling"
        subtitle="Automatically tags findings by business impact to prioritize what matters most"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-12">
          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-3 mr-4">
                  <Tag className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-light text-white">Focus on What Matters Most</h2>
              </div>
              <p className="text-gray-300 mb-6">
                ANDI's Insight Labeling automatically tags findings by business impact (e.g., churn, revenue, cost) so
                you can immediately focus on the insights that will drive the greatest value for your business.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-white mb-4">Key Capabilities</h3>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Business Impact Classification</span> - Automatically
                      categorizes insights by their potential impact on key business metrics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Priority Scoring</span> - Assigns priority levels based
                      on urgency, impact magnitude, and actionability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Customizable Taxonomy</span> - Adapt the labeling system
                      to match your specific business priorities and KPIs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Role-Based Filtering</span> - Surface the most relevant
                      insights based on user role and responsibilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <h3 className="text-xl font-medium text-white mb-4">Technical Implementation</h3>
              <p className="text-gray-300 mb-6">
                The Insight Labeling system uses sophisticated classification algorithms to categorize insights:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Impact taxonomy model that defines categories and subcategories of business impact</li>
                <li>Tagging engine that analyzes insight content and context</li>
                <li>Insight classifier service that applies appropriate labels</li>
                <li>Machine learning models that improve classification accuracy over time</li>
                <li>User feedback loop to refine and customize labeling</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <h3 className="text-xl font-medium text-white mb-4">Common Insight Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Revenue Impact</p>
                  <p className="text-gray-300">
                    Insights that directly affect top-line growth, pricing optimization, or revenue leakage.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Cost Efficiency</p>
                  <p className="text-gray-300">
                    Findings related to operational costs, resource allocation, or process inefficiencies.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Churn Risk</p>
                  <p className="text-gray-300">
                    Indicators of potential customer attrition, satisfaction issues, or engagement decline.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Growth Opportunity</p>
                  <p className="text-gray-300">Potential areas for expansion, cross-selling, or market penetration.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  )
}
