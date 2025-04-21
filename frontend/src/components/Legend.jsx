import React from "react";
import { FaTools, FaHome, FaUser, FaHandshake, FaStar } from "react-icons/fa";

const roleIcons = {
  Contractor: <FaTools color="red" />,
  "Home Owner": <FaHome color="green" />,
  Affiliate: <FaUser color="blue" />,
  "Referral Partner": <FaHandshake color="purple" />,
  "Community Partner": <FaStar color="orange" />,
  "Geo Tech": <FaStar color="teal" />,
};

function Legend() {
  return (
    <div
      style={{
        background: "white",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 0 6px rgba(0,0,0,0.1)",
        width: "fit-content",
        position: "absolute",
        bottom: 20,
        left: 20,
        zIndex: 1000,
      }}
    >
      <h4>Legend</h4>
      {Object.entries(roleIcons).map(([role, icon]) => (
        <div
          key={role}
          style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
        >
          <span style={{ marginRight: 6 }}>{icon}</span>
          <span>{role}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
