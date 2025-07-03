import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import KeyMetrics from "@/components/key-metrics"
import SolutionShowcase from "@/components/solution-showcase"
import { Factory, Truck, BarChart2, Settings } from "lucide-react"

export default function ManufacturingLogisticsPage() {
  const challenges = [
    { text: "Sensor data, procurement, and shipping records don't talk to each other" },
    { text: "Root causes of production delays are buried across maintenance, supply, and staffing logs" },
    { text: "Forecasting production outcomes is reactive, not proactive" },
    { text: "Equipment downtime costs millions because patterns are missed" },
    { text: "Supply chain disruptions are detected too late to implement mitigation strategies" },
    { text: "Quality issues are difficult to trace back to specific production variables" },
  ]

  const capabilities = [
    { text: "Correlates sensor events, purchase orders, shipping delays, and maintenance logs" },
    { text: "Surfaces the top causes of downtime or production loss automatically" },
    { text: "Simulates the operational impact of changing suppliers or production schedules" },
    { text: "Predicts maintenance needs based on combined operational signals" },
    { text: "Provides early warning of supply chain disruptions with recommended actions" },
    { text: "Traces quality issues to specific production variables, batches, or supplier components" },
  ]

  const result =
    "Manufacturing and logistics operations gain a unified intelligence layer that connects production, maintenance, and supply chain data to prevent downtime, optimize operations, and improve forecasting."

  const metrics = [
    { value: "37", suffix: "%", label: "Reduction in unplanned downtime" },
    { value: "2.5", suffix: "x", label: "Faster issue resolution" },
    { value: "28", suffix: "%", label: "Improved production throughput" },
    { value: "45", suffix: "%", label: "Better supply chain visibility" },
  ]

  const solutions = [
    {
      title: "Predictive Maintenance",
      description:
        "Transform maintenance from reactive to predictive by connecting equipment sensor data with maintenance history, production schedules, and quality metrics. Identify potential failures before they occur.",
      icon: <Settings className="h-16 w-16" />,
    },
    {
      title: "Supply Chain Resilience",
      description:
        "Build a more resilient supply chain with comprehensive visibility across suppliers, inventory, production needs, and logistics. Detect potential disruptions early and receive mitigation recommendations.",
      icon: <Truck className="h-16 w-16" />,
    },
    {
      title: "Production Optimization",
      description:
        "Maximize throughput, quality, and efficiency with production intelligence. Identify bottlenecks and their root causes across equipment, materials, and processes.",
      icon: <Factory className="h-16 w-16" />,
    },
    {
      title: "Operational Intelligence",
      description:
        "Create a digital twin of your operations that connects production, maintenance, quality, and supply chain data. Simulate different scenarios to optimize resource allocation.",
      icon: <BarChart2 className="h-16 w-16" />,
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Manufacturing & Logistics"
        subtitle="Connect production, maintenance, and supply chain data for operational excellence"
      />

      <KeyMetrics metrics={metrics} />

      <ModernChallengesCapabilities
        title="Manufacturing & Logistics Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <SolutionShowcase title="How ANDI Transforms Manufacturing Operations" solutions={solutions} />
    </PageLayout>
  )
}
