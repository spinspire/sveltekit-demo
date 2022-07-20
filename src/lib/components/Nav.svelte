<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  const home = "/";
  const links = [
    ["Home", home],
    ["About", "/about/"],
    ["Map", "/map/"],
  ];
  let show = false;
  afterNavigate(() => (show = false));
</script>

<div class="bg-primary text-white">
  <nav class="navbar navbar-expand-lg container">
    <div class="container-fluid">
      <a href={`${base}${home}`} class="navbar-brand"
        ><img
          src="https://github.com/sveltejs/branding/raw/master/svelte-logo.png"
          alt="Svelte Logo"
        /></a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        on:click={() => (show = !show)}
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div class="collapse navbar-collapse" class:show>
        <ul class="navbar-nav">
          {#each links as [text, href]}
            <li class="nav-item">
              <a
                href={`${base}${href}`}
                class="nav-link"
                aria-current={href === $page.url.pathname ? "page" : undefined}
                class:active={href === $page.url.pathname}
              >
                {text}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </nav>
</div>

<style lang="scss">
  .navbar-brand > img {
    max-width: 4rem;
    max-height: 4rem;
  }
  .nav-link {
    color: inherit;
    &.active {
      text-decoration: underline;
    }
  }
</style>
