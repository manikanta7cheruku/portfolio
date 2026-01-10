// src/sections/Projects.jsx
import React, { useEffect, useRef } from "react";

const PROJECTS = [
  {
    side: "left",
    label: "React · GSAP",
    title: "Cinematic Portfolio",
    desc:
      "Scroll‑driven portfolio with a pinned hero, panel transitions, and glassmorphism details — designed to feel cinematic but stay fast.",
    role: "Front‑end developer",
    stack: "React, GSAP, CSS",
    linkLabel: "View case study",
    href: "#",
    image: "/images/project-1.jpg",
  },
  {
    side: "right",
    label: "React · Three.js",
    title: "Interactive 3D Landing",
    desc:
      "Lightweight 3D scene with scroll‑linked motion, built to remain smooth on mid‑range devices.",
    role: "Front‑end developer",
    stack: "React, Three.js, GSAP",
    linkLabel: "View project",
    href: "#",
    image: "/images/project-2.jpg",
  },
  {
    side: "left",
    label: "Next.js · API",
    title: "Dashboard UI",
    desc:
      "A small dashboard with cards, charts, and async data loading, focused on hierarchy, readability, and responsive layout.",
    role: "Front‑end developer",
    stack: "Next.js, TypeScript, REST",
    linkLabel: "View project",
    href: "#",
    image: "/images/project-3.jpg",
  },
  {
    side: "right",
    label: "React · UI Engineering",
    title: "Component Library",
    desc:
      "A compact component set with tokens, variants, and motion baked in — built for consistency across projects.",
    role: "Front‑end developer",
    stack: "React, TypeScript, CSS",
    linkLabel: "View project",
    href: "#",
    image: "/images/project-4.jpg",
  },
];

export default function Projects() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rows = root.querySelectorAll(".projectRow");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("projectRow--visible");
          } else {
            // re‑animate when scrolling back up
            entry.target.classList.remove("projectRow--visible");
          }
        });
      },
      {
        threshold: 0.2,            // reveal when ~20% of row is visible
        rootMargin: "0px 0px -10% 0px",
      }
    );

    rows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="projectsShell">
      <header className="projectsHeader">
        <p className="projectsEyebrow">PROJECTS</p>
        <h2 className="projectsTitle">Selected work and experiments.</h2>
        <p className="projectsLead">
          A mix of front‑end builds, animation‑driven UI, and pieces where I
          care about the details — performance, motion, and polish.
        </p>
      </header>

      <div className="projectsList">
        {PROJECTS.map((p, i) => (
          <section
            key={p.title}
            className={`projectRow ${
              p.side === "right" ? "projectRow--reverse" : ""
            }`}
          >
            <div className="projectVisualCol">
              <a
                href={p.href}
                className="projectVisualLink"
                target="_blank"
                rel="noreferrer"
              >
                <div className={`projectVisual projectVisual--${i + 1}`}>
                  {p.image && (
                    <div className="projectVisualImgWrap">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="projectVisualImg"
                      />
                    </div>
                  )}

                  <div className="projectVisualTopRow">
                    <span className="projectVisualLabel">{p.label}</span>
                  </div>

                  <div className="projectVisualDecor">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </a>
            </div>

            <div className="projectInfoCol">
              <div className="projectInfoInner">
                <h3 className="projectName">{p.title}</h3>
                <p className="projectDesc">{p.desc}</p>
                <p className="projectMetaLine">Role: {p.role}</p>
                <p className="projectMetaLine">Stack: {p.stack}</p>
                <a
                  href={p.href}
                  className="projectLink"
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.linkLabel}
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}