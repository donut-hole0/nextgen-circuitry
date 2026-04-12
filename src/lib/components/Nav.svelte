<script>
  import { page } from '$app/stores';
</script>

<nav>
  <a href="/" class="nav-logo">
  <img src="/NextGen_Ciruitry_Logo.png" alt="NextGen Circuitry" height="50" />
</a>

  <ul>
    <li><a href="/" class:active={$page.url.pathname === '/'}>HOME</a></li>
    <li><a href="/about" class:active={$page.url.pathname === '/about'}>ABOUT</a></li>
    <li><a href="/programs" class:active={$page.url.pathname === '/programs'}>PROGRAMS</a></li>
    <li><a href="/contact" class:active={$page.url.pathname === '/contact'}>CONTACT</a></li>
    <li><a href="/support" class:active={$page.url.pathname === '/support'}>SUPPORT</a></li>
  </ul>
</nav>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 15, 30, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 0.5px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    height: 60px;
  }

  .nav-logo {
    font-family: var(--font-head);
    font-size: 14px;
    color: var(--teal);
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  ul {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  ul a {
    font-size: 13px;
    font-family: var(--font-head);
    color: var(--muted);
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }

  ul a:hover,
  ul a.active {
    color: var(--teal);
  }

  .nav-logo img {
  height: 50px;
  width: auto;
}

</style>
