# NextGen Circuitry "Claude docs" Reskin — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the NextGen Circuitry SvelteKit site to feel like the Claude docs site — clean, light (cream/ivory), calm, card-driven — with the brand green as accent and a working light/dark toggle, keeping all existing copy and routes.

**Architecture:** Rewrite `src/app.css` as a semantic, theme-aware design system (CSS custom properties on `:root` and `[data-theme="dark"]`). A tiny `theme.js` + inline `app.html` script handle no-flash theming; a `ThemeToggle` lives in a rewritten light `Nav`. A hybrid layout: marketing hero + card grid on home; a docs shell (`Sidebar` + content + `OnThisPage`) on About/Programs/Support; a centered card on Contact. Motion is trimmed to a single gentle `reveal` + subtle Lenis smooth scroll.

**Tech Stack:** SvelteKit 2 / Svelte 5 (runes), Vite 8, GSAP (ScrollTrigger) + Lenis (trimmed), Cloudflare adapter. No test runner exists and none is added (YAGNI for a visual reskin).

## Global Constraints

- **No content/copy rewrite.** Preserve all existing text verbatim (hero, "what kids build", "how it works", mission quote, About values + closing, Programs list, Support tiers + CTA, Contact form + info). Apostrophes/entities as in source.
- **No route/config/link changes.** `src/lib/config.js` (CONTACT_EMAIL, DONATE_URL, SIGNUP_FORM_URL, ORG) and all external links unchanged. Routes stay `/`, `/about`, `/programs`, `/support`, `/contact`.
- **Light is default**; dark via `data-theme="dark"` on `<html>`, persisted in `localStorage('theme')`, no flash on load.
- **No teal/navy literals** (`--teal*`, `--navy*`, raw `#00e5b0`, `#05080f`, etc.) anywhere in shipped code after the reskin. Only the new semantic tokens.
- **Fonts:** body `Inter`; headings/display `Source Serif 4`; labels/eyebrows/kickers/mono `Space Mono`.
- **Accessibility:** respect `prefers-reduced-motion` (no transforms, instant reveal). Maintain visible focus rings.
- **Verification model:** there are no unit tests. Each task is verified by (a) `npm run build` succeeding and (b) the Claude Preview tools (dev server → snapshot/screenshot/console). "Test" steps below mean these checks.

## Design Tokens (authoritative — use these exact values in Task 1)

Light (`:root`):
```
--bg:#f7f6f1; --bg-subtle:#efeee7; --surface:#ffffff; --surface-2:#faf9f5;
--text:#1f1d1a; --text-strong:#14120f; --muted:#6b675f; --muted-dim:#908b81;
--accent:#0f9d77; --accent-strong:#0c7d5e; --accent-soft:#e3f3ec;
--border:rgba(31,29,26,0.10); --border-strong:rgba(31,29,26,0.16);
--ring:rgba(15,157,119,0.30);
--shadow-card:0 1px 2px rgba(31,29,26,0.04), 0 12px 28px -20px rgba(31,29,26,0.22);
```
Dark (`[data-theme="dark"]`):
```
--bg:#1a1814; --bg-subtle:#211e19; --surface:#232019; --surface-2:#2a2620;
--text:#ece7dd; --text-strong:#fbf8f1; --muted:#a8a092; --muted-dim:#7d766a;
--accent:#2fd39e; --accent-strong:#5fe0b5; --accent-soft:rgba(47,211,158,0.12);
--border:rgba(255,255,255,0.10); --border-strong:rgba(255,255,255,0.16);
--ring:rgba(47,211,158,0.32);
--shadow-card:0 1px 2px rgba(0,0,0,0.25), 0 16px 36px -22px rgba(0,0,0,0.6);
```
Shared:
```
--font-body:'Inter',system-ui,sans-serif; --font-head:'Source Serif 4',Georgia,serif;
--font-mono:'Space Mono',ui-monospace,monospace;
--radius:14px; --radius-sm:10px; --radius-lg:22px;
--ease:cubic-bezier(0.16,1,0.3,1); --maxw:1180px; --content-w:760px; --nav-h:64px;
```

