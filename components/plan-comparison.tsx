"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Check, X } from "lucide-react"

type FeatureComparison = {
  feature: string
  description: string
  launch: string | boolean
  scale: string | boolean
  enterprise: string | boolean
}

type ComparisonCategory = {
  title: string
  description?: string
  features: FeatureComparison[]
}

const comparisonData: ComparisonCategory[] = [
  {
    title: "Platform & Core Capabilities",
    features: [
      {
        feature: "User Management",
        description:
          "Unlimited users with role-based access control. Add as many users as you need without additional costs, with granular control over what each person can access and modify.",
        launch: true,
        scale: true,
        enterprise: true,
      },
      {
        feature: "Data Integrations",
        description:
          "Connect external systems (e.g. CRM, ERP, CS, Marketing). Connect your existing business systems to create a unified data ecosystem that powers cross-functional insights.",
        launch: "Up to 3",
        scale: "Up to 10 + plugin support",
        enterprise: "Unlimited + custom APIs",
      },
      {
        feature: "Ingestion Cadence",
        description:
          "Frequency of data sync from source systems. Control how often ANDI pulls fresh data from your connected systems to balance timeliness and system load.",
        launch: "Daily/weekly",
        scale: "Near real-time batching",
        enterprise: "Fully orchestrated sync",
      },
      {
        feature: "Storage (Hot / Cold)",
        description:
          "Active vs archived data, used for insight generation and historical reference. Hot storage keeps frequently accessed data readily available, while cold storage maintains historical data at lower cost.",
        launch: "500 GB / 2 TB",
        scale: "1 TB / 5 TB",
        enterprise: "2 TB / 10 TB",
      },
    ],
  },
  {
    title: "Dashboards & Insight Delivery",
    features: [
      {
        feature: "Dashboards",
        description:
          "Pre-built or customizable displays of KPIs and trends. Visual representations of your key metrics that update automatically as new data comes in.",
        launch: "Pre-built only (no editing)",
        scale: "Pre-built + custom builder",
        enterprise: "Full builder + orchestration",
      },
      {
        feature: "AI-Embedded Drill-Downs",
        description:
          "Ask questions inside dashboards via NLQ for contextual deep dives. Click on any metric and ask follow-up questions in plain English to explore the underlying data and drivers.",
        launch: "Basic AI drill-down (preset scope)",
        scale: "Context-aware drill-down across sources",
        enterprise: "Deep insight chaining & dynamic filters",
      },
      {
        feature: "Dashboard Builder",
        description:
          "Build custom dashboards with drag/drop widgets and filters. Create your own visualizations with an intuitive interface that requires no coding or SQL knowledge.",
        launch: false,
        scale: true,
        enterprise: true,
      },
      {
        feature: "Insight Subscriptions",
        description:
          "Follow specific KPIs or patterns and receive insight updates. Get notified when metrics change significantly or when the system detects patterns you care about.",
        launch: false,
        scale: true,
        enterprise: "Auto-assigned + custom alerts",
      },
      {
        feature: "Scheduled Reports",
        description:
          "Automated email or in-platform reports based on insights. Set up regular delivery of key insights to stakeholders' inboxes without manual work.",
        launch: "Daily only",
        scale: "Hourly or daily",
        enterprise: "Custom frequencies & triggers",
      },
      {
        feature: "Dashboard Sharing",
        description:
          "Collaboration and access across teams. Share insights with colleagues while maintaining appropriate access controls and permissions.",
        launch: false,
        scale: "Manual share links",
        enterprise: "Full org access + RBAC",
      },
    ],
  },
  {
    title: "NLP & Insight Generation",
    features: [
      {
        feature: "System-Generated Queries",
        description:
          "Automated insights from scheduled dashboards and system scans. ANDI proactively analyzes your data and surfaces important findings without you having to ask.",
        launch: "2,000/month",
        scale: "10,000/month",
        enterprise: "200,000/month",
      },
      {
        feature: "Ad-Hoc NLQs",
        description:
          "User-generated natural language queries for exploration. Ask questions in plain English and get immediate answers, without needing to write SQL or complex queries.",
        launch: "1,000/month",
        scale: "5,000/month",
        enterprise: "50,000/month",
      },
      {
        feature: "Insight Labeling Engine",
        description:
          "Tags data with confidence levels, revenue impact, or operational risk. Automatically categorizes insights by business impact so you can prioritize what matters most.",
        launch: "Basic",
        scale: "Confidence only",
        enterprise: "Full tagging with impact scoring",
      },
      {
        feature: "Forecast Explanations",
        description:
          "AI-generated reasoning for forecasted performance changes. Get plain-language explanations of why metrics are trending up or down and what's driving the changes.",
        launch: "Not available",
        scale: "Standard",
        enterprise: "Advanced with scenario modeling",
      },
    ],
  },
  {
    title: "Correlation Engine (LinkDNA)",
    features: [
      {
        feature: "Generated Insights (monthly)",
        description:
          "AI-powered insights automatically generated from your data. The number of strategic insights, recommendations, and actionable findings ANDI can produce each month.",
        launch: "5K",
        scale: "50K",
        enterprise: "500K",
      },
      {
        feature: "Multi-System Matching",
        description:
          "Correlates data across systems (e.g., CRM + ERP + CS). Connect customer records, financial data, and operational metrics even when they don't share common IDs.",
        launch: "Up to 3 systems",
        scale: "Up to 10 systems",
        enterprise: "Unlimited",
      },
      {
        feature: "Many-to-Many Mapping",
        description:
          "Tracks indirect relationships and shared dependencies. Identify complex relationships where multiple entities are connected through various touchpoints.",
        launch: false,
        scale: true,
        enterprise: true,
      },
      {
        feature: "Confidence Scoring",
        description:
          "Assigns confidence levels to detected relationships. Know how certain ANDI is about each connection it makes, with transparency into the matching logic.",
        launch: false,
        scale: "Basic scoring",
        enterprise: "Advanced scoring + weighted logic",
      },
    ],
  },
  {
    title: "Security & Compliance",
    features: [
      {
        feature: "Encryption at Rest/Transit",
        description:
          "AES-256 + TLS 1.3 for all stored and transmitted data. Enterprise-grade encryption protects your data both when stored and when being transferred.",
        launch: true,
        scale: true,
        enterprise: true,
      },
      {
        feature: "GDPR Compliance",
        description:
          "Platform architecture is GDPR-aligned, including processing and deletion rights. Meet European data protection requirements with built-in privacy controls and data subject rights management.",
        launch: true,
        scale: true,
        enterprise: true,
      },
      {
        feature: "RBAC (Access Control)",
        description:
          "Role-based access permissions and visibility controls. Control exactly who can see what data and what actions they can take within the platform.",
        launch: "Basic",
        scale: "Standard",
        enterprise: "Granular",
      },
      {
        feature: "PII Redaction",
        description:
          "Mask personal data in UI, exports, and logs. Automatically identify and mask sensitive personal information to maintain privacy compliance.",
        launch: false,
        scale: "Optional",
        enterprise: "Enforced by default",
      },
      {
        feature: "Audit Logging",
        description:
          "Tracks every action taken on customer data. Maintain a complete record of who accessed what data and what changes were made for compliance and security.",
        launch: "Internal",
        scale: "Viewable logs",
        enterprise: "Full audit dashboard",
      },
      {
        feature: "Data Residency Controls",
        description:
          "Support for regional storage preferences (EU, US, etc.). Specify where your data is physically stored to meet regulatory requirements for data sovereignty.",
        launch: false,
        scale: "Optional",
        enterprise: true,
      },
    ],
  },
  {
    title: "Break-Glass Access & Governance",
    features: [
      {
        feature: "Break-Glass Access",
        description:
          "Emergency support access to system-level data during critical incidents. Controlled emergency access protocol that allows support to resolve critical issues while maintaining security.",
        launch: "Triggered manually",
        scale: "Logged + customer notified",
        enterprise: "Optional customer approval",
      },
      {
        feature: "Access Time Boxing",
        description:
          "Temporary access auto-expires within a fixed time window. Emergency access automatically expires after a set period to minimize security exposure.",
        launch: "30 mins",
        scale: "30–60 mins",
        enterprise: "Configurable",
      },
      {
        feature: "Customer Visibility",
        description:
          "Transparency around emergency access events. See when and why support accessed your system, with complete transparency into all actions taken.",
        launch: "Internal audit only",
        scale: "Monthly logs",
        enterprise: "Real-time dashboard",
      },
      {
        feature: "Zero-Access Default Policy",
        description:
          "No engineer can view or query customer data without break-glass protocol. By default, even ANDI engineers cannot access your data without explicit permission and logging.",
        launch: true,
        scale: true,
        enterprise: true,
      },
    ],
  },
  {
    title: "Support & Customer Success",
    features: [
      {
        feature: "Support Channels",
        description:
          "How users contact support. Different ways to get help when you need it, with varying levels of responsiveness and personalization.",
        launch: "Email + Community",
        scale: "Priority Email",
        enterprise: "CSM + direct access",
      },
      {
        feature: "Onboarding Assistance",
        description:
          "Support during data integration and activation. Help getting your data connected and your team up to speed with the platform.",
        launch: "Self-serve",
        scale: "Guided session",
        enterprise: "Full implementation",
      },
      {
        feature: "Response Time SLA",
        description:
          "Target time to acknowledge support issues. Guaranteed response times for when you encounter issues or need assistance.",
        launch: "No SLA",
        scale: "24–48 hrs",
        enterprise: "2–4 hrs (critical)",
      },
      {
        feature: "Strategic Reviews",
        description:
          "Insight alignment, ROI tracking, expansion planning. Regular check-ins with experts to ensure you're getting maximum value from the platform.",
        launch: false,
        scale: "Optional",
        enterprise: "Quarterly included",
      },
    ],
  },
  {
    title: "Functional Intelligence Modules (Add-Ons)",
    description: "Specialized modules that enhance ANDI's core capabilities for specific business functions",
    features: [
      {
        feature: "Finance Ops",
        description:
          "Cash flow tracking, variance detection, revenue leakage. Finance-specific insights that help identify opportunities to improve cash flow and reduce revenue leakage.",
        launch: false,
        scale: true,
        enterprise: true,
      },
      {
        feature: "GTM Intelligence",
        description:
          "Sales + marketing effectiveness, CAC/LTV, funnel velocity. Connect marketing spend to sales outcomes and optimize your entire go-to-market motion.",
        launch: false,
        scale: true,
        enterprise: true,
      },
      {
        feature: "HR & People Analytics",
        description:
          "Attrition risk, engagement pulse, DEI metrics. Identify flight risks before they leave and measure the effectiveness of people initiatives.",
        launch: false,
        scale: false,
        enterprise: true,
      },
      {
        feature: "Strategy Planning",
        description:
          "Scenario modeling, KPI alignment, forecast simulation. Test different business scenarios and see how they might impact your key metrics before making decisions.",
        launch: false,
        scale: false,
        enterprise: true,
      },
      {
        feature: "Insight-as-a-Service",
        description:
          "Zamora-delivered executive packs, insight curation, quarterly roll-ups. Let our experts do the analysis for you, delivering ready-to-use insights and recommendations.",
        launch: false,
        scale: false,
        enterprise: true,
      },
    ],
  },
]

