"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import StateLoading from "@/components/ui/StateLoading";
import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

/**
 * Shows its children only to signed-in users and sends everyone else to the login page.
 * This only protects the UI. Your backend must still check auth on every request.
 */
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  /**VARIABLES */
  const router = useRouter();
  const { user, isError } = useAuth();

  useEffect(() => {
    if (isError) router.replace(ROUTES.login);
  }, [isError, router]);

  /**COMPONENT */
  if (!user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <StateLoading label="Checking your session..." />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
