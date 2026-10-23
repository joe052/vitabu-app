import type { RootState } from "./store";

/**Selectors for the UI store */
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
