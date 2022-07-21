<script lang="ts">
  import type { LatLngExpression, Map } from "leaflet";
  import L from "leaflet?client";
  import ItemCard from "$lib/components/ItemCard.svelte";
  import { mapTiles, type GeoItem } from "$lib/geo";
  import type { Marker } from "leaflet";

  export let center: LatLngExpression;
  export let zoom: number = 10;
  export let items: any[] = [];
  export let container: HTMLElement;
  export const map: Map = L.map(container, { center, zoom })
    .addLayer(L.tileLayer(...mapTiles.openstreetmaps))
    .on("locationfound", (e) => {
      L.circle(e.latlng, e.accuracy / 2, {
        weight: 2,
        color: "blue",
        fillColor: "blue",
        fillOpacity: 0.2,
      }).addTo(map);
    })
    .on("moveend", () => {
      center = map.getCenter();
      zoom = map.getZoom();
    });
  if (!center) map.locate({ setView: true });
  let popup = true;
  function createMarker(item: GeoItem): Marker {
    const { _geo, name } = item;
    const marker: Marker = L.marker(_geo, { title: name }).addTo(map);
    if (popup) {
      const target = document.createElement("DIV");
      new ItemCard({ target, props: { item } });
      marker.bindPopup(target);
    }
    return marker;
  }
  function rebuildMarkers(items: GeoItem[]): Marker[] {
    if (markers) markers.map((m) => map.removeLayer(m)); // clear existing
    return items.map(createMarker);
  }
  $: markers = rebuildMarkers(items);
</script>

<!--
  if you include a slot, by default it will be hidden behind the map.
  So make sure you give it a z-index higher than .leaflet-pane's (400).
-->
<slot />

<style lang="scss">
  @import "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css";
</style>
