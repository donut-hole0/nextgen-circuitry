<script>
  import { reveal } from '$lib/actions/reveal.js';
  import { SIGNUP_FORM_URL } from '$lib/config.js';

  const teach = [
    {
      icon: '◈',
      title: 'Real circuits',
      desc: 'Breadboards, resistors, LEDs, sensors — kids wire up working circuits with their own hands, not on a screen.'
    },
    {
      icon: '⌑',
      title: 'Arduino code',
      desc: 'Their first lines of real code, controlling real hardware. Make a light blink, a buzzer sing, a motor spin.'
    },
    {
      icon: '◎',
      title: 'Sensors & motion',
      desc: 'Ultrasonic sensors, servos, and buttons that react to the world — the building blocks of robots and gadgets.'
    },
    {
      icon: '⬡',
      title: 'A project to keep',
      desc: 'Every student walks away with something they designed and built themselves, and the confidence that they can do it again.'
    }
  ];

  const steps = [
    { n: '01', title: 'Sign up free', desc: 'No experience, no cost, no catch. Just reserve a seat for your kid.' },
    { n: '02', title: 'Come build', desc: 'Six guided sessions where students learn by doing — mistakes encouraged.' },
    { n: '03', title: 'Leave a maker', desc: 'They go home with a finished project and a new way of seeing technology.' }
  ];
</script>

<svelte:head>
  <title>NextGen Circuitry — Free electronics & coding for kids</title>
  <meta name="description" content="NextGen Circuitry is a free, student-run program teaching elementary and middle schoolers real electronics, circuits, and Arduino coding in San Diego." />
</svelte:head>

<!-- Animated circuit background -->
<div class="hero-bg" aria-hidden="true">
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <g class="traces" stroke="var(--teal)" stroke-width="1.2" fill="none">
      <path d="M60,40 L60,180 L220,180 L220,300 L420,300" />
      <path d="M740,80 L600,80 L600,240 L460,240 L460,420" />
      <path d="M40,460 L200,460 L200,360 L360,360" />
      <path d="M780,520 L640,520 L640,400 L500,400" />
      <path d="M120,560 L120,420 L300,420" />
    </g>
    <g fill="var(--teal)">
      <circle cx="220" cy="180" r="4" /><circle cx="220" cy="300" r="4" />
      <circle cx="600" cy="240" r="4" /><circle cx="460" cy="240" r="4" />
      <circle cx="200" cy="360" r="4" /><circle cx="640" cy="400" r="4" />
      <rect x="412" y="292" width="16" height="16" rx="3" />
      <rect x="452" y="412" width="16" height="16" rx="3" />
      <rect x="352" y="352" width="16" height="16" rx="3" />
    </g>
    <!-- traveling pulses -->
    <circle r="3.5" fill="var(--teal-soft)" class="pulse">
      <animateMotion dur="6s" repeatCount="indefinite" path="M60,40 L60,180 L220,180 L220,300 L420,300" />
    </circle>
    <circle r="3.5" fill="var(--teal-soft)" class="pulse">
      <animateMotion dur="7s" begin="1s" repeatCount="indefinite" path="M740,80 L600,80 L600,240 L460,240 L460,420" />
    </circle>
    <circle r="3.5" fill="var(--teal-soft)" class="pulse">
      <animateMotion dur="5.5s" begin="2s" repeatCount="indefinite" path="M40,460 L200,460 L200,360 L360,360" />
    </circle>
  </svg>
</div>

