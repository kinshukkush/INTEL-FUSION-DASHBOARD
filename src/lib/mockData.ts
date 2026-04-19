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
  {
    id: "os-1",
    lat: 48.8566,
    lng: 2.3522,
    type: "OSINT",
    title: "Public Protest Feed",
    description: "Social media analysis indicates large gathering near city center.",
    image: "https://images.unsplash.com/photo-1541887018312-d022b7a8aef3?w=400&q=80",
  },
  {
    id: "hu-1",
    lat: 48.8584,
    lng: 2.3530,
    type: "HUMINT",
    title: "Asset Report Alpha",
    description: "Ground contact verifies unusual transport activity.",
  },
  {
    id: "im-1",
    lat: 51.5074,
    lng: -0.1278,
    type: "IMINT",
    title: "Satellite Sweep LHR",
    description: "Thermal imaging anomalies detected near runway perimeter.",
  },
  {
    id: "os-2",
    lat: 51.5200,
    lng: -0.1000,
    type: "OSINT",
    title: "Dark Web Chatter",
    description: "Intercepted communications referencing supply chain disruption.",
  },
  {
    id: "hu-2",
    lat: 40.7128,
    lng: -74.0060,
    type: "HUMINT",
    title: "Safehouse Verified",
    description: "Asset confirmed target relocation to designated safehouse.",
  },
  {
    id: "im-2",
    lat: 40.7200,
    lng: -74.0100,
    type: "IMINT",
    title: "Drone Feed Substation",
    description: "High-res UAV capture showing perimeter fence breach.",
  },
  {
    id: "os-3",
    lat: 35.6762,
    lng: 139.6503,
    type: "OSINT",
    title: "Local News Aggregate",
    description: "Reports of regional power outages coinciding with cyber events.",
  }
];
