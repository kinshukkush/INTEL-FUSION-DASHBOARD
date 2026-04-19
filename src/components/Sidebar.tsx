"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  ChevronDown,
  ChevronUp,
  UploadCloud,
  FileJson,
  FileSpreadsheet,
  CheckCircle2,
  Radar,
} from "lucide-react";
import { useIntel } from "@/context/IntelContext";
import { IntelData } from "@/lib/intelData";
import gsap from "gsap";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";

const TYPE_COLOR: Record<string, string> = {
  OSINT: "#3b82f6",
  HUMINT: "#10b981",
  IMINT: "#ef4444",
};

function ConfidenceRing({ value, color }: { value: number; color: string }) {
  const r = 11;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" className="flex-shrink-0">
      <circle cx={14} cy={14} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2.5} />
      <circle
        cx={14} cy={14} r={r}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 14 14)"
        style={{ opacity: 0.9 }}
      />
      <text x={14} y={14} textAnchor="middle" dominantBaseline="central"
        fontSize={7} fill="rgba(255,255,255,0.7)" fontFamily="monospace" fontWeight="bold">
        {value}
      </text>
    </svg>
  );
}

function StatCard({ label, count, color }: { label: string; count: number; color: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (numRef.current) {
      gsap.fromTo(
        numRef.current,
        { innerHTML: 0 },
        { innerHTML: count, duration: 1.5, snap: { innerHTML: 1 }, ease: "power2.out" }
      );
    }
  }, [count]);

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl glass-card cursor-pointer"
      style={{
        background: `${color}0d`,
        border: `1px solid ${color}25`,
        boxShadow: `0 0 16px ${color}08`,
      }}
    >
      <div className="w-1.5 h-1.5 rounded-full mb-1.5 status-dot" style={{ background: color }} />
      <span ref={numRef} className="text-xl font-bold font-mono" style={{ color }}>0</span>
      <span className="text-[9px] font-bold tracking-[0.15em] mt-0.5" style={{ color: `${color}80` }}>
        {label}
      </span>
    </div>
  );
}

function IntelListItem({
  item,
  index,
  onSelect,
}: {
  item: IntelData;
  index: number;
  onSelect: () => void;
}) {
  const color = TYPE_COLOR[item.type] || "#3b82f6";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, delay: index * 0.05 } },
      }}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -16 }}
      onClick={onSelect}
      whileHover={{ x: 4 }}
      className="group relative flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Left border accent */}
      <div
        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full transition-all group-hover:opacity-100 opacity-0"
        style={{ background: color }}
      />

      {/* Pulse dot */}
      <div className="flex-shrink-0 mt-1.5 relative">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: color,
            animation: "radar-ping 2s ease-out infinite",
            transform: "translate(-50%,-50%) scale(0.5)",
            top: "50%",
            left: "50%",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className="text-[8px] font-black tracking-[0.12em] px-1.5 py-0.5 rounded-full"
            style={{ background: `${color}20`, color, border: `1px solid ${color}35` }}
          >
            {item.type}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-white leading-tight truncate group-hover:text-blue-200 transition-colors">
          {item.title}
        </h4>
        <p className="text-[11px] leading-relaxed mt-0.5 line-clamp-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          {item.description}
        </p>
      </div>

      {/* Confidence ring */}
      <ConfidenceRing value={item.confidence} color={color} />
    </motion.div>
  );
}

