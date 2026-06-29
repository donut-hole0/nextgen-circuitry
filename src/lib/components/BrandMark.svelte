<script>
  let { height = 34 } = $props();
</script>

<span class="brand" style="--h:{height}px">
  <img src="/NextGen_Ciruitry_Logo.png" alt="NextGen Circuitry" />
</span>

<style>
  .brand {
    display: inline-flex; align-items: center;
    padding: 6px 10px; border-radius: var(--radius-sm);
    background: #14120f; /* dark chip so the light wordmark reads on cream */
    transition: background 0.3s var(--ease);
  }
  :global([data-theme='dark']) .brand { background: transparent; padding: 0; }
  .brand img { height: var(--h); width: auto; display: block; }
</style>
