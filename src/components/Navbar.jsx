// src/components/Navbar.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function Navbar({ enabled = false }) {
  const navRef = useRef(null);
  const stRef = useRef(null);

  const [hint, setHint] = useState("");
  const [hintVisible, setHintVisible] = useState(false);

  // mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);

  const items = useMemo(
    () => [
      { label: "Home", href: "#home", hint: "Back to the intro." },
      { label: "About", href: "#about", hint: "A quick story and what I’m focused on." },
      { label: "Projects", href: "#projects", hint: "Selected work and case studies." },
      { label: "What I Do", href: "#whatido", hint: "My core skills and strengths." },
      { label: "Contact", href: "#contact", hint: "Let’s build something together." },
    ],
    []
  );

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    gsap.set(navRef.current, { autoAlpha: 0, y: -16 });
  }, []);

  useEffect(() => {
    if (!enabled) return;

    gsap.to(navRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    });

    stRef.current?.kill();
    stRef.current = ScrollTrigger.create({
      id: "navbarScroll",
      start: 0,
      end: () => ScrollTrigger.maxScroll(window) || 1,
      onUpdate: (self) => {
        const y = self.scroll();

        if (menuOpenRef.current) {
          gsap.to(navRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.18,
            ease: "power2.out",
            overwrite: true,
          });
          return;
        }

        if (self.direction === 1 && y > 80) {
          gsap.to(navRef.current, {
            autoAlpha: 0,
            y: -12,
            duration: 0.22,
            ease: "power2.out",
            overwrite: true,
          });
        } else if (self.direction === -1) {
          gsap.to(navRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.26,
            ease: "power2.out",
            overwrite: true,
          });
        }

        if (y < 10) {
          gsap.to(navRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
            overwrite: true,
          });
        }
      },
    });

    return () => {
      stRef.current?.kill();
      stRef.current = null;
    };
  }, [enabled]);

  const handleToggleMenu = () => setMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setMenuOpen(false);

  // single smooth-scroll handler for all hash links (#home, #about, ...)
 const handleNavClick = (href) => (e) => {
  handleCloseMenu();

  if (!href.startsWith("#")) return;
  e.preventDefault();

  const id = href.slice(1);
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = window.__lenis;

  let offset = -70;
  if (id === "home") offset = -80;
  else if (id === "projects") offset = 0;   // show Projects from the very top
  else if (id === "whatido") offset = 20;

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2, offset });
  } else {
    const rect = target.getBoundingClientRect();
    const y = window.scrollY + rect.top - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

  return (
    <>
      <div className="navWrap">
        <nav ref={navRef} className="navBar" aria-label="Primary">
          <div className="navLeft">
            <a
              className="logoPill"
              href="#home"
              aria-label="Home"
              onClick={handleNavClick("#home")}
            >
              <span>MC</span>
            </a>
          </div>

          <div className="navRight">
            {/* Mobile toggle */}
            <button
              type="button"
              className={`navToggle ${menuOpen ? "open" : ""}`}
              onClick={handleToggleMenu}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>

            {/* Links */}
            <div className={`navLinks ${menuOpen ? "open" : ""}`}>
              {items.map((it) => (
                <a
                  key={it.label}
                  className="navLink"
                  href={it.href}
                  onClick={handleNavClick(it.href)}
                  onMouseEnter={() => {
                    setHint(it.hint);
                    setHintVisible(true);
                  }}
                  onMouseLeave={() => setHintVisible(false)}
                  onFocus={() => {
                    setHint(it.hint);
                    setHintVisible(true);
                  }}
                  onBlur={() => setHintVisible(false)}
                >
                  <span>{it.label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className="navHintWrap" aria-hidden="true">
        <div className={`navHint ${hintVisible ? "show" : ""}`}>{hint}</div>
      </div>
    </>
  );
}