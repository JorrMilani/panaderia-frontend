import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-dark text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-8">Panadería App</h1>

        <nav className="flex flex-col gap-4">
          <button className="text-left hover:text-secondary">
            Dashboard
          </button>

          <button className="text-left hover:text-secondary">
            Clientes
          </button>

          <button className="text-left hover:text-secondary">
            Pedidos
          </button>

          <button className="text-left hover:text-secondary">
            Rutas
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