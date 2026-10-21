# Mi Coins — designer-created UI / AI-assisted implementation

## Entries

- `../index.html#design`: unmodified A1/B1 exports, A/B trade-offs, validation plan, design credits and Figma file link.
- `../index.html#prototype`: switchable 392 × 871 web demonstration.
- `a.html`, `b.html`: independent long mobile pages.
- `../index.html#audit`, `../index.html#wireframes`: preserved research and low-fidelity exploration.

Run the existing project preview server from the workspace root: `node work/preview-server.cjs`, then open `http://127.0.0.1:4173/index.html#design`. Files are buildless and use relative asset paths.

## Sources and fidelity

A1.png (1568 × 3968) and B1.png (1568 × 4592) are copied without visual modification from the designer's exports. They are the visual reference. Figma frames 7:3 and 41:319 supplied layout measurements and original image/SVG assets. The exported PNGs contain updated labels compared with the retrieved Figma context; visible labels follow the PNGs. HTML prototypes use genuine components and original assets, not screenshot hotspots.

Figma source: https://www.figma.com/design/7AOi6exOBVyEeFMpdWoTbG/Mi-Coins?node-id=0-1

Inter 400/500/600/700 fonts are local Google Fonts assets. Original reward assets, coin/background art and game sprite crops are local Figma assets. No replacement artwork or AI-generated high-fidelity UI is used.

## State and boundaries

`model.js` is the shared business data and calculation layer. Balance begins at 8,253. Rewards cost 8,000 / 30,000 / 200 coins. A initially shows the 30,000 goal to match A1; B initially has no selected goal to match B1. Goals are per view, while simulated balance and PUBG completion are shared using localStorage when available. Completion credits +100 once; a reset is available through the information button.

History, other task actions and redemption show explicit demo explanations. No transactions, downloads, activations, invented detailed rules or backend calls occur. Full eligibility and inventory are not verified. The designer's original visible “No Started” and “Download and Active” labels are retained; dialogs use explanatory task wording.

A live Figma **prototype** share URL has not been supplied. The real design-file link works; no unrelated or guessed prototype is embedded. To add one later, set `figmaPrototypeUrl` in `../wireframes/handoff-config.js`. The clickable web prototype already works independently.

## Verification

- Original research `<main>` SHA-256 remains `a771902c689ff248cd6e854329bd8717b5671a9e5d37be1ea98c0166fdf80994`.
- Calculation checks cover 21,747 initial shortfall, 21,647 after completion, redeemable 8,000/200 rewards, progress capped at 100%, and idempotent crediting.
- Browser checks cover goal sheet selection/closing, PUBG sheet, completion, A/B shared balance, reset, embedded and standalone views, image/font loading, and narrow viewport sizing.
- Usability and conversion research is a future validation plan; no real tests or experiment results are claimed.
