import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import { Link2, CheckCircle } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function LinkDNAPage() {
  return (
    <PageLayout>
      <PageHeader
        title="LinkDNA™ Correlation Engine"
        subtitle="Links records without shared IDs using synthetic identifiers and fuzzy logic"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-12">
          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-3 mr-4">
                  <Link2 className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-light text-white">Connect Your Disconnected Data</h2>
              </div>
              <p className="text-gray-300 mb-6">
                ANDI's proprietary LinkDNA™ Correlation Engine creates traceable matches across CRMs, ERPs, support
                tools, and finance systems even without shared IDs. This breakthrough technology solves one of the
                biggest challenges in business intelligence: connecting data across siloed systems.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-white mb-4">Key Capabilities</h3>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Fuzzy Matching</span> - Identifies connections between
                      records even with inconsistent naming, formatting, or partial information.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Synthetic Identifiers</span> - Creates unique
                      fingerprints for entities across systems to enable reliable matching.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Confidence Scoring</span> - Every match includes a
                      confidence score so you know how reliable the connection is.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Traceable Logic</span> - See exactly why records were
                      matched, with full transparency into the matching criteria.
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
                The LinkDNA™ Correlation Engine uses advanced algorithms and machine learning to connect data across
                systems:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Data normalization services that standardize formats across systems</li>
                <li>Fuzzy matching algorithms that identify potential connections</li>
                <li>Record scoring engine that evaluates match quality</li>
                <li>Confidence-based decision layer that determines when to connect records</li>
                <li>Continuous learning from user feedback to improve matching accuracy</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <h3 className="text-xl font-medium text-white mb-4">Real-World Impact</h3>
              <p className="text-gray-300 mb-6">
                LinkDNA™ solves critical business challenges by connecting previously isolated data:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Customer 360° View</p>
                  <p className="text-gray-300">
                    Connect customer records across CRM, support tickets, billing systems, and usage analytics to get a
                    complete picture of customer health, value, and engagement.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Revenue Attribution</p>
                  <p className="text-gray-300">
                    Link marketing campaigns, sales activities, and revenue data to accurately attribute revenue to
                    specific channels, campaigns, or initiatives.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Churn Prevention</p>
                  <p className="text-gray-300">
                    Identify early warning signs by connecting product usage patterns, support interactions, and billing
                    data to predict and prevent customer churn.
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
