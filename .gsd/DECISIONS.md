# DECISIONS.md

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| Initial | Use `next/dynamic` for Leaflet | Leaflet relies on the `window` object which causes hydration failures in Next.js SSR. | Accepted |
| Initial | No Backend/Persistent Storage | To keep the product agile, free, and secure as an analysis tool, data ingestion is done entirely in-browser. | Accepted |

## Phase 1 Decisions

**Date:** 2026-04-20

### Scope
- Configured specific dark palette and glassmorphism styling.
- Sidebar is collapsible (320px default width) and toggled via topBar with Framer Motion.

### Approach
- Chose: React Context + `useReducer` for global state.
- Reason: Simplifies state management without extra third-party dependencies.
- Chose: Load Leaflet CSS via `globals.css` and use CSS filters on `.leaflet-tile-pane` for the map dark theme.

### Constraints
- Required to stick to `next/dynamic` with `ssr: false` for the Leaflet component mapping.
