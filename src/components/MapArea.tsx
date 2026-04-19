"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "#0a0a0f" }}
    />
  ),
});

export default function MapArea() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <MapComponent />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)",
          zIndex: 10,
        }}
      />
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 80,
          background: "linear-gradient(to bottom, rgba(10,10,15,0.5) 0%, transparent 100%)",
          zIndex: 10,
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 60,
          background: "linear-gradient(to top, rgba(10,10,15,0.4) 0%, transparent 100%)",
          zIndex: 10,
        }}
      />
    </div>
  );
}
