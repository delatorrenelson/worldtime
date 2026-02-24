import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeTimeZone, LOCAL_TIMEZONE, type TimeZoneInfo } from "../features/timeZone/timeZoneSlice";

export default function Clock({ clock }: { clock: TimeZoneInfo }) {
  const dispatch = useAppDispatch()
  const clockSize = useAppSelector((state) => state.timeZone.clockSize);
  const [utc, setUTC] = useState("");
  const { timezone } = clock;

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
    const intervalId = setInterval(() => {
      const zone = moment().tz(timezone);
      setUTC(() => zone.format("hh:mm:ss A"));

      setSeconds(() => zone.seconds());
      setMinutes(() => zone.minutes());
      setHours(() => zone.hours());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card content-center gap-4 items-center min-w-[20%] bg-base-100">
      <figure className="p-6">
        <div
          className="clock outline stats-value shadow-lg"
          style={{ '--clock-size': sizeMap[clockSize] } as React.CSSProperties}
        >
          <div
            className="hour_hand"
            style={{
              transform: `rotateZ(${hours * 30}deg)`,
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
          <span className="twelve">12</span>
          <span className="one">1</span>
          <span className="two">2</span>
          <span className="three">3</span>
          <span className="four">4</span>
          <span className="five">5</span>
          <span className="six">6</span>
          <span className="seven">7</span>
          <span className="eight">8</span>
          <span className="nine">9</span>
          <span className="ten">10</span>
          <span className="eleven">11</span>
        </div>
      </figure>

      <div className="flex items-center gap-2">
        <p className="text-3xl font-semibold text-center">{timezone}</p>
        {timezone === LOCAL_TIMEZONE && (
          <span className="badge badge-primary badge-sm">Local</span>
        )}
      </div>
      <p className="text-xl text-center">{utc}</p>
      <button className="btn-xs btn-error btn-ghost cursor-pointer" onClick={() => {
        dispatch(removeTimeZone(clock))
      }}>Remove</button>
    </div>
  );
}
