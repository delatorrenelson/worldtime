import React, { useContext, useEffect, useRef, useState } from "react";
import Clock from "./Clock";
import { TimeZoneContext } from "../context/TimeZoneContext";
import { uuid } from "../../utils/uuid";

export default function Clocks() {
  const ctx = useContext(TimeZoneContext);

  const sctx = ctx.filter((t) => t.isSelected);
  const [selectedClocks, setSelectedClocks] = useState([]);

  

  useEffect(() => {
    let ts = false
    const items = JSON.parse(window.localStorage.getItem("clocks"));
    if (items) {
      setSelectedClocks(items);
    }

    return () => {ts = true}
  }, [sctx.length]);

  return (
    <div className="flex flex-wrap justify-center gap-12 py-6">
      {selectedClocks.map((clck) => (
        <Clock key={uuid(5)} clock={clck} />
      ))}
    </div>
  );
}
