import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addTimeZone, clearTimeZones, removeTimeZone, toggleTimeZone, setClockSize } from '../features/timeZone/timeZoneSlice';
import type { RootState } from './index';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(
        addTimeZone,
        removeTimeZone,
        toggleTimeZone,
        clearTimeZones,
        setClockSize,
    ),
    effect: (_action, listenerApi) => {
        const state = listenerApi.getState() as RootState;
        // Persist the selectedTimeZones to localStorage whenever they change
        localStorage.setItem('clocks', JSON.stringify(state.timeZone.selectedTimeZones));
        localStorage.setItem('clockSize', state.timeZone.clockSize);
    },
});