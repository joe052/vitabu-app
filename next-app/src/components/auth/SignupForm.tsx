"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ROUTES } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { useSignupMutation } from "@/store/api/authApi";

type SignupValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

/**Mirrors the backend's SignUpDto, so most mistakes are caught before the request */
const validationSchema = Yup.object({
  firstName: Yup.string().trim().max(50, "Keep it under 50 characters"),
  lastName: Yup.string().trim().max(50, "Keep it under 50 characters"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "That email is too long")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Use at least 8 characters")
    .max(128, "Keep it under 128 characters")
    .required("Password is required"),
});

const SignupForm = () => {
  /**VARIABLES */
  const router = useRouter();
  const [signup, { error }] = useSignupMutation();

  /**FUNCTIONS */
  const formik = useFormik<SignupValues>({
    initialValues: { firstName: "", lastName: "", email: "", password: "" },
    validationSchema,
    onSubmit: async ({ firstName, lastName, email, password }) => {
      /**Names are optional - leave blank ones out rather than sending "" */
      const result = await signup({
        email: email.trim().toLowerCase(),
        password,
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
      });
      if (result.error) return;

      toast.success("Account created - you're signed in.");
      router.push(ROUTES.dashboard);
    },
  });

  /**Show a field's error only once the user has left it (or tried to submit) */
  const fieldError = (field: keyof SignupValues) =>
    formik.touched[field] ? formik.errors[field] : undefined;

  /**COMPONENT */
  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="signup-first-name"
          label="First name"
          autoComplete="given-name"
          error={fieldError("firstName")}
          {...formik.getFieldProps("firstName")}
        />
        <Input
          id="signup-last-name"
          label="Last name"
          autoComplete="family-name"
          error={fieldError("lastName")}
          {...formik.getFieldProps("lastName")}
        />
      </div>
      <Input
        id="signup-email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={fieldError("email")}
        {...formik.getFieldProps("email")}
      />
      <Input
        id="signup-password"
        label="Password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters"
        error={fieldError("password")}
        {...formik.getFieldProps("password")}
      />

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-700 dark:border-brand-900 dark:bg-brand-900/30 dark:text-brand-200"
        >
          {getErrorMessage(error)}
        </p>
      )}

      <Button type="submit" block loading={formik.isSubmitting}>
        {formik.isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
};

export default SignupForm;
