---
title: About Us
headline: About
---

<script>
  import Map from "$lib/components/Map.svelte";
  import { browser } from "$app/env";
  let container;
  const items = [
    {
      name: "SpinSpire",
      phone_number: "904-638-2918",
      email: "info@spinspire.com",
      image_url: "https://spinspire.com/sites/spinspire.com/themes/spinspire_foundation/images/logo-05.png",
      _geo: {lat: 30.333359, lng: -81.5965467},
    },
  ];
</script>

Here's an example of what amazing things you can do with Svelte and Svelte Kit.

1. This page is written in [Markdown syntax](https://www.markdownguide.org/), not Svelte or HTML. See [sources](https://raw.githubusercontent.com/spinspire/sveltekit-demo/master/src/routes/about.md).
1. The filename is `about.md` yet it can mix Svelte code and Markdown.
1. And thus, it can use Svelte code, and embed Svelte components.
1. It can use Svelte Kit based layouts.

Below is a Svelte component plopped right in the middle of Markdown content.

<div bind:this={container} class="mymap">
  {#if browser && container}
    <Map container={container} items={items}/>
  {/if}
</div>

And here's more Markdown.

The above map was embedded using following code ... (And yes, `code syntax highlighting` is automatic!)

```svelte
---
front: matter
---
<script>
import Map from "$lib/components/Map.svelte";
</script>
... Markdown content ...
<Map container={container} items={items}/>
... Markdown content ...
```

<style>
  :global(main) {
    display: flex;
    flex-direction: column;
  }
  .mymap {
    flex-grow: 1;
    min-height: 300px;
  }
</style>
