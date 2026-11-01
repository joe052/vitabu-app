import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { ROUTES } from "@/constants";
import LoginForm from "@/components/auth/LoginForm";
import { safeRedirect } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sign in",
};

const LoginPage = async ({ searchParams }: PageProps<"/login">) => {
  /**VARIABLES */
  /**Set by src/proxy.ts when a signed-out user hits a protected page */
  const { next } = await searchParams;

  /**COMPONENT */
  return (
    <Card
      className="w-full max-w-md"
      header={
        <div>
          <h1 className="text-lg font-semibold">Sign in</h1>
          <p className="muted text-sm">Use your account to continue</p>
        </div>
      }
      footer={
        <p className="muted text-xs">
          No account?{" "}
          <Link
            href={ROUTES.signup}
            className="font-medium text-brand-600 hover:underline dark:text-brand-200"
          >
            Create one
          </Link>
        </p>
      }
    >
      <LoginForm redirectTo={safeRedirect(next, ROUTES.dashboard)} />
    </Card>
  );
};

export default LoginPage;
