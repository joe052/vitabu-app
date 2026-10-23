import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import uiReducer from "./slices/uiSlice";

/**
 * Configure store.
 * Next.js also renders client components on the server, so a new store is
 * created per request (see providers/Providers.tsx) instead of a module-level singleton.
 */
export const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
