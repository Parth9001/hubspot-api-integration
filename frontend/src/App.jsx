import React, { useEffect, useState } from "react";
import MapView from "./components/MapView";
import Legend from "./components/Legend";
import FilterPanel from "./components/FilterPanel";
import { fetchContacts } from "./api";

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    fetchContacts().then((data) => setContacts(data));
  }, []);

  const filteredContacts =
    selectedRoles.length > 0
      ? contacts.filter((c) => c.roles.some((r) => selectedRoles.includes(r)))
      : contacts;

  return (
    <div>
      <Legend />
      <FilterPanel
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
      />
      <MapView contacts={filteredContacts} />
    </div>
  );
}

export default App;