<main class="hero section-wrap page-enter">
  <div class="eyebrow"><span class="dot"></span>FREE ELECTRONICS &amp; CODING · SAN DIEGO</div>
  <h1>Building the next<br />generation of <span>makers.</span></h1>
  <p class="lead">
    NextGen Circuitry gives elementary and middle schoolers hands-on access to real
    engineering — circuits, sensors, and Arduino code — completely free. We believe a kid
    shouldn't need money or connections to discover they can build things.
  </p>
  <div class="hero-cta">
    <a href={SIGNUP_FORM_URL} target="_blank" rel="noopener" class="btn-primary">
      JOIN A PROGRAM <span class="btn-arrow">→</span>
    </a>
    <a href="/about" class="btn-secondary">OUR STORY</a>
  </div>

  <div class="stats">
    <div class="stat">
      <div class="stat-num">6</div>
      <div class="stat-label">session hands-on camp</div>
    </div>
    <div class="stat">
      <div class="stat-num">3–6</div>
      <div class="stat-label">grades welcome</div>
    </div>
    <div class="stat">
      <div class="stat-num">$0</div>
      <div class="stat-label">cost, always</div>
    </div>
    <div class="stat">
      <div class="stat-num">100%</div>
      <div class="stat-label">student-run</div>
    </div>
  </div>
</main>

