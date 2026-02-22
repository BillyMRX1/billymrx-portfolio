import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: {
    absolute: "Brilian Ade Putra (Billy) — AI Engineer & Software Developer in Tokyo",
  },
  description:
    "Brilian Ade Putra (Billy) — AI Engineer at Honda Japan building intelligent products with machine learning, data platforms, and modern web experiences in Tokyo.",
  keywords: [
    "AI Engineer Tokyo",
    "Machine Learning Engineer",
    "Honda AI",
    "Generative AI",
    "Software Engineer Japan",
    "Data Products",
    "Brilian Ade Putra",
    "Billy Portfolio",
  ],
  openGraph: {
    title: "Brilian Ade Putra (Billy) — AI Engineer & Software Developer in Tokyo",
    description:
      "AI Engineer at Honda Japan with expertise in machine learning, data products, and production ready software in Tokyo.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
    </>
  );
}
