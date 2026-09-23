"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

export type MotionEnv = { wide: boolean; fine: boolean };

/**
 * Runs `setup` only when the visitor has not asked for reduced motion.
 * Everything created inside (tweens, ScrollTriggers, listeners returned as cleanup)
 * is reverted when the media query stops matching or the component unmounts.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (env: MotionEnv) => void | (() => void),
) {
  useEffect(() => {
    const mm = gsap.matchMedia(scope.current ?? undefined);
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 900px)",
        fine: "(hover: hover) and (pointer: fine)",
      },
      (ctx) => {
        const c = ctx.conditions as { motion?: boolean; wide?: boolean; fine?: boolean } | undefined;
        if (!c?.motion) return;
        return setup({ wide: Boolean(c.wide), fine: Boolean(c.fine) });
      },
    );
    return () => mm.revert();
    // setup is intentionally captured once; components pass stable closures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
