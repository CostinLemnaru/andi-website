import PageContent from "@/components/page-content"
import { fetchPage, fetchNavigations } from "@/lib/strapi"

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const reservedSlugs = ["favicon", "robots", "sitemap", ".well-known"]
  const slugArray = Array.isArray(params.slug) ? params.slug : []
  const slugPath = slugArray.join("/") || "home"

  const notFound = (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl text-gray-400">404 – Page Not Found</h1>
    </div>
  )

  const collectionType = slugArray[0] == 'post' ? 'posts' : 'pages'

  if (
    slugPath.includes(".") ||
    reservedSlugs.some((s) => slugPath.startsWith(s))
  ) {
    return notFound
  }

  const lastSegment = slugArray.at(-1) || "home"
  const data = await fetchPage(lastSegment, collectionType)
  const navData = await fetchNavigations()

  if (!data) {
    return notFound
  }
  const categoryName = data.page_category?.Name.toLowerCase() ?? null
  if (categoryName && slugArray[0] !== categoryName) {
    return notFound
  }

  return <PageContent data={data} nav={navData} />
}
