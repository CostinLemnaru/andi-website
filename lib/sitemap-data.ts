export interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number
}

export interface BlogPost {
  slug: string
  title: string
  lastModified: Date
}

// Mock blog posts - replace with actual CMS/database calls
export async function getBlogPosts(): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return [
    {
      slug: "introducing-sage-engine",
      title: "Introducing the SAGE Engine: The Future of Business Intelligence",
      lastModified: new Date("2025-01-15"),
    },
    {
      slug: "linkdna-technology-explained",
      title: "LinkDNA™ Technology: Connecting Your Data Like Never Before",
      lastModified: new Date("2025-01-10"),
    },
    {
      slug: "natural-language-queries-guide",
      title: "A Complete Guide to Natural Language Queries in Business Intelligence",
      lastModified: new Date("2025-01-05"),
    },
  ]
}

// Static pages with their last modified dates
export async function getStaticPages(): Promise<SitemapEntry[]> {
  const baseUrl = "https://www.zamora.ai"

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2025-01-20"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date("2025-01-18"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date("2025-01-17"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features/linkdna`,
      lastModified: new Date("2025-01-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/insight-labeling`,
      lastModified: new Date("2025-01-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/multi-dataset-analysis`,
      lastModified: new Date("2025-01-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/nlp-query-engine`,
      lastModified: new Date("2025-01-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/confidence-based-nlp`,
      lastModified: new Date("2025-01-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/saas-technology`,
      lastModified: new Date("2025-01-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/financial-services`,
      lastModified: new Date("2025-01-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/retail-ecommerce`,
      lastModified: new Date("2025-01-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/healthcare`,
      lastModified: new Date("2025-01-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/manufacturing-logistics`,
      lastModified: new Date("2025-01-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/consulting-services`,
      lastModified: new Date("2025-01-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/public-sector-education`,
      lastModified: new Date("2025-01-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date("2025-01-13"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/emerging-businesses`,
      lastModified: new Date("2025-01-12"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/growth-companies`,
      lastModified: new Date("2025-01-12"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/enterprise-organizations`,
      lastModified: new Date("2025-01-12"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: new Date("2025-01-11"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/use-cases/finance`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases/marketing`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases/operations`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases/product`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases/leadership`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date("2025-01-09"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date("2025-01-08"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date("2025-01-07"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/white-papers`,
      lastModified: new Date("2025-01-06"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/white-papers/ai-business-unified-analytics`,
      lastModified: new Date("2025-01-05"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/white-papers/sage-new-frontier`,
      lastModified: new Date("2025-01-04"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/case-studies`,
      lastModified: new Date("2025-01-03"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/webinars`,
      lastModified: new Date("2025-01-02"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/data-sheets`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/blog`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/user-roles`,
      lastModified: new Date("2024-12-30"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/roi-report`,
      lastModified: new Date("2024-12-29"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-content-policy`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]
}

// Get all sitemap entries
export async function getAllSitemapEntries(): Promise<SitemapEntry[]> {
  const [staticPages, blogPosts] = await Promise.all([getStaticPages(), getBlogPosts()])

  const blogEntries: SitemapEntry[] = blogPosts.map((post) => ({
    url: `https://www.zamora.ai/resources/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogEntries]
}

// Get AI-optimized sitemap entries (most important pages for AI crawlers)
export async function getAISitemapEntries(): Promise<SitemapEntry[]> {
  const baseUrl = "https://www.zamora.ai"

  // Core AI-optimized pages
  const aiOptimizedPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features/linkdna`,
      lastModified: new Date("2025-01-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/nlp-query-engine`,
      lastModified: new Date("2025-01-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/insight-labeling`,
      lastModified: new Date("2025-01-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/features/confidence-based-nlp`,
      lastModified: new Date("2025-01-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/features/multi-dataset-analysis`,
      lastModified: new Date("2025-01-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date("2025-01-22"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/healthcare`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/financial-services`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/saas-technology`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/manufacturing-logistics`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/retail-ecommerce`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries/consulting-services`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: new Date("2025-01-22"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/use-cases/finance`,
      lastModified: new Date("2025-01-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases/marketing`,
      lastModified: new Date("2025-01-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases/leadership`,
      lastModified: new Date("2025-01-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases/operations`,
      lastModified: new Date("2025-01-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/use-cases/product`,
      lastModified: new Date("2025-01-18"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/emerging-businesses`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/growth-companies`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions/enterprise-organizations`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date("2025-01-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date("2025-01-10"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/white-papers`,
      lastModified: new Date("2025-01-22"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/case-studies`,
      lastModified: new Date("2025-01-20"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/webinars`,
      lastModified: new Date("2025-01-18"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/resources/blog`,
      lastModified: new Date("2025-01-15"),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    // AI-specific resources (high priority for AI crawlers)
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-content-policy`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/knowledge-pack`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ai-policy-data`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ai-sitemap`,
      lastModified: new Date("2025-01-24"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  return aiOptimizedPages
}
