"use client";

import { useEffect, useState } from "react";
import { getTasks, addTaskApi, toggleTaskApi, deleteTaskApi } from "../lib/api";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsCards from "../components/StatsCards";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        setError("Koneksi ke Backend gagal. Pastikan Server Express jalan di port 8080.");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "ACTIVE") return !task.completed;
    if (filter === "DONE") return task.completed;
    return true;
  });

  async function addTask(newTask) {
    try {
      const savedTask = await addTaskApi(newTask);
      setTasks((prev) => [...prev, savedTask]);
    } catch {
      setError("Gagal menambah data ke server.");
    }
  }

  async function deleteTask(id) {
    try {
      await deleteTaskApi(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Gagal menghapus data.");
    }
  }

  async function toggleTask(id) {
    try {
      await toggleTaskApi(id);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch {
      setError("Gagal update data.");
    }
  }

  return (
    <main className="min-h-screen px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        {error && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-xl mt-6 flex justify-between">
            <span>{error}</span>
            <button onClick={() => setError("")} className="underline text-xs">Tutup</button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-40">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <section id="dashboard"><HeroSection tasks={tasks} /></section>
            <StatsCards tasks={tasks} />
            <section id="tasks" className="grid lg:grid-cols-2 gap-8 mt-16">
              <TaskForm addTask={addTask} />
              <TaskList tasks={filteredTasks} deleteTask={deleteTask} toggleTask={toggleTask} filter={filter} setFilter={setFilter} />
            </section>
            <section id="focus"><FeatureSection /></section>
            <Footer />
          </>
        )}
      </div>
    </main>
  );
}