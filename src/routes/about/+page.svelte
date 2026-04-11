<svelte:head>
  <title>About — NextGen Circuitry</title>
</svelte:head>

<main class="section-wrap page-enter">
  <div class="section-label">// ABOUT US</div>
  <div class="divider"></div>
  <h2>We teach electronics<br/>the right way.</h2>
  <p>NextGen Circuitry was founded by students at Westview High School with one goal: give younger kids access to real engineering education for free. No textbooks. No lectures. Just building.</p>

  <div class="grid">
    <div class="card">
      <div class="card-tag">01 // MISSION</div>
      <h3>Free for everyone</h3>
      <p>We believe engineering education shouldn't have a price tag. Every session, every kit, every workshop is completely free for students — especially those in underserved communities who rarely get access to hands-on STEM programs.</p>
    </div>
    <div class="card">
      <div class="card-tag">02 // METHOD</div>
      <h3>Hands-on learning</h3>
      <p>Students build real circuits, program real Arduinos, and solve real problems — not only simulations. We learn by doing.</p>
    </div>
    <div class="card">
      <div class="card-tag">03 // WHO WE ARE</div>
      <h3>Student-run</h3>
      <p>We're high schoolers from Westview's Circuitry Club. We've been building things ourselves — now we want to teach others how.</p>
    </div>
    <div class="card">
      <div class="card-tag">04 // IMPACT</div>
      <h3>Community focused</h3>
      <p>Operating in Rancho Peñasquitos library, partnering with local libraries and schools to bring STEM to students in our own neighborhood.</p>
    </div>
  </div>
</main>

<style>
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.25rem;
    line-height: 1.2;
  }

  p {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.7;
    max-width: 580px;
    font-weight: 300;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 2.5rem;
  }

  .card {
    background: var(--navy-card);
    border: 0.5px solid var(--border);
    border-radius: 4px;
    padding: 1.5rem;
  }

  .card-tag {
    font-family: var(--font-head);
    font-size: 12px;
    color: var(--teal);
    margin-bottom: 0.75rem;
    letter-spacing: 0.08em;
  }

  .card h3 {
    font-family: var(--font-head);
    font-size: 14px;
    margin-bottom: 0.5rem;
    color: var(--white);
  }

  .card p {
    font-size: 14px;
    max-width: 100%;
  }
</style>
