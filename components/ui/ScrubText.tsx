"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

type ScrubTextProps = {
  text: string;
  className?: string;
};

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/**
 * Paragraph whose words brighten one by one as the reader scrolls past,
 * driven by scroll position (no timers, no scroll listeners). Renders a
 * plain paragraph under prefers-reduced-motion.
 */
export default function ScrubText({ text, className }: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  if (reduced) {
    return <p className={className}>{text}</p>;
  }

  const words = text.split(" ");
  return (
    // useScroll targets need a non-static position for offset calculation.
    <p ref={ref} className={`relative ${className ?? ""}`}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
        />
      ))}
    </p>
  );
}
