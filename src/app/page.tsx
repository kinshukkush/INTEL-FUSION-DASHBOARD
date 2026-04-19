import Sidebar from "@/components/Sidebar";
import MapArea from "@/components/MapArea";

export default function Home() {
  return (
    <main className="flex flex-row w-screen h-screen overflow-hidden bg-intel-bg-primary">
      <Sidebar />
      <div className="flex-1 relative h-full">
        <MapArea />
      </div>
    </main>
  );
}
