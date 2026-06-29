<script>
  import { reveal } from '$lib/motion.js';
  import DocsLayout from '$lib/components/DocsLayout.svelte';

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const values = [
    {
      kicker: 'Mission',
      title: 'Free, no asterisks',
      desc: 'Every session, every component, every kit is completely free. Built for kids in underserved communities who rarely get hands-on STEM access. Cost should never be the reason a kid never tries.'
    },
    {
      kicker: 'Method',
      title: 'Learn by building',
      desc: 'No textbooks, no lectures, no passive screens. Students wire real circuits, program real Arduinos, and debug real problems. The fastest way to learn engineering is to do engineering.'
    },
    {
      kicker: 'Who we are',
      title: 'Run by students',
      desc: 'We are high schoolers from Westview’s Circuitry Club. We taught ourselves to build, and now we are passing that down to the kids coming up behind us.'
    },
    {
      kicker: 'Impact',
      title: 'Rooted in community',
      desc: 'We operate out of the Rancho Peñasquitos library and partner with local schools and libraries to bring engineering to kids in our own neighborhood.'
    }
  ];
</script>

<svelte:head>
  <title>About - NextGen Circuitry</title>
  <meta name="description" content="NextGen Circuitry is a student-run program bringing free, hands-on electronics and coding education to kids in San Diego." />
</svelte:head>

<DocsLayout title="About us">
  <p class="lead">
    NextGen Circuitry started with a simple frustration. Real engineering felt locked behind
    expensive camps and gatekept clubs. So a group of students at Westview High School decided
    to tear that gate down, and teach younger kids to build, for free.
  </p>

  <div class="grid">
    {#each values as v (v.title)}
      <article class="card value-card" use:reveal>
        <span class="kicker">{v.kicker}</span>
        <h3 id={slug(v.title)}>{v.title}</h3>
        <p>{v.desc}</p>
      </article>
    {/each}
  </div>

  <div class="band" use:reveal={{ children: true }}>
    <div class="band-item">
      <div class="band-num">$0</div>
      <span>Cost to every student we have ever taught</span>
    </div>
    <div class="band-item">
      <div class="band-num">100%</div>
      <span>Of donations go straight to hardware</span>
    </div>
    <div class="band-item">
      <div class="band-num">Local</div>
      <span>Built in San Diego, for San Diego kids</span>
    </div>
  </div>

  <div class="closing">
    <p>
      We are not a company, and we are not in this for a r&eacute;sum&eacute; line. We just
      remember wanting to build something and not knowing where to start.
    </p>
    <a href="/programs" class="btn-primary" use:reveal>See our programs <span class="btn-arrow">→</span></a>
  </div>
</DocsLayout>

<style>
  .lead {
    color: var(--muted) !important;
    font-size: 17px;
    line-height: 1.8;
    margin-bottom: 2.5rem !important;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }
  .value-card { display: flex; flex-direction: column; gap: 0.6rem; }
  .value-card h3 {
    font-size: 1.2rem;
    color: var(--text-strong);
    letter-spacing: -0.01em;
    margin: 0 !important;
  }
  .value-card p { font-size: 14px; color: var(--muted); line-height: 1.75; margin: 0 !important; }

  .band {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--accent-soft);
  }
  .band-item { text-align: center; }
  .band-num {
    font-family: var(--font-head);
    font-size: 2.2rem;
    color: var(--accent);
    margin-bottom: 0.5rem;
    letter-spacing: -0.03em;
  }
  .band-item > span {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.5;
    display: block;
    max-width: 220px;
    margin: 0 auto;
  }

  .closing {
    margin-top: 3.5rem;
    text-align: center;
  }
  .closing p {
    font-family: var(--font-head);
    font-size: clamp(1.2rem, 2.6vw, 1.7rem);
    color: var(--text-strong) !important;
    line-height: 1.4;
    letter-spacing: -0.02em;
    margin-bottom: 1.8rem !important;
  }

  @media (max-width: 540px) {
    .band { grid-template-columns: 1fr; gap: 1.8rem; }
  }
</style>
