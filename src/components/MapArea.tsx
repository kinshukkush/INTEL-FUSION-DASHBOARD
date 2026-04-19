"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function MapArea() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <MapComponent />
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[200]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      {/* Top + bottom fade bars */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-[200]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,15,0.7) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none z-[200]"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,15,0.5) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
