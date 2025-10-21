import AboutClient from "@/components/AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Brilian Ade Putra (Billy) - AI Engineer at Honda Japan combining machine learning, data platforms, and full stack product delivery.",
  keywords: [
    "About Brilian Ade Putra",
    "Billy AI Engineer",
    "Honda Japan AI Engineer",
    "Machine Learning Engineer",
    "Data Product Builder",
    "AI Engineer Background",
    "Software Engineer Profile",
    "Tokyo Tech Talent"
  ],
  openGraph: {
    title: "About Brilian Ade Putra (Billy) - AI Engineer at Honda Japan",
    description: "Professional background of an AI Engineer shaping intelligent products at Honda Japan's AI strategy division.",
  },
  twitter: {
    title: "About Brilian Ade Putra (Billy) - AI Engineer at Honda Japan", 
    description: "Professional background of an AI Engineer shaping intelligent products at Honda Japan's AI strategy division.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
