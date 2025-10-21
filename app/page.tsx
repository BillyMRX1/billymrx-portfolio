import GlitchText from "@/components/GlitchText";
import AnimatedHero from "@/components/AnimatedHero";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import AnimatedCard from "@/components/AnimatedCard";
import Link from "next/link";
import { getAllProjects } from "@/lib/loadProjects";
import type { Metadata } from "next";
import {
  SiKotlin,
  SiReact,
  SiTypescript,
  SiPython,
  SiAndroid,
  SiFlutter,
  SiNextdotjs,
  SiTensorflow,
} from "react-icons/si";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Brilian Ade Putra (Billy)'s portfolio. AI Engineer at Honda Japan building intelligent products with machine learning, data platforms, and modern web experiences in Tokyo.",
  keywords: [
    "AI Engineer Tokyo",
    "Machine Learning Engineer",
    "Honda AI",
    "Generative AI",
    "Software Engineer Japan",
    "Data Products",
    "Brilian Ade Putra",
    "Billy Portfolio"
  ],
  openGraph: {
    title: "Brilian Ade Putra (Billy) - AI Engineer Portfolio",
    description: "AI Engineer at Honda Japan with expertise in machine learning, data products, and production ready software in Tokyo.",
  },
  twitter: {
    title: "Brilian Ade Putra (Billy) - AI Engineer Portfolio",
    description: "AI Engineer at Honda Japan with expertise in machine learning, data products, and production ready software in Tokyo.",
  },
};

const techStack = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
  { name: "Android", icon: SiAndroid, color: "#3DDC84" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
];

export default async function Home() {
  const allProjects = await getAllProjects();

  // Get featured projects (3-4 from different categories)
  const featuredProjects = [
    ...(allProjects["mobile"]?.slice(0, 2) || []),
    ...(allProjects["machine-learning"]?.slice(0, 1) || []),
    ...(allProjects["web"]?.slice(0, 1) || []),
  ].slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <AnimatedHero>
        <GlitchText>BillyMRX</GlitchText>
      </AnimatedHero>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold text-center mb-4">
            Featured <span className="text-neon">Projects</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A selection of my favorite experiments in applied AI, intelligent systems, and end to end product experiences
          </p>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredProjects.map((project, index) => (
            <AnimatedCard key={project.title} delay={index * 0.1}>
              <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 hover:border-neon transition-all h-full">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs px-3 py-1 bg-neon/10 text-neon rounded-full border border-neon/30">
                    {project.category}
                  </span>
                  {project.type && (
                    <span className="text-xs px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/30">
                      {project.type}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon hover:underline text-sm inline-flex items-center gap-2"
                  >
                    View Project
                    <span>→</span>
                  </a>
                )}
              </div>
            </AnimatedCard>
          ))}
        </div>

        <FadeInWhenVisible delay={0.4}>
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon/10 text-neon border border-neon rounded-lg hover:bg-neon/20 transition-all"
            >
              View All Projects
              <span>→</span>
            </Link>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold text-center mb-4">
            Tech <span className="text-neon">Stack</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Technologies I use to deliver intelligent products from models to interfaces
          </p>
        </FadeInWhenVisible>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <FadeInWhenVisible key={tech.name} delay={index * 0.05}>
              <div className="group p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 hover:border-neon transition-all text-center hover:scale-105 transform">
                <tech.icon
                  className="w-12 h-12 mx-auto mb-3 transition-transform group-hover:scale-110"
                  style={{ color: tech.color }}
                />
                <p className="font-semibold text-sm">{tech.name}</p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible delay={0.4}>
          <div className="text-center mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-neon transition-colors"
            >
              Learn more about my skills
              <span>→</span>
            </Link>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <FadeInWhenVisible>
          <div className="bg-gradient-to-br from-neon/10 to-purple-500/10 rounded-2xl border border-neon/30 p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Let&apos;s Work <span className="text-neon">Together</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I&apos;m currently available for freelance projects and full-time opportunities.
              Let&apos;s create something amazing together!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-neon text-black font-bold rounded-lg hover:bg-neon/90 transition-all hover:scale-105 transform"
              >
                Get in Touch
              </Link>
              <Link
                href="/resume"
                className="px-8 py-3 border border-neon text-neon rounded-lg hover:bg-neon/10 transition-all hover:scale-105 transform"
              >
                View Resume
              </Link>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>
    </>
  );
}
