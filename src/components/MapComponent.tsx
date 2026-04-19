"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useIntel } from "@/context/IntelContext";

function FlyToHandler() {
  const { state } = useIntel();
  const map = useMap();

  useEffect(() => {
    if (state.flyToLocation) {
      map.flyTo(state.flyToLocation, 14, { duration: 1.5 });
    }
  }, [state.flyToLocation, map]);

  return null;
}

export default function MapComponent() {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      className="w-full h-full z-[100]"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      <FlyToHandler />
    </MapContainer>
  );
}