---

### Task 1: Design-system foundation (tokens, fonts, base, theming infra)

**Files:**
- Modify: `src/app.css` (full rewrite)
- Modify: `src/app.html` (add no-flash theme script in `<head>` + font preconnect)
- Create: `src/lib/theme.js`
- Create: `src/lib/components/ThemeToggle.svelte`

**Interfaces:**
- Produces: `theme.js` exports `getTheme(): 'light'|'dark'`, `setTheme(t)`, `toggleTheme(): 'light'|'dark'`, `initThemeStore()` returning a Svelte-readable `{ subscribe }` store named `theme`.
- Produces global CSS classes consumed by every later task: `.btn-primary`, `.btn-secondary`, `.card`, `.eyebrow`, `.kicker`, `.section-label`, `.display`, `.h2`, `.h3`, `.accent`, `.section-wrap`, `.reveal-base`.

- [ ] **Step 1: Rewrite `src/app.css`**

Replace the entire file with the new design system. Include, in order: Google Fonts `@import` for `Inter:wght@300;400;500;600;700`, `Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700`, `Space+Mono:wght@400;700`; reset; `:root` light tokens + `[data-theme="dark"]` dark tokens + shared tokens (exact values from "Design Tokens" above); `html,body` using `--bg`/`--text`/`--font-body` with `color-scheme` set per theme; smooth `background-color`/`color` transition (0.3s) on `body`; heading defaults (`h1..h4` → `--font-head`, weight 600, `letter-spacing:-0.02em`, color `--text-strong`); `a{color:inherit;text-decoration:none}`; `::selection{background:var(--accent-soft)}`; `.display` (`font-size:clamp(2.6rem,7vw,5rem);line-height:1.04`), `.h2` (`clamp(1.8rem,4vw,2.8rem)`), `.h3`; `.accent{color:var(--accent)}`; `.eyebrow` (mono, accent text, `--accent-soft` bg, `--border` ring, pill); `.section-label`/`.kicker` (mono, uppercase, accent, letter-spacing); `.btn-primary` (bg `--accent`, text `#fff`, radius `--radius-sm`, padding `12px 22px`, hover `--accent-strong`), `.btn-secondary` (bg `--surface`, `1px solid var(--border-strong)`, text `--text`, hover border `--accent`), shared `.btn-arrow` translate-on-hover; `.card` (bg `--surface`, `1px solid var(--border)`, `--radius`, `--shadow-card`, hover `border-color:var(--accent)` + slight lift `translateY(-2px)`, transition); `.section-wrap{max-width:var(--maxw);margin:0 auto;padding:6rem 1.5rem}`; focus-visible ring `outline:2px solid var(--ring);outline-offset:2px`; `.reveal-base{opacity:0}` only when JS/motion enabled (see Task 3 note — keep it but the action sets opacity); `@media (prefers-reduced-motion:reduce)` zeroes animations. Remove `.bg-field`, `.grain`, `.line/.ln` line-mask helpers, `--teal*`, `--navy*`.

Use the token blocks verbatim. Keep the file focused — no per-page styles here.

- [ ] **Step 2: Add no-flash theme script + font preconnect to `src/app.html`**

In `<head>`, before `%sveltekit.head%`, add preconnect and the blocking theme script:
```html
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<script>
			(function () {
				try {
					var t = localStorage.getItem('theme');
					if (t !== 'light' && t !== 'dark') {
						t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
					}
					document.documentElement.setAttribute('data-theme', t);
				} catch (e) {}
			})();
		</script>
```

- [ ] **Step 3: Create `src/lib/theme.js`**

```js
import { readable } from 'svelte/store';

const KEY = 'theme';
const isBrowser = typeof document !== 'undefined';

export function getTheme() {
  if (!isBrowser) return 'light';
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export function setTheme(t) {
  if (!isBrowser) return;
  const next = t === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(KEY, next); } catch (e) {}
  document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
}

export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

/** Readable store that tracks the current theme. */
export const theme = readable(getTheme(), (set) => {
  if (!isBrowser) return;
  set(getTheme());
  const handler = (e) => set(e.detail);
  document.addEventListener('themechange', handler);
  return () => document.removeEventListener('themechange', handler);
});
```

