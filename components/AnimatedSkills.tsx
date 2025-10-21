"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface Skill {
  name: string;
  icon: IconType;
  level: number;
}

interface AnimatedSkillsProps {
  skills: Skill[];
}

export default function AnimatedSkills({ skills }: AnimatedSkillsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="relative group"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          whileHover={{ scale: 1.1, y: -5 }}
        >
          <motion.div
            className="relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 overflow-hidden"
            whileHover={{
              borderColor: "#00ffff",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
            }}
          >
            {/* Background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-neon/10 to-purple-500/10 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Icon */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <skill.icon className="w-12 h-12 text-neon" />
              </motion.div>

              <h3 className="text-sm font-semibold text-center">
                {skill.name}
              </h3>

              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon to-purple-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
