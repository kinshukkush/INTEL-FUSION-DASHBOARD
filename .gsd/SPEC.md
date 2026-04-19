# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
A sleek, Multi-Source Intelligence Fusion Dashboard that visualizes various intelligence data inputs (OSINT, HUMINT, IMINT) on an interactive map. It provides an immersive, mission-control feel with a dark glassmorphism UI, allowing analysts to seamlessly upload, filter, and view local datasets without relying on external or paid APIs.

## Goals
1. Provide a full-screen, interactive mapping experience using Leaflet with clustering functionality.
2. Allow analysts to ingest local datasets (JSON, CSV) via drag-and-drop.
3. Deliver a premium UX/UI through dark glassmorphic styling, Framer Motion transitions, and GSAP animations.
4. Enable quick filtering and navigation to specific intelligence nodes via a responsive sidebar.

## Non-Goals (Out of Scope)
- Backend databases or persistant server-side storage logic
- Integration with paid mapping APIs (Google Maps, Mapbox) or external threat intelligence feeds
- User authentication and complex authorization (runs locally for single-user analysis)

## Users
Intelligence analysts evaluating local datasets who need a fast, visually distinct way to synthesize geospatial data.

## Constraints
- Technical: Must use Next.js 14 App Router, Tailwind CSS, Leaflet, Framer Motion, GSAP.
- Architectural: Open source tools only. Components must run seamlessly with Next.js App Router (handling Leaflet `window` dependencies gracefully).

## Success Criteria
- [ ] Dragging and dropping a CSV/JSON successfully plots points on the map.
- [ ] OSINT (blue), HUMINT (green), and IMINT (red) markers render clearly and cluster on zoom.
- [ ] Sidebar filters instantly update visible map markers.
- [ ] Clicking a sidebar item triggers a map fly-to animation with popup display.
- [ ] The app requires zero API keys to start (`npm run dev`).
