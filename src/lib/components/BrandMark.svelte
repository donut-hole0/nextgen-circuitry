<script>
  let { height = 26 } = $props();
</script>

<span class="brand" style="--h:{height}px">
  <svg class="mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="38" height="38" rx="9" fill="var(--accent)"/>
    <path d="M14 12 L14 28 M14 12 L26 28 M26 12 L26 28" stroke="var(--on-accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <span class="wordmark">NextGen Circuitry</span>
</span>

<style>
  .brand {
    display: inline-flex; align-items: center; gap: 8px;
    color: var(--text-strong);
  }
  .mark { height: var(--h); width: var(--h); display: block; }
  .wordmark {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.01em;
    color: var(--text-strong);
  }
  @media (max-width: 420px) {
    .wordmark { display: none; }
  }
</style>
