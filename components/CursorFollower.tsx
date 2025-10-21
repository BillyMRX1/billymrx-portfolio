"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let rafId: number;
    const moveCursor = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);

        const target = e.target as HTMLElement;
        const isInteractive =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button");
        setIsHovering(!!isInteractive);

        rafId = 0;
      });
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 border-neon will-change-transform"
          animate={{
            scale: isHovering ? 1.5 : 1,
            backgroundColor: isHovering
              ? "rgba(0, 255, 255, 0.1)"
              : "transparent",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9999] hidden md:block will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 15,
          translateY: 15,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-neon will-change-transform"
          animate={{
            scale: isHovering ? 0 : 1,
          }}
        />
      </motion.div>
    </>
  );
}
