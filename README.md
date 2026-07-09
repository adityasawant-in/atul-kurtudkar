# Atul Kudtarkar & Associates — Website

A premium, cinematic marketing site for a structural engineering consultancy
in Badlapur, Maharashtra — built with React 19, Three.js/React Three Fiber,
GSAP and Framer Motion.

Production-ready as of Phase 5. See [Project History](#project-history)
below for what each build phase covered.

---

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

### Production build

```bash
npm run build      # outputs to dist/, then copies index.html -> 404.html
npm run preview    # serve the production build locally
npm run lint        # oxlint over src/
```

---

## Project overview

| | |
|---|---|
| **Framework** | React 19 + Vite (rolldown-vite) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `src/styles/tokens.css`) |
| **3D** | Three.js + React Three Fiber + drei, `@react-three/postprocessing` (bloom/DoF, desktop-only, code-split) |
| **Animation** | GSAP + ScrollTrigger, Framer Motion, Lenis smooth scroll |
| **Routing** | React Router (`/` and a real 404 catch-all) |
| **Icons** | lucide-react |

### Folder guide

```
src/
  components/ui/        Button, MagneticButton — generic interactive primitives
  components/shared/     SectionHeading, GlassPanel, Divider, BlueprintBackdrop,
                          AmbientParticles, SectionSeam, Logo, NoiseOverlay,
                          Vignette, ScrollProgressBar, CursorGlow, SkipToContent,
                          ErrorBoundary — reusable across every section
  layout/                Navbar/, Footer/, Loader/, PageWrapper.jsx (mounts
                          Lenis + smooth-anchor scrolling)
  sections/home/          one file per homepage section, composed in pages/Home.jsx
  pages/                  Home.jsx, NotFound.jsx
  router/                 AppRouter.jsx
  three/canvas/           SceneCanvas.jsx (shared Canvas wrapper), PostFX.jsx
                          (lazy-loaded bloom/depth-of-field stack)
  three/objects/          Building.jsx, Crane.jsx
  three/environment/      Lights.jsx, Skyline.jsx, Clouds.jsx, Particles.jsx,
                          BlueprintGrid.jsx
  animations/gsap/        timelines/, scrollTriggers/
  animations/framer/      variants/index.js — shared Framer Motion variants
  animations/three/       cameraRigs/buildingCameraRig.js
  animations/lenis/       smoothScroll.js — the single Lenis instance,
                          synced to GSAP ScrollTrigger
  hooks/                  useLenis, useSmoothAnchors, useScrollProgress,
                          useReducedMotion, useMediaQuery, useInView, useTilt,
                          useCountUp, useContactForm
  constants/              animationConfig.js (EASE, DURATION,
                          CONSTRUCTION_STAGES, NAV), breakpoints.js
  data/                   services.js, projects.js, process.js, stats.js,
                          whyChooseUs.js, testimonials.js
  utils/                  cn.js, lerp.js, clamp.js (mapRange)
```

**Core pattern**: expensive per-frame state (scroll progress driving the
pinned building-construction scene) lives in a ref and is read inside
`useFrame`/GSAP callbacks — never pushed into `setState` every frame. React
state is reserved for discrete, low-frequency changes (which named
construction "stage" is active, a percentage readout rounded once per
integer change, etc).

---

## Environment variables

Copy `.env.example` to `.env.local` (git-ignored) if you want the contact
form to hit a real backend:

```bash
cp .env.example .env.local
```

```
VITE_CONTACT_FORM_ENDPOINT=https://your-endpoint.example.com/submit
```

Leave it unset and the form runs a mocked success flow — useful for
demos/reviews before a backend exists. The form POSTs
`{ name, email, phone, message }` as JSON.

---

## Deployment

The app is a client-side-routed SPA, so any host needs to be told to serve
`index.html` for unmatched paths. Configs for all three common targets are
already included:

### Vercel
`vercel.json` is preconfigured with a catch-all rewrite. Connect the repo
in the Vercel dashboard (framework preset: Vite) — no further config
needed. Set `VITE_CONTACT_FORM_ENDPOINT` under Project → Settings →
Environment Variables if using a real backend.

### Netlify
`public/_redirects` (→ copied into `dist/` on build) handles the SPA
fallback. Build command: `npm run build`, publish directory: `dist`.

