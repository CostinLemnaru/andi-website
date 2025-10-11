import type { Metadata } from "next"
import PageContent from "@/components/page-content"
import { fetchPage, fetchNavigations } from "@/lib/strapi"

const DEFAULT_TITLE = "Andi by Zamora"
const DEFAULT_DESCRIPTION = "The next generation of intelligence."

const RESERVED_SLUGS = ["favicon", "robots", "sitemap", ".well-known"]

const normalize = (value?: string | null) => value?.replace(/\s+/g, " ").trim()

const resolveCollectionType = (slugArray: string[]) => (slugArray[0] === "post" ? "posts" : "pages")

const resolveSlugPath = (slugArray: string[]) => (slugArray.length === 0 ? "home" : slugArray.join("/"))

export async function generateMetadata({ params }: { params: { slug?: string[] } }): Promise<Metadata> {
  const slugArray = Array.isArray(params.slug) ? params.slug : []
  const slugPath = resolveSlugPath(slugArray)

  if (slugPath.includes(".") || RESERVED_SLUGS.some((s) => slugPath.startsWith(s))) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    }
  }

  const collectionType = resolveCollectionType(slugArray)
  const lastSegment = slugArray.at(-1) || "home"
  const data = await fetchPage(lastSegment, collectionType)

  if (!data) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    }
  }

  const title = normalize(data?.Seo?.title) || normalize(data?.Title) || DEFAULT_TITLE
  const description =
    normalize(data?.Seo?.description) ||
    normalize((data as any)?.Description) ||
    DEFAULT_DESCRIPTION

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slugArray = Array.isArray(params.slug) ? params.slug : []
  const slugPath = resolveSlugPath(slugArray)

  const notFound = (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl text-gray-400">404 – Page Not Found</h1>
    </div>
  )

  const collectionType = resolveCollectionType(slugArray)

  if (slugPath.includes(".") || RESERVED_SLUGS.some((s) => slugPath.startsWith(s))) {
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
