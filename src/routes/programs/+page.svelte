<script>
  import { reveal } from '$lib/motion.js';
  import { SIGNUP_FORM_URL } from '$lib/config.js';
  import DocsLayout from '$lib/components/DocsLayout.svelte';

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

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

<DocsLayout title="Programs">
  <p class="intro">
    Every program is free, beginner-friendly, and built for 3rd to 6th graders with zero prior
    experience. No laptop or supplies required. We bring everything.
  </p>

  <div class="list">
    {#each programs as p, i (p.title)}
      <article class="card item" class:open={p.status === 'open'} use:reveal>
        <div class="item-index">{String(i + 1).padStart(2, '0')}</div>
        <div class="info">
          <h3 id={slug(p.title)}>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
        {#if p.link}
          <a href={p.link} target="_blank" rel="noopener" class="btn-primary signup">
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
</DocsLayout>

<style>
  .intro {
    color: var(--muted) !important;
    font-size: 16px;
    line-height: 1.8;
    max-width: 580px;
    margin-bottom: 2.5rem !important;
  }

  .list { display: flex; flex-direction: column; gap: 1rem; }

  .item {
    display: flex;
    align-items: flex-start;
    gap: 1.4rem;
    padding: 1.6rem 1.8rem;
    border-left: 3px solid var(--border);
  }
  .item.open { border-left-color: var(--accent); }

  .item-index {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--accent);
    opacity: 0.7;
    flex-shrink: 0;
    margin-top: 4px;
    letter-spacing: 0.05em;
  }

  .info { flex: 1; }
  .info h3 {
    font-size: 1.15rem;
    margin: 0 0 0.5rem !important;
    color: var(--text-strong);
    letter-spacing: -0.01em;
  }
  .info p { font-size: 14px; color: var(--muted); line-height: 1.7; max-width: 600px; margin: 0 !important; }

  .signup { flex-shrink: 0; margin-top: 2px; }

  .badge {
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 7px 14px;
    border-radius: 999px;
    white-space: nowrap;
    flex-shrink: 0;
    margin-top: 4px;
    border: 1px solid var(--border-strong);
    color: var(--muted);
  }
  .badge.request { color: var(--accent); border-color: var(--accent); }

  .note { margin-top: 2.5rem; text-align: center; }
  .note p { font-size: 14.5px; color: var(--muted); }

  @media (max-width: 640px) {
    .item { flex-wrap: wrap; gap: 1rem; padding: 1.4rem 1.4rem; }
    .signup, .badge { order: 3; }
  }
</style>
