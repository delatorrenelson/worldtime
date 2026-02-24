import { TimeZoneInfo, toggleTimeZone } from "../features/timeZone/timeZoneSlice";
import { useAppDispatch } from "../store/hooks";

function TimeZoneItem({ tz }: { tz: TimeZoneInfo }) {
  const dispatch = useAppDispatch()
  const { timezone, isActive } = tz;

  const handleClick = () => {
    dispatch(toggleTimeZone(tz))
  }

  return (
    <li className="flex flex-row items-center gap-4 p-2 cursor-pointer">
      <label htmlFor={timezone} className="flex-grow">
        <input
          id={timezone}
          className="checkbox checkbox-md"
          name={'timezone'}
          type="checkbox"
          value={timezone}
          onChange={handleClick}
          checked={isActive}
        />
        <span className="label-text">{timezone}</span>
      </label>
    </li>
  );
}

export default TimeZoneItem;