import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  removeTimeZone,
  setClockDisplayType,
  setClockTemplate,
  LOCAL_TIMEZONE,
  type TimeZoneInfo,
} from "../features/timeZone/timeZoneSlice";
import { ANALOG_TEMPLATES, DIGITAL_TEMPLATES } from "../utils/clockTemplates";

export interface ClockProps {
  clock: TimeZoneInfo;
  index: number;
  isDragging?: boolean;
  isDragOver?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const TICKS = Array.from({ length: 60 }, (_, i) => i);
const STANDARD_NUMBERS = [
  { class: "twelve", label: "12" },
  { class: "one", label: "1" },
  { class: "two", label: "2" },
  { class: "three", label: "3" },
  { class: "four", label: "4" },
  { class: "five", label: "5" },
  { class: "six", label: "6" },
  { class: "seven", label: "7" },
  { class: "eight", label: "8" },
  { class: "nine", label: "9" },
  { class: "ten", label: "10" },
  { class: "eleven", label: "11" },
];

const ROMAN_NUMBERS = [
  { class: "twelve", label: "XII" },
  { class: "one", label: "I" },
  { class: "two", label: "II" },
  { class: "three", label: "III" },
  { class: "four", label: "IV" },
  { class: "five", label: "V" },
  { class: "six", label: "VI" },
  { class: "seven", label: "VII" },
  { class: "eight", label: "VIII" },
  { class: "nine", label: "IX" },
  { class: "ten", label: "X" },
  { class: "eleven", label: "XI" },
];

export default function Clock({
  clock,
  index,
  isDragging,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
}: ClockProps) {
  const dispatch = useAppDispatch();
  const clockSize = useAppSelector((state) => state.timeZone.clockSize);
  const globalDisplayType = useAppSelector(
    (state) => state.timeZone.globalDisplayType
  );
  const globalAnalogTemplate = useAppSelector(
    (state) => state.timeZone.globalAnalogTemplate
  );
  const globalDigitalTemplate = useAppSelector(
    (state) => state.timeZone.globalDigitalTemplate
  );

  const [utc, setUTC] = useState("");
  const [time12, setTime12] = useState("12:00");
  const [secondsStr, setSecondsStr] = useState("00");
  const [ampm, setAmpm] = useState("AM");
  const [dayStr, setDayStr] = useState("");

  const { timezone } = clock;

  const displayType = clock.displayType || globalDisplayType || "analog";
  const template =
    clock.template ||
    (displayType === "digital" ? globalDigitalTemplate : globalAnalogTemplate);

  const sizeMap: Record<string, string> = {
    sm: "150px",
    md: "200px",
    lg: "250px",
    xl: "300px",
    "2xl": "380px",
    "3xl": "460px",
    "4xl": "560px",
    "5xl": "700px",
  };

  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const zone = moment().tz(timezone);
      setUTC(zone.format("hh:mm:ss A"));
      setTime12(zone.format("hh:mm"));
      setSecondsStr(zone.format("ss"));
      setAmpm(zone.format("A"));
      setDayStr(zone.format("ddd, MMM D"));

      setSeconds(zone.seconds());
      setMinutes(zone.minutes());
      setHours(zone.hours());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  const numberSet =
    template === "roman" ? ROMAN_NUMBERS : STANDARD_NUMBERS;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, index)}
      onDragOver={(e) => onDragOver?.(e, index)}
      onDragLeave={(e) => onDragLeave?.(e, index)}
      onDrop={(e) => onDrop?.(e, index)}
      onDragEnd={onDragEnd}
      className={`card group content-center gap-4 items-center min-w-[20%] bg-base-100 p-4 relative cursor-grab active:cursor-grabbing transition-all duration-200 border-2 select-none ${isDragging ? "opacity-30 scale-95 border-dashed border-primary" : ""
        } ${isDragOver
          ? "border-primary ring-2 ring-primary ring-offset-2 scale-[1.03]"
          : "border-transparent"
        }`}
    >
      {/* Settings / Controls overlay dropdown */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-circle btn-ghost btn-xs opacity-60 hover:opacity-100 cursor-pointer"
            title="Clock Options"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-30 menu p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200 text-xs gap-1"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <li>
              <button
                className="py-2 font-semibold flex items-center justify-between"
                onClick={() => {
                  const nextMode = displayType === "analog" ? "digital" : "analog";
                  dispatch(
                    setClockDisplayType({ index, displayType: nextMode })
                  );
                }}
              >
                <span>Switch to {displayType === "analog" ? "Digital" : "Analog"}</span>
                <span className="badge badge-primary badge-sm uppercase">
                  {displayType}
                </span>
              </button>
            </li>

            <li className="menu-title text-base-content/60 font-semibold px-2 py-1 mt-2">
              Select Template
            </li>
            {(displayType === "analog"
              ? ANALOG_TEMPLATES
              : DIGITAL_TEMPLATES
            ).map((tmpl) => (
              <li key={tmpl.id}>
                <button
                  className={`py-1 ${template === tmpl.id ? "active font-bold" : ""}`}
                  onClick={() =>
                    dispatch(setClockTemplate({ index, template: tmpl.id }))
                  }
                >
                  {tmpl.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="p-6">
        {displayType === "analog" ? (
          <div
            className={`clock outline stats-value shadow-lg tmpl-${template}`}
            style={{ "--clock-size": sizeMap[clockSize] } as React.CSSProperties}
          >
            <div
              className="hour_hand"
              style={{
                transform: `rotateZ(${hours * 30 + minutes * 0.5}deg)`,
              }}
            />
            <div
              className="min_hand"
              style={{
                transform: `rotateZ(${minutes * 6}deg)`,
              }}
            />
            <div
              className="sec_hand"
              style={{
                transform: `rotateZ(${seconds * 6}deg)`,
              }}
            />
            {/* Special face overlays for Seiko Combo & Military 24h */}
            {template === "seiko-combo" && (
              <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2 bg-slate-100 border border-slate-400 text-slate-900 px-2 py-0.5 rounded text-[10px] font-mono font-bold shadow-inner z-10">
                {dayStr}
              </div>
            )}
            {template === "military-24h" && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[62%] h-[62%] rounded-full border border-dashed border-stone-400/40 relative">
                  {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((num, idx) => (
                    <span
                      key={num}
                      className="absolute text-[9px] font-bold text-stone-500"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) rotate(${idx * 30 + 30
                          }deg) translateY(-2.2em) rotate(-${idx * 30 + 30}deg)`,
                      }}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Minute Ticks */}
            {TICKS.map((i) => (
              <div
                key={`tick-${i}`}
                className={`tick ${i % 5 === 0 ? "tick-hour" : "tick-minute"}`}
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 6
                    }deg) translateY(calc(-1 * var(--tick-radius) * var(--clock-size)))`,
                }}
              />
            ))}
            {numberSet.map((num) => (
              <span key={num.class} className={num.class}>
                {num.label}
              </span>
            ))}
          </div>
        ) : (
          /* Digital Display Container */
          <div
            className="flex items-center justify-center"
            style={{ width: sizeMap[clockSize], height: sizeMap[clockSize] }}
          >
            <DigitalDisplay
              template={template}
              time12={time12}
              secondsStr={secondsStr}
              ampm={ampm}
              dayStr={dayStr}
            />
          </div>
        )}
      </figure>

      <div id="timezone" className={`flex items-center gap-2 tz-tmpl-${template}`}>
        <p className="text-3xl font-semibold text-center">{timezone}</p>
        {timezone === LOCAL_TIMEZONE && (
          <span className="badge badge-primary badge-sm">Local</span>
        )}
      </div>
      <button
        className="btn-xs btn-error btn-ghost cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        draggable={false}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(removeTimeZone(clock));
        }}
      >
        Remove
      </button>
    </div>
  );
}

