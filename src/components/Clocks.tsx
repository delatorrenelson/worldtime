import { memo } from "react";
import Clock from "./Clock";
import { useAppSelector } from "../store/hooks";

function Clocks() {
  const selectedTimeZones = useAppSelector((state) => state.timeZone.selectedTimeZones)
  return (
    <div className="flex flex-wrap justify-center gap-12 py-6">
      {selectedTimeZones.map((clock, index) => (
        <Clock key={index} clock={clock} />
      ))}
    </div>
  );
}

export default Clocks