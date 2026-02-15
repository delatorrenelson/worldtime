import React, { useContext, useState } from "react";
import { uuid } from "../utils/uuid";
import { TimeZoneContext } from "../context/TimeZoneContext";
import TimeZoneItem from "./TimeZoneItem";
import { useAppSelector } from "../store/hooks";
import SearchInput from "./SearchInput";

export default function TimeZoneList() {
  const { availableTimeZones, selectedTimeZones } = useContext(TimeZoneContext);
  const [filteredTimeZones, setFilteredTimeZones] = useState(availableTimeZones);

  const [showSelectedTimeZonesOnly, setShowSelectedTimeZonesOnly] = useState(false)
  const [showTimeDifference, setShowTimeDefference] = useState(false)

  const timeZoneStore = useAppSelector((state) => state.timeZone);
  console.log(timeZoneStore)


  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase().trim();

    if (searchText != '') {
      const filtered = availableTimeZones.filter((tz) =>
        tz.timezone.toLowerCase().includes(searchText)
      );
      setFilteredTimeZones(filtered);
    }
  };

  const handleShowSelectedTimeZonesOnly = () => {
    showSelectedTimeZonesOnly ? setFilteredTimeZones(availableTimeZones) : setFilteredTimeZones(selectedTimeZones)
    setShowSelectedTimeZonesOnly(!showSelectedTimeZonesOnly)
  }

  const handleShowTimeDifference = () => {
    setShowTimeDefference(!showTimeDifference)
  }

  return (
    <div className="drawer-side min-w-min">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <div className="menu p-4 bg-base-100 flex gap-4 overflow-y-hidden">
        <div className="grid grid-flow-col  gap-2">
          <SearchInput onSearch={onSearch} />
        </div>
        <div className="flex flex-row gap-4 hidden">
          <div className="flex flex-row gap-2 place-content-end text-xs">
            <input id="selectedTimeZonesOnly" type="checkbox" onChange={() => handleShowSelectedTimeZonesOnly()} />
            <label htmlFor="selectedTimeZonesOnly">Show selected timezones only</label>
          </div>
          <div className="flex flex-row gap-2 place-content-end text-xs">
            <input id="timeDiff" type="checkbox" onChange={() => handleShowTimeDifference()} />
            <label htmlFor="timeDiff">Show time difference</label>
          </div>
        </div>
        <ul className="w-[100%] h-[100%] flex-1 overflow-y-auto">
          {filteredTimeZones.map((tz) => (
            <TimeZoneItem key={uuid(5)} tz={tz} />
          ))}
        </ul>
      </div>
    </div>
  );
}
