"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { sections } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navigateToSection } from "@/lib/navFade";

const ids = sections.map((s) => s.id);

export default function SideIndex() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const collapseRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = sections.find((s) => s.id === active) ?? sections[0];

  // Scroll progress indicator
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

  // Safely manage inert attribute via DOM on mobile to prevent SSR hydration errors
  useEffect(() => {
    const updateInert = () => {
      const isMobile = window.innerWidth < 900;
      if (collapseRef.current) {
        if (isMobile && !open) {
          collapseRef.current.setAttribute("inert", "");
        } else {
          collapseRef.current.removeAttribute("inert");
        }
      }
    };

    updateInert();
    window.addEventListener("resize", updateInert);
    return () => window.removeEventListener("resize", updateInert);
  }, [open]);

  // Mobile panel open/close interactions
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
        <div ref={collapseRef} className="index__collapse" id={listId}>
          <ol className="index__list">
            {sections.map((s, i) => (
              <li
                key={s.id}
                data-current={s.id === active ? "true" : undefined}
                style={{ "--i": i } as CSSProperties}
              >
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