---
phase: 3
plan: 2
wave: 2
---

# Plan 3.2: PapaParse & Data Normalization

## Objective
Establish the logic to parse raw dragged-and-dropped CSVs or JSON files safely and inject them into the global Intel Data state.

## Context
- src/components/DropzoneArea.tsx
- src/context/IntelContext.tsx

## Tasks

<task type="auto">
  <name>Implement Parsing Logic</name>
  <files>src/components/DropzoneArea.tsx, src/context/IntelContext.tsx</files>
  <action>
    - Import `Papa` from `papaparse`.
    - Inside `onDrop` handler of `DropzoneArea`, distinguish between JSON vs CSV.
    - If JSON, use native `JSON.parse`.
    - If CSV, use `Papa.parse` with `header: true` and `dynamicTyping: true`.
    - Map parsed files onto `<IntelData>` type (`id`, `lat`, `lng`, `type`, `title`, `description`). Assume column names attempt to match. 
    - Extract `dispatch({ type: 'SET_DATA', payload: [...oldData, ...newData] })` to push the data into context.
  </action>
  <verify>npm run build</verify>
  <done>Parsing logic clears type checking and context dispatch resolves successfully.</done>
</task>

## Success Criteria
- [ ] PapaParse is utilized effectively for CSV conversion.
- [ ] Dropping a file reflects real-time markers accumulating context entries on the screen.
