"use client";

import { gsap } from "@/lib/gsap";

const OVERLAY_ID = "nav-fade-overlay";

/**
 * Moves the page to a section with no visible scrolling: a short fade covers the screen, the
 * scroll position jumps instantly underneath it, then the fade lifts. This replaces native
 * smooth-scroll anchor navigation, which read as a slow scroll through everything in between.
 * Falls back to an instant jump with no fade under reduced motion, or if the overlay is not
 * in the DOM for some reason.
 */
export function navigateToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const land = () => {
    const top = target.getBoundingClientRect().top + window.scrollY;
    
    // Temporarily disable any CSS-driven HTML smooth scrolling during the jump
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    
    window.scrollTo({ top, left: 0, behavior: "auto" });
    
    // Restore original scroll behavior setting
    html.style.scrollBehavior = originalScrollBehavior;

    if (typeof history.pushState === "function") {
      history.pushState(null, "", `#${id}`);
    }
    // Move focus for keyboard and screen reader users, without re-triggering a scroll.
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  };

  let overlay = document.getElementById(OVERLAY_ID);
  
  // Auto-create overlay in the DOM if it doesn't already exist
  if (!overlay && typeof document !== "undefined") {
    overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.className = "nav-fade-overlay";
    document.body.appendChild(overlay);
  }

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !overlay) {
    land();
    return;
  }

  gsap
    .timeline()
    .set(overlay, { pointerEvents: "auto", opacity: 0 })
    .to(overlay, { opacity: 1, duration: 0.22, ease: "power2.inOut" })
    .call(land)
    .to(overlay, { opacity: 0, duration: 0.28, ease: "power2.out", delay: 0.04 })
    .set(overlay, { pointerEvents: "none" });
}
