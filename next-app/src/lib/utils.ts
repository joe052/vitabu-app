import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Join class names and let later Tailwind classes override earlier ones. */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/** Format an ISO date string, e.g. "Sep 28, 2026". */
export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(value),
  );

/** Pull a readable message out of an RTK Query error (an `ApiError` from lib/services/api). */
export const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
) => {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return fallback;
};
