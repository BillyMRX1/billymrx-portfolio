"use client";
import { useGlitch } from "react-powerglitch";

export default function GlitchText({ children }: { children: string }) {
  const glitch = useGlitch({
    playMode: "always",
    timing: { duration: 1500, iterations: Infinity },
    glitchTimeSpan: {
      start: 0.1,
      end: 0.3,
    },
    shake: { velocity: 15, amplitudeX: 0.4, amplitudeY: 0.2 },
    slice: { count: 4, velocity: 10 },
  });

  return (
    <span ref={glitch.ref} className="text-neon text-5xl font-bold">
      {children}
    </span>
  );
}
