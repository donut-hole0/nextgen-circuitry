<script>
  import { reveal } from '$lib/motion.js';
  import DocsLayout from '$lib/components/DocsLayout.svelte';
  import { DONATE_URL, CONTACT_EMAIL } from '$lib/config.js';

  const tiers = [
    { amount: '$10', label: 'Covers the components one student uses for a full session.' },
    { amount: '$25', label: 'Funds an Arduino kit that gets reused across many workshops.', featured: true },
    { amount: '$50', label: 'Supplies an entire table of students through summer camp.' }
  ];
</script>

<svelte:head>
  <title>Support Us - NextGen Circuitry</title>
  <meta name="description" content="Help keep NextGen Circuitry free. Every dollar funds hardware and components so kids can keep building at no cost." />
</svelte:head>

<DocsLayout title="Support us">
  <p class="lead">
    NextGen Circuitry is free for every kid we work with, and we intend to keep it that way.
    Your donation buys the resistors, wires, sensors, and Arduino kits that end up in a child's
    hands. No salaries, no overhead, no middlemen.
  </p>

  <h2 id="ways-to-give">Ways to give</h2>
  <div class="tiers">
    {#each tiers as t (t.amount)}
      <article class="card tier" class:featured={t.featured} use:reveal>
        {#if t.featured}<div class="tier-flag">Most popular</div>{/if}
        <div class="amount">{t.amount}</div>
        <p>{t.label}</p>
        <a href={DONATE_URL} target="_blank" rel="noopener" class="tier-btn" class:btn-primary={t.featured} class:btn-secondary={!t.featured}>Give {t.amount}</a>
      </article>
    {/each}
  </div>

  <h2 id="donate">Donate</h2>
  <div class="cta-box" use:reveal>
    <div class="cta-text">
      <div class="cta-tag"><span class="dot"></span>Verified GoFundMe</div>
      <h3>Every dollar goes toward the kids.</h3>
      <p>
        We are a student-run program with no overhead, so 100% of donations fund the materials
        and equipment used directly in our programs. Give any amount on our official GoFundMe.
        It is quick, secure, and tax-trackable.
      </p>
    </div>
    <a href={DONATE_URL} target="_blank" rel="noopener" class="btn-primary cta-btn">
      Donate now <span class="btn-arrow">→</span>
    </a>
  </div>

  <p class="other-ways">
    Cannot give right now? Sharing our GoFundMe, donating gently-used hardware, or hosting a
    session at your school helps just as much. <a href="mailto:{CONTACT_EMAIL}">Email us</a> to chip in another way.
  </p>
</DocsLayout>

<style>
  .lead {
    color: var(--muted) !important;
    font-size: 17px;
    line-height: 1.8;
    margin-bottom: 1rem !important;
  }

  .tiers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .tier { display: flex; flex-direction: column; gap: 0.6rem; }
  .tier.featured { border-color: var(--accent); background: var(--accent-soft); }
  .tier-flag {
    align-self: flex-start;
    font-family: var(--font-mono);
    font-size: 9.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
    background: var(--accent);
    padding: 4px 10px;
    border-radius: 999px;
  }
  .amount {
    font-family: var(--font-head);
    font-size: 2.4rem;
    color: var(--accent);
    letter-spacing: -0.03em;
  }
  .tier p { font-size: 14px; color: var(--muted); line-height: 1.6; flex: 1; margin: 0 !important; }
  .tier-btn { margin-top: 0.6rem; justify-content: center; }

  .cta-box {
    margin-top: 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-2);
    padding: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
  .cta-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: var(--font-mono); font-size: 11px; color: var(--accent);
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.7rem;
  }
  .cta-tag .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: pulse 2.4s infinite; }
  .cta-text h3 { font-size: 1.4rem; margin: 0 0 0.6rem !important; color: var(--text-strong); letter-spacing: -0.01em; }
  .cta-text p { font-size: 14px; color: var(--muted); line-height: 1.7; max-width: 480px; margin: 0 !important; }
  .cta-btn { white-space: nowrap; flex-shrink: 0; }

  .other-ways {
    margin-top: 2.5rem !important;
    text-align: center;
    font-size: 14.5px;
    color: var(--muted) !important;
    line-height: 1.7;
    max-width: 580px;
    margin-inline: auto;
  }

  @media (max-width: 760px) {
    .tiers { grid-template-columns: 1fr; }
    .cta-box { flex-direction: column; align-items: flex-start; }
    .cta-btn { width: 100%; justify-content: center; }
  }
</style>
