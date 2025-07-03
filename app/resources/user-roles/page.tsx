import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import { UserRoles } from "@/components/user-roles"
import ScrollReveal from "@/components/scroll-reveal"

export default function UserRolesPage() {
  return (
    <PageLayout>
      <PageHeader
        title="User Roles & Capabilities"
        subtitle="Understanding the different user roles in ANDI and how they can help your team collaborate effectively"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ScrollReveal>
          <div className="prose prose-invert max-w-none mb-16">
            <p className="text-xl text-gray-300 leading-relaxed">
              ANDI's role-based access control system ensures that everyone in your organization gets exactly the right
              level of access they need. From executives who need high-level insights to power users who build
              dashboards, our flexible roles system scales with your team.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Unlike traditional BI tools that charge per seat, ANDI allows{" "}
              <span className="font-bold text-white">unlimited users on every plan</span>. This means you can invite
              your entire organization to collaborate without worrying about escalating costs. Our role-based system
              ensures proper governance while maximizing collaboration.
            </p>
          </div>
        </ScrollReveal>

        <UserRoles />

        <ScrollReveal>
          <div className="mt-20 bg-gray-900/60 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Role-Based Collaboration Best Practices</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Executive Insights</h3>
                <p className="text-gray-300">
                  Executives typically use the Viewer role to access high-level dashboards and insights without needing
                  to create content. Consider setting up automated reports and insight subscriptions to keep leadership
                  informed without requiring them to log in regularly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Analyst Workflow</h3>
                <p className="text-gray-300">
                  Analysts benefit from the Analyst and Insight Creator roles, which allow them to build dashboards and
                  train the system. Create a regular feedback loop where analysts can refine the system's insight
                  detection logic based on business needs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Cross-Functional Teams</h3>
                <p className="text-gray-300">
                  For cross-functional teams, use the Explorer role to enable team members to ask questions and explore
                  data without overwhelming them with dashboard creation tools. This empowers everyone to find answers
                  while maintaining governance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">IT and Administration</h3>
                <p className="text-gray-300">
                  IT teams should use the Admin role to manage user access and system configurations. We recommend
                  having at least two administrators to ensure continuity and implementing regular access reviews to
                  maintain security.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to empower your entire team?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              With unlimited users on every plan, ANDI makes it easy to bring your whole organization into the data
              conversation.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/pricing"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white font-medium hover:from-blue-700 hover:to-cyan-600 transition-all"
              >
                View Pricing Plans
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-gray-800 rounded-lg text-white font-medium hover:bg-gray-700 transition-all"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageLayout>
  )
}
