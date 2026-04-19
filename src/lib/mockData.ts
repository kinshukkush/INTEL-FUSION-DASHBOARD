export interface IntelData {
  id: string;
  lat: number;
  lng: number;
  type: "OSINT" | "HUMINT" | "IMINT";
  title: string;
  description: string;
  image?: string;
}

export const mockIntelData: IntelData[] = [
  // ───── GLOBAL LEGACY ─────
  {
    id: "os-1",
    lat: 48.8566,
    lng: 2.3522,
    type: "OSINT",
    title: "Public Protest Feed — Paris",
    description: "Social media analysis indicates large gathering near city center. Estimated 12,000 participants.",
    image: "https://images.unsplash.com/photo-1541887018312-d022b7a8aef3?w=400&q=80",
  },
  {
    id: "hu-1",
    lat: 48.8584,
    lng: 2.3530,
    type: "HUMINT",
    title: "Asset Report Alpha — Eiffel Zone",
    description: "Ground contact verifies unusual transport activity near the perimeter. Package delivery confirmed.",
  },
  {
    id: "im-1",
    lat: 51.5074,
    lng: -0.1278,
    type: "IMINT",
    title: "Satellite Sweep LHR — London",
    description: "Thermal imaging anomalies detected near runway perimeter. Activity spike at 02:00 UTC.",
  },
  {
    id: "os-2",
    lat: 51.5200,
    lng: -0.1000,
    type: "OSINT",
    title: "Dark Web Chatter — London East",
    description: "Intercepted communications referencing supply chain disruption. Forum activity up 340%.",
  },
  {
    id: "hu-2",
    lat: 40.7128,
    lng: -74.0060,
    type: "HUMINT",
    title: "Safehouse Verified — New York",
    description: "Asset confirmed target relocation to designated safehouse. Three-layer security perimeter active.",
  },
  {
    id: "im-2",
    lat: 40.7200,
    lng: -74.0100,
    type: "IMINT",
    title: "Drone Feed Substation — NYC Metro",
    description: "High-res UAV capture showing perimeter fence breach. Timestamps 03:12–03:47 flagged for review.",
  },
  {
    id: "os-3",
    lat: 35.6762,
    lng: 139.6503,
    type: "OSINT",
    title: "Local News Aggregate — Tokyo",
    description: "Reports of regional power outages coinciding with cyber events across the Kanto region.",
  },

  // ───── INDIA — Major Cities ─────
  {
    id: "in-os-1",
    lat: 28.6139,
    lng: 77.2090,
    type: "OSINT",
    title: "Social Media Surge — New Delhi",
    description: "Trending hashtags indicate mass mobilisation near India Gate. Cross-platform verification complete.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80",
  },
  {
    id: "in-hu-1",
    lat: 19.0760,
    lng: 72.8777,
    type: "HUMINT",
    title: "Dock Asset Report — Mumbai",
    description: "Human asset confirms irregular cargo movement at JNPT port. Manifests do not match customs data.",
  },
  {
    id: "in-im-1",
    lat: 13.0827,
    lng: 80.2707,
    type: "IMINT",
    title: "Aerial Sweep — Chennai Port",
    description: "Satellite imagery reveals new construction adjacent to restricted naval facility. Resolution: 0.5m.",
    image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=400&q=80",
  },
  {
    id: "in-os-2",
    lat: 22.5726,
    lng: 88.3639,
    type: "OSINT",
    title: "Cyber Incident Monitoring — Kolkata",
    description: "CERT-IN advisory noticed: coordinated phishing campaigns targeting public sector banks.",
  },
  {
    id: "in-hu-2",
    lat: 17.3850,
    lng: 78.4867,
    type: "HUMINT",
    title: "Tech Park Contact — Hyderabad",
    description: "Assets embedded in HITEC City confirm data exfiltration attempt from a mid-sized IT firm.",
  },
  {
    id: "in-im-2",
    lat: 12.9716,
    lng: 77.5946,
    type: "IMINT",
    title: "UAV Surveillance — Bengaluru",
    description: "Drone footage captures convoy movement near Outer Ring Road. Vehicles flagged for further tracking.",
    image: "https://images.unsplash.com/photo-1596566246421-d3e4c98e8e56?w=400&q=80",
  },
  {
    id: "in-os-3",
    lat: 26.8467,
    lng: 80.9462,
    type: "OSINT",
    title: "Radio Intercept — Lucknow",
    description: "Encrypted shortwave burst detected on 7.812 MHz. Pattern consistent with scheduled drop signal.",
  },
  {
    id: "in-hu-3",
    lat: 23.0225,
    lng: 72.5714,
    type: "HUMINT",
    title: "Trade Route Anomaly — Ahmedabad",
    description: "Field contact observes irregular truck convoy departing Naroda industrial zone at 04:00 hours.",
  },
  {
    id: "in-im-3",
    lat: 18.5204,
    lng: 73.8567,
    type: "IMINT",
    title: "Satellite Pass — Pune",
    description: "Imagery analysis shows unauthorized land clearing adjacent to IT SEZ. Change detection flagged.",
  },
  {
    id: "in-os-4",
    lat: 26.9124,
    lng: 75.7873,
    type: "OSINT",
    title: "Dark Web Listing — Jaipur",
    description: "Marketplace post offering state-level government employee data. 47K records, cross-linked to recent breach.",
  },

  // ───── LPU — Lovely Professional University ─────
  {
    id: "lpu-1",
    lat: 31.2518,
    lng: 75.7057,
    type: "OSINT",
    title: "LPU Main Campus — Phagwara",
    description: "Signals intelligence: unusually high encrypted traffic volume originating from university subnet 10.21.x.x. Anomaly detected during off-hours.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80",
  },
  {
    id: "lpu-2",
    lat: 31.2540,
    lng: 75.7022,
    type: "HUMINT",
    title: "LPU Research Block — Phagwara",
    description: "Campus asset reports unfamiliar visitors with special access passes in the Advanced Computing Research Centre. Visitor ledger was sealed.",
  },
  {
    id: "lpu-3",
    lat: 31.2495,
    lng: 75.7080,
    type: "IMINT",
    title: "LPU Drone Overview — Phagwara",
    description: "Aerial thermal imaging of the LPU main campus perimeter during late hours. Two access points show clustered heat signatures.",
  },
  {
    id: "lpu-4",
    lat: 31.2560,
    lng: 75.7100,
    type: "OSINT",
    title: "LPU Innovation Hub — Phagwara",
    description: "Social monitoring detects coordinated posts from the university's incubation center referencing a classified tender document.",
  },
  {
    id: "lpu-5",
    lat: 28.6000,
    lng: 77.1900,
    type: "OSINT",
    title: "LPU Delhi Campus — New Delhi",
    description: "Network traffic analysis from the Delhi satellite campus shows elevated DNS requests to servers in unregistered jurisdictions.",
  },
];