function DropzoneSection({ onDataLoaded }: { onDataLoaded: (data: IntelData[]) => void }) {
  const { state } = useIntel();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"file" | "paste">("file");
  const [success, setSuccess] = useState(0);
  const [pasteText, setPasteText] = useState("");
  const [pasteError, setPasteError] = useState("");

  // ── Shared parser ──────────────────────────────────────────────────────────
  const parseText = useCallback(
    (text: string, hint: "json" | "csv" | "auto") => {
      const isJson =
        hint === "json" ||
        (hint === "auto" && text.trimStart().startsWith("[") || text.trimStart().startsWith("{"));

      if (isJson) {
        try {
          const parsed = JSON.parse(text);
          const arr: IntelData[] = Array.isArray(parsed) ? parsed : [parsed];
          const valid = arr.filter((d: any) => d.lat && d.lng && d.type);
          if (valid.length === 0) { setPasteError("No valid records found (need lat, lng, type)."); return; }
          onDataLoaded([...state.intelData, ...valid]);
          setSuccess(valid.length);
          setPasteError("");
          setTimeout(() => setSuccess(0), 3000);
        } catch {
          setPasteError("Invalid JSON. Check your format.");
        }
      } else {
        Papa.parse<any>(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (res) => {
            const valid = res.data
              .map((r: any) => ({
                id: r.id || Math.random().toString(36).slice(2),
                lat: parseFloat(r.lat),
                lng: parseFloat(r.lng),
                type: (r.type || "OSINT").toUpperCase(),
                title: r.title || "Unknown",
                description: r.description || "",
                imageUrl: r.imageUrl || r.image,
                confidence: parseInt(r.confidence) || 70,
                timestamp: r.timestamp || new Date().toISOString(),
                source: r.source || "Paste",
              }))
              .filter((d: any) => !isNaN(d.lat) && !isNaN(d.lng));
            if (valid.length === 0) { setPasteError("No valid rows found (need lat, lng, type columns)."); return; }
            onDataLoaded([...state.intelData, ...valid]);
            setSuccess(valid.length);
            setPasteError("");
            setTimeout(() => setSuccess(0), 3000);
          },
        });
      }
    },
    [state.intelData, onDataLoaded]
  );

  // ── File drop handler ──────────────────────────────────────────────────────
  const onDrop = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result as string;
          parseText(text, file.name.endsWith(".json") ? "json" : "csv");
        };
        reader.readAsText(file);
      });
    },
    [parseText]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/json": [".json"], "text/csv": [".csv"] },
    maxSize: 5 * 1024 * 1024,
    noClick: false,
  });

  const handlePasteIngest = () => {
    if (!pasteText.trim()) { setPasteError("Please paste some data first."); return; }
    parseText(pasteText, "auto");
  };

  const TAB_BTN = (id: "file" | "paste", label: string) => (
    <button
      key={id}
      onClick={() => { setTab(id); setPasteError(""); setSuccess(0); }}
      className="flex-1 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-lg transition-all"
      style={{
        background: tab === id ? "rgba(59,130,246,0.15)" : "transparent",
        color: tab === id ? "#3b82f6" : "rgba(255,255,255,0.3)",
        border: `1px solid ${tab === id ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.07)"}`,
      }}
    >
      {label}
    </button>
  );

  return (
    <div>
      {/* ── Accordion Toggle ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wider btn-hover transition-all"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        <div className="flex items-center gap-2">
          <UploadCloud size={14} />
          <span>INGEST DATA</span>
        </div>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div className="pt-2 space-y-2">
              {/* ── Tab Switcher ── */}
              <div className="flex gap-1.5">
                {TAB_BTN("file", "📁 Drop / Browse")}
                {TAB_BTN("paste", "📋 Paste Text")}
              </div>

              {/* ── Success Banner ── */}
              <AnimatePresence>
                {success > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}
                  >
                    <CheckCircle2 size={14} className="text-green-400 flex-shrink-0" />
                    <span className="text-xs font-bold text-green-400 font-mono">
                      +{success} RECORDS INGESTED SUCCESSFULLY
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Error Banner ── */}
              <AnimatePresence>
                {pasteError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-mono px-2"
                    style={{ color: "#ef4444" }}
                  >
                    ⚠ {pasteError}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* ── TAB: FILE DROP ── */}
              <AnimatePresence mode="wait">
                {tab === "file" && (
                  <motion.div
                    key="file-tab"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <motion.div
                      {...(getRootProps() as any)}
                      whileHover={{ scale: 1.01 }}
                      className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl cursor-pointer transition-all text-center"
                      style={{
                        border: `1.5px dashed ${isDragActive ? "rgba(59,130,246,0.7)" : "rgba(255,255,255,0.12)"}`,
                        background: isDragActive ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.02)",
                        minHeight: 104,
                      }}
                    >
                      <input {...getInputProps()} />
                      <div className="flex gap-3">
                        <FileJson size={18} className={isDragActive ? "text-blue-400" : "text-white/30"} />
                        <UploadCloud size={22} className={isDragActive ? "text-blue-400" : "text-white/40"} />
                        <FileSpreadsheet size={18} className={isDragActive ? "text-blue-400" : "text-white/30"} />
                      </div>
                      <p className="text-xs font-medium" style={{ color: isDragActive ? "#3b82f6" : "rgba(255,255,255,0.35)" }}>
                        {isDragActive ? "Release to ingest intel" : "Drag & drop or click to browse"}
                      </p>
                      <p className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.15)" }}>
                        MAX 5MB · .JSON · .CSV
                      </p>
                    </motion.div>
                  </motion.div>
                )}

                {/* ── TAB: PASTE TEXT ── */}
                {tab === "paste" && (
                  <motion.div
                    key="paste-tab"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-2"
                  >
                    <textarea
                      value={pasteText}
                      onChange={(e) => { setPasteText(e.target.value); setPasteError(""); }}
                      placeholder={`Paste JSON array or CSV text here…\n\nJSON example:\n[{"id":"1","lat":28.61,"lng":77.20,"type":"OSINT","title":"Test","description":"...","confidence":80}]\n\nCSV example:\nid,lat,lng,type,title,description\n1,28.61,77.20,OSINT,Test,Description`}
                      rows={7}
                      className="w-full rounded-xl resize-none text-[11px] font-mono focus:outline-none transition-all custom-scrollbar placeholder:text-white/15"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: pasteError
                          ? "1px solid rgba(239,68,68,0.5)"
                          : pasteText
                          ? "1px solid rgba(59,130,246,0.4)"
                          : "1px solid rgba(255,255,255,0.09)",
                        color: "rgba(255,255,255,0.75)",
                        padding: "10px 12px",
                        lineHeight: 1.6,
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handlePasteIngest}
                      disabled={!pasteText.trim()}
                      className="w-full py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all"
                      style={{
                        background: pasteText.trim()
                          ? "linear-gradient(135deg, rgba(29,78,216,0.8), rgba(59,130,246,0.8))"
                          : "rgba(255,255,255,0.04)",
                        border: pasteText.trim()
                          ? "1px solid rgba(59,130,246,0.5)"
                          : "1px solid rgba(255,255,255,0.07)",
                        color: pasteText.trim() ? "#fff" : "rgba(255,255,255,0.2)",
                        cursor: pasteText.trim() ? "pointer" : "not-allowed",
                        boxShadow: pasteText.trim() ? "0 0 20px rgba(59,130,246,0.2)" : "none",
                      }}
                    >
                      ⚡ INGEST PASTED DATA
                    </motion.button>
                    <p className="text-[9px] font-mono text-center" style={{ color: "rgba(255,255,255,0.15)" }}>
                      AUTO-DETECTED · JSON · CSV · MAX 5MB
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar() {
  const { state, dispatch } = useIntel();
  const [search, setSearch] = useState("");

  const stats = useMemo(() => ({
    osint: state.intelData.filter((d) => d.type === "OSINT").length,
    humint: state.intelData.filter((d) => d.type === "HUMINT").length,
    imint: state.intelData.filter((d) => d.type === "IMINT").length,
  }), [state.intelData]);

  const filtered = useMemo(() => {
    return state.intelData.filter((item) => {
      const matchFilter = state.activeFilter === "ALL" || item.type === state.activeFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [state.intelData, state.activeFilter, search]);

  const handleSelect = (item: IntelData) => {
    dispatch({ type: "FLY_TO", payload: [item.lat, item.lng] });
    dispatch({ type: "SET_SIDEBAR", payload: false });
  };

  const handleDataLoaded = (data: IntelData[]) => {
    dispatch({ type: "SET_DATA", payload: data });
  };

  return (
    <AnimatePresence>
      {state.sidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => dispatch({ type: "SET_SIDEBAR", payload: false })}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: -500, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -500, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-4 top-[5vh] z-50 flex flex-col scanline-overlay animate-pulse-glow"
            style={{
              width: "clamp(320px, 90vw, 400px)",
              height: "90vh",
              borderRadius: 24,
              background: "rgba(10,10,15,0.87)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              overflow: "hidden",
            }}
          >
            {/* HEADER */}
            <div
              className="flex-shrink-0 flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Radar size={20} className="text-blue-400" />
                </motion.div>
                <div>
                  <h2
                    className="text-base font-black tracking-[0.18em] text-white uppercase"
                    style={{ textShadow: "0 0 16px rgba(59,130,246,0.5)" }}
                  >
                    INTEL FUSION
                  </h2>
                  <p className="text-[9px] font-mono hud-flicker" style={{ color: "rgba(59,130,246,0.5)" }}>
                    ● LIVE FEED · {state.intelData.length} SOURCES
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
                onClick={() => dispatch({ type: "SET_SIDEBAR", payload: false })}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <X size={16} className="text-white/50" />
              </motion.button>
            </div>

            {/* STATS ROW */}
            <div className="flex-shrink-0 flex gap-2 px-4 py-3">
              <StatCard label="OSINT" count={stats.osint} color="#3b82f6" />
              <StatCard label="HUMINT" count={stats.humint} color="#10b981" />
              <StatCard label="IMINT" count={stats.imint} color="#ef4444" />
            </div>

            {/* SEARCH */}
            <div className="flex-shrink-0 px-4 pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search intel reports..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-2.5 pl-9 pr-3 text-sm rounded-xl focus:outline-none transition-all placeholder:text-white/20 text-white"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: search
                      ? "1px solid rgba(59,130,246,0.5)"
                      : "1px solid rgba(255,255,255,0.08)",
                  }}
                />
                <Search size={14} className="absolute left-3 top-3 text-white/30" />
              </div>
            </div>

            {/* FILTER PILLS */}
            <div className="flex-shrink-0 flex gap-2 px-4 pb-3">
              {["ALL", "OSINT", "HUMINT", "IMINT"].map((f) => {
                const color = TYPE_COLOR[f] || "#ffffff";
                const isActive = state.activeFilter === f;
                return (
                  <motion.button
                    key={f}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => dispatch({ type: "SET_FILTER", payload: f as any })}
                    className="flex-1 text-[10px] font-black py-2 rounded-lg tracking-widest uppercase transition-all"
                    style={{
                      background: isActive ? `${color}1a` : "transparent",
                      border: `1px solid ${isActive ? color + "50" : "rgba(255,255,255,0.09)"}`,
                      color: isActive ? color : "rgba(255,255,255,0.35)",
                      opacity: isActive ? 1 : 0.7,
                      boxShadow: isActive ? `0 0 16px ${color}20` : "none",
                    }}
                  >
                    {f}
                  </motion.button>
                );
              })}
            </div>

            {/* DATA LIST */}
            <div
              className="flex-1 overflow-y-auto px-3 pb-2 flex flex-col gap-1.5 custom-scrollbar"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="pt-2 flex items-center justify-between px-1 mb-1">
                <span className="text-[9px] font-mono text-white/25 tracking-widest uppercase">
                  Active Reports
                </span>
                <span className="text-[9px] font-mono text-white/40">
                  {filtered.length} / {state.intelData.length}
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <IntelListItem
                    key={item.id}
                    item={item}
                    index={i}
                    onSelect={() => handleSelect(item)}
                  />
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center gap-2 mt-12"
                >
                  <Search size={28} className="text-white/10" />
                  <p className="text-xs text-white/25 font-mono">NO RESULTS FOUND</p>
                </motion.div>
              )}
            </div>

            {/* UPLOAD + LEGEND */}
            <div
              className="flex-shrink-0 px-4 py-3 space-y-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}
            >
              <DropzoneSection onDataLoaded={handleDataLoaded} />

              {/* Legend */}
              <div className="flex items-center justify-around pt-1">
                {[
                  { label: "OSINT", color: "#3b82f6" },
                  { label: "HUMINT", color: "#10b981" },
                  { label: "IMINT", color: "#ef4444" },
                ].map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                    <span className="text-[9px] font-mono tracking-wider" style={{ color: `${color}99` }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
