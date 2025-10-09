import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kreator.team"
  const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true"
  if (!indexable) return [] // do not generate sitemap until go-live

  return [
    { url: `${site}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    // add routes where they exist
  ]
}
