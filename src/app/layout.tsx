import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kreator - Conecta, Refiere y Haz Crecer Tu Negocio Industrial",
  description:
    "Plataforma profesional que conecta especialistas industriales para generar referrals y hacer crecer tu negocio. Únete a más de 10,000 profesionales.",
  generator: "v0.app",
  keywords:
    "referrals industriales, networking profesional, crecimiento empresarial, conexiones industriales, B2B, plataforma industrial",
  authors: [{ name: "Kreator Team" }],
  creator: "Kreator",
  publisher: "Kreator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kreator.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kreator - Conecta, Refiere y Haz Crecer Tu Negocio Industrial",
    description:
      "Plataforma profesional que conecta especialistas industriales para generar referrals y hacer crecer tu negocio.",
    url: "https://kreator.com",
    siteName: "Kreator",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kreator - Plataforma de Referrals Industriales",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kreator - Conecta, Refiere y Haz Crecer Tu Negocio Industrial",
    description:
      "Plataforma profesional que conecta especialistas industriales para generar referrals y hacer crecer tu negocio.",
    images: ["/og-image.jpg"],
    creator: "@kreator",
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
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#04368F" />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
