<script>
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />

<slot />

<footer>
  &copy; 2026 — NEXTGEN CIRCUITRY · WESTVIEW HIGH SCHOOL · SAN DIEGO
</footer>

<style>
  footer {
    text-align: center;
    padding: 2rem;
    border-top: 0.5px solid var(--border);
    font-family: var(--font-head);
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.06em;
  }
</style>
