<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  let { headings = null } = $props();
  let items = $state([]);
  let activeId = $state('');
  let observer;

  function collect() {
    if (headings) { items = headings; return; }
    const nodes = document.querySelectorAll('.docs-content h2[id], .docs-content h3[id]');
    items = Array.from(nodes).map((n) => ({ id: n.id, text: n.textContent, level: +n.tagName[1] }));
    observer?.disconnect();
    observer = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (activeId = e.target.id)),
      { rootMargin: '-80px 0px -70% 0px' }
    );
    nodes.forEach((n) => observer.observe(n));
  }
  onMount(() => { collect(); return () => observer?.disconnect(); });
  afterNavigate(() => requestAnimationFrame(collect));
</script>

{#if items.length}
  <nav class="otp" aria-label="On this page">
    <span class="otp-head">On this page</span>
    {#each items as h (h.id)}
      <a href={`#${h.id}`} class:active={activeId === h.id} class:sub={h.level === 3}>{h.text}</a>
    {/each}
  </nav>
{/if}

<style>
  .otp { position: sticky; top: calc(var(--nav-h) + 1.5rem); align-self: start; display: flex; flex-direction: column; gap: 0.5rem; font-size: 13px; }
  .otp-head { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted-dim); margin-bottom: 0.3rem; }
  .otp a { color: var(--muted); border-left: 2px solid var(--border); padding: 2px 0 2px 12px; transition: color 0.2s, border-color 0.2s; }
  .otp a.sub { padding-left: 24px; }
  .otp a:hover, .otp a.active { color: var(--accent); border-left-color: var(--accent); }
  @media (max-width: 1100px) { .otp { display: none; } }
</style>
