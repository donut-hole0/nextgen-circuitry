<svelte:head>
  <title>Programs — NextGen Circuitry</title>
</svelte:head>

<main class="section-wrap page-enter">
  <div class="section-label">// PROGRAMS</div>
  <div class="divider"></div>
  <h2>What we offer.</h2>
  <p>All programs are free, beginner-friendly, and designed for 4th–7th graders with zero prior experience.</p>

  <div class="list">
    {#each programs as program}
      <div class="item">
        <div class="info">
          <h3>{program.title}</h3>
          <p>{program.desc}</p>
        </div>
        <span class="badge">{program.badge}</span>
      </div>
    {/each}
  </div>
</main>

<script>
  const programs = [
    {
      title: 'Summer Camp — 6-Day Intensive',
      desc: 'Six sessions covering circuits, Arduino programming, servos, buzzers, and ultrasonic sensors. Students leave with a working project they built themselves.',
      badge: 'BEGINNER'
    },
    {
      title: 'TinkerCAD Circuit Design Workshop',
      desc: 'Introduction to virtual circuit simulation using TinkerCAD. Build and test circuits in a browser before touching real hardware.',
      badge: 'COMING SOON'
    },
    {
      title: 'Arduino Basics',
      desc: 'Write your first real code and make hardware respond to it. LEDs, sensors, buttons — if it blinks or beeps, we\'ll build it.',
      badge: 'COMING SOON'
    },
    {
      title: 'Science Fair Mentorship',
      desc: 'We support students working on electronics and coding projects for local science fairs, offering guidance and hardware assistance.',
      badge: 'BY REQUEST'
    }
  ];
</script>

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
    max-width: 560px;
    font-weight: 300;
  }

  .list {
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item {
    background: var(--navy-card);
    border: 0.5px solid var(--border);
    border-left: 3px solid var(--teal);
    border-radius: 4px;
    padding: 1.5rem 1.75rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .info h3 {
    font-family: var(--font-head);
    font-size: 14px;
    margin-bottom: 0.4rem;
    color: var(--white);
  }

  .info p {
    font-size: 13px;
    max-width: 480px;
  }

  .badge {
    font-family: var(--font-head);
    font-size: 10px;
    letter-spacing: 0.08em;
    color: var(--teal);
    border: 0.5px solid var(--teal);
    padding: 4px 10px;
    border-radius: 2px;
    white-space: nowrap;
    margin-left: 1rem;
    flex-shrink: 0;
  }
</style>