- [ ] **Step 4: Create `src/lib/components/ThemeToggle.svelte`**

```svelte
<script>
  import { theme, toggleTheme } from '$lib/theme.js';
</script>

<button
  class="theme-toggle"
  type="button"
  aria-label="Toggle dark mode"
  title="Toggle dark mode"
  onclick={() => toggleTheme()}
>
  {#if $theme === 'dark'}
    <!-- sun -->
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
  {:else}
    <!-- moon -->
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
  {/if}
</button>

<style>
  .theme-toggle {
    display: inline-flex; align-items: center; justify-content: center;
    width: 38px; height: 38px; border-radius: var(--radius-sm);
    background: transparent; border: 1px solid var(--border);
    color: var(--muted); cursor: pointer;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
  }
  .theme-toggle:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }
</style>
```

- [ ] **Step 5: Verify build + theming**

Run: `npm run build`
Expected: build completes with no errors.
Then start dev (Task uses Claude Preview): load `/`, open console — no errors. In devtools set `document.documentElement.setAttribute('data-theme','dark')` and confirm background/text tokens flip. Reload with `localStorage.theme='dark'` set → page paints dark immediately (no flash).

- [ ] **Step 6: Commit**
```bash
git add src/app.css src/app.html src/lib/theme.js src/lib/components/ThemeToggle.svelte
git commit -m "feat: light/dark design-system foundation (Claude-docs reskin)"
```

---

### Task 2: BrandMark + Nav rewrite (light bar, links, CTA, theme toggle)

**Files:**
- Create: `src/lib/components/BrandMark.svelte`
- Modify: `src/lib/components/Nav.svelte` (full rewrite)

**Interfaces:**
- Consumes: `ThemeToggle` (Task 1), `$app/stores` `page`, `$app/navigation` `afterNavigate`.
- Produces: `BrandMark` component (logo lockup, theme-safe) reused by footer in Task 3. Nav renders a fixed/sticky light top bar of height `--nav-h`.

**Logo note:** the PNG wordmark is light-on-transparent and vanishes on cream. `BrandMark` shows the existing `/NextGen_Ciruitry_Logo.png` inside a small dark rounded chip in light mode (so it always reads), and the bare PNG in dark mode. This preserves the real brand logo with zero asset surgery. (If, on visual review, the chip reads heavy, the fallback is an inline mark + live `Source Serif` text — but ship the chip first.)

- [ ] **Step 1: Create `src/lib/components/BrandMark.svelte`**

```svelte
<script>
  let { height = 34 } = $props();
</script>

<span class="brand" style="--h:{height}px">
  <img src="/NextGen_Ciruitry_Logo.png" alt="NextGen Circuitry" />
</span>

<style>
  .brand {
    display: inline-flex; align-items: center;
    padding: 6px 10px; border-radius: var(--radius-sm);
    background: #14120f; /* dark chip so the light wordmark reads on cream */
    transition: background 0.3s var(--ease);
  }
  :global([data-theme='dark']) .brand { background: transparent; padding: 0; }
  .brand img { height: var(--h); width: auto; display: block; }
</style>
```

- [ ] **Step 2: Rewrite `src/lib/components/Nav.svelte`**

