import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import API from "../../api/axios";

function MapPage() {
  const [clients, setClients] = useState([]);
  const [sortedClients, setSortedClients] = useState([]);

  // 📍 TU UBICACIÓN (CAMBIAR SI QUERÉS)
  const origin = {
    lat: -26.8083,
    lng: -65.2176,
  };

  // 🧠 CALCULAR DISTANCIA
  const getDistance = (lat1, lon1, lat2, lon2) => {
    return Math.sqrt(
      Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2)
    );
  };

  useEffect(() => {
    const getClients = async () => {
      const res = await API.get("/clients");

      const clientsWithDistance = res.data.map((c) => {
        const distance = getDistance(
          origin.lat,
          origin.lng,
          c.location?.lat || 0,
          c.location?.lng || 0
        );

        return { ...c, distance };
      });

      // 🔥 ORDENAR
      const sorted = clientsWithDistance.sort(
        (a, b) => a.distance - b.distance
      );

      setClients(res.data);
      setSortedClients(sorted);
    };

    getClients();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Ruta de Reparto
      </h1>

      {/* 🗺️ MAPA */}
      <MapContainer
        center={[origin.lat, origin.lng]}
        zoom={13}
        style={{ height: "400px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {clients.map((c) =>
          c.location?.lat ? (
            <Marker
              key={c._id}
              position={[c.location.lat, c.location.lng]}
            >
              <Popup>{c.name}</Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>

      {/* 📋 LISTA ORDENADA */}
      <div className="mt-4">
        <h2 className="text-xl mb-2">Orden de entrega</h2>

        {sortedClients.map((c, index) => (
          <div key={c._id} className="bg-white p-2 mb-2 shadow">
            #{index + 1} - {c.name} ({c.address})
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapPage;