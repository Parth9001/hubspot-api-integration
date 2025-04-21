const axios = require("axios");

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

async function fetchContacts() {
  const url = `https://api.hubapi.com/crm/v3/objects/contacts?properties=firstname,lastname,email,phone,address,project_role&archived=false`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` },
  });

  const contacts = response.data.results.map((contact) => {
    const props = contact.properties;
    return {
      id: contact.id,
      name: `${props.firstname} ${props.lastname}`,
      email: props.email,
      phone: props.phone,
      address: props.address,
      roles: props.project_role?.split(";") || [],
      lat: 0, // add later after geocoding
      lng: 0,
    };
  });

  return contacts.filter((c) => c.roles.length > 0);
}

module.exports = { fetchContacts };
