<script>
  import Nav from "$lib/components/Nav.svelte";
</script>

<header>
  <Nav />
</header>
<main class="container">
  <slot />
</main>
<footer>
  <div class="bg-dark text-white">
    <div class="container">Copyright &copy; 2022</div>
  </div>
</footer>

<style lang="scss">
  :global(body) {
    background-color: var(--bs-light);
    > :global(div) {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  }
  main {
    background-color: var(--bs-white);
    flex-grow: 1;
    position: relative;
  }
</style>
