[CmdletBinding()]
param(
    [string]$TargetPath = (Get-Location).Path,
    [switch]$Force
)

$ErrorActionPreference = "Stop"
$docsPath = Join-Path $TargetPath "docs"

if ((Test-Path $docsPath) -and -not $Force) {
    $existing = Get-ChildItem -Path $docsPath -Force -ErrorAction SilentlyContinue
    if ($existing.Count -gt 0) {
        throw "The docs folder already exists and is not empty: $docsPath. Use -Force to overwrite files with matching names."
    }
}

New-Item -ItemType Directory -Path $docsPath -Force | Out-Null

$documents = @{}
$documents['README.md'] = @'
# Authors & Books Tracker (ABT) — Agent Documentation

These documents guide an AI coding agent through implementation of Authors & Books Tracker (ABT). They are derived from:

- `DM-PRD-ABT-001_Authors_Books_Tracker.docx` v0.1
- `DM-SRS-ABT-001_Authors_Books_Tracker.docx` v0.1

## Read order

1. `AGENT_INSTRUCTIONS.md` — mandatory operating rules.
2. `PRODUCT_AND_SCOPE.md` — product goals, scope and decisions.
3. `REQUIREMENTS_TRACEABILITY.md` — requirements and acceptance gates.
4. `OPEN_QUESTIONS_AND_DECISIONS.md` — unresolved questions that must not be silently guessed.
5. `ARCHITECTURE.md` — fixed architecture and module boundaries.
6. `DATA_MODEL.md` — entities, constraints and referential actions.
7. `API_CONTRACT.md` — routes and shared API behaviour.
8. `WEB_CLIENT.md` — pages, client behaviour and session requirements.
9. `CODING_STANDARDS.md` — implementation conventions.
10. `SECURITY.md` — non-negotiable security requirements.
11. `TESTING_AND_QUALITY.md` — test strategy and measurable quality targets.
12. `IMPLEMENTATION_PLAN.md` — staged delivery and gate exit criteria.
13. `DEFINITION_OF_DONE.md` — completion checklist for every task and gate.
14. `PROGRESS.md` — update this as work advances.

The PRD and SRS remain the source of truth for product requirements. If a conflict or ambiguity is found, stop, document it, and ask for a decision rather than inventing a product rule.

## Intended repository layout

The docs can be created in the project root. A recommended implementation layout is:

```text
/
├── apps/
│   ├── api/             # NestJS REST API
│   └── web/             # Next.js App Router web client
├── packages/            # Only introduce shared packages if justified
├── docs/
├── .env.example
├── .gitignore
├── README.md
└── package.json         # Root workspace scripts if a monorepo is chosen
```

This layout is a recommendation for organizing the fixed stack, not a decision already specified by the PRD/SRS. Choose and document the package manager/workspace approach before scaffolding.

## Source documents

Keep the original PRD and SRS available to the coding agent. They may be placed in `docs/source/` if desired. Do not overwrite them with summaries.
'@
$documents['AGENT_INSTRUCTIONS.md'] = @'
# Mandatory AI Agent Instructions

## Mission

Implement Authors & Books Tracker (ABT) in small, verifiable increments, following this docs folder and the source PRD/SRS. The project is both a useful reading tracker and a deliberate learning exercise for Next.js, NestJS, Prisma and PostgreSQL.

## Required startup sequence

Before editing code:

1. Inspect the existing repository and report what already exists; do not overwrite working code blindly.
2. Read every document in this `docs/` folder, especially `OPEN_QUESTIONS_AND_DECISIONS.md`.
3. If available, read the source PRD and SRS and treat them as authoritative for product behaviour.
4. Identify decisions that block implementation. Do not silently resolve open questions.
5. Propose the next smallest implementation task and list its acceptance criteria.
6. Wait for user approval before broad scaffolding, destructive changes, or a decision that changes architecture. For routine, reversible implementation within an approved gate, proceed autonomously.

## Implementation loop

For each task:

1. State the objective, relevant FR/NFR IDs, assumptions and files expected to change.
2. Implement only the task and its necessary supporting changes.
3. Add/update tests alongside the implementation.
4. Run relevant formatting, lint, type-check, unit tests and e2e tests available in the repository.
5. Inspect the diff for accidental scope changes, secrets, unsafe logging and unrelated refactors.
6. Report changed files, tests run/results, requirement IDs satisfied, known gaps and the proposed next task.
7. Update `PROGRESS.md` and any decision record.

Do not claim a test passed unless it was actually run and passed. If a command cannot run, state why and give the exact command needed.

## Source-of-truth precedence

1. Explicit decisions approved by the user and recorded in `OPEN_QUESTIONS_AND_DECISIONS.md`.
2. SRS acceptance criteria for observable behaviour.
3. PRD product scope, data model, architecture and decision log.
4. These implementation instructions.
5. Agent inference, which must be labelled as inference and must not override the above.

If documents conflict, identify the exact conflict and stop work on the affected behaviour until resolved.

## Scope discipline

