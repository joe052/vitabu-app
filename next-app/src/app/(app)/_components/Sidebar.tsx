"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "@/components/shared/AppLogo";
import { APP_NAV, ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSidebarOpen } from "@/store/selectors";
import { closeSidebar } from "@/store/slices/uiSlice";

const Sidebar = () => {
  /**VARIABLES */
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectSidebarOpen);

  /**FUNCTIONS */
  const close = () => dispatch(closeSidebar());

  /**COMPONENT */
  return (
    <>
      {/* Backdrop behind the sidebar on small screens */}
      {isOpen && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={close}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 -translate-x-full border-r border-gray-200 bg-gray-50 transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 dark:border-gray-800 dark:bg-gray-900",
          isOpen && "translate-x-0",
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-200 px-4 dark:border-gray-800">
          <Link href={ROUTES.home} onClick={close}>
            <AppLogo />
          </Link>
        </div>

        <nav aria-label="App" className="flex flex-col gap-1 p-3">
          {APP_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-gray-200/70 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
                  : "muted hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
