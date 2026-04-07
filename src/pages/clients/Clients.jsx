import { useEffect, useState } from "react";
import API from "../../api/axios";

function Clients() {
  const [clients, setClients] = useState([]);

  const [form, setForm] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
  });

  const getClients = async () => {
    const res = await API.get("/clients");
    setClients(res.data);
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/clients", {
      name: form.name,
      address: form.address,
      location: {
        lat: Number(form.lat),
        lng: Number(form.lng),
      },
    });

    setForm({ name: "", address: "", lat: "", lng: "" });

    getClients();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap mb-4">
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2"
        />

        <input
          placeholder="Dirección"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="border p-2"
        />

        <input
          placeholder="Latitud"
          value={form.lat}
          onChange={(e) => setForm({ ...form, lat: e.target.value })}
          className="border p-2 w-32"
        />

        <input
          placeholder="Longitud"
          value={form.lng}
          onChange={(e) => setForm({ ...form, lng: e.target.value })}
          className="border p-2 w-32"
        />

        <button className="bg-primary px-4 py-2 rounded">
          Agregar
        </button>
      </form>

      {clients.map((c) => (
        <div key={c._id} className="bg-white p-2 mb-2 shadow">
          {c.name} - {c.address}
        </div>
      ))}
    </div>
  );
}

export default Clients;