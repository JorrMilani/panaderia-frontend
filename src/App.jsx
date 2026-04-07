import { useState } from "react";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Clients from "./pages/clients/Clients";
import Orders from "./pages/orders/Orders";
import MapPage from "./pages/map/MapPage";

function App() {
  const [path, setPath] = useState("/login");

  const renderView = () => {
    if (path === "/login") return <Login setPath={setPath} />;
    if (path === "/dashboard") return <Dashboard />;
    if (path === "/clients") return <Clients />;
    if (path === "/orders") return <Orders />;
    if (path === "/map") return <MapPage />;
  };

  return (
    <div className="min-h-screen bg-light">
      {/* NAVBAR */}
      <nav className="bg-primary p-4 flex gap-4">
        <button onClick={() => setPath("/dashboard")}>Dashboard</button>
        <button onClick={() => setPath("/clients")}>Clientes</button>
        <button onClick={() => setPath("/orders")}>Pedidos</button>
        <button onClick={() => setPath("/map")}>Mapa</button>
        <button onClick={() => setPath("/login")}>Salir</button>
      </nav>

      {/* CONTENIDO */}
      <div className="p-4">
        {renderView()}
      </div>
    </div>
  );
}

export default App;