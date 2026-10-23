"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { buttonStyles } from "@/components/ui/Button";
import { MAIN_NAV, ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import AppLogo from "./AppLogo";

const Header = () => {
  /**VARIABLES */
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**FUNCTIONS */
  const closeMenu = () => setIsMenuOpen(false);

  const linkClasses = (href: string) =>
    cn(
      "rounded-md px-3 py-2 text-sm transition-colors",
      pathname === href
        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
        : "muted hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white",
    );

  /**COMPONENT */
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href={ROUTES.home} onClick={closeMenu}>
          <AppLogo />
        </Link>

        <nav
          aria-label="Main"
          className="ml-auto hidden items-center gap-1 md:flex"
        >
          {MAIN_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClasses(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            href={ROUTES.dashboard}
            className={buttonStyles({
              variant: "ghost",
              size: "sm",
              className: "hidden sm:inline-flex",
            })}
          >
            Dashboard
          </Link>
          <Link href={ROUTES.login} className={buttonStyles({ size: "sm" })}>
            Log in
          </Link>

          {/* Mobile menu toggle: the nav above is hidden below md */}
          <button
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span aria-hidden="true" className="block text-lg leading-none">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-gray-200 px-4 py-2 md:hidden dark:border-gray-800"
        >
          {[...MAIN_NAV, { label: "Dashboard", href: ROUTES.dashboard }].map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn("block", linkClasses(link.href))}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
