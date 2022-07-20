<script lang="ts" context="module">
  import { browser } from "$app/env";
  import { getLocation, type GeoItem } from "$lib/geo";

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
  export async function _load({ fetch }) {
    if (browser) {
      const { latitude: lat, longitude: lng } = await getLocation();
      const items = await doSearch(fetch, { lat, lng });
      return {
        props: {
          center: { lat, lng },
          items,
        },
      };
    }
  }
</script>

<script lang="ts">
  import Map from "$lib/components/Map.svelte";
  import type * as L from "leaflet";
  export let center: L.LatLngExpression;
  export let items: GeoItem[];
  let map: L.Map;
  let offset = 0;

  async function searchHere() {
    center = map.getCenter();
    items = await doSearch(fetch, center, offset);
  }
  async function loadMore() {
    offset = items.length;
    const newitems = await doSearch(fetch, center, offset);
    items = [...items, ...newitems];
  }
  $: if (map) {
    map.on("locationfound", searchHere);
  }
</script>

<div class="input-group">
  <button class="btn btn-primary" on:click={searchHere}>Search Here</button>
  <button class="btn btn-secondary" on:click={loadMore}>Load More</button>
</div>

{#if browser}
  <Map bind:center {items} bind:map />
{/if}

<style>
  .input-group {
    z-index: 1000;
    margin: auto;
  }
</style>
