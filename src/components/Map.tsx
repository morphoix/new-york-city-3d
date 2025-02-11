"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Map } from "react-map-gl/mapbox";
import styled from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Initial camera view state
const INITIAL_VIEW_STATE = {
  longitude: -74.0135,
  latitude: 40.7128,
  zoom: 15,
  pitch: 70,
  bearing: 180,
};

const KEYFRAMES_SET = {
  animation1: [
    { longitude: -74.05, latitude: 40.68, zoom: 12, pitch: 60, bearing: 0 },
    { longitude: -74.016, latitude: 40.705, zoom: 14, pitch: 70, bearing: 20 },
    {
      longitude: -74.0135,
      latitude: 40.7128,
      zoom: 15,
      pitch: 75,
      bearing: 45,
    },
    {
      longitude: -74.012,
      latitude: 40.716,
      zoom: 16.5,
      pitch: 65,
      bearing: 90,
    },
    { longitude: -74.01, latitude: 40.725, zoom: 18, pitch: 45, bearing: 120 },
    { longitude: -74.009, latitude: 40.735, zoom: 18, pitch: 40, bearing: 180 },
    { longitude: -73.975, latitude: 40.769, zoom: 14, pitch: 60, bearing: 270 },
  ],
  animation2: [
    { longitude: -74.0135, latitude: 40.7128, zoom: 15, pitch: 70, bearing: 0 },
    { longitude: -74.009, latitude: 40.7215, zoom: 16, pitch: 75, bearing: 20 },
    { longitude: -73.9851, latitude: 40.758, zoom: 17, pitch: 80, bearing: 45 },
    {
      longitude: -73.973,
      latitude: 40.769,
      zoom: 15.5,
      pitch: 65,
      bearing: 90,
    },
    { longitude: -74.011, latitude: 40.738, zoom: 16, pitch: 70, bearing: 180 },
    { longitude: -73.96, latitude: 40.7705, zoom: 14, pitch: 75, bearing: 140 },
    {
      longitude: -73.9851,
      latitude: 40.758,
      zoom: 16,
      pitch: 70,
      bearing: 250,
    },
  ],
};

type Keyframe = typeof INITIAL_VIEW_STATE;

const NewYorkMap = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const [activeKeyframes, setActiveKeyframes] = useState<Keyframe[]>(
    KEYFRAMES_SET.animation1
  );

  const lerp = useCallback(
    (start: number, end: number, t: number) => start + t * (end - start),
    []
  );

  const interpolateViewState = useCallback(
    (start: Keyframe, end: Keyframe, t: number) => ({
      longitude: lerp(start.longitude, end.longitude, t),
      latitude: lerp(start.latitude, end.latitude, t),
      zoom: lerp(start.zoom, end.zoom, t),
      pitch: lerp(start.pitch, end.pitch, t),
      bearing: lerp(start.bearing, end.bearing, t),
    }),
    [lerp]
  );

  const animateCamera = useCallback(
    (keyframes: Keyframe[], duration = 45000) => {
      let animationFrame: number | null = null;
      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const frameIndex = Math.floor(progress * (keyframes.length - 1));
        const nextFrameIndex = Math.min(frameIndex + 1, keyframes.length - 1);
        const localProgress = (progress * (keyframes.length - 1)) % 1;

        const newViewState = interpolateViewState(
          keyframes[frameIndex],
          keyframes[nextFrameIndex],
          localProgress
        );

        if (mapRef.current) {
          mapRef.current.flyTo({ ...newViewState, duration: 0 });
        }

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    },
    [interpolateViewState]
  );

  useEffect(() => {
    const cancelAnimation = animateCamera(activeKeyframes);

    return cancelAnimation;
  }, [activeKeyframes, animateCamera]);

  const handleSwitchAnimation = (keyframes: Keyframe[]) => {
    setActiveKeyframes(keyframes);
  };

  return (
    <MapWrapper>
      <Map
        ref={mapRef}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="mapbox://styles/valeriabolonicheva/cm6z2un0j004801qv7vgcaurz"
        mapboxAccessToken={MAPBOX_TOKEN}
      />
      <ControlsWrapper>
        <button
          onClick={handleSwitchAnimation.bind(null, KEYFRAMES_SET.animation1)}
          className={
            activeKeyframes === KEYFRAMES_SET.animation1 ? "active" : ""
          }
        >
          Animation 1
        </button>
        <button
          onClick={handleSwitchAnimation.bind(null, KEYFRAMES_SET.animation2)}
          className={
            activeKeyframes === KEYFRAMES_SET.animation2 ? "active" : ""
          }
        >
          Animation 2
        </button>
      </ControlsWrapper>
    </MapWrapper>
  );
};

export default NewYorkMap;

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const ControlsWrapper = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;

  button {
    all: unset;
    background-color: black;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #333;
    }

    &.active {
      color: orange;
      font-weight: bold;
    }
  }
`;
