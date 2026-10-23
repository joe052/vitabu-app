import { cn } from "@/lib/utils";

const SIZES = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };

type SpinnerProps = {
  size?: keyof typeof SIZES;
  className?: string;
};

/** Takes the current text colour, so it works on any background. */
const Spinner = ({ size = "sm", className }: SpinnerProps) => {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
        SIZES[size],
        className,
      )}
    />
  );
};

export default Spinner;
