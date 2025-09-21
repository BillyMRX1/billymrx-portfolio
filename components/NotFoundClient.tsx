"use client";

import GlitchText from "@/components/GlitchText";
import Link from "next/link";

export default function NotFoundClient() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-6xl font-bold text-neon mb-4">
        <GlitchText>404</GlitchText>
      </h1>
      <p className="text-xl text-gray-400 mb-6">
        This page has been lost in the grid.
      </p>
      <Link
        href="/"
        className="text-neon border border-neon px-4 py-2 rounded hover:bg-neon hover:text-black transition"
      >
        Return to Home
      </Link>
    </div>
  );
}