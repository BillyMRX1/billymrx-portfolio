"use client";

import Image from "next/image";
import Skills from "@/components/Skills";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

export default function AboutClient() {
  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto text-text-primary text-center">
      {/* 🧑 Avatar */}
      <Image
        src="/avatar.jpg"
        alt="Brilian Ade Putra (Billy), AI Engineer at Honda Japan"
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
            "AI Engineer crafting intelligent products.",
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
      <p className="text-sm sm:text-base text-text-secondary mb-6">
        AI Engineer focused on human centered innovation
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
          href="https://billymrx.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
          aria-label="Portfolio"
        >
          <FaGlobe />
        </a>
      </div>

      <div className="space-y-4 text-left text-sm sm:text-base leading-relaxed">
        <p>
          I&apos;m <span className="text-neon font-semibold">Brilian Ade Putra (Billy)</span>,
          an AI Engineer at <span className="text-neon font-semibold">Honda Japan</span> working
          on machine learning systems for automotive applications.
        </p>

        <p>
          My focus is on applied AI - building RAG systems, computer vision models, and
          production ML deployments. I also have a strong background in mobile development
          (Android/Kotlin, Flutter, KMP) and full-stack engineering (Next.js, React, Python).
        </p>

        <p>
          Previously built mobile products at MMS Group Indonesia, Vision+ (streaming platform),
          and Gravel (construction workforce apps). Based in Tokyo, Japan.
        </p>
      </div>

      <Skills />
    </div>
  );
}
