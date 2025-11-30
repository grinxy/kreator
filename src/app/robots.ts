import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true"

  const site = "https://kreator.team"

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

  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  }
}
