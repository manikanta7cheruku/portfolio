# Manikanta Cheruku, portfolio

Source for the personal site of Manikanta Cheruku, a software engineer and product builder in Hyderabad, India.

The site is one continuous page, built as a sequence of scenes: an opening, how he thinks, the work, a deep look at SEVEN (his local-first desktop agent), how he builds, experience and education, life beyond code, open questions, and contact.

## Design philosophy

Understand deeply. Build directly. Learn through the process. The site tries to show that instead of saying it.

- Cinematic and editorial, not a template. Large type, negative space, one accent color.
- Motion answers an action or marks one important moment. It is never applied to every block.
- Everything on the page is backed by the résumé or the public repositories. Nothing is invented. See `docs/CONTENT.md`.
- Recruiters can find name, role, location, education, projects, and every contact link in the first screen and a half.

## Features

- Dark and light themes, each designed separately. Follows the operating system until the visitor chooses. The switch opens as a circle from the control where the browser supports view transitions.
- Section index on the right edge (desktop) and a compact bottom bar (mobile), with a scroll progress line.
- Project exhibition: minimal rows that expand on click or tap. Hover and keyboard focus preview the stack.
- SEVEN case study with a pinned scroll sequence that walks through the six stages of a request. On narrow screens or with reduced motion it becomes a plain stacked list.
- Reduced motion respected everywhere. All content is readable without JavaScript.
- Downloadable résumé, Open Graph image, sitemap, robots, structured data, 404 and error pages.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js (App Router), React, TypeScript | Static rendering, metadata API, Vercel-native |
| Motion | GSAP with ScrollTrigger | Pinned sequences and scrubbed timelines are the hard part, and GSAP handles them reliably |
| Styling | Plain CSS with custom properties | Full control, no runtime, no extra dependency |
| Fonts | Newsreader, Instrument Sans, JetBrains Mono via `next/font` | Self-hosted at build, no layout shift |
| Hosting | Vercel | Zero-config for Next.js |

Runtime dependencies: `next`, `react`, `react-dom`, `gsap`. Nothing else.

## Local setup

Requirements: Node.js 20.9 or newer, Git. npm is the recommended package manager here because it ships with Node and Vercel supports it with no configuration.

```bash
node -v            # must print v20.9.0 or newer
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Commands

```bash
npm run dev         # development server
npm run typecheck   # TypeScript, no emit
npm run lint        # ESLint (Next.js core-web-vitals and TypeScript rules)
npm run build       # production build
npm run start       # serve the production build locally
npm run format      # Prettier
```

Run `typecheck`, `lint` and `build` before every push.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes for production | Public URL, used for the canonical link, Open Graph, sitemap and robots. Defaults to `https://manikanta-cheruku.vercel.app`. Set it to the real domain. |

## Project structure

```text
app/                 layout, page, error and 404, sitemap, robots, icon, Open Graph image
components/
  navigation/        TopBar, ThemeToggle, SideIndex
  hero/              Hero, Timecode
  sections/          one file per scene, plus ProjectRow and QuestionList
  motion/            PageMotion (global reveals), SplitWords
  ui/                Flow, ExternalLink
data/                all copy and facts: site, projects, seven, skills, content
hooks/               useMotion, useActiveSection
lib/                 gsap registration
styles/              tokens, base, chrome, sections
docs/                architecture, design, animation, performance, accessibility, deployment, content
public/resume/       the résumé PDF that the download links serve
```

## Customization

- Change any wording or fact in `data/`. Components contain structure only.
- Add a project by appending to `data/projects.ts`. It appears in the exhibition automatically.
- Change colors and type sizes in `styles/tokens.css`. Both themes live there.
- Replace the résumé by overwriting `public/resume/Manikanta-Cheruku-Resume.pdf` with the same filename.
- Hide the phone number by setting `phone.show` to `false` in `data/site.ts`.

## Browser support

Current Chrome, Edge, Firefox and Safari, on desktop and mobile. The circular theme transition needs the View Transitions API and falls back to an instant switch elsewhere. Layout uses `svh` units with a `vh` fallback for older mobile browsers.

## Performance, accessibility, deployment

See `docs/PERFORMANCE.md`, `docs/ACCESSIBILITY.md` and `docs/DEPLOYMENT.md`. No screenshots or Lighthouse scores are included yet because they have to come from a real build. `docs/PERFORMANCE.md` says how to produce them.
