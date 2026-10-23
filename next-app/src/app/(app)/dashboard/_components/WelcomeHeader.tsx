"use client";

import { useAuth } from "@/hooks/useAuth";

const WelcomeHeader = () => {
  /**VARIABLES */
  const { user } = useAuth();

  /**COMPONENT */
  return (
    <header>
      <h1 className="text-2xl font-semibold tracking-tight">
        Welcome back, {user?.name ?? "friend"}
      </h1>
      <p className="muted mt-1 text-sm">Signed in as {user?.email}</p>
    </header>
  );
};

export default WelcomeHeader;
