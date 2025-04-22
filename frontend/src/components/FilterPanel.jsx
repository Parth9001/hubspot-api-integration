import React from "react";

const allRoles = [
  "Contractor",
  "Home Owner",
  "Affiliate",
  "Referral Partner",
  "Community Partner",
  "Geo Tech",
];

function FilterPanel({
  selectedRoles,
  setSelectedRoles,
  locationFilter,
  setLocationFilter,
  suggestions = [],
}) {
  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <div
      style={{
        background: "#1e1e1e",
        color: "#f1f1f1",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        width: "100%",
        height: "100%",
        overflowY: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3 style={{ marginBottom: "16px", color: "#ffffff" }}>
        Filter Contacts
      </h3>

      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "10px" }}>Filter by Role</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {allRoles.map((role) => (
            <label
              key={role}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: "#e0e0e0",
              }}
            >
              <input
                type="checkbox"
                checked={selectedRoles.includes(role)}
                onChange={() => toggleRole(role)}
                style={{ marginRight: "8px", accentColor: "#4caf50" }}
              />
              {role}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h4 style={{ marginBottom: "10px" }}>Filter by Location</h4>
        <input
          type="text"
          placeholder="Enter city, state, or country"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #555",
            backgroundColor: "#2e2e2e",
            color: "#fff",
            width: "40%",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {(selectedRoles.length > 0 || locationFilter.trim() !== "") &&
        suggestions.length > 0 && (
          <div
            style={{
              width: "80%",
              marginTop: "16px",
              background: "#2c2c2c",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #444",
            }}
          >
            <h4 style={{ marginBottom: "10px", color: "#fff" }}>
              Suggested Matches
            </h4>
            <ul style={{ paddingLeft: "16px", lineHeight: "1.6" }}>
              {suggestions.map((contact) => (
                <li key={contact.id}>
                  You can contact <b>{contact.name}</b> in <b>{contact.city}</b>{" "}
                  as a <b>{contact.roles.join(", ")}</b>.
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export default FilterPanel;
