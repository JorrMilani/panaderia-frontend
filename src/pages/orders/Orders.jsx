import { useEffect, useState } from "react";
import API from "../../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);

  const [form, setForm] = useState({
    client: "",
    product: "",
    quantity: 1,
    price: 0,
  });

  const getOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClients = async () => {
    try {
      const res = await API.get("/clients");
      setClients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
    getClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.client || !form.product || !form.price) {
      alert("Completar todos los campos");
      return;
    }

    try {
      const dataToSend = {
        client: form.client,
        products: [
          {
            product: form.product,
            quantity: Number(form.quantity),
            price: Number(form.price),
          },
        ],
      };

      console.log("Enviando pedido:", dataToSend);

      await API.post("/orders", dataToSend);

      setForm({
        client: "",
        product: "",
        quantity: 1,
        price: 0,
      });

      getOrders();
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Error al crear pedido");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-4">
        Pedidos
      </h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 flex-wrap">
        <select
          value={form.client}
          onChange={(e) =>
            setForm({ ...form, client: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">Cliente</option>
          {clients.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Producto"
          value={form.product}
          onChange={(e) =>
            setForm({ ...form, product: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
          className="border p-2 w-20 rounded"
        />

        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="border p-2 w-24 rounded"
        />

        <button className="bg-primary px-4 py-2 rounded">
          Agregar
        </button>
      </form>

      <div className="space-y-2">
        {orders.map((o) => (
          <div key={o._id} className="bg-white p-3 rounded shadow">
            {o.products?.map((p, i) => (
              <div key={i}>
                {p.product} x{p.quantity} - ${p.price}
              </div>
            ))}

            <div className="text-sm text-gray-600">
              Cliente: {o.client?.name}
            </div>

            <div className="font-bold">
              Total: ${o.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;