# ROADMAP.md

> **Current Phase**: Not started
> **Milestone**: v1.0

## Must-Haves (from SPEC)
- [ ] Interactive Leaflet map with Next.js dynamic importing
- [ ] Custom markers by intel type and clustering
- [ ] Drag-and-drop CSV/JSON upload capability
- [ ] Search and filter mechanics via a glassmorphism sidebar
- [ ] Fly-to navigation linking sidebar items to map popups

## Phases

### Phase 1: Foundation Setup
**Status**: ✅ Complete
**Objective**: Bootstrapping Next.js, installing dependencies, configuring Tailwind, setting up the basic UI layout (Sidebar + Map Area).
**Requirements**: REQ-01, REQ-07

### Phase 2: Map Implementation & Core UI
**Status**: ✅ Complete
**Objective**: Introduce React Leaflet safely with SSR disabled, configure Custom Markers, and set up Clustering module.
**Requirements**: REQ-01, REQ-02, REQ-03, REQ-04

### Phase 3: Data Ingestion Layer
**Status**: ✅ Complete
**Objective**: Build the Drag-and-Drop zone with `react-dropzone` and `papaparse` to accept and normalize incoming JSON/CSV data and feed to Map state.
**Requirements**: REQ-05, REQ-06

### Phase 4: Interactivity & Animations
**Status**: ⬜ Not Started
**Objective**: Wire up sidebar filtering to the map context, enable fly-to-location behavior, and apply Framer Motion / GSAP animations across layout transitions.
**Requirements**: REQ-08, REQ-09, REQ-10
