import TimeZoneList from "./components/TimeZoneList";
import Clocks from "./components/Clocks";
import Navbar from "./components/Navbar";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <div className="drawer drawer-end">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <Navbar />
            <Clocks />
          </div>
          <TimeZoneList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
