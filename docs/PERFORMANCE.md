# Performance

## Status of measurements

No Lighthouse or Web Vitals numbers are recorded here. They must come from a real production build, and none has been run yet. Do not quote scores until you have measured them.

## How to measure

```bash
npm run build && npm run start
# Chrome DevTools, Lighthouse tab: Mobile, then Desktop, on http://localhost:3000
```

After deployment, run PageSpeed Insights against the Vercel URL. Test on a mid-range phone, not only a laptop. Record LCP, INP and CLS.

## Choices made for speed

- No images. Every visual is type, CSS or inline structure, so there is nothing to compress or lazy load. The Open Graph image and favicon are generated at build time.
- Three fonts through `next/font/google`: self-hosted, `display: swap`, subset to Latin, no layout shift from font loading.
- Runtime dependencies are `next`, `react`, `react-dom` and `gsap`. No animation wrapper, no UI kit, no icon library.
- Server components for every section that needs no interaction.
- Animations use `transform` and `opacity`. Two exceptions are documented in `ANIMATION.md` (one letter-spacing scrub) and `sections.css` (grid-row height transitions on small panels).
- The scroll progress line writes one CSS variable inside `requestAnimationFrame` on the navigation element only, so no page-wide style recalculation.
- Film grain is one fixed layer with an inline SVG, no blend mode.
- No WebGL and no Three.js. Nothing on this site needs them.
- Long-lived cache header on the résumé PDF, security headers in `next.config.ts`.

## Code splitting and dynamic imports

The page is one static route, and GSAP is used above the fold, so splitting it out would only add a request. If the site grows more routes, load GSAP only in the routes that need it.

## Things to watch

- The pinned SEVEN section adds about four and a half viewport heights of scroll. That is deliberate. Reduce the multiplier in `Seven.tsx` (`count * 75`) if it feels long.
- `PageMotion` observes every `[data-reveal]` element with one observer.
