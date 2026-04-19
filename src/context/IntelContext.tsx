"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { IntelData, intelDataset } from "@/lib/intelData";

export type DbStatus = "idle" | "loading" | "synced" | "error";

export interface IntelState {
  sidebarOpen: boolean;
  flyToLocation: [number, number] | null;
  activeFilter: "ALL" | "OSINT" | "HUMINT" | "IMINT";
  searchQuery: string;
  intelData: IntelData[];
  dbStatus: DbStatus;
  dbCount: number;
}

const initialState: IntelState = {
  sidebarOpen: false,
  flyToLocation: null,
  activeFilter: "ALL",
  searchQuery: "",
  intelData: intelDataset,
  dbStatus: "idle",
  dbCount: 0,
};

export type IntelAction =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR"; payload: boolean }
  | { type: "FLY_TO"; payload: [number, number] | null }
  | { type: "SET_FILTER"; payload: IntelState["activeFilter"] }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_DATA"; payload: IntelData[] }
  | { type: "APPEND_DATA"; payload: IntelData[] }
  | { type: "SET_DB_STATUS"; payload: { status: DbStatus; count?: number } };

function intelReducer(state: IntelState, action: IntelAction): IntelState {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "SET_SIDEBAR":
      return { ...state, sidebarOpen: action.payload };
    case "FLY_TO":
      return { ...state, flyToLocation: action.payload };
    case "SET_FILTER":
      return { ...state, activeFilter: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_DATA":
      return { ...state, intelData: action.payload };
    case "APPEND_DATA": {
      const existingIds = new Set(state.intelData.map((d) => d.id));
      const newItems = action.payload.filter((d) => !existingIds.has(d.id));
      return { ...state, intelData: [...state.intelData, ...newItems] };
    }
    case "SET_DB_STATUS":
      return {
        ...state,
        dbStatus: action.payload.status,
        dbCount: action.payload.count ?? state.dbCount,
      };
    default:
      return state;
  }
}

export const IntelContext = createContext<{
  state: IntelState;
  dispatch: React.Dispatch<IntelAction>;
}>({ state: initialState, dispatch: () => null });

export function IntelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(intelReducer, initialState);
  return (
    <IntelContext.Provider value={{ state, dispatch }}>
      {children}
    </IntelContext.Provider>
  );
}

export function useIntel() {
  return useContext(IntelContext);
}
