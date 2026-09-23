"use client";

import { useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/hooks/useMotion";
import { facts, stages, stays, trajectory } from "@/data/seven";
import { projects } from "@/data/projects";
import SplitWords from "@/components/motion/SplitWords";
import ExternalLink from "@/components/ui/ExternalLink";

const seven = projects.find((p) => p.slug === "seven")!;

export default function Seven() {
  const section = useRef<HTMLElement>(null);
  const arch = useRef<HTMLDivElement>(null);
  const pin = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  /*
   * On wide screens with motion allowed, the architecture block pins to the viewport and the
   * scroll position walks through the six stages of a request. On narrow screens, or with
   * reduced motion, the same content is a plain stacked list (see sections.css, .arch).
   */
  useMotion(section, ({ wide }) => {
    const el = arch.current;
    if (!el || !wide) return;

    const count = stages.length;
    el.classList.add("is-pinned");

    pin.current = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: () => `+=${count * 75}%`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        el.style.setProperty("--p", self.progress.toFixed(4));
        setActive(Math.min(count - 1, Math.floor(self.progress * count)));
      },
    });

    return () => {
      pin.current = null;
      el.classList.remove("is-pinned");
      el.style.removeProperty("--p");
    };
  });

  const goTo = (index: number) => {
    const st = pin.current;
    if (!st) return;
    const top = st.start + ((index + 0.5) / stages.length) * (st.end - st.start);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section id="seven" ref={section} className="section seven" aria-labelledby="seven-title">
      <div className="wrap">
        <span className="rule" data-reveal="line" aria-hidden="true" />
        <div className="seven__intro">
          <h2 id="seven-title" className="display-m" data-reveal="words">
            <SplitWords text="What if you could just tell the computer what you want?" />
          </h2>
          <div className="seven__cols">
            <div className="prose">
              <h3 className="minor">The problem</h3>
              <p>
                Getting things done on a computer means moving between apps, menus and windows by
                hand. Each task is a small tour of interfaces, and none of them talk to each other.
              </p>
            </div>
            <div className="prose">
              <h3 className="minor">The direction</h3>
              <p>
                SEVEN is a layer above them. You say or type what you want and it does it. The
                parts that understand you, speech, language and memory, run on your own machine. It
                started as a voice assistant and is growing toward an interaction layer for the
                whole system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="arch" ref={arch}>
        <div className="wrap arch__inner">
          <div className="arch__rail-col">
            <h3 className="minor arch__title">The path of one request</h3>
            <ol className="arch__rail" aria-label="Stages of a request">
              {stages.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="arch__node"
                    aria-current={i === active ? "step" : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span className="arch__pip" aria-hidden="true" />
                    <span>{s.name}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="arch__panels">
            {stages.map((s, i) => (
              <article
                key={s.id}
                id={`seven-stage-${i}`}
                className="arch__panel"
                data-active={i === active}
              >
                <p className="arch__step mono">
                  Stage {i + 1} of {stages.length}
                </p>
                <h4 className="arch__name">{s.name}</h4>
                <p className="arch__verb">{s.verb}</p>
                <p className="arch__body">{s.body}</p>
                <ul className="chips mono" aria-label={`${s.name} details`}>
                  {s.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap seven__after">
        <div className="seven__block">
          <h3 className="minor">What stays on your machine, and what does not</h3>
          <div className="stays">
            <div>
              <h4 className="stays__h">Runs locally</h4>
              <ul className="plain">
                {stays.local.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="stays__h">Reaches a server</h4>
              <ul className="plain">
                {stays.server.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="note">That is the full list. Everything else stays on the device.</p>
            </div>
          </div>
        </div>

        <div className="seven__block">
          <h3 className="minor">Shipped as a product</h3>
          <div className="prose">
            <p>
              SEVEN installs like an app. A setup wizard handles Ollama and the first model
              download, licensing is tiered into Free, Pro and Ultimate, there is a referral system,
              and releases go out publicly on GitHub. I built all of it alone.
            </p>
          </div>
        </div>

        <div className="seven__block">
          <h3 className="minor">Where it is going</h3>
          <ol className="path">
            {trajectory.map((step) => (
              <li key={step.label} className={`path__step path__step--${step.state}`}>
                <span className="path__dot" aria-hidden="true" />
                <span className="path__label">{step.label}</span>
                <span className="path__state mono">
                  {step.state === "built" ? "Built" : "Direction, not built yet"}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <dl className="fact-strip">
          {facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>

        <ul className="row__links seven__links">
          <li>
            <ExternalLink href={seven.links.github}>Source on GitHub</ExternalLink>
          </li>
          {seven.links.releases ? (
            <li>
              <ExternalLink href={seven.links.releases}>Latest release</ExternalLink>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
