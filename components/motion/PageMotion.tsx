"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Global reveals. Elements marked data-reveal="words" or "line" are hidden by CSS only while
 * html.motion is set, then revealed once when they enter the viewport.
 * IntersectionObserver is used instead of ScrollTrigger here because it is unaffected by the
 * pinned SEVEN section changing the page height.
 */
export default function PageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.classList.add("motion");
      root.dataset.motionReady = "true";

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            io.unobserve(el);
            gsap.set(el, { autoAlpha: 1 });

            if (el.dataset.reveal === "words") {
              gsap.fromTo(
                el.querySelectorAll(".wi"),
                { yPercent: 115 },
                { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.05 },
              );
            } else if (el.dataset.reveal === "line") {
              gsap.fromTo(
                el,
                { scaleX: 0 },
                { scaleX: 1, duration: 1.4, ease: "power3.inOut", transformOrigin: "left center" },
              );
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );

      document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

      // Web fonts change text height, which moves every scroll position.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        io.disconnect();
        root.classList.remove("motion");
        delete root.dataset.motionReady;
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
