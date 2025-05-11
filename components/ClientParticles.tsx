"use client";

import dynamic from "next/dynamic";

const ParticlesBG = dynamic(() => import("./ParticlesBG"), { ssr: false });

export default function ClientParticles() {
  return <ParticlesBG />;
}