Keep the Svelte-5 runes pattern (`$state`, `afterNavigate`), the `links` array (HOME/ABOUT/PROGRAMS/CONTACT) and the `scrolled` listener. Replace markup + styles:
- `<nav>`: sticky, `height:var(--nav-h)`, `background:color-mix(in srgb, var(--bg) 80%, transparent)` with `backdrop-filter:blur(12px)`, `border-bottom:1px solid transparent`; `.scrolled` adds `border-bottom-color:var(--border)`.
- Left: `<a href="/" class="nav-logo"><BrandMark height={30} /></a>`.
- Center/right `ul.desktop`: links use `--font-mono`, `font-size:12.5px`, `color:var(--muted)`, hover/active `color:var(--accent)` with the existing animated underline but `background:var(--accent)`; `.active` when `$page.url.pathname === link.href`.
- Right cluster: a "SUPPORT US" pill (`.nav-cta`: `background:var(--accent)`, `color:#fff`, radius `--radius-sm`, hover `--accent-strong`) **and** `<ThemeToggle />`.
- Mobile: keep burger + `mobile-menu`, restyle to `background:var(--bg)`, `border-bottom:1px solid var(--border)`, links mono `--muted`; include `<ThemeToggle />` in the mobile menu too. Burger bars use `background:var(--text)`.
- Remove all teal/navy literals and the drop-shadow-glow hover.
- Import `BrandMark` and `ThemeToggle`.

- [ ] **Step 3: Verify**

Run: `npm run build` → no errors. Dev: nav shows on cream with dark logo chip; links + underline animate; SUPPORT US pill is green; theme toggle flips and persists across reload; at <760px width the burger menu opens, contains the toggle, and closes on navigation.

- [ ] **Step 4: Commit**
```bash
git add src/lib/components/BrandMark.svelte src/lib/components/Nav.svelte
git commit -m "feat: light nav with brand chip and theme toggle"
```

---

### Task 3: Layout shell, footer reskin, motion trim, dead-file removal

**Files:**
- Modify: `src/routes/+layout.svelte` (shell + footer)
- Modify: `src/lib/motion.js` (trim)
- Delete: `src/lib/components/CircuitCanvas.svelte`
- Delete: `src/lib/assets/favicon.svg`

**Interfaces:**
- Consumes: `BrandMark` (Task 2), `theme` infra (Task 1), `config.js`.
- Produces: trimmed `motion.js` exporting exactly `ensureGsap`, `initSmoothScroll`, `scrollTo`, `reveal`. The `reveal` action signature is unchanged: `reveal(node, { y?, opacity?, duration?, delay?, stagger?, start?, children? })`. **All other exports are removed** — every later task must use only `reveal`.

- [ ] **Step 1: Trim `src/lib/motion.js`**

Delete `intro`, `introLines`, `linesUp`, `parallax`, `magnetic`, `spotlight`, `countUp`. Keep `ensureGsap`, `initSmoothScroll`, `scrollTo`, and `reveal` exactly as written. Soften `reveal` defaults to `y:18, duration:0.7` for the calmer feel. Keep SSR-safe + reduced-motion guards.

- [ ] **Step 2: Rewrite `+layout.svelte` shell + footer**

- Remove `<div class="bg-field">` and `<div class="grain">`.
- Keep `initSmoothScroll` onMount and the `afterNavigate` scroll-to-top + `ScrollTrigger.refresh()`.
- `<footer>`: light. Top CTA band ("Give a kid their first circuit." + Support/Get-in-touch buttons) on a `--surface-2` / `--accent-soft` panel with `--border` (drop the radial teal glow; use a subtle `--accent-soft` background instead). Footer columns (Explore / Get involved / Where) with `--font-mono` heads in `--accent`, links `--muted` → hover `--accent`. Footer brand uses `<BrandMark height={30} />` instead of the raw `<img>`. Bottom bar mono `--muted-dim`, top border `--border`. Preserve all link hrefs and copy.

- [ ] **Step 3: Delete dead files**
```bash
git rm src/lib/components/CircuitCanvas.svelte src/lib/assets/favicon.svg
```

- [ ] **Step 4: Verify**

Run: `npm run build` → no errors and **no "unused export" / missing-import warnings** (confirms no page still imports removed motion helpers or CircuitCanvas — those are fixed in Tasks 4–8, so expect this step to pass only after all pages are migrated; if building now, temporarily expect page import errors and proceed — re-run after Task 8). Dev: footer renders light with green heads; CTA buttons work.

> Note: Tasks 4–8 each remove their page's now-invalid motion imports, so a clean full build is only guaranteed after Task 8. Within Task 3, verify the layout/footer in isolation by loading `/` after Task 4, or accept the known transient page errors.