- Implement MUST requirements first, then SHOULD requirements for v1.0.
- COULD requirements are backlog and must not be implemented until all required v1.0 gates pass or the user explicitly reprioritizes them.
- Do not add social features, ratings, reviews, comments, following, external catalogue integrations, cover uploads, native mobile apps, administrator roles, moderation or approval workflows.
- Each book has exactly one author.
- The catalogue is shared. Reading-list entries are private to each member.
- Every signed-in member can create, edit and delete catalogue records, subject to the author-delete restriction. There is no administrator role in v1.0.

## Engineering principles

- Prefer clear, conventional, maintainable TypeScript over clever abstractions.
- Keep business rules in NestJS services, request validation in DTOs, and persistence through Prisma.
- The browser must never connect directly to PostgreSQL.
- Do not introduce extra libraries, architectural layers, external services or generated abstractions without a concrete requirement and a short rationale.
- Use migrations for all schema changes; never make manual schema changes to the database.
- Do not commit secrets or real credentials.
- Preserve accessible form labels, keyboard operation, and inline validation feedback.
- Keep code, tests, and docs aligned.

## Definition of progress

A feature is not complete merely because a page or endpoint exists. It is complete when its acceptance criteria are implemented, validated, tested at the appropriate layer, and its status is reflected in `PROGRESS.md`.
'@
$documents['PRODUCT_AND_SCOPE.md'] = @'
# Product and Scope

## Product

**Authors & Books Tracker (ABT)** is a web application that lets signed-in members maintain a shared catalogue of authors and books and track their own reading against that catalogue.

The project is also a learning project, with deliberate practice in:
- JWT authentication, Passport strategies and guards in NestJS.
- Prisma relations and referential actions.
- Composite unique constraints and PostgreSQL enums.
- DTO validation and a global `ValidationPipe`.
- API-side authorization and ownership checks.
- Pagination, filtering and search.
- Next.js App Router data fetching and forms against an external API.
- Migrations, seeding and end-to-end API testing.

## Product goals

- **G-01:** A member can find a catalogued author and see every catalogued book by that author on one page.
- **G-02:** A member can record and change their reading status for any catalogued book.
- **G-03:** A member can quickly see what they want to read, are reading and have read.
- **G-04:** Preserve catalogue integrity: a book must have an author, and an author cannot be deleted while books reference them.

## Roles and access

- **Visitor:** Can access sign-up and sign-in only. Other protected pages redirect to `/signin`, unless OQ-03 is explicitly resolved differently.
- **Member:** Can read and edit the shared catalogue, manage their own reading list, and view/edit their own profile.
- No administrator role in v1.0.

## In scope

- Registration, sign-in, sign-out and profile.
- Shared author and book catalogue with CRUD.
- Private reading list with `WANT_TO_READ`, `READING`, `READ`.
- Pagination, filtering and basic search.

## Out of scope

- Co-authored books; exactly one author per book.
- Administrator roles, moderation and approval workflows.
- Ratings, reviews, comments, following and other social features.
- External catalogue imports, cover uploads/file storage and native mobile apps.
- Email verification and email-based password reset.
- COULD requirements until the v1.0 gates are complete, unless explicitly reprioritized.

## Product modules

- M1 Accounts & Authentication
- M2 Authors
- M3 Books
- M4 Reading List
- M5 Browse & Search

## Priorities

- **MUST:** Required for v1.0.
- **SHOULD:** Expected for v1.0 unless explicitly deferred.
- **COULD:** Backlog; do not build early by default.

## Product decisions from PRD

- D-01: Each book has exactly one author.
- D-02: Catalogue is shared by all members; reading state is per member.
- D-03: Replace the unrelated `Bookmark` model with `ReadingListEntry`.
- D-04: No administrator role in v1.0.
- D-05: An author cannot be deleted while books reference them; do not cascade-delete those books.

## Source documents

- PRD: `DM-PRD-ABT-001`, v0.1, 23 October 2026.
- SRS: `DM-SRS-ABT-001`, v0.1, 23 October 2026.
'@
$documents['REQUIREMENTS_TRACEABILITY.md'] = @'
# Requirements Traceability and Acceptance Gates

The PRD/SRS are authoritative. Keep requirement IDs stable in commits, tests, task notes and progress reports.

## Release gates

### G1 — Foundation
Must pass: FR-001–004, FR-006; NFR-001, NFR-003, NFR-004, NFR-005, NFR-007.
- Registration, sign-in, JWT protection and sign-out work end-to-end.
- Prisma schema changes for the foundational data model are migrated.
- Environment example and safe configuration exist.
- Referential integrity, shared error format and strict request validation are verified.
- Seed script exists and is repeatable as scoped by the SRS.

### G2 — Catalogue
Must pass: FR-010–014, FR-020–025; NFR-006.
- Author and book CRUD works.
- Pagination defaults to 20 and caps at 100.
- Lists sort case-insensitively by name/title.
- Book filtering by author works.
- Author deletion with linked books returns 409 and leaves data unchanged.
- Book deletion removes its reading-list entries.

