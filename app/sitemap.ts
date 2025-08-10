import type { MetadataRoute } from "next"
import { getAllSitemapEntries } from "@/lib/sitemap-data"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const entries = await getAllSitemapEntries()

    return entries.map((entry) => ({
      url: entry.url,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    }))
  } catch (error) {
    console.error("Error generating sitemap:", error)

    // Fallback sitemap with essential pages
    return [
      {
        url: "https://www.zamora.ai",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://www.zamora.ai/products",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: "https://www.zamora.ai/features",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: "https://www.zamora.ai/pricing",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
    ]
  }
}
