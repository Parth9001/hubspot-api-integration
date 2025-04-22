import axios from "axios";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

import db from "../db.js";

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

async function fetchContacts() {
  try {
    const url = `https://api.hubapi.com/crm/v3/objects/contacts`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        "Content-Type": "application/json",
      },
      params: {
        properties: "firstname, lastname, email, phone, address, project_role", // Multiple properties can be passed as comma-separated values
      },
    });

    const contacts = await Promise.all(
      response.data.results.map(async (contact) => {
        const props = contact.properties;
        const fullName = `${props.firstname} ${props.lastname}`;
        const roles = props.project_role?.split(";") || [];

        const { lat, lng, city, state, country } = await geocodeAddress(
          props.address
        );

        return {
          name: fullName,
          email: props.email,
          phone: props.phone,
          address: props.address,
          roles,
          lat,
          lng,
          city,
          state,
          country,
        };
      })
    );

    return contacts.filter((c) => c.roles.length > 0); // Filter out contacts with no roles
  } catch (err) {
    console.error("❌ Error in fetchContacts:", err);
    throw err; // so router can return 500
  }
}

async function geocodeAddress(address) {
  if (!address)
    return { lat: null, lng: null, city: null, state: null, country: null };

  const cached = await db.getCoordsFromCache(address);
  if (cached) return cached;

  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "ProStructInternAssignment/1.0" },
    });
    const data = await response.json();

    if (data.length === 0)
      return { lat: null, lng: null, city: null, state: null, country: null };

    const result = data[0];
    const { city, town, village, state, country } = result.address;

    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    const locationInfo = {
      lat,
      lng,
      city: city || town || village || null,
      state: state || null,
      country: country || null,
    };

    await db.storeCoordsInCache(address, lat, lng, city, state, country);
    return locationInfo;
  } catch (err) {
    console.error(`Geocoding error for address "${address}":`, err);
    return { lat: null, lng: null, city: null, state: null, country: null };
  }
}

export default { fetchContacts };
