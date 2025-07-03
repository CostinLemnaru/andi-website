import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ModernChallengesCapabilities from "@/components/modern-challenges-capabilities"
import KeyMetrics from "@/components/key-metrics"
import SolutionShowcase from "@/components/solution-showcase"
import { ShoppingBag, TrendingUp, Users, Package } from "lucide-react"

export default function RetailEcommercePage() {
  const challenges = [
    { text: "Customer demand, inventory levels, and marketing impact are not connected in real time" },
    { text: "Stockouts and overstock both happen because insights arrive too late" },
    { text: "Promotions are launched without knowing true margin impact across channels" },
    { text: "Loyalty program performance is opaque and slow to analyze" },
    { text: "Customer journey data is fragmented across online and offline touchpoints" },
    { text: "Merchandising decisions lack data-driven insights from sales and behavior" },
  ]

  const capabilities = [
    { text: "Connects POS, marketing, inventory, and customer behavior data in one insight layer" },
    { text: "Detects at-risk SKUs and recommends action (reorder, promote, discount) automatically" },
    { text: "Simulates promo outcomes on gross margin before spending the budget" },
    { text: "Tracks loyalty-driven revenue in real time and suggests retention improvements" },
    { text: "Creates unified customer profiles across online and in-store interactions" },
    { text: "Provides merchandising recommendations based on integrated sales and behavior data" },
  ]

  const result =
    "Retail and e-commerce businesses gain a unified view of inventory, marketing, and customer data to optimize stock levels, improve promotion effectiveness, and enhance customer loyalty."

  const metrics = [
    { value: "28", suffix: "%", label: "Reduction in stockouts" },
    { value: "3.4", suffix: "x", label: "ROI on promotions" },
    { value: "18", suffix: "%", label: "Increase in customer LTV" },
    { value: "42", suffix: "%", label: "Improved inventory turnover" },
  ]

  const solutions = [
    {
      title: "Intelligent Inventory Management",
      description:
        "Connect inventory data with sales trends, marketing campaigns, and external factors to optimize stock levels. Receive early warnings about potential stockouts or overstock situations with specific recommendations for each SKU.",
      icon: <Package className="h-16 w-16" />,
    },
    {
      title: "Promotion Optimization",
      description:
        "Simulate the impact of different promotional strategies on revenue, margin, and inventory before you launch them. Understand the true ROI of each promotion by connecting marketing spend, sales lift, and margin impact.",
      icon: <TrendingUp className="h-16 w-16" />,
    },
    {
      title: "Customer Journey Intelligence",
      description:
        "Create a unified view of each customer's journey across online and offline touchpoints. Understand how different channels influence purchasing decisions and identify the most effective paths to conversion.",
      icon: <Users className="h-16 w-16" />,
    },
    {
      title: "Merchandising Intelligence",
      description:
        "Optimize your product mix and placement with comprehensive analytics. Identify high-performing product combinations, understand category relationships, and discover underperforming SKUs.",
      icon: <ShoppingBag className="h-16 w-16" />,
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Retail & E-commerce"
        subtitle="Connect inventory, marketing, and customer data for optimal performance"
      />

      <KeyMetrics metrics={metrics} />

      <ModernChallengesCapabilities
        title="Retail & E-commerce Challenges & ANDI Capabilities"
        challenges={challenges}
        capabilities={capabilities}
        result={result}
      />

      <SolutionShowcase title="How ANDI Transforms Retail Operations" solutions={solutions} />
    </PageLayout>
  )
}
