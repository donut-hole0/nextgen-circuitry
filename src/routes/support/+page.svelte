<script>
  import { reveal } from '$lib/actions/reveal.js';
  import { DONATE_URL, CONTACT_EMAIL } from '$lib/config.js';

  const tiers = [
    { amount: '$10', label: 'Covers the components one student uses for a full session.' },
    { amount: '$25', label: 'Funds an Arduino kit that gets reused across many workshops.', featured: true },
    { amount: '$50', label: 'Supplies an entire table of students through summer camp.' }
  ];
</script>

<svelte:head>
  <title>Support Us — NextGen Circuitry</title>
  <meta name="description" content="Help keep NextGen Circuitry free. Every dollar funds hardware and components so kids can keep building at no cost." />
</svelte:head>

<main class="section-wrap page-enter">
  <div use:reveal>
    <div class="section-label">// Support us</div>
    <div class="divider"></div>
    <h2>Help us keep it <span>free.</span></h2>
    <p class="intro">
      NextGen Circuitry is 100% free for every kid we work with — and we intend to keep it
      that way. Your donation buys the resistors, wires, sensors, and Arduino kits that end
      up in a child's hands. No salaries, no overhead, no middlemen.
    </p>
  </div>

  <div class="tiers">
    {#each tiers as t, i}
      <div class="card tier" class:featured={t.featured} use:reveal={{ delay: i * 90 }}>
        {#if t.featured}<div class="tier-flag">MOST POPULAR</div>{/if}
        <div class="amount">{t.amount}</div>
        <p>{t.label}</p>
        <a href={DONATE_URL} target="_blank" rel="noopener" class="tier-btn">
          GIVE {t.amount}
        </a>
      </div>
    {/each}
  </div>

  <div class="cta-box" use:reveal>
    <div class="cta-glow" aria-hidden="true"></div>
    <div class="cta-text">
      <div class="cta-tag"><span class="dot"></span>VERIFIED GOFUNDME</div>
      <h3>Every dollar goes toward the kids.</h3>
      <p>
        We're a student-run program with no overhead — 100% of donations fund the materials
        and equipment used directly in our programs. Give any amount on our official
        GoFundMe; it's quick, secure, and tax-trackable.
      </p>
    </div>
    <a href={DONATE_URL} target="_blank" rel="noopener" class="btn-donate">
      DONATE NOW <span class="btn-arrow">→</span>
    </a>
  </div>

  <p class="other-ways" use:reveal>
    Can't give right now? Sharing our GoFundMe, donating gently-used hardware, or hosting a
    session at your school helps just as much — <a href="mailto:{CONTACT_EMAIL}">email us</a> to chip in another way.
  </p>
</main>

<style>
  h2 {
    font-size: clamp(1.6rem, 3.4vw, 2.2rem);
    margin-bottom: 1.25rem;
    line-height: 1.18;
    color: var(--white);
  }
  h2 span { color: var(--teal); }

  .intro {
    color: var(--muted);
    font-size: 16.5px;
    line-height: 1.75;
    max-width: 620px;
    font-weight: 300;
  }

  .tiers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-top: 2.75rem;
  }
  .tier {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    position: relative;
  }
  .tier.featured {
    border-color: var(--border-teal);
    background: linear-gradient(180deg, rgba(0,229,176,0.07), var(--navy-card));
  }
  .tier-flag {
    position: absolute;
    top: -10px;
    left: 1.5rem;
    font-family: var(--font-head);
    font-size: 9px;
    letter-spacing: 0.12em;
    color: var(--navy);
    background: var(--teal);
    padding: 3px 9px;
    border-radius: 999px;
  }
  .amount {
    font-family: var(--font-head);
    font-size: 2.1rem;
    color: var(--teal);
  }
  .tier p {
    font-size: 13.5px;
    color: var(--muted);
    line-height: 1.6;
    flex: 1;
    font-weight: 300;
  }
  .tier-btn {
    margin-top: 0.5rem;
    text-align: center;
    font-family: var(--font-head);
    font-size: 11.5px;
    letter-spacing: 0.06em;
    color: var(--teal);
    border: 1px solid var(--border-teal);
    border-radius: var(--radius-sm);
    padding: 10px;
    transition: background 0.25s var(--ease), color 0.25s var(--ease);
  }
  .tier-btn:hover { background: var(--teal); color: var(--navy); }
  .tier.featured .tier-btn {
    background: linear-gradient(180deg, var(--teal-soft), var(--teal));
    color: var(--navy);
    border: none;
  }

  .cta-box {
    margin-top: 2rem;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border-teal);
    border-radius: 20px;
    background: linear-gradient(180deg, var(--navy-card-hi), var(--navy-card));
    padding: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
  .cta-glow {
    position: absolute;
    inset: -50% -10% auto auto;
    width: 60%;
    height: 200%;
    background: radial-gradient(40% 40% at 100% 0%, var(--teal-glow), transparent 70%);
    pointer-events: none;
  }
  .cta-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-head);
    font-size: 11px;
    color: var(--teal);
    letter-spacing: 0.1em;
    margin-bottom: 0.6rem;
  }
  .cta-tag .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--teal);
    animation: pulse 2.4s infinite;
  }
  .cta-text { position: relative; }
  .cta-text h3 {
    font-family: var(--font-head);
    font-size: 17px;
    margin-bottom: 0.5rem;
    color: var(--white);
  }
  .cta-text p {
    font-size: 13.5px;
    color: var(--muted);
    line-height: 1.7;
    max-width: 460px;
    font-weight: 300;
  }

  .btn-donate {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: var(--font-head);
    font-size: 12.5px;
    letter-spacing: 0.06em;
    color: var(--navy);
    background: linear-gradient(180deg, var(--teal-soft), var(--teal));
    padding: 15px 30px;
    border-radius: var(--radius-sm);
    white-space: nowrap;
    flex-shrink: 0;
    box-shadow: 0 10px 26px -10px var(--teal-glow-strong);
    transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
  }
  .btn-donate:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px -12px var(--teal-glow-strong);
  }
  .btn-donate:hover .btn-arrow { transform: translateX(3px); }

  .other-ways {
    margin-top: 2rem;
    text-align: center;
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
    max-width: 560px;
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
