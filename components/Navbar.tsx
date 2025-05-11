"use client";

import GlitchText from "./GlitchText";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-neon text-2xl font-bold tracking-wider">
        <GlitchText>BillyMRX</GlitchText>
      </Link>

      <div className="flex gap-6 text-sm font-medium text-gray-300">
        <Link href="/about" className="hover:text-neon transition">
          About
        </Link>
        <Link href="/projects" className="hover:text-neon transition">
          Projects
        </Link>
        <Link href="/resume" className="hover:text-neon transition">
          Resume
        </Link>
        <Link href="/contact" className="hover:text-neon transition">
          Contact
        </Link>
      </div>
    </nav>
  );
}
