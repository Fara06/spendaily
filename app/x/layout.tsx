import Sidebar from "./dashboard/_components/Sidebar";

export default function XLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-container-low overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
}