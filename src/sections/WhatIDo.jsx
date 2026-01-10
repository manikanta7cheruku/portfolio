// src/sections/WhatIDo.jsx
import React, { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

// “What I Do” – animated, timeline-style section with internal color shift
export default function WhatIDo() {
  const rootRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
  const root = rootRef.current;
  if (!root) return;

  // Segments
  const segments = root.querySelectorAll(".whatIDoSegment");
  const segObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("whatIDoSegment--visible");
        } else {
          el.classList.remove("whatIDoSegment--visible");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    }
  );
  segments.forEach((seg) => segObserver.observe(seg));

  // Languages
  const langEl = root.querySelector(".whatIDoLanguages");
  const langObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("whatIDoLanguages--visible");
        } else {
          entry.target.classList.remove("whatIDoLanguages--visible");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    }
  );
  if (langEl) langObserver.observe(langEl);

  return () => {
    segObserver.disconnect();
    langObserver.disconnect();
  };
}, []);

  return (
    <div ref={rootRef} className="whatIDoShell">
      {/* Gradient overlay that creates the “color shift” for this section */}
      <div
        ref={overlayRef}
        className="whatIDoGradientOverlay"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="whatIDoHeader">
        <p className="whatIDoEyebrow">WHAT I DO</p>
        <h2 className="whatIDoTitle">How I build, learn, and stay sharp.</h2>
        <p className="whatIDoLead">
          I focus on front‑end work where visual quality, motion, and structure
          all matter. Outside of code, I pick up skills and experiences that
          keep my perspective fresh and show up in the interfaces I ship.
        </p>
      </header>

      {/* Timeline-style content */}
      <div className="whatIDoTimeline">
        {/* 1. Product-focused front-end */}
        <section className="whatIDoSegment">
          <div className="whatIDoIcon">
            <span>UI</span>
          </div>
          <div className="whatIDoSegmentBody">
            <h3 className="whatIDoSegmentTitle">Product‑focused front‑end</h3>
            <p className="whatIDoText">
              I design and build interfaces that feel clean, responsive, and
              modern. Most of my work lives in React, with motion driven by
              GSAP, focusing on details like typography, spacing, and how
              interactions actually feel.
            </p>
            <p className="whatIDoText">
              I enjoy being close to design and product — turning ideas and
              Figma frames into something people can click, scroll, and use
              without thinking too much about the UI.
            </p>
          </div>
        </section>

        {/* 2. Learning mindset */}
        <section className="whatIDoSegment whatIDoSegment--right">
          <div className="whatIDoIcon">
            <span>∆</span>
          </div>
          <div className="whatIDoSegmentBody">
            <h3 className="whatIDoSegmentTitle">A learning‑first approach</h3>
            <p className="whatIDoText">
              I like learning by doing. Beyond code, I’ve been exploring
              cooking, filmmaking, editing and storytelling. The same attention
              I give to UI details — timing, pacing, and clarity — shows up
              there as well.
            </p>
            <p className="whatIDoText">
              I’m comfortable going from “I don’t know this yet” to “I can build
              with it”. That mindset makes it easier to pick up new tools,
              animation patterns, or workflows on the front‑end side.
            </p>
          </div>
        </section>

        {/* 3. How I reset focus */}
        <section className="whatIDoSegment">
          <div className="whatIDoIcon">
            <span>⚡</span>
          </div>
          <div className="whatIDoSegmentBody">
            <h3 className="whatIDoSegmentTitle">How I reset my focus</h3>
            <p className="whatIDoText">
              Competitive and strategy‑driven activities keep my thinking sharp.
              I often spend time on cricket, football, chess and other
              decision‑driven games that require timing and pattern recognition.
            </p>
            <p className="whatIDoText">
              I watch a lot of movies — they influence how I think about pacing,
              contrast, and storytelling in interfaces. Travelling and exploring
              places also help me see patterns and experiences from a different
              angle.
            </p>
          </div>
        </section>

        {/* 4. Collections */}
        <section className="whatIDoSegment whatIDoSegment--right">
          <div className="whatIDoIcon">
            <span>★</span>
          </div>
          <div className="whatIDoSegmentBody">
            <h3 className="whatIDoSegmentTitle">Collections I’m building</h3>
            <p className="whatIDoText">
              I’m working on a small personal space to keep a few collections
              that influence my work and thinking:
            </p>
            <ul className="whatIDoList">
              <li>Films that shaped how I see design and story.</li>
              <li>Dishes I’ve cooked that I’m proud of.</li>
              <li>Places I’ve visited that I’d like to revisit.</li>
            </ul>
            <p className="whatIDoText">
              To keep this section focused, those visuals and stories will live
              in a separate view.
            </p>
            <p className="whatIDoStudioLinkLine">
              <a
                href="/studio.html"     // points to public/studio.html
                className="whatIDoStudioLink"
                >
                    {/* <a
                        href="/studio.html"
                        className="whatIDoStudioLink"
                        target="_blank"
                        rel="noreferrer"
                        ></a> */}
                Visit the personal studio
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* Languages */}
      <section className="whatIDoLanguages">
        <h3 className="whatIDoSegmentTitle">Languages & communication</h3>
        <p className="whatIDoText">
          Comfortable collaborating across different languages.
        </p>

        <ul className="whatIDoLangList">
          <li>
            <span className="whatIDoLangName">Telugu</span>
            <span className="whatIDoLangSep">·</span>
            <span className="whatIDoLangLevel">Native</span>
          </li>
          <li>
            <span className="whatIDoLangName">Hindi</span>
            <span className="whatIDoLangSep">·</span>
            <span className="whatIDoLangLevel">Fluent</span>
          </li>
          <li>
            <span className="whatIDoLangName">English</span>
            <span className="whatIDoLangSep">·</span>
            <span className="whatIDoLangLevel">
              Professional working proficiency
            </span>
          </li>
          <li>
            <span className="whatIDoLangName">Spanish</span>
            <span className="whatIDoLangSep">·</span>
            <span className="whatIDoLangLevel">Learning</span>
          </li>
        </ul>
      </section>
    </div>
  );
}