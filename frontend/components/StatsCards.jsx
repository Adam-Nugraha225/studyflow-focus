import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  Flame,
} from "lucide-react";

export default function StatsCards({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const focusMinutes = tasks.reduce(
    (total, task) =>
      total + parseInt(task.duration),
    0
  );

  const stats = [
    {
      title: "TOTAL TASK",
      value: totalTasks,
      desc: "minggu ini",
      icon: <ClipboardList size={18} />,
      glow: "from-cyan-400/20 to-blue-500/10",
    },
    {
      title: "SELESAI",
      value: completedTasks,
      desc: `${Math.round(
        (completedTasks / totalTasks) * 100 || 0
      )}% progress`,
      icon: <CheckCircle2 size={18} />,
      glow: "from-green-400/20 to-emerald-500/10",
    },
    {
      title: "WAKTU FOKUS",
      value: `${focusMinutes}m`,
      desc: "total durasi",
      icon: <Clock3 size={18} />,
      glow: "from-violet-400/20 to-fuchsia-500/10",
    },
    {
      title: "STREAK",
      value: "7 Hari",
      desc: "konsisten 🔥",
      icon: <Flame size={18} />,
      glow: "from-orange-400/20 to-red-500/10",
    },
  ];

  return (
    <section className="grid md:grid-cols-4 gap-5 mt-16">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`glass rounded-3xl p-6 relative overflow-hidden hover:scale-[1.03] transition-all duration-300`}
        >
          {/* Glow */}
          <div
            className={`absolute inset-0 opacity-40 bg-gradient-to-br ${item.glow}`}
          ></div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-300 mb-5">
              {item.icon}
            </div>

            <p className="text-gray-400 text-sm tracking-wide">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold mt-4">
              {item.value}
            </h2>

            <p className="text-gray-500 mt-3">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}