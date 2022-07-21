<script>
  import Nav from "$lib/components/Nav.svelte";
  import config from "$lib/config";
  import { metadata } from "$lib/stores";
  import { beforeNavigate } from "$app/navigation";
  // clear out the metadata before navigation
  beforeNavigate(() => ($metadata = { title: "" }));
</script>

<svelte:head>
  <title>{$metadata.title ? `${$metadata.title} | ${config.site.name}` : config.site.name}</title>
</svelte:head>
<header>
  <Nav />
</header>
<main class="container">
  {#if $metadata.headline !== "" || $metadata.title}
    <h1>{$metadata.headline || $metadata.title}</h1>
  {/if}
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
