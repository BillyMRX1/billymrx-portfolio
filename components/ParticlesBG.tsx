"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBG() {
  const init = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    <Particles
      init={init}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: { value: "#0a0a0a" } },
        particles: {
          color: { value: "#00ffff" },
          links: { enable: false },
          move: { enable: true, speed: 0.5 },
          number: { value: 60 },
          opacity: { value: 0.3 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2 } },
        },
      }}
    />
  );
}
