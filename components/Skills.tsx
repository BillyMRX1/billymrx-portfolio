"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

export default function Skills() {
  const groupedSkills = {
    "Android & Mobile": [
      { name: "Kotlin", icon: "/icons/kotlin.svg" },
      { name: "Jetpack Compose", icon: "/icons/compose.svg" },
      { name: "Java", icon: "/icons/java.svg" },
      { name: "Flutter", icon: "/icons/flutter.svg" },
      { name: "Dart", icon: "/icons/dart.svg" },
      { name: "Swift", icon: "/icons/swift.svg" },
    ],
    "AI & Backend": [
      { name: "Python", icon: "/icons/python.svg" },
      { name: "NodeJS", icon: "/icons/nodejs.svg" },
      { name: "Express.js", icon: "/icons/express.png" },
    ],
    "Web & Frontend": [
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "React Native", icon: "/icons/react.svg" },
    ],
    "Database": [
      { name: "Firebase", icon: "/icons/firebase.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
    ],
    "DevOps & Tools": [
      { name: "GitHub Actions", icon: "/icons/github.svg" },
      { name: "GitLab CI", icon: "/icons/gitlab.svg" },
    ],
  };   

  return (
    <section className="pt-20 px-8 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-neon mb-6">Skills & Tech</h2>
  
      {Object.entries(groupedSkills).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h3 className="text-xl font-semibold text-neon mb-4">{category}</h3>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {items.map((skill) => (
              <Tilt
                key={skill.name}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.05}
                transitionSpeed={400}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#00ffff"
                className="rounded-md"
              >
                <motion.div
                  className="flex flex-col items-center justify-center h-32 gap-2 border border-neon bg-black/30 p-4 rounded-md transition-all duration-300 shadow-[0_0_12px_#00ffff80] hover:shadow-[0_0_20px_#00ffffaa]"
                  whileHover={{ scale: 1.06 }}
                >
                  <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
                  <span className="text-sm text-neon">{skill.name}</span>
                </motion.div>
              </Tilt>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );  
}
