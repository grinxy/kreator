import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true"

  const site =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://kreator-omega.vercel.app")

  // If indexing is enabled (production environment or public preview)
  if (indexable) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: `${site}/sitemap.xml`,
      host: site,
    }
  }

  // If we do not want to index (for example, in development or private staging)
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  }
}
