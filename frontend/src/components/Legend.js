const Legend = () => {
  const legendItems = {
    Contractor: "⭐",
    "Home Owner": "🏠",
    Affiliate: "🔗",
    "Referral Partner": "🔁",
    "Community Partner": "👥",
    "Geo Tech": "🔺",
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        background: "white",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <h4>Legend</h4>
      {Object.entries(legendItems).map(([role, icon]) => (
        <div key={role}>
          {icon} = {role}
        </div>
      ))}
    </div>
  );
};

export default Legend;
