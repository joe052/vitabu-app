"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";

/**
 * Every client-side provider (Redux, theme, toasts...) goes here,
 * so the root layout can stay a Server Component.
 */
const Providers = ({ children }: { children: React.ReactNode }) => {
  /**VARIABLES */
  // The initializer runs once, so each browser tab (and each server request) gets its own store.
  const [store] = useState(makeStore);

  /**COMPONENT */
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
