"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useIntel } from "@/context/IntelContext";
import L from "leaflet";

// ─── Fix default marker icons pointing to missing Next.js /_next/ paths ───
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ─── FlyTo handler ───
function FlyToHandler() {
  const { state } = useIntel();
  const map = useMap();
  useEffect(() => {
    if (state.flyToLocation) {
      map.flyTo(state.flyToLocation, 13, { duration: 1.8, easeLinearity: 0.35 });
    }
  }, [state.flyToLocation, map]);
  return null;
}

// ─── Custom markers per type ───
function createMarker(type: string): L.DivIcon {
  const colors: Record<string, { main: string; glow: string }> = {
    OSINT:  { main: "#3b82f6", glow: "rgba(59,130,246,0.7)" },
    HUMINT: { main: "#10b981", glow: "rgba(16,185,129,0.7)" },
    IMINT:  { main: "#ef4444", glow: "rgba(239,68,68,0.7)"  },
  };
  const { main, glow } = colors[type] || colors.OSINT;

  // Ping keyframe injected inline
  const pingStyle = `
    @keyframes ping-${type} {
      0%   { transform: translate(-50%,-50%) scale(0.5); opacity: 1; }
      100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0; }
    }
    @keyframes float-${type} {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-4px); }
    }
  `;

  const isOSINT  = type === "OSINT";
  const isHUMINT = type === "HUMINT";
  const isIMINT  = type === "IMINT";

  // Shape SVG per type
  let shapeSvg = "";
  if (isOSINT) {
    // Circle
    shapeSvg = `<circle cx="18" cy="18" r="10" fill="url(#g${type})" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
                <circle cx="18" cy="18" r="4" fill="white" fill-opacity="0.9"/>`;
  } else if (isHUMINT) {
    // Diamond
    shapeSvg = `<polygon points="18,6 28,18 18,30 8,18" fill="url(#g${type})" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
                <circle cx="18" cy="18" r="4" fill="white" fill-opacity="0.9"/>`;
  } else {
    // Pentagon (IMINT)
    shapeSvg = `<polygon points="18,5 30,14 25,28 11,28 6,14" fill="url(#g${type})" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
                <circle cx="18" cy="18" r="4" fill="white" fill-opacity="0.9"/>`;
  }

  const html = `
    <style>${pingStyle}</style>
    <div style="position:relative;width:36px;height:36px;cursor:pointer;animation:float-${type} 3s ease-in-out infinite;">
      <!-- Ping ring -->
      <div style="
        position:absolute;top:50%;left:50%;
        width:36px;height:36px;border-radius:50%;
        border:2px solid ${main};
        animation:ping-${type} 2s ease-out infinite;
        pointer-events:none;
      "></div>
      <!-- Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"
           style="width:36px;height:36px;filter:drop-shadow(0 4px 10px ${glow})">
        <defs>
          <radialGradient id="g${type}" cx="40%" cy="30%" r="65%">
            <stop offset="0%" stop-color="${main}" stop-opacity="1"/>
            <stop offset="100%" stop-color="${main}" stop-opacity="0.55"/>
          </radialGradient>
        </defs>
        ${shapeSvg}
      </svg>
    </div>
  `;

  return L.divIcon({
    className: "!bg-transparent !border-none !shadow-none",
    html,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -22],
  });
}

// ─── Popup content ───
function formatTS(ts: string) {
  try {
    const d = new Date(ts);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", timeZone: "UTC",
    }) + " UTC";
  } catch { return ts; }
}

function popupHTML(data: any): string {
  const color = data.type === "OSINT" ? "#3b82f6" : data.type === "HUMINT" ? "#10b981" : "#ef4444";
  const dash = (data.confidence / 100) * 100;
  const imgBlock = data.imageUrl
    ? `<div style="overflow:hidden;border-radius:10px 10px 0 0;height:100px;flex-shrink:0;">
         <img src="${data.imageUrl}" alt="" style="width:100%;height:100%;object-fit:cover;opacity:0.85;transition:transform 0.3s;"
              onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"/>
       </div>`
    : "";

  return `
    <div style="font-family:monospace;color:#e4e4e7;min-width:260px;max-width:320px;">
      ${imgBlock}
      <div style="padding:12px 14px;display:flex;flex-direction:column;gap:7px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:9px;font-weight:800;letter-spacing:0.14em;color:${color};
                background:${color}20;border:1px solid ${color}40;padding:2px 8px;border-radius:20px;">
            ${data.type}
          </span>
          <span style="font-size:9px;color:rgba(255,255,255,0.35);">
            ${(data.lat).toFixed(4)}°N · ${(data.lng).toFixed(4)}°E
          </span>
        </div>
        <h3 style="margin:0;font-size:13px;font-weight:700;color:#fff;line-height:1.3;">${data.title}</h3>
        <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);line-height:1.55;">${data.description}</p>
        <!-- Confidence bar -->
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="font-size:9px;color:rgba(255,255,255,0.3);letter-spacing:0.1em;">CONFIDENCE</span>
            <span style="font-size:9px;color:${color};font-weight:700;">${data.confidence}%</span>
          </div>
          <div style="height:4px;background:rgba(255,255,255,0.07);border-radius:4px;overflow:hidden;">
            <div style="width:${dash}%;height:100%;background:linear-gradient(90deg,${color}80,${color});border-radius:4px;box-shadow:0 0 8px ${color}60;"></div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;
                    border-top:1px solid rgba(255,255,255,0.06);">
          <span style="font-size:9px;color:rgba(255,255,255,0.25);letter-spacing:0.06em;">${data.source || ""}</span>
          <span style="font-size:9px;color:rgba(255,255,255,0.25);">${formatTS(data.timestamp || "")}</span>
        </div>
      </div>
    </div>
  `;
}

// ─── Map Component ───
export default function MapComponent() {
  const { state } = useIntel();

  return (
    <MapContainer
      center={[22.5, 82.0]}
      zoom={5}
      className="w-full h-full"
      zoomControl={false}
      preferCanvas={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        maxZoom={19}
      />
      <ZoomControl position="bottomright" />
      <FlyToHandler />

      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={60}
        spiderfyOnMaxZoom
        showCoverageOnHover={false}
        iconCreateFunction={(cluster: any) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            className: "!border-none !bg-transparent",
            html: `<div style="
              width:40px;height:40px;border-radius:50%;
              background:rgba(59,130,246,0.15);
              border:1.5px solid rgba(59,130,246,0.45);
              display:flex;align-items:center;justify-content:center;
              font-family:monospace;font-weight:700;font-size:13px;color:#fff;
              backdrop-filter:blur(8px);
              box-shadow:0 0 16px rgba(59,130,246,0.2);
            ">${count}</div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          });
        }}
      >
        {state.intelData.map((item) => (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={createMarker(item.type)}
          >
            <Popup>
              <div dangerouslySetInnerHTML={{ __html: popupHTML(item) }} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
