import Link from "next/link";
import { cn } from "@/lib/utils";

type CardProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Shorthand for a header with just a heading */
  title?: string;
  /** Custom header content (wins over `title`) */
  header?: React.ReactNode;
  footer?: React.ReactNode;
  /** Pass `href` to turn the whole card into a link */
  href?: string;
  padded?: boolean;
};

const Card = ({
  title,
  header,
  footer,
  href,
  padded = true,
  className,
  children,
  ...props
}: CardProps) => {
  /**VARIABLES */
  const classes = cn(
    "block rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900",
    href && "transition hover:border-brand-500 hover:shadow-md",
    className,
  );

  const content = (
    <>
      {(header || title) && (
        <header className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          {header ?? <h2 className="font-semibold">{title}</h2>}
        </header>
      )}

      <div className={padded ? "p-5" : undefined}>{children}</div>

      {footer && (
        <footer className="border-t border-gray-200 px-5 py-4 dark:border-gray-800">
          {footer}
        </footer>
      )}
    </>
  );

  /**COMPONENT */
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <div className={classes} {...props}>
      {content}
    </div>
  );
};

export default Card;
