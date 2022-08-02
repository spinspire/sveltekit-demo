<script context="module">
  export async function load() {
    return {
      // default stuff
      stuff: {
        main_class: "container",
      },
    };
  }
</script>

<script>
  import Nav from "$lib/components/Nav.svelte";
  import config from "$lib/config";
  const {
    site: { copy },
  } = config;
  import { metadata } from "$lib/stores";
  import { beforeNavigate } from "$app/navigation";
  import Author from "$lib/components/Author.svelte";
  import { page } from "$app/stores";
  // clear out the metadata before navigation
  beforeNavigate(() => ($metadata = { title: "" }));
</script>

<svelte:head>
  <title>{$metadata.title ? `${$metadata.title} | ${config.site.name}` : config.site.name}</title>
  {#if $metadata.description}
    <meta name="description" content={$metadata.description} />
  {/if}
</svelte:head>
<header>
  <Nav />
</header>
<main class={$page.stuff.main_class}>
  {#if $metadata.headline !== "" || $metadata.title}
    <h1>{$metadata.headline || $metadata.title}</h1>
  {/if}
  <slot />
</main>
<footer>
  <div class="bg-dark text-white">
    <div class="container">
      <span>
        Copyright &copy; {copy.year} <a href={copy.href} target="_blank">{copy.name}</a>.
      </span>
      <span class="d-none d-md-inline">
        <i class="bi bi-github" />
        Source <a href={config.site.source} target="_blank">code</a>.
      </span>
      <span class="d-none d-md-inline">
        Built with <a href="https://kit.svelte.dev" target="_blank">SvelteKit</a>.
      </span>
      <span>
        <Author author={$metadata.author} />
      </span>
    </div>
  </div>
</footer>

<style lang="scss">
  :global(body) {
    background-color: var(--bs-light);
    > :global(div) {
      min-height: 100vh; // fill out the page height
      display: flex;
      flex-direction: column;
    }
  }
  main {
    background-color: var(--bs-white);
    flex-grow: 1; // occupy all available height
    position: relative;
  }
  footer {
    .container {
      > span {
        white-space: nowrap;
      }
    }
  }
</style>
