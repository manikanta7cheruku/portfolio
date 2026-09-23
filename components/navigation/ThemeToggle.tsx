"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

type Theme = "dark" | "light";
type TransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
const getServerSnapshot = (): Theme | null => null;

function applyTheme(next: Theme, persist: boolean) {
  document.documentElement.dataset.theme = next;
  if (!persist) return;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage can be unavailable in private modes; the theme still applies for this visit */
  }
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const button = useRef<HTMLButtonElement>(null);

  // Follow the operating system until the visitor makes an explicit choice.
  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {
        stored = null;
      }
      if (!stored) applyTheme(e.matches ? "light" : "dark", false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    const doc = document as TransitionDoc;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = button.current;

    if (!doc.startViewTransition || reduced || !el) {
      applyTheme(next, true);
      return;
    }

    // The new theme opens as a circle from the control, so the change reads as cause and effect.
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = doc.startViewTransition(() => applyTheme(next, true));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 700,
            easing: "cubic-bezier(0.65, 0, 0.35, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  };

  const label = theme
    ? `Colour theme: ${theme}. Switch to ${theme === "dark" ? "light" : "dark"}.`
    : "Switch colour theme";

  return (
    <button ref={button} type="button" className="theme" onClick={toggle} aria-label={label}>
      <span className="theme__opt theme__opt--dark">Dark</span>
      <span className="theme__sep" aria-hidden="true" />
      <span className="theme__opt theme__opt--light">Light</span>
    </button>
  );
}
