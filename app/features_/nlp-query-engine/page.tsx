import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import { MessageSquare, CheckCircle } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function NLPQueryEnginePage() {
  return (
    <PageLayout>
      {/* <PageHeader title="NLP Query Engine" subtitle="Ask questions in plain language and receive structured insights" /> */}

      {/* <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-12"> */}
          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-3 mr-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-light text-white">Natural Language Processing Power</h2>
              </div>
              <p className="text-gray-300 mb-6">
                ANDI's NLP Query Engine allows users to ask questions in plain language and receive structured insights.
                No more complex query languages or technical jargon. Simply type or speak your question, and ANDI will
                understand what you're asking and provide clear, actionable answers.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-white mb-4">Key Capabilities</h3>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Conversational Interface</span> - Ask follow-up questions
                      and refine your queries naturally, as if you were speaking with a human analyst.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Business Language Translation</span> - ANDI understands
                      business terminology and translates it into precise data queries behind the scenes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Context Awareness</span> - The system remembers previous
                      questions and maintains context throughout your conversation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Multi-Intent Recognition</span> - ANDI can understand
                      complex questions that involve multiple data points or comparisons.
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
                The NLP Query Engine is built on advanced language models and specialized for business intelligence
                queries. It includes:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>LLM/NLP model hosting (using fine-tuned models optimized for business queries)</li>
                <li>Natural language parser that breaks down complex questions</li>
                <li>Query translator that converts natural language to structured data queries</li>
                <li>Analytics layer integration that connects to your existing data sources</li>
                <li>Continuous learning from user interactions to improve accuracy over time</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8">
              <h3 className="text-xl font-medium text-white mb-4">Example Queries</h3>
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-purple-400 font-medium">Query:</p>
                  <p className="text-white">"Why did our customer acquisition cost increase last quarter?"</p>
                  <p className="text-purple-400 font-medium mt-2">ANDI's Response:</p>
                  <p className="text-gray-300">
                    "CAC increased by 23% last quarter primarily due to three factors: (1) Higher ad spend on
                    underperforming channels (+35% on social media with -5% conversion rate), (2) Seasonal competition
                    driving up PPC costs (+18% YoY), and (3) Longer sales cycles for enterprise deals (avg. +12 days). I
                    recommend reallocating budget from social to email campaigns which showed 2.3x better ROI."
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-purple-400 font-medium">Query:</p>
                  <p className="text-white">"Which customers are at risk of churning in the next 30 days?"</p>
                  <p className="text-purple-400 font-medium mt-2">ANDI's Response:</p>
                  <p className="text-gray-300">
                    "I've identified 14 high-risk accounts with &gt;65% churn probability. Top factors include:
                    declining product usage (-42% MoM), support ticket increases (+3 critical issues), and missed
                    renewal discussions. The accounts represent $283K in ARR. Would you like to see the detailed list
                    with recommended retention actions?"
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        {/* </div>
      </div> */}
    </PageLayout>
  )
}
