"use client";

import Terminal from "@/components/Terminal";
import { useState, useEffect } from "react";

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
