# Guided Implementation Plan

Implement in small vertical slices. Do not move to the next gate until exit criteria are met, or a deferral is explicitly approved and recorded.

## Phase 0 â€” Repository inspection and decisions

1. Inspect repository and existing files.
2. Read this docs folder and source PRD/SRS.
3. Identify existing schema/code and preserve useful work.
4. Resolve implementation tooling decisions (workspace layout, versions, scripts, PostgreSQL local setup).
5. Resolve OQ-01 before final session/token persistence is built.
6. Record decisions before scaffolding.

**Exit:** agreed repo layout, toolchain, local database approach, auth-session approach or a clearly isolated temporary auth spike.

## Phase 1 â€” G1 Foundation

1. Scaffold the approved Next.js web app and NestJS API.
2. Configure TypeScript, lint/format scripts and environment validation.
3. Configure PostgreSQL and Prisma.
4. Implement schema changes: remove `Bookmark`, add `ReadingListEntry` and enum, creator attribution, explicit referential actions and author index as defined in PRD.
5. Generate and commit migration; test migration from empty database.
6. Implement AuthModule: signup, signin, password hashing, JWT strategy/guard.
7. Implement strict global DTO validation and shared error format.
8. Implement sign-out/session behaviour in web client after OQ-01 is decided.
9. Add seed script and auth/security E2E tests.
10. Verify G1 acceptance criteria and update progress.

**Exit:** G1 requirements pass; no migration drift; no secrets; protected API tests pass.

## Phase 2 â€” G2 Catalogue

1. Implement PrismaModule and AuthorsModule.
2. Add author create/list/detail/update/delete and linked-book conflict rule.
3. Implement pagination and stable case-insensitive sorting.
4. Implement BooksModule with author relation and create/list/detail/update/delete.
5. Add author filter; ensure book deletion cascades reading-list entries.
6. Add creator attribution for authors/books.
7. Build author and book pages/forms.
8. Add service and E2E tests for each endpoint and error path.
9. Verify G2.

**Exit:** all G2 criteria pass, including database referential integrity.

## Phase 3 â€” G3 Reading List

1. Implement `ReadingListModule`.
2. Add member-scoped list query, status filter, add, update status and remove.
3. Enforce database composite uniqueness and handle duplicate conflict as 409.
4. Enforce ownership in every query/mutation; other-member entry IDs return 404.
5. Build `/reading-list` with status filters and appropriate states.
6. Add two-member privacy E2E tests.
7. Verify G3.

**Exit:** FR-030â€“035 pass, including cross-member privacy tests.

## Phase 4 â€” G4 v1.0 completion

1. Implement profile view/update.
2. Complete author/book detail pages, including author books and member''s own book status.
3. Add SHOULD search behaviours for authors and books.
4. Complete attribution and creator fallback behaviour.
5. Polish all loading, empty, error and destructive-confirmation states.
6. Run automated test suite, accessibility checks and performance test.
7. Complete README in ten steps or fewer.
8. Verify all MUST and SHOULD requirements or record explicit deferrals.
9. Review scope, security, migrations and docs.

**Exit:** all G4 requirements pass, or each deferral is explicitly approved and documented.

## Phase 5 â€” COULD backlog

Do not start until G4 exit. Potential backlog: FR-007 password change, FR-016 duplicate author warning, FR-026 ISBN/year, FR-037 timestamps, FR-042 author counts, FR-043 dashboard counts, NFR-012 OpenAPI docs. Choose items individually against the learning objectives.

## Task sizing

Each task should normally fit in one focused implementation loop and produce:
- A clear outcome.
- Relevant requirement IDs.
- Tests.
- A small reviewable diff.
- Updated `PROGRESS.md`.

If a task spans multiple modules or requires an unresolved product decision, split it.
