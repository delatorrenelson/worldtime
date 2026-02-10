import { useContext, useEffect, useState } from "react";
import TimeZoneList from "./components/TimeZoneList";
import { TimeZoneContext } from "./context/TimeZoneContext";
import Clocks from "./components/Clocks";
import { getSelectedClocks } from "./context/LocalStorage";
import Navbar from "./components/Navbar";
import "./App.css";
import Sampling from "../utils/discrete";


function getRandomIntInclusivePareto(min, max, alpha = 1.0) {
  var probabilities = []; // probabilities 
  for (var k = min; k <= max; ++k) {
      probabilities.push(1.0/Math.pow(k, alpha)); // computed according to Paretto
  }                                               // would be normalized by SJS
  
  var disc = Sampling.Discrete(probabilities); // discrete sampler, returns value in the [0...probabilities.length-1] range
  return disc.draw() + min; // back to [min...max] interval 
}

function App() {
  const { availableTimeZones, localTimeZone } = useContext(TimeZoneContext);
  const [selectedTimeZones, setSelectedTimeZones] = useState([])

  const generatePareto = () => {
    console.log("Testing Paretto");
    const loop = [1,2,3,4,5,6];
    for (let index = 0; index < loop.length; index++) {
      console.log('Pareto: ', getRandomIntInclusivePareto(1, 49, 1.3))
    }    
  }

  useEffect(() => {
    setSelectedTimeZones(getSelectedClocks());
  }, [])

  return (
    <TimeZoneContext.Provider value={{ selectedTimeZones, setSelectedTimeZones, availableTimeZones, localTimeZone }}>
      <div className="App">
        <div className="drawer drawer-end">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">            
            <Navbar/>            
            <button onClick={() => generatePareto()}>Generate Pareto</button>
            <Clocks />
          </div>
          <TimeZoneList />
        </div>
      </div>
    </TimeZoneContext.Provider>

  );
}

export default App;
