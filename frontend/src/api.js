export async function fetchContacts() {
  const res = await fetch("http://localhost:5000/api/contacts"); // adjust port if needed
  return res.json();
}
