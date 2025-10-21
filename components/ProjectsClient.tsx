"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HologramCard from "./HologramCard";
import type { Project } from "@/lib/loadProjects";

export default function ProjectsClient({
  allProjects,
}: {
  allProjects: Record<string, Project[]>;
}) {
  const categories = useMemo(() => Object.keys(allProjects), [allProjects]);
  const [activeTab, setActiveTab] = useState<string>(categories[0] ?? "");
  const projects = allProjects[activeTab] ?? [];

  return (
    <>
      {categories.length > 0 && (
        <motion.div
          className="mb-8 flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-6 py-2 rounded-lg border transition-all will-change-transform ${
                activeTab === category
                  ? "border-neon text-neon shadow-[0_0_12px_#00ffff]"
                  : "border-gray-600 text-gray-400 hover:border-gray-400"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.2) }} // Faster, capped delay
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {activeTab === category && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-neon/10 rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.length === 0 ? (
            <motion.p
              className="col-span-full text-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Projects will be added soon.
            </motion.p>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.05, 0.3), // Cap delay at 0.3s
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="rounded-md will-change-transform"
              >
                <HologramCard
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  type={project.type}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
