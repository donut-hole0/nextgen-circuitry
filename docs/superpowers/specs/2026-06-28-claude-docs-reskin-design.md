# NextGen Circuitry — "Claude docs" Reskin

**Date:** 2026-06-28
**Status:** Approved (pending user spec review)

## Goal

Completely change the look of the NextGen Circuitry site to feel like the Claude
docs site (`platform.claude.com/docs/en/home`): clean, light, warm, calm, and
card-driven — while keeping the existing content, copy, and SvelteKit structure.

This is a **visual + layout overhaul**, not a content rewrite. All current copy
(hero text, "what kids build," "how it works," mission quote, about/programs/
support/contact content) is preserved. URLs, routes, config, and external links
(signup form, GoFundMe, email) are unchanged.

## Decisions (locked with user)

1. **Direction: Hybrid.** Claude-docs aesthetic everywhere. Marketing-style hero
   on the home page; docs-style sidebar layout on content-heavy inner pages.
2. **Palette: green-on-cream + dark toggle.** Borrow Claude's structure,
   typography, whitespace, and calm — but use the brand green (from the logo) as
   the accent instead of Claude's coral. Light (ivory) is the default; a
   dark-mode toggle mirrors Claude's.
3. **Motion: calm and minimal.** Remove the animated circuit canvas and the
   heavy GSAP line-reveals. Use gentle fade/rise on scroll. Keep Lenis smooth
   scroll, subtle.

## Design System (rewrite of `src/app.css`)

Theming via CSS custom properties on `:root` (light) and `[data-theme="dark"]`.

**Light (default):**
- Background: warm ivory `#f7f6f1`; raised surface / cards `#ffffff`.
- Text: warm near-black `#1f1d1a`; muted `#6b675f`.
- Accent (green): `#0f9d77` (AA-contrast green for cream); accent-strong `#0c7d5e`.
- Borders: hairline `rgba(30,28,24,0.10)`.

**Dark (toggle):**
- Background: warm dark `#1a1814` (not the old near-black navy); surface `#232019`.
- Text: `#ece7dd`; muted `#a8a092`.
- Accent (green): brighter `#2fd39e` (the logo green glows here).
- Borders: `rgba(255,255,255,0.10)`.

**Typography:**
- Body: Inter (humanist sans) — calm, readable.
- Headings: a warm serif for display/marketing headings (hero, section titles)
  for personality; clean sans for docs-page body headings.
- Labels / eyebrows / kickers / code: keep a monospace (Space Mono) — nods to the
  circuitry/code theme and mirrors Claude's code styling.

**Tokens kept/renamed:** replace teal-specific vars (`--teal*`, `--navy*`) with
semantic vars (`--bg`, `--surface`, `--text`, `--muted`, `--accent`,
`--accent-strong`, `--border`). Radius softened to ~12px. Drop film grain and the
heavy ambient teal glow-field; replace with a very subtle warm tint if needed.

**Theme toggle behavior:** sun/moon button in the top nav. Reads
`localStorage('theme')` then `prefers-color-scheme`; sets `data-theme` on
`<html>`; persists choice. Inline script in `app.html` sets the attribute before
first paint to avoid a flash.

## Components

- **`Nav.svelte` (rewrite):** light/cream top bar, hairline bottom border (not the
  dark blur bar). Logo left (needs a dark-text variant of the wordmark for cream —
  see Logo note). Slim text links, a green "Support us" pill CTA, and the new
  **theme toggle**. Mobile: same burger menu, restyled.
- **`Sidebar.svelte` (new):** left nav tree for inner/docs pages. Section groups +
  links, active-state highlight. Collapses to a top drawer on mobile.
- **`OnThisPage.svelte` (new, optional per page):** right-rail "on this page" TOC
  that anchors to `<h2>`/`<h3>` headings; hidden on narrow screens.
- **`ThemeToggle.svelte` (new):** the toggle button + logic above.
- **`CircuitCanvas.svelte`:** removed from use (delete or leave unused —
  recommend delete to avoid dead code, per surgical-changes).
- **`motion.js` (trim):** keep `initSmoothScroll`/`scrollTo` and a single gentle
  `reveal` (fade+rise). Remove `linesUp`, `introLines`, `magnetic`, `spotlight`,
  `parallax`, `countUp` and their usages. Stat numbers render statically.

## Page Layouts

- **`+layout.svelte`:** light page shell, `bg-field`/`grain` removed. Footer
  reskinned to cream/light with hairline dividers and green section heads. The
  footer CTA glow becomes a calm green-tinted panel.
- **Home (`/`):** marketing hero (eyebrow + serif headline + lead + CTAs + 3
  static stats) on cream, no canvas. Below: a **Claude-home-style card grid**
  for "what kids build" (replaces bento), a clean "how it works" 3-step section,
  and the mission quote as a calm centered block. Gentle reveal on scroll.
- **About / Programs / Support (docs pages):** two/three-column docs shell —
  `Sidebar` (left) + content column + `OnThisPage` (right, where the page has
  enough headings). Content reflowed into clean docs typography and cards.
- **Contact (`/contact`):** simple centered card with the form/email; no sidebar.

## Logo handling

The PNG wordmark is light-on-transparent and disappears on cream. Approach:
render the brand in the nav as the **green brain icon + live dark text** ("NextGen
Circuitry") in light mode, and swap to the existing light PNG (or light text) in
dark mode. Footer uses the same treatment. The stray default-Svelte
`src/lib/assets/favicon.svg` is unused and will be deleted; the real favicons in
`static/` stay as-is.

## Non-goals

- No content/copy rewrite.
- No new pages or routes.
- No backend, CMS, or search index (the "search" affordance, if shown, is visual
  only unless a later phase adds it — out of scope here).
- No change to config, external links, or deployment (Cloudflare/Wrangler).

## Success Criteria

1. `npm run dev` builds and serves with no console errors.
2. All 5 pages render in the new light theme; dark toggle works and persists with
   no flash on reload.
3. No teal/navy values remain in shipped CSS; no references to removed motion
   helpers or `CircuitCanvas`.
4. Layout is responsive (sidebar collapses, grids stack) at mobile widths.
5. Content/copy and all external links are unchanged and functional.
