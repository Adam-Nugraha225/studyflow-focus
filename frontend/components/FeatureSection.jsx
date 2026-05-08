export default function FeatureSection() {
  const features = [
    {
      title: "Set Goal Harian",
      desc: "Tentukan target kecil yang realistis tiap hari.",
      icon: "◎",
    },
    {
      title: "Mode Pomodoro",
      desc: "Belajar 25 menit, istirahat 5 menit. Ulang.",
      icon: "◔",
    },
    {
      title: "Lacak Progress",
      desc: "Lihat ritme & streak belajarmu sepanjang minggu.",
      icon: "↗",
    },
  ];

  return (
    <section className="grid md:grid-cols-3 gap-6 mt-14">
      {features.map((item, index) => (
        <div
          key={index}
          className="glass rounded-3xl p-6 hover:scale-[1.02] transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-green-400/10 flex items-center justify-center text-green-400 text-xl">
            {item.icon}
          </div>

          <h3 className="text-xl font-semibold mt-5">
            {item.title}
          </h3>

          <p className="text-gray-400 mt-3 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </section>
  );
}