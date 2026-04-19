"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { IntelData, intelDataset } from "@/lib/intelData";

export interface IntelState {
  sidebarOpen: boolean;
  flyToLocation: [number, number] | null;
  activeFilter: "ALL" | "OSINT" | "HUMINT" | "IMINT";
  searchQuery: string;
  intelData: IntelData[];
}

const initialState: IntelState = {
  sidebarOpen: false,
  flyToLocation: null,
  activeFilter: "ALL",
  searchQuery: "",
  intelData: intelDataset,
};

export type IntelAction =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR"; payload: boolean }
  | { type: "FLY_TO"; payload: [number, number] | null }
  | { type: "SET_FILTER"; payload: IntelState["activeFilter"] }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_DATA"; payload: IntelData[] };

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
