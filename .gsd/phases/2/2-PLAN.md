---
phase: 2
plan: 2
wave: 2
---

# Plan 2.2: Leaflet Marker Clustering

## Objective
Install and wire up marker clustering so that overlapping intel markers merge elegantly at lower zoom levels, fulfilling REQ-03.

## Context
- package.json
- src/components/MapComponent.tsx

## Tasks

<task type="auto">
  <name>Install Clustering Dependencies</name>
  <files>package.json</files>
  <action>
    - Install `react-leaflet-cluster` via npm. 
    - (Optionally) ensure `leaflet.markercluster` dependencies are present if required by the wrapper.
  </action>
  <verify>cat package.json</verify>
  <done>Dependencies appear correctly inside package.json.</done>
</task>

<task type="auto">
  <name>Wrap Markers in Clustering Group</name>
  <files>src/components/MapComponent.tsx</files>
  <action>
    - Import `MarkerClusterGroup` from `react-leaflet-cluster`.
    - Wrap the current `.map` marker loop within `<MarkerClusterGroup>`.
    - Handle any dynamic hydration errors gracefully.
  </action>
  <verify>npm run build</verify>
  <done>Clustering is functional and builds successfully within the Map container bounds.</done>
</task>

## Success Criteria
- [ ] Clustering dependencies installed.
- [ ] Markers gracefully condense when zooming out of the map layer.
