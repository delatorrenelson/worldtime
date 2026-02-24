import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment-timezone';

export interface TimeZoneInfo {
    timezone: string;
    showTimeDiff: boolean;
    timeDiff: string | null;
    isActive?: boolean;
}

interface TimeZoneState {
    localTimeZone: string;
    defaultTimeZones: any;
    availableTimeZones: TimeZoneInfo[];
    selectedTimeZones: TimeZoneInfo[]; // Matches the existing logic in App.tsx
    clockSize: string;
}

export const LOCAL_TIMEZONE = moment.tz.guess();
const loadFromLocalStorage = (): TimeZoneInfo[] => {
    try {
        const serializedState = localStorage.getItem('clocks');
        if (serializedState === null || JSON.parse(serializedState).length === 0) {
            return [{ timezone: LOCAL_TIMEZONE, showTimeDiff: false, timeDiff: null, isActive: true }];
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load clocks from localStorage", e);
        return [{ timezone: LOCAL_TIMEZONE, showTimeDiff: false, timeDiff: null, isActive: true }];
    }
};

const savedClocks = loadFromLocalStorage();

const getAllTimeZones = () => moment.tz.names().map((z) => ({
    timezone: z,
    showTimeDiff: false,
    timeDiff: null,
    isActive: savedClocks.some(s => s.timezone === z),
}));

const initialState: TimeZoneState = {
    localTimeZone: LOCAL_TIMEZONE,
    defaultTimeZones: moment.tz(LOCAL_TIMEZONE),
    availableTimeZones: getAllTimeZones(),
    selectedTimeZones: savedClocks,
    clockSize: localStorage.getItem('clockSize') || 'xl',
};

export const timeZoneSlice = createSlice({
    name: 'timeZone',
    initialState,
    reducers: {
        removeTimeZone: (state, action: PayloadAction<TimeZoneInfo>) => {
            state.selectedTimeZones = state.selectedTimeZones.filter(
                (tz) => tz.timezone !== action.payload.timezone
            );
            const tm = state.availableTimeZones.find(
                (tz) => tz.timezone === action.payload.timezone
            );
            if (tm) {
                tm.isActive = false;
            }
        },
        addTimeZone: (state, action: PayloadAction<string>) => {
            const exists = state.selectedTimeZones.find(tz => tz.timezone === action.payload);
            if (!exists) {
                const newTz = { timezone: action.payload, showTimeDiff: false, timeDiff: null, isActive: true };
                state.selectedTimeZones.push(newTz);
                const tm = state.availableTimeZones.find(tz => tz.timezone === action.payload);
                if (tm) tm.isActive = true;
            }
        },
        filterTimeZones: (state, action: PayloadAction<string>) => {
            const searchText = action.payload.toLowerCase().trim();
            const allZones = getAllTimeZones();
            if (searchText === '') {
                state.availableTimeZones = allZones;
            } else {
                state.availableTimeZones = allZones.filter((tz) =>
                    tz.timezone.toLowerCase().includes(searchText)
                );
            }
            // Sync isActive states from current selectedTimeZones
            state.availableTimeZones.forEach(tz => {
                tz.isActive = state.selectedTimeZones.some(s => s.timezone === tz.timezone);
            });
        },
        toggleTimeZone: (state, action: PayloadAction<TimeZoneInfo>) => {
            const tm = state.availableTimeZones.find(tz => tz.timezone === action.payload.timezone);
            if (tm) {
                tm.isActive = !action.payload.isActive;
                if (tm.isActive) {
                    state.selectedTimeZones.push({ ...tm });
                } else {
                    state.selectedTimeZones = state.selectedTimeZones.filter(
                        (tz) => tz.timezone !== action.payload.timezone
                    );
                }
            }
        },
        clearTimeZones: (state) => {
            state.selectedTimeZones = [];
            state.availableTimeZones.forEach(tz => tz.isActive = false);
        },
        setClockSize: (state, action: PayloadAction<string>) => {
            state.clockSize = action.payload;
        }
    },
});

export const {
    clearTimeZones,
    removeTimeZone,
    addTimeZone,
    filterTimeZones,
    toggleTimeZone,
    setClockSize
} = timeZoneSlice.actions;

export default timeZoneSlice.reducer;
