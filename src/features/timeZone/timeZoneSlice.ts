import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment-timezone';

export interface TimeZoneInfo {
    timezone: string;
    showTimeDiff: boolean;
    timeDiff: string | null;
    isActive?: boolean;
    displayType?: 'analog' | 'digital';
    template?: string;
}

interface TimeZoneState {
    localTimeZone: string;
    defaultTimeZones: any;
    availableTimeZones: TimeZoneInfo[];
    selectedTimeZones: TimeZoneInfo[]; // Matches the existing logic in App.tsx
    clockSize: string;
    globalDisplayType: 'analog' | 'digital';
    globalAnalogTemplate: string;
    globalDigitalTemplate: string;
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
    globalDisplayType: (localStorage.getItem('globalDisplayType') as 'analog' | 'digital') || 'analog',
    globalAnalogTemplate: localStorage.getItem('globalAnalogTemplate') || 'classic',
    globalDigitalTemplate: localStorage.getItem('globalDigitalTemplate') || 'digital-led',
};

const saveClocksToStorage = (clocks: TimeZoneInfo[]) => {
    try {
        localStorage.setItem('clocks', JSON.stringify(clocks));
    } catch (e) {
        console.warn("Failed to save clocks to localStorage", e);
    }
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
            saveClocksToStorage(state.selectedTimeZones);
        },
        addTimeZone: (state, action: PayloadAction<string>) => {
            const exists = state.selectedTimeZones.find(tz => tz.timezone === action.payload);
            if (!exists) {
                const newTz: TimeZoneInfo = { 
                    timezone: action.payload, 
                    showTimeDiff: false, 
                    timeDiff: null, 
                    isActive: true,
                    displayType: state.globalDisplayType,
                    template: state.globalDisplayType === 'digital' ? state.globalDigitalTemplate : state.globalAnalogTemplate
                };
                state.selectedTimeZones.push(newTz);
                const tm = state.availableTimeZones.find(tz => tz.timezone === action.payload);
                if (tm) tm.isActive = true;
                saveClocksToStorage(state.selectedTimeZones);
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
                    state.selectedTimeZones.push({ 
                        ...tm,
                        displayType: state.globalDisplayType,
                        template: state.globalDisplayType === 'digital' ? state.globalDigitalTemplate : state.globalAnalogTemplate
                    });
                } else {
                    state.selectedTimeZones = state.selectedTimeZones.filter(
                        (tz) => tz.timezone !== action.payload.timezone
                    );
                }
                saveClocksToStorage(state.selectedTimeZones);
            }
        },
        clearTimeZones: (state) => {
            state.selectedTimeZones = [];
            state.availableTimeZones.forEach(tz => tz.isActive = false);
            saveClocksToStorage(state.selectedTimeZones);
        },
        setClockSize: (state, action: PayloadAction<string>) => {
            state.clockSize = action.payload;
            localStorage.setItem('clockSize', action.payload);
        },
        setGlobalDisplayType: (state, action: PayloadAction<'analog' | 'digital'>) => {
            state.globalDisplayType = action.payload;
            localStorage.setItem('globalDisplayType', action.payload);
            // Apply to all clocks that don't have an explicit override or apply globally
            state.selectedTimeZones.forEach(clock => {
                clock.displayType = action.payload;
            });
            saveClocksToStorage(state.selectedTimeZones);
        },
        setGlobalAnalogTemplate: (state, action: PayloadAction<string>) => {
            state.globalAnalogTemplate = action.payload;
            localStorage.setItem('globalAnalogTemplate', action.payload);
            state.selectedTimeZones.forEach(clock => {
                if (!clock.displayType || clock.displayType === 'analog') {
                    clock.template = action.payload;
                }
            });
            saveClocksToStorage(state.selectedTimeZones);
        },
        setGlobalDigitalTemplate: (state, action: PayloadAction<string>) => {
            state.globalDigitalTemplate = action.payload;
            localStorage.setItem('globalDigitalTemplate', action.payload);
            state.selectedTimeZones.forEach(clock => {
                if (clock.displayType === 'digital') {
                    clock.template = action.payload;
                }
            });
            saveClocksToStorage(state.selectedTimeZones);
        },
        setClockDisplayType: (state, action: PayloadAction<{ index: number; displayType: 'analog' | 'digital' }>) => {
            const { index, displayType } = action.payload;
            if (state.selectedTimeZones[index]) {
                state.selectedTimeZones[index].displayType = displayType;
                if (!state.selectedTimeZones[index].template) {
                    state.selectedTimeZones[index].template = displayType === 'digital' ? state.globalDigitalTemplate : state.globalAnalogTemplate;
                }
                saveClocksToStorage(state.selectedTimeZones);
            }
        },
        setClockTemplate: (state, action: PayloadAction<{ index: number; template: string }>) => {
            const { index, template } = action.payload;
            if (state.selectedTimeZones[index]) {
                state.selectedTimeZones[index].template = template;
                saveClocksToStorage(state.selectedTimeZones);
            }
        },
        reorderTimeZones: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
            const { sourceIndex, destinationIndex } = action.payload;
            if (
                sourceIndex < 0 ||
                sourceIndex >= state.selectedTimeZones.length ||
                destinationIndex < 0 ||
                destinationIndex >= state.selectedTimeZones.length ||
                sourceIndex === destinationIndex
            ) {
                return;
            }
            const [movedItem] = state.selectedTimeZones.splice(sourceIndex, 1);
            state.selectedTimeZones.splice(destinationIndex, 0, movedItem);
            saveClocksToStorage(state.selectedTimeZones);
        }
    },
});

export const {
    clearTimeZones,
    removeTimeZone,
    addTimeZone,
    filterTimeZones,
    toggleTimeZone,
    setClockSize,
    reorderTimeZones,
    setGlobalDisplayType,
    setGlobalAnalogTemplate,
    setGlobalDigitalTemplate,
    setClockDisplayType,
    setClockTemplate,
} = timeZoneSlice.actions;

export default timeZoneSlice.reducer;
