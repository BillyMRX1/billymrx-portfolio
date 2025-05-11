"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";

export default function HologramCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <div className="w-full h-64 border border-neon rounded overflow-hidden bg-black/50">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight color="#00ffff" position={[0, 0, 5]} intensity={1} />

        <Float floatIntensity={1.5} rotationIntensity={1.2} speed={2}>
          <Html
            transform
            occlude
            distanceFactor={1.5}
            position={[0, 0, 0]}
            scale={8}
            pointerEvents="auto" // 👈 important fix
          >
            <a
              href={link}
              target="_blank"
              className="block w-72 text-center bg-black/70 border border-cyan-500 rounded p-4 text-neon shadow-neon hover:brightness-125 transition"
            >
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-sm mt-1">{description}</p>
            </a>
          </Html>
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}
