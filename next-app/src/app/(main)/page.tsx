import Link from "next/link";
import Badge, { type BadgeTone } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ROUTES, SITE } from "@/constants";

const AREAS: {
  title: string;
  badge: string;
  tone: BadgeTone;
  body: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Public pages",
    badge: "Open",
    tone: "success",
    body: "The (main) group: marketing and info pages with the site header and footer. No account needed.",
    links: [
      { label: "About", href: ROUTES.about },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
  {
    title: "Signed-in app",
    badge: "Guarded",
    tone: "brand",
    body: "The (app) group: its own layout with a sidebar, behind the auth guard. Data comes from the API through RTK Query.",
    links: [
      { label: "Dashboard", href: ROUTES.dashboard },
      { label: "Settings", href: ROUTES.settings },
      { label: "Sign in", href: ROUTES.login },
    ],
  },
];

const HIGHLIGHTS = [
  {
    title: "Redux Toolkit + RTK Query",
    body: "App state in slices, server data cached and typed - one store for both.",
  },
  {
    title: "Bring your own backend",
    body: "Client only: axios services talk to your API. Point NEXT_PUBLIC_API_URL at your server.",
  },
  {
    title: "Ready to ship",
    body: "ESLint, Prettier, Vitest and a CI workflow that runs them all plus a build.",
  },
];

const Home = () => {
  /**COMPONENT */
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-gray-200 bg-linear-to-b from-brand-50 to-white dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
        <div className="page text-center sm:py-20">
          <Badge tone="brand">Next.js · Redux · Tailwind</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {SITE.name}
          </h1>
          <p className="muted mx-auto mt-4 max-w-2xl text-lg">
            {SITE.description} Everything below works without a backend - sign
            in with the demo account when you want the parts behind the guard.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={ROUTES.dashboard}
              className={buttonStyles({ size: "lg" })}
            >
              Open the dashboard
            </Link>
            <Link
              href={ROUTES.about}
              className={buttonStyles({ variant: "ghost", size: "lg" })}
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* What is where */}
      <section className="page">
        <div className="grid gap-5 sm:grid-cols-2">
          {AREAS.map((area) => (
            <Card key={area.title}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold">{area.title}</h2>
                <Badge tone={area.tone}>{area.badge}</Badge>
              </div>
              <p className="muted mt-2 text-sm">{area.body}</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {area.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-medium text-brand-600 hover:underline dark:text-brand-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title}>
              <h3 className="font-medium">{item.title}</h3>
              <p className="muted mt-1 text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
