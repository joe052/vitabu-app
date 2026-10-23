import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { ROUTES } from "@/constants";
import LoginForm from "../_components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
};

const LoginPage = () => {
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
        <div className="muted space-y-1 text-xs">
          <p>
            Demo credentials: <code>demo@example.com</code> /{" "}
            <code>password</code>
          </p>
          <p>
            No account?{" "}
            <Link
              href={ROUTES.signup}
              className="font-medium text-brand-600 hover:underline dark:text-brand-200"
            >
              Create one
            </Link>
          </p>
        </div>
      }
    >
      <LoginForm />
    </Card>
  );
};

export default LoginPage;
