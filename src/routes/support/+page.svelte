<script>
  import { reveal, linesUp, spotlight, magnetic } from '$lib/motion.js';
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

<main class="section-wrap page-top">
  <div class="head">
    <div class="section-label">Support us</div>
    <h2 class="h2" use:linesUp>
      <span class="line"><span class="ln">Help us keep it <span class="accent">free.</span></span></span>
    </h2>
    <p class="intro" use:reveal={{ delay: 0.2 }}>
      NextGen Circuitry is free for every kid we work with, and we intend to keep it that way.
      Your donation buys the resistors, wires, sensors, and Arduino kits that end up in a child's
      hands. No salaries, no overhead, no middlemen.
    </p>
  </div>

  <div class="tiers">
    {#each tiers as t (t.amount)}
      <article class="card tier" class:featured={t.featured} use:spotlight use:reveal>
        {#if t.featured}<div class="tier-flag">Most popular</div>{/if}
        <div class="amount">{t.amount}</div>
        <p>{t.label}</p>
        <a href={DONATE_URL} target="_blank" rel="noopener" class="tier-btn">Give {t.amount}</a>
      </article>
    {/each}
  </div>

  <div class="cta-box" use:reveal>
    <div class="cta-glow" aria-hidden="true"></div>
    <div class="cta-text">
      <div class="cta-tag"><span class="dot"></span>Verified GoFundMe</div>
      <h3>Every dollar goes toward the kids.</h3>
      <p>
        We are a student-run program with no overhead, so 100% of donations fund the materials
        and equipment used directly in our programs. Give any amount on our official GoFundMe.
        It is quick, secure, and tax-trackable.
      </p>
    </div>
    <a href={DONATE_URL} target="_blank" rel="noopener" class="btn-donate" use:magnetic>
      Donate now <span class="btn-arrow">→</span>
    </a>
  </div>

  <p class="other-ways" use:reveal>
    Cannot give right now? Sharing our GoFundMe, donating gently-used hardware, or hosting a
    session at your school helps just as much. <a href="mailto:{CONTACT_EMAIL}">Email us</a> to chip in another way.
  </p>
</main>

<style>
  .page-top { padding-top: 11rem; }
  .head { margin-bottom: 3rem; }
  .intro {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.8;
    max-width: 620px;
    font-weight: 300;
    margin-top: 1rem;
  }

  .tiers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.1rem;
  }
  .tier { display: flex; flex-direction: column; gap: 0.7rem; }
  .tier.featured {
    border-color: var(--border-teal);
    background: linear-gradient(180deg, rgba(0,229,176,0.08), var(--navy-card));
  }
  .tier-flag {
    align-self: flex-start;
    font-family: var(--font-head);
    font-size: 9.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--navy);
    background: var(--teal);
    padding: 4px 10px;
    border-radius: 999px;
  }
  .amount {
    font-family: var(--font-head);
    font-size: 2.4rem;
    color: var(--teal);
    letter-spacing: -0.03em;
  }
  .tier p { font-size: 14px; color: var(--muted); line-height: 1.6; flex: 1; font-weight: 300; }
  .tier-btn {
    margin-top: 0.6rem;
    text-align: center;
    font-family: var(--font-head);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--teal);
    border: 1px solid var(--border-teal);
    border-radius: 999px;
    padding: 11px;
    transition: background 0.3s var(--ease), color 0.3s var(--ease);
  }
  .tier-btn:hover { background: var(--teal); color: var(--navy); }
  .tier.featured .tier-btn {
    background: linear-gradient(180deg, var(--teal-soft), var(--teal));
    color: var(--navy);
    border: none;
  }

  .cta-box {
    margin-top: 1.6rem;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border-teal);
    border-radius: 22px;
    background: linear-gradient(180deg, var(--navy-card-hi), var(--navy-card));
    padding: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
  .cta-glow {
    position: absolute;
    inset: -50% -10% auto auto;
    width: 60%; height: 200%;
    background: radial-gradient(40% 40% at 100% 0%, var(--teal-glow), transparent 70%);
    pointer-events: none;
  }
  .cta-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: var(--font-head); font-size: 11px; color: var(--teal);
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.7rem;
  }
  .cta-tag .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--teal); animation: pulse 2.4s infinite; }
  .cta-text { position: relative; }
  .cta-text h3 { font-family: var(--font-head); font-size: 1.4rem; margin-bottom: 0.6rem; color: var(--white); letter-spacing: -0.01em; }
  .cta-text p { font-size: 14px; color: var(--muted); line-height: 1.7; max-width: 480px; font-weight: 300; }

  .btn-donate {
    position: relative;
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-family: var(--font-head); font-size: 13px; letter-spacing: 0.04em;
    color: var(--navy);
    background: linear-gradient(180deg, var(--teal-soft), var(--teal));
    padding: 16px 34px;
    border-radius: 999px;
    white-space: nowrap; flex-shrink: 0;
    box-shadow: 0 12px 30px -10px var(--teal-glow-strong);
    transition: box-shadow 0.3s var(--ease);
  }
  .btn-donate:hover { box-shadow: 0 20px 42px -12px var(--teal-glow-strong); }
  .btn-donate:hover .btn-arrow { transform: translateX(4px); }
  .btn-arrow { transition: transform 0.3s var(--ease); }

  .other-ways {
    margin-top: 2.5rem;
    text-align: center;
    font-size: 14.5px;
    color: var(--muted);
    line-height: 1.7;
    max-width: 580px;
    margin-inline: auto;
    font-weight: 300;
  }
  .other-ways a { color: var(--teal); border-bottom: 1px solid var(--border-teal); }
  .other-ways a:hover { border-color: var(--teal); }

  @media (max-width: 760px) {
    .tiers { grid-template-columns: 1fr; }
    .cta-box { flex-direction: column; align-items: flex-start; }
    .btn-donate { width: 100%; justify-content: center; }
  }
</style>
