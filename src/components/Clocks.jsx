import React, { useContext } from "react";
import Clock from "./Clock";
import {  TimeZoneContext } from "../context/TimeZoneContext";
import { uuid } from "../../utils/uuid";
import { getSelectedClocks } from "../context/LocalStorage";

export default function Clocks() {
  const txs = useContext(TimeZoneContext);
  txs.selectedTimeZones = getSelectedClocks()
  const {selectedTimeZones} = useContext(TimeZoneContext);

  
  return (
    <div className="flex flex-wrap justify-center gap-12 py-6">
      {selectedTimeZones.map((clck) => (
        <Clock key={uuid(5)} clock={clck} />
      ))}
    </div>
  );
}
