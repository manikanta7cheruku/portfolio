// src/sections/About.jsx
import React, { useEffect, useState } from "react";

/**
 * About:
 * - main: premium header + highlight cards + 2 CTA buttons
 * - education: full Education page inside About (same tab)
 * - certs: full Certifications page inside About (same tab)
 */

export default function About() {
  const [mounted, setMounted] = useState(false);   // for entry animation (isReady)
  const [view, setView] = useState("main");        // "main" | "education" | "certs"

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleOpenEducation = () => setView("education");
  const handleOpenCerts = () => setView("certs");
  const handleBack = () => setView("main");

  return (
    <div className={`aboutShell ${mounted ? "isReady" : ""}`}>
      {view === "main" && (
        <>
          {/* Top header */}
          <header className="aboutHeader3d">
            <p className="aboutEyebrow">ABOUT</p>

            <h2 className="aboutTitle3d" id="about">
              I build premium web experiences — and automate the boring parts.
            </h2>

            <p className="aboutLead3d">
              I’m <strong>Manikanta Cheruku</strong>, based in{" "}
              <strong>Hyderabad, India</strong>. My work sits at the edge of
              modern web and agentic automation — turning ideas into interfaces
              that feel sharp, and workflows into systems that run on their own.
            </p>

            <p className="aboutLead3d">
              Some people mistake my calm pace for “slow”. But when it’s time to
              deliver — I move fast. I enjoy solving real‑world problems under
              real constraints, and I stay consistent: if I don’t know
              something, I learn it and make it work.
            </p>

            {/* Pill row */}
            <div className="aboutPills">
              <span className="aboutPill">Hyderabad, India</span>
              <span className="aboutPill">Web + Agentic Automation</span>
              <span className="aboutPill">Problem Solver</span>
            </div>
          </header>

          {/* Two “signature” cards (NOT skills list) */}
          <section className="aboutGrid3d" aria-label="Highlights">
            <article className="aboutCard3d">
              <div className="aboutCardTop">
                <div className="aboutBadge">01</div>
                <h3 className="aboutCardTitle">Interfaces with intent</h3>
              </div>
              <p className="aboutCardText">
                I care about the details people feel: spacing, rhythm, motion,
                and clarity. The goal is simple — UI that looks premium and
                behaves predictably.
              </p>
            </article>

            <article className="aboutCard3d">
              <div className="aboutCardTop">
                <div className="aboutBadge">02</div>
                <h3 className="aboutCardTitle">Automation that matters</h3>
              </div>
              <p className="aboutCardText">
                I’m exploring the evolving AI space to build agentic flows that
                remove repetitive steps — so teams can focus on decisions, not
                busywork.
              </p>
            </article>
          </section>

          {/* Actions: Education + Certifications (sub-pages) */}
          <section className="aboutActions" aria-label="More details">
  <a
    className="aboutActionBtn"
    href="/education.html"        // or your real URL
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="aboutActionTitle">Education</span>
    <span className="aboutActionMeta">Open full details</span>
  </a>

  <a
    className="aboutActionBtn aboutActionBtnAlt"
    href="/certifications.html"  // or your real URL
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="aboutActionTitle">Certifications</span>
    <span className="aboutActionMeta">Open full details</span>
  </a>
</section>
        </>
      )}

      {view === "education" && (
        <EducationPanel onBack={handleBack} />
      )}

      {view === "certs" && (
        <CertificationsPanel onBack={handleBack} />
      )}
    </div>
  );
}