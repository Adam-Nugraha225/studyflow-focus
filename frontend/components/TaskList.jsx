import {
  Trash2,
  CheckCircle2,
} from "lucide-react";

export default function TaskList({
  tasks,
  deleteTask,
  toggleTask,
  filter,
  setFilter,
}) {
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  // FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    if (filter === "ACTIVE")
      return !task.completed;

    if (filter === "DONE")
      return task.completed;

    return true;
  });

  return (
    <div className="glass rounded-3xl p-8 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute w-52 h-52 bg-cyan-400/10 blur-3xl rounded-full -top-10 -right-10"></div>

      {/* HEADER */}
      <div className="flex justify-between items-center relative z-10">
        <div>
          <h2 className="text-2xl font-bold">
            Task Hari Ini
          </h2>

          <p className="text-gray-400 mt-2">
            {completedTasks} dari {tasks.length} selesai
          </p>
        </div>

        {/* FILTER */}
        <div className="flex gap-3">
          <button
            onClick={() =>
              setFilter("ALL")
            }
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              filter === "ALL"
                ? "gradient-button font-semibold"
                : "glass hover:border-cyan-300/20"
            }`}
          >
            Semua
          </button>

          <button
            onClick={() =>
              setFilter("ACTIVE")
            }
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              filter === "ACTIVE"
                ? "gradient-button font-semibold"
                : "glass hover:border-cyan-300/20"
            }`}
          >
            Aktif
          </button>

          <button
            onClick={() =>
              setFilter("DONE")
            }
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              filter === "DONE"
                ? "gradient-button font-semibold"
                : "glass hover:border-cyan-300/20"
            }`}
          >
            Selesai
          </button>
        </div>
      </div>

      {/* EMPTY */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-16 text-gray-400 relative z-10">
          Tidak ada task 🚀
        </div>
      ) : (
        <div className="mt-8 space-y-5 relative z-10">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="glass rounded-2xl p-5 flex justify-between items-center hover:scale-[1.015] hover:border-cyan-400/20 transition-all duration-300"
            >
              {/* LEFT */}
              <div className="flex items-start gap-4">
                {/* CHECK */}
                <button
                  onClick={() =>
                    toggleTask(task.id)
                  }
                  className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center transition-all ${
                    task.completed
                      ? "bg-green-400 border-green-400 text-black"
                      : "border-gray-500"
                  }`}
                >
                  {task.completed && (
                    <CheckCircle2 size={14} />
                  )}
                </button>

                <div>
                  <h3
                    className={`font-semibold text-lg transition-all ${
                      task.completed
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {task.title}
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {task.category} •{" "}
                    {task.duration}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-2 rounded-full text-xs font-bold border ${
                    task.priority === "HIGH"
                      ? "bg-red-500/15 text-red-400 border-red-400/20"
                      : task.priority ===
                        "MED"
                      ? "bg-cyan-500/15 text-cyan-300 border-cyan-300/20"
                      : "bg-green-500/15 text-green-300 border-green-300/20"
                  }`}
                >
                  {task.priority}
                </span>

                {/* DELETE */}
                <button
                  onClick={() =>
                    deleteTask(task.id)
                  }
                  className="w-10 h-10 rounded-full glass hover:bg-red-500/20 hover:border-red-400/20 transition-all flex items-center justify-center text-gray-300 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}