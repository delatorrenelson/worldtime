import { createContext } from "react";
import moment from 'moment-timezone';

export const LOCAL_TIMEZONE = moment.tz.guess();

const timezones = moment.tz.names().map((z) => {
  return {
    timezone: z,
    showTimeDiff: false,
    timeDiff: null,
  };
});

export const TimeZoneContext = createContext({
  localTimeZone: moment.tz.guess(),
  availableTimeZones: timezones,
  selectedTimeZones: [],
});