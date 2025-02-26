"use client";
import { useState, useEffect } from "react";
import { Map } from "@/components/Map";
import { ANIMATION_DURATION } from "@/components/mock-data";

export default function Home() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, ANIMATION_DURATION + 1000);

    return () => clearInterval(interval);
  }, []);

  return <Map key={key} />;
}
