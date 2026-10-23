import { createSlice } from "@reduxjs/toolkit";

/**Define initial state */
type UiState = {
  sidebarOpen: boolean;
};

const initialState: UiState = {
  sidebarOpen: false,
};

/**Create slice here */
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = uiSlice.actions;

export default uiSlice.reducer;
