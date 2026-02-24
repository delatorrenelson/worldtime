import React, { } from "react";
import { useAppDispatch } from "../store/hooks";
import SearchInput from "./SearchInput";
import TimeZones from "./TimeZones";
import { filterTimeZones } from "../features/timeZone/timeZoneSlice";

export default function TimeZoneList() {
  const dispatch = useAppDispatch()

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const searchText = e.target.value.toLowerCase().trim();
    dispatch(filterTimeZones(searchText))
  };

  const handleShowSelectedTimeZonesOnly = () => {
    // showSelectedTimeZonesOnly ? setFilteredTimeZones(availableTimeZones) : setFilteredTimeZones(selectedTimeZones)
    // setShowSelectedTimeZonesOnly(!showSelectedTimeZonesOnly)
  }

  const handleShowTimeDifference = () => {
    // setShowTimeDefference(!showTimeDifference)
  }

  return (
    <div className="drawer-side min-w-min">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <div className="menu p-4 bg-base-100 flex gap-4 overflow-y-hidden">
        <div className="grid grid-flow-col  gap-2">
          <SearchInput onSearch={onSearch} />
        </div>
        <div className="hidden flex-row gap-4">
          <div className="flex flex-row gap-2 place-content-end text-xs">
            <input id="selectedTimeZonesOnly" type="checkbox" onChange={() => handleShowSelectedTimeZonesOnly()} />
            <label htmlFor="selectedTimeZonesOnly">Show selected timezones only</label>
          </div>
          <div className="flex flex-row gap-2 place-content-end text-xs">
            <input id="timeDiff" type="checkbox" onChange={() => handleShowTimeDifference()} />
            <label htmlFor="timeDiff">Show time difference</label>
          </div>
        </div>
        <TimeZones />
      </div>
    </div>
  );
}
