const BASE_URL = "http://localhost:5000/api/tasks";

export const getTasks = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Gagal mengambil data");
  return res.json();
};

export const addTaskApi = async (task) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const toggleTaskApi = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "PATCH" });
  return res.json();
};

export const deleteTaskApi = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
};