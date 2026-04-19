"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radar } from "lucide-react";
import { useIntel } from "@/context/IntelContext";

export default function FAB() {
  const { dispatch } = useIntel();

  return (
    <motion.button
      id="fab-open-sidebar"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => dispatch({ type: "SET_SIDEBAR", payload: true })}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center animate-fab-glow"
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)",
        border: "1px solid rgba(147,197,253,0.3)",
      }}
      title="Open Intelligence Panel"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        whileHover={{ transition: { duration: 3, repeat: Infinity, ease: "linear" } }}
        className="flex items-center justify-center"
      >
        <Radar size={24} className="text-white" />
      </motion.div>
    </motion.button>
  );
}
