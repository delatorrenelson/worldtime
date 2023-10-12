import { useEffect, useState } from "react";
import moment from "moment";

export default function Clock({ clock }) {
  const [utc, setUTC] = useState("");
  const { isSelected, timezone } = clock;

  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const zone = moment().tz(timezone);
      setUTC(() => zone.format("hh:mm:ss A"));

      setSeconds(() => zone.seconds());
      setMinutes(() => zone.minutes());
      setHours(() => zone.hours());
      // setUTC(() => moment().tz(timeZone).format("hh:mm:ss A")); if you want to display miliseconds
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card content-center gap-4 items-center min-w-[20%] bg-base-100">
      <p className="text-xl font-semibold text-center">{timezone}</p>
      <figure className="">
        <div className="clock outline">
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

      <p className="text-xl text-center">{utc}</p>
    </div>
  );
}
