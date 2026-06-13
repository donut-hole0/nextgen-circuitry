<script>
  import CircuitCanvas from '$lib/components/CircuitCanvas.svelte';
  import { reveal, linesUp, intro, introLines, magnetic, spotlight, countUp } from '$lib/motion.js';
  import { SIGNUP_FORM_URL } from '$lib/config.js';

  const build = [
    {
      kicker: 'Circuits',
      title: 'Real hardware, day one',
      desc: 'Breadboards, resistors, LEDs, and sensors. Kids wire up working circuits with their own hands, not on a screen.',
      span: 7
    },
    {
      kicker: 'Code',
      title: 'Their first real program',
      desc: 'Arduino code that controls real hardware. Make a light blink, a buzzer sing, a motor turn.',
      span: 5
    },
    {
      kicker: 'Motion',
      title: 'Things that sense and react',
      desc: 'Ultrasonic sensors, servos, and buttons that respond to the world. The building blocks of robots.',
      span: 5
    },
    {
      kicker: 'Pride',
      title: 'A project they keep',
      desc: 'Every kid leaves with something they designed and built, and the belief that they can build the next one too.',
      span: 7
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
  <div class="hero-canvas"><CircuitCanvas /></div>
  <div class="hero-fade" aria-hidden="true"></div>

  <div class="hero-inner">
    <div class="eyebrow"><span class="dot"></span>Free electronics and coding · San Diego</div>

    <h1 class="display" use:introLines={{ delay: 0.15 }}>
      <span class="line"><span class="ln">Building the next</span></span>
      <span class="line"><span class="ln">generation of <span class="accent">makers.</span></span></span>
    </h1>

    <p class="lead" use:intro={{ delay: 0.55 }}>
      We give elementary and middle schoolers hands-on access to real engineering: circuits,
      sensors, and Arduino code. Completely free, because curiosity should never carry a price tag.
    </p>

    <div class="hero-cta" use:intro={{ delay: 0.7 }}>
      <a href={SIGNUP_FORM_URL} target="_blank" rel="noopener" class="btn-primary" use:magnetic>
        Join a program <span class="btn-arrow">→</span>
      </a>
      <a href="/about" class="btn-secondary" use:magnetic={{ strength: 0.25 }}>Our story</a>
    </div>

    <div class="stats" use:intro={{ children: true, delay: 0.85 }}>
      <div class="stat">
        <div class="stat-num"><span use:countUp={{ to: 100, suffix: '%', onLoad: true, delay: 0.9 }}>100%</span></div>
        <div class="stat-label">free for every student</div>
      </div>
      <div class="stat">
        <div class="stat-num"><span use:countUp={{ to: 6, onLoad: true, delay: 0.9 }}>6</span></div>
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
    <h2 class="h2" use:linesUp>
      <span class="line"><span class="ln">Not slideshows.</span></span>
      <span class="line"><span class="ln"><span class="accent">Real hardware</span> in real hands.</span></span>
    </h2>
    <p use:reveal={{ delay: 0.2 }}>
      Most intro-to-STEM stops at watching. We put the components in kids' hands on the first
      day and help them build something that lights up, beeps, and moves.
    </p>
  </div>

  <div class="bento">
    {#each build as item (item.title)}
      <article class="card bento-card" style="--span:{item.span}" use:spotlight use:reveal>
        <span class="bento-kicker">{item.kicker}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </article>
    {/each}
  </div>
</section>

<!-- How it works (sticky left, scrolling steps) -->
<section class="how">
  <div class="how-grid">
    <div class="how-sticky">
      <div class="section-label">How it works</div>
      <h2 class="h2" use:reveal>From zero to maker in three steps.</h2>
      <p use:reveal={{ delay: 0.15 }}>
        No catch and no fine print. The whole path from signing up to taking home a finished
        build is designed to be simple for families and joyful for kids.
      </p>
    </div>

    <div class="how-steps">
      {#each steps as step (step.n)}
        <div class="step" use:reveal>
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
  <blockquote class="quote" use:linesUp={{ stagger: 0.1 }}>
    <span class="line"><span class="ln">We are students who fell in love with</span></span>
    <span class="line"><span class="ln">building things, and we kept meeting kids</span></span>
    <span class="line"><span class="ln">who never got the chance.</span></span>
    <span class="line"><span class="ln accent">So we decided to be that chance.</span></span>
  </blockquote>
  <cite use:reveal={{ delay: 0.3 }}>The students of Westview Circuitry Club</cite>
</section>

<style>
  /* ---------- HERO ---------- */
  .hero {
    position: relative;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .hero-canvas {
    position: absolute;
    inset: 0;
    z-index: 0;
    -webkit-mask-image: radial-gradient(130% 90% at 72% 35%, #000 32%, transparent 78%);
    mask-image: radial-gradient(130% 90% at 72% 35%, #000 32%, transparent 78%);
  }
  .hero-fade {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(180deg, transparent 60%, var(--navy));
  }
  .hero-inner {
    position: relative;
    z-index: 2;
    max-width: var(--maxw);
    width: 100%;
    margin: 0 auto;
    padding: 8rem 1.6rem 4rem;
  }
  .eyebrow { margin-bottom: 1.8rem; }

  h1.display { color: var(--white); margin-bottom: 1.8rem; }
  h1.display .accent { text-shadow: 0 0 40px var(--teal-glow-strong); }

  .lead {
    font-size: clamp(16px, 1.9vw, 19px);
    color: var(--muted);
    line-height: 1.7;
    max-width: 600px;
    margin-bottom: 2.4rem;
    font-weight: 300;
  }
  .hero-cta { display: flex; flex-wrap: wrap; gap: 0.9rem; align-items: center; }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 3rem;
    margin-top: 4.5rem;
    padding-top: 2.2rem;
    border-top: 1px solid var(--border);
    width: fit-content;
  }
  .stat-num {
    font-family: var(--font-head);
    font-size: clamp(2rem, 4vw, 2.8rem);
    color: var(--teal);
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
    font-weight: 300;
    max-width: 380px;
  }

  .bento {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1.1rem;
  }
  .bento-card {
    grid-column: span var(--span);
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.7rem;
    padding: 2rem;
  }
  .bento-kicker {
    font-family: var(--font-head);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--teal);
  }
  .bento-card h3 {
    font-family: var(--font-head);
    font-size: clamp(1.05rem, 1.6vw, 1.35rem);
    color: var(--white);
    letter-spacing: -0.01em;
  }
  .bento-card p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.65;
    font-weight: 300;
    max-width: 460px;
  }

  /* ---------- HOW IT WORKS ---------- */
  .how {
    border-block: 1px solid var(--border);
    background: linear-gradient(180deg, rgba(0,229,176,0.035), transparent 40%);
  }
  .how-grid {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 8rem 1.6rem;
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 4rem;
  }
  .how-sticky {
    position: sticky;
    top: 120px;
    align-self: start;
  }
  .how-sticky h2 { margin-bottom: 1.2rem; }
  .how-sticky p {
    color: var(--muted);
    font-size: 15px;
    line-height: 1.75;
    font-weight: 300;
    max-width: 360px;
  }
  .how-steps { display: flex; flex-direction: column; gap: 1.1rem; }
  .step {
    display: flex;
    gap: 1.5rem;
    padding: 2rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: rgba(255,255,255,0.015);
  }
  .step-n {
    font-family: var(--font-head);
    font-size: 2rem;
    color: var(--teal);
    opacity: 0.4;
    line-height: 1;
    flex-shrink: 0;
  }
  .step-body h3 { font-family: var(--font-head); font-size: 1.15rem; color: var(--white); margin-bottom: 0.5rem; }
  .step-body p { font-size: 14px; color: var(--muted); line-height: 1.7; font-weight: 300; }

  /* ---------- QUOTE ---------- */
  .quote-section { text-align: center; }
  .quote {
    font-family: var(--font-head);
    font-size: clamp(1.4rem, 3.4vw, 2.4rem);
    line-height: 1.28;
    letter-spacing: -0.02em;
    color: var(--white);
    max-width: 880px;
    margin: 0 auto;
  }
  .quote .accent { color: var(--teal); }
  cite {
    display: block;
    margin-top: 1.6rem;
    font-style: normal;
    font-family: var(--font-head);
    font-size: 12px;
    letter-spacing: 0.08em;
    color: var(--muted);
    text-transform: uppercase;
  }

  @media (max-width: 860px) {
    .build-head { grid-template-columns: 1fr; gap: 1.2rem; align-items: start; }
    .bento-card { grid-column: span 12 !important; min-height: 0; }
    .how-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .how-sticky { position: static; }
  }
  @media (max-width: 640px) {
    .stats { grid-template-columns: 1fr 1fr; gap: 1.8rem 2rem; }
  }
</style>