### G3 — Reading list
Must pass: FR-030–035.
- Member can add, change status and remove a book from their list.
- Duplicate member/book entry returns 409.
- Reading-list results can be filtered by status.
- All reads/updates/deletes are scoped to the authenticated member.
- Attempts to access another member''s entry return 404.

### G4 — v1.0
All remaining MUST and SHOULD FRs/NFRs pass, except any explicit deferral recorded with rationale.
- Profile name updates and attribution.
- Search and author/book detail behaviour.
- Book detail page shows the current member''s reading status.
- Automated tests, accessibility and performance targets are verified.
- README setup is complete and concise.

## Functional requirement index

| Requirement | Priority | Area | Acceptance coverage |
|---|---|---|---|
| FR-001 | MUST | Signup | Valid email/password; case-insensitive uniqueness; invalid inputs return 400 |
| FR-002 | MUST | Password security | bcrypt or argon2 hash only; never return/log password or hash |
| FR-003 | MUST | Sign-in/JWT | Valid credentials issue token; generic 401; default expiry 1 hour |
| FR-004 | MUST | API auth | Missing, tampered or expired token returns 401 on protected endpoints |
| FR-005 | SHOULD | Profile | GET only id/email/firstName/lastName; PATCH names only |
| FR-006 | MUST | Sign-out | Client token/session discarded; protected page redirects |
| FR-007 | COULD | Password change | Backlog |
| FR-010–015 | MUST/SHOULD | Authors | Create/list/detail/update/delete rules and creator attribution |
| FR-016 | COULD | Duplicate-author warning | Backlog |
| FR-020–025 | MUST | Books | Create/list/detail/update/delete, author relation and author filter |
| FR-026 | COULD | ISBN/year | Backlog |
| FR-027 | SHOULD | Book attribution | Creator attribution |
| FR-030–035 | MUST | Reading list | Add/default status, uniqueness, status change, removal, filter, privacy |
| FR-036 | SHOULD | Book detail | Own status and add/change/remove control |
| FR-037 | COULD | Reading timestamps | Backlog |
| FR-040–041 | SHOULD | Search | Case-insensitive partial book title/author name |
| FR-042–043 | COULD | Counts/dashboard | Backlog |

## Shared SRS behaviour

- Every endpoint except signup and signin requires a valid token.
- Malformed UUID path parameter → HTTP 400; valid UUID with no record → HTTP 404.
- Request body referencing a nonexistent record → HTTP 400 naming the field.
- Trim text inputs; empty-after-trim is treated as missing.
- All write DTOs reject unknown properties (SRS NFR-001).
- Errors use `{ statusCode, message, error }`; validation errors identify failing fields.
- List pagination default: 20; maximum: 100; a limit above 100 returns 400.
- All schema changes use committed Prisma migrations.

## NFR verification targets

- NFR-001: E2E test sends unknown property to every write endpoint; receives 400.
- NFR-002: Authorization/privacy tests call API directly, without web UI.
- NFR-003: gitleaks scan has zero findings; `.env.example` lists API environment variables.
- NFR-004: database foreign key blocks direct author deletion while books exist.
- NFR-005: 400/401/404/409 responses use shared error shape.
- NFR-006: pagination default 20, maximum 100, limit >100 returns 400.
- NFR-007: migrations alone build an empty database; no schema drift.
- NFR-008: seed creates at least 10 authors, 30 books and 2 members; repeat run has no duplicates/errors.
- NFR-009: service line coverage ≥70%; each endpoint has at least one success and one failure E2E test; `npm run test:e2e` passes.
- NFR-010: p95 ≤300 ms with 1,000 authors and 10,000 books using autocannon (10 connections, 30 seconds).
- NFR-011: Lighthouse accessibility ≥90 on each specified page; keyboard-only UC-01–UC-07 pass.
- NFR-012: OpenAPI docs at `/docs`; README fresh setup in ≤10 steps. COULD/backlog.

## Requirement-to-test convention

Name tests with the requirement or AC identifier where practical, e.g. `FR-035 AC-035.1: member cannot access another member''s entry`. Add a short note in `PROGRESS.md` when any criterion is deferred.
'@
$documents['OPEN_QUESTIONS_AND_DECISIONS.md'] = @'
# Open Questions and Decision Register

## Rule

Do not silently answer an open question. If it blocks the next task, explain the trade-off and ask the user to decide. Once decided, record the answer, date and rationale here. Never rewrite an existing decision history; append a new entry when a decision changes.

## Open questions from the PRD/SRS

### OQ-01 — Where should the JWT be stored? (Blocks final auth/session implementation)

Options in PRD:
- **A. httpOnly cookie via the Next.js server** — the PRD labels this as preferred because browser scripts cannot directly read an httpOnly cookie. Requires a deliberate web-to-API session/proxy design and CSRF considerations.
- **B. Client-side storage** — simpler direct bearer-token calls, but the PRD identifies token theft through XSS as a risk.

SRS says protected API requests use `Authorization: Bearer <token>`. The client token-storage choice is unresolved. Do not assume that a cookie design and direct browser-to-API bearer calls are interchangeable. Ask for approval before implementing final session storage. If the user approves option A, document how the Next.js server forwards the bearer token and how CSRF/origin protections work.