### GitHub Pages
GitHub Pages has no server-side rewrite support, so `npm run build` also
runs a `postbuild` step that copies `dist/index.html` to `dist/404.html` —
GitHub Pages serves that on any unmatched path, and the app's own router
then renders the real "Page Not Found" screen (or the correct route, for
valid deep links). Deploy the `dist/` folder via `gh-pages` or the
`actions/deploy-pages` GitHub Action. If hosting under a subpath
(`username.github.io/repo-name`), add `base: '/repo-name/'` to
`vite.config.js`.

---

## Pre-launch checklist

A few things are intentionally left as placeholders and should be swapped
before going live:

- [ ] **`og-image.jpg`** — referenced in `index.html`'s Open Graph/Twitter
      tags but not included (needs real photography/renders). Add a
      1200×630 image at `public/og-image.jpg`.
- [ ] **Phone / email** (`+91 98765 43210`, `info@atulkudtarkar.com`) in
      `Contact.jsx` and `Footer.jsx` — replace with real contact details.
- [ ] **`VITE_CONTACT_FORM_ENDPOINT`** — point at a real form backend (see
      above) before launch; otherwise the form only simulates success.
- [ ] **Canonical domain** — `index.html`'s canonical/OG URLs and
      `public/sitemap.xml`/`public/robots.txt` all currently point at
      `https://www.atulkudtarkar.com/`; update if the real domain differs.
- [ ] **Featured Project imagery** — `FeaturedProject.jsx` uses an
      SVG/gradient placeholder in place of real photography; swap the
      `<div>` background for an `<img>`/`next-gen` image once available.
- [ ] **`apple-touch-icon`** currently points at the SVG favicon as a
      fallback — iOS home-screen icons render best from a dedicated
      180×180 PNG; add `public/apple-touch-icon.png` and update the
      `<link>` in `index.html` once brand assets are finalized.
- [ ] Run Lighthouse against the deployed build (see below) and re-check
      Core Web Vitals once real images/fonts are in place — placeholder
      SVG content scores differently than final photography-heavy pages.

---

## Project history

- **Phase 1** — architecture, design system and animation/3D plans (no code).
- **Phase 2** — floating navigation, hero, and the pinned scroll-driven
  building-construction experience.
- **Phase 3** — remaining homepage sections (Company Overview, Services,
  Featured Project, Engineering Process, Statistics, Why Choose Us,
  Testimonials, Contact) and the footer.
- **Phase 4** — cinematic/visual polish: postprocessing (bloom + depth of
  field), damped drone-style camera, ambient page-wide effects (noise,
  vignette, cursor glow, scroll progress), glass reflection refinement,
  spacing/typography rhythm.
- **Phase 5** (this phase) — production hardening: routing + real 404,
  error boundary, full SEO (meta/OG/Twitter/JSON-LD/sitemap/manifest),
  code-split below-the-fold sections and postprocessing, mobile particle-
  count tuning, a validated contact form (loading/success/error states +
  honeypot spam protection), smooth in-page anchor scrolling, accessibility
  pass (skip link, landmark, focus states, ARIA on form errors), and
  deployment configs for Vercel/Netlify/GitHub Pages.

---

## Known trade-offs

Documented here rather than hidden, in the spirit of an honest handover:

- The `three` vendor chunk (Three.js + R3F + drei) is ~890KB
  pre-compression / ~238KB gzipped, and loads eagerly because the hero's 3D
  scene is above the fold on first paint — there's no way to defer it
  without delaying the hero itself. Bloom/depth-of-field (`PostFX`) *is*
  code-split and desktop-only, which is the more impactful of the two.
- The construction scene's 8 floor-level `pointLight`s are simple and
  readable but not the most GPU-efficient way to fake window glow at scale;
  fine at this building's scale, worth revisiting (e.g. a single emissive
  texture atlas) if the geometry ever grows significantly more complex.
- Lighthouse targets in the brief (95+/100/100/100) are a strong
  *structural* fit for this build (code-split, semantic HTML, full meta/
  structured data, reduced-motion support, no layout-shift-prone patterns),
  but actual scores depend on the hosting environment, real images
  (`og-image.jpg`, project photography) and the deployed domain — run
  Lighthouse against the live deployment to confirm, not against this repo.
