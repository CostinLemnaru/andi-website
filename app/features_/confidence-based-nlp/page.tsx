import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import { CheckCircle } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function ConfidenceBasedNLPPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Confidence-Based NLP Output"
        subtitle="Every insight comes with a confidence score and reasoning trail"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-12">
          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-3 mr-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-light text-white">Trust Your Insights</h2>
              </div>
              <p className="text-gray-300 mb-6">
                ANDI's Confidence-Based NLP Output delivers every insight with a confidence score and reasoning trail,
                so you always know how reliable the information is and can make decisions with complete transparency.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-white mb-4">Key Capabilities</h3>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Confidence Scoring</span> - Every insight includes a
                      numerical confidence score based on data quality, completeness, and analysis reliability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Reasoning Trails</span> - Transparent explanation of how
                      each insight was derived, including data sources and analytical methods.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Data Provenance</span> - Clear tracking of where
                      information originated and how it was processed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Audit-Ready Explanations</span> - Detailed documentation
                      suitable for compliance and governance requirements.
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
                The Confidence-Based NLP system uses advanced explainability techniques:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Explainability engine that documents the reasoning process</li>
                <li>Scoring model that evaluates confidence based on multiple factors</li>
                <li>Logic trace framework for transparency in AI decision-making</li>
                <li>Uncertainty quantification methods for statistical reliability</li>
                <li>Human-readable explanation generator</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <h3 className="text-xl font-medium text-white mb-4">Example Confidence Output</h3>
              <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-purple-400 font-medium">Insight:</p>
                  <p className="text-white">"Customer segment A has a 78% higher churn rate than segment B."</p>
                  <p className="text-purple-400 font-medium mt-2">Confidence Score: 92%</p>
                  <p className="text-gray-300 mt-2">
                    <span className="font-medium text-white">Reasoning:</span> This insight is based on complete
                    customer records from the past 12 months (98% data completeness), with statistically significant
                    sample sizes in both segments (&gt;500 customers each). The churn definition is consistent across
                    both segments, and the pattern has been stable for 3 consecutive quarters.
                  </p>
                  <p className="text-gray-300 mt-2">
                    <span className="font-medium text-white">Data Sources:</span> CRM customer records, billing system
                    cancellation data, support ticket history
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-purple-400 font-medium">Insight:</p>
                  <p className="text-white">
                    "Marketing campaign ROI has decreased by approximately 15% this quarter."
                  </p>
                  <p className="text-purple-400 font-medium mt-2">Confidence Score: 76%</p>
                  <p className="text-gray-300 mt-2">
                    <span className="font-medium text-white">Reasoning:</span> This insight is based on marketing spend
                    data (95% complete) and attributed revenue (82% complete). Attribution model has some limitations
                    for multi-touch conversions. Seasonal factors may also be influencing the trend but haven't been
                    fully isolated.
                  </p>
                  <p className="text-gray-300 mt-2">
                    <span className="font-medium text-white">Data Sources:</span> Marketing platform analytics, CRM
                    opportunity data, finance system
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  )
}
