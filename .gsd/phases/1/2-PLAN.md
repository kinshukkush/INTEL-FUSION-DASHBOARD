---
phase: 1
plan: 2
wave: 2
---

# Plan 1.2: UI Architecture & Global State

## Objective
Establish the foundational layout consisting of a side-by-side Sidebar and Map area. Initialize the global React Context for state management. Integrate the Next/Dynamic Map layout.

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md
- src/app/layout.tsx
- src/app/page.tsx

## Tasks

<task type="auto">
  <name>Setup Context State</name>
  <files>src/context/IntelContext.tsx</files>
  <action>
    - Create `src/context/IntelContext.tsx` using `createContext` and `useReducer`.
    - Define types for basic map interaction (e.g. `flyTo` coordinates).
    - Provide the context provider wrapper.
  </action>
  <verify>ls src/context/IntelContext.tsx</verify>
  <done>Context exists and handles basic store data without TS errors.</done>
</task>

<task type="auto">
  <name>Build Initial Layout</name>
  <files>src/app/page.tsx</files>
  <action>
    - Update `src/app/layout.tsx` to wrap children in the Global Context provider.
    - Modify `src/app/page.tsx` to act as the main dashboard entry.
    - Add a `Sidebar` component placeholder with Framer Motion slide capabilities (320px width).
    - Add a `MapArea` component placeholder (using `next/dynamic` with `ssr: false`).
    - Use the dark palette classes established in Phase 1.1 (`bg-[#0a0a0f]`, `bg-[#12121a]`).
  </action>
  <verify>npm run build</verify>
  <done>Next.js builds the page container successfully with proper dynamic import syntax used for map regions.</done>
</task>

## Success Criteria
- [ ] React Context state is up and ready.
- [ ] The app structural shell is rendering (Sidebar side-by-side with Map container).
