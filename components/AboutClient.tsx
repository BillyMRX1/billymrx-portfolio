"use client";

import Image from "next/image";
import Skills from "@/components/Skills";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

export default function AboutClient() {
  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto text-gray-300 text-center">
      {/* 🧑 Avatar */}
      <Image
        src="/avatar.jpg"
        alt="Profile picture"
        width={128}
        height={128}
        priority
        sizes="(max-width: 640px) 7rem, 8rem"
        className="mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-neon shadow-[0_0_20px_#00ffff] mb-6"
      />

      <h2 className="text-3xl sm:text-4xl font-bold text-neon mb-2">
        BillyMRX
      </h2>
      {/* 🔤 Typing Animation */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-neon mb-4">
        <Typewriter
          words={[
            "Hello, I'm Billy.",
            "Android Developer turned AI Engineer.",
            "Welcome to my Website.",
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={40}
          delaySpeed={2000}
        />
      </h1>
      <p className="text-sm sm:text-base text-gray-400 mb-6">
        Android Developer → AI Engineer
      </p>

      {/* 🔗 External Links */}
      <div className="flex justify-center gap-6 mb-6 text-neon text-xl">
        <a
          href="https://github.com/BillyMRX1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/brilianap"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://billymrx.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
          aria-label="Portfolio"
        >
          <FaGlobe />
        </a>
      </div>

      <div className="space-y-4 text-left sm:text-center text-sm sm:text-base leading-relaxed">
        <p className="mb-4">
          I'm <span className="text-neon font-semibold">Brilian Ade Putra</span>{" "}
          , but you may also call me{" "}
          <span className="text-neon font-semibold">Billy</span> — a passionate
          developer with over 3 years of experience building high-performance
          mobile applications using Kotlin, Jetpack Compose, and Flutter. I've
          worked on a variety of Android apps across industries including media,
          construction, and enterprise solutions.
        </p>
        <p className="mb-4">
          I currently work as an{" "}
          <span className="text-neon font-semibold">
            AI Engineer at Honda Japan
          </span>
          , where I'm exploring the intersection of software engineering and
          artificial intelligence to develop smart, human-centered systems.
        </p>
        <p className="mb-4">
          My career spans native and cross-platform development, CI/CD
          automation, and backend integration, with hands-on experience using
          modern stacks like Next.js, FastAPI, and cloud-based infrastructure.
        </p>
        <p>
          I'm obsessed with futuristic UI, AI-powered products, and automation.
          Whether it's crafting sleek mobile interfaces or building intelligent
          backend systems, I'm always looking to push boundaries and bring ideas
          to life.
        </p>
      </div>

      <Skills />
    </div>
  );
}
