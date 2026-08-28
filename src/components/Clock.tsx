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
            className={`clock outline stats-value shadow-md tmpl-${template}`}
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
                        fontSize: "calc(var(--clock-size) * 0.048)",
                        transform: `translate(-50%, -50%) rotate(${idx * 30 + 30
                          }deg) translateY(calc(-1 * 0.25 * var(--clock-size))) rotate(-${idx * 30 + 30}deg)`,
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
            className="flex items-center justify-center overflow-hidden rounded-2xl"
            style={{
              width: sizeMap[clockSize],
              height: sizeMap[clockSize],
              "--clock-size": sizeMap[clockSize],
            } as React.CSSProperties}
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
        <div
          className="w-full h-full rounded-2xl bg-slate-950 flex flex-col items-center justify-center border-4 border-slate-800 shadow-md relative overflow-hidden"
          style={{ padding: "calc(var(--clock-size) * 0.05)" }}
        >
          <div
            className="uppercase font-mono tracking-widest text-emerald-500/70 mb-1"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline font-mono text-emerald-400 drop-shadow-[0_0_3px_rgba(52,211,153,0.35)]" style={{ gap: "calc(var(--clock-size) * 0.015)" }}>
            <span className="font-bold tracking-wider" style={{ fontSize: "calc(var(--clock-size) * 0.17)" }}>{time12}</span>
            <span className="font-semibold opacity-90" style={{ fontSize: "calc(var(--clock-size) * 0.09)" }}>:{secondsStr}</span>
            <span className="font-bold text-emerald-300 ml-1" style={{ fontSize: "calc(var(--clock-size) * 0.05)" }}>{ampm}</span>
          </div>
          <div
            className="mt-2 text-emerald-600/80 tracking-widest font-mono"
            style={{ fontSize: "calc(var(--clock-size) * 0.038)" }}
          >
            DIGITAL LED WATCH
          </div>
        </div>
      );

    case "digital-cyber":
      return (
        <div
          className="w-full h-full rounded-2xl bg-slate-900 flex flex-col items-center justify-center border border-cyan-500/30 shadow-md relative overflow-hidden"
          style={{ padding: "calc(var(--clock-size) * 0.05)" }}
        >
          <div
            className="font-mono tracking-widest text-pink-400 mb-1 uppercase"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            // {dayStr}
          </div>
          <div className="flex items-baseline font-mono text-cyan-400 drop-shadow-[0_0_3px_#06b6d4]" style={{ gap: "calc(var(--clock-size) * 0.015)" }}>
            <span className="font-extrabold" style={{ fontSize: "calc(var(--clock-size) * 0.17)" }}>{time12}</span>
            <span className="font-bold text-pink-500" style={{ fontSize: "calc(var(--clock-size) * 0.09)" }}>:{secondsStr}</span>
            <span className="font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-800" style={{ fontSize: "calc(var(--clock-size) * 0.045)", padding: "2px 6px" }}>
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
          style={{ padding: "calc(var(--clock-size) * 0.04)" }}
        >
          <div
            className="text-zinc-400 font-medium mb-2 uppercase tracking-wider"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-center" style={{ gap: "calc(var(--clock-size) * 0.015)" }}>
            <div
              className="relative bg-zinc-900 border border-zinc-700/80 rounded-xl font-extrabold text-zinc-100 font-mono shadow-inner"
              style={{ fontSize: "calc(var(--clock-size) * 0.14)", padding: "calc(var(--clock-size) * 0.02) calc(var(--clock-size) * 0.04)" }}
            >
              {time12}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/60" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="bg-zinc-800 text-amber-400 font-bold rounded border border-zinc-700 font-mono" style={{ fontSize: "calc(var(--clock-size) * 0.055)", padding: "2px 4px" }}>
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
          className="w-full h-full rounded-2xl bg-[#9ea88e] flex flex-col items-center justify-center border-4 border-zinc-800 text-zinc-900 font-mono shadow-inner relative"
          style={{ padding: "calc(var(--clock-size) * 0.05)" }}
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
          style={{ padding: "calc(var(--clock-size) * 0.05)" }}
        >
          <div
            className="font-semibold tracking-wider text-indigo-400 mb-1 uppercase"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline font-sans" style={{ gap: "calc(var(--clock-size) * 0.015)" }}>
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
          style={{ padding: "calc(var(--clock-size) * 0.05)" }}
        >
          <div
            className="uppercase font-mono tracking-widest text-slate-400 mb-1"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline font-mono font-black bg-gradient-to-r from-rose-500 via-yellow-400 via-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent" style={{ fontSize: "calc(var(--clock-size) * 0.17)", gap: "calc(var(--clock-size) * 0.015)" }}>
            <span>{time12}</span>
            <span className="opacity-90" style={{ fontSize: "calc(var(--clock-size) * 0.09)" }}>:{secondsStr}</span>
            <span className="text-rose-400 ml-1 uppercase" style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}>{ampm}</span>
          </div>
          <div
            className="mt-2 text-slate-500 font-mono tracking-widest"
            style={{ fontSize: "calc(var(--clock-size) * 0.038)" }}
          >
            RGB SPECTRUM DISPLAY
          </div>
        </div>
      );

    case "digital-weather":
      return (
        <div
          className="w-full h-full rounded-2xl bg-slate-900 text-slate-100 flex flex-col items-center justify-between border border-slate-700 shadow-md"
          style={{ padding: "calc(var(--clock-size) * 0.04)" }}
        >
          <div className="w-full flex justify-between items-center font-mono text-cyan-400 border-b border-slate-800 pb-1" style={{ fontSize: "calc(var(--clock-size) * 0.04)" }}>
            <span>{dayStr}</span>
            <span className="flex items-center gap-1 text-amber-400">☀️ 72°F</span>
          </div>
          <div className="flex items-baseline font-mono font-black text-white my-auto" style={{ fontSize: "calc(var(--clock-size) * 0.17)", gap: "calc(var(--clock-size) * 0.01)" }}>
            <span>{time12}</span>
            <span className="text-cyan-400" style={{ fontSize: "calc(var(--clock-size) * 0.09)" }}>:{secondsStr}</span>
            <span className="font-bold text-slate-400 ml-1" style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}>{ampm}</span>
          </div>
          <div className="w-full flex justify-between items-center font-mono text-slate-400 border-t border-slate-800 pt-1" style={{ fontSize: "calc(var(--clock-size) * 0.035)" }}>
            <span>HUMIDITY: 45%</span>
            <span>ATOMIC SYNC</span>
          </div>
        </div>
      );

    case "digital-floating-3d":
      return (
        <div
          className="w-full h-full rounded-2xl bg-zinc-900 flex flex-col items-center justify-center border border-zinc-800 shadow-md relative"
          style={{ padding: "calc(var(--clock-size) * 0.05)" }}
        >
          <div
            className="font-mono text-zinc-400 mb-1 uppercase tracking-widest"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline font-mono font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" style={{ fontSize: "calc(var(--clock-size) * 0.16)", gap: "calc(var(--clock-size) * 0.015)" }}>
            <span className="bg-zinc-800/80 rounded-xl border border-zinc-700 shadow-sm" style={{ padding: "calc(var(--clock-size) * 0.01) calc(var(--clock-size) * 0.03)" }}>
              {time12}
            </span>
            <span className="text-zinc-400" style={{ fontSize: "calc(var(--clock-size) * 0.085)" }}>:{secondsStr}</span>
            <span className="font-bold text-amber-400" style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}>{ampm}</span>
          </div>
        </div>
      );

    case "digital-red-bedside":
      return (
        <div
          className="w-full h-full rounded-2xl bg-black flex flex-col items-center justify-center border-2 border-zinc-900 shadow-md relative"
          style={{ padding: "calc(var(--clock-size) * 0.05)" }}
        >
          <div
            className="font-mono text-red-700 mb-1 tracking-widest uppercase"
            style={{ fontSize: "calc(var(--clock-size) * 0.038)" }}
          >
            ALARM 07:00 AM • {dayStr}
          </div>
          <div className="flex items-baseline font-mono font-bold text-red-600 drop-shadow-[0_0_3px_rgba(220,38,38,0.4)]" style={{ fontSize: "calc(var(--clock-size) * 0.18)", gap: "calc(var(--clock-size) * 0.01)" }}>
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
          style={{ padding: "calc(var(--clock-size) * 0.05)" }}
        >
          <div
            className="font-mono text-cyan-700 mb-1 uppercase tracking-widest"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            VACUUM TUBE // {dayStr}
          </div>
          <div className="flex items-baseline font-mono font-black text-cyan-400 drop-shadow-[0_0_3px_#06b6d4]" style={{ fontSize: "calc(var(--clock-size) * 0.17)", gap: "calc(var(--clock-size) * 0.015)" }}>
            <span>{time12}</span>
            <span className="text-cyan-500 opacity-90" style={{ fontSize: "calc(var(--clock-size) * 0.09)" }}>:{secondsStr}</span>
            <span className="text-cyan-300 font-bold" style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}>{ampm}</span>
          </div>
        </div>
      );

    case "digital-pastel":
      return (
        <div
          className="w-full h-full rounded-2xl bg-teal-50 dark:bg-slate-800 flex flex-col items-center justify-center border-4 border-teal-200 dark:border-slate-700 shadow-lg"
          style={{ padding: "calc(var(--clock-size) * 0.05)" }}
        >
          <div
            className="font-medium text-teal-700 dark:text-teal-400 mb-1 uppercase tracking-wide"
            style={{ fontSize: "calc(var(--clock-size) * 0.045)" }}
          >
            {dayStr}
          </div>
          <div className="flex items-baseline font-sans font-black text-teal-900 dark:text-teal-100" style={{ fontSize: "calc(var(--clock-size) * 0.17)", gap: "calc(var(--clock-size) * 0.015)" }}>
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
          style={{ padding: "calc(var(--clock-size) * 0.05)" }}
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