- [ ] **Step 5: Commit**
```bash
git add src/routes/+layout.svelte src/lib/motion.js
git commit -m "feat: light layout shell + footer; trim motion; remove circuit canvas"
```

---

### Task 4: Home page rewrite (hero + card grid + steps + quote)

**Files:**
- Modify: `src/routes/+page.svelte` (full rewrite)

**Interfaces:**
- Consumes: `reveal` (Task 3), `config.js` `SIGNUP_FORM_URL`, global classes from Task 1.

- [ ] **Step 1: Rewrite `+page.svelte`**

Keep the `build` and `steps` data arrays and `<svelte:head>` verbatim. New markup:
- **Hero** (no `CircuitCanvas`, no `introLines`/`countUp`/`magnetic`): `.eyebrow` ("Free electronics and coding · San Diego"); `<h1 class="display">` with the headline as plain text ("Building the next generation of **makers.**" — wrap "makers." in `<span class="accent">`); `.lead` paragraph (verbatim); `.hero-cta` with `.btn-primary` (Join a program, `SIGNUP_FORM_URL`) + `.btn-secondary` (Our story, `/about`); `.stats` with the three stats rendered **statically** (`100%`, `6`, `3-6`) using `.stat-num` in `--accent`. Apply `use:reveal` (and `use:reveal={{children:true}}` on the stats row) for gentle entrance.
- **"What kids build"** section: replace the 12-col bento with a **Claude-home-style responsive card grid** — `display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:1rem`. Each `build` item is a `.card` with `.kicker`, `<h3>`, `<p>` (drop `spotlight`; the `.card` hover from Task 1 is enough). Section heading "Not slideshows. Real hardware in real hands." as plain `.h2` with the second line's "Real hardware" in `.accent`.
- **"How it works"**: keep the sticky-left / steps-right two-column structure but light: `.how` panel `background:var(--surface-2)`, `border-block:1px solid var(--border)`. Steps are `.card`-like rows with `.step-n` in `--accent`. Use `use:reveal`.
- **Mission quote**: centered `<blockquote class="quote">` in `--font-head`, plain text (drop `.line/.ln`), last line in `.accent`; `<cite>` in mono `--muted`.
- Replace all teal/navy with tokens. Remove all imports except `reveal` and `SIGNUP_FORM_URL`.

- [ ] **Step 2: Verify**

Run: `npm run build`. Dev: load `/`, console clean. Hero readable on cream; cards reflow to a clean grid (screenshot light + dark via theme toggle). Reduced-motion: content visible without animation.

- [ ] **Step 3: Commit**
```bash
git add src/routes/+page.svelte
git commit -m "feat: reskin home page (hero, card grid, steps, quote)"
```

---

### Task 5: Docs shell components + Programs page (first consumer)

**Files:**
- Create: `src/lib/components/Sidebar.svelte`
- Create: `src/lib/components/OnThisPage.svelte`
- Create: `src/lib/components/DocsLayout.svelte`
- Modify: `src/routes/programs/+page.svelte` (full rewrite using DocsLayout)

**Interfaces:**
- `DocsLayout` props: `{ title?: string }` and a default `<slot/>` for content; it renders `Sidebar` (left), the slotted content column (max `--content-w`), and `OnThisPage` (right). It must be reusable by Tasks 6 & 7.
- `Sidebar` is self-contained: a static nav tree of the site's sections with active-state via `$page.url.pathname`. Groups: **Get started** (Home `/`, About `/about`), **Programs** (`/programs`), **Get involved** (Support `/support`, Contact `/contact`).
- `OnThisPage` props: `{ headings?: {id,text,level}[] }`. If none passed, it auto-collects `h2[id],h3[id]` from `.docs-content` on mount and on `afterNavigate`, builds links, and highlights the active one with an IntersectionObserver. Hidden below 1100px.

- [ ] **Step 1: Create `Sidebar.svelte`**

