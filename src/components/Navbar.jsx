import React, { useContext } from "react";
import { TimeZoneContext } from "../context/TimeZoneContext";

export default function Navbar() {
  const {localTimeZone} = useContext(TimeZoneContext)
  console.log(localTimeZone)
  return (
    <div className="w-full navbar bg-base-300">
    <div className="flex-1 px-2 mx-2">Your local Time: {localTimeZone}</div>

    <div className="flex-none hidde lg:block">
      <div className="flex-none lg:hide">
        <label
          htmlFor="my-drawer-3"
          className="btn btn-square btn-ghost btn-circle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

        </label>
      </div>
    </div>
  </div>
  );
}
