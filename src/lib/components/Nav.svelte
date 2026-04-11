<script>
  import { page } from '$app/stores';
</script>

<nav>
  <a href="/" class="nav-logo">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="7" height="7" rx="1" stroke="#00e5b0" stroke-width="1.2"/>
      <rect x="11" y="2" width="7" height="7" rx="1" stroke="#00e5b0" stroke-width="1.2"/>
      <rect x="2" y="11" width="7" height="7" rx="1" stroke="#00e5b0" stroke-width="1.2"/>
      <rect x="11" y="11" width="7" height="7" rx="1" stroke="#00e5b0" stroke-width="1.2"/>
    </svg>
    NEXTGEN CIRCUITRY
  </a>

  <ul>
    <li><a href="/" class:active={$page.url.pathname === '/'}>HOME</a></li>
    <li><a href="/about" class:active={$page.url.pathname === '/about'}>ABOUT</a></li>
    <li><a href="/programs" class:active={$page.url.pathname === '/programs'}>PROGRAMS</a></li>
    <li><a href="/contact" class:active={$page.url.pathname === '/contact'}>CONTACT</a></li>
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
</style>
