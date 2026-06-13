<script>
  import { reveal, linesUp, spotlight, magnetic, countUp } from '$lib/motion.js';

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

<main class="section-wrap page-top">
  <div class="intro-grid">
    <div>
      <div class="section-label">About us</div>
      <h2 class="h2" use:linesUp>
        <span class="line"><span class="ln">We teach electronics</span></span>
        <span class="line"><span class="ln">the way we wish we</span></span>
        <span class="line"><span class="ln">had <span class="accent">learned it.</span></span></span>
      </h2>
    </div>
    <p class="intro" use:reveal={{ delay: 0.2 }}>
      NextGen Circuitry started with a simple frustration. Real engineering felt locked behind
      expensive camps and gatekept clubs. So a group of students at Westview High School decided
      to tear that gate down, and teach younger kids to build, for free.
    </p>
  </div>

  <div class="grid">
    {#each values as v (v.title)}
      <article class="card value-card" use:spotlight use:reveal>
        <span class="kicker">{v.kicker}</span>
        <h3>{v.title}</h3>
        <p>{v.desc}</p>
      </article>
    {/each}
  </div>

  <div class="band" use:reveal={{ children: true }}>
    <div class="band-item">
      <div class="band-num"><span use:countUp={{ to: 0, prefix: '$' }}>$0</span></div>
      <span>Cost to every student we have ever taught</span>
    </div>
    <div class="band-item">
      <div class="band-num"><span use:countUp={{ to: 100, suffix: '%' }}>100%</span></div>
      <span>Of donations go straight to hardware</span>
    </div>
    <div class="band-item">
      <div class="band-num">Local</div>
      <span>Built in San Diego, for San Diego kids</span>
    </div>
  </div>

  <div class="closing">
    <p use:linesUp={{ stagger: 0.1 }}>
      <span class="line"><span class="ln">We are not a company, and we are not</span></span>
      <span class="line"><span class="ln">in this for a r&eacute;sum&eacute; line. We just</span></span>
      <span class="line"><span class="ln">remember wanting to build something</span></span>
      <span class="line"><span class="ln">and not knowing where to start.</span></span>
    </p>
    <a href="/programs" class="btn-primary" use:magnetic use:reveal={{ delay: 0.3 }}>See our programs <span class="btn-arrow">→</span></a>
  </div>
</main>

<style>
  .page-top { padding-top: 11rem; }

  .intro-grid {
    display: grid;
    grid-template-columns: 1.25fr 0.9fr;
    gap: 3rem;
    align-items: end;
    margin-bottom: 3.5rem;
  }
  .intro {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.8;
    font-weight: 300;
    max-width: 440px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.1rem;
  }
  .kicker {
    font-family: var(--font-head);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--teal);
  }
  .value-card { display: flex; flex-direction: column; gap: 0.7rem; }
  .value-card h3 {
    font-family: var(--font-head);
    font-size: 1.25rem;
    color: var(--white);
    letter-spacing: -0.01em;
  }
  .value-card p { font-size: 14px; color: var(--muted); line-height: 1.75; font-weight: 300; }

  .band {
    margin-top: 1.1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.1rem;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    border: 1px solid var(--border-teal);
    background: linear-gradient(180deg, rgba(0,229,176,0.06), transparent);
  }
  .band-item { text-align: center; }
  .band-num {
    font-family: var(--font-head);
    font-size: 2.2rem;
    color: var(--teal);
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
    margin-top: 4.5rem;
    text-align: center;
    max-width: 720px;
    margin-inline: auto;
  }
  .closing p {
    font-family: var(--font-head);
    font-size: clamp(1.2rem, 2.6vw, 1.8rem);
    color: var(--white);
    line-height: 1.32;
    letter-spacing: -0.02em;
    margin-bottom: 2rem;
  }

  @media (max-width: 820px) {
    .intro-grid { grid-template-columns: 1fr; gap: 1.2rem; align-items: start; }
    .grid { grid-template-columns: 1fr; }
    .band { grid-template-columns: 1fr; gap: 1.8rem; }
  }
</style>
