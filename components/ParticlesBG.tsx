"use client";

import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBG() {
  const init = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: { value: "#0a0a0a" } },
      particles: {
        color: { value: "#00ffff" },
        links: { enable: false },
        move: { enable: true, speed: 0.3 },
        number: { value: 40, density: { enable: true, area: 800 } },
        opacity: { value: 0.25 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 } },
      },
      detectRetina: true,
      fpsLimit: 60,
    }),
    []
  );

  return <Particles init={init} options={options} />;
}
