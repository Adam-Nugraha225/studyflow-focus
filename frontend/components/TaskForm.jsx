"use client";

import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState("");
  const [duration, setDuration] =
    useState("");
  const [priority, setPriority] =
    useState("MED");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !title ||
      !category ||
      !duration
    ) {
      return;
    }

    addTask({
      title,
      category,
      duration: `${duration}m`,
      priority,
    });

    setTitle("");
    setCategory("");
    setDuration("");
    setPriority("MED");
  }

  return (
    <div className="glass rounded-3xl p-8">
      <h2 className="text-2xl font-bold">
        Tambah Target Belajar
      </h2>

      <p className="text-gray-400 mt-2">
        Catat sesi belajar barumu
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        {/* TITLE */}
        <div>
          <label className="text-gray-400 text-sm">
            Judul task
          </label>

          <input
            type="text"
            placeholder="Contoh: Review bab 3 statistika"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl p-4 outline-none"
          />
        </div>

        {/* CATEGORY & DURATION */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm">
              Mata kuliah
            </label>

            <input
              type="text"
              placeholder="Algoritma"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">
              Durasi
            </label>

            <input
              type="number"
              placeholder="30"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
              className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl p-4 outline-none"
            />
          </div>
        </div>

        {/* PRIORITY */}
        <div>
          <label className="text-gray-400 text-sm">
            Prioritas
          </label>

          <div className="grid grid-cols-3 gap-3 mt-3">
            {["LOW", "MED", "HIGH"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setPriority(item)
                  }
                  className={`rounded-xl py-3 transition-all ${
                    priority === item
                      ? "gradient-button text-black font-semibold"
                      : "glass"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* SUBMIT */}
        <button className="gradient-button w-full py-4 rounded-2xl text-black font-bold text-lg mt-4">
          + Simpan Task
        </button>
      </form>
    </div>
  );
}