<!-- What we teach -->
<section class="section-wrap">
  <div class="head-row" use:reveal>
    <div>
      <div class="section-label">// What kids actually build</div>
      <h2>Not slideshows. Not simulations.<br /><span>Real hardware in real hands.</span></h2>
    </div>
    <p class="head-aside">
      Most "intro to STEM" stops at watching. We hand kids the components on day one and
      help them build something that lights up, beeps, and moves.
    </p>
  </div>

  <div class="teach-grid">
    {#each teach as item, i}
      <div class="card teach-card" use:reveal={{ delay: i * 90 }}>
        <div class="teach-icon">{item.icon}</div>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    {/each}
  </div>
</section>

<!-- How it works -->
<section class="how">
  <div class="section-wrap">
    <div use:reveal>
      <div class="section-label">// How it works</div>
      <h2>From zero to maker in three steps.</h2>
    </div>
    <div class="steps">
      {#each steps as step, i}
        <div class="step" use:reveal={{ delay: i * 120 }}>
          <div class="step-n">{step.n}</div>
          <h3>{step.title}</h3>
          <p>{step.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Mission quote -->
<section class="section-wrap">
  <blockquote class="quote" use:reveal>
    <span class="quote-mark">"</span>
    <p>
      We're high schoolers who fell in love with building things — and we kept meeting kids
      who never got the chance. <span>So we decided to be that chance.</span>
    </p>
    <cite>— The students of Westview Circuitry Club</cite>
  </blockquote>
</section>

<!-- Closing CTA -->
<section class="section-wrap">
  <div class="cta" use:reveal>
    <div class="cta-glow" aria-hidden="true"></div>
    <h2>Know a kid who'd love this?</h2>
    <p>Seats are free and limited. Sign up for an upcoming program, or reach out if you're a parent, school, or library who wants to bring us in.</p>
    <div class="cta-buttons">
      <a href={SIGNUP_FORM_URL} target="_blank" rel="noopener" class="btn-primary">SIGN UP FREE <span class="btn-arrow">→</span></a>
      <a href="/contact" class="btn-secondary">GET IN TOUCH</a>
    </div>
  </div>
</section>

<style>
  .hero-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.5;
    -webkit-mask-image: radial-gradient(120% 80% at 75% 0%, #000 30%, transparent 75%);
    mask-image: radial-gradient(120% 80% at 75% 0%, #000 30%, transparent 75%);
  }
  .hero-bg svg { width: 100%; height: 100%; }
  .traces { opacity: 0.22; }
  .pulse { filter: drop-shadow(0 0 6px var(--teal)); }

  .hero {
    position: relative;
    z-index: 1;
    padding-top: 5rem;
    padding-bottom: 4rem;
  }

  h1 {
    font-size: clamp(2.4rem, 6vw, 4rem);
    line-height: 1.08;
    margin-bottom: 1.4rem;
    color: var(--white);
  }
  h1 span {
    color: var(--teal);
    text-shadow: 0 0 32px var(--teal-glow-strong);
  }

  .lead {
    font-size: clamp(16px, 2vw, 18.5px);
    color: var(--muted);
    line-height: 1.75;
    max-width: 620px;
    margin-bottom: 2.2rem;
    font-weight: 300;
  }

  .hero-cta { display: flex; flex-wrap: wrap; gap: 0; align-items: center; }

  .stats {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 2.75rem;
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    width: fit-content;
  }
  .stat-num {
    font-family: var(--font-head);
    font-size: 2.1rem;
    color: var(--teal);
    line-height: 1;
  }
  .stat-label {
    font-size: 12px;
    color: var(--muted);
    margin-top: 6px;
    max-width: 110px;
  }

  /* Section headings */
  h2 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    line-height: 1.2;
    color: var(--white);
  }
  h2 span { color: var(--teal); }

  .head-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
    margin-bottom: 2.5rem;
  }
  .head-aside {
    color: var(--muted);
    font-size: 14.5px;
    line-height: 1.7;
    max-width: 340px;
    font-weight: 300;
  }

  .teach-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
  .teach-icon {
    font-size: 1.6rem;
    color: var(--teal);
    margin-bottom: 0.9rem;
  }
  .teach-card h3 {
    font-size: 15px;
    color: var(--white);
    margin-bottom: 0.5rem;
  }
  .teach-card p {
    font-size: 13.5px;
    color: var(--muted);
    line-height: 1.65;
    font-weight: 300;
  }

  /* How it works */
  .how {
    background:
      linear-gradient(180deg, rgba(0,229,176,0.04), transparent),
      var(--navy-mid);
    border-block: 1px solid var(--border);
  }
  .steps {
    margin-top: 2.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  .step {
    padding: 1.75rem;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.015);
    position: relative;
    overflow: hidden;
  }
  .step-n {
    font-family: var(--font-head);
    font-size: 2.4rem;
    color: var(--teal);
    opacity: 0.28;
    line-height: 1;
    margin-bottom: 0.75rem;
  }
  .step h3 { font-size: 15px; color: var(--white); margin-bottom: 0.5rem; }
  .step p { font-size: 13.5px; color: var(--muted); line-height: 1.65; font-weight: 300; }

  /* Quote */
  .quote {
    position: relative;
    max-width: 760px;
    margin: 0 auto;
    text-align: center;
    padding: 1rem;
  }
  .quote-mark {
    font-family: var(--font-head);
    font-size: 4rem;
    color: var(--teal);
    opacity: 0.4;
    line-height: 0.5;
    display: block;
  }
  .quote p {
    font-family: var(--font-head);
    font-size: clamp(1.15rem, 2.6vw, 1.7rem);
    color: var(--white);
    line-height: 1.45;
    margin: 1.25rem 0;
  }
  .quote p span { color: var(--teal); }
  .quote cite {
    font-style: normal;
    font-size: 13px;
    color: var(--muted);
    letter-spacing: 0.04em;
  }

  /* CTA */
  .cta {
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: 3.5rem 2rem;
    border-radius: 20px;
    border: 1px solid var(--border-teal);
    background: linear-gradient(180deg, var(--navy-card-hi), var(--navy-card));
  }
  .cta-glow {
    position: absolute;
    top: -40%;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 160%;
    background: radial-gradient(40% 40% at 50% 0%, var(--teal-glow), transparent 70%);
    pointer-events: none;
  }
  .cta h2 { position: relative; margin-bottom: 0.75rem; }
  .cta p {
    position: relative;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.7;
    max-width: 480px;
    margin: 0 auto 1.75rem;
    font-weight: 300;
  }
  .cta-buttons {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
  }

  @media (max-width: 860px) {
    .teach-grid { grid-template-columns: repeat(2, 1fr); }
    .head-row { flex-direction: column; align-items: flex-start; }
    .head-aside { max-width: none; }
  }
  @media (max-width: 680px) {
    .steps { grid-template-columns: 1fr; }
    .stats { grid-template-columns: repeat(2, 1fr); gap: 1.5rem 2rem; }
  }
  @media (max-width: 460px) {
    .teach-grid { grid-template-columns: 1fr; }
  }
</style>