/* Digital Clock Template Helper Component */
function DigitalDisplay({
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
        <div className="w-full h-full rounded-2xl bg-slate-950 p-6 flex flex-col items-center justify-center border-4 border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="text-xs uppercase font-mono tracking-widest text-emerald-500/70 mb-2">
            {dayStr}
          </div>
          <div className="flex items-baseline gap-2 font-mono text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]">
            <span className="text-5xl font-bold tracking-wider">{time12}</span>
            <span className="text-2xl font-semibold opacity-90">:{secondsStr}</span>
            <span className="text-sm font-bold text-emerald-300 ml-1">{ampm}</span>
          </div>
          <div className="mt-3 text-[10px] text-emerald-600/80 tracking-widest">
            DIGITAL LED WATCH
          </div>
        </div>
      );

    case "digital-cyber":
      return (
        <div className="w-full h-full rounded-2xl bg-slate-900 p-6 flex flex-col items-center justify-center border-2 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25)] relative overflow-hidden">
          <div className="text-xs font-mono tracking-widest text-pink-400 mb-2 uppercase">
            // {dayStr}
          </div>
          <div className="flex items-baseline gap-2 font-mono text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]">
            <span className="text-5xl font-extrabold">{time12}</span>
            <span className="text-2xl font-bold text-pink-500">:{secondsStr}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {ampm}
            </span>
          </div>
          <div className="w-full mt-4 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
        </div>
      );

    case "digital-flip":
      return (
        <div className="w-full h-full rounded-2xl bg-zinc-950 p-5 flex flex-col items-center justify-center border border-zinc-800 shadow-2xl">
          <div className="text-xs text-zinc-400 font-medium mb-3 uppercase tracking-wider">
            {dayStr}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-4xl font-extrabold text-zinc-100 font-mono shadow-inner">
              {time12}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/60" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="bg-zinc-800 text-amber-400 text-xs font-bold px-2 py-1 rounded border border-zinc-700 font-mono">
                :{secondsStr}
              </span>
              <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded text-center">
                {ampm}
              </span>
            </div>
          </div>
        </div>
      );

    case "digital-lcd":
      return (
        <div className="w-full h-full rounded-2xl bg-[#9ea88e] p-6 flex flex-col items-center justify-center border-8 border-zinc-800 text-zinc-900 font-mono shadow-inner relative">
          <div className="w-full flex justify-between items-center text-xs font-bold border-b border-zinc-800/40 pb-1 mb-2">
            <span className="uppercase">{dayStr}</span>
            <span>CASIO-STYLE</span>
          </div>
          <div className="flex items-baseline gap-1 text-5xl font-black tracking-tighter">
            <span>{time12}</span>
            <span className="text-2xl font-bold ml-1">:{secondsStr}</span>
          </div>
          <div className="text-xs font-bold mt-1 text-right w-full">{ampm}</div>
        </div>
      );

    case "digital-glass":
      return (
        <div className="w-full h-full rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-md p-6 flex flex-col items-center justify-center border border-white/20 shadow-2xl relative">
          <div className="text-xs font-semibold tracking-wider text-indigo-400 mb-2 uppercase">
            {dayStr}
          </div>
          <div className="flex items-baseline gap-2 font-sans">
            <span className="text-5xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {time12}
            </span>
            <span className="text-xl font-bold text-purple-400">:{secondsStr}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {ampm}
            </span>
          </div>
        </div>
      );

    case "digital-rgb":
      return (
        <div className="w-full h-full rounded-2xl bg-slate-950 p-6 flex flex-col items-center justify-center border-2 border-rose-500/30 shadow-[0_0_25px_rgba(244,63,94,0.3)] relative overflow-hidden">
          <div className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-2">
            {dayStr}
          </div>
          <div className="flex items-baseline gap-2 font-mono font-black text-5xl bg-gradient-to-r from-rose-500 via-yellow-400 via-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-md">
            <span>{time12}</span>
            <span className="text-2xl opacity-90">:{secondsStr}</span>
            <span className="text-xs text-rose-400 ml-1 uppercase">{ampm}</span>
          </div>
          <div className="mt-3 text-[10px] text-slate-500 font-mono tracking-widest">
            RGB SPECTRUM DISPLAY
          </div>
        </div>
      );

    case "digital-weather":
      return (
        <div className="w-full h-full rounded-2xl bg-slate-900 text-slate-100 p-5 flex flex-col items-center justify-between border border-slate-700 shadow-xl">
          <div className="w-full flex justify-between items-center text-xs font-mono text-cyan-400 border-b border-slate-800 pb-1">
            <span>{dayStr}</span>
            <span className="flex items-center gap-1 text-amber-400">☀️ 72°F</span>
          </div>
          <div className="flex items-baseline gap-1 font-mono text-5xl font-black text-white my-auto">
            <span>{time12}</span>
            <span className="text-2xl text-cyan-400">:{secondsStr}</span>
            <span className="text-xs font-bold text-slate-400 ml-1">{ampm}</span>
          </div>
          <div className="w-full flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-1">
            <span>HUMIDITY: 45%</span>
            <span>ATOMIC SYNC</span>
          </div>
        </div>
      );

    case "digital-floating-3d":
      return (
        <div className="w-full h-full rounded-2xl bg-zinc-900 p-6 flex flex-col items-center justify-center border border-zinc-800 shadow-2xl relative">
          <div className="text-xs font-mono text-zinc-400 mb-2 uppercase tracking-widest">
            {dayStr}
          </div>
          <div className="flex items-baseline gap-2 font-mono text-5xl font-black text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
            <span className="bg-zinc-800/80 px-3 py-1 rounded-xl border border-zinc-700 shadow-lg">
              {time12}
            </span>
            <span className="text-2xl text-zinc-400">:{secondsStr}</span>
            <span className="text-xs font-bold text-amber-400">{ampm}</span>
          </div>
        </div>
      );

    case "digital-red-bedside":
      return (
        <div className="w-full h-full rounded-2xl bg-black p-6 flex flex-col items-center justify-center border-4 border-zinc-900 shadow-2xl relative">
          <div className="text-[10px] font-mono text-red-700 mb-1 tracking-widest uppercase">
            ALARM 07:00 AM • {dayStr}
          </div>
          <div className="flex items-baseline gap-1 font-mono text-6xl font-bold text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.9)]">
            <span>{time12}</span>
            <span className="text-2xl text-red-700">:{secondsStr}</span>
          </div>
          <div className="text-xs font-bold text-red-500 mt-1 uppercase tracking-wider">
            {ampm}
          </div>
        </div>
      );

    case "digital-vfd-blue":
      return (
        <div className="w-full h-full rounded-2xl bg-slate-950 p-6 flex flex-col items-center justify-center border-2 border-cyan-900 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
          <div className="text-xs font-mono text-cyan-700 mb-2 uppercase tracking-widest">
            VACUUM TUBE // {dayStr}
          </div>
          <div className="flex items-baseline gap-2 font-mono text-5xl font-black text-cyan-400 drop-shadow-[0_0_12px_#06b6d4]">
            <span>{time12}</span>
            <span className="text-2xl text-cyan-500 opacity-90">:{secondsStr}</span>
            <span className="text-xs text-cyan-300 font-bold">{ampm}</span>
          </div>
        </div>
      );

    case "digital-pastel":
      return (
        <div className="w-full h-full rounded-2xl bg-teal-50 dark:bg-slate-800 p-6 flex flex-col items-center justify-center border-4 border-teal-200 dark:border-slate-700 shadow-lg">
          <div className="text-xs font-medium text-teal-700 dark:text-teal-400 mb-2 uppercase tracking-wide">
            {dayStr}
          </div>
          <div className="flex items-baseline gap-2 font-sans text-5xl font-black text-teal-900 dark:text-teal-100">
            <span>{time12}</span>
            <span className="text-2xl text-teal-600 dark:text-teal-400">:{secondsStr}</span>
            <span className="badge badge-accent badge-sm font-bold">{ampm}</span>
          </div>
        </div>
      );

    case "digital-modern":
    default:
      return (
        <div className="w-full h-full rounded-2xl bg-base-200 p-6 flex flex-col items-center justify-center border border-base-300 shadow-md">
          <div className="text-xs font-medium text-base-content/60 mb-2 uppercase tracking-wide">
            {dayStr}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-base-content tracking-tight">
              {time12}
            </span>
            <span className="text-xl font-semibold text-primary">:{secondsStr}</span>
            <span className="badge badge-primary badge-sm font-bold">{ampm}</span>
          </div>
        </div>
      );
  }
}
