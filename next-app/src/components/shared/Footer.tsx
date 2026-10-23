import Link from "next/link";
import { ROUTES, SITE } from "@/constants";
import AppLogo from "./AppLogo";

const FOOTER_LINKS = [
  { label: "About", href: ROUTES.about },
  { label: "Contact", href: ROUTES.contact },
];

const Footer = () => {
  /**COMPONENT */
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <div className="muted flex items-center gap-2">
          <AppLogo size="sm" withWordmark={false} />
          <span>
            © {new Date().getFullYear()} {SITE.owner}
          </span>
        </div>

        <nav aria-label="Footer" className="muted flex gap-4">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-gray-900 hover:underline dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
