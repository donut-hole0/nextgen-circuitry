<script>
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { initSmoothScroll, ensureGsap, scrollTo } from '$lib/motion.js';
  import { CONTACT_EMAIL, DONATE_URL, ORG } from '$lib/config.js';

  const year = new Date().getFullYear();

  onMount(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  });

  afterNavigate(() => {
    // jump to top on route change, then recalc scroll triggers for the new page
    scrollTo(0, { immediate: true });
    const { ScrollTrigger } = ensureGsap();
    requestAnimationFrame(() => ScrollTrigger && ScrollTrigger.refresh());
  });
</script>

<div class="bg-field" aria-hidden="true"></div>

<Nav />

<slot />

<footer>
  <div class="foot-cta">
    <div class="foot-cta-glow" aria-hidden="true"></div>
    <h2 class="h2">Give a kid their<br /><span class="accent">first circuit.</span></h2>
    <div class="foot-cta-actions">
      <a href={DONATE_URL} target="_blank" rel="noopener" class="btn-primary">Support the program <span class="btn-arrow">→</span></a>
      <a href="/contact" class="btn-secondary">Get in touch</a>
    </div>
  </div>

  <div class="foot-inner">
    <div class="foot-brand">
      <img src="/NextGen_Ciruitry_Logo.png" alt="NextGen Circuitry" />
      <p>Free, hands-on electronics and coding education for the next generation of makers.</p>
    </div>

    <div class="foot-col">
      <span class="foot-head">Explore</span>
      <a href="/about">About</a>
      <a href="/programs">Programs</a>
      <a href="/contact">Contact</a>
    </div>

    <div class="foot-col">
      <span class="foot-head">Get involved</span>
      <a href="/support">Support us</a>
      <a href={DONATE_URL} target="_blank" rel="noopener">Donate</a>
      <a href="mailto:{CONTACT_EMAIL}">Email us</a>
    </div>

    <div class="foot-col">
      <span class="foot-head">Where</span>
      <span class="foot-static">{ORG.school}</span>
      <span class="foot-static">{ORG.location}</span>
      <span class="foot-static">{ORG.operatedBy}</span>
    </div>
  </div>

  <div class="foot-bar">
    <span>&copy; {year} NextGen Circuitry</span>
    <span class="foot-tag">Built by students, for students</span>
  </div>
</footer>

<div class="grain" aria-hidden="true"></div>

<style>
  footer {
    border-top: 1px solid var(--border);
    background: linear-gradient(180deg, transparent, rgba(0, 229, 176, 0.035));
    margin-top: 4rem;
  }

  .foot-cta {
    position: relative;
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 6rem 1.6rem 4rem;
    text-align: center;
    overflow: hidden;
  }
  .foot-cta-glow {
    position: absolute;
    top: -60%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 200%;
    background: radial-gradient(42% 42% at 50% 30%, var(--teal-glow), transparent 70%);
    pointer-events: none;
  }
  .foot-cta h2 { position: relative; margin-bottom: 2rem; }
  .foot-cta-actions {
    position: relative;
    display: flex;
    gap: 0.9rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .foot-inner {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 3.5rem 1.6rem 2.5rem;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr;
    gap: 2.5rem;
    border-top: 1px solid var(--border);
  }
  .foot-brand img { height: 44px; margin-bottom: 1rem; }
  .foot-brand p {
    color: var(--muted);
    font-size: 14px;
    line-height: 1.7;
    font-weight: 300;
    max-width: 290px;
  }
  .foot-col { display: flex; flex-direction: column; gap: 0.7rem; }
  .foot-head {
    font-family: var(--font-head);
    font-size: 11px;
    color: var(--teal);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
  }
  .foot-col a {
    font-size: 14px;
    color: var(--muted);
    transition: color 0.2s, transform 0.3s var(--ease);
    width: fit-content;
  }
  .foot-col a:hover { color: var(--teal); transform: translateX(4px); }
  .foot-static { font-size: 13px; color: var(--muted-dim); }

  .foot-bar {
    border-top: 1px solid var(--border);
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-head);
    font-size: 11px;
    color: var(--muted-dim);
    letter-spacing: 0.05em;
  }
  .foot-tag { color: var(--teal); opacity: 0.7; }

  @media (max-width: 760px) {
    .foot-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .foot-bar { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
  @media (max-width: 440px) {
    .foot-inner { grid-template-columns: 1fr; }
  }
</style>
