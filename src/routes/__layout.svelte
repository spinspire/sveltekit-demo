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
