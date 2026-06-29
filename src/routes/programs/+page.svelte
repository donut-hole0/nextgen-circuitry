<script>
  import { reveal } from '$lib/motion.js';
  import { SIGNUP_FORM_URL } from '$lib/config.js';
  import DocsLayout from '$lib/components/DocsLayout.svelte';
</script>

<svelte:head>
  <title>Programs — NextGen Circuitry</title>
  <meta name="description" content="Free, beginner-friendly electronics and coding programs for 3rd to 6th graders: summer camp, Arduino basics, TinkerCAD, and science fair mentorship." />
</svelte:head>

<DocsLayout title="Programs">
  <p class="lead">
    Every program is free, beginner-friendly, and built for 3rd to 6th graders with zero prior
    experience. No laptop or supplies required — we bring everything.
  </p>

  <h2 id="summer-camp">Summer camp, 6-day intensive</h2>
  <p>
    Our flagship. Six hands-on sessions covering circuits, Arduino programming, servos, buzzers,
    and ultrasonic sensors. Students leave with a working project they designed and built
    themselves.
  </p>
  <div class="meta">
    <span class="badge badge-open">Enrolling now</span>
    <a class="meta-link" href={SIGNUP_FORM_URL} target="_blank" rel="noopener">Reserve a seat →</a>
  </div>

  <h2 id="tinkercad">TinkerCAD circuit design workshop</h2>
  <p>
    An intro to virtual circuit simulation in TinkerCAD. Kids build and test circuits right in
    the browser — perfect for trying ideas before touching real hardware.
  </p>
  <div class="meta"><span class="badge">Coming soon</span></div>

  <h2 id="arduino-basics">Arduino basics</h2>
  <p>
    Write your first real code and watch hardware respond to it. LEDs, sensors, buttons. If it
    blinks or beeps, we will build it together, line by line.
  </p>
  <div class="meta"><span class="badge">Coming soon</span></div>

  <h2 id="science-fair">Science fair mentorship</h2>
  <p>
    Working on an electronics or coding project for a local science fair? We pair students
    with mentors and lend the hardware to bring the idea to life.
  </p>
  <div class="meta"><span class="badge badge-request">By request</span></div>

  <h2 id="other-requests">Don’t see the right fit?</h2>
  <p>
    Want us to run a session at your school or library? <a href="/contact">Reach out.</a> We
    love new partners and we are happy to design a workshop around what your kids need.
  </p>
</DocsLayout>

<style>
  .lead { font-size: 17px !important; color: var(--text) !important; line-height: 1.65 !important; margin-bottom: 2rem !important; }

  .meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.5rem 0 1rem;
    flex-wrap: wrap;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--muted);
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    padding: 4px 10px;
    border-radius: 999px;
  }
  .badge-open { color: var(--accent); background: var(--accent-soft); border-color: var(--accent-soft); }
  .badge-request { color: var(--text-strong); }
  .meta-link {
    font-size: 14px;
    font-weight: 500;
    color: var(--accent) !important;
    border-bottom: none !important;
  }
  .meta-link:hover { color: var(--accent-strong) !important; }
</style>
