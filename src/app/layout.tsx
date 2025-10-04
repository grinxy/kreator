import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kreator - La 1ª Red Exclusiva por Zonas para Profesionales y Pymes",
  description:
    "Únete a la primera red empresarial exclusiva por zonas. Un solo profesional por sector en tu área. Multiplica tus oportunidades, genera comisiones y amplía tu red de contactos. Sin permanencia.",
  authors: [{ name: "Kreator Team" }],
  creator: "Kreator",
  publisher: "Kreator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kreator-teaser-page.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kreator - La 1ª Red Exclusiva por Zonas para Profesionales",
    description:
      "Un solo profesional por sector en tu área. Multiplica tus oportunidades gracias a los contactos de todo tu equipo. Reserva tu plaza ahora.",
    url: "https://kreator-teaser-page.vercel.app/",
    siteName: "Kreator",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kreator - Red Exclusiva por Zonas para Profesionales",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#003C71" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kreator",
              description: "La primera red empresarial exclusiva por zonas para profesionales y pymes",
              url: "https://kreator-teaser-page.vercel.app/",
              "logo": "https://kreator-teaser-page.vercel.app/brand/horizontal/logo-kreator-default-horizontal.png",
              sameAs: [
                "https://www.linkedin.com/company/kreator",
                "https://www.facebook.com/kreator",
                "https://www.instagram.com/kreator"
              ],

              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                availableLanguage: "Spanish",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Kreator",
              url: "https://kreator-teaser-page.vercel.app/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://kreator-teaser-page.vercel.app/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