Sticky left column (`position:sticky; top:calc(var(--nav-h) + 1rem)`). `--font-body`, group labels in `--font-mono` uppercase `--muted-dim`; links `--muted`, `.active` → `--accent` with a left accent bar. Width ~220px. Collapses (hidden) below 900px (mobile uses a `<details>` "Menu" disclosure at top of `DocsLayout` instead — implement that in `DocsLayout`).

- [ ] **Step 2: Create `OnThisPage.svelte`**

```svelte
<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  let { headings = null } = $props();
  let items = $state(headings ?? []);
  let activeId = $state('');
  let observer;

  function collect() {
    if (headings) return;
    const nodes = document.querySelectorAll('.docs-content h2[id], .docs-content h3[id]');
    items = Array.from(nodes).map((n) => ({ id: n.id, text: n.textContent, level: +n.tagName[1] }));
    observer?.disconnect();
    observer = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (activeId = e.target.id)),
      { rootMargin: '-80px 0px -70% 0px' }
    );
    nodes.forEach((n) => observer.observe(n));
  }
  onMount(() => { collect(); return () => observer?.disconnect(); });
  afterNavigate(() => requestAnimationFrame(collect));
</script>

{#if items.length}
  <nav class="otp" aria-label="On this page">
    <span class="otp-head">On this page</span>
    {#each items as h (h.id)}
      <a href={`#${h.id}`} class:active={activeId === h.id} class:sub={h.level === 3}>{h.text}</a>
    {/each}
  </nav>
{/if}

<style>
  .otp { position: sticky; top: calc(var(--nav-h) + 1rem); display: flex; flex-direction: column; gap: 0.5rem; font-size: 13px; }
  .otp-head { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted-dim); margin-bottom: 0.3rem; }
  .otp a { color: var(--muted); border-left: 2px solid var(--border); padding: 2px 0 2px 12px; transition: color 0.2s, border-color 0.2s; }
  .otp a.sub { padding-left: 24px; }
  .otp a:hover, .otp a.active { color: var(--accent); border-left-color: var(--accent); }
  @media (max-width: 1100px) { .otp { display: none; } }
