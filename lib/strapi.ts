// lib/strapi.ts
const STRAPI_API_URL = process.env.STRAPI_API_URL

export async function fetchPage(slug: string) {
  const res = await fetch(`${STRAPI_API_URL}/api/pages?filters[slug][$eq]=${slug}&populate=*`, {
    next: { revalidate: 60 }
  })

  if (!res.ok) throw new Error("Failed to fetch page from Strapi")

  const json = await res.json()
  return json.data?.[0] ?? null
}