**Status:** Open.

### OQ-02 — Deployment target

Deployment is not defined. Keep development local. Do not introduce cloud hosting, CI/CD provider-specific infrastructure or production environment assumptions until the user chooses a target.

**Status:** Open; not a blocker for local development.

### OQ-03 — Can visitors browse the catalogue read-only?

PRD/SRS currently describe visitors as sign-up/sign-in only and say all endpoints except signup/signin require JWT. The open question asks whether read-only public catalogue access is desired. Until decided otherwise, enforce the current documented rule: visitor has no catalogue access.

**Status:** Open; implement the current documented behaviour unless the user explicitly changes it.

### OQ-04 — Future co-authorship model

If co-authorship is desired later, should the schema migrate to a `BookAuthor` join table or should that be designed in now? v1.0 decision D-01 is one author per book. Do not build co-authorship in v1.0.

**Status:** Open only for future COULD work; not a v1.0 blocker.

## Additional implementation choices to record before scaffolding

The PRD/SRS fix the technology stack but do not specify all repository/tooling details. Before scaffolding, record the selected values for:
- Repository/workspace layout (e.g. npm workspaces monorepo vs separate apps).
- Exact compatible Node.js LTS, Next.js, NestJS and Prisma versions.
- Formatting/linting tools and package scripts.
- Local PostgreSQL approach (native install or Docker Compose).
- Whether a Next.js server route/BFF is used for session handling if OQ-01 option A is chosen.

These are implementation choices, not product requirements. Recommend a minimal, conventional choice and ask before introducing complexity.

## Decision log template

```md
### DEC-XXX — Short title
- Status: Proposed | Accepted | Rejected | Superseded
- Date:
- Decision:
- Rationale:
- Alternatives:
- Impacted docs/requirements:
- Approved by:
```
'@
$documents['ARCHITECTURE.md'] = @'
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
- `/` — reading-list summary (the summary counts are COULD; do not let dashboard extras block core reading-list work)
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
'@
$documents['DATA_MODEL.md'] = @'
# Data Model and Persistence Rules

The PRD Section 7 is the source for the target model. Use Prisma models and PostgreSQL constraints to enforce these rules.

## User

- `id`: UUID string primary key.
- `email`: required, unique, normalized to lowercase before storage.
- `hash`: required password hash; never returned or logged.
- `firstName`, `lastName`: optional strings.
- `createdAt`, `updatedAt`: Prisma-managed timestamps.
- Relationships: has many `ReadingListEntry`; may have created many `Author` and `Book`.

## Author

- `id`: UUID string primary key.
- `name`: required, 1–200 characters; indexed, not unique.
- `bio`: optional, maximum 5,000 characters.
- `createdById`: optional FK to `User`, `onDelete: SetNull`.
- `createdAt`, `updatedAt`.
- Has many `Book`.
- Deletion is prohibited while books reference the author; use `onDelete: Restrict`.

## Book

- `id`: UUID string primary key.
- `title`: required, 1–300 characters.
- `description`: optional, maximum 5,000 characters.
- `authorId`: required FK to exactly one `Author`, indexed, `onDelete: Restrict`.
- `createdById`: optional FK to `User`, `onDelete: SetNull`.
- `createdAt`, `updatedAt`.
- COULD fields: `publishedYear` and optional unique `isbn`; defer until MUST/SHOULD scope is complete unless explicitly reprioritized.

## ReadingListEntry

- `id`: UUID string primary key.
- `userId`: required FK to `User`, `onDelete: Cascade`.
- `bookId`: required FK to `Book`, `onDelete: Cascade`.
- `status`: enum `WANT_TO_READ | READING | READ`; default `WANT_TO_READ`.
- Optional COULD timestamps: `startedAt`, `finishedAt`.
- `createdAt`, `updatedAt`.
- Composite unique constraint `@@unique([userId, bookId])`.
- Index `@@index([userId, status])`.

## ReadingStatus

Exact enum values:
- `WANT_TO_READ`
- `READING`
- `READ`

Do not add alternate spellings or presentation labels to the persisted enum. UI may display human-readable labels.

## Required referential behaviour

- Deleting a user sets `Author.createdById` and `Book.createdById` to null; catalogue records remain.
- Deleting a user cascades their reading-list entries.
- Deleting a book cascades reading-list entries for that book across all members.
- Deleting an author with books is restricted; API should return HTTP 409 with the number of linked books.
- A book must reference an existing author.
- A member can have at most one reading-list entry for a book; enforce this in PostgreSQL/Prisma, not only in application code.

## Migration rules

- Every schema change is committed as a Prisma migration.
- Never manually edit the database schema as a substitute for a migration.
- Check migration status and test a clean database from migrations alone.
- Do not remove the existing `Bookmark` model silently: PRD decision D-03 says replace it with `ReadingListEntry`. Inspect the current repository/schema first and plan the migration safely.
'@
$documents['API_CONTRACT.md'] = @'
# REST API Contract

The endpoint paths below come from PRD Section 8.3. The SRS defines shared validation and acceptance behaviour. Preserve these paths unless the user approves a change.

