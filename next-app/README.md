# Next Template

A Next.js 16 starter for client-side apps that talk to a **separate backend**. It comes with:

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**, **Tailwind CSS 4**
- **axios** for API calls, **Redux Toolkit** for app state and **RTK Query** for caching server data
- The same design system and Developers Mania branding as the Vue template (see [UI and branding](#ui-and-branding))
- A working example of every piece: public pages, login/signup, a protected dashboard, a dynamic route and example API services
- **Client only**: there are no Next.js API routes. Your backend lives elsewhere and is attached through `NEXT_PUBLIC_API_URL`
- Lean tooling: ESLint, Prettier, Vitest + Testing Library, and GitHub Actions CI

## Quick start

Requires Node.js 20.9 or newer (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_API_URL to your backend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The public pages work on their own; login and the dashboard need a backend. See [Connecting your backend](#connecting-your-backend).

## Scripts

| Command             | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the dev server                               |
| `npm run build`     | Production build                                   |
| `npm start`         | Serve the production build                         |
| `npm run lint`      | ESLint                                             |
| `npm run typecheck` | TypeScript check                                   |
| `npm run format`    | Format every file with Prettier                    |
| `npm test`          | Run the tests once (`npm run test:watch` to watch) |
| `npm run check`     | Lint + typecheck + format check + tests            |

CI (`.github/workflows/ci.yml` at the repo root) runs the same checks plus a build on every push and pull request.

## Project structure

```txt
src/
├── app/                          # Routes: every folder is a URL segment
│   ├── layout.tsx                # Root layout: fonts, metadata, <Providers>
│   ├── globals.css               # Design tokens (brand palette, font) + .page / .muted classes
│   ├── icon.png                  # Favicon (the Developers Mania mark)
│   ├── error.tsx                 # Shown when a page throws
│   ├── not-found.tsx             # 404 page
│   │
│   ├── (main)/                   # Public pages, with header + footer
│   │   ├── layout.tsx
│   │   ├── page.tsx              # /
│   │   ├── about/page.tsx        # /about
│   │   └── contact/page.tsx      # /contact
│   │
│   ├── (auth)/                   # Login + signup, with a centered card layout
│   │   ├── layout.tsx
│   │   ├── _components/          # LoginForm, SignupForm (used only here)
│   │   ├── login/page.tsx        # /login
│   │   └── signup/page.tsx       # /signup
│   │
│   ├── (app)/                    # Signed-in area: own layout with sidebar + auth guard
│   │   ├── layout.tsx
│   │   ├── _components/          # AuthGuard, Sidebar, Topbar
│   │   ├── dashboard/            # /dashboard
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── _components/      # StatCard, ProjectStats, ProjectList
│   │   │   └── _lib/             # Helpers private to the dashboard (+ their tests)
│   │   ├── settings/             # /settings
│   │   └── projects/[id]/        # /projects/1, /projects/2... (dynamic route)
│
├── components/
│   ├── ui/                       # Generic building blocks: Button, Card, Input, Badge, Spinner, State*
│   └── shared/                   # App-specific pieces used in several places: AppLogo, Header, Footer, StatusBadge
├── constants/                    # SITE info, ROUTES, navigation links
├── hooks/                        # Shared React hooks (useAuth)
├── lib/                          # Shared helpers: cn(), formatDate(), env
│   └── services/                 # axios instance (api.ts) + one file of request functions per feature
├── providers/                    # Client-side providers (Redux) wrapped around the app
├── store/
│   ├── store.ts                  # makeStore + RootState/AppDispatch types
│   ├── hooks.ts                  # useAppDispatch, useAppSelector (always use these)
│   ├── selectors.ts              # Selectors
│   ├── slices/                   # Redux slices (app state)
│   └── api/                      # RTK Query endpoints that cache the services' data
└── types/                        # Shared TypeScript types (match your API responses)
```

### Key ideas

- **Route groups `(name)`.** A folder in brackets groups routes that share a layout, and the name stays out of the URL. `(app)/dashboard` is served at `/dashboard`.
- **Private folders `_name`.** A folder starting with `_` is never a route, so `_components` and `_lib` hold code that belongs to one feature.
- **Only `page.tsx` becomes a URL.** Other files in `app/` are never served on their own. This template has no `route.ts` handlers: it is client only, and all data comes from your backend.
- **Server Components are the default.** Add `"use client"` to the top of a file only when it needs state, effects, event handlers, browser APIs or Redux hooks. Pages stay Server Components so they can export `metadata`, and they render client components for the interactive parts (see `dashboard/page.tsx`).

## Where does my code go?

| You're adding...                                      | Put it in                                          |
| ----------------------------------------------------- | -------------------------------------------------- |
| A new page                                            | `src/app/(group)/your-page/page.tsx`               |
| A component used by **one** page or feature           | that feature's `_components/` folder               |
| A component used by **several** features              | `src/components/shared/`                           |
| A generic, reusable UI element (button, modal...)     | `src/components/ui/`                               |
| A helper used by one feature                          | that feature's `_lib/` folder                      |
| A helper used everywhere                              | `src/lib/`                                         |
| Calls to a new backend endpoint                       | `src/lib/services/` + `src/store/api/` (see below) |
| App state shared between pages (UI state, filters...) | `src/store/slices/` (see below)                    |
| A type used in several places                         | `src/types/`                                       |
| A route path, nav link or app-wide setting            | `src/constants/`                                   |

If a feature-level piece starts being used somewhere else, move it up to the shared folder.

## State management

There are two kinds of state, and each has a home:

| Kind                                     | Example                                | Tool                                                                             |
| ---------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------- |
| **Server data**: lives in your backend   | the user, projects                     | **RTK Query** in `store/api/`. Handles caching, loading and error states for you |
| **App state**: lives only in the browser | sidebar open, selected filters, a cart | **Redux slice** in `store/slices/`                                               |

Avoid copying API data into slices. RTK Query already caches it.

### Add an API endpoint

Requests are made with axios in `src/lib/services/`, then wrapped in RTK Query for caching.

1. Add a service function that uses the shared `api` instance:

   ```ts
   // src/lib/services/projects.ts
   export const createProject = async (
     body: Pick<Project, "name" | "description">,
   ) => {
     const { data } = await api.post<Project>("/projects", body);
     return data;
   };
   ```

2. Expose it through RTK Query with `fromService`, which turns axios errors into an `ApiError`:

   ```ts
   // src/store/api/projectsApi.ts
   createProject: build.mutation<Project, Pick<Project, "name" | "description">>({
     queryFn: (body) => fromService(createProject(body)),
     invalidatesTags: ["Project"], // refetches every query that provides "Project"
   }),

   // then export the generated hook
   export const { useCreateProjectMutation } = projectsApi;
   ```

Service functions are plain async functions, so you can also call them directly (`await getProjects()`) where you don't need caching.

For a new feature, create `src/lib/services/<feature>.ts` and a `src/store/api/<feature>Api.ts` that calls `baseApi.injectEndpoints(...)`.

### Add a slice

1. Create `src/store/slices/filtersSlice.ts` (copy `uiSlice.ts`).
2. Register its reducer in `src/store/store.ts`.
3. Add selectors to `src/store/selectors.ts`.
4. In a client component: `useAppSelector(selectX)` to read and `useAppDispatch()` to update.

## Connecting your backend

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL`, e.g. `http://localhost:8000/api`. Without it, requests go to `http://localhost:8000/api`.
2. Make your backend return the shapes in `src/types` (or update the types). Errors should be JSON like `{ "message": "..." }`.
3. **Endpoints.** The examples call `GET /projects`, `GET /projects/:id` (`src/lib/services/projects.ts`) and the auth endpoints below.
4. **Auth.** The template expects cookie sessions: `POST /auth/login`, `POST /auth/signup`, `POST /auth/logout` and `GET /auth/me` (401 when signed out). See `src/lib/services/auth.ts`.
   - If your backend is on another origin, it must allow your frontend's origin with credentials in its CORS settings. Alternatively, proxy it through Next.js (see `next.config.ts`).
   - If your backend uses bearer tokens instead, attach them in the request interceptor in `src/lib/services/api.ts`. Its response interceptor sends the user to the login page on a 401 from any non-`/auth/` request.

`AuthGuard` only controls what the UI shows. Your backend must check auth on every request.

## UI and branding

The UI follows the same standard as the Vue template, so moving between the two is predictable:

- **Brand palette.** `brand-50` to `brand-900` in `src/app/globals.css` are keyed to the logo red (#fb260b). Use `bg-brand-600` for fills behind white text (the logo red itself is too light for 4.5:1 contrast). Neutrals are Tailwind's `gray`.
- **Shared classes.** `.page` (max-w-6xl) and `.page-narrow` (max-w-3xl) give every page the same gutter, and `.muted` is secondary text. Pages use these instead of their own containers.
- **Components** match the Vue `Base*` components:

  | Vue                                          | Next                                         |
  | -------------------------------------------- | -------------------------------------------- |
  | `BaseButton`                                 | `Button` (+ `buttonStyles()` for links)      |
  | `BaseCard`                                   | `Card` (`title`, `header`, `footer`, `href`) |
  | `BaseInput`                                  | `Input` (`label`, `hint`, `error`)           |
  | `BaseBadge`                                  | `Badge` (`tone`)                             |
  | `BaseSpinner`                                | `Spinner`                                    |
  | `StateLoading` / `StateError` / `StateEmpty` | same names                                   |
  | `AppLogo`                                    | `AppLogo`                                    |

- **Dark mode** follows the OS setting via Tailwind's `dark:` variants.
- **Rebranding.** Replace `public/logo-developers-mania.png` (the logo) and `src/app/icon.png` (the favicon), then adjust the brand shades in `globals.css`.

## Conventions

- **File names:** `PascalCase.tsx` for components, `camelCase.ts` for everything else, `useSomething.ts` for hooks.
- **Components:** arrow functions with a default export, with `/**VARIABLES */`, `/**FUNCTIONS */` and `/**COMPONENT */` sections.
- **Imports:** always use the `@/` alias for `src/` (`@/components/ui/Button`) instead of long relative paths.
- **Styling:** Tailwind classes, using the brand palette and shared classes above. Add a variant to a `ui/` component rather than pasting class strings into a page. Use `cn()` to combine classes.
- **Tests:** next to the code they test, as `*.test.ts(x)`.

## Learn more

- [Next.js docs](https://nextjs.org/docs) (also bundled at `node_modules/next/dist/docs/`)
- [Redux Toolkit](https://redux-toolkit.js.org/) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS](https://tailwindcss.com/docs)
