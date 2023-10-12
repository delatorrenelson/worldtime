import React, { useContext, useEffect, useState } from "react";
import { uuid } from "../../utils/uuid";

import { TimeZoneContext } from "../context/TimeZoneContext";
import TimeZoneItem from "./TimeZoneItem";
import { LOCALSTORAGE_CLOCKS } from "../context/LocalStorage";

export default function TimeZoneList() {
  const {availableTimeZones, selectedTimeZones} = useContext(TimeZoneContext);

  const [onFocus, setOnFocus] = useState(false);

  const handleFocus = (e) => setOnFocus(true);

  const search = (e) => {
    console.clear();

    const searchText = e.target.value.toLowerCase();

    if (searchText != null) {
      const filtered = txs.filter((tz) =>
        tz.timezone.toLowerCase().includes(searchText)
      );

      setFilteredTimeZone(filtered);
    } 
  };

  return (
    <div className="drawer-side min-w-min">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <div className="menu p-4 bg-base-100 grid gap-4 grid-flow overflow-y-hidden">
        <div className="grid grid-flow-col  gap-2">
          <input
            type="text"
            className="input w-full max-w-xs outline outline-1 outline-slate-100 bg-inherit z-10"
            onFocus={handleFocus}
            onChange={search}
            placeholder="Search"
          />
        </div>
        <ul className="w-fit overflow-y-auto">

          {availableTimeZones.map((tz) => (
            <TimeZoneItem key={uuid(5)} tz={tz} />
          ))}
        </ul>
      </div>
    </div>
  );
}
