"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useIntel } from "@/context/IntelContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, FileText, Menu, Shield, Radio, Zap } from "lucide-react";
import DropzoneArea from "./DropzoneArea";
import gsap from "gsap";

const TYPE_COLORS: Record<string, string> = {
  OSINT: "#3b82f6",
  HUMINT: "#10b981",
  IMINT: "#ef4444",
};

export default function Sidebar() {
  const { state, dispatch } = useIntel();
  const [searchQuery, setSearchQuery] = useState("");
  const countRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredData = useMemo(() => {
    return state.intelData.filter((item) => {
      const matchFilter =
        state.activeFilter === "ALL" || item.type === state.activeFilter;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [state.intelData, state.activeFilter, searchQuery]);

  // GSAP Counter Animation
  useEffect(() => {
    if (countRef.current) {
      gsap.fromTo(
        countRef.current,
        { innerHTML: 0 },
        {
          innerHTML: filteredData.length,
          duration: 0.8,
          snap: { innerHTML: 1 },
          ease: "power3.out",
        }
      );
    }
  }, [filteredData.length]);

  // GSAP header entrance flicker on open
  useEffect(() => {
    if (state.sidebarOpen && headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    }
  }, [state.sidebarOpen]);

  const stats = useMemo(() => ({
    osint: state.intelData.filter((d) => d.type === "OSINT").length,
    humint: state.intelData.filter((d) => d.type === "HUMINT").length,
    imint: state.intelData.filter((d) => d.type === "IMINT").length,
  }), [state.intelData]);

  return (
    <>
      {/* ── Backdrop (click outside to close) ── */}
      <AnimatePresence>
        {state.sidebarOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-[2px]"
            style={{ cursor: "default" }}
          />
        )}
      </AnimatePresence>

      {/* ── Floating Panel ── */}
      <AnimatePresence>
        {state.sidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: -450, opacity: 0, scale: 0.97 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -450, opacity: 0, scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 32,
              opacity: { duration: 0.2 },
            }}
            className="fixed left-4 top-4 bottom-4 z-[100] flex flex-col rounded-2xl overflow-hidden
                       animate-pulse-glow animate-border-glow"
            style={{
              width: "420px",
              background:
                "linear-gradient(160deg, rgba(14,14,22,0.97) 0%, rgba(10,10,18,0.98) 100%)",
              border: "1px solid rgba(59,130,246,0.2)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Scanline overlay */}
            <div className="scanline-overlay absolute inset-0 pointer-events-none z-0" />

            {/* ── HEADER ── */}
            <div
              ref={headerRef}
              className="relative z-10 flex justify-between items-center px-5 py-4 border-b"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              {/* Logo + Title */}
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl"
                  style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}>
                  <Shield size={18} className="text-blue-400" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 status-dot" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-wider uppercase text-white"
                    style={{ letterSpacing: "0.12em" }}>
                    Intel Fusion
                  </h2>
                  <p className="text-[10px] text-blue-400/70 font-mono tracking-widest uppercase hud-flicker">
                    ● LIVE FEED ACTIVE
                  </p>
                </div>
              </div>

              {/* Close */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
                className="p-2 rounded-lg transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <X size={16} className="text-zinc-400 hover:text-white transition-colors" />
              </motion.button>
            </div>

            {/* ── STATS ROW ── */}
            <div className="relative z-10 grid grid-cols-3 gap-2 px-4 pt-3 pb-2">
              {[
                { label: "OSINT", count: stats.osint, color: "#3b82f6", icon: Radio },
                { label: "HUMINT", count: stats.humint, color: "#10b981", icon: Shield },
                { label: "IMINT", count: stats.imint, color: "#ef4444", icon: Zap },
              ].map(({ label, count, color, icon: Icon }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.04 }}
                  className="flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer"
                  style={{
                    background: `${color}12`,
                    border: `1px solid ${color}30`,
                  }}
                  onClick={() => dispatch({ type: "SET_FILTER", payload: label as any })}
                >
                  <Icon size={13} style={{ color }} />
                  <span className="text-lg font-bold mt-1" style={{ color }}>{count}</span>
                  <span className="text-[9px] font-bold tracking-widest" style={{ color: `${color}99` }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* ── SEARCH & FILTER ── */}
            <div className="relative z-10 px-4 pb-3 border-b flex flex-col gap-2.5"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search intel reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 pl-9 pr-3 text-sm rounded-lg focus:outline-none
                             placeholder:text-zinc-600 text-zinc-200 transition-all"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    border: searchQuery
                      ? "1px solid rgba(59,130,246,0.5)"
                      : "1px solid rgba(255,255,255,0.07)",
                  }}
                />
                <Search size={14} className="absolute left-3 top-3 text-zinc-500" />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-1.5">
                {["ALL", "OSINT", "HUMINT", "IMINT"].map((filter) => {
                  const color =
                    filter === "OSINT" ? "#3b82f6" :
                      filter === "HUMINT" ? "#10b981" :
                        filter === "IMINT" ? "#ef4444" :
                          "#ffffff";
                  const isActive = state.activeFilter === filter;
                  return (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        dispatch({ type: "SET_FILTER", payload: filter as any })
                      }
                      className="flex-1 text-[10px] font-bold py-1.5 rounded-lg tracking-widest transition-all uppercase"
                      style={{
                        background: isActive ? `${color}22` : "transparent",
                        border: `1px solid ${isActive ? color + "60" : "rgba(255,255,255,0.08)"}`,
                        color: isActive ? color : "#71717a",
                      }}
                    >
                      {filter}
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Count */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 status-dot" />
                  <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">
                    Active Reports
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    ref={countRef}
                    className="text-base font-bold text-white font-mono"
                  >
                    0
                  </span>
                  <span className="text-[10px] text-zinc-600 font-mono">
                    / {state.intelData.length}
                  </span>
                </div>
              </div>
            </div>

            {/* ── INTEL LIST ── */}
            <div className="relative z-10 flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredData.map((item, index) => {
                  const color = TYPE_COLORS[item.type] || "#3b82f6";
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{
                        duration: 0.22,
                        delay: index * 0.04,
                        scale: { type: "spring", stiffness: 400, damping: 25 },
                      }}
                      onClick={() =>
                        dispatch({ type: "FLY_TO", payload: [item.lat, item.lng] })
                      }
                      whileHover={{ x: 4 }}
                      className="group relative rounded-xl cursor-pointer overflow-hidden shimmer-hover transition-all"
                      style={{
                        background: "rgba(0,0,0,0.3)",
                        border: `1px solid rgba(255,255,255,0.06)`,
                      }}
                    >
                      {/* Color accent bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl transition-all group-hover:w-1"
                        style={{ background: color }}
                      />

                      <div className="pl-3 pr-3 py-3">
                        {/* Top row */}
                        <div className="flex justify-between items-start mb-1.5">
                          <span
                            className="text-[9px] font-black px-2 py-0.5 rounded-full tracking-widest uppercase"
                            style={{
                              background: `${color}20`,
                              color,
                              border: `1px solid ${color}40`,
                            }}
                          >
                            {item.type}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] text-zinc-600 font-mono">
                              {item.lat.toFixed(2)},{item.lng.toFixed(2)}
                            </span>
                            <FileText
                              size={12}
                              className="text-zinc-600 group-hover:text-zinc-300 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="font-semibold text-sm text-zinc-200 line-clamp-1 leading-tight group-hover:text-white transition-colors">
                          {item.title}
                        </h4>

                        {/* Description */}
                        <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1 leading-relaxed group-hover:text-zinc-400 transition-colors">
                          {item.description}
                        </p>

                        {/* Image preview */}
                        {item.image && (
                          <div className="mt-2 rounded-lg overflow-hidden h-20">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                            />
                          </div>
                        )}

                        {/* Fly-to hint */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="mt-1.5 flex items-center gap-1 text-[9px] font-mono tracking-wider"
                          style={{ color }}
                        >
                          <span>→ FLY TO LOCATION</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredData.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center mt-12 gap-3"
                >
                  <Shield size={32} className="text-zinc-700" />
                  <p className="text-sm text-zinc-600 text-center font-mono">
                    NO REPORTS MATCH CURRENT FILTER
                  </p>
                  <p className="text-xs text-zinc-700 text-center">
                    Try adjusting your search or filter type
                  </p>
                </motion.div>
              )}
            </div>

            {/* ── DROPZONE ── */}
            <div className="relative z-10 px-4 pt-3 pb-4 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
              <p className="text-[9px] font-mono text-zinc-600 tracking-widest uppercase mb-2">
                ⬆ INGEST INTELLIGENCE
              </p>
              <DropzoneArea />
            </div>

            {/* ── FOOTER ── */}
            <div className="relative z-10 px-5 py-2.5 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)" }}>
              <span className="text-[9px] font-mono text-zinc-700 tracking-widest uppercase hud-flicker">
                INTEL FUSION v2.0
              </span>
              <span className="text-[9px] font-mono text-zinc-700 tracking-widest uppercase">
                BY KINSHUK SAXENA
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Open Toggle Button (when sidebar closed) ── */}
      <AnimatePresence>
        {!state.sidebarOpen && (
          <motion.button
            key="open-btn"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            className="fixed top-4 left-4 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl transition-all"
            style={{
              background: "rgba(14,14,22,0.92)",
              border: "1px solid rgba(59,130,246,0.3)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.08)",
            }}
          >
            <Shield size={18} className="text-blue-400" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white tracking-wide">Intel Fusion</span>
              <span className="text-[9px] text-zinc-500 font-mono tracking-widest hud-flicker">
                ● LIVE
              </span>
            </div>
            <Menu size={16} className="text-zinc-500 ml-1" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
