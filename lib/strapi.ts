import qs from "qs"

const STRAPI_API_URL = process.env.STRAPI_API_URL
const NESTED_COMPONENTS: Record<string, string> = {
  "home.roadmap-section": "Versions.Features.Specs",
}

export async function fetchPage(slug: string) {
  try {
    // Fetch inițial cu populate=*
    const firstRes = await fetch(`${STRAPI_API_URL}/api/pages?filters[slug][$eq]=${slug}&populate=*`, {
      next: { revalidate: 60 }
    })

    if (!firstRes.ok) throw new Error("Failed to fetch page")

    const firstJson = await firstRes.json()
    const data = firstJson.data?.[0] ?? null

    // Dacă nu sunt componente speciale, returnează direct
    const components = data?.Components ?? []

    const hasNested = components.some((c: any) => NESTED_COMPONENTS[c.__component])
    if (!hasNested) return data

    const populate: Record<string, any> = {
      Components: {
        populate: "*", // <-- important!
        on: {},
      },
    }

    for (const comp of components) {
      const name = comp.__component
      const nested = NESTED_COMPONENTS[name]

      let level: any = (populate.Components.on[name] = { populate: {} })

      if (!nested) {
        level.populate = "*"
      }

      if (nested) {
        const path = nested.split(".")

        for (const field of path) {
          level.populate[field] = { populate: {} }
          level = level.populate[field]
        }
        level.populate = "*"
      }
    }


    if (Object.keys(populate.Components.on).length > 0) {
      populate.Components.populate = "*"
    }

    const query = qs.stringify({
      filters: { slug: { $eq: slug } },
      populate,
    }, { encodeValuesOnly: true })

    const nestedRes = await fetch(`${STRAPI_API_URL}/api/pages?${query}`, {
      next: { revalidate: 60 }
    })

    if (!nestedRes.ok) throw new Error("Failed to re-fetch page with nested populate")

    const nestedJson = await nestedRes.json()
    return nestedJson.data?.[0] ?? null
  } catch (err) {
    console.warn("fetchPage failed:", err)
    return null
  }
}