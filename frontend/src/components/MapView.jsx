import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { FaStar, FaUser, FaTools, FaHandshake, FaHome } from "react-icons/fa";

const roleIcons = {
  Contractor: <FaTools color="red" />,
  "Home Owner": <FaHome color="green" />,
  Affiliate: <FaUser color="blue" />,
  "Referral Partner": <FaHandshake color="purple" />,
  "Community Partner": <FaStar color="orange" />,
  "Geo Tech": <FaStar color="teal" />,
};

function MapView({ contacts }) {
  return (
    <MapContainer
      center={[37.773972, -122.431297]}
      zoom={4}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {contacts.map((contact, idx) => (
        <Marker key={idx} position={[contact.lat, contact.lng]}>
          <Popup>
            <b>{contact.name}</b>
            <br />
            {contact.email}
            <br />
            {contact.phone}
            <br />
            Roles: {contact.roles.join(", ")}
            <div style={{ marginTop: "5px" }}>
              {contact.roles.map((role) => (
                <span key={role} style={{ marginRight: "5px" }}>
                  {roleIcons[role]}
                </span>
              ))}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
