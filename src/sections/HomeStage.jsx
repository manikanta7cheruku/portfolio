// src/sections/HomeStage.jsx
import React, { useLayoutEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import About from "./About";
import Projects from "./Projects";
import WhatIDo from "./WhatIDo";
import Contact from "./Contact";
import Footer from "./Footer";

function splitToLetters(text) {
  return Array.from(text);
}

export default function HomeStage({ onGreetingShown }) {
  const stageRef = useRef(null);
  const pinRef = useRef(null);


  const textRef = useRef(null);

  const metaRef = useRef(null);
  const greetingRef = useRef(null);
  const ctaRef = useRef(null);

  const slideUpRef = useRef(null);
  const slideDownRef = useRef(null);

  const splitRef = useRef(null);

  // About preview inside the hero
  const aboutPreviewRef = useRef(null);

  const NAME = "Manikanta Cheruku";
  const letters = useMemo(() => splitToLetters(NAME), []);


 useLayoutEffect(() => {
  const reduce =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const ctx = gsap.context(() => {
    const el = textRef.current;
    if (!el) return;

    // === hero letter build, intro, panels, quotes ===
    el.innerHTML = "";
    letters.forEach((ch, i) => {
      const span = document.createElement("span");
      if (ch === " ") {
        span.className = "letter space";
        span.innerHTML = "&nbsp;";
      } else {
        span.className = "letter";
        span.textContent = ch;
      }
      span.dataset.i = String(i);
      el.appendChild(span);
    });

    const letterEls = Array.from(el.querySelectorAll(".letter"));
    const n = letterEls.length;
    const center = (n - 1) / 2;

    const computeAndCacheSplit = () => {
      const pin = pinRef.current;
      const text = textRef.current;
      const up = slideUpRef.current;
      const down = slideDownRef.current;
      if (!pin || !text || !up || !down) return;

      const pinRect = pin.getBoundingClientRect();
      const textRect = text.getBoundingClientRect();

      const lineY = textRect.top - pinRect.top + textRect.height / 2;
      const pinH = pinRect.height;

      const overlap = 3;

      const upBottom = Math.max(0, pinH - lineY);
      const downTop = Math.max(0, lineY);

      const upTarget = Math.max(0, lineY + overlap);
      const downTarget = Math.max(0, pinH - lineY + overlap);

      splitRef.current = { upBottom, downTop, upTarget, downTarget };

      gsap.set(up, { bottom: upBottom });
      gsap.set(down, { top: downTop });
    };

    const applyCachedSplitPosition = () => {
      const m = splitRef.current;
      if (!m) return;
      gsap.set(slideUpRef.current, { bottom: m.upBottom });
      gsap.set(slideDownRef.current, { top: m.downTop });
    };

    gsap.set(letterEls, {
      opacity: 0,
      x: -20,
      filter: "blur(10px)",
      scaleY: 1,
      transformOrigin: "50% 50%",
    });

    gsap.set(greetingRef.current, { opacity: 0, y: 10 });
    gsap.set(ctaRef.current, { opacity: 0, y: 10 });
    gsap.set(metaRef.current, { opacity: 1, filter: "blur(0px)" });

    gsap.set(slideUpRef.current, { height: 0, opacity: 0 });
    gsap.set(slideDownRef.current, { height: 0, opacity: 0 });

    gsap.set(textRef.current, { visibility: "visible" });
    document.body.classList.remove("whiteMode");

    const aboutPreview = aboutPreviewRef.current;
    if (aboutPreview) {
      gsap.set(aboutPreview, {
        opacity: 0,
        filter: "blur(18px)",
        y: 32,
      });
    }

    computeAndCacheSplit();

    if (reduce) {
      gsap.set(letterEls, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        scaleY: 1,
      });
      gsap.set(greetingRef.current, { opacity: 1, y: 0 });
      gsap.set(ctaRef.current, { opacity: 1, y: 0 });
      onGreetingShown?.();

      applyCachedSplitPosition();
      const m = splitRef.current;
      if (m) {
        gsap.set(slideUpRef.current, { opacity: 1, height: m.upTarget });
        gsap.set(slideDownRef.current, { opacity: 1, height: m.downTarget });
      }

      gsap.set(textRef.current, { visibility: "hidden" });
      document.body.classList.add("whiteMode");

      if (aboutPreview) {
        gsap.set(aboutPreview, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        });
      }

      return;
    }

    const intro = gsap.timeline({ defaults: { ease: "power2.out" } });
    intro
      .to(letterEls, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.05,
      })
      .to(
        greetingRef.current,
        { opacity: 1, y: 0, duration: 0.55 },
        ">-0.10"
      )
      .add(() => onGreetingShown?.(), ">")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.55 }, ">-0.05");

    const setX = letterEls.map((node) => gsap.quickSetter(node, "x", "px"));
    const setScaleY = letterEls.map((node) =>
      gsap.quickSetter(node, "scaleY")
    );
    const setOpacity = letterEls.map((node) =>
      gsap.quickSetter(node, "opacity")
    );

    const setUpH = gsap.quickSetter(slideUpRef.current, "height", "px");
    const setDownH = gsap.quickSetter(slideDownRef.current, "height", "px");
    const setUpO = gsap.quickSetter(slideUpRef.current, "opacity");
    const setDownO = gsap.quickSetter(slideDownRef.current, "opacity");

    const setAboutPrevOpacity = aboutPreview
      ? gsap.quickSetter(aboutPreview, "opacity")
      : null;
    const setAboutPrevFilter = aboutPreview
      ? gsap.quickSetter(aboutPreview, "filter")
      : null;
    const setAboutPrevY = aboutPreview
      ? gsap.quickSetter(aboutPreview, "y", "px")
      : null;

    ScrollTrigger.create({
      id: "homeStagePin",
      trigger: stageRef.current,
      start: "top top",
      end: "+=700",
      scrub: 1,
      pin: pinRef.current,
      anticipatePin: 1,
      onRefresh: () => {
        computeAndCacheSplit();
      },
      onUpdate: (self) => {
        const p = self.progress;

        applyCachedSplitPosition();
        const m = splitRef.current;
        if (!m) return;

        const metaFade = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.04, 0.18, 0, 1, p)
        );
        gsap.set(metaRef.current, {
          opacity: 1 - metaFade,
          filter: `blur(${metaFade * 10}px)`,
        });

        const spreadP = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.1, 0.52, 0, 1, p)
        );
        const flattenP = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.52, 0.7, 0, 1, p)
        );
        const panelsP = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.7, 0.96, 0, 1, p)
        );
        const nameGoneP = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.72, 0.8, 0, 1, p)
        );

        const maxSpread = 52;
        const scaleY = Math.max(0.05, 1 - flattenP * 0.95);
        const opBase = Math.max(0.7, 1 - flattenP * 0.3);
        const op = opBase * (1 - nameGoneP);

        for (let i = 0; i < n; i++) {
          const dist = i - center;
          setX[i](dist * maxSpread * spreadP);
          setScaleY[i](scaleY);
          setOpacity[i](op);
        }

        textRef.current.style.visibility =
          nameGoneP > 0.98 ? "hidden" : "visible";

        const panelAlpha = panelsP > 0.001 ? 1 : 0;
        setUpO(panelAlpha);
        setDownO(panelAlpha);

        setUpH(m.upTarget * panelsP);
        setDownH(m.downTarget * panelsP);

        if (panelsP > 0.98) document.body.classList.add("whiteMode");
        else document.body.classList.remove("whiteMode");

        if (
          aboutPreview &&
          setAboutPrevOpacity &&
          setAboutPrevFilter &&
          setAboutPrevY
        ) {
          const aboutPrevP = gsap.utils.clamp(
            0,
            1,
            gsap.utils.mapRange(0.35, 1.0, 0, 1, panelsP)
          );

          setAboutPrevOpacity(aboutPrevP);
          setAboutPrevFilter(`blur(${(1 - aboutPrevP) * 18}px)`);
          setAboutPrevY((1 - aboutPrevP) * 32);
        }
      },
    });

    // --- NEW: Projects → What I Do color cross-fade overlay ---
   // --- Projects → What I Do color cross-fade overlay ---


    const onResize = () => {
      computeAndCacheSplit();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, stageRef);

  return () => {
    document.body.classList.remove("whiteMode");
    ctx.revert();
  };
}, [letters, onGreetingShown]);

  return (
    <section id="home" ref={stageRef} className="homeStage">
       {/* NEW: full-screen overlay for Projects → What I Do transition */}
    
     <div ref={pinRef} className="pinViewport">
  {/* White panels */}
  <div ref={slideUpRef} className="slideUp" aria-hidden="true" />
  <div ref={slideDownRef} className="slideDown" aria-hidden="true" />

  {/* Hero: name + greeting + CTAs */}
  <h1 ref={textRef} className="cinzelText" aria-label={NAME} />

  <div ref={metaRef} className="heroMeta">
    <p ref={greetingRef} className="greeting">
      Hey there — I learn and build for the modern web.
    </p>

    <div ref={ctaRef} className="ctaRow">
      <a className="btn btnPrimary" href="#contact">Contact</a>
      <a className="btn btnSecondary" href="/resume.pdf" target="_blank" rel="noreferrer">
        Résumé
      </a>
    </div>
  </div>

  {/* quotes preview stays here if you have it */}
  {/* <div ref={aboutPreviewRef} className="aboutHeroPreview"> ... </div> */}


        {/* About preview that appears as panels open */}
      {/* Philosophy / quotes preview that appears as panels open */}
<div ref={aboutPreviewRef} className="aboutHeroPreview">
  <div className="aboutHeroBadge">
    <span className="aboutHeroDot" />
    <span className="aboutHeroBadgeText">
      A FEW FAVOURITES THAT STAY CLOSE TO MY WORK.
    </span>
    <span className="aboutHeroDot" />
  </div>

  <div className="aboutHeroQuoteBlock">
    <div className="aboutHeroRule" />
    <p className="aboutHeroQuoteMain">
      “Mankind was born on Earth; it was never meant to die here.”
    </p>
    <p className="aboutHeroQuoteMeta">Interstellar</p>
  </div>

  <div className="aboutHeroDividerDots">
    <span />
    <span />
    <span />
  </div>

  <div className="aboutHeroQuoteBlock">
    <div className="aboutHeroRule" />
    <p className="aboutHeroQuoteMain">
      “Make it work, make it right, make it fast.”
    </p>
    <p className="aboutHeroQuoteMeta">Kent Beck</p>
  </div>
</div>

        {/* Name */}
        <h1 ref={textRef} className="cinzelText" aria-label={NAME} />

        {/* Meta */}
        <div ref={metaRef} className="heroMeta">
          <p ref={greetingRef} className="greeting">
            Hey there — I learn and build for the modern web.
          </p>

          <div ref={ctaRef} className="ctaRow">
            <a className="btn btnPrimary" href="#contact">
              Contact
            </a>
            <a
              className="btn btnSecondary"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Résumé
            </a>
          </div>
        </div>
      </div>

      {/* Full About section below, scrollable */}
           {/* About */}
      <section id="about" className="aboutSection">
        <About />
      </section>

      {/* Projects */}
      <section id="projects" className="projectsSection">
        <Projects />
      </section>

      {/* What I Do */}
      <section id="whatido" className="whatIDoSection">
        <WhatIDo />
      </section>

      {/* Contact */}
      <section id="contact" className="contactSection">
        <Contact />
      </section>
      <section id="footer" className="footerSection">
        <Footer />
      </section>
    </section>
  );
}