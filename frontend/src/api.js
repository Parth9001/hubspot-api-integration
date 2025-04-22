export async function fetchContacts() {
  const res = await fetch(
    "https://hubspot-api-integration.onrender.com/api/contacts",
    {
      method: "GET",
    }
  ); // adjust port if needed
  const data = await res.json();
  console.log(data);
  return data;
}
