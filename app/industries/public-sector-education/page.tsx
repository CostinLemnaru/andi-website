import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import KeyMetrics from "@/components/key-metrics"
import SolutionShowcase from "@/components/solution-showcase"
import { GraduationCap, BarChart2, Users, FileText } from "lucide-react"

export default function PublicSectorEducationPage() {
  const challenges = [
    { text: "Program performance data is scattered across systems, making impact measurement difficult" },
    { text: "Budget allocation decisions lack clear connections to outcomes and strategic priorities" },
    { text: "Reporting requirements are complex and time-consuming, diverting resources from core mission" },
    { text: "Constituent or student needs are not fully understood due to fragmented data" },
    { text: "Resource utilization is suboptimal due to limited visibility across departments" },
    { text: "Long-term planning is hindered by inability to connect historical trends with future projections" },
  ]

  const capabilities = [
    { text: "Unifies program data, financial information, and outcome metrics in a single view" },
    { text: "Creates clear connections between resource investments and measurable results" },
    { text: "Automates complex reporting with audit-ready documentation and data lineage" },
    { text: "Builds comprehensive profiles of constituent or student needs and engagement" },
    { text: "Identifies resource optimization opportunities across departments and programs" },
    { text: "Enables data-driven strategic planning with scenario modeling and trend analysis" },
  ]

  const result =
    "Public sector organizations and educational institutions gain a unified intelligence layer that connects program, financial, and outcome data to improve resource allocation, demonstrate impact, and enhance service delivery."

  const metrics = [
    { value: "65", suffix: "%", label: "Reduction in reporting time" },
    { value: "2.4", suffix: "x", label: "Improved outcome visibility" },
    { value: "35", suffix: "%", label: "Better resource allocation" },
    { value: "40", suffix: "%", label: "Enhanced program effectiveness" },
  ]

  const solutions = [
    {
      title: "Outcome-Based Performance Measurement",
      description:
        "Connect program activities, resource investments, and outcome metrics to provide a clear picture of what's working and what's not. Move beyon  and outcome metrics to provide a clear picture of what's working and what's not. Move beyond basic output tracking to understand the true impact of your initiatives.",
      icon: <BarChart2 className="h-16 w-16" />,
    },
    {
      title: "Streamlined Reporting & Compliance",
      description:
        "Transform reporting from a burden to a benefit with automated documentation capabilities. Generate comprehensive reports for stakeholders, funding agencies, and regulatory bodies with minimal manual effort.",
      icon: <FileText className="h-16 w-16" />,
    },
    {
      title: "Constituent/Student-Centered Intelligence",
      description:
        "Develop a deeper understanding of the people you serve by connecting engagement data, service utilization, feedback, and outcomes. Create comprehensive profiles that reveal needs, preferences, and patterns.",
      icon: <Users className="h-16 w-16" />,
    },
    {
      title: "Strategic Resource Allocation",
      description:
        "Optimize your budget and resource allocation with comprehensive analytics. Understand the true cost and impact of different programs and services. Identify opportunities to reduce duplication and improve efficiency.",
      icon: <GraduationCap className="h-16 w-16" />,
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Public Sector & Education"
        subtitle="Connect program, financial, and outcome data for greater impact"
      />

      <KeyMetrics metrics={metrics} />

      <ModernChallengesCapabilities
        title="Public Sector & Education Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <SolutionShowcase title="How ANDI Transforms Public Sector & Education" solutions={solutions} />
    </PageLayout>
  )
}
