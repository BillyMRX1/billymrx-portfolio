"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Terminal = dynamic(() => import("@/components/Terminal"), {
  ssr: false,
});

export default function TerminalLauncher() {
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        setShowTerminal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <Terminal visible={showTerminal} onClose={() => setShowTerminal(false)} />
  );
}
