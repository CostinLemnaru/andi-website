import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import TeamMember from "@/components/team-member"
import ScrollReveal from "@/components/scroll-reveal"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Andrei Condor",
      role: "Founder & Chief Executive Office",
      bio: "Andrei Condor is a visionary founder and strategic operator with 15+ years of experience building high-performance sales engines and leading global go-to-market transformations at UiPath, Veeam, and Flipsnack. As CEO of Zamora, Andrei drives the company's long-term strategy, orchestrating product, people, and partnerships to execute against a bold vision for enterprise-grade AI business insights. Known for blending relentless execution with cultural clarity, he's built and scaled revenue functions from the ground up, implemented systems that serve both speed and structure, and now channels that discipline into building ANDI an adaptive AI co-pilot that redefines how business decisions are made.",
      imageSrc: "/andrei-condor-new.png",
      linkedin: "https://www.linkedin.com/in/andrei-condor/",
    },
    {
      name: "Bogdan Manda",
      role: "Co-Chief Executive Officer",
      bio: "Bogdan Manda is a seasoned go-to-market strategist with over 16 years at Oracle, where he led EMEA-wide partner transformation, business operations, and analytics for multi-billion-dollar ecosystems. With deep expertise in sales operations, business intelligence, and partner enablement, he has designed and scaled frameworks that directly influenced revenue acceleration and operational efficiency across global markets. At Zamora, Bogdan is the GTM force behind ANDI architecting the systems, playbooks, and partnerships that power category creation and scale. He brings an unmatched command of metrics, strategy, and execution to fuel Zamora's journey from early adoption to enterprise dominance.",
      imageSrc: "/bogdan-manda.png",
      linkedin: "https://www.linkedin.com/in/bogdan-manda-17772811/",
    },
    {
      name: "Marina Ailincai",
      role: "Co-Founder & Chief Operating Officer",
      bio: "Marina Ailincai is a dynamic operations strategist with deep expertise in customer success, CX optimization, and scalable SaaS workflows. With a Master's in Business Management and a track record of building high-retention programs at Verifone, Inboxroad, and Flipsnack, she brings a rare blend of empathy, systems thinking, and executional rigor. At Zamora, Marina leads operations across product delivery, client lifecycle, and internal systems translating complexity into streamlined, customer-centric processes. She's the operational backbone behind ANDI's promise: making insight-to-execution seamless, measurable, and human-centered.",
      imageSrc: "/marina-ailincai.png",
      linkedin: "https://www.linkedin.com/in/marina-ailincai/",
    },
    {
      name: "Iulian Barbu",
      role: "Chief Financial Officer",
      bio: "Iulian Barbu is an accomplished finance executive with over 12 years of leadership experience in global organizations like Garrett Advancing Motion and Honeywell. A certified Lean Six Sigma Green Belt, he specializes in scaling financial operations, optimizing Procure-to-Pay (P2P) and Credit-to-Cash (C2C) processes, and leading strategic transformation initiatives. Iulian's proven track record in operational efficiency, compliance, and cost optimization underpins Zamora's ambition to build a resilient, high-performance financial engine that can scale globally with precision and trust.",
      imageSrc: "/iulian-barbu.png",
      linkedin: "https://www.linkedin.com/in/iulian-barbu/",
    },
    {
      name: "Andrei Ramboiu",
      role: "Chief Technical Officer",
      bio: "Andrei Ramboiu is the technical architect and product visionary behind ANDI, with over 12 years of experience building scalable, user-centric web platforms used by hundreds of thousands. A full-stack technologist with deep AI expertise, Andrei has mastered the full spectrum of product development from systems design and infrastructure to front-end usability and applied machine learning. As CTO of Zamora, he transforms bold ideas into performant, secure, and intelligent systems. He is the backbone of ANDI's architecture and the muscle behind its execution driving a product that doesn't just inform business decisions, but thinks, acts, and evolves with them.",
      imageSrc: "",
      linkedin: "https://www.linkedin.com/in/ramboiu-andrei-409239153/",
    },
  ]

  return (
    <PageLayout>
      <PageHeader title="Meet the Team" subtitle="The visionary founders behind Zamora AI and ANDI" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 100}>
              <TeamMember
                name={member.name}
                role={member.role}
                bio={member.bio}
                imageSrc={member.imageSrc}
                linkedin={member.linkedin}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
