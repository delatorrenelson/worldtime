export const LOCALSTORAGE_CLOCKS = "clocks";

// ensure there is 'clock' in windows.localstorage
const clocks = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_CLOCKS))
if (!clocks) {
  window.localStorage.setItem(LOCALSTORAGE_CLOCKS, JSON.stringify([]));
}

/**
 *
 * @returns Array of Object
 */
export const getSelectedClocks = () => {
  return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_CLOCKS));
};

export const selectClock = (clock = {}) => {
  const clocksFromLocalStorage = getSelectedClocks() || [];

  clocksFromLocalStorage.push(clock);
    const l = clocksFromLocalStorage.filter((v,i,a)=>a.findIndex(v2=>(JSON.stringify(v2) === JSON.stringify(v)))===i)


  window.localStorage.setItem(
    LOCALSTORAGE_CLOCKS,
    JSON.stringify(l)
  );
};

export const removeClock = (clock = {}) => {
  const clocksFromLocalStorage = getSelectedClocks() || [];

  window.localStorage.setItem(
    LOCALSTORAGE_CLOCKS,
    JSON.stringify(
      clocksFromLocalStorage.filter((clck) => clck.timezone != clock.timezone)
    )
  );
};
