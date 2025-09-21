"use client";

import dynamic from "next/dynamic";

const ClientParticles = dynamic(() => import("@/components/ClientParticles"), {
  ssr: false,
  loading: () => null,
});

const TerminalLauncher = dynamic(
  () => import("@/components/TerminalLauncher"),
  { ssr: false }
);

const BackToTop = dynamic(() => import("@/components/BackToTop"), {
  ssr: false,
});

export default function ShellEnhancements() {
  return (
    <>
      <TerminalLauncher />
      <ClientParticles />
      <BackToTop />
    </>
  );
}
