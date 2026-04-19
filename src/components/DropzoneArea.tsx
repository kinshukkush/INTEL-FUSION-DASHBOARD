"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, CheckCircle2, FileJson, FileSpreadsheet } from "lucide-react";
import Papa from "papaparse";
import { useIntel } from "@/context/IntelContext";
import { IntelData } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

export default function DropzoneArea() {
  const { state, dispatch } = useIntel();
  const [uploadedCount, setUploadedCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let totalAdded = 0;

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          const fileContent = reader.result as string;

          if (file.type === "application/json" || file.name.endsWith(".json")) {
            try {
              const data = JSON.parse(fileContent);
              const parsedData: IntelData[] = Array.isArray(data) ? data : [data];
              const validData = parsedData.filter(
                (d: any) => d.lat && d.lng && d.type
              );
              dispatch({
                type: "SET_DATA",
                payload: [...state.intelData, ...validData],
              });
              totalAdded += validData.length;
              setUploadedCount((c) => c + validData.length);
              setShowSuccess(true);
              setTimeout(() => setShowSuccess(false), 3000);
            } catch (e) {
              console.error("Failed to parse JSON", e);
            }
          } else if (file.type === "text/csv" || file.name.endsWith(".csv")) {
            Papa.parse(fileContent, {
              header: true,
              dynamicTyping: true,
              skipEmptyLines: true,
              complete: (results) => {
                const parsedData = results.data
                  .map((item: any) => ({
                    id:
                      item.id ||
                      Math.random().toString(36).substring(2, 9),
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lng),
                    type: (item.type || "OSINT").toUpperCase(),
                    title: item.title || "Unknown Report",
                    description: item.description || "",
                    image: item.image || undefined,
                  }))
                  .filter(
                    (d: any) => !isNaN(d.lat) && !isNaN(d.lng) && d.type
                  );

                dispatch({
                  type: "SET_DATA",
                  payload: [...state.intelData, ...parsedData],
                });
                setUploadedCount((c) => c + parsedData.length);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
              },
              error: (error: any) => {
                console.error("Failed to parse CSV", error);
              },
            });
          }
        };

        reader.readAsText(file);
      });
    },
    [state.intelData, dispatch]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "application/json": [".json"],
        "text/csv": [".csv"],
      },
    });

  return (
    <div>
      <motion.div
        {...(getRootProps() as any)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        animate={isDragActive ? { scale: 1.03 } : { scale: 1 }}
        className="relative rounded-xl flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden transition-all"
        style={{
          padding: "16px 12px",
          minHeight: "100px",
          border: isDragActive
            ? "1.5px dashed rgba(59,130,246,0.7)"
            : "1.5px dashed rgba(255,255,255,0.1)",
          background: isDragActive
            ? "rgba(59,130,246,0.08)"
            : "rgba(0,0,0,0.2)",
        }}
      >
        <input {...getInputProps()} />

        {/* Background shimmer on hover */}
        {isDragActive && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.05) 25%, rgba(59,130,246,0.12) 50%, rgba(59,130,246,0.05) 75%)",
              backgroundSize: "200% 200%",
            }}
          />
        )}

        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <CheckCircle2 size={22} className="text-green-400" />
              <p className="text-xs text-green-400 font-bold font-mono tracking-wider">
                +{uploadedCount} REPORTS INGESTED
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex gap-2 items-center mb-1">
                <FileJson
                  size={16}
                  className={
                    isDragActive ? "text-blue-400" : "text-zinc-600"
                  }
                />
                <UploadCloud
                  size={22}
                  className={
                    isDragActive ? "text-blue-400" : "text-zinc-500"
                  }
                />
                <FileSpreadsheet
                  size={16}
                  className={
                    isDragActive ? "text-blue-400" : "text-zinc-600"
                  }
                />
              </div>
              <p
                className="text-xs font-medium"
                style={{ color: isDragActive ? "#3b82f6" : "#525252" }}
              >
                {isDragActive
                  ? "Release to ingest intel"
                  : "Drop .json or .csv files here"}
              </p>
              <p className="text-[9px] font-mono tracking-widest"
                style={{ color: "#3a3a3a" }}>
                DRAG & DROP OR CLICK TO BROWSE
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
