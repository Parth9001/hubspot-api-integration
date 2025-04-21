import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { roleIcons } from "../data/roleIcons";
import { useEffect, useState } from "react";
import axios from "axios";

const MapView = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/contacts") // Your backend endpoint
      .then((res) => setContacts(res.data))
      .catch(console.error);
  }, []);

  return (
    <MapContainer
      center={[37.7749, -122.4194]}
      zoom={4}
      style={{ height: "100vh" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {contacts.map((contact, idx) =>
        contact.roles.map((role, i) => (
          <Marker
            key={`${idx}-${i}`}
            position={[contact.lat, contact.lng]} // requires lat/lng from backend or geocoding
            icon={roleIcons[role]}
          >
            <Popup>
              <strong>{contact.name}</strong>
              <br />
              {contact.email}
              <br />
              {role}
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default MapView;
