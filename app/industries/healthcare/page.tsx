import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import KeyMetrics from "@/components/key-metrics"
import SolutionShowcase from "@/components/solution-showcase"
import { Stethoscope, ClipboardCheck, TrendingUp, FileCheck } from "lucide-react"

export default function HealthcarePage() {
  const challenges = [
    { text: "Clinical data, operations, and financial metrics live in separate systems" },
    { text: "Supply chain shortages impact procedures but are not linked to patient outcomes" },
    { text: "Compliance audits require manual reconciliation across systems" },
    { text: "Leadership lacks visibility into true cost per patient or procedure" },
    { text: "Quality improvement initiatives lack integrated data to measure effectiveness" },
    { text: "Resource allocation decisions are made without comprehensive utilization data" },
  ]

  const capabilities = [
    { text: "Connects EHRs, ERP, and billing systems into a unified insight model" },
    { text: "Flags supply chain risks based on procedure patterns and usage rates" },
    { text: "Auto-generates compliance-ready traceability logs with complete audit trails" },
    { text: "Calculates real per-case profitability and flags high-cost anomalies" },
    { text: "Measures quality initiative impact across clinical, operational, and financial dimensions" },
    { text: "Optimizes resource allocation based on comprehensive utilization and outcome data" },
  ]

  const result =
    "Healthcare organizations gain a secure, compliant intelligence layer that connects clinical, operational, and financial data to improve patient outcomes, optimize resource allocation, and ensure regulatory compliance."

  const metrics = [
    { value: "35", suffix: "%", label: "Reduction in reporting time" },
    { value: "2.8", suffix: "x", label: "Faster compliance audits" },
    { value: "24", suffix: "%", label: "Improved resource utilization" },
    { value: "47", suffix: "%", label: "Better supply chain visibility" },
  ]

  const solutions = [
    {
      title: "Clinical-Financial Integration",
      description:
        "Bridge the gap between clinical and financial data to understand the true cost and outcome relationship of different care pathways. Identify high-value interventions and optimize resource allocation.",
      icon: <Stethoscope className="h-16 w-16" />,
    },
    {
      title: "Quality Improvement Intelligence",
      description:
        "Transform quality improvement initiatives with comprehensive analytics. Track the impact of interventions across clinical outcomes, patient satisfaction, operational efficiency, and financial performance.",
      icon: <ClipboardCheck className="h-16 w-16" />,
    },
    {
      title: "Resource Optimization",
      description:
        "Optimize staffing, equipment, and supply utilization with resource intelligence. Predict demand patterns based on historical data, seasonal trends, and population health indicators.",
      icon: <TrendingUp className="h-16 w-16" />,
    },
    {
      title: "Compliance Automation",
      description:
        "Reduce the administrative burden of compliance with automated reporting and monitoring capabilities. Generate audit-ready documentation with complete data lineage.",
      icon: <FileCheck className="h-16 w-16" />,
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Healthcare & Life Sciences"
        subtitle="Connect clinical, operational, and financial data for better outcomes"
      />

      <KeyMetrics metrics={metrics} />

      <ModernChallengesCapabilities
        title="Healthcare & Life Sciences Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <SolutionShowcase title="How ANDI Transforms Healthcare Operations" solutions={solutions} />
    </PageLayout>
  )
}
