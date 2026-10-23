"use client";

import Button from "./Button";

type StateErrorProps = {
  title?: string;
  message: string;
  /** Pass a loader to offer a retry; omit it for a terminal error */
  onRetry?: () => void;
};

const StateError = ({
  title = "That did not work",
  message,
  onRetry,
}: StateErrorProps) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 py-12 text-center dark:border-red-900/50 dark:bg-red-950/30"
    >
      <p className="font-medium text-red-700 dark:text-red-300">{title}</p>
      <p className="max-w-md text-sm text-red-700/80 dark:text-red-300/80">
        {message}
      </p>
      {onRetry && (
        <Button variant="ghost" size="sm" onClick={() => onRetry()}>
          Try again
        </Button>
      )}
    </div>
  );
};

export default StateError;
