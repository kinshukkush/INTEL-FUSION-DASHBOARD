---
phase: 4
plan: 1
wave: 1
---

# Plan 4.1: Sidebar Interface & Map Interactivity

## Objective
Wire up the Sidebar `Search` and `Filter` mechanics to dynamically update the list of Intelligence markers, and attach the `FLY_TO` clicking interaction.

## Context
- src/components/Sidebar.tsx
- src/context/IntelContext.tsx

## Tasks

<task type="auto">
  <name>Construct Filter and List Arrays</name>
  <files>src/components/Sidebar.tsx</files>
  <action>
    - Add a React `useState` for `searchQuery`.
    - Create a search input field bound to `searchQuery` with Tailwind styling matching the glass UI.
    - Create filter buttons overriding the Global State `activeFilter` using `dispatch({ type: "SET_FILTER", payload: ... })`.
    - Filter the `state.intelData` locally by parsing checking the search string and `activeFilter` logic.
    - Render the resulting constrained `filteredData` directly onto the Sidebar UI using a clean list tile format.
  </action>
  <verify>npm run build</verify>
  <done>Sidebar search and filtering inputs parse TS checks cleanly without rendering errors.</done>
</task>

<task type="auto">
  <name>Link List Clicks to FlyTo Map Interaction</name>
  <files>src/components/Sidebar.tsx</files>
  <action>
    - Bind an `onClick` event over each generated Sidebar list tile.
    - Action should execute: `dispatch({ type: "FLY_TO", payload: [data.lat, data.lng] })`.
  </action>
  <verify>npm run lint</verify>
  <done>Click events propagate without type issues against expected reducer coordinates definitions.</done>
</task>

## Success Criteria
- [ ] Users can type to filter Sidebar reports.
- [ ] Clicking a report successfully zooms the map into the matching coordinate space.
