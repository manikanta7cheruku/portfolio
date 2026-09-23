"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/hooks/useMotion";
import { site } from "@/data/site";
import Timecode from "./Timecode";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ fine }) => {
    const q = gsap.utils.selector(ref);

    // CSS hides every [data-hero] element until this point (see base.css), so nothing flashes.
    gsap.set(q("[data-hero]"), { autoAlpha: 1 });

    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .fromTo(
        q(".hero__rule"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.8, ease: "power3.inOut", transformOrigin: "left center" },
        0.1,
      )
      .fromTo(
        q(".hero__word"),
        { yPercent: 115 },
        { yPercent: 0, duration: 1.6, stagger: 0.16 },
        0.45,
      )
      .fromTo(
        q("[data-hero='fade']"),
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12 },
        1.35,
      );

    if (!fine) return;

    // Depth: the name drifts a few pixels against the pointer.
    const name = q(".hero__name")[0];
    if (!name) return;
    const xTo = gsap.quickTo(name, "x", { duration: 1.4, ease: "power3" });
    const yTo = gsap.quickTo(name, "y", { duration: 1.4, ease: "power3" });
    const onMove = (e: PointerEvent) => {
      xTo((e.clientX / window.innerWidth - 0.5) * -18);
      yTo((e.clientY / window.innerHeight - 0.5) * -10);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  });

  return (
    <section id="opening" ref={ref} className="hero" aria-label="Introduction">
      <div className="wrap hero__inner">
        <div className="hero__time" data-hero="fade">
          <Timecode />
        </div>

        <h1 className="hero__name" aria-label={site.name}>
          <span className="hero__line" data-hero="line" aria-hidden="true">
            <span className="hero__word">Manikanta</span>
          </span>
          <span className="hero__line" data-hero="line" aria-hidden="true">
            <span className="hero__word">Cheruku</span>
          </span>
        </h1>

        <span className="hero__rule" data-hero="rule" aria-hidden="true" />

        <div className="hero__foot">
          <div className="hero__id" data-hero="fade">
            <p className="hero__role">{site.role}</p>
            <p className="hero__where">{site.location}</p>
          </div>
          <p className="hero__thought" data-hero="fade">
            I like understanding a system before changing it. Then I learn the rest by building.
          </p>
          <div className="hero__facts" data-hero="fade">
            <p>
              B.Tech in Computer Science and Business Systems, graduating 2027. Looking for
              software engineering internships and full-time roles.
            </p>
            <ul className="hero__links">
              <li>
                <a
                  className="link"
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="link" href={`mailto:${site.email}`}>
                  Email
                </a>
              </li>
              <li>
                <a className="link" href={site.links.resume} target="_blank" rel="noopener noreferrer">
                  Résumé
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
