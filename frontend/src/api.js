export async function fetchContacts() {
  const res = await fetch("http://localhost:3000/api/contacts", {
    method: "GET",
  }); // adjust port if needed
  const data = await res.json();
  console.log(data);
  return data;
}
