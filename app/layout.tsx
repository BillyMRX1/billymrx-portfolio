import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShellEnhancements from "@/components/ShellEnhancements";
import GradientBlur from "@/components/GradientBlur";

const siteUrl = "https://billymrx.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brilian Ade Putra (Billy) - AI Engineer & Software Developer in Tokyo",
    template: "%s | Brilian Ade Putra - AI Engineer"
  },
  description: "AI Engineer at Honda Japan crafting intelligent products with machine learning, data platforms, and production ready software in Tokyo, Japan.",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Generative AI",
    "Data Engineering",
    "Software Engineer",
    "Full Stack Developer",
    "Tokyo Japan",
    "Honda AI",
    "Next.js",
    "Python",
    "Product Strategy",
    "Brilian Ade Putra",
    "Billy",
    "BillyMRX"
  ],
  authors: [{ name: "Brilian Ade Putra", url: "https://www.linkedin.com/in/brilianap" }],
  creator: "Brilian Ade Putra",
  publisher: "Brilian Ade Putra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Brilian Ade Putra - AI Engineer",
    title: "Brilian Ade Putra (Billy) - AI Engineer & Software Developer in Tokyo",
    description: "AI Engineer at Honda Japan crafting intelligent products with machine learning, data platforms, and production ready software in Tokyo, Japan.",
    images: [
      {
        url: `${siteUrl}/avatar.jpg`,
        width: 1200,
        height: 630,
        alt: "Brilian Ade Putra - AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brilian Ade Putra (Billy) - AI Engineer & Software Developer in Tokyo",
    description: "AI Engineer at Honda Japan crafting intelligent products with machine learning, data platforms, and production ready software in Tokyo, Japan.",
    images: [`${siteUrl}/avatar.jpg`],
    creator: "@BillyMRX1",
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "geo.region": "JP-13",
    "geo.placename": "Tokyo",
    "geo.position": "35.6762;139.6503",
    "ICBM": "35.6762, 139.6503",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Brilian Ade Putra",
  "alternateName": "Billy",
  "url": siteUrl,
  "image": `${siteUrl}/avatar.jpg`,
  "jobTitle": "AI Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Honda Motor Co., Ltd.",
    "department": "AdvanceAI Strategy Planning Division"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tokyo",
    "addressCountry": "Japan"
  },
  "alumniOf": "Artificial Intelligence and Product Engineering",
  "knowsAbout": [
    "Artificial Intelligence",
    "Applied Machine Learning",
    "Generative AI",
    "Data Engineering",
    "Product Engineering",
    "Full Stack Development",
    "Next.js",
    "Python",
    "Software Architecture"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/brilianap",
    "https://github.com/BillyMRX1"
  ],
  "seeks": {
    "@type": "Demand",
    "description": "Job opportunities, freelance projects, and professional networking in Japan"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="relative bg-black text-white font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neon focus:text-black focus:rounded-md focus:shadow-neon"
        >
          Skip to main content
        </a>
        <GradientBlur />
        <ShellEnhancements />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
