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
 * Apple Newsroom-style timeline choreography for the Experience section.
 *
 * Drives two things in tandem:
 * 1. `#exp-rail` — a 2px accent line that scrubs from `scaleY: 0 -> 1` as the
 *    section travels through the viewport (top 70% -> bottom 70%).
 * 2. `.exp-item` entries — batched with `ScrollTrigger.batch` so items that
 *    cross `top 75%` together animate together (opacity 0 -> 1, x -24 -> 0)
 *    with an expo.out stagger.
 *
 * Honors `prefers-reduced-motion`: bails before creating any tweens or
 * ScrollTriggers. Cleanup is handled by `useGSAP`'s scope-based teardown.
 */
export function useExperienceRail(scope: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // 1. Scrubbed rail — collapses to 0 at top, fills to 1 as you scroll.
      gsap.set("#exp-rail", { scaleY: 0, transformOrigin: "top" });
      gsap.to("#exp-rail", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      // 2. Batched item entry — items entering together animate together.
      gsap.set(".exp-item", { opacity: 0, x: -24 });
      ScrollTrigger.batch(".exp-item", {
        start: "top 75%",
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "expo.out",
            overwrite: true,
          }),
      });
    },
    { scope },
  );
}
