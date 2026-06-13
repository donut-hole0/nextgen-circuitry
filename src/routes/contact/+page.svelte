<script>
  import { reveal } from '$lib/actions/reveal.js';
  import { CONTACT_EMAIL, ORG } from '$lib/config.js';

  let name = $state('');
  let email = $state('');
  let subject = $state('');
  let message = $state('');
  let opened = $state(false);
  let copied = $state(false);

  function handleSubmit() {
    // Build a pre-filled email and hand it off to the visitor's mail app.
    // Works everywhere, no backend or third-party service required.
    const lines = [
      message,
      '',
      '—',
      `From: ${name}${email ? ` (${email})` : ''}`
    ];
    const mailSubject = subject.trim()
      ? `[NextGen Circuitry] ${subject.trim()}`
      : `[NextGen Circuitry] Message from ${name || 'the website'}`;
    const href =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = href;
    opened = true;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      // clipboard blocked — the mailto link below still works
    }
  }
</script>

<svelte:head>
  <title>Contact — NextGen Circuitry</title>
  <meta name="description" content="Get in touch with NextGen Circuitry — parents, students, schools, and community partners welcome." />
</svelte:head>

<main class="section-wrap page-enter">
  <div use:reveal>
    <div class="section-label">// Contact</div>
    <div class="divider"></div>
    <h2>Let's build something<br />for your <span>kids.</span></h2>
    <p class="intro">
      Parent, student, school, or community org — if you want to bring NextGen Circuitry to
      your kids or just have a question, we'd genuinely love to hear from you.
    </p>
  </div>

  <div class="layout">
    <!-- Left: details + direct email -->
    <aside class="details" use:reveal>
      <button class="email-card" on:click={copyEmail} title="Click to copy">
        <span class="email-label">{copied ? 'COPIED!' : 'EMAIL US DIRECTLY'}</span>
        <span class="email-addr">{CONTACT_EMAIL}</span>
        <span class="email-hint">{copied ? '✓ on your clipboard' : 'click to copy'}</span>
      </button>

      <div class="info-card">
        <label>SCHOOL</label><span>{ORG.school}</span>
      </div>
      <div class="info-card">
        <label>LOCATION</label><span>{ORG.location}</span>
      </div>
      <div class="info-card">
        <label>OPERATED BY</label><span>{ORG.operatedBy}</span>
      </div>
      <div class="info-card">
        <label>PROGRAM COST</label><span>Always free</span>
      </div>
    </aside>

    <!-- Right: form -->
    <div class="form-wrap" use:reveal={{ delay: 100 }}>
      {#if opened}
        <div class="success">
          <span>// EMAIL READY</span>
          <p>Your email app should have opened with your message. If it didn't, just email us directly at <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.</p>
          <button class="btn-secondary" on:click={() => (opened = false)}>WRITE ANOTHER</button>
        </div>
      {:else}
        <form on:submit|preventDefault={handleSubmit}>
          <div class="row two">
            <div class="form-row">
              <label for="name">YOUR NAME</label>
              <input id="name" type="text" bind:value={name} placeholder="Jordan Lee" required />
            </div>
            <div class="form-row">
              <label for="email">YOUR EMAIL</label>
              <input id="email" type="email" bind:value={email} placeholder="you@example.com" required />
            </div>
          </div>
          <div class="form-row">
            <label for="subject">SUBJECT</label>
            <input id="subject" type="text" bind:value={subject} placeholder="Signing my kid up / partnering / a question" />
          </div>
          <div class="form-row">
            <label for="message">MESSAGE</label>
            <textarea id="message" bind:value={message} placeholder="Tell us a bit about what you're looking for…" required></textarea>
          </div>
          <button type="submit" class="btn-primary">SEND MESSAGE <span class="btn-arrow">→</span></button>
          <p class="form-note">Opens your email app with everything filled in — nothing is sent until you hit send there.</p>
        </form>
      {/if}
    </div>
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
    max-width: 560px;
    font-weight: 300;
  }

  .layout {
    margin-top: 2.75rem;
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 1.5rem;
    align-items: start;
  }

  .details { display: flex; flex-direction: column; gap: 0.9rem; }

  .email-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
    cursor: pointer;
    background: linear-gradient(180deg, rgba(0,229,176,0.08), rgba(0,229,176,0.02));
    border: 1px solid var(--border-teal);
    border-radius: var(--radius-sm);
    padding: 1.1rem 1.2rem;
    font-family: var(--font-body);
    transition: transform 0.25s var(--ease), border-color 0.25s var(--ease);
  }
  .email-card:hover { transform: translateY(-2px); border-color: var(--teal); }
  .email-label {
    font-family: var(--font-head);
    font-size: 10px;
    color: var(--teal);
    letter-spacing: 0.12em;
  }
  .email-addr { font-size: 15px; color: var(--white); word-break: break-all; }
  .email-hint { font-size: 11px; color: var(--muted-dim); }

  .info-card {
    background: var(--navy-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.9rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .info-card label {
    font-family: var(--font-head);
    font-size: 10px;
    color: var(--teal);
    letter-spacing: 0.1em;
  }
  .info-card span { font-size: 14px; color: var(--white); }

  .form-wrap {
    background: linear-gradient(180deg, var(--navy-card-hi), var(--navy-card));
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.75rem;
    box-shadow: var(--shadow-card);
  }

  form { display: flex; flex-direction: column; gap: 1rem; }
  .row.two { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-row { display: flex; flex-direction: column; gap: 6px; }
  .form-row label {
    font-family: var(--font-head);
    font-size: 10px;
    color: var(--teal);
    letter-spacing: 0.1em;
  }

  input, textarea {
    background: rgba(0,0,0,0.25);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--white);
    font-family: var(--font-body);
    font-size: 14px;
    padding: 11px 13px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }
  input::placeholder, textarea::placeholder { color: var(--muted-dim); }
  input:focus, textarea:focus {
    border-color: var(--teal);
    box-shadow: 0 0 0 3px var(--teal-glow);
  }
  textarea { min-height: 120px; resize: vertical; }

  .form-note { font-size: 12px; color: var(--muted-dim); line-height: 1.5; }

  .success {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .success span {
    font-family: var(--font-head);
    font-size: 12px;
    color: var(--teal);
    letter-spacing: 0.1em;
  }
  .success p { font-size: 14.5px; color: var(--white); line-height: 1.7; font-weight: 300; }
  .success a { color: var(--teal); border-bottom: 1px solid var(--border-teal); }

  @media (max-width: 760px) {
    .layout { grid-template-columns: 1fr; }
  }
  @media (max-width: 460px) {
    .row.two { grid-template-columns: 1fr; }
  }
</style>
