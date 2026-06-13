<script>
  import { reveal, linesUp, spotlight, magnetic } from '$lib/motion.js';
  import { CONTACT_EMAIL, ORG } from '$lib/config.js';

  let name = $state('');
  let email = $state('');
  let subject = $state('');
  let message = $state('');
  let opened = $state(false);
  let copied = $state(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Build a pre-filled email and hand it to the visitor's mail app.
    // Works everywhere, no backend or third-party service required.
    const lines = [message, '', '---', `From: ${name}${email ? ` (${email})` : ''}`];
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
      /* clipboard blocked; the mailto links still work */
    }
  }
</script>

<svelte:head>
  <title>Contact - NextGen Circuitry</title>
  <meta name="description" content="Get in touch with NextGen Circuitry. Parents, students, schools, and community partners welcome." />
</svelte:head>

<main class="section-wrap page-top">
  <div class="head">
    <div class="section-label">Contact</div>
    <h2 class="h2" use:linesUp>
      <span class="line"><span class="ln">Let's build something</span></span>
      <span class="line"><span class="ln">for your <span class="accent">kids.</span></span></span>
    </h2>
    <p class="intro" use:reveal={{ delay: 0.2 }}>
      Parent, student, school, or community org. If you want to bring NextGen Circuitry to your
      kids or just have a question, we would genuinely love to hear from you.
    </p>
  </div>

  <div class="layout">
    <aside class="details" use:reveal={{ children: true }}>
      <button class="email-card" onclick={copyEmail} title="Click to copy" use:spotlight>
        <span class="email-label">{copied ? 'Copied' : 'Email us directly'}</span>
        <span class="email-addr">{CONTACT_EMAIL}</span>
        <span class="email-hint">{copied ? 'on your clipboard' : 'click to copy'}</span>
      </button>
      <div class="info-card"><label>School</label><span>{ORG.school}</span></div>
      <div class="info-card"><label>Location</label><span>{ORG.location}</span></div>
      <div class="info-card"><label>Operated by</label><span>{ORG.operatedBy}</span></div>
      <div class="info-card"><label>Program cost</label><span>Always free</span></div>
    </aside>

    <div class="form-wrap" use:reveal={{ delay: 0.1 }}>
      {#if opened}
        <div class="success">
          <span>Email ready</span>
          <p>Your email app should have opened with your message. If it did not, just email us at <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.</p>
          <button class="btn-secondary" onclick={() => (opened = false)}>Write another</button>
        </div>
      {:else}
        <form onsubmit={handleSubmit}>
          <div class="row two">
            <div class="form-row">
              <label for="name">Your name</label>
              <input id="name" type="text" bind:value={name} placeholder="Jordan Lee" required />
            </div>
            <div class="form-row">
              <label for="email">Your email</label>
              <input id="email" type="email" bind:value={email} placeholder="you@example.com" required />
            </div>
          </div>
          <div class="form-row">
            <label for="subject">Subject</label>
            <input id="subject" type="text" bind:value={subject} placeholder="Signing my kid up, partnering, a question" />
          </div>
          <div class="form-row">
            <label for="message">Message</label>
            <textarea id="message" bind:value={message} placeholder="Tell us a bit about what you are looking for." required></textarea>
          </div>
          <button type="submit" class="btn-primary" use:magnetic={{ strength: 0.2 }}>Send message <span class="btn-arrow">→</span></button>
          <p class="form-note">Opens your email app with everything filled in. Nothing is sent until you hit send there.</p>
        </form>
      {/if}
    </div>
  </div>
</main>

<style>
  .page-top { padding-top: 11rem; }
  .head { margin-bottom: 3rem; }
  .intro {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.8;
    max-width: 540px;
    font-weight: 300;
    margin-top: 1rem;
  }

  .layout {
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
    background: linear-gradient(180deg, rgba(0,229,176,0.09), rgba(0,229,176,0.02));
    border: 1px solid var(--border-teal);
    border-radius: var(--radius-sm);
    padding: 1.2rem 1.3rem;
    font-family: var(--font-body);
    overflow: hidden;
    position: relative;
    transition: border-color 0.3s var(--ease);
  }
  .email-card::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(300px circle at var(--mx,50%) var(--my,0), var(--teal-glow), transparent 45%);
    opacity: 0; transition: opacity 0.3s var(--ease); pointer-events: none;
  }
  .email-card:hover { border-color: var(--teal); }
  .email-card:hover::before { opacity: 1; }
  .email-label {
    font-family: var(--font-head); font-size: 10px; color: var(--teal);
    letter-spacing: 0.12em; text-transform: uppercase;
  }
  .email-addr { font-size: 15px; color: var(--white); word-break: break-all; }
  .email-hint { font-size: 11px; color: var(--muted-dim); }

  .info-card {
    background: var(--navy-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 1rem 1.2rem;
    display: flex; flex-direction: column; gap: 4px;
  }
  .info-card label {
    font-family: var(--font-head); font-size: 10px; color: var(--teal);
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  .info-card span { font-size: 14px; color: var(--white); }

  .form-wrap {
    background: linear-gradient(180deg, var(--navy-card-hi), var(--navy-card));
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2rem;
    box-shadow: var(--shadow-card);
  }
  form { display: flex; flex-direction: column; gap: 1.1rem; }
  .row.two { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
  .form-row { display: flex; flex-direction: column; gap: 7px; }
  .form-row label {
    font-family: var(--font-head); font-size: 10px; color: var(--teal);
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  input, textarea {
    background: rgba(0,0,0,0.28);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--white);
    font-family: var(--font-body);
    font-size: 14px;
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }
  input::placeholder, textarea::placeholder { color: var(--muted-dim); }
  input:focus, textarea:focus {
    border-color: var(--teal);
    box-shadow: 0 0 0 3px var(--teal-glow);
  }
  textarea { min-height: 130px; resize: vertical; }
  .form-note { font-size: 12px; color: var(--muted-dim); line-height: 1.5; }

  .success { display: flex; flex-direction: column; align-items: flex-start; gap: 0.9rem; }
  .success span {
    font-family: var(--font-head); font-size: 12px; color: var(--teal);
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  .success p { font-size: 15px; color: var(--white); line-height: 1.7; font-weight: 300; }
  .success a { color: var(--teal); border-bottom: 1px solid var(--border-teal); }

  @media (max-width: 760px) { .layout { grid-template-columns: 1fr; } }
  @media (max-width: 460px) { .row.two { grid-template-columns: 1fr; } }
</style>
