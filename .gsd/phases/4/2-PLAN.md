---
phase: 4
plan: 2
wave: 2
---

# Plan 4.2: Animations (Framer & GSAP)

## Objective
Add fluid, high-end motion feedback resolving REQ-08 across list items rendering in (via Framer Motion) and visual UI numeric counting (via GSAP).

## Context
- src/components/Sidebar.tsx

## Tasks

<task type="auto">
  <name>Framer Motion List Staggering</name>
  <files>src/components/Sidebar.tsx</files>
  <action>
    - Wrap the mapped filtered intel array inside Framer's `AnimatePresence`.
    - Map each child tile into a `motion.div`.
    - Apply `initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}` transition bindings.
  </action>
  <verify>npm run build</verify>
  <done>Framer wraps list elements smoothly resolving build requirements.</done>
</task>

<task type="auto">
  <name>GSAP Counter Animation</name>
  <files>src/components/Sidebar.tsx</files>
  <action>
    - Import `gsap` library.
    - Add a header metric next to the Search UI referencing total active reports (e.g. "Total Reports: X").
    - Establish a `useRef` pointing to the count string, and a `useEffect` that triggers `gsap.to()` anytime `filteredData.length` changes to roll the innerText count fluently up or down.
  </action>
  <verify>npm run build</verify>
  <done>GSAP imports load, compile statically, and hook dependencies compile robustly.</done>
</task>

## Success Criteria
- [ ] List items visually sequence-slide entering the screen.
- [ ] Tracking metric utilizes GSAP animations efficiently.
