import axios from "axios";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

import db from "../db.js";

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

async function fetchContacts() {
  const url = `https://api.hubapi.com/crm/v3/objects/contacts?properties=firstname,lastname,email,phone,address,project_role&archived=false`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` },
  });

  const contacts = await Promise.all(
    response.data.results.map(async (contact) => {
      const props = contact.properties;
      const fullName = `${props.firstname} ${props.lastname}`;
      const roles = props.project_role?.split(";") || [];

      const { lat, lng } = await geocodeAddress(props.address);

      return {
        id: contact.id,
        name: fullName,
        email: props.email,
        phone: props.phone,
        address: props.address,
        roles,
        lat,
        lng,
      };
    })
  );

  return contacts.filter((c) => c.roles.length > 0);
}

async function geocodeAddress(address) {
  if (!address) return { lat: null, lng: null };

  const cached = await db.getCoordsFromCache(address);
  if (cached) return cached;

  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "ProStructInternAssignment/1.0" },
    });
    const data = await response.json();

    if (data.length === 0) return { lat: null, lng: null };

    const lat = parseFloat(data[0].lat);
    const lng = parseFloat(data[0].lon);

    await db.storeCoordsInCache(address, lat, lng);
    return { lat, lng };
  } catch (err) {
    console.error(`Geocoding error for address "${address}":`, err);
    return { lat: null, lng: null };
  }
}

export default { fetchContacts };
