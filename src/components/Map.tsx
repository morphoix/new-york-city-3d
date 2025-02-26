"use client";

import styled from "styled-components";
import { useMap } from "./useMap";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import { KEYFRAME_SET } from "./mock-data";

export const Map = () => {
  const { mapContainerRef, mapRef } = useMap();

  useEffect(() => {
    const animateCamera = () => {
      if (mapRef.current) {
        setTimeout(() => {
          mapRef.current?.easeTo({
            ...KEYFRAME_SET[0],
            easing: (t) => t,
          });
        }, 0);

        setTimeout(() => {
          mapRef.current?.easeTo({
            ...KEYFRAME_SET[1],
            easing: (t) => t,
          });
        }, KEYFRAME_SET[0].duration);

        setTimeout(() => {
          mapRef.current?.easeTo({
            ...KEYFRAME_SET[2],
            easing: (t) => t,
          });
        }, KEYFRAME_SET[0].duration + KEYFRAME_SET[1].duration);

        setTimeout(() => {
          mapRef.current?.easeTo({
            ...KEYFRAME_SET[3],
            easing: (t) => t,
          });
        }, KEYFRAME_SET[0].duration + KEYFRAME_SET[1].duration + KEYFRAME_SET[2].duration);
      }
    };

    animateCamera();
  }, [mapRef]);

  return <MapContainer ref={mapContainerRef} />;
};

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;
