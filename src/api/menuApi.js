const API_BASE = "http://127.0.0.1:8000";
const VENDOR_NO = 1;

export async function fetchMenu() {
  const res = await fetch(`${API_BASE}/menu?vendor_num=${VENDOR_NO}`);
  if (!res.ok) throw new Error("Failed to fetch menu");
  return res.json();
}

export async function addDish({ name, price, quantity }) {
  const res = await fetch(`${API_BASE}/add_Dish?vendor_no=${VENDOR_NO}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, quantity }),
  });
  if (!res.ok) throw new Error("Failed to add dish");
  return res.json();
}

export async function updateDish({ id, name, price, quantity }) {
  const res = await fetch(`${API_BASE}/update_Dish?vendor_no=${VENDOR_NO}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, price, quantity }),
  });
  if (!res.ok) throw new Error("Failed to update dish");
  return res.json();
}

export async function deleteDish(id) {
  const res = await fetch(`${API_BASE}/delete_dish?vendor_no=${VENDOR_NO}&Id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete dish");
  return res;
}
