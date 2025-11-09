import type React from "react"
import Script from "next/script"
import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import { Navbar } from "@/components/layout/navbar/Navbar"
import { Footer } from "@/components/layout/footer/Footer"
import { NavigationLoaderProvider } from "@/providers/navigation-loader-provider"
import { Poppins, Open_Sans } from "next/font/google"
import "@/styles/globals.css"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://kreator-omega.vercel.app")

export const metadata: Metadata = {
  title: "Kreator - La 1ª Comunidad Empresarial Colaborativa por Equipos",
  description:
    "Kreator es la primera comunidad empresarial colaborativa por equipos, creada para autónomos y pymes que quieren vender más, generar contactos de calidad y crecer en red. En cada equipo solo puede haber un profesional por sector, pero en una misma zona pueden coexistir varios equipos según el volumen de negocio disponible.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kreator - Comunidad Empresarial por Equipos para Profesionales y Pymes",
    description:
      "Forma parte de la primera comunidad empresarial colaborativa por equipos. En cada equipo solo puede haber un profesional por sector, pero pueden existir varios equipos por zona según la demanda. Expande tu red, gana visibilidad y multiplica tus oportunidades.",
    url: baseUrl,
    siteName: "Kreator",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Kreator - Comunidad Empresarial por Equipos para Profesionales y Pymes",
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
          <Navbar />
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
        </NavigationLoaderProvider>
      </body>
    </html>
  )
}
