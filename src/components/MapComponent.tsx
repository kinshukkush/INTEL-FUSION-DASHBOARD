"use client";

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useIntel } from "@/context/IntelContext";
import L from "leaflet";

function FlyToHandler() {
  const { state } = useIntel();
  const map = useMap();

  useEffect(() => {
    if (state.flyToLocation) {
      map.flyTo(state.flyToLocation, 13, { duration: 1.8, easeLinearity: 0.4 });
    }
  }, [state.flyToLocation, map]);

  return null;
}

const createCustomIcon = (type: string) => {
  const colors: Record<string, { fill: string; glow: string }> = {
    OSINT: { fill: "#3b82f6", glow: "rgba(59,130,246,0.6)" },
    HUMINT: { fill: "#10b981", glow: "rgba(16,185,129,0.6)" },
    IMINT: { fill: "#ef4444", glow: "rgba(239,68,68,0.6)" },
  };
  const { fill, glow } = colors[type] || colors.OSINT;

  const svgIcon = `
    <div style="position:relative; width:36px; height:44px;">
      <!-- Radar ping ring -->
      <div style="
        position:absolute; top:4px; left:4px;
        width:28px; height:28px; border-radius:50%;
        border: 2px solid ${fill};
        opacity:0.7;
        animation: radar-ping 2s ease-out infinite;
      "></div>
      <!-- Pin SVG -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" style="width:36px; height:44px; filter: drop-shadow(0 4px 8px ${glow});">
        <defs>
          <radialGradient id="pinGrad_${type}" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stop-color="${fill}" stop-opacity="1"/>
            <stop offset="100%" stop-color="${fill}" stop-opacity="0.6"/>
          </radialGradient>
        </defs>
        <path d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 18 8 18s8-12.6 8-18c0-4.4-3.6-8-8-8z"
              fill="url(#pinGrad_${type})" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
        <circle cx="12" cy="8" r="3.5" fill="white" fill-opacity="0.95"/>
        <circle cx="12" cy="8" r="1.5" fill="${fill}"/>
      </svg>
    </div>
  `;

  return L.divIcon({
    className: "custom-leaflet-marker !bg-transparent !border-none",
    html: svgIcon,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -46],
  });
};

const TYPE_LABELS: Record<string, string> = {
  OSINT: "Open Source Intelligence",
  HUMINT: "Human Intelligence",
  IMINT: "Imagery Intelligence",
};

const TYPE_COLORS: Record<string, string> = {
  OSINT: "#3b82f6",
  HUMINT: "#10b981",
  IMINT: "#ef4444",
};

export default function MapComponent() {
  const { state } = useIntel();

  return (
    <MapContainer
      center={[22.0, 79.0]}   // India-centered default
      zoom={4}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      <ZoomControl position="bottomright" />
      <FlyToHandler />

      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={60}
        spiderfyOnMaxZoom
        showCoverageOnHover={false}
      >
        {state.intelData.map((data) => {
          const color = TYPE_COLORS[data.type] || "#3b82f6";
          return (
            <Marker
              key={data.id}
              position={[data.lat, data.lng]}
              icon={createCustomIcon(data.type)}
            >
              <Popup>
                <div style={{ fontFamily: "'Geist', monospace", minWidth: "220px", maxWidth: "280px" }}>
                  {/* Header */}
                  <div style={{
                    padding: "12px 14px 10px",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}>
                    <div>
                      <span style={{
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        color,
                        background: `${color}18`,
                        border: `1px solid ${color}40`,
                        padding: "2px 7px",
                        borderRadius: "20px",
                        display: "inline-block",
                        marginBottom: "4px",
                      }}>
                        {data.type}
                      </span>
                      <div style={{ fontSize: "8px", color: "#52525b", fontFamily: "monospace", letterSpacing: "0.08em" }}>
                        {TYPE_LABELS[data.type]}
                      </div>
                    </div>
                    <div style={{ fontSize: "9px", color: "#52525b", fontFamily: "monospace", textAlign: "right", marginTop: "2px" }}>
                      {data.lat.toFixed(4)}<br/>{data.lng.toFixed(4)}
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "10px 14px 12px" }}>
                    <h3 style={{
                      margin: "0 0 6px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#e4e4e7",
                      lineHeight: 1.3,
                    }}>
                      {data.title}
                    </h3>

                    {data.image && (
                      <div style={{
                        marginBottom: "8px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        height: "90px",
                      }}>
                        <img
                          src={data.image}
                          alt={data.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                        />
                      </div>
                    )}

                    <p style={{
                      margin: 0,
                      fontSize: "11px",
                      color: "#71717a",
                      lineHeight: 1.55,
                    }}>
                      {data.description}
                    </p>
                  </div>

                  {/* Coordinates footer */}
                  <div style={{
                    padding: "7px 14px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontSize: "9px", color: "#52525b", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                      INTEL ID: {data.id.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
