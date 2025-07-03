import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import KeyMetrics from "@/components/key-metrics"
import SolutionShowcase from "@/components/solution-showcase"
import { Clock, Users, BarChart2, Briefcase } from "lucide-react"

export default function ConsultingServicesPage() {
  const challenges = [
    { text: "Time tracking, billing, and project milestones are disconnected, creating revenue leakage" },
    { text: "Overruns and margin leaks are detected after the quarter ends" },
    { text: "Client risk and growth opportunities are hidden in disconnected reports" },
    { text: "Resource planning is based on gut feel rather than predicted need" },
    { text: "Project performance varies widely with limited visibility into what drives success" },
    { text: "Knowledge and expertise are siloed within teams rather than leveraged across the organization" },
  ]

  const capabilities = [
    { text: "Links time tracking, billing, CRM, and project management tools together" },
    { text: "Flags at-risk projects before budget overruns happen with early warning indicators" },
    { text: "Forecasts client churn risk based on engagement and satisfaction signals" },
    { text: "Helps plan staffing needs based on historical delivery patterns and upcoming demand" },
    { text: "Identifies the factors that drive successful project outcomes and client satisfaction" },
    { text: "Creates a knowledge graph of expertise and experience across the organization" },
  ]

  const result =
    "Professional services firms gain a unified intelligence layer that connects project, financial, and client data to improve resource utilization, prevent margin leakage, and identify growth opportunities."

  const metrics = [
    { value: "40", suffix: "%", label: "Reduction in bench time" },
    { value: "3.1", suffix: "x", label: "Faster project insights" },
    { value: "25", suffix: "%", label: "Improved project margins" },
    { value: "32", suffix: "%", label: "Increased client retention" },
  ]

  const solutions = [
    {
      title: "Project Profitability Management",
      description:
        "Connect time tracking, expense management, project milestones, and billing data to provide real-time visibility into project profitability. Identify scope creep and budget overruns early.",
      icon: <Clock className="h-16 w-16" />,
    },
    {
      title: "Resource Optimization",
      description:
        "Transform resource planning from guesswork to science with staffing intelligence. Forecast resource needs based on pipeline data, project timelines, and historical utilization patterns.",
      icon: <Users className="h-16 w-16" />,
    },
    {
      title: "Client Relationship Intelligence",
      description:
        "Strengthen client relationships with a comprehensive view of each account. Connect engagement data, satisfaction metrics, communication patterns, and financial history.",
      icon: <Briefcase className="h-16 w-16" />,
    },
    {
      title: "Performance Analytics",
      description:
        "Gain deeper insights into what drives successful outcomes with performance analytics. Identify the factors that contribute to project success, client satisfaction, and team productivity.",
      icon: <BarChart2 className="h-16 w-16" />,
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Consulting & Professional Services"
        subtitle="Connect project, financial, and client data for optimal performance"
      />

      <KeyMetrics metrics={metrics} />

      <ModernChallengesCapabilities
        title="Consulting & Professional Services Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <SolutionShowcase title="How ANDI Transforms Professional Services" solutions={solutions} />
    </PageLayout>
  )
}
