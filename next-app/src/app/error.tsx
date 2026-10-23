"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import AppLogo from "@/components/shared/AppLogo";
import Button, { buttonStyles } from "@/components/ui/Button";
import { ROUTES } from "@/constants";

type ErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

/** Shown when a page throws while rendering. Add an error.tsx to any route folder to handle errors closer to the source. */
const ErrorPage = ({ error, retry }: ErrorProps) => {
  /**VARIABLES */
  useEffect(() => {
    // Send this to your error reporting service (Sentry, etc.)
    console.error(error);
  }, [error]);

  /**COMPONENT */
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <AppLogo size="lg" withWordmark={false} />
      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="muted">
        An unexpected error stopped this page from loading.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Button onClick={() => retry()}>Try again</Button>
        <Link href={ROUTES.home} className={buttonStyles({ variant: "ghost" })}>
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default ErrorPage;
