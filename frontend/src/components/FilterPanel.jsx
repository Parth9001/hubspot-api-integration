import React from "react";

const allRoles = [
  "Contractor",
  "Home Owner",
  "Affiliate",
  "Referral Partner",
  "Community Partner",
  "Geo Tech",
];

function FilterPanel({ selectedRoles, setSelectedRoles }) {
  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <div
      style={{
        background: "white",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 0 6px rgba(0,0,0,0.1)",
        width: "fit-content",
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1000,
      }}
    >
      <h4>Filter by Role</h4>
      {allRoles.map((role) => (
        <div key={role}>
          <label>
            <input
              type="checkbox"
              checked={selectedRoles.includes(role)}
              onChange={() => toggleRole(role)}
            />
            <span style={{ marginLeft: 6 }}>{role}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default FilterPanel;
