import ScrollReveal from "@/components/scroll-reveal"
import BulletList from "@/components/bullet-list"

type PostListProps = {
  data: {
    __component: string
    id: number
    Item: {
      id: number
      Title: string
      Icon: string
    }[]
  }
}

export default function PostList({ data }: PostListProps) {
  const items = data?.Item?.map((item) => item.Title) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <BulletList items={items} delay={0.5} />
      </ScrollReveal>
    </div>
  )
}
