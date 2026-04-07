import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;