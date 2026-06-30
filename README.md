# Bean & Leaf — concept website

A premium concept site for **Bean & Leaf Coffee House**, the independent,
family-run speciality coffee and tea house on Hertford Street, Coventry.

Built as a sales prototype: React + Vite + Framer Motion, with a Spline 3D
hero cup. Design direction — Apple × Aesop × Blue Bottle × Linear: white-led,
warm neutrals, espresso ink, and one signature botanical-sage accent (the
"Leaf"), so it never reads as a generic all-brown coffee site.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → /dist
npm run preview  # preview the production build
```

Node 18+ recommended.

---

## Add the Spline cup (1 step)

The hero ships with a polished **animated fallback cup**, so it looks finished
out of the box. To drop in your 3D scene:

1. Open `src/data/config.js`
2. Paste your scene URL between the quotes:

   ```js
   export const SPLINE_SCENE_URL = 'https://prod.spline.design/XXXX/scene.splinecode';
   ```

That's it. The cup is integrated as a real React component (`@splinetool/react-spline`),
**not an iframe**, and is lazy-loaded so its heavy runtime never blocks first
paint — it only downloads once a scene URL is set. It inherits the same gentle
float, pointer-aware tilt and ground shadow as the fallback.

> Tip: in Spline, give the cup a transparent background and a soft top-down
> key light so it sits cleanly between the BEAN / LEAF wordmark.

---

## Where the content lives

All copy and data is in **`src/data/content.js`** — a single source of truth.
Everything there is drawn from Bean & Leaf's real public presence (their own
site/about copy, Instagram, independent reviews, the Good Food Awards,
Companies House). A few values are marked `// CONFIRM` — confirm these with the
owners before launch:

- Exact menu prices
- The current house + guest roasters (these rotate monthly)
- Review quotes — currently paraphrased sentiment; replace with attributed,
  permissioned quotes (or pull live from a Google reviews widget)

## Images

The gallery and OG image are intentionally left for **real photography** — the
café's own Instagram shots are the strongest possible assets. Drop them into
`/public/` and wire them into a gallery section; the layout and type are ready
for them.

---

## Structure

```
src/
  components/      reusable building blocks
    Hero.jsx         the BEAN · cup · LEAF lockup + scroll handoff
    CupStage.jsx     Spline integration + animated fallback cup
    Navbar.jsx       fixed nav + mobile sheet
    Reveal.jsx       the single motion primitive (reveal + stagger)
    SectionHead.jsx  eyebrow + display heading
    Marks.jsx        hand-rolled SVG marks (no icon library)
  sections/        one file per page section
  data/
    content.js       all real content
    config.js        ← your Spline URL
  hooks/
    usePointerParallax.js
  styles/          design tokens + globals
```

## Design system

Tokens live in `src/styles/global.css`:

- **Colour** — `--paper` warm white, `--espresso` ink, `--leaf` botanical sage
  (the signature), `--latte` / `--crema` warm neutrals.
- **Type** — Fraunces (display), Hanken Grotesk (body), Space Mono (spec/data
  labels). Loaded in `index.html`.
- **Motion** — one easing curve, opacity + small translation only. No bounce,
  no overshoot. `prefers-reduced-motion` fully respected.

## Quality floor

Responsive to mobile (the mobile hero is composed, not shrunk), visible
keyboard focus, a skip link, reduced-motion support, and lazy-loaded
below-the-fold sections for fast first paint.
