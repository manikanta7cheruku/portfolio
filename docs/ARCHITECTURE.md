# Architecture

## Shape of the app

One route, `/`, statically rendered. Every scene is a section component composed in `app/page.tsx`. There is no backend, no database and no API route.

```text
layout.tsx      fonts, metadata, theme boot script, skip link
page.tsx        composition of the nine scenes and JSON-LD
  TopBar        name, theme control, résumé link          (server, with one client child)
  SideIndex     section index and progress                (client)
  Hero          opening sequence                          (client)
  Perspective   how he thinks; QuestionList is client
  Work          project exhibition                        (client, holds which row is open)
  Seven         case study with pinned sequence           (client)
  Engineering   principles and where each tool shows up   (server)
  Journey       experience and education                  (server)
  BeyondCode    Forgotten and interests                   (client, one scrubbed tween)
  Questions     open questions                            (client, scrubbed opacity)
  Contact       links                                     (server)
  PageMotion    global reveals, mounted last              (client)
```

Sections that need no interactivity stay server components, which keeps the JavaScript small.

## Data flow

Content flows one way: `data/*.ts` to components as props or direct imports. Components hold no copy. This makes it safe to edit words without touching layout, and safe to change layout without touching words.

`data/site.ts` also defines the ordered list of sections. The side index, the active-section tracker and the page all read from it, so ids cannot drift.

## Component boundaries

- `components/sections/*` know about content shape and layout.
- `components/ui/*` are content-agnostic primitives (`Flow`, `ExternalLink`).
- `components/motion/*` and `hooks/*` know about GSAP and nothing about content.
- `lib/gsap.ts` is the only place GSAP is imported and its plugin registered.

## Rendering strategy

Static rendering at build time. Client components hydrate to add interaction. Two inline scripts run before hydration: the boot script in `layout.tsx` (theme and motion class) and the JSON-LD block.

## Animation architecture

See `ANIMATION.md`. In short: CSS hides animated elements only while `html.motion` is set, and GSAP reveals them. If anything fails, the class is removed and content is visible.

## Responsive architecture

Two layout breakpoints: 900px (two-column layouts, pinned SEVEN sequence) and 1100px (right-edge index and reserved rail). Below 1100px the index becomes a bottom bar. Type uses `clamp()` so it scales without extra breakpoints. Hover-only behavior is always duplicated by click, tap or focus.

## Decisions worth knowing

- Plain CSS in four ordered files instead of Tailwind: the design depends on custom properties, masks and a few one-off layouts, and it removes a build dependency.
- `IntersectionObserver` for reveals and ScrollTrigger only for pinning and scrubbing, so the pinned SEVEN section cannot break reveal timing.
- The name is set in mixed case, not capitals: a display serif in capitals at this size overflows a 320px screen.
