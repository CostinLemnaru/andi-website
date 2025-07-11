import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import { Database, CheckCircle } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function MultiDatasetAnalysisPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Multi-Dataset Analysis"
        subtitle="Correlate siloed data sources for a complete picture of your business"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-12">
          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-3 mr-4">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-light text-white">Break Down Data Silos</h2>
              </div>
              <p className="text-gray-300 mb-6">
                ANDI's Multi-Dataset Analysis correlates siloed data sources like sales, finance, and marketing to
                provide a complete picture of your business. No more switching between systems or manually combining
                reports.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-white mb-4">Key Capabilities</h3>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Cross-System Correlation</span> - Connect and analyze
                      data across disparate systems without complex integration projects.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Schema-Flexible Ingestion</span> - Works with
                      inconsistent data formats and structures across different sources.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Unified Analysis</span> - Ask questions that span
                      multiple systems in a single query.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">No-Code Connection</span> - Connect to your data sources
                      without complex ETL or data engineering.
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
                The Multi-Dataset Analysis system uses advanced data integration techniques:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Multi-source ingestion layer that connects directly to various systems</li>
                <li>Schema-mapping module that normalizes data structures</li>
                <li>Cross-dataset join service that connects related information</li>
                <li>Unified query processor that works across all connected sources</li>
                <li>Secure data access controls that respect source system permissions</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <h3 className="text-xl font-medium text-white mb-4">Supported Data Sources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">CRM Systems</p>
                  <p className="text-gray-300">Salesforce, HubSpot, Microsoft Dynamics, etc.</p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Financial Systems</p>
                  <p className="text-gray-300">QuickBooks, NetSuite, Xero, etc.</p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Marketing Platforms</p>
                  <p className="text-gray-300">Google Analytics, HubSpot, Marketo, etc.</p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Support Systems</p>
                  <p className="text-gray-300">Zendesk, Intercom, Freshdesk, etc.</p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Product Analytics</p>
                  <p className="text-gray-300">Mixpanel, Amplitude, Pendo, etc.</p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-white font-medium">Custom Data</p>
                  <p className="text-gray-300">CSV files, databases, APIs, etc.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  )
}
