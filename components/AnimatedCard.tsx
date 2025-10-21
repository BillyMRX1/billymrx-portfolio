"use client";

import { motion } from "framer-motion";
import { ReactNode, memo } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedCard = memo(function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        className="relative h-full"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
});

export default AnimatedCard;
