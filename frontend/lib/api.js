// GANTI 5000 MENJADI 8080
const BASE_URL = "http://localhost:8080/api/tasks";

export const getTasks = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Gagal mengambil data");
    return await res.json();
  } catch (error) {
    console.error("API Error (getTasks):", error);
    throw error;
  }
};

export const addTaskApi = async (task) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Gagal menambah task");
    return await res.json();
  } catch (error) {
    console.error("API Error (addTask):", error);
    throw error;
  }
};

export const toggleTaskApi = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { 
      method: "PATCH" 
    });
    if (!res.ok) throw new Error("Gagal update status");
    return await res.json();
  } catch (error) {
    console.error("API Error (toggleTask):", error);
    throw error;
  }
};

export const deleteTaskApi = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { 
      method: "DELETE" 
    });
    if (!res.ok) throw new Error("Gagal menghapus task");
    return await res.json();
  } catch (error) {
    console.error("API Error (deleteTask):", error);
    throw error;
  }
};