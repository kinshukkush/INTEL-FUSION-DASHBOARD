"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import FAB from "@/components/FAB";
import { useIntel } from "@/context/IntelContext";

const MapArea = dynamic(() => import("@/components/MapArea"), { ssr: false });

function DashboardWithContext() {
  const { dispatch } = useIntel();

  /** Auto-sync from MongoDB on mount — fails silently, keeps mock data on error */
  useEffect(() => {
    const sync = async () => {
      dispatch({ type: "SET_DB_STATUS", payload: { status: "loading" } });
      try {
        const res = await fetch("/api/intel");
        const json = await res.json();
        if (json.success && json.data?.length > 0) {
          dispatch({ type: "APPEND_DATA", payload: json.data });
          dispatch({ type: "SET_DB_STATUS", payload: { status: "synced", count: json.count } });
        } else if (json.success) {
          // Connected but empty — no data seeded yet
          dispatch({ type: "SET_DB_STATUS", payload: { status: "synced", count: 0 } });
        } else {
          // API returned error (IP block, missing URI, etc.) — fail silently, keep mock data
          dispatch({ type: "SET_DB_STATUS", payload: { status: "idle" } });
        }
      } catch {
        // Network/fetch error — fail silently, keep mock data visible
        dispatch({ type: "SET_DB_STATUS", payload: { status: "idle" } });
      }
    };
    sync();
  }, [dispatch]);

  return (
    <>
      <MapArea />
      <TopBar />
      <Sidebar />
      <FAB />
    </>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <DashboardWithContext />
      </div>
    </div>
  );
}
