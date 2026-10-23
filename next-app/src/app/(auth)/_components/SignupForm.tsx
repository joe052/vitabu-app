"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ROUTES } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { useSignupMutation } from "@/store/api/authApi";

const SignupForm = () => {
  /**VARIABLES */
  const router = useRouter();
  const [signup, { isLoading, error }] = useSignupMutation();

  /**FUNCTIONS */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const result = await signup({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
    });

    if (!result.error) router.push(ROUTES.dashboard);
  };

  /**COMPONENT */
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        id="signup-name"
        name="name"
        label="Name"
        autoComplete="name"
        required
      />
      <Input
        id="signup-email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
      />
      <Input
        id="signup-password"
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters"
        minLength={8}
        required
      />

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {getErrorMessage(error)}
        </p>
      )}

      <Button type="submit" block loading={isLoading}>
        Create account
      </Button>
    </form>
  );
};

export default SignupForm;
