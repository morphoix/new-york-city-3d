"use client";

import React, { useRef, useEffect, useState } from "react";
import { Map } from "react-map-gl/mapbox";
import styled from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const INITIAL_VIEW_STATE = {
  longitude: -74.0135,
  latitude: 40.7128,
  zoom: 15,
  pitch: 70,
  bearing: 180,
};

type Keyframe = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
};

const ANIMATION_KEYFRAMES_2 = [
  // Start near One World Trade Center
  {
    longitude: -74.0135,
    latitude: 40.7128,
    zoom: 15,
    pitch: 70,
    bearing: 0,
  },
  // Fly north along West Street
  {
    longitude: -74.009,
    latitude: 40.7215,
    zoom: 16,
    pitch: 75,
    bearing: 20,
  },
  // Pass by Times Square
  {
    longitude: -73.9851,
    latitude: 40.758,
    zoom: 17,
    pitch: 80,
    bearing: 45,
  },
  // Fly across Central Park from the south
  {
    longitude: -73.973,
    latitude: 40.769,
    zoom: 15.5,
    pitch: 65,
    bearing: 90,
  },
  // Fly through the GreenWich Street
  {
    longitude: -74.011,
    latitude: 40.738,
    zoom: 16,
    pitch: 70,
    bearing: 180,
  },
  // Turn towards the East River
  {
    longitude: -73.96,
    latitude: 40.7705,
    zoom: 14,
    pitch: 75,
    bearing: 140,
  },
  // Circle back towards Midtown
  {
    longitude: -73.9851,
    latitude: 40.758,
    zoom: 16,
    pitch: 70,
    bearing: 250,
  },
  // Finish with a slow move back near the One World Trade Center
  {
    longitude: -74.0135,
    latitude: 40.7128,
    zoom: 14,
    pitch: 60,
    bearing: 0,
  },
];

const ANIMATION_KEYFRAMES_1 = [
  // Start over the ocean, approaching Manhattan
  {
    longitude: -74.05,
    latitude: 40.68,
    zoom: 12,
    pitch: 60,
    bearing: 0,
  },
  // Fly towards the Financial District skyline
  {
    longitude: -74.016,
    latitude: 40.705,
    zoom: 14,
    pitch: 70,
    bearing: 20,
  },
  // Approach One World Trade Center
  {
    longitude: -74.0135,
    latitude: 40.7128,
    zoom: 15,
    pitch: 75,
    bearing: 45,
  },
  // Descend closer to Greenwich Street, starting to lower the camera angle
  {
    longitude: -74.012,
    latitude: 40.716,
    zoom: 16.5,
    pitch: 65,
    bearing: 90,
  },
  // Move down Greenwich Street, simulating a car ride
  {
    longitude: -74.01,
    latitude: 40.725,
    zoom: 18,
    pitch: 45,
    bearing: 120,
  },
  // Continue along Greenwich Street with a sweeping curve
  {
    longitude: -74.009,
    latitude: 40.735,
    zoom: 18,
    pitch: 40,
    bearing: 180,
  },
  // Slowly ascend and pan towards Central Park as the final scene
  {
    longitude: -73.975,
    latitude: 40.769,
    zoom: 14,
    pitch: 60,
    bearing: 270,
  },
];

const NewYorkMap = () => {
  const mapRef = useRef(null);
  const [keyframes, setKeyframes] = useState<Keyframe[]>(ANIMATION_KEYFRAMES_1);

  useEffect(() => {
    let animationFrame: number | null = null;
    let progress = 0;
    const duration = 45000;

    const lerp = (start: number, end: number, t: number) =>
      start + t * (end - start);

    const interpolateViewState = (
      startKeyframe: Keyframe,
      endKeyframe: Keyframe,
      t: number
    ) => ({
      longitude: lerp(startKeyframe.longitude, endKeyframe.longitude, t),
      latitude: lerp(startKeyframe.latitude, endKeyframe.latitude, t),
      zoom: lerp(startKeyframe.zoom, endKeyframe.zoom, t),
      pitch: lerp(startKeyframe.pitch, endKeyframe.pitch, t),
      bearing: lerp(startKeyframe.bearing, endKeyframe.bearing, t),
    });

    const animate = (timestamp: number) => {
      if (!animationFrame) animationFrame = timestamp;
      const elapsed = timestamp - animationFrame;

      progress = Math.min(elapsed / duration, 1);

      const keyframeIndex = Math.floor(progress * (keyframes.length - 1));
      const nextKeyframeIndex = Math.min(
        keyframeIndex + 1,
        keyframes.length - 1
      );
      const localProgress = (progress * (keyframes.length - 1)) % 1;

      const newViewState = interpolateViewState(
        keyframes[keyframeIndex],
        keyframes[nextKeyframeIndex],
        localProgress
      );

      if (mapRef.current) {
        mapRef.current?.flyTo({ ...newViewState, duration: 0 });
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [keyframes]);

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
          onClick={() => {
            setKeyframes(ANIMATION_KEYFRAMES_1);
          }}
          className={keyframes === ANIMATION_KEYFRAMES_1 ? "active" : ""}
        >
          Keyframe 1
        </button>
        <button
          onClick={() => {
            setKeyframes(ANIMATION_KEYFRAMES_2);
          }}
          className={keyframes === ANIMATION_KEYFRAMES_2 ? "active" : ""}
        >
          Keyframe 2
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

  > button {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }
`;

const ControlsWrapper = styled.div`
  display: inline-flex;
  gap: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;

  > button {
    all: unset;
    background-color: black;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #333;
    }
  }

  > button.active {
    color: darkorange;
  }
`;
