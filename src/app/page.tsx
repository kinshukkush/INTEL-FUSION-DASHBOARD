"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import FAB from "@/components/FAB";

const MapArea = dynamic(() => import("@/components/MapArea"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#0a0a0f" }}>
      {/* Loading screen — shown until loaded */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Dashboard (always mounted, just hidden behind loading screen) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        {/* Full-screen map */}
        <MapArea />

        {/* HUD TopBar */}
        <TopBar />

        {/* Floating sidebar panel */}
        <Sidebar />

        {/* FAB trigger */}
        <FAB />
      </div>
    </div>
  );
}
