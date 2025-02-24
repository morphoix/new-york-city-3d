"use client";
import { useState, useEffect } from "react";
import { Map } from "@/components/Map";

export default function Home() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1); // Change key to force re-render
    }, 40000); // 40 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  return <Map key={key} />;
}
