import { uuid } from "../utils/uuid";
import TimeZoneItem from "./TimeZoneItem";
import { useAppSelector } from "../store/hooks";
import { memo } from "react";

function TimeZones() {
    const timezones = useAppSelector((state) => state.timeZone.availableTimeZones)
    return (<ul className="w-[100%] h-[100%] flex-1 overflow-y-auto list">
        {timezones.map((tz, index) => (
            <TimeZoneItem key={index} tz={tz} />
        ))}
    </ul>)
}

export default memo(TimeZones)