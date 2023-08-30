import React, { useContext, useState } from "react";
import { uuid } from "../../utils/uuid";
import { TimeZoneContext } from "../context/TimeZoneContext";

export default function ListItem({ tz }) {
  const { isSelected, timezone } = tz;

  const tzs = useContext(TimeZoneContext);

  const handleClick = (e) => {
    // tz.isSelected = e.target.checked;

    // tz = {...tz, isSelected: !tz.isSelected}

    tzs.forEach((element) => {
      if (element.timezone == timezone) {
        element.isSelected = e.target.checked;
      }
    });

    const filtered = tzs.filter((t) => t.isSelected);

    window.localStorage.setItem("clocks", JSON.stringify(filtered));
  };

  return (
    <li
      // className={tz.isSelected ? "bg-primary" : "bg-success"}
      className="flex flex-row"
    >
      <input
        id={timezone}
        name={timezone}
        type="checkbox"
        value={timezone}
        onChange={handleClick}
        // checked={isSelected}
      />
      <label htmlFor={timezone} className="flex-grow">
        {timezone}
      </label>
    </li>
  );
}
