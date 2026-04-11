<script>
  let name = '';
  let email = '';
  let message = '';
  let sent = false;

  function handleSubmit() {
    // Replace this with a real form handler (e.g. Formspree) later
    sent = true;
  }
</script>

<svelte:head>
  <title>Contact — NextGen Circuitry</title>
</svelte:head>

<main class="section-wrap page-enter">
  <div class="section-label">// CONTACT</div>
  <div class="divider"></div>
  <h2>Get in touch.</h2>
  <p>Whether you're a parent, student, school, or community org — we'd love to hear from you.</p>

  <div class="info-grid">
    <div class="info-card">
      <label>SCHOOL</label>
      <span>Westview High School</span>
    </div>
    <div class="info-card">
      <label>LOCATION</label>
      <span>Rancho Peñasquitos, San Diego</span>
    </div>
    <div class="info-card">
      <label>OPERATED BY</label>
      <span>Westview Circuitry Club</span>
    </div>
    <div class="info-card">
      <label>PROGRAMS COST</label>
      <span>Always free</span>
    </div>
  </div>

  {#if sent}
    <div class="success">
      <span>// MESSAGE SENT</span>
      <p>Thanks! We'll get back to you soon.</p>
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-row">
        <label for="name">YOUR NAME</label>
        <input id="name" type="text" bind:value={name} placeholder="Name" required />
      </div>
      <div class="form-row">
        <label for="email">EMAIL</label>
        <input id="email" type="email" bind:value={email} placeholder="email@example.com" required />
      </div>
      <div class="form-row">
        <label for="message">MESSAGE</label>
        <textarea id="message" bind:value={message} placeholder="Tell us what you're looking for..." required></textarea>
      </div>
      <button type="submit" class="btn-primary">SEND MESSAGE</button>
    </form>
  {/if}
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
    max-width: 540px;
    font-weight: 300;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 2.5rem;
  }

  .info-card {
    background: var(--navy-card);
    border: 0.5px solid var(--border);
    border-radius: 4px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .info-card label {
    font-family: var(--font-head);
    font-size: 10px;
    color: var(--teal);
    letter-spacing: 0.1em;
  }

  .info-card span {
    font-size: 14px;
    color: var(--white);
  }

  form {
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 560px;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-row label {
    font-family: var(--font-head);
    font-size: 10px;
    color: var(--teal);
    letter-spacing: 0.1em;
  }

  input, textarea {
    background: var(--navy-card);
    border: 0.5px solid var(--border);
    border-radius: 2px;
    color: var(--white);
    font-family: var(--font-body);
    font-size: 14px;
    padding: 10px 12px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }

  input:focus, textarea:focus {
    border-color: var(--teal);
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  .success {
    margin-top: 2.5rem;
    background: var(--navy-card);
    border: 0.5px solid var(--teal);
    border-radius: 4px;
    padding: 1.5rem;
    max-width: 400px;
  }

  .success span {
    font-family: var(--font-head);
    font-size: 12px;
    color: var(--teal);
    letter-spacing: 0.1em;
  }

  .success p {
    margin-top: 6px;
    font-size: 14px;
    max-width: 100%;
  }
</style>
