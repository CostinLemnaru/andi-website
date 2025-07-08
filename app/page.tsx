import ComingSoon from "@/components/coming-soon"
import { fetchPage } from "@/lib/strapi"

export default async function Home() {
  const data = await fetchPage("coming-soon")

  return <ComingSoon data={data} />
}
