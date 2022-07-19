<script>
  import Nav from "$lib/components/Nav.svelte";
</script>

<Nav />
<main class="container">
  <slot />
</main>

<style>
  :global(body) {
    background-color: var(--bs-light);
    min-height: 100vh;
  }
  main {
    background-color: var(--bs-white);
  }
</style>
