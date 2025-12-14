"use client";

import dynamic from "next/dynamic";

const ClientParticles = dynamic(() => import("@/components/ClientParticles"), {
  ssr: false,
  loading: () => null,
});

const BackToTop = dynamic(() => import("@/components/BackToTop"), {
  ssr: false,
});

export default function ShellEnhancements() {
  return (
    <>
      <ClientParticles />
      <BackToTop />
    </>
  );
}