## Endpoints

| Method | Path | Purpose | Requirement |
|---|---|---|---|
| POST | `/auth/signup` | Register | FR-001, FR-002 |
| POST | `/auth/signin` | Sign in; issue access token | FR-003 |
| GET | `/users/me` | Current member profile | FR-005 |
| PATCH | `/users/me` | Update own first/last name | FR-005 |
| GET | `/authors?search=&page=` | List/search authors | FR-011, FR-041 |
| POST | `/authors` | Create author | FR-010 |
| GET | `/authors/:id` | Author detail with books | FR-012 |
| PATCH | `/authors/:id` | Edit author | FR-013 |
| DELETE | `/authors/:id` | Delete author if no linked books | FR-014 |
| GET | `/books?authorId=&search=&page=` | List/filter/search books | FR-021, FR-025, FR-040 |
| POST | `/books` | Create book | FR-020 |
| GET | `/books/:id` | Book detail with author and own status | FR-022, FR-036 |
| PATCH | `/books/:id` | Edit book/reassign author | FR-023 |
| DELETE | `/books/:id` | Delete book | FR-024 |
| GET | `/reading-list?status=` | Own list, optionally filtered | FR-034, FR-035 |
| POST | `/reading-list` | Add book to own list | FR-030, FR-031 |
| PATCH | `/reading-list/:id` | Change own entry status | FR-032, FR-035 |
| DELETE | `/reading-list/:id` | Remove own entry | FR-033, FR-035 |

## Authentication and authorization

- Only `/auth/signup` and `/auth/signin` are public by default.
- All other endpoints require a valid, unexpired JWT.
- Sign-in returns a signed access token; expiry is configurable, default 1 hour.
- Invalid credentials return the same 401 response whether the email is unknown or the password is wrong.
- Every reading-list query and mutation must be scoped to the authenticated user''s ID.
- If a validly formatted entry ID belongs to another member, return 404, not 403, and leave the entry unchanged.
- The `GET /books/:id` response should include the signed-in member''s own reading-list status, if any.

## Request validation

- Use DTO classes and class-validator.
- Configure a global NestJS `ValidationPipe` with whitelist and rejection of unknown properties (`whitelist: true`, `forbidNonWhitelisted: true`, `transform: true` as appropriate).
- Trim text fields; treat empty-after-trim as missing.
- Email is validated and normalized to lowercase before persistence.
- Signup password length: 8–72 characters.
- Author name: 1–200; biography ≤5,000.
- Book title: 1–300; description ≤5,000.
- Malformed UUID path value: 400. Well-formed UUID with no record: 404.
- Body references to nonexistent related records: 400 naming the field.
- Unknown reading status: 400.
- Page size defaults to 20; maximum 100; limit above 100 returns 400.

## Status code rules

- `201 Created`: successful creation.
- `200 OK`: successful read/update and sign-in as defined by SRS.
- `204 No Content`: successful delete.
- `400 Bad Request`: malformed/invalid input.
- `401 Unauthorized`: missing/invalid/expired JWT or invalid credentials.
- `403 Forbidden`: reserved for the SRS password-change incorrect-current-password case if FR-007 is later implemented.
- `404 Not Found`: missing record; also used for another member''s reading-list entry.
- `409 Conflict`: duplicate email, duplicate reading-list entry, ISBN conflict if later implemented, or author deletion blocked by linked books.

## Error shape

Every error response must use:

```json
{
  "statusCode": 400,
  "message": ["A field-specific validation message"],
  "error": "Bad Request"
}
```

`message` may be a string or array as appropriate, but standardize one shape across all errors and ensure validation errors identify failing fields. Do not leak stack traces, secrets, hashes or internal database details.

## Pagination

Use one documented response structure consistently. It must include:
- `items`
- `total`
- `page`
- `pageSize`

Default page size is 20; maximum is 100. If the repository already has a convention, inspect it and document the decision before changing it.
'@
$documents['WEB_CLIENT.md'] = @'
# Web Client Requirements

## Stack and principles

- Next.js App Router + TypeScript.
- Web client calls the NestJS REST API; it must not query PostgreSQL directly.
- Keep route pages focused and put reusable UI in appropriately named components.
- Provide loading, empty, success and error states for data-driven pages.
- Forms need labels, keyboard access and field-level validation messages.
- Work down to 360px viewport width and support current desktop Chrome, Firefox, Safari and Edge.

## Routes

- `/signup`: email/password registration.
- `/signin`: email/password sign-in.
- `/`: reading-list summary and recent books if implemented within approved scope; summary counts are COULD.
- `/authors`: paginated author list, search and create entry point.
- `/authors/new`: create author form.
- `/authors/[id]`: author details, all books ordered by title, creator attribution, edit/delete controls.
- `/books`: paginated book list with author name, search and author filter.
- `/books/new`: create book form with existing-author selection.
- `/books/[id]`: book details including author and current member''s reading-list state, plus approved edit/delete/status controls.
- `/reading-list`: current member''s list with status filters.
- `/profile`: current member name and profile editing. Password change is COULD and should remain out of scope unless reprioritized.

