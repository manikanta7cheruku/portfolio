"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/hooks/useMotion";
import { interests } from "@/data/content";
import SplitWords from "@/components/motion/SplitWords";

export default function BeyondCode() {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, () => {
    const title = ref.current?.querySelector<HTMLElement>(".film__title");
    const frame = ref.current?.querySelector<HTMLElement>(".film");
    if (!title || !frame) return;

    // The title settles as the frame reaches the middle of the screen, like a title card.
    gsap.fromTo(
      title,
      { letterSpacing: "0.18em", opacity: 0.15 },
      {
        letterSpacing: "0.01em",
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top 88%", end: "center 48%", scrub: true },
      },
    );
  });

  return (
    <section id="beyond" ref={ref} className="section" aria-labelledby="beyond-title">
      <div className="wrap">
        <span className="rule" data-reveal="line" aria-hidden="true" />
        <div className="split split--tight">
          <h2 id="beyond-title" className="display-m" data-reveal="words">
            <SplitWords text="The habit does not stay at the keyboard." />
          </h2>
          <div className="prose">
            <p>
              I take films apart to see how they are built, cook to find out what changes when one
              thing changes, and travel to see how other places work.
            </p>
          </div>
        </div>

        <figure className="film" aria-labelledby="film-caption">
          <div className="film__frame">
            <span className="film__mark film__mark--tl mono">A short film</span>
            <span className="film__title" aria-hidden="true">
              Forgotten
            </span>
            <span className="film__mark film__mark--br mono">Directed by Manikanta Cheruku</span>
          </div>
          <figcaption id="film-caption" className="film__caption">
            <strong>Forgotten.</strong> A psychological thriller with a love story at its center and
            a mind-bending concept underneath. I directed it.
          </figcaption>
        </figure>

        <div className="split beyond__lower">
          <div className="prose">
            <p>
              My taste in film runs toward stories with a structure you have to work out, the way
              Christopher Nolan builds them. Interstellar is the one I return to most: black holes,
              and time that runs differently depending on where you stand.
            </p>
          </div>
          <ul className="index-list" aria-label="Interests">
            {interests.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
