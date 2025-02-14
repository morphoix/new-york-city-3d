"use client";

import styled from "styled-components";
import { useMap } from "./useMap";
import "mapbox-gl/dist/mapbox-gl.css";
import { FC, useEffect, useState } from "react";
import { KEYFRAME_SET } from "./mock-data";

const KEYFRAME_DURATION = 14000;

export const Map = () => {
  const { mapContainerRef, mapRef } = useMap();
  const [showsRest, setShowsRest] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowsRest(true);
    }, 3 * KEYFRAME_DURATION);
  }, []);

  useEffect(() => {
    const animateCamera = () => {
      if (mapRef.current) {
        KEYFRAME_SET.forEach((keyframe, index) => {
          setTimeout(() => {
            mapRef.current?.easeTo({
              ...keyframe,
              duration: KEYFRAME_DURATION,
              easing: (t) => t,
            });
          }, index * KEYFRAME_DURATION);
        });
      }
    };

    animateCamera();
  }, [mapRef]);

  return (
    <MapContainer ref={mapContainerRef}>
      {showsRest ? (
        <>
          <BoxWithImage
            imgSrc="/box_3.png"
            width={1080}
            height={477}
            bottom={0}
            left={0}
          />
          <BoxWithImage
            imgSrc="/box_4.png"
            width={392}
            height={294}
            top={100}
            right={0}
          />
        </>
      ) : (
        <>
          <BoxWithImage
            imgSrc="/box_1.png"
            width={349.33}
            height={392}
            left={0}
            bottom={0}
          />
          <BoxWithImage
            imgSrc="/box_2.png"
            width={520}
            height={267}
            right={0}
          />
        </>
      )}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

interface BoxWithImageProps {
  imgSrc: string;
  width: number;
  height: number;
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
}

const BoxWithImage: FC<BoxWithImageProps> = ({
  imgSrc,
  width,
  height,
  top,
  right,
  bottom,
  left,
}) => {
  return (
    <Box
      imgSrc={imgSrc}
      width={width}
      height={height}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
    />
  );
};

const Box = styled.div<{
  imgSrc: string;
  width: number;
  height: number;
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: absolute;
  top: ${(props) => props.top}px;
  bottom: ${(props) => props.bottom}px;
  right: ${(props) => props.right}px;
  left: ${(props) => props.left}px;
  margin: 56px;
  z-index: 1;
  border-radius: 20px;
  backdrop-filter: blur(35px);
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;
