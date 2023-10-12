import { createContext, useEffect } from "react";
import moment from 'moment';
import 'moment-timezone';
import { LOCALSTORAGE_CLOCKS } from "./LocalStorage";

export const LOCAL_TIMEZONE = moment.tz.guess();

const timezones = moment.tz.names().map((z) => {
  return {
    timezone: z,
    showTimeDiff: false,
    timeDiff: null,
  };
});

export const TimeZoneContext = createContext({
  localTimeZone: LOCAL_TIMEZONE,
  availableTimeZones: timezones,
  selectedTimeZones: [],
});


