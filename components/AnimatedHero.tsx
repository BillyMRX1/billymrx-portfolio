"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "AI Engineer",
  "Applied Machine Learning Engineer",
  "Generative AI Prototyper",
  "Full Stack Builder",
];

export default function AnimatedHero({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col justify-center items-center gap-8 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Content */}
      <motion.div variants={itemVariants} className="z-10">
        {children}
      </motion.div>

      <motion.div variants={itemVariants} className="z-10 text-center">
        <div className="h-8 overflow-hidden">
          <motion.p
            key={currentRole}
            className="text-text-secondary text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {roles[currentRole]}
          </motion.p>
        </div>
      </motion.div>
    </motion.section>
  );
}
