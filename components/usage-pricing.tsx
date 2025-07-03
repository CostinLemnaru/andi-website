"use client"

import { motion } from "framer-motion"
import {
  Check,
  Users,
  Zap,
  ArrowRight,
  Database,
  Server,
  Globe,
  Webhook,
  Headphones,
  Search,
  MessageSquare,
  Infinity,
  BarChart3,
} from "lucide-react"

export function UsagePricing() {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Usage-Based vs. Seat-Based Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Pay for the value you receive, not for each user who needs access to insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              boxShadow: "0 0 25px 0 rgba(59, 130, 246, 0.3)",
            }}
          >
            <div className="flex items-center mb-6">
              <div className="rounded-full p-3 mr-4 bg-gradient-to-r from-blue-500 to-cyan-400">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Usage-Based Pricing</h3>
            </div>

            <p className="text-gray-300 mb-8">
              With ANDI's usage-based pricing, you pay for the insights and capabilities you use, not per user. This
              allows unlimited team members to access the platform while you only scale costs as your value grows.
            </p>

            <h4 className="font-semibold text-lg mb-4 text-white">Benefits:</h4>
            <ul className="space-y-3 mb-8">
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <span className="text-gray-300">Unlimited users across your organization</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <span className="text-gray-300">Scale costs only when your usage and value increase</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <span className="text-gray-300">Predictable pricing based on actual platform usage</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <span className="text-gray-300">Democratize access to insights across teams</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <span className="text-gray-300">The more your team uses ANDI, the smarter it gets</span>
              </motion.li>
            </ul>

            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-800/50">
              <p className="text-sm text-blue-300 italic">
                "You're not paying for seats. You're paying for insight. The more your team asks, the smarter ANDI gets
                — and you only scale when your value does."
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{
              boxShadow: "0 0 25px 0 rgba(156, 163, 175, 0.3)",
            }}
          >
            <div className="flex items-center mb-6">
              <div className="rounded-full p-3 mr-4 bg-gradient-to-r from-gray-500 to-gray-400">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Traditional Seat-Based Pricing</h3>
            </div>

            <p className="text-gray-300 mb-8">
              Traditional BI tools charge per user, creating barriers to insight adoption and limiting the spread of
              data-driven decision making across your organization.
            </p>

            <h4 className="font-semibold text-lg mb-4 text-white">Limitations:</h4>
            <ul className="space-y-3 mb-8">
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ArrowRight className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-300">Costs increase with each new user regardless of value</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ArrowRight className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-300">Creates incentives to limit access to insights</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ArrowRight className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-300">Unpredictable costs as organization grows</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ArrowRight className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-300">Siloed insights that don't benefit from collective usage</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ArrowRight className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-300">Difficult to justify ROI for broader deployment</span>
              </motion.li>
            </ul>

            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400 italic">
                "Traditional BI tools charge you more as you add users, creating a disincentive to democratize data.
                ANDI's model encourages organization-wide adoption from day one."
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 p-8 bg-gradient-to-r from-purple-900/70 to-indigo-900/70 backdrop-blur-sm rounded-xl text-white border border-purple-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{
            boxShadow: "0 0 30px 0 rgba(139, 92, 246, 0.3)",
          }}
        >
          <h3 className="text-2xl font-bold mb-4 text-center">Usage-Based Add-Ons</h3>
          <p className="mb-8 text-center max-w-3xl mx-auto">
            Scale your ANDI platform with flexible add-ons that match your specific needs. Only pay for the additional
            capacity you require.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Query Add-Ons */}
            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                borderColor: "rgba(124, 58, 237, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Extra 10K System Queries</h4>
              <p className="text-gray-300 text-sm mb-4">
                Additional automated insights from scheduled dashboards and system scans to expand your insight
                coverage.
              </p>
              <div className="bg-blue-900/30 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full inline-block">
                Available for: All tiers
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                borderColor: "rgba(124, 58, 237, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Extra 10K Ad-Hoc NLQs</h4>
              <p className="text-gray-300 text-sm mb-4">
                Additional user-generated natural language queries for deeper exploration and on-demand insights.
              </p>
              <div className="bg-blue-900/30 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full inline-block">
                Available for: All tiers
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                borderColor: "rgba(124, 58, 237, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                <Infinity className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Unlimited NLQs</h4>
              <p className="text-gray-300 text-sm mb-4">
                Unlimited user-generated natural language queries for organizations with high analytical demands.
              </p>
              <div className="bg-purple-900/30 text-purple-300 text-xs font-medium px-2.5 py-1 rounded-full inline-block">
                Available for: Enterprise only
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                borderColor: "rgba(124, 58, 237, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-600 mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Extra 1000 Generated Insights</h4>
              <p className="text-gray-300 text-sm mb-4">
                Unlock an additional 1 000 high-confidence, actionable insights beyond your plan’s monthly allowance. Each insight delivers meaningful patterns, anomalies, or opportunities identified by ANDI’s AI engine, ready to trigger automation, inform decisions, or surface in dashboards, alerts, and reports.
              </p>
              <div className="bg-blue-900/30 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full inline-block">
                Available for: All tiers
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                borderColor: "rgba(124, 58, 237, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-600 mb-4">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Extra 1 TB Cold Storage</h4>
              <p className="text-gray-300 text-sm mb-4">
                Additional archived data storage for historical reference and long-term trend analysis.
              </p>
              <div className="bg-blue-900/30 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full inline-block">
                Available for: All tiers
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                borderColor: "rgba(124, 58, 237, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-teal-600 to-emerald-600 mb-4">
                <Server className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Custom Model Hosting (BYO AI)</h4>
              <p className="text-gray-300 text-sm mb-4">
                Host your own AI models within ANDI for specialized analytics and custom insight generation.
              </p>
              <div className="bg-teal-900/30 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full inline-block">
                Available for: Scale, Enterprise
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                borderColor: "rgba(124, 58, 237, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Data Residency (EU, US, etc.)</h4>
              <p className="text-gray-300 text-sm mb-4">
                Control where your data is stored to meet regional compliance and regulatory requirements.
              </p>
              <div className="bg-purple-900/30 text-purple-300 text-xs font-medium px-2.5 py-1 rounded-full inline-block">
                Available for: Enterprise only
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                borderColor: "rgba(124, 58, 237, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-teal-600 to-emerald-600 mb-4">
                <Webhook className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Insight API / Webhooks</h4>
              <p className="text-gray-300 text-sm mb-4">
                Programmatic access to ANDI insights for integration with your existing tools and workflows.
              </p>
              <div className="bg-teal-900/30 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full inline-block">
                Available for: Scale, Enterprise
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                borderColor: "rgba(124, 58, 237, 0.5)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-teal-600 to-emerald-600 mb-4">
                <Headphones className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-2">Dedicated Integration Support</h4>
              <p className="text-gray-300 text-sm mb-4">
                Expert assistance with connecting ANDI to your existing systems and data sources.
              </p>
              <div className="bg-teal-900/30 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full inline-block">
                Available for: Scale, Enterprise
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
