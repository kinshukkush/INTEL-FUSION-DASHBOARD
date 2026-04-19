"use client";

import React from "react";
import { useIntel } from "@/context/IntelContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Sidebar() {
  const { state, dispatch } = useIntel();

  return (
    <AnimatePresence>
      {state.sidebarOpen && (
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 h-full w-[320px] bg-intel-glass bg-opacity-70 backdrop-blur-md border-r border-intel-glass-border z-50 text-intel-text-primary p-4 flex flex-col shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-intel-osint via-intel-humint to-intel-imint">Intel Dashboard</h2>
            <button
              onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
              className="p-1 hover:bg-white/10 rounded-md transition-colors"
            >
              <X size={20} className="text-intel-text-secondary hover:text-white" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <p className="text-sm text-intel-text-secondary">Placeholder for Filter Controls & Intel List (Phase 3)</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
