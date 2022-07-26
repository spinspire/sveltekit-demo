<script lang="ts" context="module">
  const BASE_URL = "https://ms-cp.office2.spinspire.com";
  async function doSearch(fetch: Function, center: L.LatLng, offset = 0, limit = 40) {
    const { lat, lng } = center;
    const url = `${BASE_URL}/indexes/dispensaries/search?limit=${limit}&offset=${offset}&sort=_geoPoint(${lat},${lng}):asc`;
    const response = await fetch(url);
    if (response.ok) {
      const { hits: items } = await response.json();
      return items;
    }
  }

  export async function load() {
    return {
      stuff: {
        main_class: undefined, // override default
        metadata: {
          title: "Mapping with Leaflet",
          headline: "",
        },
      },
    };
  }
</script>

<script lang="ts">
  import { browser } from "$app/env";
  import Map from "$lib/components/Map.svelte";
  import type * as L from "leaflet";
  import { searchResults, center, zoom } from "$lib/geo";
  let map: L.Map;

  async function searchHere() {
    $searchResults.items = await doSearch(fetch, $center);
  }
  async function loadMore() {
    const newitems = await doSearch(fetch, $center, $searchResults.items.length);
    $searchResults.items = [...$searchResults.items, ...newitems];
  }
  $: if (map) {
    map.once("locationfound", searchHere);
  }
  let container: HTMLElement;
</script>

<div class="mymap" bind:this={container}>
  {#if browser && container}
    <Map
      bind:center={$center}
      items={$searchResults.items}
      bind:zoom={$zoom}
      bind:map
      bind:container
    >
      <div class="input-group justify-content-end p-2">
        <button class="btn btn-primary" on:click={searchHere}>Search Here</button>
        <button class="btn btn-secondary" on:click={loadMore}>Load More</button>
      </div>
    </Map>
  {/if}
</div>

<style lang="scss">
  :global(main) {
    display: flex;
    flex-direction: column;
  }
  .mymap {
    flex-grow: 1;
  }
  .input-group {
    top: 0;
    right: 0;
    z-index: 401; // one more than .leaflet-pane
  }
</style>
