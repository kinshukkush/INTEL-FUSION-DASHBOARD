"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useIntel } from "@/context/IntelContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, FileText, Menu } from "lucide-react";
import DropzoneArea from "./DropzoneArea";
import gsap from "gsap";

export default function Sidebar() {
  const { state, dispatch } = useIntel();
  const [searchQuery, setSearchQuery] = useState("");
  const countRef = useRef<HTMLSpanElement>(null);

  const filteredData = useMemo(() => {
    return state.intelData.filter(item => {
      const matchFilter = state.activeFilter === "ALL" || item.type === state.activeFilter;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [state.intelData, state.activeFilter, searchQuery]);

  // GSAP Counter Animation
  useEffect(() => {
    if (countRef.current) {
      gsap.to(countRef.current, {
        innerHTML: filteredData.length,
        duration: 0.5,
        snap: { innerHTML: 1 },
        ease: "power2.out",
      });
    }
  }, [filteredData.length]);

  return (
    <>
    <AnimatePresence>
      {state.sidebarOpen && (
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 h-full w-[320px] bg-intel-glass bg-opacity-70 backdrop-blur-md border-r border-intel-glass-border z-50 text-intel-text-primary flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-intel-glass-border">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-intel-osint via-intel-humint to-intel-imint">
              Intel Dashboard
            </h2>
            <button
              onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
              className="p-1 hover:bg-white/10 rounded-md transition-colors"
            >
              <X size={20} className="text-intel-text-secondary hover:text-white" />
            </button>
          </div>

          {/* Search & Filter */}
          <div className="p-4 border-b border-intel-glass-border flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search intel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-intel-glass-border rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-intel-osint transition-colors text-intel-text-primary"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-intel-text-secondary" />
            </div>

            <div className="flex justify-between gap-1">
              {["ALL", "OSINT", "HUMINT", "IMINT"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => dispatch({ type: "SET_FILTER", payload: filter as any })}
                  className={`text-xs font-semibold py-1 px-2 rounded transition-colors ${
                    state.activeFilter === filter
                      ? filter === "OSINT" ? "bg-intel-osint text-white" :
                        filter === "HUMINT" ? "bg-intel-humint text-white" :
                        filter === "IMINT" ? "bg-intel-imint text-white" :
                        "bg-white/20 text-white"
                      : "bg-transparent text-intel-text-secondary hover:bg-white/10 border border-intel-glass-border"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-intel-text-secondary font-medium tracking-wide">
              <span>ACTIVE REPORTS:</span>
              <span ref={countRef} className="text-white font-bold text-sm">
                0
              </span>
            </div>
          </div>

          {/* List Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => dispatch({ type: "FLY_TO", payload: [item.lat, item.lng] })}
                  className="bg-black/30 border border-intel-glass-border hover:border-white/30 rounded-lg p-3 cursor-pointer transition-all hover:bg-white/5 active:scale-[0.98] group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span 
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${
                        item.type === "OSINT" ? "bg-intel-osint" :
                        item.type === "HUMINT" ? "bg-intel-humint" : "bg-intel-imint"
                      }`}
                    >
                      {item.type}
                    </span>
                    <FileText size={14} className="text-intel-text-secondary group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-semibold text-sm text-intel-text-primary leading-tight line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-intel-text-secondary line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredData.length === 0 && (
              <div className="text-center text-intel-text-secondary text-sm mt-10 opacity-60">
                No reports matching filter.
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-intel-glass-border bg-black/20">
            <DropzoneArea />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    
    {/* Open Toggle Button */}
    {!state.sidebarOpen && (
      <button 
        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
        className="fixed top-4 left-4 z-50 bg-black/60 p-2 rounded-md hover:bg-black/80 backdrop-blur-md border border-intel-glass-border text-white transition-all shadow-lg"
      >
        <Menu size={24} />
      </button>
    )}
    </>
  );
}
