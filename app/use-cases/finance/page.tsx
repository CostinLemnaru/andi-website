import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import InsightSpotlight from "@/components/insight-spotlight"
import AutomationExamples from "@/components/automation-examples"

export default function FinancePage() {
  const challenges = [
    { text: "Too much time spent reconciling numbers across systems" },
    { text: "P&L shifts spotted too late to fix, leading to missed targets" },
    { text: "No clear link between financial trends and operational drivers" },
    { text: "Finance teams stuck building reports instead of guiding strategy" },
    { text: "Budget planning relies on historical data without real-time signals" },
    { text: "Cash flow forecasting lacks accuracy due to disconnected data" },
  ]

  const capabilities = [
    { text: "Correlates spend, revenue, and resource usage across systems" },
    { text: "Tags anomalies in real time—cost overruns, missed forecasts, cash flow dips" },
    { text: "Runs budget simulations with 'what-if' scenarios" },
    { text: "Generates audit-ready financial narratives and dashboards instantly" },
    { text: "Provides early warning signals for budget variances with root cause analysis" },
    { text: "Automates reconciliation across systems, reducing manual data entry" },
  ]

  const result =
    "Finance leaders move from back-office reporting to real-time financial strategy—confident, traceable, and faster than ever before."

  const insights = [
    {
      observation:
        "Your marketing spend increased 32% this quarter, but revenue attribution from marketing campaigns only increased 8%. The largest variance is in paid social media, where cost per acquisition has risen 47% month-over-month.",
      recommendation:
        "Reallocate 40% of the paid social budget to email campaigns and content marketing, which are showing 3.2x better ROI based on your historical data.",
      impact:
        "This reallocation could improve overall marketing ROI by approximately 28% while maintaining lead volume, based on current conversion rates across channels.",
    },
    {
      observation:
        "Three departments consistently exceed their travel budgets by 15-30% each quarter, while actual business outcomes from these trips show diminishing returns compared to virtual meetings.",
      recommendation:
        "Implement a pre-approval workflow for trips exceeding $1,500 and provide real-time budget visibility to department heads with automated alerts at 70% utilization.",
      impact:
        "Similar implementations have reduced travel spend by 22% without impacting business outcomes, potentially saving hundreds of thousands annually.",
    },
    {
      observation:
        "Your accounts receivable aging report shows a concerning trend: 28% of invoices are now paid after 45 days, up from 18% last year, creating potential cash flow issues in Q3.",
      recommendation:
        "Segment late-paying customers by size, industry, and payment history to create targeted collection strategies, and implement automated reminders at 7, 3, and 1 days before due dates.",
      impact:
        "This approach typically reduces days sales outstanding (DSO) by 7-12 days and improves cash flow predictability by over 30%.",
    },
  ]

  const automationExamples = [
    {
      title: "Budget Variance Detection",
      description: "Automatically identify budget variances and their root causes",
      steps: [
        {
          type: "ai",
          content:
            "I've detected that the marketing department is trending 18% over budget this quarter, primarily in the digital advertising category.",
        },
        {
          type: "ai",
          content:
            "The root cause appears to be a 43% increase in cost-per-click rates for your top keywords, combined with a campaign that was scheduled to end last month but is still running.",
        },
        {
          type: "human",
          content: "Can you suggest some options to address this before the end of the quarter?",
        },
        {
          type: "ai",
          content:
            "I recommend: 1) Pausing the expired campaign immediately (saves ~$12K), 2) Shifting budget from low-performing keywords to high-performing ones (potential 22% efficiency gain), or 3) Reallocating $15K from Q4 budget with finance approval.",
        },
        {
          type: "human",
          content: "Let's implement options 1 and 2. Can you help with that?",
        },
        {
          type: "ai",
          content:
            "I'll prepare the changes. Would you like me to execute them after your review or send them to the marketing team for implementation?",
        },
        {
          type: "human",
          content: "Please prepare for my review first.",
        },
        {
          type: "system",
          content:
            "ANDI has prepared a campaign adjustment plan with specific keywords to pause and budget shifts for review.",
        },
      ],
      outcome:
        "The marketing team implemented the recommended changes, bringing the department back within budget by the end of the quarter while maintaining lead generation targets. The process took minutes instead of days of analysis.",
    },
    {
      title: "Automated Financial Reporting",
      description: "Generate comprehensive financial reports with narrative explanations",
      steps: [
        {
          type: "human",
          content:
            "I need the quarterly financial package for the board meeting tomorrow, with explanations for any significant variances.",
        },
        {
          type: "ai",
          content:
            "I'll generate the complete financial package. Would you like me to include the standard sections (P&L, Balance Sheet, Cash Flow, KPIs) plus variance analysis?",
        },
        {
          type: "human",
          content: "Yes, and please add a section on our SaaS metrics as well.",
        },
        {
          type: "ai",
          content:
            "I've compiled the financial package with all requested sections. I've identified three significant variances: 1) Gross margin improved 2.3 points due to product mix shift, 2) R&D expenses increased 14% due to the new product initiative, and 3) Customer acquisition cost rose 18% while retention improved 5 points.",
        },
        {
          type: "system",
          content:
            "ANDI has generated a complete board-ready financial package with data visualizations, narrative explanations, and a dedicated SaaS metrics section.",
        },
        {
          type: "human",
          content: "This looks great. Can you also add a slide comparing our metrics to industry benchmarks?",
        },
        {
          type: "ai",
          content:
            "I've added the industry comparison slide. Your gross margin and retention rates are above industry averages, while your CAC and R&D as a percentage of revenue are slightly higher than peers.",
        },
      ],
      outcome:
        "The CFO presented a comprehensive, insight-rich financial package to the board without requiring the finance team to spend days preparing reports and analyses. The board particularly appreciated the clear explanations of variances and industry comparisons.",
    },
    {
      title: "Cash Flow Forecasting",
      description: "Predict and optimize cash flow based on integrated business data",
      steps: [
        {
          type: "ai",
          content:
            "Based on current trends, I'm projecting a potential cash flow constraint in the next 60-75 days. This is primarily due to the seasonal revenue dip combined with the planned facility expansion.",
        },
        {
          type: "human",
          content: "What options do we have to address this without taking on additional debt?",
        },
        {
          type: "ai",
          content:
            "I've identified several options: 1) Accelerate collections from the top 20 accounts with largest outstanding balances, 2) Negotiate extended payment terms with three major suppliers, 3) Delay non-critical capital expenditures worth $350K by 90 days, or 4) Implement a temporary hiring slowdown for non-essential roles.",
        },
        {
          type: "human",
          content: "Let's explore options 1 and 3. What would be the impact?",
        },
        {
          type: "ai",
          content:
            "Implementing both options would improve projected cash position by approximately $520K in the critical period. I can prepare a detailed implementation plan for each option.",
        },
        {
          type: "human",
          content: "Yes, please prepare the plans and identify which accounts to prioritize for collections.",
        },
        {
          type: "system",
          content:
            "ANDI has prepared a collections acceleration plan for 20 accounts and a capex delay schedule with impact analysis.",
        },
      ],
      outcome:
        "The company successfully navigated the cash flow constraint without taking on additional debt. The collections team focused on the right accounts, improving DSO by 7 days, while the delayed capital expenditures had minimal operational impact.",
    },
  ]

  return (
    <PageLayout>
      <PageHeader title="Finance" subtitle="The Business Brain Behind Every Line Item" />

      <InsightSpotlight title="Finance Insights from ANDI" insights={insights} />

      <ModernChallengesCapabilities
        title="Finance Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <AutomationExamples title="How ANDI Works with Finance Teams" examples={automationExamples} />
    </PageLayout>
  )
}
