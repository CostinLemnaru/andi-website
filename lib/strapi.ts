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
  "page.tabs-vertical-section": ["Tabs.Content.Items"],
  "page.boxes-columns": ["Items.Specs"],
  "page.team": ["Members.Photo"],
  "posts.tabs-icons": ["Tabs.TabContent"]
}

export async function fetchPage(slug: string, collectionType: "pages" | "posts") {
  try {
    const sectionKey = collectionType === "posts" ? "Content" : "Components"

    const firstRes = await fetch(`${STRAPI_API_URL}/api/${collectionType}?filters[slug][$eq]=${slug}&populate=*`, {
      next: { revalidate: 60 },
    })

    if (!firstRes.ok) throw new Error("Failed to fetch " + collectionType)

    const firstJson = await firstRes.json()
    const data = firstJson.data?.[0] ?? null
    const components = data?.[sectionKey] ?? []

    if (!components.length) return data

    const populate: Record<string, any> = {
      [sectionKey]: {
        populate: "*", // default shallow
        on: {},
      },
    }

const enrichedComponents = (
  await Promise.all(
    components.map(async (comp: any) => {
      if (comp.__component === "page.post-box") {
        const showLast = comp.showLastPost === true
        const queryParams = showLast
          ? qs.stringify({ sort: ["publishedAt:desc"], pagination: { pageSize: 1 } }, { encodeValuesOnly: true })
          : qs.stringify({ filters: { slug: { $eq: comp.slug } } }, { encodeValuesOnly: true })

        const postRes = await fetch(`${STRAPI_API_URL}/api/posts?${queryParams}`)
        if (!postRes.ok) return undefined

        const postJson = await postRes.json()
        const postData = postJson.data?.[0]
        if (!postData) return undefined

        return {
          __component: "page.post-box",
          data: postData.attributes ? { ...postData.attributes, id: postData.id } : postData,
        }
      }

      if (comp.__component === "page.posts-inline") {
        const showLast = comp.showLastThree === true
        let queryParams = ""

        if (showLast) {
          queryParams = qs.stringify({
            sort: ["publishedAt:desc"],
            pagination: { pageSize: 3 },
          }, { encodeValuesOnly: true })
        } else {
          const slugs = [comp.slugOne, comp.slugTwo, comp.slugThree].filter(Boolean)
          queryParams = qs.stringify({
            filters: { slug: { $in: slugs } },
            pagination: { pageSize: 3 }
          }, { encodeValuesOnly: true })
        }

        const postRes = await fetch(`${STRAPI_API_URL}/api/posts?${queryParams}`)
        if (!postRes.ok) return undefined

        const postJson = await postRes.json()
        const posts = postJson.data.map((p: any) => p.attributes ? { ...p.attributes, id: p.id } : p)

        return {
          __component: "page.posts-inline",
          data: posts
        }
      }

      return undefined // explicit
    })
  )
).filter(Boolean) // ✅ după await

    for (const comp of components) {
      const compName = comp.__component
      const nestedPaths = NESTED_COMPONENTS[compName]

      const root = (populate[sectionKey].on[compName] ||= { populate: {} })

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

    const nestedRes = await fetch(`${STRAPI_API_URL}/api/${collectionType}?${query}`, {
      next: { revalidate: 60 },
    })

    if (!nestedRes.ok) throw new Error("Failed to fetch nested " + collectionType)
    const nestedJson = await nestedRes.json()
    const extractedComponents = nestedJson.data?.[0]?.Components ?? nestedJson.data?.[0]?.Content ?? []

    const filteredComponents = extractedComponents.filter(
      (comp: any) => comp.__component !== "page.post-box" && comp.__component !== "page.posts-inline"
    )
    const finalComponents = enrichedComponents.length > 0
      ? [...filteredComponents, ...enrichedComponents]
      : filteredComponents

    if (nestedJson.data?.[0]) {
      nestedJson.data[0].Components = finalComponents
    }

    return nestedJson.data?.[0] ?? null
  } catch (err) {
    console.warn("⚠️ fetchPage failed:", err)
    return null
  }
}

export async function fetchNavigations() {
  const query = qs.stringify({
    populate: {
      Sections: {
        populate: {
          Items: "*",
        },
      },
    },
  }, { encodeValuesOnly: true })

  const res = await fetch(`${STRAPI_API_URL}/api/navigations?${query}`)
  if (!res.ok) throw new Error("Failed to fetch navigations")

  const json = await res.json()

  const bySlug = Object.fromEntries(
    json.data.map((entry: any) => [entry.Slug, entry])
  )
  return {
    main: bySlug.main ?? null,
    footer: bySlug.footer ?? null,
  }
}
