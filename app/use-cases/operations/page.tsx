import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import AutomationExamples from "@/components/automation-examples"

export default function OperationsPage() {
  const challenges = [
    { text: "Teams don't catch workflow inefficiencies until they cost money" },
    { text: "Supply chain, staffing, and delivery metrics are all in different tools" },
    { text: "Leaders can't quickly see what's working and what needs fixing" },
    { text: "Scaling introduces more moving parts than visibility" },
  ]

  const capabilities = [
    { text: "Correlates logistics, task completion, ticketing, and resource usage" },
    { text: "Flags process delays, capacity bottlenecks, or under-utilized assets" },
    { text: "Suggests corrective actions (e.g., reallocation, scheduling changes)" },
    { text: "Runs simulations on process changes and their impact on throughput or cost" },
  ]

  const result =
    "Ops leaders gain a live command center where the system thinks with them—reducing waste, accelerating throughput, and improving team performance."

  const automationExamples = [
    {
      title: "Resource Optimization",
      description: "Automatically identify and address resource allocation inefficiencies",
      steps: [
        {
          type: "ai",
          content:
            "I've analyzed your resource utilization patterns and identified several inefficiencies. Your customer support team is overloaded during peak hours (10am-2pm), while being underutilized in the early morning and evening. Meanwhile, your technical specialists have capacity that isn't being fully utilized.",
        },
        {
          type: "human",
          content: "What would you recommend to address this imbalance?",
        },
        {
          type: "ai",
          content:
            "I recommend implementing a staggered shift schedule for the support team to better match demand patterns. Additionally, cross-training 4-5 technical specialists to handle tier-1 support tickets during peak hours could reduce wait times by approximately 35% based on current ticket volumes.",
        },
        {
          type: "human",
          content: "Can you show me what this schedule might look like?",
        },
        {
          type: "ai",
          content:
            "I've created a proposed shift schedule that maintains the same total hours while better aligning with demand patterns. I've also identified the 5 technical specialists who have the most relevant skills and availability to assist during peak hours.",
        },
        {
          type: "system",
          content: "ANDI has generated a visual shift schedule and resource allocation plan.",
        },
      ],
      outcome:
        "The operations team implemented the recommended schedule changes, resulting in a 42% reduction in peak-hour wait times and 28% improvement in overall resource utilization. Customer satisfaction scores for support interactions increased by 12 points.",
    },
    {
      title: "Process Bottleneck Identification",
      description: "Detect and resolve workflow bottlenecks that slow down operations",
      steps: [
        {
          type: "ai",
          content:
            "I've identified a significant bottleneck in your order fulfillment process. Orders are spending an average of 32 hours in the 'Pending Approval' stage, which is 4x longer than any other stage in the workflow.",
        },
        {
          type: "human",
          content: "What's causing this delay and how can we fix it?",
        },
        {
          type: "ai",
          content:
            "The root cause appears to be a manual approval process that requires sign-off from department managers who are often in meetings or unavailable. Additionally, there's no escalation path when approvers are unavailable for more than 4 hours. I recommend implementing an automated approval for orders under $5,000 and creating a tiered escalation process for higher-value orders.",
        },
        {
          type: "human",
          content: "What would be the impact of these changes?",
        },
        {
          type: "ai",
          content:
            "Based on historical order data, automating approvals for orders under $5,000 would affect 78% of all orders and reduce average processing time by approximately 24 hours. The escalation process would address the remaining orders, potentially reducing their processing time by 40-60%.",
        },
        {
          type: "human",
          content: "Let's implement the automated approvals for orders under $5,000. Can you help set that up?",
        },
        {
          type: "system",
          content:
            "ANDI has prepared an implementation plan for automated approvals, including workflow changes and required system updates.",
        },
      ],
      outcome:
        "After implementing the automated approval process, the average order processing time decreased by 68%, resulting in faster deliveries, improved customer satisfaction, and reduced operational costs.",
    },
    {
      title: "Predictive Maintenance Scheduling",
      description: "Optimize maintenance schedules to prevent downtime",
      steps: [
        {
          type: "ai",
          content:
            "I've analyzed your equipment performance data and maintenance logs, and I've detected patterns that suggest three of your production machines are showing early signs of potential failure within the next 30-45 days.",
        },
        {
          type: "human",
          content: "Which machines are at risk and what's the potential impact?",
        },
        {
          type: "ai",
          content:
            "The at-risk machines are Line 2 Assembler, Line 4 Packager, and the Central Conveyor System. If these machines fail unexpectedly, it could result in 2-5 days of downtime for each, potentially impacting production capacity by 30-45% during repairs.",
        },
        {
          type: "human",
          content: "When would be the best time to perform preventive maintenance?",
        },
        {
          type: "ai",
          content:
            "Based on your production schedule, inventory levels, and maintenance team availability, I recommend scheduling maintenance for Line 2 Assembler and Line 4 Packager this weekend during the planned shift changeover. For the Central Conveyor System, next Wednesday evening would minimize production impact while still addressing the issue before potential failure.",
        },
        {
          type: "human",
          content: "Let's schedule the maintenance as recommended. Can you also order any parts we might need?",
        },
        {
          type: "ai",
          content:
            "I've checked the maintenance requirements and identified the necessary replacement parts. I can prepare purchase orders for your approval. Based on supplier lead times, we should expedite the order for the conveyor system components to ensure they arrive before Wednesday.",
        },
        {
          type: "system",
          content: "ANDI has prepared maintenance schedules and purchase orders for the required parts.",
        },
      ],
      outcome:
        "The maintenance was performed as scheduled, preventing unexpected failures and saving an estimated 8 days of potential downtime. The total cost of preventive maintenance was 65% lower than what emergency repairs would have cost.",
    },
  ]

  return (
    <PageLayout>
      <PageHeader title="Operations" subtitle="Operational Precision Without Manual Oversight" />

      <ModernChallengesCapabilities
        title="Operations Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <AutomationExamples title="How ANDI Works with Operations Teams" examples={automationExamples} />
    </PageLayout>
  )
}
