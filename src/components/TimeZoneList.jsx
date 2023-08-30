import React, { useContext, useEffect, useState } from "react";
import { uuid } from "../../utils/uuid";

import { TimeZoneContext } from "../context/TimeZoneContext";
import ListItem from "./ListItem";

export default function TimeZoneList() {
  const tzs = useContext(TimeZoneContext);
  const [onFocus, setOnFocus] = useState(false);

  const [filteredTimeZone, setFilteredTimeZone] = useState(tzs);

  const handleFocus = (e) => setOnFocus(true);

  const search = (e) => {
    console.clear();

    const searchText = e.target.value.toLowerCase();

    if (searchText != null) {
      const filtered = tzs.filter((tz) =>
        tz.timezone.toLowerCase().includes(searchText)
      );

      setFilteredTimeZone(filtered);
    } else {
      setFilteredTimeZone(tzs);
    }
  };

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

      <div className="menu p-4 bg-base-100 grid gap-4 grid-flow overflow-y-hidden">
        <input
          type="text"
          className="input w-full max-w-xs outline outline-1 outline-slate-100 bg-inherit z-10"
          onFocus={handleFocus}
          onChange={search}
          placeholder="Search"
        />
        <ul className="w-fit overflow-y-auto">
          {tzs.map((tz) => (
            <ListItem key={uuid(5)} tz={tz} />
          ))}
        </ul>
      </div>
    </div>
  );
}
