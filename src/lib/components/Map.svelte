<script lang="ts">
  import type { LatLngExpression, Map } from "leaflet";
  import L from "leaflet?client";
  import { onMount } from "svelte";
  import ItemCard from "$lib/components/ItemCard.svelte";
  import { mapTiles, type GeoItem } from "$lib/geo";
  import type { Marker } from "leaflet";

  export let center: LatLngExpression;
  export let zoom: number = 10;
  export let items: any[] = [];
  export let map: Map;
  let markers: L.Marker[] = [];
  let elem: HTMLElement;

  onMount(async () => {
    map = L.map(elem, { center, zoom });
    map.on("locationfound", (e) => {
      e.latlng.lat;
      L.circle(e.latlng, e.accuracy / 2, {
        weight: 2,
        color: "blue",
        fillColor: "blue",
        fillOpacity: 0.2,
      }).addTo(map);
    });

    if (!center) map.locate({ setView: true });
    map.on("moveend", () => {
      center = map.getCenter();
      zoom = map.getZoom();
    });
    // L.control.locate().addTo(map);
    L.tileLayer(...mapTiles.openstreetmaps).addTo(map);
  });
  let popup = true;
  function createMarker(item: GeoItem) {
    const { _geo, name } = item;
    const marker: Marker = L.marker(_geo, { title: name }).addTo(map);
    if (popup) {
      const target = document.createElement("DIV");
      new ItemCard({ target, props: { item } });
      marker.bindPopup(target);
    }
    return marker;
  }
  function rebuildMarkers(items: GeoItem[]) {
    markers.map((m) => map.removeLayer(m));
    if (items.length > 1) {
      const bounds = L.latLngBounds(items.map((i) => i._geo));
      map.fitBounds(bounds);
    }
    return items.map(createMarker);
  }
  // $: map && map.flyTo(center, zoom);
  $: markers = map ? rebuildMarkers(items) : [];
</script>

<div bind:this={elem} class="mymap" />

<style>
  @import "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css";
  .mymap {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
</style>
