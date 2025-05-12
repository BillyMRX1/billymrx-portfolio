"use client";

import { useState, useEffect, useRef } from "react";

const initialLines = [
  "BillyMRX Terminal [Cyberpunk Edition]",
  "Type `help` for a list of commands.",
];

const commands: Record<string, string> = {
  help: "Available commands: whoami, projects, clear",
  whoami: "Android Dev turned AI Engineer — BillyMRX.",
  projects: "Navigate to /projects to view portfolio.",
  clear: "clear",
};

export default function Terminal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [lines, setLines] = useState<string[]>(initialLines);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    if (cmd === "clear") return setLines([]);
    const response = commands[cmd] ?? `Command not found: ${cmd}`;
    setLines((prev) => [...prev, `$ ${cmd}`, response]);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [lines]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 w-[90vw] max-w-xl h-[300px] bg-black/90 text-green-400 font-mono text-sm border border-neon rounded shadow-neon z-50">
      <div className="p-2 border-b border-neon flex justify-between items-center">
        <span>~/billymrx-terminal</span>
        <button onClick={onClose} className="text-red-400 hover:text-white">
          ×
        </button>
      </div>
      <div ref={terminalRef} className="p-2 overflow-y-auto h-[220px]">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="p-2 border-t border-neon">
        <span className="text-neon">$</span>{" "}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="bg-transparent outline-none text-green-300 w-full"
          autoFocus
        />
      </div>
    </div>
  );
}
