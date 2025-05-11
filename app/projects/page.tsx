"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HologramCard from "@/components/HologramCard";

type Project = {
  title: string;
  description: string;
  link: string;
};

const allProjects: Record<string, Project[]> = {
  Android: [
    { title: "App A", description: "A sleek Android app.", link: "#" },
    { title: "App B", description: "Another great app.", link: "#" },
  ],
  AI: [
    {
      title: "Sentiment Classifier",
      description: "NLP-based sentiment engine",
      link: "#",
    },
    {
      title: "Image Classifier",
      description: "Detects rock/paper/scissors",
      link: "#",
    },
  ],
  Web: [
    {
      title: "Portfolio Site",
      description: "This cyberpunk portfolio!",
      link: "#",
    },
  ],
};

export default function ProjectsPage() {
  const categories = Object.keys(allProjects);
  const [activeTab, setActiveTab] = useState<string>(categories[0]);
  const projects = allProjects[activeTab];

  return (
    <div className="min-h-screen pt-28 px-8">
      <h1 className="text-4xl font-bold text-neon mb-6">Projects</h1>

      <div className="mb-6 flex gap-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded border ${
              activeTab === category
                ? "border-neon text-neon"
                : "border-gray-600 text-gray-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project, i) => (
            <HologramCard
              key={i}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
