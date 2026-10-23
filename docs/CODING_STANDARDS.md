# Coding Standards

## TypeScript

- Enable strict TypeScript settings and fix type errors rather than suppressing them.
- Avoid `any`; if unavoidable at an external boundary, isolate it and explain why.
- Prefer explicit domain types, narrow interfaces and readable functions.
- Do not duplicate business rules between controllers and services.
- Avoid broad catch-and-ignore error handling.
- Do not add dependencies without explaining the problem they solve.

## NestJS API

- Controllers map HTTP input/output; services own business logic; DTOs validate input.
- Use dependency injection and module boundaries consistently.
- Use a global `ValidationPipe`; reject unknown properties.
- Use a consistent error shape and deliberate HTTP status codes.
- Do not return Prisma models directly if doing so could expose internal fields such as `hash`; map to explicit response DTOs/serializers.
- Derive the current member ID from the verified authentication context, never from an untrusted request body for reading-list ownership.
- Avoid N+1 queries; fetch needed author/book relations explicitly.

## Next.js client

- Use App Router conventions and TypeScript.
- Keep server/client component boundaries intentional.
- Keep API access and session handling in a small, centralized layer rather than scattering raw fetch logic across pages.
- Render clear loading, empty, success and error states.
- Use semantic HTML and accessible form controls.
- Never place secrets in `NEXT_PUBLIC_*` variables.

## Prisma and database

- Every schema change requires a migration committed with the change.
- Use the Prisma schema as the source for generated client types.
- Use database constraints for uniqueness and referential integrity.
- Use transactions where multiple writes must succeed or fail together.
- Never manually patch the database schema.

## Naming

- Use domain names consistently: `Author`, `Book`, `ReadingListEntry`, `ReadingStatus`.
- Use `WANT_TO_READ`, `READING`, `READ` as persisted enum values.
- Follow the existing repository''s naming conventions when consistent; document deviations.
- Name tests with relevant requirement IDs where practical.

## Code hygiene

- Run formatter, lint, type-check and relevant tests before reporting completion.
- Remove dead code and unused imports.
- Keep comments focused on why, not restating what code does.
- Avoid unrelated refactors in feature changes.
- Update docs when commands, environment variables, API response shapes or decisions change.
