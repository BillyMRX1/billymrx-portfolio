"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        lenis.stop();
        setTimeout(() => lenis.start(), 100);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleClick);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
