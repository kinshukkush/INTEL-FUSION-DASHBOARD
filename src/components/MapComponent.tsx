"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useIntel } from "@/context/IntelContext";
import L from "leaflet";

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

const createCustomIcon = (type: string) => {
  let color = "#3b82f6"; // OSINT blue
  if (type === "HUMINT") color = "#10b981"; // HUMINT green
  if (type === "IMINT") color = "#ef4444"; // IMINT red

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5));">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3" fill="white"></circle>
    </svg>
  `;

  return L.divIcon({
    className: "custom-leaflet-marker bg-transparent border-none",
    html: svgIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export default function MapComponent() {
  const { state } = useIntel();

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={3}
      className="w-full h-full z-[100]"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      <FlyToHandler />
      
      {state.intelData.map((data) => (
        <Marker 
          key={data.id} 
          position={[data.lat, data.lng]} 
          icon={createCustomIcon(data.type)}
        >
          <Popup className="custom-popup">
            <div className="flex flex-col gap-2 p-1 min-w-[200px]">
              <div className="flex justify-between items-center bg-intel-bg-secondary p-2 rounded-t-md border-b border-intel-glass-border -m-1 mb-1">
                <span className="font-bold text-sm text-intel-text-primary uppercase tracking-wider">{data.type}</span>
                <span className="text-xs text-intel-text-secondary opacity-70">
                  {data.lat.toFixed(2)}, {data.lng.toFixed(2)}
                </span>
              </div>
              <h3 className="font-semibold text-intel-text-primary mt-1 leading-tight">{data.title}</h3>
              {data.image && (
                <div className="mt-1 mb-1 rounded overflow-hidden">
                  <img src={data.image} alt={data.title} className="w-full h-24 object-cover" />
                </div>
              )}
              <p className="text-sm text-intel-text-secondary leading-snug">{data.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
