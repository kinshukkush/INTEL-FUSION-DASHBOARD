<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0:000000,30:0a0a1a,60:0d1b4b,100:000000&height=300&section=header&text=INTEL%20FUSION&fontSize=80&fontAlignY=40&animation=fadeIn&fontColor=ffffff&desc=Multi-Source%20Intelligence%20Visualization%20System&descSize=17&descAlignY=62&descColor=60a5fa&stroke=3b82f6&strokeWidth=2" />

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=700&size=16&pause=900&color=3B82F6&center=true&vCenter=true&width=800&lines=%5B+SYSTEM+ONLINE+%5D+Intel+Fusion+Dashboard+v1.0;%5B+SCANNING+%5D+OSINT+%7C+HUMINT+%7C+IMINT+Data+Streams;%5B+SYNCING+%5D+MongoDB+Atlas+%E2%80%94+Live+Persistence;%5B+RENDERING+%5D+Geo-Intelligence+Overlay+Active;%5B+DEPLOYED+%5D+Vercel+Production+%E2%80%94+Status%3A+LIVE" />

<br/><br/>

[![Live Demo](https://img.shields.io/badge/%F0%9F%8C%90%20LIVE%20DEMO-intel--fusion--dashboard-1d4ed8?style=for-the-badge&logo=vercel&logoColor=white&labelColor=0a0a1a)](https://intel-fusion-dashboard-seven.vercel.app/)
&nbsp;
[![Deploy](https://img.shields.io/badge/%E2%9A%A1%20DEPLOY%20NOW-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkinshukkush%2FINTEL-FUSION-DASHBOARD)
&nbsp;
[![GitHub Stars](https://img.shields.io/github/stars/kinshukkush/INTEL-FUSION-DASHBOARD?style=for-the-badge&logo=github&logoColor=white&color=1d4ed8&labelColor=0a0a1a)](https://github.com/kinshukkush/INTEL-FUSION-DASHBOARD/stargazers)

<br/>

<img src="https://img.shields.io/badge/Next.js-16-ffffff?style=flat-square&logo=next.js&logoColor=black&labelColor=000000" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black&labelColor=0a0a1a" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white&labelColor=0a0a1a" />
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white&labelColor=0a0a1a" />
<img src="https://img.shields.io/badge/Leaflet-1.9-199900?style=flat-square&logo=leaflet&logoColor=white&labelColor=0a0a1a" />
<img src="https://img.shields.io/badge/Framer_Motion-12-black?style=flat-square&logo=framer&logoColor=white&labelColor=0a0a1a" />
<img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0a0a1a" />
<img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat-square&logo=greensock&logoColor=white&labelColor=0a0a1a" />

</div>

---

<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║           CENTRALIZED INTELLIGENCE FUSION CENTER             ║
║    OSINT · HUMINT · IMINT  ──  GEOGRAPHIC VISUALIZATION      ║
╚══════════════════════════════════════════════════════════════╝
```

</div>

## ◈ Overview

The **Intel Fusion Dashboard** is a full-stack, dark-HUD web application for geographic intelligence analysis. Analysts can visualize **OSINT**, **HUMINT**, and **IMINT** data from multiple sources on a single interactive world map — backed by **MongoDB Atlas** for persistent, real-time storage across sessions.

Built for speed. Designed for operators.

---

## ◈ Intelligence Types

<div align="center">

| Marker | Type | Color | Source |
|:------:|------|:-----:|--------|
| 🔵 | **OSINT** — Open Source Intelligence | `#3B82F6` | Social media, news, intercepts |
| 🟢 | **HUMINT** — Human Intelligence | `#10B981` | Field assets, ground reports |
| 🔴 | **IMINT** — Imagery Intelligence | `#EF4444` | Satellite, drone, aerial feeds |

</div>

---

## ◈ Features

```
┌─────────────────────────────────────────────────────────────┐
│  🗺  FULL-SCREEN MAP     Dark CartoDB tiles, radar-ping      │
│                          markers, hover popups, clustering   │
│                                                             │
│  🪟  FLOATING SIDEBAR    Spring-physics animation, GSAP      │
│                          stat counters, live search/filter  │
│                                                             │
│  🍃  MONGODB ATLAS       Auto-sync on load, PULL/SEED/PUSH  │
│                          controls, REST API (/api/intel)    │
│                                                             │
│  📂  DATA INGESTION      Drag-drop JSON/CSV, paste raw      │
│                          text, upload images to pin on map  │
│                                                             │
│  🛰  LOADING SCREEN      Radar-sweep animation, typewriter  │
│                          text, vertical split-reveal        │
│                                                             │
│  🇮🇳  INDIA + LPU DATA   25 pre-loaded intel points across  │
│                          major cities + LPU Phagwara campus │
└─────────────────────────────────────────────────────────────┘
```

---

## ◈ Quick Start

### ⚡ One-Click Deploy

> **Live:** 👉 [intel-fusion-dashboard-seven.vercel.app](https://intel-fusion-dashboard-seven.vercel.app/)

After deploy, add environment variables in **Vercel → Project Settings → Environment Variables**:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/intel_fusion
MONGODB_DB=intel_fusion
```

### 🖥️ Run Locally

```bash
git clone https://github.com/kinshukkush/INTEL-FUSION-DASHBOARD.git
cd INTEL-FUSION-DASHBOARD
npm install
npm run dev
```

Create `.env.local` in project root:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/intel_fusion?appName=<appName>
MONGODB_DB=intel_fusion
```

Open [http://localhost:3000](http://localhost:3000) 🚀

---

## ◈ MongoDB Atlas Controls

| Button | Action |
|--------|--------|
| **PULL** | Fetch all records from MongoDB → merge into map view |
| **SEED** | Populate MongoDB with 25-point built-in dataset |
| **PUSH** | Upload all visible intel points to MongoDB |

> App **auto-syncs on load** — MongoDB records appear on every visit automatically.

### API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/intel` | Fetch all records |
| `POST` | `/api/intel` | Insert one or many records |
| `DELETE` | `/api/intel` | Clear all records |
| `POST` | `/api/intel/seed` | Seed built-in 25-point dataset |
| `GET` | `/api/intel/seed` | Get current record count |

---

## ◈ How to Use

| Action | How |
|--------|-----|
| Open sidebar | Click **blue FAB** — bottom-left radar button |
| Close sidebar | Click **outside** the panel or press **✕** |
| Filter by type | Use **ALL / OSINT / HUMINT / IMINT** filter pills |
| Search | Type in the **search box** — live filters title & description |
| Fly to location | **Click any intel card** in the list |
| Hover popup | **Hover any map marker** — see image + metadata |
| Drop a file | **INGEST DATA → 📁 File** — drag `.json` or `.csv` |
| Paste data | **INGEST DATA → 📋 Paste** — paste JSON or CSV |
| Upload image | **INGEST DATA → 📸 Image** — upload JPG/PNG + fill coords |
| Sync MongoDB | **MONGODB ATLAS panel** → PULL / SEED / PUSH |

---

## ◈ System Architecture

```mermaid
graph TD
    A["🗃 IntelContext — useReducer"] -->|intelData| B["🗺 MapComponent — Leaflet"]
    A -->|filteredData| C["📋 Sidebar Intel List"]
    A -->|stats| D["📊 GSAP Stat Cards"]
    A -->|flyToLocation| E["✈ FlyTo Handler"]

    F["📁 File / 📋 Paste / 📸 Image"] -->|parsed records| G["⚙ PapaParse / JSON.parse"]
    G -->|APPEND_DATA| A
    G -->|POST /api/intel| H[("🍃 MongoDB Atlas")]

    I["🔄 Auto-sync on load"] -->|GET /api/intel| H
    H -->|APPEND_DATA| A

    J["🛰 FAB Button"] -->|SET_SIDEBAR| K["🪟 Floating Sidebar"]
    L["🖱 Backdrop Click"] -->|SET_SIDEBAR false| K
    B -->|Hover| M["💬 Dark Glass Popup"]
```

### Data Flow

1. **On load** → `GET /api/intel` → MongoDB records merged into context via `APPEND_DATA` (no duplicates)
2. **Ingest pipeline** → File / paste / image → parser → `APPEND_DATA` + `POST /api/intel` to persist
3. **Map layer** → `MapComponent` renders markers from context. Hover fires popup, click fires `FLY_TO`
4. **Sidebar** → Framer Motion spring mount. GSAP animates stat counts. `AnimatePresence` staggers list items

---

## ◈ Tech Stack

| Technology | Role |
|-----------|------|
| **Next.js 16** | App Router, `/api/intel` REST routes, SSR bypass for Leaflet |
| **React 19 + TypeScript** | Component tree, `useReducer` global state, full type safety |
| **MongoDB Atlas** | Persistent intel storage, REST CRUD via `mongodb` driver |
| **Leaflet + react-leaflet** | Interactive map, custom SVG markers, clusters, hover popups |
| **Framer Motion 12** | Spring sidebar, `AnimatePresence`, stagger transitions |
| **GSAP 3.15** | Stat card counter tweening |
| **Tailwind CSS v4** | Layout and spacing |
| **PapaParse** | CSV streaming parser |
| **react-dropzone** | Drag-and-drop file ingestion |

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## ◈ Developer

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=600&size=18&pause=800&color=3B82F6&center=true&vCenter=true&width=600&lines=%5B+OPERATOR+%5D+Kinshuk+Saxena;Full-Stack+Developer;React+%7C+Next.js+%7C+MongoDB+%7C+TypeScript;OSINT+Dashboard+Builder+%7C+LPU+CSE+%2726" />

<br/><br/>

[![GitHub](https://img.shields.io/badge/GitHub-kinshukkush-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kinshukkush)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kinshuk--saxena-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kinshuk-saxena-/)
[![Portfolio](https://img.shields.io/badge/Portfolio-kinshuk.unaux.com-2B3990?style=for-the-badge&logo=google-chrome&logoColor=white)](https://kinshuk.unaux.com)
[![Email](https://img.shields.io/badge/Email-kinshuksaxena3%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kinshuksaxena3@gmail.com)

<br/>

> *Built with precision. Deployed with purpose.*

⭐ **Drop a star if this project impressed you** ⭐

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0:000000,30:0a0a1a,60:0d1b4b,100:000000&height=140&section=footer&animation=fadeIn&fontSize=14&fontColor=3b82f6&text=INTEL%20FUSION%20DASHBOARD%20%E2%80%94%20CLASSIFIED%20CLEARANCE%20ONLY" />

</div>