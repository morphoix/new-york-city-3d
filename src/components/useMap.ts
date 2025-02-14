"use client";

import { useEffect, useRef } from "react";

import mapboxgl from "mapbox-gl";
import { PIN_DATA } from "./mock-data";

export const ISSUE_MARKER = {
  id: "issue-marker",
  url: "/issue-marker.png",
};

export const ASSET_MARKER = {
  id: "asset-marker",
  url: "/asset-marker.png",
};

export const createMarkerLayer = (
  id: string,
  iconId: string,
  markerType: string,
  source: "markers"
) => ({
  id,
  type: "symbol",
  source,
  layout: {
    "icon-image": iconId,
    "icon-size": 0.65,
    "icon-allow-overlap": true,
    "icon-anchor": "center",
  },

  filter: [
    "all",
    [">=", ["zoom"], 16],
    ["==", ["get", "mapMarker"], markerType],
  ],
});

const issueLayer = createMarkerLayer(
  "issues",
  "issue-marker",
  "issue",
  "markers"
);
const assetLayer = createMarkerLayer(
  "assets",
  "asset-marker",
  "asset",
  "markers"
);

const layers = [issueLayer, assetLayer] as mapboxgl.Layer[];

export const APP_MARKERS = [ISSUE_MARKER, ASSET_MARKER];

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const INITIAL_STATE = {
  center: {
    lng: -74.01766840391261,
    lat: 40.69881970096151,
  },
  zoom: 17.89243517801523,
  pitch: 81.60647884924101,
  bearing: 29.394442146609208,
};

export const useMap = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      antialias: true,
      style: "mapbox://styles/valeriabolonicheva/cm6z2un0j004801qv7vgcaurz",
      ...INITIAL_STATE,
    });

    mapRef.current = map;

    const addMarkerIcons = () => {
      if (!map) return;

      APP_MARKERS.forEach(({ id, url }) =>
        map.loadImage(url, (error, image) => {
          if (!error && image) map.addImage(id, image);
        })
      );
    };

    map.on("load", () => {
      addMarkerIcons();
      map.addSource("markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: PIN_DATA.map(({ lng, lat, markerType }) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            properties: {
              mapMarker: markerType,
            },
          })),
        },
      });

      layers.forEach((layer) => map.addLayer(layer));
    });

    // map.on("click", (e) => {
    //   console.log(e.lngLat);
    // });

    map.on("move", () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      const pitch = map.getPitch();
      const bearing = map.getBearing();
      console.log({ center, zoom, pitch, bearing });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return { mapContainerRef, mapRef };
};
