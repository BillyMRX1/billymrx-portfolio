"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HologramCard from './HologramCard';

export type Project = {
  title: string;
  description: string;
  link: string;
  category: string;
};

export default function ProjectsClient({
  allProjects,
}: {
  allProjects: Record<string, Project[]>;
}) {
  const categories = Object.keys(allProjects);
  const [activeTab, setActiveTab] = useState<string>(categories[0]);
  const projects = allProjects[activeTab];

  return (
    <>
      <div className="mb-6 flex gap-4 flex-wrap justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded border transition ${
              activeTab === category
                ? "border-neon text-neon shadow-[0_0_12px_#00ffff]"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px #00ffffaa' }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="rounded-md"
            >
              <HologramCard
                title={project.title}
                description={project.description}
                link={project.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
