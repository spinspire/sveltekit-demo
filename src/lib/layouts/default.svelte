<script>
  import { metadata } from "$lib/stores";
  export let title = "";
  export let headline = "";
  export let description = "";
  export let date = "";
  export let author = "";
  $: $metadata = { ...$metadata, title, headline, description, date, author };
</script>

<slot />

<style>
  /* for code syntax highlighting */
  @import "https://unpkg.com/prismjs@1.28.0/themes/prism-okaidia.min.css";
</style>
