import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

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
  metadataBase: new URL("https://kreator.team/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kreator - La 1ª Red Exclusiva por Zonas para Profesionales",
    description:
      "Un solo profesional por sector en tu área. Multiplica tus oportunidades gracias a los contactos de todo tu equipo. Reserva tu plaza ahora.",
    url: "https://kreator.team/",
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
              url: "https://kreator.team/",
              logo: "https://kreator.team/brand/horizontal/logo-kreator-default-horizontal.png",
              sameAs: [
                "https://www.linkedin.com/company/kreator",
                "https://www.facebook.com/kreator",
                "https://www.instagram.com/kreator",
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
              url: "https://kreator.team/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://kreator.team/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* Google Tag Manager (Head) */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + '${GTM_ID}' + dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
