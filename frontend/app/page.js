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

  // LOAD DATA DARI BACKEND
  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
        setError("");
      } catch (err) {
        setError("Gagal mengambil data dari server. Pastikan Backend sudah jalan.");
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

  // ADD TASK KE BACKEND
  async function addTask(newTask) {
    try {
      const savedTask = await addTaskApi(newTask);
      setTasks((prev) => [...prev, savedTask]);
    } catch {
      setError("Gagal menambahkan task.");
    }
  }

  // DELETE TASK DI BACKEND
  async function deleteTask(id) {
    try {
      await deleteTaskApi(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch {
      setError("Gagal menghapus task.");
    }
  }

  // TOGGLE STATUS DI BACKEND
  async function toggleTask(id) {
    try {
      await toggleTaskApi(id);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch {
      setError("Gagal mengupdate task.");
    }
  }

  return (
    <main className="min-h-screen px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <Navbar />

        {error && (
          <div className="glass border border-red-500/20 bg-red-500/10 text-red-300 px-5 py-4 rounded-2xl mt-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="w-16 h-16 border-4 border-cyan-400/20 border-t-cyan-300 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <section id="dashboard">
              <HeroSection tasks={tasks} />
            </section>

            <StatsCards tasks={tasks} />

            <section id="tasks" className="grid lg:grid-cols-2 gap-8 mt-16">
              <TaskForm addTask={addTask} />
              <TaskList
                tasks={filteredTasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                filter={filter}
                setFilter={setFilter}
              />
            </section>

            <section id="focus">
              <FeatureSection />
            </section>
            <Footer />
          </>
        )}
      </div>
    </main>
  );
}