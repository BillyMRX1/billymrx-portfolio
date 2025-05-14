"use client";

import Link from "next/link";

interface HologramCardProps {
  title: string;
  description: string;
  link: string;
}

export default function HologramCard({ title, description, link }: HologramCardProps) {
  return (
    <Link
      href={link}
      className="group block border border-neon bg-gradient-to-br from-black/50 to-black/80 rounded-lg p-6 shadow-[0_0_12px_#00ffff50] transition duration-300 hover:shadow-[0_0_20px_#00ffffaa] hover:scale-[1.03]"
    >
      <h3 className="text-xl font-semibold text-neon group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="mt-2 text-gray-300 group-hover:text-neon transition-colors duration-300">
        {description}
      </p>
    </Link>
  );
}
