import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import API from "../../api/axios";
import L from "leaflet";

export default function MapPage() {
  const [clients, setClients] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState([]);

  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [30, 30],
  });

  useEffect(() => {
    fetchClients();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const user = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserLocation(user);
      },
      (error) => console.error(error)
    );
  }, []);

  useEffect(() => {
    if (userLocation && clients.length > 0) {
      generateRoute();
    }
  }, [userLocation, clients]);

  const fetchClients = async () => {
    try {
      const res = await API.get("/clients");
      setClients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🧠 DISTANCIA
  const distance = (a, b) => {
    return Math.sqrt(
      Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2)
    );
  };

  // 🔥 ALGORITMO RUTA
  const generateRoute = () => {
    let remaining = clients.filter(c => c.location?.lat);
    let current = userLocation;
    let ordered = [];

    while (remaining.length > 0) {
      let closestIndex = 0;
      let minDist = distance(current, remaining[0].location);

      for (let i = 1; i < remaining.length; i++) {
        let dist = distance(current, remaining[i].location);
        if (dist < minDist) {
          minDist = dist;
          closestIndex = i;
        }
      }

      const next = remaining.splice(closestIndex, 1)[0];
      ordered.push(next);
      current = next.location;
    }

    setRoute(ordered);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ruta inteligente</h2>

      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : [-26.8, -65.2]}
        zoom={13}
        style={{ height: "500px" }}
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
              <Popup>{c.name}</Popup>
            </Marker>
          ) : null
        )}

        {/* 🟢 RUTA */}
        {route.length > 0 && (
          <Polyline
            positions={[
              [userLocation.lat, userLocation.lng],
              ...route.map(c => [c.location.lat, c.location.lng])
            ]}
            color="green"
          />
        )}
      </MapContainer>

      {/* 📋 ORDEN */}
      <div className="mt-4">
        <h3 className="font-bold mb-2">Orden de entrega</h3>

        {route.map((c, i) => (
          <div key={c._id} className="bg-white p-2 mb-2 shadow">
            #{i + 1} - {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}