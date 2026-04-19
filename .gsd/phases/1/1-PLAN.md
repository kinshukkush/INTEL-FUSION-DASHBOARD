---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Environment & Core Dependencies

## Objective
Install necessary map/animation dependencies and configure the design system (dark palette + glassmorphism) in Tailwind. Update global CSS correctly for Leaflet mapping and dark theme overrides.

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md

## Tasks

<task type="auto">
  <name>Install Core Dependencies</name>
  <files>package.json</files>
  <action>
    - Ensure Tailwind CSS is configured with the app.
    - Install `leaflet`, `react-leaflet`, `@types/leaflet`, `framer-motion`, `gsap`, and `lucide-react` via npm.
  </action>
  <verify>cat package.json</verify>
  <done>Dependencies appear correctly in package.json.</done>
</task>

<task type="auto">
  <name>Configure Tailwind & Globals CSS</name>
  <files>tailwind.config.ts, src/app/globals.css</files>
  <action>
    - Add the precise dark palette requested in `DECISIONS.md` to `tailwind.config.ts` colors.
    - Set up glassmorphism utility classes if not already available.
    - In `globals.css`, import `leaflet/dist/leaflet.css`.
    - Also in `globals.css`, apply the custom CSS filter to `.leaflet-tile-pane` to make it dark themed (`filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7)`).
  </action>
  <verify>npm run build</verify>
  <done>Tailwind configuration passes validation and globals.css has the exact imports and filters.</done>
</task>

## Success Criteria
- [ ] Dependencies are cleanly installed.
- [ ] Dark palette options are injected into Tailwind configuration.
- [ ] Global CSS overrides (Leaflet CSS and map inversion logic) are properly placed.
