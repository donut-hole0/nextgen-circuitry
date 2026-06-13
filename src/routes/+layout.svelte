<script>
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import { CONTACT_EMAIL, DONATE_URL, ORG } from '$lib/config.js';

  const year = new Date().getFullYear();
</script>

<Nav />

<slot />

<footer>
  <div class="foot-inner">
    <div class="foot-brand">
      <img src="/NextGen_Ciruitry_Logo.png" alt="NextGen Circuitry" />
      <p>Free, hands-on electronics &amp; coding education for the next generation of makers.</p>
    </div>

    <div class="foot-col">
      <span class="foot-head">EXPLORE</span>
      <a href="/about">About</a>
      <a href="/programs">Programs</a>
      <a href="/contact">Contact</a>
    </div>

    <div class="foot-col">
      <span class="foot-head">GET INVOLVED</span>
      <a href="/support">Support us</a>
      <a href={DONATE_URL} target="_blank" rel="noopener">Donate</a>
      <a href="mailto:{CONTACT_EMAIL}">Email us</a>
    </div>

    <div class="foot-col">
      <span class="foot-head">WHERE</span>
      <span class="foot-static">{ORG.school}</span>
      <span class="foot-static">{ORG.location}</span>
      <span class="foot-static">{ORG.operatedBy}</span>
    </div>
  </div>

  <div class="foot-bar">
    <span>&copy; {year} NEXTGEN CIRCUITRY</span>
    <span class="foot-tag">// BUILT BY STUDENTS, FOR STUDENTS</span>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border);
    background: linear-gradient(180deg, transparent, rgba(0, 229, 176, 0.03));
    margin-top: 2rem;
  }

  .foot-inner {
    max-width: 1040px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 2.5rem;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr;
    gap: 2.5rem;
  }

  .foot-brand img {
    height: 42px;
    margin-bottom: 1rem;
  }
  .foot-brand p {
    color: var(--muted);
    font-size: 14px;
    line-height: 1.7;
    font-weight: 300;
    max-width: 280px;
  }

  .foot-col {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .foot-head {
    font-family: var(--font-head);
    font-size: 10.5px;
    color: var(--teal);
    letter-spacing: 0.14em;
    margin-bottom: 0.3rem;
  }

  .foot-col a {
    font-size: 14px;
    color: var(--muted);
    transition: color 0.2s, transform 0.2s var(--ease);
    width: fit-content;
  }
  .foot-col a:hover {
    color: var(--teal);
    transform: translateX(3px);
  }

  .foot-static {
    font-size: 13px;
    color: var(--muted-dim);
  }

  .foot-bar {
    border-top: 1px solid var(--border);
    max-width: 1040px;
    margin: 0 auto;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-head);
    font-size: 11px;
    color: var(--muted-dim);
    letter-spacing: 0.06em;
  }
  .foot-tag { color: var(--teal); opacity: 0.7; }

  @media (max-width: 760px) {
    .foot-inner {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    .foot-bar {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
  }
  @media (max-width: 440px) {
    .foot-inner { grid-template-columns: 1fr; }
  }
</style>
