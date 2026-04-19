---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Custom Markers & Mock Interactions

## Objective
Implement visually distinct custom Leaflet markers for OSINT, HUMINT, and IMINT, populated from a mock dataset, and ensure they support detailed popups. 

## Context
- .gsd/SPEC.md
- src/components/MapComponent.tsx

## Tasks

<task type="auto">
  <name>Create Intel Mock Data</name>
  <files>src/lib/mockData.ts, src/context/IntelContext.tsx</files>
  <action>
    - Create `src/lib/mockData.ts` exporting an array of roughly 5-10 intelligence data points. Each should have `id`, `lat`, `lng`, `type` ("OSINT", "HUMINT", "IMINT"), `title`, `description`, and `image` (a placeholder URL).
    - Modify the `initialState` in `IntelContext.tsx` to automatically inject `intelData: mockData` instead of an empty array so Phase 2 testing is immediate.
  </action>
  <verify>npm run build</verify>
  <done>Mock data initializes the global store correctly.</done>
</task>

<task type="auto">
  <name>Implement Custom Markers & Popups</name>
  <files>src/components/MapComponent.tsx</files>
  <action>
    - Map over `state.intelData` to render `Marker` components.
    - Create custom simple styling/divIcons or SVG strings dynamically defining the colors (`intel-osint` #3B82F6, `intel-humint` #10B981, `intel-imint` #EF4444).
    - Add a `<Popup>` to each marker referencing the data (Title, Image, Description, Coords).
  </action>
  <verify>npm run build</verify>
  <done>Markers render on the MapComponent and build process finds no errors related to the Leaflet Popup component implementation.</done>
</task>

## Success Criteria
- [ ] Mapped data accurately displays on Leaflet according to coordinates.
- [ ] Markers differ in color relative to intelligence type.
- [ ] Popups exhibit full requirements.
