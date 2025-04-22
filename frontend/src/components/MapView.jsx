import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
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
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {/* Legend */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 1000,
        }}
      >
        <h4 style={{ margin: "0 0 5px 0" }}>Legend</h4>
        {Object.entries(roleIcons).map(([role, icon]) => (
          <div key={role} style={{ display: "flex", alignItems: "center" }}>
            {icon}
            <span style={{ marginLeft: "5px" }}>{role}</span>
          </div>
        ))}
      </div>

      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {contacts.map((contact, idx) => {
          if (!contact.lat || !contact.lng) return null;

          const iconHtml = contact.roles
            ?.map((role) => {
              const icon = roleIcons[role];
              return `<span style="margin-right:4px;">${renderToStaticMarkup(
                icon
              )}</span>`;
            })
            .join("");

          const customIcon = L.divIcon({
            html: `<div style="display:flex; align-items:center;">${iconHtml}</div>`,
            className: "",
            iconAnchor: [16, 16],
          });

          return (
            <Marker
              key={idx}
              position={[contact.lat, contact.lng]}
              icon={customIcon}
            >
              <Popup>
                <b>{contact.name}</b>
                <br />
                {contact.email}
                <br />
                {contact.phone}
                <br />
                {contact.address}
                <br />
                Roles: {contact.roles?.join(", ")}
                <div style={{ marginTop: "5px" }}>
                  {contact.roles?.map((role) => (
                    <span key={role} style={{ marginRight: "5px" }}>
                      {roleIcons[role]}
                    </span>
                  ))}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;
