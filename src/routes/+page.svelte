<script>
  import { reveal } from '$lib/motion.js';
  import { SIGNUP_FORM_URL, DONATE_URL } from '$lib/config.js';

  // Top "Get started" row — three primary actions, docs-style.
  const getStarted = [
    {
      eyebrow: 'For families',
      title: 'Join a program',
      desc: 'Reserve a free seat in our next hands-on session.',
      href: SIGNUP_FORM_URL,
      external: true
    },
    {
      eyebrow: 'For supporters',
      title: 'Donate',
      desc: '100% of donations buy hardware that ends up in a kid’s hands.',
      href: DONATE_URL,
      external: true
    },
    {
      eyebrow: 'For partners',
      title: 'Bring us to your school',
      desc: 'Host a session at your school, library, or community space.',
      href: '/contact',
      external: false
    }
  ];

  // "What kids learn" — like the topic grids on the Claude docs home.
  const learn = [
    { eyebrow: 'Circuits',  title: 'Real hardware, day one', desc: 'Breadboards, resistors, LEDs, and sensors. Wired up by hand, not on a screen.' },
    { eyebrow: 'Code',      title: 'Their first real program', desc: 'Arduino code that controls real hardware. Blink a light, sing a buzzer, turn a motor.' },
    { eyebrow: 'Sensing',   title: 'Things that react', desc: 'Ultrasonic sensors, servos, and buttons that respond to the world.' },
    { eyebrow: 'Building',  title: 'A project they keep', desc: 'Every kid leaves with something they designed and built themselves.' }
  ];

  const steps = [
    { n: '1', title: 'Reserve a free seat', desc: 'No experience and no cost. Sign up and we save your kid a spot at the bench.' },
    { n: '2', title: 'Come build with us', desc: 'Six guided sessions where students learn by doing, with mentors at every table.' },
    { n: '3', title: 'Walk out a maker', desc: 'They leave with a finished project and a new way of seeing the technology around them.' }
  ];
</script>

<svelte:head>
  <title>NextGen Circuitry — Free electronics and coding for kids</title>
  <meta name="description" content="NextGen Circuitry is a free, student-run program teaching elementary and middle schoolers real electronics, circuits, and Arduino coding in San Diego." />
</svelte:head>

<section class="hero">
  <div class="hero-inner">
    <div class="eyebrow" use:reveal>Free · San Diego · 3rd–6th grade</div>
    <h1 class="display" use:reveal={{ delay: 0.05 }}>
      Building the next generation of makers.
    </h1>
    <p class="lead" use:reveal={{ delay: 0.1 }}>
      Hands-on electronics and coding for elementary and middle schoolers. Real circuits,
      real Arduino code, and a real project to take home — at no cost to families.
    </p>
    <div class="hero-cta" use:reveal={{ delay: 0.15 }}>
      <a href={SIGNUP_FORM_URL} target="_blank" rel="noopener" class="btn-primary">Join a program</a>
      <a href="/about" class="btn-secondary">Our story <span class="btn-arrow">→</span></a>
    </div>
  </div>
</section>

