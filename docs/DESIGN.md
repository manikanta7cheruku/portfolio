# Design

Direction: cinematic editorial technology. A film title sequence, a technical journal, and a quiet product site.

## Design plan and the revision made to it

The first plan used a warm near-black, a soft paper white, a serif for statements and a terracotta accent. Reviewing it against the brief, two things read as defaults and were changed:

1. The terracotta or vermilion accent on near-black is the most common accent choice in generated design. It was replaced with a muted verdigris, which sits well against both warm neutrals and reads as technical without being neon.
2. Numbered eyebrows above every heading were removed. Numbers now appear only in the section index, where the content really is a sequence.

The boldness is spent in two places: the opening, and the pinned SEVEN sequence. Everything else stays quiet.

## Color

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `--bg` | `#0d0c0b` | `#ece7dc` | page |
| `--bg-2` | `#151412` | `#e3ddcf` | raised areas, menus, film frame |
| `--fg` | `#ebe6db` | `#181613` | primary text |
| `--fg-2` | `#a39d92` | `#574f45` | secondary text |
| `--line` | 13% of fg | 16% of fg | hairlines |
| `--line-strong` | 26% of fg | 32% of fg | borders, rules |
| `--accent` | `#7fb8a8` | `#1d6558` | state, focus, one dot per idea |

The accent never fills large areas and never glows. Secondary text was chosen to keep roughly 6:1 contrast or better against the page in both themes. Verify with a tool before launch (see `ACCESSIBILITY.md`).

A static film-grain layer sits over the page at 6 to 8 percent opacity.

## Typography

- Newsreader (serif): the name, section statements, project names, quiet italics. It has an optical size axis, so large sizes look refined and small ones stay sturdy.
- Instrument Sans: body and interface text.
- JetBrains Mono: technical metadata only (stack tags, status, the timecode).

Scale (fluid with `clamp()`): display up to 11.5rem, section statements up to 4.6rem, subheads up to 2.3rem, body 1 to 1.125rem, metadata 0.78rem. Line length stays under about 60 characters. Labels are sentence case. There are no all-caps eyebrows.

## Spacing and layout

Sections use `clamp(5rem, 12vw, 10rem)` of vertical space. Content sits in a 96rem container with a fluid gutter. On wide screens 6.5rem of extra right padding keeps content clear of the section index. Text is left aligned throughout. Structure is drawn with hairlines, not boxes or cards.

## Interaction principles

1. Motion answers a person's action or marks one important moment.
2. Hover and focus give the same response. Touch uses tap.
3. Nothing important lives only in a hover state.
4. Restraint: no glow, no tilt, no cursor follower.

## Themes

Dark and light are separate designs, not inversions. Light is warm paper and ink. Both share the same accent role with different values chosen for contrast. The theme is stored in `localStorage`, set before first paint, and follows the operating system until the visitor chooses.
