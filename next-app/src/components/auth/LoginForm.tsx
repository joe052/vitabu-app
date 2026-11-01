"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ROUTES } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { useLoginMutation } from "@/store/api/authApi";
import type { LoginRequest } from "@/types";

/**Only check the shape here - Supabase decides whether the password is right */
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type LoginFormProps = {
  /** Where to go after signing in, e.g. the protected page that sent the user here */
  redirectTo?: string;
};

/** Email + password sign in through Supabase (see lib/services/auth). Rendered inside the login page's card. */
const LoginForm = ({ redirectTo = ROUTES.dashboard }: LoginFormProps) => {
  /**VARIABLES */
  const router = useRouter();
  const [login, { error }] = useLoginMutation();

  /**FUNCTIONS */
  const formik = useFormik<LoginRequest>({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      const result = await login({ email: email.trim(), password });
      if (result.error) return;

      toast.success(`Welcome back, ${result.data.name}!`);
      // router.push(redirectTo);
      router.push("/books")
    },
  });

  /**Show a field's error only once the user has left it (or tried to submit) */
  const fieldError = (field: keyof LoginRequest) =>
    formik.touched[field] ? formik.errors[field] : undefined;

  /**COMPONENT */
  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      <Input
        id="login-email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={fieldError("email")}
        {...formik.getFieldProps("email")}
      />

      <div>
        <Input
          id="login-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          error={fieldError("password")}
          {...formik.getFieldProps("password")}
        />
        <div className="mt-2 flex justify-end">
          <Link
            href={ROUTES.forgotPassword}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline dark:text-brand-200"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-700 dark:border-brand-900 dark:bg-brand-900/30 dark:text-brand-200"
        >
          {getErrorMessage(error)}
        </p>
      )}

      <Button type="submit" block loading={formik.isSubmitting}>
        {formik.isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;
