<script lang="ts" context="module">
  import { browser } from "$app/env";

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
  export const load = async () => {
    return {
      stuff: { main_class: undefined }, // override default
    };
  };
</script>

<script lang="ts">
  import Map from "$lib/components/Map.svelte";
  import type * as L from "leaflet";
  import { metadata } from "$lib/stores";
  import { latLngBounds } from "leaflet?client";
  import { searchResults, center, zoom } from "$lib/geo";
  let map: L.Map;

  $metadata = { title: "Mapping with Leaflet" };

  function mapFitItems() {
    const { items } = $searchResults;
    if (items.length > 1) {
      const bounds = latLngBounds(items.map((i) => i._geo));
      map.fitBounds(bounds);
    }
  }
  async function searchHere() {
    $searchResults.items = await doSearch(fetch, $center);
    mapFitItems();
  }
  async function loadMore() {
    const newitems = await doSearch(fetch, $center, $searchResults.items.length);
    $searchResults.items = [...$searchResults.items, ...newitems];
    mapFitItems();
  }
  $: if (map) {
    map.on("locationfound", searchHere);
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
