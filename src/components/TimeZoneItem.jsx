import React, { useContext,  useState } from "react";
import {  TimeZoneContext } from "../context/TimeZoneContext";
import { getSelectedClocks, removeClock, selectClock } from "../context/LocalStorage";

export default function TimeZoneItem({ tz }) {
  const { setSelectedTimeZones } = useContext(TimeZoneContext);
  const { timezone } = tz;

  const [isSelected, setIsSelected] = useState(getSelectedClocks().find(el => el.timezone == tz.timezone));

  const handleClick = (e) => {
    if (e.target.checked) {
      selectClock(tz)
    } else {
      removeClock(tz)
    }
    setIsSelected(!isSelected)
    setSelectedTimeZones(getSelectedClocks());
  };


  return (
    <li
      className="flex flex-row"
    >
      <input
        id={timezone}
        name={timezone}
        type="checkbox"
        value={timezone}
        onChange={handleClick}
        checked={isSelected}
      />
      <label htmlFor={timezone} className="flex-grow">
        {timezone}
      </label>
    </li>
  );
}
