"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { sections } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navigateToSection } from "@/lib/navFade";

const ids = sections.map((s) => s.id);

/**
 * Desktop: a fixed index on the right edge with a scroll progress line. Labels stay collapsed
 * to just their number until hovered, focused, or current, then expand, so all nine sections
 * are reachable without nine permanently-visible labels crowding the edge.
 * Mobile: a compact bottom bar showing the current section that opens the full list behind a
 * dimmed backdrop; the background stops scrolling while it's open.
 * Every link resolves through navigateToSection, so choosing a section never shows a visible
 * scroll through the page in between.
 */
export default function SideIndex() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  // On desktop the link list is always meant to be reachable, just visually collapsed by CSS
  // (opacity and max-height) until hovered or focused. It must never be inert there. inert is
  // only appropriate on mobile, where the collapsed rows are genuinely closed behind the panel.
  // Read synchronously on first render (not just in an effect) so desktop links are never
  // briefly inert on first paint.
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia("(min-width: 900px)").matches,
  );
  const nav = useRef<HTMLElement>(null);
  const listId = useId();
  const current = sections.find((s) => s.id === active) ?? sections[0];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      nav.current?.style.setProperty("--scroll", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // While the mobile panel is open: Escape closes it, a tap outside it closes it, and the
  // page behind it stops scrolling so the panel doesn't drift out from under a finger.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (nav.current && !nav.current.contains(e.target as Node)) setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    navigateToSection(id);
  };

  return (
    <>
      <div
        className={`index__scrim${open ? " is-visible" : ""}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      <nav ref={nav} className={`index${open ? " is-open" : ""}`} aria-label="Sections">
        <button
          type="button"
          className="index__toggle"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="index__cur mono">{current.n}</span>
          <span className="index__cur-label">{current.label}</span>
          <span className="index__cur-action">
            <span className="sr">{open ? "Close section menu" : "Open section menu"}</span>
            <span className="index__cur-icon" aria-hidden="true" />
          </span>
        </button>
        <div className="index__collapse" id={listId} inert={(!isDesktop && !open) ? true : undefined}>
          <ol className="index__list">
            {sections.map((s, i) => (
              <li key={s.id} data-current={s.id === active ? "true" : undefined} style={{ "--i": i } as CSSProperties}>
                <a
                  className="index__link"
                  href={`#${s.id}`}
                  aria-current={s.id === active ? "location" : undefined}
                  onClick={go(s.id)}
                >
                  <span className="index__n mono">{s.n}</span>
                  <span className="index__label">{s.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        <span className="index__track" aria-hidden="true">
          <span className="index__fill" />
        </span>
      </nav>
    </>
  );
}