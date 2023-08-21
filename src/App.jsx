import { useEffect, useState } from "react";
import Clock from "./components/Clock";
import "./App.css";
import { uuid } from "../utils/uuid";
import moment from "moment-timezone";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";

const tz = moment.tz.names();

function App() {
  const [timeZones, setTimeZones] = useState(tz);

  const [selectedTimezone, setSelectedTimeZone] = useState("Select Time zone");

  const [clocks, setClocks] = useState([
    "Asia/Manila",
    "Africa/Khartoum",
    "America/Denver",
  ]);

  return (
    <div className="App">
      <Navbar />
      <Header />
      <div className="py-6 flex justify-around">
        <div className="flex gap-4 place-items-center">
          <select
            className="select"
            placeholder="Time zone"
            name="timezoneSelect"
            onChange={(val) => setSelectedTimeZone(val.target.value)}
          >
            <option name="default" disabled selected></option>
            {timeZones.map((timeZone) => {
              return (
                <option
                  value={timeZone}
                  key={uuid(5)}
                  selected={selectedTimezone == timeZone}
                >
                  {timeZone}
                </option>
              );
            })}
          </select>

          <button
            className="btn btn-primary"
            onClick={() => {
              setClocks([...new Set([...clocks, selectedTimezone])]);
            }}
          >
            Add Clock {tz.length}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {clocks.map((clock) => (
          <Clock key={uuid(5)} timeZone={clock} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
