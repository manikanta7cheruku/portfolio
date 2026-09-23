"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/hooks/useMotion";
import { questionsIWonder } from "@/data/content";
import SplitWords from "@/components/motion/SplitWords";

export default function Questions() {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, () => {
    // Each question sharpens as it reaches the reading position. Scroll-linked, so it reverses.
    gsap.utils.toArray<HTMLElement>(".q__item", ref.current ?? undefined).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 82%", end: "top 52%", scrub: true },
        },
      );
    });
  });

  return (
    <section id="questions" ref={ref} className="section" aria-labelledby="questions-title">
      <div className="wrap">
        <span className="rule" data-reveal="line" aria-hidden="true" />
        <div className="split split--tight">
          <h2 id="questions-title" className="display-m" data-reveal="words">
            <SplitWords text="Questions I am still chasing." />
          </h2>
          <p className="lead">
            I am learning machine learning, data and AI systems, including how they actually work
            and where the idea of AGI is pointing. These are open for me.
          </p>
        </div>

        <ul className="q__list">
          {questionsIWonder.map((q) => (
            <li key={q} className="q__item">
              {q}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