<section class="section">
  <h2 class="sec-title">Get started</h2>
  <div class="grid grid-3">
    {#each getStarted as c (c.title)}
      <a
        class="doc-card"
        href={c.href}
        target={c.external ? '_blank' : null}
        rel={c.external ? 'noopener' : null}
        use:reveal
      >
        <span class="kicker">{c.eyebrow}</span>
        <h3>{c.title} <span class="arr">→</span></h3>
        <p>{c.desc}</p>
      </a>
    {/each}
  </div>
</section>

<section class="section">
  <h2 class="sec-title">What kids learn</h2>
  <p class="sec-lead">Four blocks of fundamentals, woven through every session.</p>
  <div class="grid grid-2">
    {#each learn as c (c.title)}
      <div class="doc-card static" use:reveal>
        <span class="kicker">{c.eyebrow}</span>
        <h3>{c.title}</h3>
        <p>{c.desc}</p>
      </div>
    {/each}
  </div>
</section>

<section class="section">
  <h2 class="sec-title">How it works</h2>
  <p class="sec-lead">Three simple steps from signing up to walking out a maker.</p>
  <ol class="steps">
    {#each steps as s (s.n)}
      <li class="step" use:reveal>
        <span class="step-n">{s.n}</span>
        <div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
        </div>
      </li>
    {/each}
  </ol>
</section>

<section class="section quote-sec">
  <blockquote use:reveal>
    “We are students who fell in love with building things, and we kept meeting kids who never
    got the chance. <span class="accent">So we decided to be that chance.</span>”
  </blockquote>
  <cite use:reveal={{ delay: 0.1 }}>— The students of Westview Circuitry Club</cite>
</section>

<style>
  .hero {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 5rem 1.5rem 3.5rem;
  }
  .hero-inner { max-width: 760px; }
  .eyebrow { margin-bottom: 1.4rem; }
  h1.display { margin-bottom: 1.4rem; }
  .lead {
    font-size: 17px;
    color: var(--muted);
    line-height: 1.65;
    margin-bottom: 1.8rem;
    max-width: 620px;
  }
  .hero-cta { display: flex; gap: 0.6rem; flex-wrap: wrap; }

  /* Sections */
  .section {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 2.8rem 1.5rem;
  }
  .sec-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-strong);
    margin-bottom: 0.5rem;
  }
  .sec-lead {
    color: var(--muted);
    font-size: 15px;
    margin-bottom: 1.6rem;
    max-width: 620px;
  }

  /* Card grids */
  .grid { display: grid; gap: 1rem; }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-2 { grid-template-columns: repeat(2, 1fr); }

  .doc-card {
    display: block;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.4rem 1.5rem;
    color: var(--text);
    transition: border-color 0.15s var(--ease);
  }
  .doc-card:hover { border-color: var(--text-strong); }
  .doc-card.static:hover { border-color: var(--border); }
  .doc-card .kicker { font-size: 11px; }
  .doc-card h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-strong);
    margin: 0.5rem 0 0.35rem;
    letter-spacing: -0.01em;
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
  }
  .doc-card .arr {
    font-size: 14px;
    color: var(--muted);
    transition: transform 0.15s var(--ease), color 0.15s var(--ease);
    display: inline-block;
  }
  .doc-card:hover .arr { transform: translateX(3px); color: var(--text-strong); }
  .doc-card p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.55;
    margin: 0;
  }

  /* Steps */
  .steps { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
  .step {
    display: flex;
    gap: 1.1rem;
    padding: 1.2rem 0;
    border-top: 1px solid var(--border);
  }
  .step:last-child { border-bottom: 1px solid var(--border); }
  .step-n {
    flex-shrink: 0;
    width: 28px; height: 28px;
    display: inline-flex; align-items: center; justify-content: center;
    border-radius: 999px;
    background: var(--accent-soft);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
  }
  .step h3 { font-size: 16px; font-weight: 600; color: var(--text-strong); margin: 2px 0 0.3rem; }
  .step p { font-size: 14.5px; color: var(--muted); line-height: 1.6; margin: 0; }

  /* Quote */
  .quote-sec { padding-top: 1.5rem; padding-bottom: 4.5rem; max-width: 820px; }
  blockquote {
    font-size: clamp(1.15rem, 2.1vw, 1.45rem);
    line-height: 1.45;
    letter-spacing: -0.01em;
    color: var(--text-strong);
    margin: 0;
  }
  cite {
    display: block;
    margin-top: 0.9rem;
    font-style: normal;
    font-size: 13px;
    color: var(--muted);
  }

  @media (max-width: 860px) {
    .grid-3 { grid-template-columns: 1fr; }
    .grid-2 { grid-template-columns: 1fr; }
  }
</style>
