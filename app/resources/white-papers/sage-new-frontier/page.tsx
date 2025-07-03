"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import PageLayout from "@/components/page-layout"
import ScrollReveal from "@/components/scroll-reveal"
import BulletList from "@/components/bullet-list"
import EvolutionTimeline from "@/components/evolution-timeline"
import CapabilityMatrix from "@/components/capability-matrix"
import DecisionFlow from "@/components/decision-flow"
import SageReadinessQuiz from "@/components/sage-readiness-quiz"
import SageRoiCalculator from "@/components/sage-roi-calculator"
import { ArrowRight, Download, Share2, Printer, BookOpen } from "lucide-react"
import Link from "next/link"

export default function SageWhitepaperPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <span>May 2025</span>
            <span className="mx-2">•</span>
            <span>15 min read</span>
            <span className="mx-2">•</span>
            <span>Zamora AI Research</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500">
            The Rise of SAGE: Why Strategic AI Guidance & Execution is the New Frontier Beyond BI
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            From insight to execution, ushering in the era of Strategic AI Guidance & Execution.
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 text-sm">
              <Download className="h-4 w-4 mr-2" />
              <span>Download PDF</span>
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 text-sm">
              <Share2 className="h-4 w-4 mr-2" />
              <span>Share</span>
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 text-sm">
              <Printer className="h-4 w-4 mr-2" />
              <span>Print</span>
            </button>
          </div>
        </motion.div>

        {/* Section 1: The Intelligence Gap */}
        <ScrollReveal>
          <div id="intelligence-gap" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">
              The Intelligence Gap: Why BI No Longer Delivers on Its Promise
            </h2>

            <p className="text-gray-300 mb-4">
              For the past two decades, Business Intelligence (BI) has served as the gold standard for organizations
              seeking to be data-driven. Dashboards, visualizations, and reports became embedded in workflows across
              finance, operations, marketing, and leadership. BI allowed companies to look back, measure performance,
              and optimize based on trends.
            </p>

            <p className="text-gray-300 mb-4">
              But something changed. The pace of business accelerated. Data volumes exploded. The shift from analysis to
              execution became critical.
            </p>

            <p className="text-gray-300 mb-6">
              Today, while BI tools remain widely used, they no longer meet the demands of decision-makers. Executives
              and managers don't just need charts, they need answers, recommendations, and automated actions. In other
              words, BI leaves an execution gap. It tells you what happened, but not what to do about it.
            </p>

            <p className="text-gray-300 mb-6">
              This gap has created a growing urgency for a new kind of platform, one that thinks, suggests, and acts.
              One that doesn't just visualize the past, but operationalizes the future.
            </p>
          </div>
        </ScrollReveal>

        {/* Section 2: The Evolution */}
        <ScrollReveal>
          <div id="evolution" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">The Evolution: From Intelligence to Action</h2>

            <p className="text-gray-300 mb-4">
              We've entered a new era: one where information overload is not the issue, action paralysis is. Businesses
              are overwhelmed not because they lack data, but because they lack the means to translate that data into
              timely, strategic execution.
            </p>

            <p className="text-gray-300 mb-6">
              Enter SAGE, Strategic AI Guidance & Execution, a new category of platform designed to solve this
              challenge.
            </p>

            <p className="text-gray-300 mb-6">
              SAGE platforms combine the intelligence of AI with the power of decision orchestration. They go beyond
              dashboards and reports. They answer high-value questions like:
            </p>

            <BulletList
              items={[
                "What's the best move to make right now?",
                "How can I resolve this issue before it becomes critical?",
                "Can the system act on my behalf or guide me to act in real time?",
              ]}
              delay={0.5}
            />

            <p className="text-gray-300 mt-6 font-medium">Where traditional BI ends, SAGE begins.</p>

            <EvolutionTimeline />
          </div>
        </ScrollReveal>

        {/* Section 3: What Is SAGE */}
        <ScrollReveal>
          <div id="what-is-sage" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">What Is SAGE?</h2>

            <p className="text-gray-300 mb-6">
              SAGE (Strategic AI Guidance & Execution) is a unified category of technology that:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/20">
                <h3 className="text-lg font-medium mb-2 text-blue-400">Analyzes</h3>
                <p className="text-gray-300">Connects to enterprise data across silos and interprets trends.</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/20">
                <h3 className="text-lg font-medium mb-2 text-purple-400">Thinks</h3>
                <p className="text-gray-300">Uses machine learning and reasoning to find opportunities and threats.</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg border border-pink-500/20">
                <h3 className="text-lg font-medium mb-2 text-pink-400">Guides</h3>
                <p className="text-gray-300">
                  Recommends next best actions through natural language or proactive alerts.
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg border border-emerald-500/20">
                <h3 className="text-lg font-medium mb-2 text-emerald-400">Executes</h3>
                <p className="text-gray-300">
                  Launches workflows, updates systems, or triggers automations, with or without human intervention.
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              Think of SAGE as the missing layer between BI dashboards and enterprise automation. It's the intelligence
              layer that doesn't just inform, it acts.
            </p>

            <DecisionFlow />
          </div>
        </ScrollReveal>

        {/* Section 4: Why Now */}
        <ScrollReveal>
          <div id="why-now" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">Why Now: Market Shifts Driving the Need for SAGE</h2>

            <p className="text-gray-300 mb-4">Modern organizations are managing increasing complexity:</p>

            <BulletList
              items={["Dozens of software tools.", "Fragmented systems.", "Overworked teams drowning in dashboards."]}
              delay={0.5}
            />

            <p className="text-gray-300 mt-6 mb-4">
              Yet decisions still take too long. Mistakes still happen. And execution is often disconnected from
              insight.
            </p>

            <p className="text-gray-300 mb-4">
              At the same time, AI has matured. Natural language processing, predictive models, and generative AI have
              unlocked new levels of intelligence. But these technologies are often deployed in isolation, chatbots,
              forecasting tools, or recommendation engines, rarely tied into enterprise execution.
            </p>

            <p className="text-gray-300 mb-6">
              SAGE bridges that gap. It fuses AI insight with decision pathways and workflow triggers. It lets you move
              from "what's happening" to "what should we do" to "let's do it now."
            </p>

            <p className="text-gray-300 mb-6 font-medium">It's not just timely. It's transformational.</p>
          </div>
        </ScrollReveal>

        {/* Section 5: The Pillars */}
        <ScrollReveal>
          <div id="pillars" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">The Pillars of a SAGE Platform</h2>

            <p className="text-gray-300 mb-6">A true SAGE platform includes the following foundational components:</p>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-lg font-medium mb-2 text-blue-400">1. Cognitive Intelligence</h3>
                <p className="text-gray-300">
                  Beyond static KPIs, SAGE platforms understand context, make correlations, and anticipate needs.
                </p>
              </div>

              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-all duration-300">
                <h3 className="text-lg font-medium mb-2 text-purple-400">2. Strategic Guidance</h3>
                <p className="text-gray-300">
                  The platform recommends actions, not just highlights issues. It understands business logic and adapts
                  to objectives.
                </p>
              </div>

              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-pink-500/30 transition-all duration-300">
                <h3 className="text-lg font-medium mb-2 text-pink-400">3. Execution Engine</h3>
                <p className="text-gray-300">
                  SAGE platforms connect to operational systems and can act directly, triggering automations, updating
                  systems, or assigning tasks.
                </p>
              </div>

              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-emerald-500/30 transition-all duration-300">
                <h3 className="text-lg font-medium mb-2 text-emerald-400">4. Conversational Interface</h3>
                <p className="text-gray-300">
                  Users engage via natural language, making the platform accessible to anyone, not just analysts.
                </p>
              </div>

              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-lg font-medium mb-2 text-blue-400">5. Collaboration Layer</h3>
                <p className="text-gray-300">
                  Insights and actions are shared across departments to promote alignment and transparency.
                </p>
              </div>

              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-all duration-300">
                <h3 className="text-lg font-medium mb-2 text-purple-400">6. Governance and Auditability</h3>
                <p className="text-gray-300">
                  Every suggestion and action is tracked. Security, compliance, and user permissions are built-in.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 6: Comparison */}
        <ScrollReveal>
          <div id="comparison" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">SAGE vs BI vs RPA vs CDPs: A Category Comparison</h2>

            <CapabilityMatrix />
          </div>
        </ScrollReveal>

        {/* Section 7: Meet ANDI */}
        <ScrollReveal>
          <div id="meet-andi" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">Meet ANDI: The First SAGE Platform</h2>

            <p className="text-gray-300 mb-4">
              ANDI, developed by Zamora, is the world's first Strategic AI Guidance & Execution platform. It's built to
              serve as the intelligent co-pilot for every business user, from operations and finance to sales and
              marketing.
            </p>

            <p className="text-gray-300 mb-6">
              ANDI is not just a data platform. It's a decision engine. It ingests data, analyzes patterns, offers
              intelligent suggestions, and triggers workflows, in real time.
            </p>

            <BulletList
              items={[
                "Ask ANDI a question in plain language, and it responds with visualized data, insights, and an action recommendation.",
                "Let ANDI act, generate a customer email, approve a budget reallocation, or launch a service ticket.",
                "Collaborate with ANDI, co-author reports, receive AI-augmented meeting notes, or generate business plans with data-driven reasoning.",
              ]}
              delay={0.5}
            />

            <p className="text-gray-300 mt-6 mb-6">
              By replacing 3–5 disconnected tools with a single platform, ANDI also drives measurable ROI while
              simplifying tech stacks.
            </p>

            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-center text-white">Try ANDI in Action</h3>
              <p className="text-gray-300 mb-6 text-center">
                Experience how ANDI transforms data into decisions with this interactive demo.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/demo"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md flex items-center"
                >
                  <span>Launch Interactive Demo</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 8: Business Case */}
        <ScrollReveal>
          <div id="business-case" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">The Business Case for SAGE</h2>

            <p className="text-gray-300 mb-6">
              For leadership teams, the SAGE model presents tangible and strategic advantages:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-emerald-400">Speed to Insight → Speed to Action</h3>
                <p className="text-gray-300 text-sm">
                  Reduce decision cycles from days to minutes with AI-powered recommendations and automated execution.
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-emerald-400">Lower Cost of Ownership</h3>
                <p className="text-gray-300 text-sm">
                  Consolidate multiple tools into a single platform, reducing licensing, maintenance, and training
                  costs.
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-emerald-400">Better Decision Accuracy</h3>
                <p className="text-gray-300 text-sm">
                  AI-driven recommendations based on comprehensive data analysis lead to more consistent, optimal
                  decisions.
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-emerald-400">Stronger Cross-Functional Alignment</h3>
                <p className="text-gray-300 text-sm">
                  Shared insights and collaborative workflows ensure everyone works from the same information.
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg md:col-span-2">
                <h3 className="text-lg font-medium mb-2 text-emerald-400">Greater Agility in Market Response</h3>
                <p className="text-gray-300 text-sm">
                  Detect and respond to market changes faster with proactive alerts and automated response workflows.
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              Companies deploying ANDI have already seen improvements in decision velocity, reduced time-to-resolution,
              and significant cost savings through automation.
            </p>

            <SageRoiCalculator />
          </div>
        </ScrollReveal>

        {/* Section 9: SAGE Movement */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">SAGE Is Not a Feature, It's a Movement</h2>

            <p className="text-gray-300 mb-4">Every software era has its defining category:</p>

            <BulletList
              items={["CRM redefined sales.", "ERP redefined operations.", "BI redefined reporting."]}
              delay={0.5}
            />

            <p className="text-gray-300 mt-6 mb-6">Now, SAGE will redefine intelligence-to-execution.</p>

            <p className="text-gray-300 mb-6">
              SAGE is not an add-on to BI, or a feature in your ERP. It's a foundational shift in how businesses think,
              operate, and grow.
            </p>

            <SageReadinessQuiz />
          </div>
        </ScrollReveal>

        {/* Section 10: Adoption */}
        <ScrollReveal>
          <div id="adoption" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">How to Adopt the SAGE Framework</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emerald-400 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-white">Map your decision bottlenecks</h3>
                  <p className="text-gray-300">Where does insight stall before action?</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emerald-400 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-white">Evaluate disconnected tools</h3>
                  <p className="text-gray-300">
                    Where are you duplicating effort across BI, RPA, analytics, and dashboards?
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emerald-400 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-white">Run a pilot with ANDI</h3>
                  <p className="text-gray-300">
                    Choose one strategic area (e.g., financial planning or sales forecasting).
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emerald-400 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-white">Measure outcomes</h3>
                  <p className="text-gray-300">Focus on decision time, accuracy, and time-to-execution.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emerald-400 font-bold">5</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-white">Scale intelligently</h3>
                  <p className="text-gray-300">Use ANDI's cross-department capabilities to expand across your org.</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Conclusion */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Final Thought: Defining the Next Generation of Intelligent Work
            </h2>

            <p className="text-gray-300 mb-4">
              We believe SAGE will become a globally recognized segment, as fundamental as BI or CRM, because it
              responds to a new world of work: one where thinking and doing must be seamless.
            </p>

            <p className="text-gray-300 mb-4">
              With ANDI, Zamora is proud to lead the way, defining the category and empowering companies that want to
              work smarter, not harder.
            </p>

            <p className="text-gray-300 mb-6">If BI was about understanding your business, SAGE is about growing it.</p>

            <p className="text-xl font-medium text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500">
              Welcome to the era of Strategic AI Guidance & Execution.
            </p>

            <p className="text-xl font-medium text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500">
              Welcome to the future.
            </p>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to Experience SAGE?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Schedule a personalized demo of ANDI and see how Strategic AI Guidance & Execution can transform your
              business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md"
              >
                Request Demo
              </Link>
              <Link
                href="/resources/white-papers"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center justify-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                <span>Explore More White Papers</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Related Content */}
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-white">Related Resources</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/resources/white-papers/ai-business-unified-analytics"
                className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-medium mb-2 text-white">AI in Business: Unified Analytics</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Why unified platforms are the future of data-driven decisions
                </p>
                <div className="flex items-center text-purple-400 text-sm">
                  <span>Read whitepaper</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>

              <Link
                href="/resources/case-studies"
                className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-medium mb-2 text-white">SAGE Success Stories</h3>
                <p className="text-gray-400 text-sm mb-2">Real-world examples of SAGE implementation outcomes</p>
                <div className="flex items-center text-purple-400 text-sm">
                  <span>View case studies</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>

              <Link
                href="/resources/webinars"
                className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-medium mb-2 text-white">SAGE in Action Webinar</h3>
                <p className="text-gray-400 text-sm mb-2">Watch our on-demand demo of ANDI's capabilities</p>
                <div className="flex items-center text-purple-400 text-sm">
                  <span>Watch webinar</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageLayout>
  )
}