## Session rules

- Visitor can access signup/signin only under current requirements.
- Protected pages redirect to `/signin` if the member is not authenticated.
- Sign-out clears the selected client session mechanism and protected pages no longer render as authenticated.
- OQ-01 is unresolved. Do not implement final token persistence before the user approves a storage approach.
- If httpOnly cookies via the Next.js server are selected, explicitly design API forwarding and CSRF/origin protections. Do not expose the cookie to client-side JavaScript.

## UX behaviour

- Confirm destructive deletes.
- If author deletion fails because books exist, show the server''s 409 message and linked-book count.
- Show duplicate reading-list add conflicts in a user-friendly way.
- Preserve list filters and useful context when navigating back from detail pages where practical.
- Do not pretend UI controls enforce security; the API remains authoritative.
- Use clear labels for statuses: “Want to read”, “Reading”, “Read”, while persisting exact enum values.

## Accessibility acceptance

- Every form field has a visible programmatic label.
- Every action is keyboard reachable and has a visible focus indicator.
- Errors are announced/displayed adjacent to the relevant field.
- Do not use color alone to convey status.
- Verify Lighthouse accessibility score ≥90 on every page in the SRS route list and manually keyboard-test UC-01–UC-07.
'@
$documents['CODING_STANDARDS.md'] = @'
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
'@
$documents['SECURITY.md'] = @'
# Security Requirements

These are non-negotiable requirements from the PRD/SRS unless the user explicitly changes the product specification.

## Authentication

- Hash passwords using bcrypt or argon2 with a unique salt.
- Never store plaintext passwords.
- Never return or log password/hash values.
- Use a signed JWT with configurable expiration; default is one hour.
- Verify signature and expiry on every protected API request.
- Unknown email and wrong password must return identical 401 responses.
- Store JWT secrets only in environment variables.

## Authorization

- Enforce authorization in the NestJS API, not only by hiding UI controls.
- Scope every reading-list query, update and delete by the authenticated member ID.
- Return 404 when one member attempts to access another member''s reading-list entry by ID.
- A member cannot spoof ownership by supplying a user ID in request data.
- All catalogue members have the same CRUD permissions in v1.0; do not invent an admin role.

## Input and output safety

- Validate all request bodies using DTOs and the global `ValidationPipe`.
- Reject unknown properties.
- Trim text fields and reject empty values where required.
- Do not expose password hashes, JWT secrets, database URLs, stack traces or internal details.
- Keep errors consistent and useful without leaking sensitive implementation information.

## Secrets and configuration

- Commit `.env.example` with every required environment variable and safe placeholders.
- Ensure `.env`, test secrets and local database files are ignored by Git.
- Do not put secrets in source code, logs, client bundles or documentation.
- Run a secret scan such as gitleaks before a release gate is considered complete.

## Data integrity

- Enforce one entry per `(userId, bookId)` with a composite unique constraint.
- Use `Restrict` for deleting authors with books and `Cascade` for deleting a book''s reading entries.
- Use `SetNull` for creator attribution when a user is deleted.
- Use committed migrations and test constraints against PostgreSQL.

## Token storage open question

OQ-01 is unresolved. Do not choose localStorage, sessionStorage or httpOnly cookie silently. Ask for an explicit choice before final session implementation. If httpOnly cookies are chosen, evaluate CSRF protection and server-side forwarding. If client-readable storage is chosen, document the accepted XSS/token-theft risk and mitigation expectations.

## Future public launch

The SRS states that the project currently stores test data and is not offered publicly. Before real users are admitted, review personal-data handling against the Kenya Data Protection Act, 2019 and reassess operational security.
'@
$documents['TESTING_AND_QUALITY.md'] = @'
# Testing and Quality Strategy

## Test layers

1. **Unit tests:** service business rules, validation helpers and transformations.
2. **API E2E tests:** run against a disposable PostgreSQL test database and exercise the real HTTP API.
3. **Web checks:** lint, type-check, component/form tests where configured, and manual route journeys.
4. **Database checks:** migrations from an empty database, migration status/no drift, referential actions and repeatable seed.
5. **Quality checks:** accessibility audit, secret scan and performance measurement.

## Required API scenarios

### Auth
- Signup accepts valid email and password length 8–72.
- Email uniqueness is case-insensitive.
- Invalid email/password returns 400 with field-specific details.
- Hash is stored; neither password nor hash is returned or logged.
- Wrong password and unknown email return identical 401.
- Missing, invalid-signature and expired JWT return 401 on every protected endpoint.
- Token expiration defaults to one hour and is configurable.

### Authors
- Create validates name and bio lengths.
- List defaults to 20, sorted case-insensitively; includes pagination metadata.
- Detail includes every book sorted by title, including empty list when none.
- Partial update only changes supplied fields.
- Delete empty author returns 204; later GET returns 404.
- Delete author with N books returns 409 naming N and changes nothing.
- Creator attribution shows member name/email or “Unknown” after account deletion.

