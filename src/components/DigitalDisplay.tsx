export function DigitalDisplay({
  template,
  time12,
  secondsStr,
  ampm,
  dayStr,
}: {
  template: string;
  time12: string;
  secondsStr: string;
  ampm: string;
  dayStr: string;
}) {
  switch (template) {
    case "digital-led":
      return (
        <div
          className="w-full h-full rounded-2xl bg-slate-950 flex flex-col items-center justify-center border-4 border-slate-800 shadow-md relative overflow-hidden"
          style={{ padding: "calc(var(--clock-size) * 0.05)", fontFamily: "'VT323', monospace" }}
        >
          <div
            className="uppercase tracking-widest text-emerald-500/70 mb-1"
            style={{ fontSize: "calc(var(--clock-size) * 0.055)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline text-emerald-400 drop-shadow-[0_0_3px_rgba(52,211,153,0.35)]" style={{ gap: "calc(var(--clock-size) * 0.015)" }}>
            <span className="font-bold tracking-wider" style={{ fontSize: "calc(var(--clock-size) * 0.22)" }}>{time12}</span>
            <span className="font-semibold opacity-90" style={{ fontSize: "calc(var(--clock-size) * 0.12)" }}>:{secondsStr}</span>
            <span className="font-bold text-emerald-300 ml-1" style={{ fontSize: "calc(var(--clock-size) * 0.07)" }}>{ampm}</span>
          </div>
          <div
            className="mt-1 text-emerald-600/80 tracking-widest"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            DIGITAL LED WATCH
          </div>
        </div>
      );

    case "digital-cyber":
      return (
        <div
          className="w-full h-full rounded-2xl bg-slate-900 flex flex-col items-center justify-center border border-cyan-500/30 shadow-md relative overflow-hidden"
          style={{ padding: "calc(var(--clock-size) * 0.05)", fontFamily: "'Electrolize', sans-serif" }}
        >
          <div
            className="tracking-widest text-pink-400 mb-1 uppercase"
            style={{ fontSize: "calc(var(--clock-size) * 0.04)" }}
          >
            // {dayStr}
          </div>
          <div className="flex items-baseline text-cyan-400 drop-shadow-[0_0_3px_#06b6d4]" style={{ gap: "calc(var(--clock-size) * 0.015)" }}>
            <span className="font-extrabold" style={{ fontSize: "calc(var(--clock-size) * 0.16)" }}>{time12}</span>
            <span className="font-bold text-pink-500" style={{ fontSize: "calc(var(--clock-size) * 0.085)" }}>:{secondsStr}</span>
            <span className="font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-800" style={{ fontSize: "calc(var(--clock-size) * 0.04)", padding: "2px 6px" }}>
              {ampm}
            </span>
          </div>
          <div className="w-full mt-2 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
        </div>
      );

    case "digital-flip":
      return (
        <div
          className="w-full h-full rounded-2xl bg-zinc-950 flex flex-col items-center justify-center border border-zinc-800 shadow-md"
          style={{ padding: "calc(var(--clock-size) * 0.04)", fontFamily: "'Space Mono', monospace" }}
        >
          <div
            className="text-zinc-400 font-medium mb-2 uppercase tracking-wider"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-center" style={{ gap: "calc(var(--clock-size) * 0.015)" }}>
            <div
              className="relative bg-zinc-900 border border-zinc-700/80 rounded-xl font-extrabold text-zinc-100 shadow-inner"
              style={{ fontSize: "calc(var(--clock-size) * 0.15)", padding: "calc(var(--clock-size) * 0.02) calc(var(--clock-size) * 0.04)" }}
            >
              {time12}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/60" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="bg-zinc-800 text-amber-400 font-bold rounded border border-zinc-700" style={{ fontSize: "calc(var(--clock-size) * 0.055)", padding: "2px 4px" }}>
                :{secondsStr}
              </span>
              <span className="bg-zinc-800 text-zinc-300 font-bold rounded text-center" style={{ fontSize: "calc(var(--clock-size) * 0.045)", padding: "1px 4px" }}>
                {ampm}
              </span>
            </div>
          </div>
        </div>
      );

    case "digital-lcd":
      return (
        <div
          className="w-full h-full rounded-2xl bg-[#9ea88e] flex flex-col items-center justify-center border-4 border-zinc-800 text-zinc-900 shadow-inner relative"
          style={{ padding: "calc(var(--clock-size) * 0.05)", fontFamily: "'Share Tech Mono', monospace" }}
        >
          <div className="w-full flex justify-between items-center font-bold border-b border-zinc-800/40 pb-1 mb-1" style={{ fontSize: "calc(var(--clock-size) * 0.04)" }}>
            <span className="uppercase">{dayStr}</span>
            <span>CASIO-STYLE</span>
          </div>
          <div className="flex items-baseline font-black tracking-tighter" style={{ fontSize: "calc(var(--clock-size) * 0.17)" }}>
            <span>{time12}</span>
            <span className="font-bold ml-1" style={{ fontSize: "calc(var(--clock-size) * 0.09)" }}>:{secondsStr}</span>
          </div>
          <div className="font-bold text-right w-full mt-1" style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}>{ampm}</div>
        </div>
      );

    case "digital-glass":
      return (
        <div
          className="w-full h-full rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center border border-white/20 shadow-md relative"
          style={{ padding: "calc(var(--clock-size) * 0.05)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <div
            className="font-semibold tracking-wider text-indigo-400 mb-1 uppercase"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline" style={{ gap: "calc(var(--clock-size) * 0.015)" }}>
            <span className="font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent" style={{ fontSize: "calc(var(--clock-size) * 0.17)" }}>
              {time12}
            </span>
            <span className="font-bold text-purple-400" style={{ fontSize: "calc(var(--clock-size) * 0.085)" }}>:{secondsStr}</span>
            <span className="font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" style={{ fontSize: "calc(var(--clock-size) * 0.045)", padding: "2px 6px" }}>
              {ampm}
            </span>
          </div>
        </div>
      );

    case "digital-rgb":
      return (
        <div
          className="w-full h-full rounded-2xl bg-slate-950 flex flex-col items-center justify-center border border-rose-500/20 shadow-md relative overflow-hidden"
          style={{ padding: "calc(var(--clock-size) * 0.05)", fontFamily: "'Press Start 2P', monospace" }}
        >
          <div
            className="uppercase tracking-widest text-slate-400 mb-2"
            style={{ fontSize: "calc(var(--clock-size) * 0.035)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline font-black bg-gradient-to-r from-rose-500 via-yellow-400 via-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent" style={{ fontSize: "calc(var(--clock-size) * 0.11)", gap: "calc(var(--clock-size) * 0.01)" }}>
            <span>{time12}</span>
            <span className="text-rose-400 ml-1 uppercase" style={{ fontSize: "calc(var(--clock-size) * 0.04)" }}>{ampm}</span>
          </div>
          <div
            className="mt-2 text-slate-500 tracking-widest"
            style={{ fontSize: "calc(var(--clock-size) * 0.03)" }}
          >
            RGB SPECTRUM
          </div>
        </div>
      );

    case "digital-weather":
      return (
        <div
          className="w-full h-full rounded-2xl bg-slate-900 text-slate-100 flex flex-col items-center justify-between border border-slate-700 shadow-md"
          style={{ padding: "calc(var(--clock-size) * 0.04)", fontFamily: "'Teko', sans-serif" }}
        >
          <div className="w-full flex justify-between items-center text-cyan-400 border-b border-slate-800 pb-1" style={{ fontSize: "calc(var(--clock-size) * 0.05)" }}>
            <span>{dayStr}</span>
            <span className="flex items-center gap-1 text-amber-400">☀️ 72°F</span>
          </div>
          <div className="flex items-baseline font-black text-white my-auto" style={{ fontSize: "calc(var(--clock-size) * 0.22)", gap: "calc(var(--clock-size) * 0.01)" }}>
            <span>{time12}</span>
            <span className="text-cyan-400" style={{ fontSize: "calc(var(--clock-size) * 0.12)" }}>:{secondsStr}</span>
            <span className="font-bold text-slate-400 ml-1" style={{ fontSize: "calc(var(--clock-size) * 0.06)" }}>{ampm}</span>
          </div>
          <div className="w-full flex justify-between items-center text-slate-400 border-t border-slate-800 pt-1" style={{ fontSize: "calc(var(--clock-size) * 0.04)" }}>
            <span>HUMIDITY: 45%</span>
            <span>ATOMIC SYNC</span>
          </div>
        </div>
      );

    case "digital-floating-3d":
      return (
        <div
          className="w-full h-full rounded-2xl bg-zinc-900 flex flex-col items-center justify-center border border-zinc-800 shadow-md relative"
          style={{ padding: "calc(var(--clock-size) * 0.05)", fontFamily: "'Syncopate', sans-serif" }}
        >
          <div
            className="text-zinc-400 mb-1 uppercase tracking-widest"
            style={{ fontSize: "calc(var(--clock-size) * 0.035)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" style={{ fontSize: "calc(var(--clock-size) * 0.13)", gap: "calc(var(--clock-size) * 0.015)" }}>
            <span className="bg-zinc-800/80 rounded-xl border border-zinc-700 shadow-sm" style={{ padding: "calc(var(--clock-size) * 0.01) calc(var(--clock-size) * 0.03)" }}>
              {time12}
            </span>
            <span className="text-zinc-400" style={{ fontSize: "calc(var(--clock-size) * 0.075)" }}>:{secondsStr}</span>
            <span className="font-bold text-amber-400" style={{ fontSize: "calc(var(--clock-size) * 0.04)" }}>{ampm}</span>
          </div>
        </div>
      );

    case "digital-red-bedside":
      return (
        <div
          className="w-full h-full rounded-2xl bg-black flex flex-col items-center justify-center border-2 border-zinc-900 shadow-md relative"
          style={{ padding: "calc(var(--clock-size) * 0.05)", fontFamily: "'Wallpoet', cursive" }}
        >
          <div
            className="text-red-700 mb-1 tracking-widest uppercase"
            style={{ fontSize: "calc(var(--clock-size) * 0.038)" }}
          >
            ALARM 07:00 AM • {dayStr}
          </div>
          <div className="flex items-baseline font-bold text-red-600 drop-shadow-[0_0_3px_rgba(220,38,38,0.4)]" style={{ fontSize: "calc(var(--clock-size) * 0.17)", gap: "calc(var(--clock-size) * 0.01)" }}>
            <span>{time12}</span>
            <span className="text-red-700" style={{ fontSize: "calc(var(--clock-size) * 0.09)" }}>:{secondsStr}</span>
          </div>
          <div className="font-bold text-red-500 mt-1 uppercase tracking-wider" style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}>
            {ampm}
          </div>
        </div>
      );

    case "digital-vfd-blue":
      return (
        <div
          className="w-full h-full rounded-2xl bg-slate-950 flex flex-col items-center justify-center border border-cyan-900 shadow-md relative"
          style={{ padding: "calc(var(--clock-size) * 0.05)", fontFamily: "'DotGothic16', sans-serif" }}
        >
          <div
            className="text-cyan-700 mb-1 uppercase tracking-widest"
            style={{ fontSize: "calc(var(--clock-size) * 0.04)" }}
          >
            VACUUM TUBE // {dayStr}
          </div>
          <div className="flex items-baseline font-black text-cyan-400 drop-shadow-[0_0_3px_#06b6d4]" style={{ fontSize: "calc(var(--clock-size) * 0.16)", gap: "calc(var(--clock-size) * 0.015)" }}>
            <span>{time12}</span>
            <span className="text-cyan-500 opacity-90" style={{ fontSize: "calc(var(--clock-size) * 0.085)" }}>:{secondsStr}</span>
            <span className="text-cyan-300 font-bold" style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}>{ampm}</span>
          </div>
        </div>
      );

    case "digital-pastel":
      return (
        <div
          className="w-full h-full rounded-2xl bg-teal-50 dark:bg-slate-800 flex flex-col items-center justify-center border-4 border-teal-200 dark:border-slate-700 shadow-md"
          style={{ padding: "calc(var(--clock-size) * 0.05)", fontFamily: "'Fredoka', cursive" }}
        >
          <div
            className="font-medium text-teal-700 dark:text-teal-400 mb-1 uppercase tracking-wide"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline font-black text-teal-900 dark:text-teal-100" style={{ fontSize: "calc(var(--clock-size) * 0.17)", gap: "calc(var(--clock-size) * 0.015)" }}>
            <span>{time12}</span>
            <span className="text-teal-600 dark:text-teal-400" style={{ fontSize: "calc(var(--clock-size) * 0.09)" }}>:{secondsStr}</span>
            <span className="badge badge-accent badge-sm font-bold" style={{ fontSize: "calc(var(--clock-size) * 0.04)" }}>{ampm}</span>
          </div>
        </div>
      );

    case "digital-modern":
    default:
      return (
        <div
          className="w-full h-full rounded-2xl bg-base-200 flex flex-col items-center justify-center border border-base-300 shadow-md"
          style={{ padding: "calc(var(--clock-size) * 0.05)", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <div
            className="font-medium text-base-content/60 mb-1 uppercase tracking-wide"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline" style={{ gap: "calc(var(--clock-size) * 0.015)" }}>
            <span className="font-extrabold text-base-content tracking-tight" style={{ fontSize: "calc(var(--clock-size) * 0.17)" }}>
              {time12}
            </span>
            <span className="font-semibold text-primary" style={{ fontSize: "calc(var(--clock-size) * 0.09)" }}>:{secondsStr}</span>
            <span className="badge badge-primary badge-sm font-bold" style={{ fontSize: "calc(var(--clock-size) * 0.04)" }}>{ampm}</span>
          </div>
        </div>
      );
  }
}
