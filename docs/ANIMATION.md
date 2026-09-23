# Animation

GSAP 3 with ScrollTrigger. Everything is registered in `lib/gsap.ts` and imported only from client components.

## The hidden-state contract

Animated elements carry `data-hero` or `data-reveal`. CSS hides them (`visibility: hidden`) only when `html` has the class `motion`.

1. A boot script in `<head>` adds `motion` before first paint unless the visitor prefers reduced motion. No flash of visible content.
2. `PageMotion` and `Hero` reveal the elements and set `data-motion-ready` on `html`.
3. If that flag is not set within 5 seconds, the boot script removes `motion`, so content is never stranded invisible.
4. Hiding uses `visibility`, not transforms, to avoid a GSAP pitfall where a CSS transform is parsed into pixels and then fights `yPercent`.

## Where each animation lives

| Moment | File | Technique |
| --- | --- | --- |
| Opening sequence | `hero/Hero.tsx` | One timeline: rule draws, name rises through a mask, details fade in |
| Pointer depth on the name | `hero/Hero.tsx` | `gsap.quickTo`, fine pointers only |
| Section statements and rules | `motion/PageMotion.tsx` | IntersectionObserver, masked word rise, line draw, once |
| SEVEN pinned sequence | `sections/Seven.tsx` | ScrollTrigger pin, progress drives active stage and a CSS variable |
| Title card for Forgotten | `sections/BeyondCode.tsx` | Scrubbed letter-spacing and opacity |
| Questions sharpening | `sections/Questions.tsx` | Scrubbed opacity per item |
| Project rows, question list | `styles/sections.css` | CSS grid-row transitions, no JavaScript |
| Theme change | `navigation/ThemeToggle.tsx` | View Transitions API, circular clip from the control |

## Page transitions and loading

There is one page, so there are no route transitions. The opening sequence is the loading transition.

## Reduced motion

`useMotion` wraps `gsap.matchMedia()` and runs its setup only for `prefers-reduced-motion: no-preference`. Under reduced motion:

- Nothing is hidden (`motion` class absent).
- SEVEN is a stacked list, not a pinned sequence.
- CSS transitions collapse to near-zero duration.
- The timecode stops counting and the theme switches instantly.

Changing the setting while the page is open reverts every tween and ScrollTrigger through `matchMedia`.

## Cleanup

Every effect returns its cleanup. `gsap.matchMedia().revert()` kills tweens and ScrollTriggers created inside it. Event listeners added inside a setup are returned as cleanup. React Strict Mode double-invokes effects in development, which the revert pattern handles.

## Notes for future edits

- After adding content that changes page height, `ScrollTrigger.refresh()` runs on font load. Call it again if you add lazy content above the SEVEN section.
- `PageMotion` is mounted last in `page.tsx` on purpose, so its effects run after the sections create their triggers.
- The letter-spacing scrub on one title triggers layout each frame. It is a single element in a fixed-size frame, so the cost is small, but do not copy the pattern to large blocks of text.
