<script>
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';

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

  // close the mobile menu after navigating to a new route
  afterNavigate(() => (open = false));
</script>

<nav class:scrolled>
  <a href="/" class="nav-logo" aria-label="NextGen Circuitry — home">
    <img src="/NextGen_Ciruitry_Logo.png" alt="NextGen Circuitry" />
  </a>

  <ul class="desktop">
    {#each links as link}
      <li>
        <a href={link.href} class:active={$page.url.pathname === link.href}>
          {link.label}
        </a>
      </li>
    {/each}
    <li>
      <a href="/support" class="nav-cta">SUPPORT US</a>
    </li>
  </ul>

  <button
    class="burger"
    class:open
    aria-label="Toggle menu"
    aria-expanded={open}
    on:click={() => (open = !open)}
  >
    <span></span><span></span><span></span>
  </button>
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
    padding: 0 1.5rem;
    height: 76px;
    background: transparent;
    border-bottom: 1px solid transparent;
    transition: height 0.3s var(--ease), background 0.3s var(--ease),
      border-color 0.3s var(--ease), backdrop-filter 0.3s var(--ease);
  }

  nav.scrolled {
    height: 62px;
    background: rgba(7, 11, 22, 0.72);
    backdrop-filter: blur(14px) saturate(140%);
    border-bottom: 1px solid var(--border);
  }

  .nav-logo img {
    height: 46px;
    width: auto;
    display: block;
    transition: height 0.3s var(--ease), filter 0.3s var(--ease);
  }
  nav.scrolled .nav-logo img { height: 38px; }
  .nav-logo:hover img { filter: drop-shadow(0 0 10px var(--teal-glow-strong)); }

  ul.desktop {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
  }

  ul.desktop a {
    position: relative;
    font-size: 12.5px;
    font-family: var(--font-head);
    color: var(--muted);
    letter-spacing: 0.06em;
    transition: color 0.2s;
  }

  ul.desktop a:not(.nav-cta)::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -7px;
    width: 100%;
    height: 2px;
    background: var(--teal);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s var(--ease);
  }

  ul.desktop a:hover { color: var(--white); }
  ul.desktop a.active { color: var(--teal); }
  ul.desktop a.active::after,
  ul.desktop a:hover:not(.nav-cta)::after { transform: scaleX(1); }

  .nav-cta {
    color: var(--navy) !important;
    background: linear-gradient(180deg, var(--teal-soft), var(--teal));
    padding: 8px 16px;
    border-radius: 999px;
    box-shadow: 0 6px 18px -8px var(--teal-glow-strong);
    transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
  }
  .nav-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -8px var(--teal-glow-strong);
  }

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
    background: var(--white);
    border-radius: 2px;
    transition: transform 0.3s var(--ease), opacity 0.2s;
    margin: 0 auto;
  }
  .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger.open span:nth-child(2) { opacity: 0; }
  .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    position: sticky;
    top: 62px;
    z-index: 99;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem 1.5rem 1.5rem;
    background: rgba(7, 11, 22, 0.96);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    animation: slidedown 0.3s var(--ease);
  }
  .mobile-menu a {
    font-family: var(--font-head);
    font-size: 14px;
    color: var(--muted);
    letter-spacing: 0.06em;
    padding: 0.85rem 0.5rem;
    border-bottom: 1px solid var(--border);
  }
  .mobile-menu a.active { color: var(--teal); }
  .mobile-cta {
    text-align: center;
    margin-top: 0.75rem;
    border-bottom: none !important;
    color: var(--navy) !important;
    background: linear-gradient(180deg, var(--teal-soft), var(--teal));
    border-radius: 999px;
  }

  @keyframes slidedown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 760px) {
    ul.desktop { display: none; }
    .burger { display: flex; }
  }
</style>
