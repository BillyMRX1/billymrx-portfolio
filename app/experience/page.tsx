import ExperienceClient from "@/components/ExperienceClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience of Brilian Ade Putra (Billy) - AI Engineer at Honda Japan with a foundation in product engineering and machine learning.",
  keywords: [
    "Billy Work Experience",
    "AI Engineer Honda",
    "Machine Learning Engineer",
    "Data Product Builder",
    "Professional Experience Tokyo",
    "Tokyo Tech Career"
  ],
  openGraph: {
    title: "Professional Experience - Brilian Ade Putra (Billy) AI Engineer",
    description: "Career journey of an AI Engineer at Honda Japan with expertise in machine learning, data products, and software delivery.",
  },
  twitter: {
    title: "Professional Experience - Brilian Ade Putra (Billy) AI Engineer",
    description: "Career journey of an AI Engineer at Honda Japan with expertise in machine learning, data products, and software delivery.",
  },
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
