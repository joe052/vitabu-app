import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { ROUTES } from "@/constants";
import SignupForm from "../_components/SignupForm";

export const metadata: Metadata = {
  title: "Create an account",
};

const SignupPage = () => {
  /**COMPONENT */
  return (
    <Card
      className="w-full max-w-md"
      header={
        <div>
          <h1 className="text-lg font-semibold">Create an account</h1>
          <p className="muted text-sm">It only takes a minute</p>
        </div>
      }
      footer={
        <p className="muted text-xs">
          Already have an account?{" "}
          <Link
            href={ROUTES.login}
            className="font-medium text-brand-600 hover:underline dark:text-brand-200"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </Card>
  );
};

export default SignupPage;
