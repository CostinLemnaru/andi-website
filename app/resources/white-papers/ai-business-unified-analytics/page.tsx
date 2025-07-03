"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import PageLayout from "@/components/page-layout"
import Link from "next/link"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import WhitepaperSection from "@/components/whitepaper-section"
import StatCard from "@/components/stat-card"
import QuoteCard from "@/components/quote-card"
import BulletList from "@/components/bullet-list"
import InteractiveTimeline from "@/components/interactive-timeline"
import ComparisonSlider from "@/components/comparison-slider"
import InteractivePainPoints from "@/components/interactive-pain-points"
import BenefitsCalculator from "@/components/benefits-calculator"
import KeyInsightsTabs from "@/components/key-insights-tabs"

export default function WhitepaperPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/resources/white-papers"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to White Papers</span>
          </Link>
        </div>

        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            AI in Business: Why Unified Analytics & Business Intelligence Platforms are the Future of Data-Driven
            Decisions
          </h1>

          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="text-sm text-gray-400">May 2025</div>
              <div className="text-sm bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full">15 min read</div>
            </div>

            <div className="flex space-x-4">
              <button className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="h-4 w-4 mr-2" />
                <span>Download PDF</span>
              </button>
              <button className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Introduction */}
        <WhitepaperSection title="Introduction: The Rise of AI and Data-Driven Decisions in Business">
          <p>
            In today's digital economy, data has become the lifeblood of nearly every business decision. Organizations
            across all industries – from finance and retail to healthcare and manufacturing – are investing heavily in
            AI in business and advanced analytics platforms to gain insights and competitive advantage.
          </p>

          <QuoteCard
            quote="Demand for AI platforms is expected to grow ~40% annually over the next four years, soaring from $27.9 billion in 2023 to $153 billion by 2028"
            source="IDC Research, 2024"
            delay={0}
          />

          <p>
            Leaders recognize that embracing data can transform everything from customer experiences to operational
            efficiency. In fact, 90% of companies consider data and analytics crucial to their business strategy and
            success. The ability to make data-driven decisions swiftly and confidently is now seen as a key
            differentiator in the marketplace.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <StatCard
              value="90%"
              label="of companies consider data and analytics crucial to their business strategy"
              color="blue"
              delay={0}
            />
            <StatCard
              value="40%"
              label="annual growth in AI platforms expected over the next four years"
              color="purple"
              delay={1}
            />
            <StatCard value="$153B" label="projected AI platform market size by 2028" color="pink" delay={2} />
          </div>

          <InteractiveTimeline
            events={[
              {
                year: "2010-2015",
                title: "The Rise of Business Intelligence",
                description:
                  "Organizations began adopting basic BI tools for reporting and dashboards, but these tools were primarily used by analysts and data specialists.",
              },
              {
                year: "2016-2019",
                title: "Proliferation of Analytics Tools",
                description:
                  "Companies started using multiple specialized tools for different analytics needs, leading to tool sprawl and data silos.",
              },
              {
                year: "2020-2022",
                title: "AI Adoption Acceleration",
                description:
                  "AI and machine learning tools became more accessible, but often remained separate from traditional BI platforms.",
              },
              {
                year: "2023-2025",
                title: "Unified Platform Emergence",
                description:
                  "Organizations are now seeking unified platforms that combine data, AI, and BI capabilities in one cohesive environment.",
              },
              {
                year: "2026+",
                title: "Democratized Data Intelligence",
                description:
                  "The future will see AI-powered analytics accessible to everyone in an organization through intuitive, unified platforms.",
              },
            ]}
          />

          <p>
            Worldwide, AI adoption and investment are accelerating as companies strive to become more data-driven.
            Analysts project explosive growth in the AI and analytics market, reflecting the urgent demand for
            integrated solutions that can turn data into actionable insight. According to IDC, demand for AI platforms
            is expected to grow ~40% annually over the next four years, soaring from $27.9 billion in 2023 to $153
            billion by 2028.
          </p>

          <QuoteCard
            quote="The AI platform market is experiencing unprecedented growth as organizations recognize that AI is not just a competitive advantage but a business necessity. Companies that fail to adopt these technologies risk falling behind competitors who can make faster, more accurate decisions."
            source="Computerworld News Analysis, 2024"
            delay={1}
          />

          <p>
            This remarkable growth underlines how rapidly businesses are expanding their use of AI and business
            intelligence tools to stay ahead. Yet, even as organizations accumulate more data and adopt more analytics
            tools, many are finding that how they implement these technologies matters just as much as how much they
            invest.
          </p>

          <p>
            The challenge? In many companies, data, AI, and reporting tools remain scattered across siloed systems. The
            typical enterprise might use separate solutions for data storage, data analysis, machine learning, and BI
            reporting. This fragmentation creates friction at exactly the time businesses need agility.
          </p>

          <p>
            As we'll explore, managing multiple disconnected tools introduces serious pain points that can undermine the
            very promise of AI and analytics. The good news is that a new generation of unified AI platforms is emerging
            to address these challenges. Forward-thinking companies are increasingly seeking unified, intuitive, and
            secure platforms that bring data, analytics, and AI capabilities together under one roof.
          </p>
        </WhitepaperSection>

        {/* Pain Points */}
        <WhitepaperSection title="The Pain of Disconnected Data, AI, and Reporting Tools" delay={1}>
          <p>
            Relying on a patchwork of disparate tools for data integration, analysis, and reporting can bog down even
            the most tech-savvy organization. Some of the common pain points businesses face with multiple disconnected
            business intelligence tools include:
          </p>

          <InteractivePainPoints />

          <QuoteCard
            quote="Our research shows that 86% of organizations use at least two different BI platforms, and 61% use four or more. This tool sprawl creates significant challenges for data consistency, governance, and user adoption."
            source="Research.com Survey on Analytics Tools, 2024"
            delay={2}
          />

          <QuoteCard
            quote="Data silos are an all-too-common problem. Studies show that 80% of companies report moderate to high levels of siloed data, and around 69% struggle to get a comprehensive, single view of their customers as a result."
            source="CompTIA Research"
            delay={3}
          />

          <p>
            Such fragmentation illustrates why relying on many disconnected tools can hinder a truly data-driven
            business. Each additional standalone tool increases the fragmentation of data and the burden on users to
            piece together insights. The pain is felt in lost productivity, higher costs, and slower, less confident
            decision-making.
          </p>

          <p>
            Ultimately, the status quo of multiple disconnected data, AI, and reporting tools is at odds with the speed
            and collaboration that modern businesses need. To unlock the full value of data-driven decisions, companies
            must break down these silos and inefficiencies. That is why more and more organizations are now seeking a
            different approach – one that emphasizes unification, simplicity, and security in their data analytics
            stack.
          </p>
        </WhitepaperSection>

        {/* Benefits */}
        <WhitepaperSection title="Why Businesses Are Moving to Unified, Intuitive & Secure Platforms" delay={2}>
          <p>
            The frustrations with fragmented tools have given rise to a clear market trend: businesses are pivoting
            toward unified analytics platforms that combine data, AI, and BI capabilities in one cohesive environment.
            Rather than forcing users to hop between dozens of specialized applications, the goal is to provide an
            all-in-one platform that is intuitive to use and secure by design.
          </p>

          <ComparisonSlider
            leftTitle="Fragmented Tools Approach"
            rightTitle="Unified Platform Approach"
            leftContent={
              <ul className="space-y-2 text-sm">
                <li>• Multiple disconnected systems</li>
                <li>• Data silos and integration headaches</li>
                <li>• Inconsistent metrics across tools</li>
                <li>• Limited to technical specialists</li>
                <li>• Security gaps between systems</li>
                <li>• High maintenance overhead</li>
                <li>• Slow time-to-insight</li>
              </ul>
            }
            rightContent={
              <ul className="space-y-2 text-sm">
                <li>• Single integrated platform</li>
                <li>• Consolidated data sources</li>
                <li>• Consistent metrics and KPIs</li>
                <li>• Accessible to all employees</li>
                <li>• Centralized security controls</li>
                <li>• Lower total cost of ownership</li>
                <li>• Rapid insights and decisions</li>
              </ul>
            }
          />

          <QuoteCard
            quote="Organizations with unified data management report 35% better compliance outcomes and 42% fewer security incidents related to data handling compared to those with fragmented approaches."
            source="AdvantageCG Security & Compliance Report, 2024"
            delay={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Single Source of Truth</h3>
              <p className="text-gray-300">
                A unified platform consolidates data from across the enterprise – databases, spreadsheets, cloud apps,
                you name it – into one place. This means everyone from the CEO to a data analyst works off the same
                figures and dashboards.
              </p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Seamless AI and BI Integration</h3>
              <p className="text-gray-300">
                The power of unified platforms is that advanced AI in business workflows (like machine learning models
                or AI-driven insights) live side-by-side with traditional business intelligence reporting.
              </p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-pink-500/20 rounded-lg p-6 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">Ease of Use = Broader Adoption</h3>
              <p className="text-gray-300">
                A key driver for unification is the push to make analytics accessible to every decision-maker, not just
                technical experts. Unified platforms are being built with intuitive interfaces, drag-and-drop
                simplicity, and even natural language query features.
              </p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Improved Security and Data Governance</h3>
              <p className="text-gray-300">
                Bringing everything into a unified environment also has significant security and compliance advantages.
                Modern unified platforms typically offer centralized security controls and governance – meaning
                permissions, access logs, and data policies are managed in one place.
              </p>
            </div>
          </div>

          <BenefitsCalculator />

          <p>
            By addressing the core needs of unification, ease-of-use, and security, modern platforms are positioned as
            forward-thinking solutions for companies that want to be truly data-driven. They align perfectly with the
            industry's move towards unified platforms that don't just serve analysts, but everyone.
          </p>
        </WhitepaperSection>

        {/* ANDI Introduction */}
        <WhitepaperSection title="Meet ANDI by Zamora: Making Data Accessible and Actionable for Everyone" delay={3}>
          <p>
            Recognizing the need for a unified and user-centric analytics experience, startup Zamora has developed ANDI,
            an all-in-one analytics and business intelligence platform designed to empower every employee – not just
            data specialists – to work with data confidently. ANDI (Analytics and Intelligence) was built from the
            ground up with a clear mission: make data accessible and actionable for everyone in a company.
          </p>

          <p>
            What sets ANDI apart is its holistic approach. Instead of offering just a dashboard tool, or just an AI
            insight tool, ANDI combines data ingestion, analysis, AI-driven intelligence, and reporting in one seamless
            platform. Zamora's vision for ANDI was directly informed by the pain points businesses face with fragmented
            tools: the founders deliberately engineered ANDI to break down data silos, eliminate redundant steps, and
            put the power of analytics into the hands of the many rather than the few.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 hover:border-blue-500/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Intuitive for Users</h3>
              <p className="text-gray-300">
                ANDI's interface is designed to be as familiar and easy as the consumer apps we use daily. For example,
                a sales manager or marketing lead can log in and ask questions in natural language – "Show me our top 5
                products by revenue this quarter and the key factors driving their sales" – and ANDI will parse the
                query, analyze the data, and present an answer with relevant charts and AI-generated explanations.
              </p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Unified and Collaborative</h3>
              <p className="text-gray-300">
                ANDI acts as a central hub where data from across the organization comes together. Whether it's a CSV
                export from an ERP system, a live connection to a cloud database, or even unstructured text, ANDI's data
                ingestion module can pull it in and unify it.
              </p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 hover:border-pink-500/30 transition-all duration-300 md:col-span-2">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">Secure and Governed</h3>
              <p className="text-gray-300">
                From the outset, Zamora built enterprise-grade security and governance into ANDI. All data in the
                platform is governed by centralized access controls – meaning managers can easily define who can view or
                edit certain data, down to the row or column level. ANDI also maintains an audit log of data usage,
                which is crucial for compliance.
              </p>
            </div>
          </div>
        </WhitepaperSection>

        <KeyInsightsTabs />

        {/* Capabilities */}
        <WhitepaperSection title="Key Capabilities of ANDI's MVP" delay={4}>
          <p>
            Zamora has launched ANDI with a robust minimum viable product (MVP) that already covers the end-to-end
            analytics journey. Even in its initial version, ANDI delivers a suite of powerful features aimed at making
            analytics simple and impactful:
          </p>

          <BulletList
            items={[
              "Easy Data Ingestion: ANDI can connect to a wide variety of data sources and ingest data with minimal effort. Whether it's pulling from cloud databases, uploading spreadsheets, or streaming data from an app, ANDI handles the extraction and consolidation behind the scenes.",
              "Interactive Data Visualization: At its heart, ANDI includes a full-fledged business intelligence module for visualization and reporting. Users can create interactive dashboards, charts, and graphs through an intuitive drag-and-drop interface.",
              "AI-Driven Insights: One of the standout features of ANDI is its AI-driven insights engine. As users explore data, ANDI's algorithms work in the background to surface noteworthy patterns and anomalies.",
              "Natural Language Querying: ANDI supports natural language querying (NLQ), which is a game-changer for user friendliness. Users can literally converse with the platform: ask a question or type a command as if they were talking to another person.",
              "Collaboration and Sharing: ANDI includes built-in collaboration features to make analytics a team sport. Users can share live dashboards or reports with colleagues in a few clicks, with fine-grained control over who can view or edit.",
            ]}
            delay={5}
          />

          <QuoteCard
            quote="The democratization of data analytics is a top priority for 78% of enterprises. Organizations that successfully implement self-service analytics report 64% higher employee satisfaction with their data tools and 41% faster time-to-insight."
            source="Research.com Data Democratization Study, 2024"
            delay={6}
          />

          <p>
            It's important to note that these capabilities come fully integrated in one platform. The real power of
            ANDI's MVP is not just each feature in isolation, but the fact that they work together seamlessly. A user
            can ingest new data, analyze it, get AI insights, create a visualization, and share it with peers all within
            ANDI, without jumping to another tool or losing context.
          </p>

          <p>
            This cohesive flow is what drives productivity and better decision-making. Already, early adopters of ANDI
            have noted how it drastically cuts down the time from "data to insight" – what used to take days across
            multiple tools can now happen in a single afternoon.
          </p>
        </WhitepaperSection>

        {/* Future */}
        <WhitepaperSection title="A Vision for Tomorrow: ANDI's Roadmap and Future Capabilities" delay={5}>
          <p>
            While ANDI's current features provide a strong foundation, Zamora has an ambitious roadmap to further
            enhance the platform. The vision is to continually push the envelope of what a unified AI and analytics
            platform can do, anticipating the future needs of businesses as they become more data-driven.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 hover:border-blue-500/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                Advanced Forecasting and Predictive Analytics
              </h3>
              <p className="text-gray-300">
                In upcoming releases, ANDI will offer more powerful forecasting tools that allow companies to literally
                see what's coming around the corner. This goes beyond basic trend lines to full AI-powered forecasting
                models. Users will be able to generate predictions such as sales forecasts, customer churn
                probabilities, or demand projections with just a few clicks.
              </p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Automated Data Governance and Quality Management
              </h3>
              <p className="text-gray-300">
                As companies scale up their data usage, maintaining data quality and governance can become a bottleneck.
                ANDI's roadmap addresses this through automated data governance features. The platform will utilize AI
                to continuously monitor data for anomalies, inconsistencies, or compliance issues.
              </p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 hover:border-pink-500/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">
                Customizable Integrations and Open API Ecosystem
              </h3>
              <p className="text-gray-300">
                Recognizing that every enterprise has a unique tech stack, Zamora plans to make ANDI even more flexible
                through custom integrations. Beyond the connectors it already provides, ANDI will offer an open API and
                integration framework so that businesses can easily connect their in-house systems or third-party
                applications.
              </p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 hover:border-blue-500/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Real-Time Analytics and Alerts</h3>
              <p className="text-gray-300">
                Business doesn't happen in batch intervals – it's continuous. To support truly agile decision-making,
                ANDI is slated to introduce full real-time analytics processing. In the near future, the platform will
                be able to ingest and analyze streaming data with minimal latency.
              </p>
            </div>
          </div>

          <QuoteCard
            quote="Real-time analytics capabilities will be a defining feature of next-generation platforms. Our research indicates that 83% of organizations consider real-time insights critical for their future competitiveness, especially in fast-moving sectors like finance, e-commerce, and manufacturing."
            source="Research.com Future of Analytics Report, 2024"
            delay={4}
          />
          <p>
            These future enhancements – advanced forecasting, automated governance, rich integrations, and real-time
            analytics – all build on the platform's core philosophy of unification and user-centric design. They also
            reflect the broader direction of the analytics industry.
          </p>

          <p>
            By continuously incorporating emerging capabilities, Zamora is positioning ANDI not just as a product, but
            as a long-term data partner for businesses – one that will evolve with the rapidly changing landscape of AI
            and analytics.
          </p>
        </WhitepaperSection>

        {/* Conclusion */}
        <WhitepaperSection title="Conclusion: Empowering a Data-Driven Culture with Unified AI Platforms" delay={6}>
          <p>
            The writing is on the wall: to thrive in an increasingly data-rich and fast-paced world, businesses must
            rethink their approach to analytics. The era of juggling isolated business intelligence tools and stitching
            together insights with manual effort is giving way to a new era of unified AI and analytics platforms.
          </p>

          <QuoteCard
            quote="For decision-makers, innovation leads, and data-centric business leaders, the message is clear and inspiring: the tools to harness your data's full potential are finally catching up to your ambitions."
            delay={7}
          />

          <p>
            ANDI, developed by Zamora, embodies this new approach. It addresses the pain points that have frustrated
            business and IT leaders for years – from data silos and hidden insights to poor user adoption and security
            worries – and replaces them with a cohesive solution designed for the way we need to work with data today.
          </p>

          <p>
            By making data accessible and actionable for everyone, ANDI doesn't just improve reports or dashboards; it
            has the potential to transform an organization's culture. When a salesperson can quickly pull up AI-driven
            insights before a client meeting, or an executive can ask a question and get an instant answer from the data
            – that's empowering. It leads to smarter decisions at all levels, grounded in evidence rather than instinct.
          </p>

          <p>
            In closing, companies that embrace unified, AI-driven business intelligence platforms are positioning
            themselves to lead in the modern era. They are building the internal capability to quickly turn data into
            decisions and decisions into action. Zamora's ANDI offers a compelling vision of that future – a future
            where data-driven decisions are the default, not the exception, and where every employee can contribute
            insights and innovation.
          </p>

          <p>
            The demand for such unified platforms is only growing, and those who act early will reap the benefits of
            sharper insights, faster execution, and a truly data-empowered workforce. The journey to becoming a smarter,
            more agile organization begins with having the right platform, and for many, ANDI could be the key to
            unlocking that next level of excellence.
          </p>

          <QuoteCard
            quote="Organizations that have implemented unified analytics platforms report 3.2x faster decision-making cycles and 2.7x higher ROI on their data investments compared to those using fragmented approaches."
            source="TechTarget Enterprise Analytics Survey, 2024"
            delay={8}
          />
        </WhitepaperSection>

        {/* Sources */}
        <WhitepaperSection title="Sources" delay={7}>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>IDC Research and Computerworld News on AI Platform Market Growth</li>
            <li>Data Dynamics – Impact of Data Silos on Economy and Organizations</li>
            <li>Research.com – Survey on Multiple BI Tools Used by Organizations</li>
            <li>TechTarget – Data Silos, Integration Challenges, and Trust in Data</li>
            <li>AdvantageCG – Benefits of Unified Data Management (Security, Compliance)</li>
            <li>Research.com – Data Democratization and Self-Service Analytics Trend</li>
            <li>Research.com – Predictive Analytics and Real-Time Analytics in Platforms</li>
          </ul>
        </WhitepaperSection>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 my-12">
          <h3 className="text-2xl font-bold mb-4 text-white">Ready to transform your data strategy?</h3>
          <p className="text-gray-200 mb-6">
            Learn how ANDI can help your organization unify data, analytics, and AI capabilities into one seamless
            platform.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium">
              Request a Demo
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
