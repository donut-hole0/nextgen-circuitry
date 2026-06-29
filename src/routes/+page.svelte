<script>
  import { reveal } from '$lib/motion.js';
  import { SIGNUP_FORM_URL } from '$lib/config.js';

  const build = [
    {
      kicker: 'Circuits',
      title: 'Real hardware, day one',
      desc: 'Breadboards, resistors, LEDs, and sensors. Kids wire up working circuits with their own hands, not on a screen.'
    },
    {
      kicker: 'Code',
      title: 'Their first real program',
      desc: 'Arduino code that controls real hardware. Make a light blink, a buzzer sing, a motor turn.'
    },
    {
      kicker: 'Motion',
      title: 'Things that sense and react',
      desc: 'Ultrasonic sensors, servos, and buttons that respond to the world. The building blocks of robots.'
    },
    {
      kicker: 'Pride',
      title: 'A project they keep',
      desc: 'Every kid leaves with something they designed and built, and the belief that they can build the next one too.'
    }
  ];

  const steps = [
    { n: '01', title: 'Reserve a free seat', desc: 'No experience and no cost. Sign up and we save your kid a spot at the bench.' },
    { n: '02', title: 'Come build with us', desc: 'Six guided sessions where students learn by doing, with mistakes encouraged and mentors at every table.' },
    { n: '03', title: 'Walk out a maker', desc: 'They leave with a finished project and a completely new way of seeing the technology around them.' }
  ];
</script>

<svelte:head>
  <title>NextGen Circuitry - Free electronics and coding for kids</title>
  <meta name="description" content="NextGen Circuitry is a free, student-run program teaching elementary and middle schoolers real electronics, circuits, and Arduino coding in San Diego." />
</svelte:head>

<section class="hero">
  <div class="hero-inner">
    <div class="eyebrow" use:reveal>Free electronics and coding · San Diego</div>

    <h1 class="display" use:reveal={{ delay: 0.05 }}>
      Building the next<br />generation of <span class="accent">makers.</span>
    </h1>

    <p class="lead" use:reveal={{ delay: 0.1 }}>
      We give elementary and middle schoolers hands-on access to real engineering: circuits,
      sensors, and Arduino code. Completely free, because curiosity should never carry a price tag.
    </p>

    <div class="hero-cta" use:reveal={{ delay: 0.15 }}>
      <a href={SIGNUP_FORM_URL} target="_blank" rel="noopener" class="btn-primary">
        Join a program <span class="btn-arrow">→</span>
      </a>
      <a href="/about" class="btn-secondary">Our story</a>
    </div>

    <div class="stats" use:reveal={{ children: true, delay: 0.2 }}>
      <div class="stat">
        <div class="stat-num">100%</div>
        <div class="stat-label">free for every student</div>
      </div>
      <div class="stat">
        <div class="stat-num">6</div>
        <div class="stat-label">day hands-on build camp</div>
      </div>
      <div class="stat">
        <div class="stat-num">3-6</div>
        <div class="stat-label">grades welcome, zero prior skill</div>
      </div>
    </div>
  </div>
</section>

