import { useAuth } from "../../context/AuthContext";

function Sidebar({ setView }) {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-dark text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-8">Panadería App</h1>

        <nav className="flex flex-col gap-4">
          <button onClick={() => setView("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => setView("clients")}>
            Clientes
          </button>

          <button onClick={() => setView("orders")}>
            Pedidos
          </button>
        </nav>
      </div>

      <div>
        <p className="text-sm mb-2">{user?.email}</p>
        <button
          onClick={logout}
          className="bg-primary text-dark px-3 py-1 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;