<script>
  import { reveal } from '$lib/motion.js';
  import DocsLayout from '$lib/components/DocsLayout.svelte';
  import { DONATE_URL, CONTACT_EMAIL } from '$lib/config.js';

  const tiers = [
    { amount: '$10', label: 'Covers the components one student uses for a full session.' },
    { amount: '$25', label: 'Funds an Arduino kit that gets reused across many workshops.' },
    { amount: '$50', label: 'Supplies an entire table of students through summer camp.' }
  ];
</script>

<svelte:head>
  <title>Support us — NextGen Circuitry</title>
  <meta name="description" content="Help keep NextGen Circuitry free. Every dollar funds hardware and components so kids can keep building at no cost." />
</svelte:head>

<DocsLayout title="Support us">
  <p class="lead">
    NextGen Circuitry is free for every kid we work with, and we intend to keep it that way.
    Your donation buys the resistors, wires, sensors, and Arduino kits that end up in a
    child’s hands. No salaries, no overhead, no middlemen.
  </p>

  <h2 id="where-the-money-goes">Where the money goes</h2>
  <p>
    We are a student-run program with no overhead, so 100% of donations fund the materials
    and equipment used directly in our programs. Components get reused across many cohorts,
    which means small gifts go a long way.
  </p>

  <h2 id="give-by-amount">Give by amount</h2>
  <p>A rough sense of what each contribution covers, if it helps you decide:</p>
  <div class="tiers">
    {#each tiers as t (t.amount)}
      <div class="tier" use:reveal>
        <div class="tier-amt">{t.amount}</div>
        <p>{t.label}</p>
      </div>
    {/each}
  </div>
  <p class="cta-row">
    <a href={DONATE_URL} target="_blank" rel="noopener" class="btn-primary">Donate on GoFundMe</a>
    <span class="cta-note">Quick, secure, and tax-trackable.</span>
  </p>

  <h2 id="other-ways">Other ways to help</h2>
  <p>
    Cannot give right now? Sharing our GoFundMe, donating gently-used hardware (Arduinos,
    breadboards, components, kits), or hosting a session at your school helps just as much.
    <a href="mailto:{CONTACT_EMAIL}">Email us</a> to chip in another way.
  </p>
</DocsLayout>

<style>
  .lead { font-size: 17px !important; color: var(--text) !important; line-height: 1.65 !important; margin-bottom: 2rem !important; }

  .tiers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1rem 0 1.5rem;
  }
  .tier {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.2rem 1.3rem;
    background: var(--surface);
  }
  .tier-amt {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 1.6rem;
    color: var(--text-strong);
    letter-spacing: -0.02em;
    margin-bottom: 0.4rem;
  }
  .tier p { font-size: 14px !important; color: var(--muted) !important; line-height: 1.55 !important; margin: 0 !important; }

  .cta-row { display: flex !important; flex-wrap: wrap; gap: 0.85rem; align-items: center; margin-top: 0.5rem !important; }
  .cta-note { font-size: 13px; color: var(--muted-dim); }

  @media (max-width: 640px) {
    .tiers { grid-template-columns: 1fr; }
  }
</style>
