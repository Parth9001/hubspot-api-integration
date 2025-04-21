export async function fetchContacts() {
  const res = await fetch("http://localhost:8080/api/contacts", {
    method: "GET",
  }); // adjust port if needed
  return res.json();
}
