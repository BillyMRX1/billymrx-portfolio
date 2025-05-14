"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black border border-neon text-neon shadow-[0_0_10px_#00ffff90] hover:bg-neon hover:text-black transition"
      aria-label="Back to Top"
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  );
}
