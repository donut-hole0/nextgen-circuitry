<script module>
  export const navGroups = [
    {
      label: 'Get started',
      links: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' }
      ]
    },
    {
      label: 'Programs',
      links: [{ href: '/programs', label: 'Programs' }]
    },
    {
      label: 'Get involved',
      links: [
        { href: '/support', label: 'Support us' },
        { href: '/contact', label: 'Contact' }
      ]
    }
  ];
</script>

<script>
  import { page } from '$app/stores';
</script>

<aside class="sidebar">
  {#each navGroups as group (group.label)}
    <div class="group">
      <span class="group-label">{group.label}</span>
      {#each group.links as link (link.href)}
        <a href={link.href} class:active={$page.url.pathname === link.href}>{link.label}</a>
      {/each}
    </div>
  {/each}
</aside>

<style>
  .sidebar {
    position: sticky;
    top: calc(var(--nav-h) + 1.5rem);
    align-self: start;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    font-size: 14px;
  }
  .group { display: flex; flex-direction: column; gap: 0.4rem; }
  .group-label {
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted-dim);
    margin-bottom: 0.3rem;
  }
  .group a {
    color: var(--muted);
    padding: 3px 0 3px 12px;
    border-left: 2px solid var(--border);
    transition: color 0.2s, border-color 0.2s;
  }
  .group a:hover { color: var(--text); }
  .group a.active { color: var(--accent); border-left-color: var(--accent); font-weight: 500; }

  @media (max-width: 900px) {
    .sidebar { display: none; }
  }
</style>
