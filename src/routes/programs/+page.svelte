<script>
  import { reveal } from '$lib/actions/reveal.js';
  import { SIGNUP_FORM_URL } from '$lib/config.js';

  const programs = [
    {
      icon: '◈',
      title: 'Summer Camp — 6-Day Intensive',
      desc: 'Our flagship. Six hands-on sessions covering circuits, Arduino programming, servos, buzzers, and ultrasonic sensors. Students leave with a working project they designed and built themselves.',
      status: 'open',
      badge: 'ENROLLING',
      link: SIGNUP_FORM_URL
    },
    {
      icon: '⌬',
      title: 'TinkerCAD Circuit Design Workshop',
      desc: 'An intro to virtual circuit simulation in TinkerCAD. Kids build and test circuits right in the browser — perfect for trying ideas before touching real hardware.',
      status: 'soon',
      badge: 'COMING SOON',
      link: null
    },
    {
      icon: '⌑',
      title: 'Arduino Basics',
      desc: "Write your first real code and watch hardware respond to it. LEDs, sensors, buttons — if it blinks or beeps, we'll build it together, line by line.",
      status: 'soon',
      badge: 'COMING SOON',
      link: null
    },
    {
      icon: '◎',
      title: 'Science Fair Mentorship',
      desc: 'Working on an electronics or coding project for a local science fair? We pair students with mentors and lend the hardware to bring the idea to life.',
      status: 'request',
      badge: 'BY REQUEST',
      link: null
    }
  ];
</script>

<svelte:head>
  <title>Programs — NextGen Circuitry</title>
  <meta name="description" content="Free, beginner-friendly electronics and coding programs for 3rd–6th graders — summer camp, Arduino basics, TinkerCAD, and science fair mentorship." />
</svelte:head>

<main class="section-wrap page-enter">
  <div use:reveal>
    <div class="section-label">// Programs</div>
    <div class="divider"></div>
    <h2>What we offer.</h2>
    <p class="intro">
      Every program is free, beginner-friendly, and built for 3rd–6th graders with zero
      prior experience. No laptop or supplies required — we bring everything.
    </p>
  </div>

  <div class="list">
    {#each programs as p, i}
      <div class="card item" class:open={p.status === 'open'} use:reveal={{ delay: i * 80 }}>
        <div class="item-icon">{p.icon}</div>
        <div class="info">
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
        {#if p.link}
          <a href={p.link} target="_blank" rel="noopener" class="badge signup">
            SIGN UP <span class="btn-arrow">→</span>
          </a>
        {:else}
          <span class="badge {p.status}">{p.badge}</span>
        {/if}
      </div>
    {/each}
  </div>

  <div class="note" use:reveal>
    <p>
      Don't see the right fit, or want us to run a session at your school or library?
      <a href="/contact">Reach out</a> — we love new partners.
    </p>
  </div>
</main>

<style>
  h2 {
    font-size: clamp(1.6rem, 3.4vw, 2rem);
    margin-bottom: 1.25rem;
    line-height: 1.2;
    color: var(--white);
  }
  .intro {
    color: var(--muted);
    font-size: 16.5px;
    line-height: 1.75;
    max-width: 600px;
    font-weight: 300;
  }

  .list {
    margin-top: 2.75rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    border-left: 3px solid var(--border);
    padding: 1.6rem 1.75rem;
  }
  .item.open { border-left-color: var(--teal); }

  .item-icon {
    font-size: 1.5rem;
    color: var(--teal);
    line-height: 1;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .info { flex: 1; }
  .info h3 {
    font-family: var(--font-head);
    font-size: 15.5px;
    margin-bottom: 0.45rem;
    color: var(--white);
  }
  .info p {
    font-size: 13.5px;
    color: var(--muted);
    line-height: 1.65;
    max-width: 560px;
    font-weight: 300;
  }

  .badge {
    font-family: var(--font-head);
    font-size: 10px;
    letter-spacing: 0.08em;
    padding: 5px 11px;
    border-radius: 999px;
    white-space: nowrap;
    flex-shrink: 0;
    margin-top: 2px;
    border: 1px solid var(--border);
    color: var(--muted);
  }
  .badge.soon { color: var(--muted); }
  .badge.request { color: var(--teal-soft); border-color: var(--border-teal); }

  .badge.signup {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--navy);
    background: linear-gradient(180deg, var(--teal-soft), var(--teal));
    border: none;
    box-shadow: 0 6px 16px -8px var(--teal-glow-strong);
    transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
  }
  .badge.signup:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 22px -8px var(--teal-glow-strong);
  }

  .note {
    margin-top: 2.5rem;
    text-align: center;
  }
  .note p { font-size: 14px; color: var(--muted); }
  .note a { color: var(--teal); border-bottom: 1px solid var(--border-teal); }
  .note a:hover { border-color: var(--teal); }

  @media (max-width: 600px) {
    .item { flex-wrap: wrap; }
    .badge:not(.item-icon) { order: 3; }
  }
</style>
