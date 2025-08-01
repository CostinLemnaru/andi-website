import qs from "qs"

const STRAPI_API_URL = process.env.STRAPI_API_URL

const NESTED_COMPONENTS: Record<string, string[]> = {
  "home.roadmap-section": ["Versions.Features.Specs"],
  "page.box-list-items": ["ListItems"],
  "page.box-items": ["Items"],
  "page.section-icon-boxes": ["SectionIconBoxes"],
  "page.tabs-section": ["Tabs.Items"],
  "page.tabs-box-section": ["Tabs.Items.Items"],
  "page.tabs-components-section": [
    "Tabs.Items.IconTitleDescription",
    "Tabs.Items.IconText.IconText"
  ],
  "page.pricing-section": ["Plan.Items"],
  "page.section-box-features-footer": ["Boxes"],
  "page.tabs-vertical-section": ["Tabs.Content.Items"]
}

export async function fetchPage(slug: string) {
  try {
    const firstRes = await fetch(`${STRAPI_API_URL}/api/pages?filters[slug][$eq]=${slug}&populate=*`, {
      next: { revalidate: 60 },
    })

    if (!firstRes.ok) throw new Error("Failed to fetch page")

    const firstJson = await firstRes.json()
    const data = firstJson.data?.[0] ?? null
    const components = data?.Components ?? []

    if (!components.length) return data

    const populate: Record<string, any> = {
      Components: {
        populate: "*", // default shallow populate
        on: {},
      },
    }

    for (const comp of components) {
      const compName = comp.__component
      const nestedPaths = NESTED_COMPONENTS[compName]

      // Include all components in `.on`, even if they don't have nested children
      const root = (populate.Components.on[compName] ||= { populate: {} })

      if (!nestedPaths || !nestedPaths.length) {
        root.populate = "*"
        continue
      }

      for (const path of nestedPaths) {
        let level = root
        const fields = path.split(".")
        for (const field of fields) {
          level.populate[field] = level.populate[field] || { populate: {} }
          level = level.populate[field]
        }
        level.populate = "*"
      }
    }

    const query = qs.stringify({
      filters: { slug: { $eq: slug } },
      populate,
    }, { encodeValuesOnly: true })

    const nestedRes = await fetch(`${STRAPI_API_URL}/api/pages?${query}`, {
      next: { revalidate: 60 },
    })

    if (!nestedRes.ok) throw new Error("Failed to re-fetch page with nested populate")

    const nestedJson = await nestedRes.json()
    return nestedJson.data?.[0] ?? null
  } catch (err) {
    console.warn("⚠️ fetchPage failed:", err)
    return null
  }
}
