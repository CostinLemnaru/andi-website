import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import AutomationExamples from "@/components/automation-examples"
import { Globe, Database, Shield, Zap } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function EnterpriseOrganizationsPage() {
  const challenges = [
    { text: "Siloed systems across departments and geographies make it nearly impossible to correlate data" },
    { text: "Data volume and fragmentation overwhelm traditional dashboards" },
    { text: "Strategic decisions stall due to slow insight cycles" },
    { text: "Governance pressure requires all decisions to be traceable and defensible" },
  ]

  const capabilities = [
    { text: "LinkDNA™ correlation engine creates traceable matches across systems even without shared IDs" },
    { text: "Insight Labeling and Confidence Scoring explain every insight with logic trails" },
    { text: "Forecasting and Scenario Simulation allow execs to model outcomes" },
    { text: "Multi-tenant architecture supports secure deployments across regions and divisions" },
  ]

  const result =
    "Executives can make faster, smarter decisions based on holistic signals from the business—without waiting weeks for analysts to prep the data."

  const automationExamples = [
    {
      title: "Cross-Division Performance Analysis",
      description: "Identify performance patterns across business units and regions",
      steps: [
        {
          type: "ai",
          content:
            "I've analyzed performance across all divisions and identified that the APAC region is outperforming other regions in customer retention by 14 percentage points, despite similar product offerings and market conditions.",
        },
        {
          type: "human",
          content: "What's driving the difference in retention rates?",
        },
        {
          type: "ai",
          content:
            "After analyzing customer interactions, support tickets, and operational data, I've identified three key factors: 1) APAC's customer success team has 2.3x more proactive check-ins per account, 2) Their onboarding process includes more personalized training sessions, and 3) They have implemented a structured feedback loop with product teams.",
        },
        {
          type: "human",
          content: "Can we implement these practices in other regions? What would be the impact?",
        },
        {
          type: "ai",
          content:
            "Yes, I've modeled the potential impact of implementing these practices globally. Based on current retention rates and customer lifetime values, improving retention in other regions to match APAC would increase annual recurring revenue by approximately 8-12% within 12 months. Would you like me to prepare an implementation plan?",
        },
        {
          type: "human",
          content: "Yes, please prepare a phased implementation plan.",
        },
        {
          type: "system",
          content:
            "ANDI has generated a detailed implementation plan with resource requirements, timeline, and expected outcomes for each region.",
        },
      ],
      outcome:
        "The company implemented the best practices from APAC across all regions, resulting in a 9.5% increase in global retention rates within 9 months. This translated to significant revenue growth and improved customer satisfaction scores.",
    },
    {
      title: "Supply Chain Risk Management",
      description: "Identify and mitigate supply chain risks before they impact operations",
      steps: [
        {
          type: "ai",
          content:
            "I've detected early warning signs of potential supply chain disruptions affecting your semiconductor components. Three key suppliers in Taiwan are showing increased lead times and quality issues that could impact production in the next 60-90 days.",
        },
        {
          type: "human",
          content: "Which product lines would be affected and what are our options?",
        },
        {
          type: "ai",
          content:
            "Based on your current inventory and production schedules, this would primarily impact the Enterprise Server and Network Security product lines, potentially delaying $45-60M in revenue. Your options include: 1) Accelerating orders from alternative suppliers in South Korea, 2) Temporarily reallocating components from lower-priority products, or 3) Adjusting production schedules to prioritize high-margin products.",
        },
        {
          type: "human",
          content: "Let's explore options 1 and 3. What would the implementation look like?",
        },
        {
          type: "ai",
          content:
            "For option 1, I've identified three qualified alternative suppliers who can deliver within 45 days, though at a 12-18% price premium. For option 3, I've modeled a revised production schedule that prioritizes products with 60%+ gross margins, minimizing revenue impact while maintaining profitability.",
        },
        {
          type: "system",
          content:
            "ANDI has prepared detailed implementation plans for both options, including cost analysis, timeline, and impact assessment.",
        },
      ],
      outcome:
        "The company implemented a hybrid approach, securing additional components from alternative suppliers while optimizing the production schedule. This proactive response minimized disruption, limiting revenue delays to less than $10M and maintaining quarterly profit targets.",
    },
    {
      title: "Strategic M&A Target Identification",
      description: "Identify and evaluate potential acquisition targets",
      steps: [
        {
          type: "ai",
          content:
            "Based on your strategic growth objectives and market analysis, I've identified 15 potential acquisition targets that could fill your technology gaps in AI/ML capabilities and expand your market presence in healthcare and financial services.",
        },
        {
          type: "human",
          content: "Can you narrow this down to the top 3-5 candidates and provide more details?",
        },
        {
          type: "ai",
          content:
            "I've evaluated all candidates based on technology fit, cultural alignment, financial performance, and potential synergies. The top 4 candidates are: 1) TechVision AI (private, ~$50M revenue), 2) DataMind Solutions (private, ~$30M revenue), 3) HealthTech Analytics (public, ~$80M revenue), and 4) FinSight Technologies (private, ~$45M revenue).",
        },
        {
          type: "human",
          content:
            "Let's focus on the private companies. What would be the potential integration challenges and synergies?",
        },
        {
          type: "ai",
          content:
            "For TechVision AI, key synergies include complementary ML technology that would accelerate your product roadmap by ~12 months and add $15-20M in cross-sell opportunities. Main integration challenges include different technology stacks and potential cultural misalignment based on their more startup-oriented culture. For DataMind, stronger cultural alignment but less mature technology, though their healthcare expertise would strengthen your position in that vertical. FinSight offers the strongest financial services domain expertise and most compatible technology stack.",
        },
        {
          type: "system",
          content:
            "ANDI has prepared detailed profiles for each target company, including financial analysis, technology assessment, cultural fit evaluation, and potential integration plans.",
        },
      ],
      outcome:
        "The company pursued and successfully acquired FinSight Technologies, accelerating their entry into the financial services vertical and adding key AI capabilities to their platform. The integration proceeded smoothly due to the comprehensive pre-acquisition analysis and planning.",
    },
  ]

  return (
    <PageLayout>
      <PageHeader title="Enterprise Organizations" subtitle="For global organizations with complex structure" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-light mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Enterprise-Grade Intelligence
          </span>
        </h2>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 mb-4">
                  <Globe className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-white">Global Scale</h3>
              </div>
              <p className="text-gray-300">
                ANDI's enterprise architecture supports global deployments across multiple business units, regions, and
                departments. The multi-tenant design maintains data sovereignty while enabling cross-organization
                insights when appropriate.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Regions</p>
                  <p className="text-xl font-bold text-white">Global</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Languages</p>
                  <p className="text-xl font-bold text-white">25+</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Data Sources</p>
                  <p className="text-xl font-bold text-white">Unlimited</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Users</p>
                  <p className="text-xl font-bold text-white">Unlimited</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 mb-4">
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium text-white">Enterprise Security</h3>
              </div>
              <p className="text-gray-300">
                ANDI meets the most stringent security and compliance requirements of global enterprises. Our zero-trust
                architecture, end-to-end encryption, and comprehensive audit trails ensure your data remains secure and
                compliant.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">SOC 2 Type II</p>
                  <p className="text-xl font-bold text-green-400">Compliant</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">GDPR</p>
                  <p className="text-xl font-bold text-green-400">Compliant</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">HIPAA</p>
                  <p className="text-xl font-bold text-green-400">Compliant</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">ISO 27001</p>
                  <p className="text-xl font-bold text-green-400">Certified</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 mb-4">
                  <Database className="h-8 w-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-medium text-white">Data Integration</h3>
              </div>
              <p className="text-gray-300">
                ANDI connects to all your enterprise systems without disrupting existing workflows. Our LinkDNA™
                technology creates connections between records even without shared identifiers, solving the cross-system
                correlation challenge.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">ERP Systems</p>
                  <p className="text-xl font-bold text-white">All Major</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">CRM Platforms</p>
                  <p className="text-xl font-bold text-white">All Major</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Data Warehouses</p>
                  <p className="text-xl font-bold text-white">All Major</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Custom Systems</p>
                  <p className="text-xl font-bold text-white">Supported</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 mb-4">
                  <Zap className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-medium text-white">Enterprise AI</h3>
              </div>
              <p className="text-gray-300">
                ANDI's enterprise-grade AI capabilities are designed for the complexity and scale of global
                organizations. Our models are trained on business data and optimized for enterprise use cases, with full
                explainability and governance.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Model Governance</p>
                  <p className="text-xl font-bold text-white">Built-in</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Explainability</p>
                  <p className="text-xl font-bold text-white">100%</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Bias Detection</p>
                  <p className="text-xl font-bold text-white">Automated</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Custom Models</p>
                  <p className="text-xl font-bold text-white">Supported</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ModernChallengesCapabilities
        title="Enterprise Organizations Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <AutomationExamples title="How ANDI Works with Enterprise Organizations" examples={automationExamples} />
    </PageLayout>
  )
}
