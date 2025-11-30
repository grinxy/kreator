import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://kreator.team"
  const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true"

  if (!indexable) return []

  const now = new Date()

  return [
    {
      url: `${site}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site}/registro`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site}/aviso-legal`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site}/politica-cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site}/politica-privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site}/terminos-condiciones`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
