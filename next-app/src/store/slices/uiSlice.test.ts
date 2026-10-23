import { describe, expect, it } from "vitest";
import { makeStore } from "@/store/store";
import { selectSidebarOpen } from "@/store/selectors";
import { closeSidebar, toggleSidebar } from "./uiSlice";

describe("uiSlice", () => {
  it("toggles and closes the sidebar", () => {
    const store = makeStore();
    expect(selectSidebarOpen(store.getState())).toBe(false);

    store.dispatch(toggleSidebar());
    expect(selectSidebarOpen(store.getState())).toBe(true);

    store.dispatch(closeSidebar());
    expect(selectSidebarOpen(store.getState())).toBe(false);
  });
});
