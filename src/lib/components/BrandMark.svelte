<script>
  let { height = 30 } = $props();
</script>

<span class="brand" style="--h:{height}px">
  <img src="/NextGen_Ciruitry_Logo.png" alt="NextGen Circuitry" />
</span>

<style>
  .brand { display: inline-flex; align-items: center; }
  .brand img { height: var(--h); width: auto; display: block; border-radius: 6px; }
</style>