export function PlanComparison() {
  const [openCategories, setOpenCategories] = useState<string[]>([])

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => (prev.includes(title) ? prev.filter((cat) => cat !== title) : [...prev, title]))
  }

  const renderValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-500 mx-auto" />
      )
    }
    return <span className="text-sm text-gray-300 break-words">{value}</span>
  }

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Detailed Plan Comparison</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the features and capabilities of each plan to find the right fit for your business.
          </p>
        </div>

        <div className="space-y-6">
          {comparisonData.map((category) => (
            <motion.div
              key={category.title}
              className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/60 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                boxShadow: "0 0 15px 0 rgba(107, 114, 128, 0.3)",
              }}
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                onClick={() => toggleCategory(category.title)}
              >
                <span className="font-medium text-left text-white text-lg">{category.title}</span>
                {openCategories.includes(category.title) ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {openCategories.includes(category.title) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-4 bg-gray-800/50 border-t border-gray-700">
                      {category.description && <p className="text-gray-300 mb-4 italic">{category.description}</p>}

                      <div>
                        <table className="w-full divide-y divide-gray-700">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0 w-2/5"
                              >
                                Feature
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-center text-sm font-semibold text-white w-1/5"
                              >
                                Launch
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-center text-sm font-semibold text-white w-1/5"
                              >
                                Scale
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-center text-sm font-semibold text-white w-1/5"
                              >
                                Enterprise
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {category.features.map((feature, featureIndex) => (
                              <tr key={feature.feature} className="hover:bg-gray-800/30">
                                <td className="py-4 pl-4 pr-3 text-sm sm:pl-0 align-top">
                                  <div className="font-medium text-white">{feature.feature}</div>
                                  <div className="text-xs text-gray-300 mt-2 pr-2 leading-relaxed">
                                    {feature.description}
                                  </div>
                                </td>
                                <td className="px-3 py-4 text-center align-top">{renderValue(feature.launch)}</td>
                                <td className="px-3 py-4 text-center align-top">{renderValue(feature.scale)}</td>
                                <td className="px-3 py-4 text-center align-top">{renderValue(feature.enterprise)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
