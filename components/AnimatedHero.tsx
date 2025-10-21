"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "Android Developer",
  "AI Engineer",
  "Full Stack Developer",
  "Mobile App Developer",
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
    }, 3000);
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
      {/* Floating particles - Optimized: reduced from 20 to 6, simpler animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-neon/50 rounded-full"
            style={{
              left: `${(i * 15 + 10)}%`,
              top: `${(i * 12 + 10)}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div variants={itemVariants} className="z-10">
        {children}
      </motion.div>

      <motion.div variants={itemVariants} className="z-10 text-center">
        <div className="h-8 overflow-hidden">
          <motion.p
            key={currentRole}
            className="text-gray-400 text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {roles[currentRole]}
          </motion.p>
        </div>
      </motion.div>

      {/* Gradient circles - Optimized: static instead of animated, smaller blur */}
      <div className="absolute w-72 h-72 bg-neon/10 rounded-full blur-[80px] -top-36 -left-36" />
      <div className="absolute w-72 h-72 bg-purple-500/10 rounded-full blur-[80px] -bottom-36 -right-36" />
    </motion.section>
  );
}
