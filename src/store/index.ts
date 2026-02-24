import { configureStore } from "@reduxjs/toolkit";
import timeZoneReducer from "../features/timeZone/timeZoneSlice";
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
    reducer: {
        timeZone: timeZoneReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
