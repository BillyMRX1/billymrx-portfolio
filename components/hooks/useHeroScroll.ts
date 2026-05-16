"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
}

/**
 * Apple-style hero scroll choreography.
 *
 * Pins `#hero` for +=80% of viewport and scrubs a timeline that morphs the
 * `#hero-artifact` (scale, rotate, blur, opacity) while sliding `#hero-copy`
 * upward and fading it. Both animations live on the same timeline at
 * position 0 so they progress in parallel with scroll.
 *
 * Honors `prefers-reduced-motion`: skips all GSAP setup entirely.
 * Cleanup (kill ScrollTriggers, revert inline styles) is handled by
 * `useGSAP`'s scope-based teardown when Hero unmounts.
 */
export function useHeroScroll(scope: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "+=80%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(
        "#hero-artifact",
        {
          scale: 1.35,
          rotate: -8,
          filter: "blur(8px)",
          opacity: 0.15,
          ease: "none",
        },
        0,
      ).to(
        "#hero-copy",
        {
          y: -60,
          opacity: 0.2,
          ease: "none",
        },
        0,
      );
    },
    { scope },
  );
}
