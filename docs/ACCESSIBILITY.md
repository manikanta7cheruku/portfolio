# Accessibility

## Implemented

- Semantic structure: one `h1`, `h2` per scene, `h3` and `h4` beneath, landmarks for header, nav, main and footer.
- Skip link to the main content.
- Visible focus ring on every interactive element, in the accent color.
- All expanding panels are real buttons with `aria-expanded` and `aria-controls`. Closed panels are `inert`, so hidden links cannot be tabbed to.
- The section index is a `nav` with a labelled list and `aria-current="location"` on the active item. On mobile its toggle reports `aria-expanded` and closes on Escape.
- The theme control is a button whose label states the current theme and the action.
- External links announce that they open in a new tab.
- No hover-only information. Hover previews on project rows are duplicated by keyboard focus, and the full content is one click or tap away.
- Reduced motion: nothing is hidden, nothing pinned, transitions collapse.
- Touch targets are at least 44px tall for controls.
- Animated headings keep real spaces between words, so screen readers read them normally. The hero name has an `aria-label` and its decorative split is hidden from assistive technology.
- The SEVEN pinned sequence keeps every stage in the reading order, even when only one is visible. Screen reader users get all six stages in order.
- Text sizes are in `rem`, so browser text scaling works.

## Not yet verified

- Contrast ratios were chosen by calculation, not measured with a tool. Check them with a contrast checker in both themes.
- No screen reader pass (NVDA, VoiceOver) has been done.
- Keyboard walkthrough of the pinned sequence at 200 percent zoom has not been done.

## Manual test script

1. Tab through the whole page with no mouse. Every control must be reachable, visible and operable with Enter or Space.
2. Turn on reduced motion in the operating system and reload. All text must be visible immediately.
3. Zoom to 200 percent and to a 320px viewport. No horizontal scrolling, no clipped text.
4. Run Lighthouse Accessibility and axe DevTools.
