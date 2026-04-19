"use client";

import dynamic from "next/dynamic";
import { useIntel } from "@/context/IntelContext";
import { Menu } from "lucide-react";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function MapArea() {
  const { state, dispatch } = useIntel();

  return (
    <div className="w-full h-screen relative bg-intel-bg-primary">
      {!state.sidebarOpen && (
        <button
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          className="absolute top-4 left-4 z-[400] p-3 bg-intel-glass backdrop-blur-md border border-intel-glass-border text-white rounded-md shadow-lg hover:bg-white/10 transition-colors"
        >
          <Menu size={24} />
        </button>
      )}

      <MapComponent />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-[200]"></div>
    </div>
  );
}
