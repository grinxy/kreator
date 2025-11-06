import type React from "react"
import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import Script from "next/script"
import Header from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { NavigationLoaderProvider } from "@/providers/navigation-loader-provider"
import "@/styles/globals.css"
import { Poppins, Open_Sans } from "next/font/google";


const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
}

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://kreator-omega.vercel.app")

export const metadata: Metadata = {
  title: "Kreator - La 1ª Red Exclusiva por Zonas para Profesionales y Pymes",
  description:
    "Únete a la primera red empresarial exclusiva por zonas. Un solo profesional por sector en tu área. Multiplica tus oportunidades, genera comisiones y amplía tu red de contactos. Sin permanencia.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kreator - La 1ª Red Exclusiva por Zonas para Profesionales",
    description:
      "Un solo profesional por sector en tu área. Multiplica tus oportunidades gracias a los contactos de todo tu equipo. Reserva tu plaza ahora.",
    url: baseUrl,
    siteName: "Kreator",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
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
    <html lang="es" className={`${poppins.variable} ${openSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#003C71" />

        {/* JSON-LD Organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kreator",
              description:
                "La primera red empresarial exclusiva por zonas para profesionales y pymes",
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

        {/* JSON-LD WebSite */}
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
          />
        </noscript>

        <NavigationLoaderProvider>
          <Header />
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
        </NavigationLoaderProvider>
      </body>
    </html>
  )
}
