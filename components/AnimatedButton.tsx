"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
}

export default function AnimatedButton({
  children,
  onClick,
  className = "",
  href,
  type = "button",
}: AnimatedButtonProps) {
  const buttonContent = (
    <motion.div
      className="relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-neon/20 to-purple-500/20"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {buttonContent}
    </motion.button>
  );
}
