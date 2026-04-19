# DECISIONS.md

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| Initial | Use `next/dynamic` for Leaflet | Leaflet relies on the `window` object which causes hydration failures in Next.js SSR. | Accepted |
| Initial | No Backend/Persistent Storage | To keep the product agile, free, and secure as an analysis tool, data ingestion is done entirely in-browser. | Accepted |
