import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import API from "../../api/axios";
import L from "leaflet";

export default function MapPage() {
  const [clients, setClients] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // 🔥 ICONO USUARIO (para diferenciar)
  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [30, 30],
  });

  useEffect(() => {
    fetchClients();

    // 📍 OBTENER UBICACIÓN REAL
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error ubicación:", error);
      }
    );
  }, []);

  const fetchClients = async () => {
    try {
      const res = await API.get("/clients");
      setClients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mapa de reparto</h2>

      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : [-26.8, -65.2]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 🔵 TU UBICACIÓN */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Estás acá</Popup>
          </Marker>
        )}

        {/* 🔴 CLIENTES */}
        {clients.map((c) =>
          c.location?.lat ? (
            <Marker key={c._id} position={[c.location.lat, c.location.lng]}>
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