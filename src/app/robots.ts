export default function robots() {
  const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true"
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kreator.team"
  return indexable
    ? { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${site}/sitemap.xml`, host: site }
    : { rules: [{ userAgent: "*", disallow: "/" }] }
}
