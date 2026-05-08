export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-8">
      <div>
        <h1 className="text-2xl font-bold">StudyFlow</h1>

        <p className="text-gray-400 text-sm">Focus • Plan • Achieve</p>
      </div>

      <div className="hidden md:flex gap-10 text-sm text-gray-300">
        <a
          href="#dashboard"
          className="hover:text-cyan-300 transition-all duration-300"
        >
          Dashboard
        </a>

        <a
          href="#tasks"
          className="hover:text-cyan-300 transition-all duration-300"
        >
          Tasks
        </a>

        <a
          href="#focus"
          className="hover:text-cyan-300 transition-all duration-300"
        >
          Focus
        </a>
      </div>

      <div className="glass px-5 py-2 rounded-full text-sm">
        Mahasiswa • Beta
      </div>
    </nav>
  );
}
