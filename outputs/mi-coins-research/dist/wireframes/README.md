# Mi Coins low-fidelity exploration

Entry: `../index.html#wireframes`. Standalone pages: `a.html`, `b.html`.

- A: reward-first, integrated empty/selected reward goal, then all tasks.
- B: compact hero, current task progress, status-ordered tasks, rewards, goal.
- Prototype viewport: 392 × 871 CSS px. Complete pages scroll vertically.
- English and draft Russian copy are available in the comparison view.
- Both prototypes use 8,253 coins and the screenshot's thresholds: 30,000 / 8,000 / 200. A 3,000 ₽ face value does not mean 3,000 coins.
- MONOPOLY GO! reward is unverified because the source is cropped. Completed mapping and interactions are prototype assumptions. No real crediting, history records or redemption submission is simulated.

## Designer-created high-fidelity handoff

Edit only `handoff-config.js` after receiving the designer's finished work:

```js
window.MI_COINS_HANDOFF = {
  images: [
    { src: 'assets/designer-final-a.png', alt: 'Designer-created final Mi Coins UI' }
  ],
  figmaFileUrl: 'https://www.figma.com/design/...',
  figmaPrototypeUrl: 'https://www.figma.com/proto/...'
};
```

Copy the designer-supplied, unchanged PNG exports into `../assets/`. Images are rendered without visual filters or transformations. Figma URLs must be HTTPS links on figma.com. Empty configuration leaves clear placeholders and an unavailable link; it does not invent a high-fidelity screen.

Do not recolor these wireframes as final UI. Do not regenerate, retouch or replace the designer's exported visuals. Preserve both wireframe comparison and existing UX research.
