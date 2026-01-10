import React, { useEffect, useRef } from "react";

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

export default function CustomScrollbar() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  const simRef = useRef({
    dpr: 1,
    w: 0,
    h: 0,

    // layout
    pad: 14,
    trackW: 10,
    thumbH: 64,

    // points + particles
    fillPoints: [],
    atoms: [],
    t: 0,
  });

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const initFillPoints = () => {
      const s = simRef.current;
      const count = 240;

      s.fillPoints = Array.from({ length: count }, (_, i) => {
        // normalized along track
        const yn = (i + Math.random() * 0.75) / count; // 0..1-ish
        const xn = (Math.random() - 0.5) * 0.9;        // left/right spread in track
        const r = 0.8 + Math.random() * 1.6;
        const phase = Math.random() * Math.PI * 2;
        return { yn, xn, r, phase };
      });
    };

    const spawnAtom = () => {
      const s = simRef.current;
      const trackX = s.w - 18;
      const top = s.pad;
      const bottom = s.h - s.pad;

      const y = top + Math.random() * (bottom - top);
      const x = trackX + (Math.random() - 0.5) * 28;

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        life: 120 + Math.floor(Math.random() * 120),
        r: 0.9 + Math.random() * 1.8,
        hue: Math.random() < 0.5 ? 195 : 265, // cyan-ish / violet-ish
      };
    };

    const initAtoms = () => {
      const s = simRef.current;
      const count = reduce ? 0 : 90;
      s.atoms = Array.from({ length: count }, () => spawnAtom());
    };

    const resize = () => {
      const s = simRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.dpr = dpr;

      // CSS size is controlled by the wrapper (100vh/width)
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      s.w = w;
      s.h = h;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initFillPoints();
      initAtoms();
    };

    const getScrollProgress = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      return clamp01(window.scrollY / max);
    };

    const draw = () => {
      const s = simRef.current;
      s.t += 1;

      const p = getScrollProgress();

      const trackX = s.w - 18;
      const top = s.pad;
      const bottom = s.h - s.pad;
      const trackH = bottom - top;

      const thumbH = s.thumbH;
      const thumbY = top + p * Math.max(1, trackH - thumbH);
      const thumbCY = thumbY + thumbH / 2;

      ctx.clearRect(0, 0, s.w, s.h);

      // Track (subtle)
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.beginPath();
      ctx.moveTo(trackX, top);
      ctx.lineTo(trackX, bottom);
      ctx.stroke();
      ctx.restore();

      // Filled “atoms” (static points revealed up to thumb)
      const fillY = top + p * trackH;
      for (const pt of s.fillPoints) {
        const y = top + pt.yn * trackH;
        if (y > fillY) continue;

        const x = trackX + pt.xn * 6;
        const shimmer = 0.45 + 0.55 * Math.sin(s.t * 0.03 + pt.phase);

        ctx.save();
        ctx.globalAlpha = 0.12 + shimmer * 0.18;
        ctx.fillStyle = pt.yn % 0.2 < 0.1 ? "rgba(77,232,255,0.95)" : "rgba(167,139,250,0.85)";
        ctx.beginPath();
        ctx.arc(x, y, pt.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Blackhole thumb
      ctx.save();
      // Outer glow
      const glow = ctx.createRadialGradient(trackX, thumbCY, 0, trackX, thumbCY, 18);
      glow.addColorStop(0, "rgba(0,0,0,0.0)");
      glow.addColorStop(0.35, "rgba(77,232,255,0.22)");
      glow.addColorStop(0.65, "rgba(167,139,250,0.18)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(trackX, thumbCY, 18, 0, Math.PI * 2);
      ctx.fill();

      // Core
      const core = ctx.createRadialGradient(trackX, thumbCY, 0, trackX, thumbCY, 10);
      core.addColorStop(0, "rgba(0,0,0,0.92)");
      core.addColorStop(1, "rgba(0,0,0,0.35)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(trackX, thumbCY, 9.5, 0, Math.PI * 2);
      ctx.fill();

      // Ring
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.beginPath();
      ctx.arc(trackX, thumbCY, 11.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      if (!reduce) {
        // Atoms being “vacuumed” into thumb
        const gravity = 1.35;
        const swirl = 1.15;

        for (let i = 0; i < s.atoms.length; i++) {
          const a = s.atoms[i];

          const dx = trackX - a.x;
          const dy = thumbCY - a.y;

          const r2 = dx * dx + dy * dy + 60;
          const inv = 1 / Math.sqrt(r2);

          const ax = dx * inv * gravity;
          const ay = dy * inv * gravity;

          // swirl (perpendicular)
          const sx = -dy * inv * swirl;
          const sy = dx * inv * swirl;

          a.vx = (a.vx + ax + sx) * 0.90;
          a.vy = (a.vy + ay + sy) * 0.90;

          a.x += a.vx;
          a.y += a.vy;
          a.life -= 1;

          // draw
          const dist = Math.sqrt(dx * dx + dy * dy);
          const alpha = clamp01(1 - dist / 240) * 0.55;

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle =
            a.hue < 230 ? "rgba(77,232,255,0.95)" : "rgba(167,139,250,0.90)";
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // respawn if consumed / dead / off-track
          if (a.life <= 0 || dist < 10 || a.y < top - 40 || a.y > bottom + 40) {
            s.atoms[i] = spawnAtom();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    resize();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="customScrollbar" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}