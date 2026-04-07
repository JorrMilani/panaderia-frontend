import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import API from "../../api/axios";

function MapPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const res = await API.get("/clients");
      setClients(res.data);
    };

    getClients();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Mapa de Reparto
      </h1>

      <MapContainer
        center={[-26.8083, -65.2176]} // Tucumán
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {clients.map((c) =>
          c.location?.lat && c.location?.lng ? (
            <Marker
              key={c._id}
              position={[c.location.lat, c.location.lng]}
            >
              <Popup>
                <strong>{c.name}</strong>
                <br />
                {c.address}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}

export default MapPage;