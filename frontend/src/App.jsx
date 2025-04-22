import React, { useEffect, useState } from "react";
import MapView from "./components/MapView";
import FilterPanel from "./components/FilterPanel";
import { fetchContacts } from "./api";

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    fetchContacts().then((data) => {
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.error("Invalid contacts data:", data);
        setContacts([]);
      }
    });
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const matchesRole =
      selectedRoles.length === 0 ||
      contact.roles?.some((role) => selectedRoles.includes(role));
    const matchesLocation =
      !locationFilter ||
      [contact.city, contact.state, contact.country]
        .filter(Boolean)
        .join(", ")
        .toLowerCase()
        .includes(locationFilter.toLowerCase());

    return matchesRole && matchesLocation;
  });

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <div style={{ width: "50%", overflowY: "auto" }}>
        <FilterPanel
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          suggestions={filteredContacts}
        />
      </div>
      <div style={{ width: "50%", height: "100vh" }}>
        <MapView contacts={filteredContacts} />
      </div>
    </div>
  );
}

export default App;
