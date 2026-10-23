import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  hint?: string;
  error?: string;
};

/** Text input with a label, hint and error message. `id` defaults to `name`. */
const Input = ({ label, hint, error, id, className, ...props }: InputProps) => {
  /**VARIABLES */
  const inputId = id ?? props.name;
  const errorId = `${inputId}-error`;

  /**COMPONENT */
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "w-full rounded-lg border bg-white p-2.5 text-sm transition-colors disabled:opacity-50 dark:bg-gray-950",
          error
            ? "border-red-500"
            : "border-gray-300 hover:border-gray-400 dark:border-gray-700",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : (
        hint && <p className="muted mt-1 text-sm">{hint}</p>
      )}
    </div>
  );
};

export default Input;
