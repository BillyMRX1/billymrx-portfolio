import GlitchText from "@/components/GlitchText";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Brilian Ade Putra (Billy)'s portfolio. AI Engineer at Honda Japan specializing in mobile development, AI solutions, and full-stack applications. Available for opportunities in Tokyo.",
  keywords: [
    "AI Engineer Tokyo",
    "Software Engineer Japan",
    "Honda AI Engineer",
    "Mobile App Developer Tokyo",
    "Flutter Developer Japan",
    "Android Developer Tokyo",
    "Brilian Ade Putra",
    "Billy Portfolio"
  ],
  openGraph: {
    title: "Brilian Ade Putra (Billy) - AI Engineer Portfolio",
    description: "AI Engineer at Honda Japan with expertise in mobile development and AI solutions. Available for job opportunities and freelance projects in Tokyo.",
  },
  twitter: {
    title: "Brilian Ade Putra (Billy) - AI Engineer Portfolio",
    description: "AI Engineer at Honda Japan with expertise in mobile development and AI solutions. Available for job opportunities and freelance projects in Tokyo.",
  },
};

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-4">
      <GlitchText>BillyMRX</GlitchText>
      <p className="text-gray-400 text-lg">Android Developer → AI Engineer</p>
    </section>
  );
}
