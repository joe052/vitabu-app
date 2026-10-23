import Link from "next/link";
import AppLogo from "@/components/shared/AppLogo";
import { ROUTES } from "@/constants";

/** Shared layout for ONLY login and signup: logo, the page's card, and a way back. */
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <Link href={ROUTES.home}>
        <AppLogo size="lg" />
      </Link>

      {children}

      <Link href={ROUTES.home} className="muted text-sm hover:underline">
        Back to the site
      </Link>
    </main>
  );
};

export default AuthLayout;
