<svelte:head>
  <title>Support Us — NextGen Circuitry</title>
</svelte:head>

<main class="section-wrap page-enter">
  <div class="section-label">// SUPPORT US</div>
  <div class="divider"></div>
  <h2>Help us keep it free.</h2>
  <p>NextGen Circuitry is 100% free for every student we work with. Your donation goes directly toward hardware, components, and materials so kids can keep building without any cost barrier.</p>

  <div class="impact-grid">
    <div class="impact-card">
      <div class="amount">$10</div>
      <div class="impact-label">covers components for one student for a full session</div>
    </div>
    <div class="impact-card">
      <div class="amount">$25</div>
      <div class="impact-label">funds an Arduino kit that gets reused across multiple workshops</div>
    </div>
    <div class="impact-card">
      <div class="amount">$50</div>
      <div class="impact-label">supplies an entire table of students for our summer camp</div>
    </div>
  </div>

  <div class="cta-box">
    <div class="cta-text">
      <div class="cta-tag">// GOFUNDME</div>
      <h3>Every dollar goes toward the kids.</h3>
      <p>We're a student-run program with no overhead. 100% of donations fund materials and equipment directly used in our programs.</p>
    </div>
    <a href="https://gofund.me/14c30ab28" target="_blank" rel="noopener" class="btn-donate">
      DONATE NOW
    </a>
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

  .impact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2.5rem;
  }

  .impact-card {
    background: var(--navy-card);
    border: 0.5px solid var(--border);
    border-radius: 4px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .amount {
    font-family: var(--font-head);
    font-size: 2rem;
    color: var(--teal);
  }

  .impact-label {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }

  .cta-box {
    margin-top: 2rem;
    background: var(--navy-card);
    border: 0.5px solid var(--teal);
    border-radius: 4px;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .cta-tag {
    font-family: var(--font-head);
    font-size: 11px;
    color: var(--teal);
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }

  .cta-text h3 {
    font-family: var(--font-head);
    font-size: 15px;
    margin-bottom: 0.4rem;
    color: var(--white);
  }

  .cta-text p {
    font-size: 13px;
    max-width: 420px;
    margin: 0;
  }

  .btn-donate {
    display: inline-block;
    font-family: var(--font-head);
    font-size: 12px;
    letter-spacing: 0.08em;
    color: var(--navy);
    background: var(--teal);
    padding: 14px 32px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    border-radius: 2px;
    white-space: nowrap;
    text-decoration: none;
    flex-shrink: 0;
  }

  .btn-donate:hover {
    background: var(--teal-dim);
  }
</style>