### Books
- Create requires title and an existing author.
- List is sorted case-insensitively by title and includes author ID/name.
- Filter by author returns only matching books.
- Update can reassign author.
- Delete returns 204 and removes reading entries for every member.
- Unknown related author ID returns 400 naming `authorId`.

### Reading list
- Add defaults to `WANT_TO_READ`.
- Duplicate add for same member/book returns 409.
- Two members can add the same book independently.
- All three status values are accepted from any previous status; invalid value returns 400.
- Removal returns 204 and leaves catalogue book intact.
- Filter by status returns only matching entries, most recently updated first.
- Two-member isolation: no list response includes another member''s entries.
- Access/update/delete another member''s entry returns 404 and changes nothing.

### Shared validation and errors
- Malformed UUID path ID → 400; valid but missing ID → 404.
- Unknown properties on every write endpoint → 400.
- Error responses for 400/401/404/409 have `statusCode`, `message`, `error`.
- Pagination default 20; maximum 100; limit above 100 → 400.

## Quality targets from SRS

- Service layer line coverage ≥70%.
- Every endpoint has at least one successful and one failing E2E test.
- `npm run test:e2e` passes.
- p95 ≤300 ms for list/detail endpoints with 1,000 authors and 10,000 books, measured locally with autocannon, 10 connections for 30 seconds.
- Lighthouse accessibility ≥90 on all listed pages.
- Manual keyboard-only test for UC-01 to UC-07.
- gitleaks scan: zero findings.
- `prisma migrate status` reports no drift and clean database builds from migrations alone.
- Seed creates at least 10 authors, 30 books and 2 members; running twice creates no duplicates or errors.

## Reporting

For each gate, report commands actually run and their outcomes. Distinguish:
- PASS — command/test ran and passed.
- FAIL — command/test ran and failed.
- NOT RUN — not executed.
- BLOCKED — unable to execute, with reason and next step.

Do not describe unexecuted checks as passing.
'@
$documents['IMPLEMENTATION_PLAN.md'] = @'
# Guided Implementation Plan

Implement in small vertical slices. Do not move to the next gate until exit criteria are met, or a deferral is explicitly approved and recorded.

## Phase 0 — Repository inspection and decisions

1. Inspect repository and existing files.
2. Read this docs folder and source PRD/SRS.
3. Identify existing schema/code and preserve useful work.
4. Resolve implementation tooling decisions (workspace layout, versions, scripts, PostgreSQL local setup).
5. Resolve OQ-01 before final session/token persistence is built.
6. Record decisions before scaffolding.

**Exit:** agreed repo layout, toolchain, local database approach, auth-session approach or a clearly isolated temporary auth spike.

## Phase 1 — G1 Foundation

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

## Phase 2 — G2 Catalogue

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

## Phase 3 — G3 Reading List

1. Implement `ReadingListModule`.
2. Add member-scoped list query, status filter, add, update status and remove.
3. Enforce database composite uniqueness and handle duplicate conflict as 409.
4. Enforce ownership in every query/mutation; other-member entry IDs return 404.
5. Build `/reading-list` with status filters and appropriate states.
6. Add two-member privacy E2E tests.
7. Verify G3.

**Exit:** FR-030–035 pass, including cross-member privacy tests.

## Phase 4 — G4 v1.0 completion

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

## Phase 5 — COULD backlog

Do not start until G4 exit. Potential backlog: FR-007 password change, FR-016 duplicate author warning, FR-026 ISBN/year, FR-037 timestamps, FR-042 author counts, FR-043 dashboard counts, NFR-012 OpenAPI docs. Choose items individually against the learning objectives.

## Task sizing

Each task should normally fit in one focused implementation loop and produce:
- A clear outcome.
- Relevant requirement IDs.
- Tests.
- A small reviewable diff.
- Updated `PROGRESS.md`.

If a task spans multiple modules or requires an unresolved product decision, split it.
'@
$documents['DEFINITION_OF_DONE.md'] = @'
# Definition of Done

## For every task

- [ ] Task has a clear objective and requirement IDs.
- [ ] Implementation follows approved architecture and scope.
- [ ] Input validation and error handling are included.
- [ ] Authorization is enforced server-side where relevant.
- [ ] Unit tests are added/updated for business logic.
- [ ] API E2E tests are added/updated for endpoint behaviour.
- [ ] Formatting, lint and type-check run where available.
- [ ] Relevant tests actually run; results are reported accurately.
- [ ] No secret, password, hash or token is logged or committed.
- [ ] No unrelated refactor or unapproved dependency is included.
- [ ] Docs and `PROGRESS.md` are updated.
- [ ] Diff has been reviewed for scope and security regressions.

## For a release gate

- [ ] Every requirement listed for the gate is mapped to implementation and tests.
- [ ] Database migrations apply from an empty database.
- [ ] No migration drift.
- [ ] Error response and validation conventions are consistent.
- [ ] Auth and privacy tests call the API directly, without relying on UI restrictions.
- [ ] Known gaps are listed and approved deferrals are recorded.
- [ ] All gate exit criteria in `REQUIREMENTS_TRACEABILITY.md` pass.

## Final v1.0 checks

