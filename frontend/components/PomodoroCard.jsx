export default function PomodoroCard({
  tasks,
}) {
  // TOTAL TASK
  const totalTasks = tasks.length;

  // TASK YANG SUDAH SELESAI
  const completedTasksList = tasks.filter(
    (task) => task.completed
  );

  // TOTAL TASK SELESAI
  const completedTasks =
    completedTasksList.length;

  // TOTAL MENIT FOKUS
  const totalFocus =
    completedTasksList.reduce(
      (total, task) =>
        total + parseInt(task.duration),
      0
    );

  // PERSENTASE PROGRESS
  const progress =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) *
            100
        )
      : 0;

  // SIMPLE STREAK SYSTEM
  const streak =
    completedTasks >= 5
      ? "14 Hari"
      : completedTasks >= 3
      ? "7 Hari"
      : completedTasks >= 1
      ? "3 Hari"
      : "0 Hari";

  return (
    <div className="glass rounded-3xl p-8 relative overflow-hidden">
      {/* GLOW EFFECT */}
      <div className="absolute w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full -right-10 -top-10"></div>

      {/* HEADER */}
      <p className="text-gray-400 uppercase text-sm tracking-widest">
        Sesi Hari Ini
      </p>

      <h2 className="text-5xl font-bold mt-3">
        Pomodoro 04
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {/* FOCUS */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-3xl font-bold">
            {totalFocus}m
          </h3>

          <p className="text-gray-400 mt-2 text-sm">
            Fokus
          </p>
        </div>

        {/* COMPLETED */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-3xl font-bold">
            {completedTasks}
          </h3>

          <p className="text-gray-400 mt-2 text-sm">
            Selesai
          </p>
        </div>

        {/* PROGRESS */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-3xl font-bold">
            {progress}%
          </h3>

          <p className="text-gray-400 mt-2 text-sm">
            Progress
          </p>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="mt-8">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Progress Belajar</span>

          <span>
            {completedTasks}/{totalTasks} task selesai
          </span>
        </div>

        <div className="w-full h-3 bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full gradient-button rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>

      {/* STREAK */}
      <div className="mt-8 glass rounded-2xl p-5 flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">
            Streak Belajar
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {streak}
          </h3>
        </div>

        <div className="text-4xl">
          🔥
        </div>
      </div>
    </div>
  );
}