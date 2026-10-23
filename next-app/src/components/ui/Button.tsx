import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

/**
 * The single place button styling lives. Add a variant here rather than
 * pasting Tailwind class strings into a page.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white shadow-sm hover:bg-brand-700",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
  danger: "bg-red-600 text-white shadow-sm hover:bg-red-700",
  ghost:
    "border border-gray-300 bg-transparent text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-lg",
};

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
};

/** Button classes on their own, so links can look like buttons: `<Link className={buttonStyles()} />` */
export const buttonStyles = ({
  variant = "primary",
  size = "md",
  block = false,
  className,
}: ButtonStyleOptions = {}) =>
  cn(
    "inline-flex items-center justify-center rounded-lg font-semibold transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    block && "w-full",
    className,
  );

type ButtonProps = React.ComponentProps<"button"> &
  Omit<ButtonStyleOptions, "className"> & {
    loading?: boolean;
  };

const Button = ({
  variant,
  size,
  block,
  loading = false,
  type = "button",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  /**COMPONENT */
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, block, className })}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
