"use client";

import React, { useEffect, useState } from "react";
import { Satellite, Settings } from "lucide-react";
import { useIntel } from "@/context/IntelContext";

export default function TopBar() {
  const { state } = useIntel();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d: Date) => {
    const day = d.getUTCDate().toString().padStart(2, "0");
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const mon = months[d.getUTCMonth()];
    const yr = d.getUTCFullYear();
    const hh = d.getUTCHours().toString().padStart(2, "0");
    const mm = d.getUTCMinutes().toString().padStart(2, "0");
    const ss = d.getUTCSeconds().toString().padStart(2, "0");
    return `${day} ${mon} ${yr}  ·  ${hh}:${mm}:${ss} UTC`;
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6"
      style={{
        height: 60,
        background: "linear-gradient(to bottom, rgba(10,10,15,0.94) 0%, rgba(10,10,15,0) 100%)",
        pointerEvents: "none",
      }}
    >
      {/* LEFT — Brand */}
      <div className="flex items-center gap-2.5" style={{ pointerEvents: "auto" }}>
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.25)",
          }}
        >
          <Satellite size={16} className="text-blue-400" />
        </div>
        <div>
          <h1
            className="text-xs font-bold tracking-[0.2em] uppercase text-white hidden sm:block"
            style={{ textShadow: "0 0 16px rgba(59,130,246,0.5)", letterSpacing: "0.2em" }}
          >
            INTEL FUSION DASHBOARD
          </h1>
          <h1
            className="text-xs font-bold tracking-widest uppercase text-white block sm:hidden"
            style={{ textShadow: "0 0 12px rgba(59,130,246,0.4)" }}
          >
            INTEL FUSION
          </h1>
          <p className="text-[9px] font-mono hud-flicker hidden sm:block"
            style={{ color: "rgba(59,130,246,0.5)", letterSpacing: "0.15em" }}>
            ● MULTI-SOURCE ACTIVE
          </p>
        </div>
      </div>

      {/* CENTER — Clock (hidden on mobile) */}
      <div className="hidden md:flex flex-col items-center" style={{ pointerEvents: "auto" }}>
        {now && (
          <span
            className="font-mono text-xs tracking-widest text-white/60"
            style={{ textShadow: "0 0 10px rgba(59,130,246,0.3)" }}
          >
            {formatDate(now)}
          </span>
        )}
      </div>

      {/* RIGHT — Total count + gear */}
      <div className="flex items-center gap-2.5" style={{ pointerEvents: "auto" }}>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(10,10,15,0.8)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 status-dot" />
          <span className="font-mono text-xs text-white/70">
            {state.intelData.length} POINTS
          </span>
        </div>
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Settings size={14} className="text-white/30" />
        </div>
      </div>
    </div>
  );
}
