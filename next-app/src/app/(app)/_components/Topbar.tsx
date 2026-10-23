"use client";

import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/uiSlice";

const Topbar = () => {
  /**VARIABLES */
  const dispatch = useAppDispatch();
  const { user, logout, isLoggingOut } = useAuth();

  /**COMPONENT */
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white/90 px-4 backdrop-blur sm:px-6 dark:border-gray-800 dark:bg-gray-950/90">
      {/* Mobile menu toggle: the sidebar is hidden below md */}
      <button
        className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
        aria-label="Toggle navigation"
        onClick={() => dispatch(toggleSidebar())}
      >
        <span aria-hidden="true" className="block text-lg leading-none">
          ☰
        </span>
      </button>

      <div className="ml-auto flex items-center gap-3">
        <span className="muted hidden text-sm sm:inline">{user?.email}</span>
        <Button
          variant="secondary"
          size="sm"
          onClick={logout}
          loading={isLoggingOut}
        >
          Log out
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
