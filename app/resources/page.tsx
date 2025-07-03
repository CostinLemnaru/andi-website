import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import SectionCard from "@/components/section-card"
import { FileText, Video, BookOpen, Download, Users } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function ResourcesPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Resources"
        subtitle="Explore our library of resources to learn more about ANDI and how it can transform your business"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <ScrollReveal>
            <SectionCard
              title="White Papers"
              description="In-depth research and analysis on AI intelligence, business transformation, and the future of decision-making."
              icon={<FileText className="h-6 w-6 text-white" />}
              link="/resources/white-papers"
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionCard
              title="Case Studies"
              description="Real-world examples of how businesses are using ANDI to transform their operations and drive growth."
              icon={<BookOpen className="h-6 w-6 text-white" />}
              link="/resources/case-studies"
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <SectionCard
              title="Webinars"
              description="Watch our on-demand webinars to learn more about ANDI and how it can help your business."
              icon={<Video className="h-6 w-6 text-white" />}
              link="/resources/webinars"
            />
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <SectionCard
              title="Data Sheets"
              description="Technical specifications and feature overviews of ANDI's capabilities and integrations."
              icon={<Download className="h-6 w-6 text-white" />}
              link="/resources/data-sheets"
            />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <SectionCard
              title="User Roles & Capabilities"
              description="Learn about ANDI's role-based access system and how to structure your team for maximum collaboration."
              icon={<Users className="h-6 w-6 text-white" />}
              link="/resources/user-roles"
            />
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <SectionCard
              title="FAQ"
              description="Find answers to commonly asked questions about ANDI, our technology, and how to get started."
              icon={<FileText className="h-6 w-6 text-white" />}
              link="/resources/faq"
            />
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  )
}
