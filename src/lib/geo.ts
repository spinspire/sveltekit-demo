import type { LatLngExpression } from "leaflet";

export interface GeoItem {
  _geo: LatLngExpression;
  [key: string]: any;
}

export const mapTiles = {
  openstreetmaps: [
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ],
  mapbox: [
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      id: "streets-v9",
      accessToken: import.meta.env.VITE_MAPBOX_APIKEY,
    },
  ],
};
export async function getLocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (typeof navigator?.geolocation?.getCurrentPosition === "function") {
      navigator.geolocation.getCurrentPosition((pos) => {
        resolve(pos.coords);
      }, reject);
    } else {
      reject();
    }
  });
}
