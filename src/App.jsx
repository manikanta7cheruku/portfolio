import React, { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { ScrollTrigger, gsap } from "./lib/gsap";

import Navbar from "./components/Navbar";
import HomeStage from "./sections/HomeStage";

export default function App() {
  const [navEnabled, setNavEnabled] = useState(false);

  // IMPORTANT: stable function reference (prevents HomeStage re-initializing)
  const handleGreetingShown = useCallback(() => {
    setNavEnabled(true);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
    });

    // (optional) expose for navbar smooth-scroll logic if you use it elsewhere
    window.__lenis = lenis;

    // NEW: always start at top (hero) on reload
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    lenis.scrollTo(0, { immediate: true });

    const raf = (time) => {
      // gsap ticker time is in seconds, Lenis expects ms
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", () => ScrollTrigger.update());
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // refresh once after fonts (avoids extra jump)
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(refresh);
    else requestAnimationFrame(refresh);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <>
      <div className="bgFixed" />
      <div className="bgNoise" />

      <Navbar enabled={navEnabled} />
      {/* IMPORTANT: do NOT call it like handleGreetingShown() */}
      <HomeStage onGreetingShown={handleGreetingShown} />
    </>
  );
}