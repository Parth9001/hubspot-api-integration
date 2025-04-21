export async function fetchContacts() {
  const res = await fetch("http://localhost:6000/api/contacts", {
    method: "GET",
  }); // adjust port if needed
  console.log(res);
  return res.json();
}
