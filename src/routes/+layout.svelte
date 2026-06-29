<script>
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import BrandMark from '$lib/components/BrandMark.svelte';
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
    scrollTo(0, { immediate: true });
    const { ScrollTrigger } = ensureGsap();
    requestAnimationFrame(() => ScrollTrigger && ScrollTrigger.refresh());
  });
</script>

<Nav />

<slot />

<footer>
  <div class="foot-cta">
    <h2 class="h2">Give a kid their<br /><span class="accent">first circuit.</span></h2>
    <div class="foot-cta-actions">
      <a href={DONATE_URL} target="_blank" rel="noopener" class="btn-primary">Support the program <span class="btn-arrow">→</span></a>
      <a href="/contact" class="btn-secondary">Get in touch</a>
    </div>
  </div>

  <div class="foot-inner">
    <div class="foot-brand">
      <BrandMark height={30} />
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

<style>
  footer {
    border-top: 1px solid var(--border);
    background: var(--bg-subtle);
    margin-top: 4rem;
  }

  .foot-cta {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 5rem 1.5rem 3.5rem;
    text-align: center;
  }
  .foot-cta h2 { margin-bottom: 2rem; }
  .foot-cta-actions {
    display: flex;
    gap: 0.9rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .foot-inner {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 3.5rem 1.5rem 2.5rem;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr;
    gap: 2.5rem;
    border-top: 1px solid var(--border);
  }
  .foot-brand p {
    color: var(--muted);
    font-size: 14px;
    line-height: 1.7;
    max-width: 290px;
    margin-top: 1rem;
  }
  .foot-col { display: flex; flex-direction: column; gap: 0.7rem; }
  .foot-head {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent);
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
  .foot-col a:hover { color: var(--accent); transform: translateX(4px); }
  .foot-static { font-size: 13px; color: var(--muted-dim); }

  .foot-bar {
    border-top: 1px solid var(--border);
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 1.6rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--muted-dim);
    letter-spacing: 0.05em;
  }
  .foot-tag { color: var(--accent); opacity: 0.8; }

  @media (max-width: 760px) {
    .foot-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .foot-bar { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
  @media (max-width: 440px) {
    .foot-inner { grid-template-columns: 1fr; }
  }
</style>
