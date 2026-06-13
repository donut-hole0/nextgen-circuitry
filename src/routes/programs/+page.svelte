<script>
  import { reveal, linesUp, spotlight, magnetic } from '$lib/motion.js';
  import { SIGNUP_FORM_URL } from '$lib/config.js';

  const programs = [
    {
      title: 'Summer Camp, 6-Day Intensive',
      desc: 'Our flagship. Six hands-on sessions covering circuits, Arduino programming, servos, buzzers, and ultrasonic sensors. Students leave with a working project they designed and built themselves.',
      status: 'open',
      badge: 'Enrolling',
      link: SIGNUP_FORM_URL
    },
    {
      title: 'TinkerCAD Circuit Design Workshop',
      desc: 'An intro to virtual circuit simulation in TinkerCAD. Kids build and test circuits right in the browser, perfect for trying ideas before touching real hardware.',
      status: 'soon',
      badge: 'Coming soon',
      link: null
    },
    {
      title: 'Arduino Basics',
      desc: 'Write your first real code and watch hardware respond to it. LEDs, sensors, buttons. If it blinks or beeps, we will build it together, line by line.',
      status: 'soon',
      badge: 'Coming soon',
      link: null
    },
    {
      title: 'Science Fair Mentorship',
      desc: 'Working on an electronics or coding project for a local science fair? We pair students with mentors and lend the hardware to bring the idea to life.',
      status: 'request',
      badge: 'By request',
      link: null
    }
  ];
</script>

<svelte:head>
  <title>Programs - NextGen Circuitry</title>
  <meta name="description" content="Free, beginner-friendly electronics and coding programs for 3rd to 6th graders: summer camp, Arduino basics, TinkerCAD, and science fair mentorship." />
</svelte:head>

<main class="section-wrap page-top">
  <div class="head">
    <div class="section-label">Programs</div>
    <h2 class="h2" use:linesUp>
      <span class="line"><span class="ln">What we offer.</span></span>
    </h2>
    <p class="intro" use:reveal={{ delay: 0.2 }}>
      Every program is free, beginner-friendly, and built for 3rd to 6th graders with zero prior
      experience. No laptop or supplies required. We bring everything.
    </p>
  </div>

  <div class="list">
    {#each programs as p, i (p.title)}
      <article class="card item" class:open={p.status === 'open'} use:spotlight use:reveal>
        <div class="item-index">{String(i + 1).padStart(2, '0')}</div>
        <div class="info">
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
        {#if p.link}
          <a href={p.link} target="_blank" rel="noopener" class="badge signup" use:magnetic={{ strength: 0.2 }}>
            Sign up <span class="btn-arrow">→</span>
          </a>
        {:else}
          <span class="badge {p.status}">{p.badge}</span>
        {/if}
      </article>
    {/each}
  </div>

  <div class="note" use:reveal>
    <p>
      Do not see the right fit, or want us to run a session at your school or library?
      <a href="/contact">Reach out.</a> We love new partners.
    </p>
  </div>
</main>

<style>
  .page-top { padding-top: 11rem; }
  .head { margin-bottom: 3rem; }
  .intro {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.8;
    max-width: 580px;
    font-weight: 300;
    margin-top: 1rem;
  }

  .list { display: flex; flex-direction: column; gap: 1.1rem; }

  .item {
    display: flex;
    align-items: flex-start;
    gap: 1.6rem;
    border-left: 2px solid var(--border);
    padding: 2rem 2.2rem;
  }
  .item.open { border-left-color: var(--teal); }

  .item-index {
    font-family: var(--font-head);
    font-size: 13px;
    color: var(--teal);
    opacity: 0.55;
    flex-shrink: 0;
    margin-top: 4px;
    letter-spacing: 0.05em;
  }

  .info { flex: 1; }
  .info h3 {
    font-family: var(--font-head);
    font-size: 1.2rem;
    margin-bottom: 0.55rem;
    color: var(--white);
    letter-spacing: -0.01em;
  }
  .info p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
    max-width: 600px;
    font-weight: 300;
  }

  .badge {
    font-family: var(--font-head);
    font-size: 10.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 7px 14px;
    border-radius: 999px;
    white-space: nowrap;
    flex-shrink: 0;
    margin-top: 4px;
    border: 1px solid var(--border);
    color: var(--muted);
  }
  .badge.request { color: var(--teal-soft); border-color: var(--border-teal); }

  .badge.signup {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--navy);
    background: linear-gradient(180deg, var(--teal-soft), var(--teal));
    border: none;
    box-shadow: 0 8px 20px -8px var(--teal-glow-strong);
  }

  .note { margin-top: 3rem; text-align: center; }
  .note p { font-size: 14.5px; color: var(--muted); }
  .note a { color: var(--teal); border-bottom: 1px solid var(--border-teal); }
  .note a:hover { border-color: var(--teal); }

  @media (max-width: 640px) {
    .item { flex-wrap: wrap; gap: 1rem; padding: 1.6rem 1.5rem; }
    .badge.signup, .badge { order: 3; }
  }
</style>
