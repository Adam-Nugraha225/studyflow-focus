import PomodoroCard from "./PomodoroCard";

export default function HeroSection({ tasks }) {
  return (
    <section className="grid md:grid-cols-2 gap-12 items-center mt-10">
      {/* LEFT CONTENT */}
      <div>
        <div className="glass inline-block px-4 py-2 rounded-full text-sm text-gray-300 mb-6">
          Productivity untuk mahasiswa modern
        </div>

        <h1 className="text-6xl font-bold leading-tight">
          Atur belajarmu
          <br />
          <span className="gradient-text">Jaga fokusmu</span>
        </h1>

        <p className="text-gray-400 mt-8 text-lg leading-relaxed">
          StudyFlow Focus membantumu mencatat target belajar, memantau progress
          harian, dan menjaga ritme fokus.
        </p>

        <div className="flex gap-5 mt-10">
          <a
            href="#tasks"
            className="gradient-button px-8 py-4 rounded-full text-black font-semibold hover:scale-[1.03] transition-all duration-300"
          >
            Mulai sesi belajar
          </a>

          <a
            href="#dashboard"
            className="glass px-8 py-4 rounded-full hover:scale-[1.03] transition-all duration-300"
          >
            Lihat dashboard
          </a>
        </div>
      </div>

      {/* RIGHT CARD */}
      <PomodoroCard tasks={tasks} />
    </section>
  );
}
