"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import Papa from "papaparse";
import { useIntel } from "@/context/IntelContext";
import { IntelData } from "@/lib/mockData";

export default function DropzoneArea() {
  const { state, dispatch } = useIntel();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result as string;

        if (file.type === "application/json" || file.name.endsWith(".json")) {
          try {
            const data = JSON.parse(fileContent);
            const parsedData: IntelData[] = Array.isArray(data) ? data : [data];
            // Basic validation
            const validData = parsedData.filter((d: any) => d.lat && d.lng && d.type);
            dispatch({ type: "SET_DATA", payload: [...state.intelData, ...validData] });
          } catch (e) {
            console.error("Failed to parse JSON", e);
          }
        } else if (file.type === "text/csv" || file.name.endsWith(".csv")) {
          Papa.parse(fileContent, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
              const parsedData = results.data.map((item: any) => ({
                id: item.id || Math.random().toString(36).substr(2, 9),
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lng),
                type: (item.type || "OSINT").toUpperCase(),
                title: item.title || "Unknown Report",
                description: item.description || "",
                image: item.image || undefined,
              })).filter((d: any) => !isNaN(d.lat) && !isNaN(d.lng) && d.type);
              
              dispatch({ type: "SET_DATA", payload: [...state.intelData, ...parsedData] });
            },
            error: (error: any) => {
              console.error("Failed to parse CSV", error);
            }
          });
        }
      };

      reader.readAsText(file);
    });
  }, [state.intelData, dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
      "text/csv": [".csv"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`mt-4 p-4 rounded-lg border-2 border-dashed transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[120px] ${
        isDragActive
          ? "border-intel-osint bg-intel-osint/10 scale-105"
          : "border-intel-glass-border bg-white/5 hover:bg-white/10"
      }`}
    >
      <input {...getInputProps()} />
      <UploadCloud size={28} className={isDragActive ? "text-intel-osint" : "text-intel-text-secondary"} />
      <p className="mt-2 text-sm text-intel-text-secondary font-medium">
        {isDragActive ? "Drop intel here" : "Drag & drop CSV/JSON files, or click"}
      </p>
    </div>
  );
}
