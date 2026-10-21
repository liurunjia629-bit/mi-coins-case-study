# Single-page case study

All eight chapters are built on initial page load and stay in one document:

1. `#research` — project background, audience and secondary market research.
2. `#ux-audit` — current page audit, three findings and business connections.
3. `#strategy` — core strategy and Value / Action / Progress.
4. `#exploration` — original A/B low-fidelity exploration and comparisons.
5. `#visual-redesign` — original/updated visual comparison and rationale.
6. `#final-design` — designer-created A/B PNGs, comparison and Figma file link.
7. `#prototype` — existing mobile web prototype, with unchanged product code.
8. `#validation` — validation plan, design summary, references and AI disclosure.

`case-study.js` composes the existing DOM once, replaces route visibility switching with anchor navigation, and observes chapter positions for the active navigation item. Anchor navigation never recreates an iframe. Legacy hashes including `#audit`, `#wireframes`, `#design` and `#visual-rationale` remain supported through aliases.

Desktop navigation is 72px high. At narrower widths, the brand and print button stay on the first row and the eight anchors become a horizontally scrollable second row. Header height is measured to provide the correct anchor offset.

Print CSS includes every chapter, unhides all research content, retains full A/B source images, and replaces scrolling prototype windows with representative static images. Low-fidelity print images reuse the previously captured A/B exports. Print image sizing preserves aspect ratio and avoids clipping long screens.

## Verification

- Eight chapter IDs are unique, ordered and simultaneously visible on first load.
- A/B final design is followed directly by the interactive demonstration.
- `#prototype` remains positioned correctly after refresh.
- Selecting the 20-ruble reward, navigating to Research and back preserves the chosen goal.
- PUBG task sheet still opens. Product prototype JS, CSS and shared model, plus A1/B1 PNGs, match the previous delivery archive byte-for-byte.
- 375px viewport: no horizontal document overflow; all eight mobile anchors remain available; the active chapter title clears the measured sticky header.
- Print stylesheet and all static image sources are present. A native print request was exercised, but an actual saved PDF has not been independently rendered and checked in this session.

## Changed files

- `index.html`: removes the old research-only scroll handler and loads single-page assets.
- `wireframes/exploration.js`: removes hash-based page hiding and makes handoff initialization tolerant of moved elements.
- `design/showcase.js`: removes page replacement routing; keeps prototype interactions unchanged.
- `design/rationale.js`: delegates deep-link positioning to the shared navigation.
- `case-study.js`: chapter assembly, anchors, scroll state and print representation.
- `case-study.css`, `case-study-print.css`: sticky responsive navigation and continuous/print layout.
- `assets/wireframe-a.jpg`, `assets/wireframe-b.jpg`: copies of existing low-fidelity exports for printing.
