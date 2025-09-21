"use client";

import GlitchText from "@/components/GlitchText";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist on Brilian Ade Putra (Billy)'s portfolio website. Return to explore AI engineering projects and professional experience.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
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
