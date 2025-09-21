import AboutClient from "@/components/AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Brilian Ade Putra (Billy) - AI Engineer at Honda Japan with 3+ years in Android/Flutter development. Expertise in Kotlin, Jetpack Compose, Next.js, and AI solutions.",
  keywords: [
    "About Brilian Ade Putra",
    "Billy AI Engineer",
    "Honda Japan AI Engineer",
    "Android Developer Experience",
    "Flutter Developer Skills",
    "Kotlin Expert Tokyo",
    "AI Engineer Background",
    "Software Engineer Profile"
  ],
  openGraph: {
    title: "About Brilian Ade Putra (Billy) - AI Engineer at Honda Japan",
    description: "Professional background of AI Engineer with extensive mobile development experience. Currently working at Honda Japan's AI Strategy division.",
  },
  twitter: {
    title: "About Brilian Ade Putra (Billy) - AI Engineer at Honda Japan", 
    description: "Professional background of AI Engineer with extensive mobile development experience. Currently working at Honda Japan's AI Strategy division.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
