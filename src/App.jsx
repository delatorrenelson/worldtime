import { useContext, useEffect, useState } from "react";
import TimeZoneList from "./components/TimeZoneList";
import { TimeZoneContext } from "./context/TimeZoneContext";
import Clocks from "./components/Clocks";
import { getSelectedClocks } from "./context/LocalStorage";

import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const { availableTimeZones, localTimeZone } = useContext(TimeZoneContext);
  const [selectedTimeZones, setSelectedTimeZones] = useState([])



  useEffect(() => {
    setSelectedTimeZones(getSelectedClocks());
  }, [])

  return (
    <TimeZoneContext.Provider value={{ selectedTimeZones, setSelectedTimeZones, availableTimeZones, localTimeZone }}>
      <div className="App">
        <div className="drawer drawer-end">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* <!-- Navbar --> */}
            <Navbar/>
            {/* <!-- Page content here --> */}

            <Clocks />
          </div>

          {/* SIDE BAR HERE */}
          <TimeZoneList />
        </div>
      </div>
    </TimeZoneContext.Provider>

  );
}

export default App;
