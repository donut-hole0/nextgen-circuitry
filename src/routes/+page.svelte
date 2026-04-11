<script>
  import { onMount } from 'svelte';
  let visible = false;
  onMount(() => (visible = true));
</script>

<svelte:head>
  <title>NextGen Circuitry</title>
</svelte:head>

<!-- Circuit background decoration -->
<svg class="circuit-deco" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
  <g stroke="white" stroke-width="1" fill="none">
    <polyline points="50,20 50,100 120,100 120,160 200,160"/>
    <circle cx="120" cy="100" r="5" fill="white"/>
    <polyline points="200,160 280,160 280,260 350,260"/>
    <circle cx="280" cy="160" r="5" fill="white"/>
    <polyline points="20,300 100,300 100,380 180,380 180,440 260,440"/>
    <circle cx="100" cy="300" r="5" fill="white"/>
    <circle cx="180" cy="380" r="5" fill="white"/>
    <polyline points="300,80 300,200 380,200 380,320"/>
    <circle cx="300" cy="200" r="5" fill="white"/>
    <rect x="190" y="148" width="24" height="24" rx="2" fill="white"/>
    <rect x="90" y="288" width="24" height="24" rx="2" fill="white"/>
    <rect x="270" y="248" width="24" height="24" rx="2" fill="white"/>
  </g>
</svg>

<main class="section-wrap page-enter">
  <div class="hero-tag">// FREE ELECTRONICS &amp; CODING EDUCATION</div>
  <h1>Building the next<br/>generation of <span>makers.</span></h1>
  <p>NextGen Circuitry is a free electronics and coding program for elementary and middle school students. We teach Arduinos, circuits, and real engineering that is hands-on.</p>
  <a href="/programs" class="btn-primary">OUR PROGRAMS</a>
  <a href="/contact" class="btn-secondary">GET INVOLVED</a>

  <div class="stats">
    <div class="stat">
      <div class="stat-num">6</div>
      <div class="stat-label">session camp curriculum</div>
    </div>
    <div class="stat">
      <div class="stat-num">3–6</div>
      <div class="stat-label">grade range</div>
    </div>
    <div class="stat">
      <div class="stat-num">$0</div>
      <div class="stat-label">cost to students</div>
    </div>
  </div>
</main>

<style>
  .circuit-deco {
    position: fixed;
    top: 0;
    right: 0;
    width: 40vw;
    height: 100vh;
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
  }

  main {
    position: relative;
    z-index: 1;
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .hero-tag {
    display: inline-block;
    font-family: var(--font-head);
    font-size: 11px;
    color: var(--teal);
    border: 0.5px solid var(--teal);
    padding: 4px 10px;
    border-radius: 2px;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3.4rem);
    line-height: 1.15;
    margin-bottom: 1.25rem;
    color: var(--white);
  }

  h1 span { color: var(--teal); }

  p {
    font-size: 17px;
    color: var(--muted);
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 2.5rem;
    font-weight: 300;
  }

  .stats {
    display: flex;
    gap: 2.5rem;
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 0.5px solid var(--border);
  }

  .stat-num {
    font-family: var(--font-head);
    font-size: 2rem;
    color: var(--teal);
  }

  .stat-label {
    font-size: 12px;
    color: var(--muted);
    margin-top: 2px;
  }
</style>
