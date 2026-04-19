# Project Summary: Multi-Source Intel Fusion Dashboard

## ⚡ Overview
The **Multi-Source Intelligence Dashboard** is an advanced, high-performance web application engineered using **Next.js 14 (App Router)** and **React**. It operates as a local fusion center allowing intelligence analysts and developers to visualize fragmented OSINT (Open Source), HUMINT (Human Intelligence), and IMINT (Imagery) coordinates on a fully interactive map. 

The application utilizes offline-capable ingestion algorithms by embedding `papaparse` natively, rapidly decoding Drag-and-Dropped `.csv` and `.json` tabular files into geographic markers cleanly grouped via `react-leaflet-cluster`. 

---

## 🎨 CSS Design & Animations Framework
The entire dashboard conforms to a **Dark Glassmorphism UI** aesthetic.
- **Tailwind CSS v4** is strictly used for styling layout mechanics.
- **Micro-Animations Frame**: Elements elegantly shift utilizing **Framer Motion** (`AnimatePresence` manages staggering Sidebar child entrances).
- **GSAP**: Bound securely to dynamic numerical datasets, interpolating total intelligence marker counts fluidly.
- **Glassmorphism Visual Identity**: Bound to exact theme constants:
  - Background primary: `#0a0a0f`
  - Glass Panes: `rgba(18, 18, 26, 0.7)` with `backdrop-blur-md`
  - Accent Colors: `#3B82F6` (OSINT Blue), `#10B981` (HUMINT Green), `#EF4444` (IMINT Red)

---

## 📂 File Structure & Summaries

### `/src/app`
- **`layout.tsx`**: The core root Next.js configuration wrapping the global HTML environment securely within the `IntelProvider` contexts linking globally accessible fonts (`Geist`).
- **`page.tsx`**: The core application module declaring the fundamental dashboard structures (A flexbox merging `<Sidebar />` next to `<MapArea />`).
- **`globals.css`**: Bootstraps the Tailwind v4 runtime inline mapping alongside `leaflet.css` constants. Contains unique CSS array filters strictly overriding standard web-tiles to enforce dark theme maps.
- **`icon.svg`**: The global tab Favicon identifier seamlessly pulled directly from `public/logo.svg`.

### `/src/components`
- **`Sidebar.tsx`**: The robust sliding analytical panel mapping complex arrays. Built with Framer Motion logic dictating slide interactions. Contains UI layouts filtering intelligence streams alongside complex `gsap` ticker counters.
- **`MapComponent.tsx`**: Dynamically mapped bounds establishing `react-leaflet`, looping array points into `<MarkerClusterGroup>` tags outputting customized dynamic interactive SVGs tailored around the hex-code identity colors mapped above.
- **`MapArea.tsx`**: An architectural wrapper bypassing standard Server Side Renders utilizing `next/dynamic { ssr: false }` ensuring `MapComponent` parses raw DOM Leaflet components without crashing Node.
- **`DropzoneArea.tsx`**: Uses `react-dropzone` integrated directly against `papaparse`. Generates the animated rectangular dash box allowing instantaneous drag-and-drop CSV table translations bridging over into the global reducer context.

### `/src/context`
- **`IntelContext.tsx`**: Defines precisely React's unified state mechanics via `useReducer`, broadcasting variables like `sidebarOpen`, `filteredData`, and orchestrating robust mapping variables globally natively without `Redux`.

### `/src/lib`
- **`mockData.ts`**: A pre-loaded typescript-safe repository supplying the `[lat, lng, type, description]` intelligence interface variables ensuring testing remains flawless.

### Root Configs
- **`next.config.ts`**: The deployment directives powering fast builds via Turbopack and silencing file-lock tracking diagnostics context logic mapping.
- **`tailwind.config.ts`** / **`postcss.config.mjs`**: CSS compiler mechanics strictly isolating dynamic glass scopes.
- **`README.md`**: The professional front-facing git documentation with Markdown SVGs displaying metrics and operational tutorials.

---

## 👨‍💻 Developer Information

<div align="center">

### **Kinshuk Saxena**
**Frontend Developer | HTML, CSS, JavaScript Enthusiast | React Native & Expo Builder**

[![GitHub](https://img.shields.io/badge/GitHub-kinshukkush-181717?style=for-the-badge&logo=github)](https://github.com/kinshukkush)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kinshuk--saxena-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/kinshuk-saxena-/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit_Website-2B3990?style=for-the-badge&logo=google-chrome&logoColor=white)](https://portfolio-frontend-mu-snowy.vercel.app/)
[![Email](https://img.shields.io/badge/Email-kinshuksaxena3%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kinshuksaxena3@gmail.com)

**Made with ❤️ and 🔵 by Kinshuk Saxena**
</div>
