<script lang="ts">
  import config from "$lib/config";

  export let author = "";
  $: ({ name = author, href } = config.authors[author] || {});
</script>

{#if name}
  <span>
    Authored by <a {href} target="_blank">{name}</a>
  </span>
{/if}
