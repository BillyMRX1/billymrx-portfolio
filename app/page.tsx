import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: {
    absolute: "Brilian Ade Putra (Billy) | AI & Software Engineer",
  },
  description:
    "AI assistants and software integrations for websites, apps, and internal tools. Work directly with Billy on a focused implementation project.",
  keywords: [
    "AI Engineer Tokyo",
    "Machine Learning Engineer",
    "document AI assistant",
    "RAG developer",
    "AI integration",
    "LLM integration",
    "Generative AI",
    "Software Engineer Japan",
    "Data Products",
    "Brilian Ade Putra",
    "Billy Portfolio",
  ],
  openGraph: {
    title: "Brilian Ade Putra (Billy) | AI & Software Engineer",
    description:
      "AI assistants and software integrations for websites, apps, and internal tools. Work directly with Billy on a focused implementation project.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <About />
      <Experience />
      <Blog />
      <Contact />
    </>
  );
}