</style>
```

- [ ] **Step 3: Create `DocsLayout.svelte`**

Grid: `[sidebar 220px] [content minmax(0,var(--content-w))] [otp 200px]`, centered, gap ~3rem, `padding-top:calc(var(--nav-h) + 3rem)`, `max-width:var(--maxw)`, `margin:0 auto`. Renders `<Sidebar/>`, a `<div class="docs-content">` wrapping the optional `{title}` as an `<h1 class="display" style="font-size:clamp(2.2rem,5vw,3.4rem)">` + `<slot/>`, and `<OnThisPage/>`. Above the grid on mobile (<900px) render a `<details class="docs-menu">` containing the same section links as `Sidebar` (extract the link list into a shared array inside `Sidebar` and import, OR duplicate the small array — duplication acceptable here). At <900px collapse to single column (sidebar + otp hidden, mobile `<details>` shown).

`.docs-content` base typography: `h2{font-family:var(--font-head);font-size:1.6rem;margin:2.4rem 0 0.8rem}`, `h3{font-size:1.2rem;margin:1.8rem 0 0.6rem}`, `p{color:var(--muted);line-height:1.8;margin-bottom:1rem}`, links `--accent` underlined on hover.

- [ ] **Step 4: Rewrite `programs/+page.svelte`**

Keep `programs` array + `<svelte:head>` verbatim. Wrap in `<DocsLayout title="Programs">`. Intro `<p>` (verbatim) with a `.section-label` "Programs" eyebrow above the title (or rely on DocsLayout title). Render the program list as `.card` items in a vertical stack: each card has an index, `<h3 id={slug}>` (so OnThisPage picks them up — slugify the title), `<p>`, and either a `.btn-primary`-style "Sign up →" link (when `p.link`) or a `.badge` with `p.badge`. Open program gets an `--accent` left border. Closing `.note` paragraph verbatim with the `/contact` link. Replace teal/navy with tokens; imports: `reveal`, `DocsLayout`, `SIGNUP_FORM_URL`.

- [ ] **Step 5: Verify**

Run: `npm run build`. Dev: `/programs` shows sidebar (Programs active), readable content column, and an "On this page" rail listing the program headings that highlights on scroll. Cards styled; "Sign up" link points to `SIGNUP_FORM_URL`. Responsive: at <900px sidebar/otp collapse, `<details>` menu appears. Light + dark screenshot.

- [ ] **Step 6: Commit**
```bash
git add src/lib/components/Sidebar.svelte src/lib/components/OnThisPage.svelte src/lib/components/DocsLayout.svelte src/routes/programs/+page.svelte
git commit -m "feat: docs shell (sidebar + on-this-page) and programs page"
```

---

### Task 6: About page (docs layout)

**Files:**
- Modify: `src/routes/about/+page.svelte` (full rewrite)

**Interfaces:**
- Consumes: `DocsLayout`, `reveal`, global classes.

- [ ] **Step 1: Rewrite**

Keep `values` array + `<svelte:head>` verbatim. Wrap in `<DocsLayout title="About us">`. Render the intro paragraph (verbatim) as lead text. Render the four `values` as a 2-col `.card` grid (`auto-fit minmax(240px,1fr)`), each with `.kicker`, `<h3 id={slug}>` (for OnThisPage), `<p>` — preserve the `é` / `Peñasquitos` entities. Render the stat **band** (`$0`, `100%`, `Local`) statically (no `countUp`) inside an `--accent-soft` panel with `--border`. Render the closing block (verbatim, plain text, drop `.line/.ln`) centered, with the "See our programs →" `.btn-primary` to `/programs`. Imports: `reveal`, `DocsLayout`. Remove `linesUp/spotlight/magnetic/countUp`.

- [ ] **Step 2: Verify** — `npm run build`; `/about` renders in docs shell, About active in sidebar, value cards + stat band styled, links work, light+dark clean.

- [ ] **Step 3: Commit**
```bash
git add src/routes/about/+page.svelte
git commit -m "feat: reskin about page in docs layout"
```

---

### Task 7: Support page (docs layout)

**Files:**
- Modify: `src/routes/support/+page.svelte` (full rewrite)

**Interfaces:**
- Consumes: `DocsLayout`, `reveal`, `config.js` `DONATE_URL`, `CONTACT_EMAIL`.

- [ ] **Step 1: Rewrite**

Keep `tiers` array + `<svelte:head>` verbatim. Wrap in `<DocsLayout title="Support us">`. Intro paragraph verbatim. Render `tiers` as a 3-col `.card` grid; featured tier gets `--accent` border + `--accent-soft` background + "Most popular" flag (mono, `--accent` bg, white text). `.amount` in `--accent` serif. Each tier "Give $X" button → `DONATE_URL` (featured = `.btn-primary`, others = `.btn-secondary`). The big **CTA box**: light panel (`--surface-2`, `--border`, `--radius-lg`), "Verified GoFundMe" tag (mono, accent, pulsing dot kept but recolored to `--accent`), `<h3>` + `<p>` verbatim, "Donate now →" `.btn-primary` → `DONATE_URL`; drop the radial teal glow (use `--accent-soft` tint). `.other-ways` paragraph verbatim with `mailto:` link. Give the two `<h3>`/`<h2>`-level anchors `id`s for OnThisPage. Imports: `reveal`, `DocsLayout`, `DONATE_URL`, `CONTACT_EMAIL`. Remove `linesUp/spotlight/magnetic`.

- [ ] **Step 2: Verify** — `npm run build`; `/support` in docs shell, Support active, tier cards + CTA styled, all donate/email links correct, light+dark clean.

- [ ] **Step 3: Commit**
```bash
git add src/routes/support/+page.svelte
git commit -m "feat: reskin support page in docs layout"
```

---

### Task 8: Contact page (centered card) + final cleanup

**Files:**
- Modify: `src/routes/contact/+page.svelte` (full rewrite)

**Interfaces:**
- Consumes: `reveal`, `config.js` `CONTACT_EMAIL`, `ORG`. Keeps the Svelte-5 `$state` form logic.

- [ ] **Step 1: Rewrite**

Keep ALL script logic verbatim (`$state` fields, `handleSubmit` mailto builder, `copyEmail`) and `<svelte:head>`. This page is **not** a DocsLayout — it's a centered marketing-style page (`.section-wrap` with `padding-top:calc(var(--nav-h) + 4rem)`, content max-width ~960px centered). Head block: `.section-label` "Contact" + `<h2 class="h2">` "Let's build something for your **kids.**" (plain text, "kids." in `.accent`) + intro `<p>` verbatim. Two-column `.layout` (`details` aside + `form-wrap`) → restyle to light: `.email-card` and `.info-card` become `.card`s on `--surface`/`--surface-2`; labels in `--font-mono` `--accent`; values `--text`. Form `input,textarea`: `background:var(--surface)`, `1px solid var(--border)`, `color:var(--text)`, focus `border-color:var(--accent)` + `box-shadow:0 0 0 3px var(--ring)`; placeholders `--muted-dim`. Submit `.btn-primary`. Success state styled on `--surface`. Remove `linesUp/spotlight/magnetic`; keep `reveal`. Replace all teal/navy tokens.

- [ ] **Step 2: Full-site verification**

Run: `npm run build`
Expected: **clean build, zero errors, zero unused-import/missing-export warnings** (confirms Task 3's motion trim + CircuitCanvas removal are fully consistent now that every page is migrated).
Then grep for leftovers:
```bash
grep -rn -E "teal|--navy|00e5b0|05080f|CircuitCanvas|linesUp|countUp|spotlight|magnetic|introLines" src/ ; echo "exit:$?"
```
Expected: no matches (grep exit 1). Fix any hit.
Dev (Claude Preview): visit all 5 routes; console clean on each; toggle dark on each and screenshot; test contact form submit opens a `mailto:`; test mobile width (<760px nav burger; <900px docs `<details>` menu).

- [ ] **Step 3: Commit**
```bash
git add src/routes/contact/+page.svelte
git commit -m "feat: reskin contact page; finish Claude-docs reskin"
```

---

## Self-Review

**Spec coverage:**
- Hybrid layout → Tasks 4 (home hero+grid), 5–7 (docs shell), 8 (contact card). ✓
- Green-on-cream + dark toggle → Task 1 tokens + ThemeToggle, Task 2 nav wiring, no-flash script. ✓
- Calm motion (remove canvas/GSAP reveals, keep gentle reveal + Lenis) → Task 3 trim, all pages use only `reveal`. ✓
- New components Sidebar/OnThisPage/ThemeToggle (+ DocsLayout, BrandMark) → Tasks 1, 2, 5. ✓
- `app.css` semantic rewrite → Task 1. ✓
- Nav + footer reskin → Tasks 2, 3. ✓
- Logo handling (cream legibility) → Task 2 BrandMark chip; favicon.svg deleted Task 3. ✓
- Content/links preserved → Global Constraints + every page task says "verbatim". ✓
- Non-goals (no search backend, no copy rewrite, no route/config change) → respected. ✓
- Success criteria (build clean, themes work, no teal/navy, responsive, links intact) → Task 8 Step 2 grep + checks. ✓

**Placeholder scan:** Foundation/components/utilities given as complete code. Page tasks specify exact structure + the real (in-repo, verbatim) copy + token mapping rather than re-pasting ~150 lines each — acceptable because the content already exists in the files being modified and the design-system classes are fully defined in Task 1. No "TBD"/"handle edge cases" left.

**Type/name consistency:** `reveal` is the only retained motion export (Task 3) and the only one imported by Tasks 4–8. `theme.js` exports (`getTheme/setTheme/toggleTheme/theme`) match ThemeToggle usage. `DocsLayout`/`Sidebar`/`OnThisPage` props match their consumers. `.docs-content` class is produced by DocsLayout (Task 5) and queried by OnThisPage (Task 5) — consistent.

**Known sequencing note:** a fully clean `npm run build` is only guaranteed after Task 8 (pages drop removed motion imports incrementally). Flagged in Task 3 Step 4 and resolved in Task 8 Step 2.