- [ ] All MUST and SHOULD requirements pass, or a documented deferral is approved.
- [ ] Service line coverage ≥70%.
- [ ] Every endpoint has at least one successful and one failing E2E test.
- [ ] Seed creates at least 10 authors, 30 books and 2 members and is repeatable.
- [ ] Performance target tested at 1,000 authors and 10,000 books.
- [ ] Lighthouse accessibility ≥90 for all specified pages.
- [ ] Keyboard-only UC-01–UC-07 journey passes.
- [ ] gitleaks reports zero findings.
- [ ] README setup takes ten steps or fewer.
'@
$documents['PROGRESS.md'] = @'
# Implementation Progress

> The agent must update this file after every implementation task. Never mark a requirement complete without evidence.

## Current status

- Current gate: Phase 0 — Repository inspection and decisions
- Last updated: Not started
- Overall status: Not started
- Current blocker: OQ-01 token storage/session architecture must be decided before final session persistence.

## Gate status

| Gate | Status | Evidence / notes |
|---|---|---|
| Phase 0 — Inspection and decisions | NOT STARTED | Inspect repository; agree toolchain/layout; resolve OQ-01 |
| G1 — Foundation | NOT STARTED | |
| G2 — Catalogue | NOT STARTED | |
| G3 — Reading list | NOT STARTED | |
| G4 — v1.0 | NOT STARTED | |
| COULD backlog | NOT STARTED | Start only after G4 or explicit reprioritization |

## Completed tasks

- None yet.

## Current task

- Inspect repository, read all docs, identify existing code and report implementation/tooling decisions that need approval.

## Known gaps and approved deferrals

- None yet.

## Evidence log

Append dated entries with:
- Task and requirement IDs.
- Files changed.
- Commands/tests run and exact outcomes.
- Decisions made.
- Follow-up task.
'@
$documents['BASE_PROMPT.md'] = @'
# Base Prompt — Authors & Books Tracker (ABT)

You are the implementation agent for Authors & Books Tracker (ABT). Your task is to build the application incrementally and correctly, not to generate a large amount of code in one pass.

## First actions

1. Inspect the repository root and identify existing code, package managers, scripts and database setup. Do not overwrite existing work.
2. Read all files in `docs/`, beginning with `docs/AGENT_INSTRUCTIONS.md`.
3. If the original `DM-PRD-ABT-001` and `DM-SRS-ABT-001` documents are present, read them too. They are the authoritative source for requirements.
4. Summarize the current repository state, the first implementation gate, and any decisions that block work.
5. Do not implement final JWT storage/session persistence until OQ-01 is explicitly resolved.
6. Ask for approval before destructive changes, large scaffolding or architecture-changing choices. You may proceed with small, reversible work once the relevant gate and decisions are approved.

## Mandatory implementation rules

- Follow `docs/AGENT_INSTRUCTIONS.md`, `PRODUCT_AND_SCOPE.md`, `REQUIREMENTS_TRACEABILITY.md`, `ARCHITECTURE.md`, `DATA_MODEL.md`, `API_CONTRACT.md`, `WEB_CLIENT.md`, `CODING_STANDARDS.md`, `SECURITY.md`, `TESTING_AND_QUALITY.md`, `IMPLEMENTATION_PLAN.md` and `DEFINITION_OF_DONE.md`.
- Use the fixed stack: Next.js App Router + TypeScript, NestJS + TypeScript, Prisma and PostgreSQL.
- Implement MUST first, SHOULD next, COULD only after G4 or explicit reprioritization.
- Preserve product decisions D-01 through D-05.
- Keep business logic in API services, validation in DTOs, and persistence through Prisma.
- Enforce reading-list ownership in the API for every query and mutation.
- Apply every schema change through a committed Prisma migration.
- Add tests with each feature; do not claim tests passed unless run.
- Do not add unrequested integrations, roles, features or dependencies.
- Update `docs/PROGRESS.md` after every meaningful task.

## Work loop

For each task, tell me:
1. Goal and relevant requirement IDs.
2. Files/modules you expect to touch.
3. Acceptance criteria and tests.
4. Any assumptions or unresolved decisions.

Then implement the smallest coherent slice, run available checks, review the diff, update docs and report:
- What changed.
- Requirements addressed.
- Commands/tests actually run and outcomes.
- Known gaps/blockers.
- Recommended next task.

Begin now with repository inspection and documentation review. Do not scaffold the entire product immediately. Propose the first focused task after reporting what you found.
'@

foreach ($name in $documents.Keys) {
    $destination = Join-Path $docsPath $name
    if ((Test-Path $destination) -and -not $Force) {
        throw "File already exists: $destination. Re-run with -Force to overwrite matching files."
    }
    Set-Content -LiteralPath $destination -Value $documents[$name] -Encoding utf8
    Write-Host "Created $destination"
}

Write-Host ""
Write-Host "ABT documentation created at: $docsPath" -ForegroundColor Green
Write-Host "Next: review docs/OPEN_QUESTIONS_AND_DECISIONS.md, then paste BASE_PROMPT.md into Claude Code."
