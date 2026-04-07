import Sidebar from "./Sidebar";

function DashboardLayout({ children, setView }) {
  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar setView={setView} />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;