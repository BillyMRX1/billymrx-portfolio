"use client";

import { motion } from "framer-motion";

export default function GradientBlur() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Optimized: Reduced from 3 to 2 blurs, slower animations, smaller sizes */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.08) 0%, rgba(0,255,255,0) 70%)",
          filter: "blur(60px)",
          left: "10%",
          top: "20%",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.08) 0%, rgba(168,85,247,0) 70%)",
          filter: "blur(60px)",
          right: "15%",
          bottom: "25%",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
