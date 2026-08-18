import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { getJsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    description: SITE.description,
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 675,
        alt: "Geosbau Räumung und Entrümpelung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    description: SITE.description,
    images: ["/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "home and garden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getJsonLd();

  return (
    <html lang="de" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
