# Architecture and Module Boundaries

## Fixed architecture

The PRD fixes this architecture:

- **Web client:** Next.js App Router + TypeScript. Pages, forms, session handling and calls to API.
- **API:** NestJS REST API + TypeScript. Authentication, DTO validation, authorization, business rules and API responses.
- **Data access:** Prisma Client for type-safe database queries and migrations.
- **Database:** PostgreSQL.
- **Communication:** JSON over HTTP during local development; HTTPS in any deployed environment. Protected API calls use JWT bearer authentication at the API boundary.
- **Only the API accesses PostgreSQL.** The web client must not import Prisma or connect directly to the database.

No third-party integrations are required in v1.0.

## API modules

- `PrismaModule`: shared injectable Prisma client.
- `AuthModule`: signup, signin, JWT strategy and guard.
- `UsersModule`: current-member profile.
- `AuthorsModule`: shared catalogue author CRUD.
- `BooksModule`: shared catalogue book CRUD.
- `ReadingListModule`: per-member reading-list entries; every query is scoped to the authenticated member.

Use NestJS controllers for HTTP mapping, DTOs for request validation, services for business rules and Prisma for persistence. Keep controllers thin.

## Web routes

- `/signin`, `/signup`
- `/` â€” reading-list summary (the summary counts are COULD; do not let dashboard extras block core reading-list work)
- `/authors`, `/authors/new`, `/authors/[id]`
- `/books`, `/books/new`, `/books/[id]`
- `/reading-list`
- `/profile`

The SRS mentions edit/delete capabilities on detail pages; implement them with clear confirmation and error feedback.

## Proposed repository organization

This is a suggested implementation layout, not specified by the PRD/SRS. Confirm before generating large scaffolding:

```text
apps/
  api/
    src/
      auth/
      users/
      authors/
      books/
      reading-list/
      prisma/
    test/
  web/
    src/
      app/
      components/
      features/
      lib/
docs/
```

Keep feature-specific UI and API concerns organized by domain. Avoid a shared abstraction until at least two real consumers justify it.

## API response conventions

- Use consistent HTTP status codes and the shared error JSON shape `{ statusCode, message, error }`.
- Validation errors must identify fields.
- Lists include items and pagination metadata: total count, current page and page size. Exact property names should be selected once and documented in `API_CONTRACT.md`, then kept consistent.
- Do not return `User.hash` or any password data.

## Architecture constraints

- Do not add GraphQL, microservices, message queues, Redis, external book APIs, file storage or an admin subsystem.
- Do not allow client-side UI hiding to substitute for server authorization.
- Keep the API stateless with respect to bearer-token verification. If OQ-01 chooses an httpOnly cookie, document how the Next.js server translates the browser session into the API''s expected bearer-token request.
