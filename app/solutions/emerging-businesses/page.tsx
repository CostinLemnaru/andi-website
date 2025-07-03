import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import AutomationExamples from "@/components/automation-examples"
import { TrendingUp, Users, DollarSign, Clock } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function EmergingBusinessesPage() {
  const challenges = [
    { text: "No dedicated data team means performance issues are spotted too late" },
    { text: "Important signals are buried across tools like QuickBooks, HubSpot, spreadsheets" },
    { text: "Decisions are gut-based rather than insight-led" },
    { text: "Tool fatigue makes leaders cautious of adding another platform" },
  ]

  const capabilities = [
    { text: "No-code setup connects directly to the tools you already use" },
    { text: "Conversational interface lets any user ask questions and get answers" },
    { text: "Prebuilt alerts notify users of churn risks, spend anomalies, or forecast slippage" },
    { text: "Action recommendations suggest specific next steps inside your systems" },
  ]

  const result =
    "Emerging businesses gain the superpower of a virtual analyst who watches the business 24/7, surfaces what matters, and helps you take action—before it costs you."

  const automationExamples = [
    {
      title: "Cash Flow Monitoring",
      description: "Keep track of your cash position and upcoming obligations",
      steps: [
        {
          type: "ai",
          content:
            "Based on your current accounts receivable aging and upcoming expenses, I'm projecting a potential cash flow constraint in 45 days.",
        },
        {
          type: "human",
          content: "What's causing this and what can we do about it?",
        },
        {
          type: "ai",
          content:
            "The main factors are: 1) Three large customer invoices ($28K total) that are 15+ days overdue, and 2) Quarterly tax payment coming due. I recommend following up with these specific customers immediately and potentially delaying non-essential expenses.",
        },
        {
          type: "human",
          content: "Can you draft follow-up emails for the overdue invoices?",
        },
        {
          type: "ai",
          content:
            "I've drafted personalized follow-up emails for each overdue account based on their payment history and relationship status. Would you like to review them before sending?",
        },
        {
          type: "human",
          content: "Yes, let me review them first.",
        },
        {
          type: "system",
          content:
            "ANDI has prepared three email drafts for review, each tailored to the specific customer relationship.",
        },
      ],
      outcome:
        "The business collected two of the three overdue invoices within a week, avoiding the projected cash flow constraint. The owner spent minutes on this task instead of hours reconciling financial data manually.",
    },
    {
      title: "Marketing Channel Optimization",
      description: "Identify which marketing efforts are actually driving results",
      steps: [
        {
          type: "ai",
          content:
            "I've analyzed your marketing spend across channels and found that your Facebook ads are costing 3.2x more per lead than your Google ads, but the conversion rates are nearly identical.",
        },
        {
          type: "human",
          content: "That's surprising. What should we do differently?",
        },
        {
          type: "ai",
          content:
            "I recommend shifting approximately 40% of your Facebook budget to Google. Additionally, your best performing ad creative ('Summer Special') is being underutilized. Would you like me to prepare a revised budget allocation?",
        },
        {
          type: "human",
          content: "Yes, please prepare that. Also, why is the 'Summer Special' performing better?",
        },
        {
          type: "ai",
          content:
            "The 'Summer Special' creative has a 58% higher click-through rate and 27% lower cost-per-click. This appears to be due to the clear value proposition and limited-time offer messaging. I've prepared a revised budget allocation that increases spend on your top-performing ads.",
        },
        {
          type: "system",
          content:
            "ANDI has generated a revised marketing budget allocation plan with projected performance improvements.",
        },
      ],
      outcome:
        "The business implemented the recommended changes and saw a 42% improvement in marketing ROI within 30 days. Lead volume increased while total marketing spend remained constant.",
    },
    {
      title: "Customer Retention Alert",
      description: "Identify at-risk customers before they cancel",
      steps: [
        {
          type: "ai",
          content:
            "I've detected that three of your high-value customers are showing signs of disengagement. Usage has dropped by more than 40% in the last 30 days, and support tickets have increased.",
        },
        {
          type: "human",
          content: "Which customers are these and what's causing the disengagement?",
        },
        {
          type: "ai",
          content:
            "The customers are Acme Corp, Globex, and Stark Industries. The common factors appear to be: 1) They haven't adopted your newest feature, and 2) All three have had technical issues with the reporting module. Would you like me to prepare a retention plan?",
        },
        {
          type: "human",
          content: "Yes, what do you recommend?",
        },
        {
          type: "ai",
          content:
            "I recommend scheduling personalized training sessions for the new feature and proactively addressing the reporting issues. I've prepared email templates and a suggested outreach sequence for your customer success team.",
        },
        {
          type: "system",
          content: "ANDI has created a retention plan with specific actions for each at-risk customer.",
        },
      ],
      outcome:
        "The customer success team implemented the retention plan and successfully re-engaged all three at-risk customers. The business avoided potential churn of high-value accounts that would have been difficult to detect manually.",
    },
  ]

  return (
    <PageLayout>
      <PageHeader title="Emerging Businesses" subtitle="For fast-moving teams with lean resources" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-light mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Emerging Business Challenges ANDI Solves
          </span>
        </h2>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-colors duration-500 group">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500">
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    Limited Visibility
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">The Data Blindspot</h3>
                  <p className="text-gray-400">
                    Small teams often operate with limited visibility into their business metrics. Critical signals get
                    missed until they become problems. ANDI provides real-time monitoring across all your tools without
                    requiring a data team.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-colors duration-500 group">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500">
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    Time Constraints
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">The Bandwidth Problem</h3>
                  <p className="text-gray-400">
                    Founders and small teams wear multiple hats and lack time for deep analysis. ANDI automates
                    monitoring and analysis, surfacing only what needs attention and providing clear recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-colors duration-500 group">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500">
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    Resource Constraints
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">The Budget Reality</h3>
                  <p className="text-gray-400">
                    Small businesses can't afford dedicated analysts or expensive BI tools. ANDI provides
                    enterprise-grade intelligence at a fraction of the cost, with no technical setup required.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-purple-500/30 transition-colors duration-500 group">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500">
                  <Users className="h-8 w-8 text-pink-400" />
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    Growth Challenges
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">The Scaling Hurdle</h3>
                  <p className="text-gray-400">
                    Emerging businesses need to make the right decisions to scale efficiently. ANDI helps identify the
                    highest-impact opportunities and potential risks before they affect your growth trajectory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ModernChallengesCapabilities challenges={challenges} capabilities={capabilities} result={result} />

      <AutomationExamples title="How ANDI Works with Emerging Businesses" examples={automationExamples} />
    </PageLayout>
  )
}
