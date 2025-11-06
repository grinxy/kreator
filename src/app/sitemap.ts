import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://kreator-omega.vercel.app")

  // Allows you to generate the sitemap both in production and in preview (if you want to see the OG working).
  const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true"

  // If not marked as indexable, returns empty so as not to expose the site before launch.
  if (!indexable) return []

  // Define indexable routes
  return [
    {
      url: `${site}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // You can add the actual routes here as they become available.:
    // { url: `${site}/registro`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // { url: `${site}/aviso-legal`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]
}
