import "./globals.css";
import type { Metadata } from "next";
import ClientParticles from "@/components/ClientParticles";
import Navbar from "@/components/Navbar";
import TerminalLauncher from "@/components/TerminalLauncher";
import BackToTop from "@/components/BackToTop";

const siteUrl = "https://billymrx.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brilian Ade Putra (Billy) - AI Engineer & Software Developer in Tokyo",
    template: "%s | Brilian Ade Putra - AI Engineer"
  },
  description: "AI Engineer at Honda Japan with 3+ years experience in mobile development. Specializing in AI solutions, Android/Flutter apps, and full-stack development in Tokyo, Japan.",
  keywords: [
    "AI Engineer",
    "Software Engineer", 
    "Android Developer",
    "Flutter Developer",
    "Mobile App Development",
    "Full Stack Developer",
    "Tokyo Japan",
    "Honda AI",
    "Kotlin",
    "Next.js",
    "Machine Learning",
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
    description: "AI Engineer at Honda Japan with 3+ years experience in mobile development. Specializing in AI solutions, Android/Flutter apps, and full-stack development in Tokyo, Japan.",
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
    description: "AI Engineer at Honda Japan with 3+ years experience in mobile development. Specializing in AI solutions, Android/Flutter apps, and full-stack development in Tokyo, Japan.",
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
  "alumniOf": "Android & Flutter Development",
  "knowsAbout": [
    "Artificial Intelligence",
    "Mobile App Development",
    "Android Development",
    "Flutter",
    "Kotlin",
    "Full Stack Development",
    "Next.js",
    "Machine Learning",
    "Software Engineering"
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
        <TerminalLauncher />
        <ClientParticles />
        <Navbar />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
