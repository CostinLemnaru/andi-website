import PageLayout from "@/components/page-layout"
import PageHeader from "@/components/page-header"
import TeamMember from "@/components/team-member"
import ScrollReveal from "@/components/scroll-reveal"

export type TeamMemberType = {
  id: number
  Name: string
  Subtitle: string
  Description: string
  Linkedin: string
  Photo?: {
    url: string
    formats?: {
      thumbnail?: {
        url: string
      }
    }
  }
}

type Props = {
  data: {
    Members: TeamMemberType[]
  }
}

export default function Team({ data }: Props) {
  const members = data?.Members ?? []

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {members.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 100}>
              <TeamMember
                name={member.Name}
                role={member.Subtitle}
                bio={member.Description}
                imageSrc={member.Photo?.formats?.thumbnail?.url || "/placeholder.png"}
                linkedin={member.Linkedin}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
  )
}
