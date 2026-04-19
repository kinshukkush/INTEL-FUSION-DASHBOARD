---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Dropzone Component Integration

## Objective
Implement a sleek File Dropzone inside the Sidebar component using `react-dropzone` to prepare for data ingestion.

## Context
- .gsd/SPEC.md
- src/components/Sidebar.tsx

## Tasks

<task type="auto">
  <name>Build DropzoneArea Component</name>
  <files>src/components/DropzoneArea.tsx</files>
  <action>
    - Create `src/components/DropzoneArea.tsx` using `react-dropzone`.
    - Configure Dropzone `<input>` to accept `application/json` and `text/csv`.
    - Style the drop area using Tailwind `border-dashed border-intel-glass-border` with hover states matching the glassmorphism theme (`bg-white/5 hover:bg-white/10`).
  </action>
  <verify>npm run lint</verify>
  <done>Component builds perfectly without TypeScript errors.</done>
</task>

<task type="auto">
  <name>Integrate into Sidebar</name>
  <files>src/components/Sidebar.tsx</files>
  <action>
    - Mount `<DropzoneArea />` at the bottom of the `Sidebar.tsx`.
  </action>
  <verify>npm run build</verify>
  <done>Next.js compiles demonstrating successful UI layout.</done>
</task>

## Success Criteria
- [ ] Drag-and-drop structural UI exists visually within the Sidebar.
- [ ] Mouse hover interactions render correctly.
