"use client"

import { useState } from "react"
import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import ScrollReveal from "@/components/scroll-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Link,
  Tag,
  Shield,
  Database,
  Zap,
  BarChart3,
  Users,
  Workflow,
  FileText,
  CheckCircle,
  Target,
  Cpu,
  Globe,
  Lock,
  Eye,
  Layers,
  GitBranch,
  MessageSquare,
  TrendingUp,
  Settings,
  Cloud,
  Server,
  Smartphone,
} from "lucide-react"

export default function DataSheetsPage() {
  const [selectedVersion, setSelectedVersion] = useState("mvp")

  // Page Header Content
  const pageTitle = "Technical Data Sheets"
  const pageSubtitle = "Comprehensive technical specifications and capabilities of ANDI's intelligent data platform"

  // Section Titles
  const roadmapTitle = "Product Roadmap & Capabilities"
  const platformTitle = "Platform Infrastructure"
  const deploymentTitle = "Deployment Options"
  const metricsTitle = "Success Metrics & KPIs"

  // Version Information
  const versions = {
    mvp: {
      title: "MVP - Foundation Intelligence",
      subtitle: "Core capabilities for intelligent data analysis",
      status: "In Development",
      timeline: "Q2 2025",
      color: "bg-blue-500",
    },
    v1: {
      title: "Version 1 - Team Intelligence",
      subtitle: "Collaborative insights and advanced analytics",
      status: "Planned",
      timeline: "Q4 2025",
      color: "bg-purple-500",
    },
    v2: {
      title: "Version 2 - Execution Intelligence",
      subtitle: "Action-oriented insights with autonomous capabilities",
      status: "Roadmap",
      timeline: "Q2 2026",
      color: "bg-pink-500",
    },
    longterm: {
      title: "Long-term Vision",
      subtitle: "Advanced AI co-pilot and enterprise-scale features",
      status: "Vision",
      timeline: "2027-2029",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
  }

  // MVP Features
  const mvpFeatures = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "NLP Query Engine",
      description: "Ask questions in plain language and receive structured insights",
      specs: ["LLM/NLP model hosting", "Natural language parser", "Query translator", "Analytics layer integration"],
    },
    {
      icon: <Link className="h-6 w-6" />,
      title: "LinkDNA™ Correlation Engine",
      description: "Links records without shared IDs using synthetic identifiers",
      specs: [
        "Data normalization services",
        "Fuzzy matching algorithms",
        "Record scoring engine",
        "Confidence-based decisions",
      ],
    },
    {
      icon: <Tag className="h-6 w-6" />,
      title: "Insight Labeling",
      description: "Automatically tags findings by business impact",
      specs: ["Impact taxonomy model", "Tagging engine", "Insight classifier service", "Business impact scoring"],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Confidence-Based Output",
      description: "Every insight delivered with confidence score and reasoning",
      specs: ["Explainability engine", "Scoring model", "Logic trace framework", "Transparency reporting"],
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Multi-Dataset Analysis",
      description: "Correlates siloed data sources across departments",
      specs: ["Multi-source ingestion", "Schema-mapping module", "Cross-dataset joins", "Data correlation engine"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Single-User Workspace",
      description: "Clean, solo-user interface for testing and insights",
      specs: ["Basic user auth", "UI interface", "User storage", "Query state management"],
    },
  ]

  // Platform Features
  const platformFeatures = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Data Source Tracker",
      description: "Monitor connection status and sync performance",
      specs: ["Sync monitor service", "Pipeline health logs", "Integration dashboard"],
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Customizable Dashboards",
      description: "Resize, reshape, and rearrange dashboard widgets",
      specs: ["Widget layout engine", "Drag-and-drop UI", "Layout persistence"],
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "Feedback Loop Engine",
      description: "Captures user feedback to improve matching logic",
      specs: ["Feedback collection", "Learning database", "Retraining hooks"],
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "AES-256 + TLS 1.3 encryption with audit logs",
      specs: ["Data encryption", "Immutable logs", "RBAC", "PII masking"],
    },
  ]

  // Version 1 Features
  const v1Features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Graph Generation via NLP",
      description: "Generate charts and visuals using natural language",
      specs: ["Chart rendering library", "NLP-to-visualization parser", "Frontend graphing components"],
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Business Unit Switching",
      description: "Toggle between business units with global view support",
      specs: ["Multi-entity data modeling", "Query scoping engine", "Cross-BU access layer"],
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Embedded Dashboards",
      description: "Each dashboard includes embedded AI assistant",
      specs: ["Embedded NLP interface", "Real-time query processor", "Contextual filtering"],
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Anomaly Detection",
      description: "Flags abnormal patterns in spend, usage, and churn",
      specs: ["Statistical anomaly engine", "Historical baseline analyzer", "Notification system"],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Forecasting Engine",
      description: "Predicts revenue, churn, and KPIs from historical patterns",
      specs: ["Predictive modeling", "Time-series forecasting", "Training pipeline"],
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Plug-in Framework",
      description: "Integrates live data from CRMs, ERPs, support platforms",
      specs: ["Plugin API interface", "Connector SDK", "Data ingestion abstraction"],
    },
  ]

  // Version 2 Features
  const v2Features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Presentation & PDF Creation",
      description: "Auto-generate slide decks and PDFs from insights",
      specs: ["PDF generation engine", "Template designer", "Export module"],
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      title: "Execution Dashboard",
      description: "Track all actions initiated through 'Act With ANDI'",
      specs: ["Workflow status tracker", "Task queue manager", "Execution visualizer"],
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "'Act With ANDI' Assistant",
      description: "Suggests strategic actions based on detected insights",
      specs: ["Action recommendation engine", "Context resolver", "Execution flow handler"],
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Root Cause Explorer",
      description: "Guides users to uncover the 'why' behind trends",
      specs: ["Correlation analysis", "Causal reasoning engine", "Explanation generator"],
    },
  ]

  // Long-term Features
  const longTermFeatures = [
    {
      icon: <Settings className="h-6 w-6" />,
      title: "User-Defined Workflow Builder",
      description: "Create custom workflows for autonomous execution",
      specs: ["Workflow composer UI", "Logic validation", "Autonomous triggers"],
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-Entity Forecasting",
      description: "Forecasts across business units and regions simultaneously",
      specs: ["Aggregated forecasting", "BU-aware projections", "Cross-entity logic"],
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Autonomous Co-Pilot Mode",
      description: "Executes operational tasks via AI-driven decisions",
      specs: ["Task automation engine", "Policy validation", "Execution monitoring"],
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Knowledge Graph Engine",
      description: "Visualizes entity relationships and insight connections",
      specs: ["Graph database", "Relationship extraction", "Graph rendering UI"],
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Voice + Multimodal Interface",
      description: "Natural voice commands and multimodal data input capabilities",
      specs: [
        "Voice recognition engine",
        "Multimodal data processing",
        "Natural speech synthesis",
        "Cross-modal understanding",
      ],
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Narrative Builder",
      description: "Automatically generates comprehensive business narratives from insights",
      specs: [
        "Story generation engine",
        "Context-aware narratives",
        "Executive summary builder",
        "Multi-format output",
      ],
    },
  ]

  // Deployment Options
  const deploymentOptions = [
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Deployment",
      description: "Fully managed SaaS solution",
      features: ["Auto-scaling", "99.9% uptime SLA", "Global CDN", "Automatic updates"],
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "On-Premises",
      description: "Complete control and data sovereignty",
      features: ["Air-gapped deployment", "Custom security policies", "Local data residency", "Dedicated support"],
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Hybrid",
      description: "Best of both worlds",
      features: ["Flexible data placement", "Burst to cloud", "Edge processing", "Unified management"],
    },
  ]

  // Success Metrics
  const successMetrics = [
    {
      value: "85%+",
      description: "Match confidence in correlation engine",
      color: "text-green-400",
    },
    {
      value: "90%+",
      description: "Clarity score in user feedback",
      color: "text-blue-400",
    },
    {
      value: "<5s",
      description: "Insight delivery time for basic queries",
      color: "text-purple-400",
    },
    {
      value: "3+",
      description: "Siloed datasets ingested and linked",
      color: "text-pink-400",
    },
  ]

  const getFeaturesByVersion = (version: string) => {
    switch (version) {
      case "mvp":
        return mvpFeatures
      case "v1":
        return v1Features
      case "v2":
        return v2Features
      case "longterm":
        return longTermFeatures
      default:
        return mvpFeatures
    }
  }

  return (
    <PageLayout>
      <PageHeader title={pageTitle} subtitle={pageSubtitle} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Version Selector */}
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">{roadmapTitle}</h2>
            <Tabs value={selectedVersion} onValueChange={setSelectedVersion} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-sm border border-white/10">
                <TabsTrigger value="mvp" className="data-[state=active]:bg-blue-500/20">
                  MVP
                </TabsTrigger>
                <TabsTrigger value="v1" className="data-[state=active]:bg-purple-500/20">
                  Version 1
                </TabsTrigger>
                <TabsTrigger value="v2" className="data-[state=active]:bg-pink-500/20">
                  Version 2
                </TabsTrigger>
                <TabsTrigger
                  value="longterm"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20"
                >
                  Long-term
                </TabsTrigger>
              </TabsList>

              {Object.entries(versions).map(([key, version]) => (
                <TabsContent key={key} value={key} className="mt-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Badge className={`${version.color} text-white px-4 py-2`}>{version.status}</Badge>
                      <span className="text-gray-400">{version.timeline}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{version.title}</h3>
                    <p className="text-gray-300 text-lg">{version.subtitle}</p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {getFeaturesByVersion(key).map((feature, index) => (
                      <ScrollReveal key={index} delay={index * 100}>
                        <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                                {feature.icon}
                              </div>
                              <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                            </div>
                            <p className="text-gray-300 text-sm">{feature.description}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                Technical Requirements
                              </h4>
                              <ul className="space-y-1">
                                {feature.specs.map((spec, specIndex) => (
                                  <li key={specIndex} className="flex items-center gap-2 text-sm text-gray-300">
                                    <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                                    {spec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </ScrollReveal>

        {/* Platform Features for MVP */}
        {selectedVersion === "mvp" && (
          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">{platformTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {platformFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                      </div>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {feature.specs.map((spec, specIndex) => (
                          <li key={specIndex} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Deployment Options */}
        <ScrollReveal>
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{deploymentTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deploymentOptions.map((option, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                        {option.icon}
                      </div>
                      <CardTitle className="text-white text-lg">{option.title}</CardTitle>
                    </div>
                    <p className="text-gray-300 text-sm">{option.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Success Metrics */}
        <ScrollReveal>
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{metricsTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {successMetrics.map((metric, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
                  <CardContent className="pt-6">
                    <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                    <p className="text-gray-300 text-sm">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageLayout>
  )
}
