import type { Metadata } from "next";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ROUTES } from "@/constants";

export const metadata: Metadata = {
  title: "About",
};

const SECTIONS = [
  {
    title: "Route groups",
    body: "(main), (auth) and (app) each have their own layout. The brackets keep the group name out of the URL.",
  },
  {
    title: "Feature folders",
    body: "Code used by one page lives in that page's _components and _lib folders, right next to it.",
  },
  {
    title: "Shared code",
    body: "Once something is used in several places it moves up to src/components, src/hooks or src/lib.",
  },
  {
    title: "State",
    body: "Redux slices hold app state; RTK Query fetches, caches and refetches data from your backend.",
  },
];

const About = () => {
  /**COMPONENT */
  return (
    <div className="page-narrow">
      <h1 className="text-3xl font-semibold tracking-tight">
        About this template
      </h1>
      <p className="muted mt-3 text-lg">
        A public page: no session needed, no guard in front of it. Use these as
        the shape for marketing or documentation pages that sit in front of the
        app.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {SECTIONS.map((item) => (
          <Card key={item.title}>
            <h2 className="font-semibold">{item.title}</h2>
            <p className="muted mt-2 text-sm">{item.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={ROUTES.dashboard} className={buttonStyles()}>
          Open the dashboard
        </Link>
        <Link
          href={ROUTES.contact}
          className={buttonStyles({ variant: "ghost" })}
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
};

export default About;
