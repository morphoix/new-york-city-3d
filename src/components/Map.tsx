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

// interface BoxWithImageProps {
//   imgSrc: string;
//   width: number;
//   height: number;
//   left?: number;
//   right?: number;
//   bottom?: number;
//   top?: number;
// }

// const BoxWithImage: FC<BoxWithImageProps> = ({
//   imgSrc,
//   width,
//   height,
//   top,
//   right,
//   bottom,
//   left,
// }) => {
//   return (
//     <Box
//       imgSrc={imgSrc}
//       width={width}
//       height={height}
//       top={top}
//       right={right}
//       bottom={bottom}
//       left={left}
//     />
//   );
// };

// const Box = styled.div<{
//   imgSrc: string;
//   width: number;
//   height: number;
//   left?: number;
//   right?: number;
//   bottom?: number;
//   top?: number;
// }>`
//   width: ${(props) => props.width}px;
//   height: ${(props) => props.height}px;
//   position: absolute;
//   top: ${(props) => props.top}px;
//   bottom: ${(props) => props.bottom}px;
//   right: ${(props) => props.right}px;
//   left: ${(props) => props.left}px;
//   margin: 56px;
//   z-index: 1;
//   border-radius: 20px;
//   backdrop-filter: blur(35px);
//   background-image: url(${(props) => props.imgSrc});
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   border-radius: 20px;
//   border: 1px solid rgba(255, 255, 255, 0.1);
// `;
