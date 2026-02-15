import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment-timezone';

export interface TimeZoneInfo {
    timezone: string;
    showTimeDiff: boolean;
    timeDiff: string | null;
}

interface TimeZoneState {
    localTimeZone: string;
    availableTimeZones: TimeZoneInfo[];
    selectedTimeZones: any[]; // Matches the existing logic in App.tsx
}

const LOCAL_TIMEZONE = moment.tz.guess();

const initialAvailableTimeZones = moment.tz.names().map((z) => ({
    timezone: z,
    showTimeDiff: false,
    timeDiff: null,
}));

const initialState: TimeZoneState = {
    localTimeZone: LOCAL_TIMEZONE,
    availableTimeZones: initialAvailableTimeZones,
    selectedTimeZones: [],
};

export const timeZoneSlice = createSlice({
    name: 'timeZone',
    initialState,
    reducers: {
        selectTimeZone: (state, action: PayloadAction<any[]>) => {
            state.selectedTimeZones = action.payload;
        },
        showTimeDiff: (state, action: PayloadAction<boolean>) => {
            state.showTimeDiff = action.payload;
        },
        removeTimeZone: (state, action: PayloadAction<string>) => {
            state.selectedTimeZones = state.selectedTimeZones.filter((tz) => tz.timezone !== action.payload);
        },
        addTimeZone: (state, action: PayloadAction<string>) => {
            state.selectedTimeZones.push({ timezone: action.payload, showTimeDiff: false, timeDiff: null });
        },
    },
});

export const { selectTimeZone, showTimeDiff,
    removeTimeZone, addTimeZone } = timeZoneSlice.actions;

export default timeZoneSlice.reducer;
