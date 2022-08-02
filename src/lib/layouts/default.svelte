<script>
  import Author from "$lib/components/Author.svelte";
  import config from "$lib/config";
  const { title, description, author, headline } = $$props;
</script>

<svelte:head>
  <title>{title ? `${title} | ${config.site.name}` : config.site.name}</title>
  {#if description}
    <meta name="description" content={description} />
  {/if}
</svelte:head>

{#if headline !== "" || title}
  <h1>{headline || title}</h1>
{/if}
<slot />
{#if author}
  <hr />
  <Author {author} />
{/if}

<style>
  /* for code syntax highlighting */
  @import "https://unpkg.com/prismjs@1.28.0/themes/prism-okaidia.min.css";
</style>
