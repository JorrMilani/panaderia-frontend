import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    client: "",
    product: "",
    quantity: 1,
    price: 0,
  });

  // 🔥 CARGAR DATOS
  const fetchData = async () => {
    const resOrders = await API.get("/orders");
    const resClients = await API.get("/clients");

    setOrders(resOrders.data);
    setClients(resClients.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 CREAR PEDIDO
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        client: form.client,
        products: [
          {
            product: form.product,
            quantity: Number(form.quantity),
            price: Number(form.price),
          },
        ],
      };

      console.log("Enviando pedido:", data);

      await API.post("/orders", data);

      alert("Pedido creado");
      fetchData();

      setForm({
        client: "",
        product: "",
        quantity: 1,
        price: 0,
      });
    } catch (error) {
      console.error("ERROR AL CREAR PEDIDO:", error.response?.data);
    }
  };

  // 🔥 MARCAR COMO ENTREGADO
  const markAsDelivered = async (id) => {
    try {
      await API.put(`/orders/${id}/status`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pedidos</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <select
          value={form.client}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
          className="border p-2"
          required
        >
          <option value="">Cliente</option>
          {clients.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Producto"
          value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })}
          className="border p-2"
          required
        />

        <input
          type="number"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-2 w-20"
        />

        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 w-20"
        />

        <button className="bg-orange-500 text-white px-4">
          Agregar
        </button>
      </form>

      {/* LISTA */}
      {orders.map((o) => (
        <div key={o._id} className="border p-3 mb-2 bg-white">

          {/* PRODUCTOS */}
          {o.products?.map((p, i) => (
            <p key={i}>
              {p.product} x{p.quantity} - ${p.price * p.quantity}
            </p>
          ))}

          <p>Cliente: {o.client?.name}</p>
          <p className="font-bold">Total: ${o.total}</p>

          {/* 🔥 ESTADO */}
          <p
            className={
              o.status === "ENTREGADO"
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            Estado: {o.status || "PENDIENTE"}
          </p>

          {/* 🔥 BOTÓN */}
          {(o.status === "PENDIENTE" || !o.status) && (
            <button
              onClick={() => markAsDelivered(o._id)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Marcar como entregado
            </button>
          )}
        </div>
      ))}
    </div>
  );
}