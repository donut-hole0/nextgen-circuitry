<script>
  import { reveal } from '$lib/motion.js';
  import DocsLayout from '$lib/components/DocsLayout.svelte';
</script>

<svelte:head>
  <title>About — NextGen Circuitry</title>
  <meta name="description" content="NextGen Circuitry is a student-run program bringing free, hands-on electronics and coding education to kids in San Diego." />
</svelte:head>

<DocsLayout title="About us">
  <p class="lead">
    NextGen Circuitry is a student-run program teaching elementary and middle schoolers real
    electronics — circuits, sensors, and Arduino code — at no cost to families. It started
    because the kids who most needed the chance were the least likely to get it.
  </p>

  <h2 id="our-mission">Our mission</h2>
  <p>
    Every session, every component, and every kit is completely free. We built this for kids
    in underserved communities who rarely get hands-on STEM access. Cost should never be the
    reason a kid never tries.
  </p>

  <h2 id="how-we-teach">How we teach</h2>
  <p>
    No textbooks, no lectures, no passive screens. Students wire real circuits, program real
    Arduinos, and debug real problems. The fastest way to learn engineering is to do
    engineering — so that is what we do, from the very first session.
  </p>

  <h2 id="who-we-are">Who we are</h2>
  <p>
    We are high schoolers from Westview’s Circuitry Club. We taught ourselves to build, and
    now we are passing that down to the kids coming up behind us. We are not a company, and
    we are not in this for a résumé line. We just remember wanting to build something and
    not knowing where to start.
  </p>

  <h2 id="where-we-work">Where we work</h2>
  <p>
    We operate out of the Rancho Peñasquitos library and partner with local schools and
    libraries to bring engineering to kids in our own neighborhood.
  </p>

  <div class="band" use:reveal={{ children: true }}>
    <div class="band-item"><div class="band-num">$0</div><span>Cost to every student we have ever taught</span></div>
    <div class="band-item"><div class="band-num">100%</div><span>Of donations go straight to hardware</span></div>
    <div class="band-item"><div class="band-num">Local</div><span>Built in San Diego, for San Diego kids</span></div>
  </div>

  <h2 id="next-steps">Next steps</h2>
  <div class="next-grid">
    <a class="next-card" href="/programs" use:reveal>
      <h3>Programs <span class="arr">→</span></h3>
      <p>See what we currently offer and how to sign your kid up.</p>
    </a>
    <a class="next-card" href="/support" use:reveal>
      <h3>Support us <span class="arr">→</span></h3>
      <p>Help us keep every seat free with a donation or partnership.</p>
    </a>
  </div>
</DocsLayout>

<style>
  .lead { font-size: 17px !important; color: var(--text) !important; line-height: 1.65 !important; margin-bottom: 2rem !important; }

  .band {
    margin: 1.6rem 0 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .band-item { background: var(--surface); padding: 1.6rem 1.2rem; text-align: center; }
  .band-num {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 1.8rem;
    color: var(--accent);
    letter-spacing: -0.02em;
    margin-bottom: 0.4rem;
  }
  .band-item > span { font-size: 13px; color: var(--muted); line-height: 1.5; display: block; max-width: 200px; margin: 0 auto; }

  .next-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.5rem; }
  .next-card {
    display: block;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.3rem 1.5rem;
    background: var(--surface);
    color: var(--text);
    transition: border-color 0.15s var(--ease);
  }
  .next-card:hover { border-color: var(--text-strong); }
  .next-card h3 { font-size: 16px !important; font-weight: 600; margin: 0 0 0.3rem !important; color: var(--text-strong); display: flex; align-items: baseline; gap: 0.4rem; }
  .next-card .arr { color: var(--muted); transition: transform 0.15s var(--ease); }
  .next-card:hover .arr { transform: translateX(3px); color: var(--text-strong); }
  .next-card p { font-size: 14px; color: var(--muted); margin: 0 !important; line-height: 1.55 !important; }

  @media (max-width: 640px) {
    .band { grid-template-columns: 1fr; }
    .next-grid { grid-template-columns: 1fr; }
  }
</style>
