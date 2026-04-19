<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=12121a&height=250&section=header&text=Intel%20Fusion%20Dashboard&fontSize=70&fontAlignY=35&animation=twinkling&fontColor=ffffff" />
  
  <p align="center">
    <b>A high-performance, dark glassmorphism dashboard built for parsing, mapping, and animating full-scale multi-source geographic data.</b>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/Leaflet-v1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white" />
    <img src="https://img.shields.io/badge/Framer_Motion-11-black?style=for-the-badge&logo=framer&logoColor=blue" />
    <img src="https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
  </p>
</div>

---

## ⚡ Overview & What This Is About

The **Multi-Source Intelligence Dashboard** is a highly specialized, autonomous frontend application built for geographic data analysis. 
This dashboard acts as an "offline-capable" fusion center where analysts, journalists, or intelligence operators can visualize fragmented OSINT (Open Source), HUMINT (Human Intelligence), and IMINT (Imagery) coordinates directly on a full-screen dynamic world map.

Instead of relying on backend databases, the dashboard runs localized ingestion algorithms. By simply dragging and dropping your own `.json` or `.csv` files into the Sidebar's Dropzone, the system instantly transforms massive arrays of tabular coordinates into grouped, color-coded interactive SVG markers across the Leaflet grid, while preserving performance up to thousands of data points utilizing `react-leaflet-cluster`. 

## 📂 Sample Mock Data 

Want to test the Drag and Drop zone immediately? Save either of these snippets into a local file and drop them into the sidebar!

### 1. JSON Sample (`intel-drop.json`)
```json
[
  {
    "id": "osint-sample-1",
    "lat": 38.8951,
    "lng": -77.0364,
    "type": "OSINT",
    "title": "Public Sector Leak",
    "description": "Information aggregation suggesting a localized digital security event."
  },
  {
    "id": "humint-sample-2",
    "lat": 51.5074,
    "lng": -0.1278,
    "type": "HUMINT",
    "title": "Asset Rendezvous",
    "description": "Ground contact successfully acquired package outside safehouse perimeter."
  }
]
```

### 2. CSV Sample (`intel-drop.csv`)
If your organization exports data via spreadsheets, simply drop a `.csv`:
```csv
id,lat,lng,type,title,description
im-1,48.8566,2.3522,IMINT,Satellite Sweep Alpha,UAV capture showcasing perimeter fence breach.
os-3,35.6762,139.6503,OSINT,Regional Outage,Local broadcast confirms sweeping network disruption.
hu-9,-33.8688,151.2093,HUMINT,Convoy Movement,Asset visualizes armored transport departing facility.
```

## ✨ Features

- 🗺️ **Full-Screen Custom Mapping:** Leverages fully interactive `next/dynamic` isolated maps rendering geo-tiles overlaid via tailored dark theme CSS saturation.
- 📂 **PapaParse Realtime Ingestion:** Integrated Drag-and-Drop capability instantly interpreting nested `CSV` tables seamlessly into localized memory without API persistence.
- 📍 **Marker Cluster Grouping:** Dynamically sequences and condenses massive overlapping SVG nodes dynamically via `react-leaflet-cluster`.
- ✨ **Fluid GSAP/Framer Engine:** Features animated Sidebar sliding mechanisms, count-indexing sequences, and click-to `FlyTo` Leaflet integrations.
- 🎨 **Glassmorphism Visual Identity:** Employs heavily customized Tailwind variables mirroring deep blues (`#3B82F6`), greens (`#10B981`), and red (`#EF4444`) boundaries against backdrop blurring.

---

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kinshukkush/INTEL-FUSION-DASHBOARD.git
   cd INTEL-FUSION-DASHBOARD
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run securely inside local environments:**
   ```bash
   npm run dev
   ```

*Proceed locally to `http://localhost:3000` to interact with pre-loaded arrays or drag testing models directly inside the dashboard panel.*

---

## 👨‍💻 Developer

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<div align="center">

### **Kinshuk Saxena**

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=18&pause=1000&color=2B3990&center=true&vCenter=true&width=500&lines=Frontend+Developer;HTML+%7C+CSS+%7C+JavaScript+Enthusiast;React+Native+%7C+Expo+Builder;Music+Lover+%F0%9F%8E%B5;Always+Learning+%F0%9F%9A%80" alt="Typing SVG" />

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-kinshukkush-181717?style=for-the-badge&logo=github)](https://github.com/kinshukkush)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kinshuk--saxena-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/kinshuk-saxena-/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit_Website-2B3990?style=for-the-badge&logo=google-chrome&logoColor=white)](https://portfolio-frontend-mu-snowy.vercel.app/)
[![Email](https://img.shields.io/badge/Email-kinshuksaxena3%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kinshuksaxena3@gmail.com)
[![Phone](https://img.shields.io/badge/Phone-%2B91%209057538521-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:+919057538521)

<br/>

**Made with ❤️ and 🔵 by Kinshuk Saxena**

⭐ **Star this repo if you found it helpful!** ⭐

<a href="https://github.com/kinshukkush">
  <img src="https://img.shields.io/github/followers/kinshukkush?style=social" alt="GitHub Followers"/>
</a>

</div>

---
