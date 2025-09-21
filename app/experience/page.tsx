import ExperienceClient from "@/components/ExperienceClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience of Brilian Ade Putra (Billy) - from Android Developer at Vision+ to AI Engineer at Honda Japan. 3+ years in mobile development with Kotlin, Flutter, and React Native.",
  keywords: [
    "Billy Work Experience",
    "AI Engineer Honda",
    "Android Developer Career",
    "Mobile Developer Experience",
    "Flutter Developer Background",
    "Vision+ Android Engineer",
    "Gravel Mobile Developer",
    "Professional Experience Tokyo"
  ],
  openGraph: {
    title: "Professional Experience - Brilian Ade Putra (Billy) AI Engineer",
    description: "Career journey from Android/Flutter developer to AI Engineer at Honda Japan. Extensive experience in mobile development and AI solutions.",
  },
  twitter: {
    title: "Professional Experience - Brilian Ade Putra (Billy) AI Engineer",
    description: "Career journey from Android/Flutter developer to AI Engineer at Honda Japan. Extensive experience in mobile development and AI solutions.",
  },
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
