<script>
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import BrandMark from '$lib/components/BrandMark.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  let scrolled = $state(false);
  let open = $state(false);

  const links = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/programs', label: 'PROGRAMS' },
    { href: '/contact', label: 'CONTACT' }
  ];

  onMount(() => {
    const onScroll = () => (scrolled = window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  afterNavigate(() => (open = false));
</script>

<nav class:scrolled>
  <a href="/" class="nav-logo" aria-label="NextGen Circuitry — home">
    <BrandMark height={30} />
  </a>

  <ul class="desktop">
    {#each links as link}
      <li>
        <a href={link.href} class:active={$page.url.pathname === link.href}>
          {link.label}
        </a>
      </li>
    {/each}
  </ul>

  <div class="nav-right">
    <a href="/support" class="nav-cta">SUPPORT US</a>
    <ThemeToggle />
    <button
      class="burger"
      class:open
      aria-label="Toggle menu"
      aria-expanded={open}
      onclick={() => (open = !open)}
    >
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

{#if open}
  <div class="mobile-menu">
    {#each links as link}
      <a href={link.href} class:active={$page.url.pathname === link.href}>{link.label}</a>
    {/each}
    <a href="/support" class="nav-cta mobile-cta">SUPPORT US</a>
  </div>
{/if}

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0 1.5rem;
    height: var(--nav-h);
    background: color-mix(in srgb, var(--bg) 80%, transparent);
    backdrop-filter: blur(12px) saturate(140%);
    border-bottom: 1px solid transparent;
    transition: background 0.3s var(--ease), border-color 0.3s var(--ease);
  }
  nav.scrolled { border-bottom-color: var(--border); }

  .nav-logo { display: inline-flex; align-items: center; }

  ul.desktop {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
    margin-left: auto;
  }
  ul.desktop a {
    position: relative;
    font-size: 12.5px;
    font-family: var(--font-mono);
    color: var(--muted);
    letter-spacing: 0.06em;
    transition: color 0.2s;
  }
  ul.desktop a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -7px;
    width: 100%;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s var(--ease);
  }
  ul.desktop a:hover { color: var(--text); }
  ul.desktop a.active { color: var(--accent); }
  ul.desktop a.active::after,
  ul.desktop a:hover::after { transform: scaleX(1); }

  .nav-right { display: flex; align-items: center; gap: 0.85rem; }

  .nav-cta {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: #ffffff;
    background: var(--accent);
    padding: 9px 16px;
    border-radius: var(--radius-sm);
    transition: background 0.25s var(--ease);
  }
  .nav-cta:hover { background: var(--accent-strong); }

  /* Burger */
  .burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 38px;
    height: 38px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  .burger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: transform 0.3s var(--ease), opacity 0.2s;
    margin: 0 auto;
  }
  .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger.open span:nth-child(2) { opacity: 0; }
  .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    position: sticky;
    top: var(--nav-h);
    z-index: 99;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem 1.5rem 1.5rem;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    animation: slidedown 0.3s var(--ease);
  }
  .mobile-menu a {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--muted);
    letter-spacing: 0.06em;
    padding: 0.85rem 0.5rem;
    border-bottom: 1px solid var(--border);
  }
  .mobile-menu a.active { color: var(--accent); }
  .mobile-cta {
    text-align: center;
    margin-top: 0.75rem;
    border-bottom: none !important;
    color: #ffffff !important;
    background: var(--accent);
    border-radius: var(--radius-sm);
  }

  @keyframes slidedown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 760px) {
    ul.desktop { display: none; }
    .nav-cta { display: none; }
    .burger { display: flex; }
  }
</style>
