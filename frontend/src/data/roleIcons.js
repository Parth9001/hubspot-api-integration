import L from "leaflet";

export const roleIcons = {
  Contractor: L.divIcon({ className: "icon-contractor", html: "⭐" }),
  "Home Owner": L.divIcon({ className: "icon-homeowner", html: "🏠" }),
  Affiliate: L.divIcon({ className: "icon-affiliate", html: "🔗" }),
  "Referral Partner": L.divIcon({ className: "icon-referral", html: "🔁" }),
  "Community Partner": L.divIcon({ className: "icon-community", html: "👥" }),
  "Geo Tech": L.divIcon({ className: "icon-geotech", html: "🔺" }),
};
