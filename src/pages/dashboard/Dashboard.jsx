import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 MÉTRICAS
  const totalPedidos = orders.length;

  const totalGanado = orders.reduce((acc, o) => acc + o.total, 0);

  const entregados = orders.filter(
    (o) => o.status === "ENTREGADO"
  ).length;

  const pendientes = orders.filter(
    (o) => o.status !== "ENTREGADO"
  ).length;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-2 gap-4">

        {/* TOTAL GANADO */}
        <div className="bg-green-500 text-white p-4 rounded">
          <h3 className="text-lg">Total ganado</h3>
          <p className="text-2xl font-bold">${totalGanado}</p>
        </div>

        {/* PEDIDOS */}
        <div className="bg-blue-500 text-white p-4 rounded">
          <h3 className="text-lg">Pedidos totales</h3>
          <p className="text-2xl font-bold">{totalPedidos}</p>
        </div>

        {/* ENTREGADOS */}
        <div className="bg-emerald-600 text-white p-4 rounded">
          <h3 className="text-lg">Entregados</h3>
          <p className="text-2xl font-bold">{entregados}</p>
        </div>

        {/* PENDIENTES */}
        <div className="bg-red-500 text-white p-4 rounded">
          <h3 className="text-lg">Pendientes</h3>
          <p className="text-2xl font-bold">{pendientes}</p>
        </div>

      </div>
    </div>
  );
}