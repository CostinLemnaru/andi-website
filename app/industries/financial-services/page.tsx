import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import KeyMetrics from "@/components/key-metrics"
import SolutionShowcase from "@/components/solution-showcase"
import { Building, Shield, FileCheck, TrendingUp } from "lucide-react"

export default function FinancialServicesPage() {
  const challenges = [
    { text: "Risk data, client information, and transaction records are scattered across systems" },
    { text: "Fraud detection systems produce too many false alarms or miss real threats" },
    { text: "Compliance reporting takes too much time and effort, increasing regulatory risks" },
    { text: "Leaders lack a complete view across markets and regions, slowing decision-making" },
    { text: "Client relationship information is fragmented across multiple touchpoints" },
    { text: "Risk assessment relies on limited data points instead of the full client picture" },
  ]

  const capabilities = [
    { text: "Connects transaction data, client profiles, and compliance information" },
    { text: "Identifies suspicious activities early with clear explanations to reduce false alarms" },
    { text: "Creates audit-ready compliance reports automatically with complete data trails" },
    { text: "Works with your existing security setup, whether on-premise or in a secure cloud" },
    { text: "Builds a unified view of each client across all products, services, and interactions" },
    { text: "Provides early warnings about market shifts and changes in client behavior" },
  ]

  const result =
    "Financial institutions gain a secure, compliant intelligence layer that connects risk, client, and transaction data to improve decision-making, enhance compliance, and deliver better client experiences."

  const metrics = [
    { value: "65", suffix: "%", label: "Reduction in false positives" },
    { value: "3.5", suffix: "x", label: "Faster compliance reporting" },
    { value: "42", suffix: "%", label: "Improved risk assessment" },
    { value: "28", suffix: "%", label: "Enhanced client insights" },
  ]

  const solutions = [
    {
      title: "Enhanced Risk Management",
      description:
        "Create complete risk profiles by connecting transaction patterns, client information, market signals, and external factors. Spot potential issues earlier with smart detection that understands context.",
      icon: <Shield className="h-16 w-16" />,
    },
    {
      title: "Streamlined Compliance",
      description:
        "Turn compliance from a cost center to a strategic advantage with automated reporting and monitoring capabilities. Generate audit-ready documentation with complete data trails.",
      icon: <FileCheck className="h-16 w-16" />,
    },
    {
      title: "360° Client Intelligence",
      description:
        "Create a complete view of each client across all products, services, and interactions. Identify cross-sell and upsell opportunities based on comprehensive client profiles.",
      icon: <Building className="h-16 w-16" />,
    },
    {
      title: "Market Intelligence",
      description:
        "Gain deeper insights into market trends and their impact on your business. Connect external market data with your internal metrics to provide context-aware analysis.",
      icon: <TrendingUp className="h-16 w-16" />,
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Financial Services"
        subtitle="Connect risk, compliance, and client data for better decisions"
      />

      <KeyMetrics metrics={metrics} />

      <ModernChallengesCapabilities
        title="Financial Services Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <SolutionShowcase title="How ANDI Transforms Financial Services" solutions={solutions} />
    </PageLayout>
  )
}
