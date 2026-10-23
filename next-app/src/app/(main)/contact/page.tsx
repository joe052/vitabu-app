import type { Metadata } from "next";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact = () => {
  /**COMPONENT */
  return (
    <div className="page-narrow max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">Contact us</h1>
      <p className="muted mt-3">
        Questions, feedback or a bug to report? We usually reply within one
        working day.
      </p>

      <Card className="mt-8">
        <p className="muted text-sm">Email</p>
        <a
          href="mailto:hello@example.com"
          className="mt-1 inline-block text-lg font-semibold text-brand-600 hover:underline dark:text-brand-200"
        >
          hello@example.com
        </a>
      </Card>
    </div>
  );
};

export default Contact;
