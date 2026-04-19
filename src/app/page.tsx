import Sidebar from "@/components/Sidebar";
import MapArea from "@/components/MapArea";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-intel-bg-primary">
      {/* Map takes full screen */}
      <MapArea />
      {/* Sidebar floats above the map */}
      <Sidebar />
    </main>
  );
}
