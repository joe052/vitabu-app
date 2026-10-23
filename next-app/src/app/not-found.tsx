import Link from "next/link";
import AppLogo from "@/components/shared/AppLogo";
import { buttonStyles } from "@/components/ui/Button";
import { ROUTES } from "@/constants";

const NotFound = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <AppLogo size="lg" withWordmark={false} />
      <p className="text-6xl font-semibold tracking-tight">404</p>
      <p className="muted">This page does not exist.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Link href={ROUTES.home} className={buttonStyles()}>
          Back to home
        </Link>
        <Link
          href={ROUTES.contact}
          className={buttonStyles({ variant: "ghost" })}
        >
          Report a broken link
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
