"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, Search, BarChart2, Lightbulb, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const roles = [
  {
    id: "viewer",
    name: "Viewer",
    description: "Access to read dashboards and receive reports",
    capabilities: [
      "View dashboards and reports",
      "Receive scheduled insights",
      "Access shared analyses",
      "View KPI tracking",
      "Read comments and annotations",
    ],
    icon: Eye,
    color: "from-blue-400 to-cyan-300",
    forWho:
      "Perfect for executives, stakeholders, and team members who need to stay informed but don't need to create content.",
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Ask natural language questions, view insights, and set alerts",
    capabilities: [
      "All Viewer capabilities",
      "Ask ad-hoc natural language questions",
      "Create and manage personal alerts",
      "Explore data through guided interfaces",
      "Save and share findings",
    ],
    icon: Search,
    color: "from-emerald-400 to-teal-300",
    forWho: "Ideal for business users who need to find answers quickly without building complex dashboards.",
  },
  {
    id: "analyst",
    name: "Analyst",
    description: "Build dashboards, track KPIs, and configure filters",
    capabilities: [
      "All Explorer capabilities",
      "Create and edit dashboards",
      "Configure data filters and views",
      "Set up KPI tracking",
      "Create scheduled reports",
    ],
    icon: BarChart2,
    color: "from-purple-400 to-indigo-300",
    forWho: "Perfect for data analysts, business analysts, and power users who create content for others.",
  },
  {
    id: "creator",
    name: "Insight Creator",
    description: "Label insights, trigger scans, and refine logic",
    capabilities: [
      "All Analyst capabilities",
      "Label and categorize insights",
      "Trigger targeted data scans",
      "Refine insight detection logic",
      "Train the system with feedback",
    ],
    icon: Lightbulb,
    color: "from-amber-400 to-orange-300",
    forWho: "For advanced users who help train the system and improve insight quality for everyone.",
  },
  {
    id: "admin",
    name: "Admin",
    description: "Manage users, access control, integrations, and audit logs",
    capabilities: [
      "All Insight Creator capabilities",
      "User management and access control",
      "Integration configuration",
      "System settings and preferences",
      "Audit log access",
    ],
    icon: Settings,
    color: "from-rose-400 to-pink-300",
    forWho: "For IT administrators and system owners who manage the platform and user access.",
  },
]

export function UserRoles() {
  const [activeRole, setActiveRole] = useState(roles[0].id)

  const activeRoleData = roles.find((r) => r.id === activeRole)

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">User Roles & Capabilities</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            ANDI offers role-based access for unlimited users, ensuring everyone gets the right level of access.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="space-y-2">
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg flex items-center transition-all",
                    activeRole === role.id
                      ? `bg-gradient-to-r ${role.color} text-white`
                      : "bg-gray-800 hover:bg-gray-700 text-gray-200",
                  )}
                  whileHover={{ x: activeRole === role.id ? 0 : 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <role.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{role.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3">
            {activeRoleData && (
              <motion.div
                key={activeRoleData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700"
                whileHover={{
                  boxShadow: `0 0 25px 0 rgba(${
                    activeRoleData.id === "viewer"
                      ? "59, 130, 246"
                      : activeRoleData.id === "explorer"
                        ? "16, 185, 129"
                        : activeRoleData.id === "analyst"
                          ? "139, 92, 246"
                          : activeRoleData.id === "creator"
                            ? "245, 158, 11"
                            : "244, 63, 94"
                  }, 0.3)`,
                }}
              >
                <div className="flex items-center mb-6">
                  <div className={cn("rounded-full p-3 mr-4", `bg-gradient-to-r ${activeRoleData.color}`)}>
                    <activeRoleData.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{activeRoleData.name}</h3>
                </div>

                <p className="text-gray-300 mb-6">{activeRoleData.description}</p>

                <h4 className="font-semibold text-lg mb-4 text-white">Capabilities:</h4>
                <ul className="space-y-3 mb-8">
                  {activeRoleData.capabilities.map((capability, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={cn("rounded-full p-1 mr-3 mt-0.5", `bg-gradient-to-r ${activeRoleData.color}`)}>
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-gray-300">{capability}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h5 className="font-medium mb-2 text-white">Who is this for?</h5>
                  <p className="text-sm text-gray-400">{activeRoleData.forWho}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          className="mt-12 p-6 bg-gradient-to-r from-blue-900/70 to-cyan-900/70 backdrop-blur-sm rounded-xl text-white text-center border border-blue-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{
            boxShadow: "0 0 30px 0 rgba(59, 130, 246, 0.3)",
          }}
        >
          <h3 className="text-xl font-bold mb-2">Unlimited Users on Every Plan</h3>
          <p>
            Unlike traditional BI tools, ANDI allows unlimited users on every plan. You only pay for the insights and
            capabilities you need, not per seat.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
