"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ParticlesBG = dynamic(() => import("./ParticlesBG"), { ssr: false });

export default function ClientParticles() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mediaQuery.matches);

    update();

    try {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    } catch {
      // Safari fallbacks
      mediaQuery.addListener(update);
      return () => mediaQuery.removeListener(update);
    }
  }, []);

  if (!enabled) return null;

  return <ParticlesBG />;
}
