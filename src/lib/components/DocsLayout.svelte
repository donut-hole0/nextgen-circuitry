<script>
  import { page } from '$app/stores';
  import Sidebar, { navGroups } from '$lib/components/Sidebar.svelte';
  import OnThisPage from '$lib/components/OnThisPage.svelte';

  let { title = '' } = $props();
</script>

<div class="docs">
  <Sidebar />

  <main class="docs-content">
    <details class="docs-menu">
      <summary>Menu</summary>
      {#each navGroups as group (group.label)}
        <span class="m-label">{group.label}</span>
        {#each group.links as link (link.href)}
          <a href={link.href} class:active={$page.url.pathname === link.href}>{link.label}</a>
        {/each}
      {/each}
    </details>

    {#if title}
      <h1 class="display doc-title">{title}</h1>
    {/if}
    <slot />
  </main>

  <OnThisPage />
</div>

<style>
  .docs {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: calc(var(--nav-h) + 3rem) 1.5rem 5rem;
    display: grid;
    grid-template-columns: 220px minmax(0, var(--content-w)) 200px;
    justify-content: center;
    gap: 3rem;
  }

  .docs-content { min-width: 0; }
  .doc-title { font-size: clamp(2.2rem, 5vw, 3.4rem); margin-bottom: 1.5rem; }

  .docs-content :global(h2) {
    font-family: var(--font-head);
    font-size: 1.6rem;
    color: var(--text-strong);
    margin: 2.6rem 0 0.8rem;
    scroll-margin-top: calc(var(--nav-h) + 1rem);
  }
  .docs-content :global(h3) {
    font-family: var(--font-head);
    font-size: 1.2rem;
    color: var(--text-strong);
    margin: 1.8rem 0 0.6rem;
    scroll-margin-top: calc(var(--nav-h) + 1rem);
  }
  .docs-content :global(p) { color: var(--muted); line-height: 1.8; margin-bottom: 1rem; }
  .docs-content :global(a:not(.btn-primary):not(.btn-secondary)) {
    color: var(--accent);
    border-bottom: 1px solid var(--border-strong);
    transition: border-color 0.2s;
  }
  .docs-content :global(a:not(.btn-primary):not(.btn-secondary):hover) { border-color: var(--accent); }

  /* Mobile disclosure menu */
  .docs-menu {
    display: none;
    margin-bottom: 2rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.5rem 1rem;
    background: var(--surface);
  }
  .docs-menu summary {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    cursor: pointer;
    padding: 0.5rem 0;
  }
  .docs-menu .m-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted-dim);
    margin: 0.8rem 0 0.3rem;
  }
  .docs-menu a { display: block; color: var(--muted); padding: 0.35rem 0; font-size: 14px; }
  .docs-menu a.active { color: var(--accent); }

  @media (max-width: 1100px) {
    .docs { grid-template-columns: 220px minmax(0, var(--content-w)); }
  }
  @media (max-width: 900px) {
    .docs { grid-template-columns: minmax(0, 1fr); gap: 0; padding-top: calc(var(--nav-h) + 2rem); }
    .docs-menu { display: block; }
  }
</style>
