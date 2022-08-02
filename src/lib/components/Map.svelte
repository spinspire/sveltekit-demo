<script lang="ts">
  import type { LatLngExpression, Map } from "leaflet";
  import L from "leaflet?client";
  import "leaflet.locatecontrol?client";
  import "leaflet.locatecontrol/dist/L.Control.Locate.css";
  import "leaflet/dist/leaflet.css";
  import ItemCard from "$lib/components/ItemCard.svelte";
  import { mapTiles, type GeoItem } from "$lib/geo";
  import type { Marker } from "leaflet";
  import iconUrl from "leaflet/dist/images/marker-icon.png";
  import shadowUrl from "leaflet/dist/images/marker-shadow.png";
  // have to do this otherwise the icons don't get included in build
  const icon = L.icon({ iconUrl, shadowUrl });

  export let center: LatLngExpression;
  export let zoom: number = 10;
  export let items: any[] = [];
  export let container: HTMLElement;
  const osm = L.tileLayer(...mapTiles.openstreetmaps);
  const markers = L.layerGroup();
  export const map: Map = L.map(container, {
    center,
    zoom,
    layers: [osm, markers],
  }).on("moveend", () => {
    center = map.getCenter();
    zoom = map.getZoom();
  });
  const locateOptions = {
    flyTo: true,
    returnToPrevBounds: true,
  };
  L.control.locate(locateOptions).addTo(map);
  const baseLayers = { OpenStreetMap: osm };
  const overlays = { Markers: markers };
  L.control.layers(baseLayers, overlays, { position: "topleft" }).addTo(map);
  if (!center) map.locate({ setView: true });
  let popup = true;
  function createMarker(item: GeoItem): Marker {
    const { _geo, name } = item;
    const marker: Marker = L.marker(_geo, { title: name, icon });
    if (popup) {
      const target = document.createElement("DIV");
      new ItemCard({ target, props: { item } });
      marker.bindPopup(target);
    }
    return marker;
  }
  function rebuildMarkers(items: GeoItem[]) {
    markers.getLayers().map((l) => l.remove()); // clear existing
    items.map(createMarker).map((m) => m.addTo(markers));
    if (items.length > 1) {
      map.fitBounds(items.map((i) => i._geo));
    }
  }
  $: rebuildMarkers(items);
</script>

<!--
  if you include a slot, by default it will be hidden behind the map.
  So make sure you give it a z-index higher than .leaflet-pane's (400).
-->
<slot />
