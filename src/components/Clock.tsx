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
import { getFlagUrl, getFlagEmoji } from "../utils/timezoneFlags";
import { DigitalDisplay } from "./DigitalDisplay";

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

export const TICKS = Array.from({ length: 60 }, (_, i) => i);
export const STANDARD_NUMBERS = [
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

export const ROMAN_NUMBERS = [
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

export function getTimeDiffString(targetTimezone: string): string {
  if (targetTimezone === LOCAL_TIMEZONE) {
    return "";
  }

  const localOffsetMinutes = moment().tz(LOCAL_TIMEZONE).utcOffset();
  const targetOffsetMinutes = moment().tz(targetTimezone).utcOffset();
  const diffMinutes = targetOffsetMinutes - localOffsetMinutes;

  if (diffMinutes === 0) {
    return "";
  }

  const isEarly = diffMinutes > 0;
  const absDiff = Math.abs(diffMinutes);
  const hours = Math.floor(absDiff / 60);
  const minutes = absDiff % 60;

  const parts: string[] = [];
  if (hours > 0) {
    parts.push(`${hours}${hours === 1 ? "hr" : "hrs"}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}${minutes === 1 ? "min" : "mins"}`);
  }

  const durationStr = parts.join(", ");
  const directionStr = isEarly ? "early from your local time" : "late from your local time";

  return `${durationStr} ${directionStr}`;
}

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`#clock-options-${index}`)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, index]);

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
      id="clock"
      className={`card group content-center gap-1 items-center min-w-[20%] bg-base-100 p-4 relative cursor-grab active:cursor-grabbing transition-all duration-200 border-2 select-none ${isDragging ? "opacity-30 scale-95 border-dashed border-primary" : ""
        } ${isDragOver
          ? "border-primary ring-2 ring-primary ring-offset-2 scale-[1.03]"
          : "border-transparent"
        }`}
    >
      {/* Settings / Controls overlay dropdown button */}
      <div
        id={`clock-options-${index}`}
        className={`absolute top-3 right-3 z-30 transition-opacity duration-200 ${isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
      >
        <button
          type="button"
          className="btn btn-circle btn-sm bg-base-200/90 hover:bg-base-300 border border-base-300/80 shadow-md text-base-content/80 hover:text-base-content cursor-pointer transition-all duration-200 hover:scale-105"
          title="Clock Options"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>

        {isMenuOpen && (
          <div
            className="absolute right-0 top-9 z-40 shadow-2xl bg-base-100 rounded-2xl w-56 border border-base-300 text-xs p-2 flex flex-col gap-1 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="p-1 border-b border-base-200 pb-2">
              <button
                className="btn btn-sm btn-ghost w-full justify-between font-semibold text-xs"
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
            </div>

            <div className="px-2 pt-1 font-bold text-[11px] uppercase tracking-wider text-base-content/60">
              Select Template
            </div>

            <div className="max-h-48 overflow-y-auto px-1 py-1 flex flex-col gap-0.5">
              {(displayType === "analog"
                ? ANALOG_TEMPLATES
                : DIGITAL_TEMPLATES
              ).map((tmpl) => (
                <button
                  key={tmpl.id}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${template === tmpl.id
                    ? "bg-primary text-primary-content font-bold shadow-sm"
                    : "hover:bg-base-200 text-base-content/80"
                    }`}
                  onClick={() =>
                    dispatch(setClockTemplate({ index, template: tmpl.id }))
                  }
                >
                  <span className="truncate">{tmpl.name}</span>
                  {template === tmpl.id && (
                    <span className="text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="border-t border-base-200 pt-2 mt-1 px-1">
              <button
                className="btn btn-sm btn-error text-error-content w-full gap-1.5 font-bold text-xs shadow-sm"
                onClick={() => {
                  setIsMenuOpen(false);
                  dispatch(removeTimeZone(clock));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <span>Remove this clock</span>
              </button>
            </div>
          </div>
        )}
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
              style={{ transform: `rotateZ(${minutes * 6}deg)` }}
            />
            <div
              className="sec_hand"
              style={{ transform: `rotateZ(${seconds * 6}deg)` }}
            />

            {template === "seiko-combo" && (
              <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2 bg-slate-100 border border-slate-400 text-slate-900 px-1 py-0.5 rounded text-[8px] font-mono font-bold z-10">
                {dayStr}
              </div>
            )}

            {template === "military-24h" && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[62%] h-[62%] rounded-full border border-dashed border-stone-400/40 relative">
                  {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((num, idx) => (
                    <span
                      key={num}
                      className="absolute text-[8px] font-bold text-stone-500"
                      style={{
                        top: "50%",
                        left: "50%",
                        fontSize: "calc(var(--clock-size) * 0.048)",
                        transform: `translate(-50%, -50%) rotate(${idx * 30 + 30}deg) translateY(calc(-1 * 0.25 * var(--clock-size))) rotate(-${idx * 30 + 30}deg)`,
                      }}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            )}

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

      <div id="timezone" className={`flex flex-col items-center gap-1.5 tz-tmpl-${template}`}>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {getFlagUrl(timezone) ? (
            <img
              src={getFlagUrl(timezone)!}
              alt={`${timezone} flag`}
              className="h-7 w-auto aspect-[4/3] object-cover rounded shadow-sm border border-base-300/60 inline-block align-middle"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-2xl sm:text-3xl inline-block align-middle">{getFlagEmoji(timezone)}</span>
          )}
          <p className="text-3xl font-semibold text-center">{timezone}</p>
        </div>
        <div className="mt-1">
          <span className="tz-diff-badge text-base font-semibold tracking-wider px-3.5 py-1 rounded-full shadow-sm border border-primary/20 inline-block">
            {timezone === LOCAL_TIMEZONE
              ? "YOUR LOCAL TIME ZONE"
              : getTimeDiffString(timezone)}
          </span>
        </div>
      </div>
    </div>
  );
}