<!-- What kids build -->
<section class="section-wrap build-section">
  <div class="build-head">
    <h2 class="h2" use:reveal>
      Not slideshows.<br /><span class="accent">Real hardware</span> in real hands.
    </h2>
    <p use:reveal={{ delay: 0.1 }}>
      Most intro-to-STEM stops at watching. We put the components in kids' hands on the first
      day and help them build something that lights up, beeps, and moves.
    </p>
  </div>

  <div class="bento">
    {#each build as item (item.title)}
      <article class="card bento-card" use:reveal>
        <span class="kicker">{item.kicker}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </article>
    {/each}
  </div>
</section>

<!-- How it works -->
<section class="how">
  <div class="how-grid">
    <div class="how-sticky">
      <div class="section-label">How it works</div>
      <h2 class="h2" use:reveal>From zero to maker in three steps.</h2>
      <p use:reveal={{ delay: 0.1 }}>
        No catch and no fine print. The whole path from signing up to taking home a finished
        build is designed to be simple for families and joyful for kids.
      </p>
    </div>

    <div class="how-steps">
      {#each steps as step (step.n)}
        <div class="step card" use:reveal>
          <div class="step-n">{step.n}</div>
          <div class="step-body">
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Mission line -->
<section class="section-wrap quote-section">
  <blockquote class="quote" use:reveal>
    We are students who fell in love with building things, and we kept meeting kids
    who never got the chance. <span class="accent">So we decided to be that chance.</span>
  </blockquote>
  <cite use:reveal={{ delay: 0.1 }}>The students of Westview Circuitry Club</cite>
</section>

<style>
  /* ---------- HERO ---------- */
  .hero {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 88vh;
  }
  .hero-inner {
    max-width: var(--maxw);
    width: 100%;
    margin: 0 auto;
    padding: 7rem 1.5rem 4rem;
  }
  .eyebrow { margin-bottom: 1.8rem; }

  h1.display { margin-bottom: 1.8rem; }

  .lead {
    font-size: clamp(16px, 1.9vw, 19px);
    color: var(--muted);
    line-height: 1.7;
    max-width: 600px;
    margin-bottom: 2.4rem;
  }
  .hero-cta { display: flex; flex-wrap: wrap; gap: 0.9rem; align-items: center; }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 3rem;
    margin-top: 4rem;
    padding-top: 2.2rem;
    border-top: 1px solid var(--border);
    width: fit-content;
  }
  .stat-num {
    font-family: var(--font-head);
    font-size: clamp(2rem, 4vw, 2.8rem);
    color: var(--accent);
    line-height: 1;
    letter-spacing: -0.03em;
  }
  .stat-label {
    font-size: 12.5px;
    color: var(--muted);
    margin-top: 8px;
    max-width: 130px;
    line-height: 1.45;
  }

  /* ---------- BUILD / BENTO ---------- */
  .build-head {
    display: grid;
    grid-template-columns: 1.3fr 0.9fr;
    gap: 2.5rem;
    align-items: end;
    margin-bottom: 3rem;
  }
  .build-head p {
    color: var(--muted);
    font-size: 15px;
    line-height: 1.75;
    max-width: 380px;
  }

  .bento {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }
  .bento-card {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    min-height: 200px;
    justify-content: flex-end;
    padding: 2rem;
  }
  .bento-card h3 {
    font-size: clamp(1.05rem, 1.6vw, 1.3rem);
    color: var(--text-strong);
    letter-spacing: -0.01em;
  }
  .bento-card p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.65;
  }

  /* ---------- HOW IT WORKS ---------- */
  .how {
    border-block: 1px solid var(--border);
    background: var(--surface-2);
  }
  .how-grid {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 6rem 1.5rem;
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 4rem;
  }
  .how-sticky {
    position: sticky;
    top: calc(var(--nav-h) + 2rem);
    align-self: start;
  }
  .how-sticky h2 { margin-bottom: 1.2rem; }
  .how-sticky p {
    color: var(--muted);
    font-size: 15px;
    line-height: 1.75;
    max-width: 360px;
  }
  .how-steps { display: flex; flex-direction: column; gap: 1.1rem; }
  .step {
    display: flex;
    gap: 1.5rem;
    padding: 2rem;
  }
  .step-n {
    font-family: var(--font-head);
    font-size: 2rem;
    color: var(--accent);
    opacity: 0.55;
    line-height: 1;
    flex-shrink: 0;
  }
  .step-body h3 { font-size: 1.15rem; color: var(--text-strong); margin-bottom: 0.5rem; }
  .step-body p { font-size: 14px; color: var(--muted); line-height: 1.7; }

  /* ---------- QUOTE ---------- */
  .quote-section { text-align: center; }
  .quote {
    font-family: var(--font-head);
    font-size: clamp(1.4rem, 3.4vw, 2.4rem);
    line-height: 1.32;
    letter-spacing: -0.02em;
    color: var(--text-strong);
    max-width: 880px;
    margin: 0 auto;
  }
  .quote .accent { color: var(--accent); }
  cite {
    display: block;
    margin-top: 1.6rem;
    font-style: normal;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.08em;
    color: var(--muted);
    text-transform: uppercase;
  }

  @media (max-width: 860px) {
    .build-head { grid-template-columns: 1fr; gap: 1.2rem; align-items: start; }
    .how-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .how-sticky { position: static; }
  }
  @media (max-width: 640px) {
    .stats { grid-template-columns: 1fr 1fr; gap: 1.8rem 2rem; }
  }
</style>
