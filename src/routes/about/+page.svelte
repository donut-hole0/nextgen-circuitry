<script>
  import { reveal } from '$lib/actions/reveal.js';

  const values = [
    {
      tag: '01 // MISSION',
      title: 'Free, no asterisks',
      desc: 'Every session, every component, every kit is completely free — built for kids in underserved communities who rarely get hands-on STEM access. Cost should never be the reason a kid never tries.'
    },
    {
      tag: '02 // METHOD',
      title: 'Learn by building',
      desc: 'No textbooks, no lectures, no passive screens. Students wire real circuits, program real Arduinos, and debug real problems. The fastest way to learn engineering is to do engineering.'
    },
    {
      tag: '03 // WHO WE ARE',
      title: 'Run by students',
      desc: "We're high schoolers from Westview's Circuitry Club. We taught ourselves to build — now we're passing that down to the kids coming up behind us."
    },
    {
      tag: '04 // IMPACT',
      title: 'Rooted in community',
      desc: 'We operate out of the Rancho Peñasquitos library and partner with local schools and libraries to bring engineering to kids in our own neighborhood.'
    }
  ];
</script>

<svelte:head>
  <title>About — NextGen Circuitry</title>
  <meta name="description" content="NextGen Circuitry is a student-run nonprofit-style program bringing free, hands-on electronics and coding education to kids in San Diego." />
</svelte:head>

<main class="section-wrap page-enter">
  <div use:reveal>
    <div class="section-label">// About us</div>
    <div class="divider"></div>
    <h2>We teach electronics<br />the way we wish we'd <span>learned it.</span></h2>
    <p class="intro">
      NextGen Circuitry started with a simple frustration: real engineering felt locked
      behind expensive camps and gatekept clubs. So a group of students at Westview High
      School decided to tear that gate down — and teach younger kids to build, for free.
    </p>
  </div>

  <div class="grid">
    {#each values as v, i}
      <div class="card value-card" use:reveal={{ delay: i * 80 }}>
        <div class="card-tag">{v.tag}</div>
        <h3>{v.title}</h3>
        <p>{v.desc}</p>
      </div>
    {/each}
  </div>

  <div class="band" use:reveal>
    <div class="band-item">
      <div class="band-num">$0</div>
      <span>Cost to every student we've ever taught</span>
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

  <div class="closing" use:reveal>
    <p>
      We're not a company and we're not in this for a résumé line. We're students who
      remember exactly what it felt like to want to build something and not know where to
      start — and we'd rather no kid feel that way again.
    </p>
    <a href="/programs" class="btn-primary">SEE OUR PROGRAMS <span class="btn-arrow">→</span></a>
  </div>
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
    max-width: 640px;
    font-weight: 300;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin-top: 2.75rem;
  }

  .card-tag {
    font-family: var(--font-head);
    font-size: 11px;
    color: var(--teal);
    margin-bottom: 0.85rem;
    letter-spacing: 0.1em;
  }
  .value-card h3 {
    font-family: var(--font-head);
    font-size: 16px;
    margin-bottom: 0.6rem;
    color: var(--white);
  }
  .value-card p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
    font-weight: 300;
  }

  .band {
    margin-top: 2.75rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 2rem;
    border-radius: var(--radius);
    border: 1px solid var(--border-teal);
    background: linear-gradient(180deg, rgba(0,229,176,0.05), transparent);
  }
  .band-item { text-align: center; }
  .band-num {
    font-family: var(--font-head);
    font-size: 2rem;
    color: var(--teal);
    margin-bottom: 0.4rem;
  }
  .band-item span {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.5;
    display: block;
    max-width: 220px;
    margin: 0 auto;
  }

  .closing {
    margin-top: 3rem;
    text-align: center;
    max-width: 620px;
    margin-inline: auto;
  }
  .closing p {
    font-size: 16px;
    color: var(--white);
    line-height: 1.75;
    margin-bottom: 1.75rem;
    font-weight: 300;
  }

  @media (max-width: 720px) {
    .grid { grid-template-columns: 1fr; }
    .band { grid-template-columns: 1fr; gap: 1.5rem; }
  }
</style>
