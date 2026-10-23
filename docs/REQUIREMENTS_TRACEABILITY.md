# Requirements Traceability and Acceptance Gates

The PRD/SRS are authoritative. Keep requirement IDs stable in commits, tests, task notes and progress reports.

## Release gates

### G1 â€” Foundation
Must pass: FR-001â€“004, FR-006; NFR-001, NFR-003, NFR-004, NFR-005, NFR-007.
- Registration, sign-in, JWT protection and sign-out work end-to-end.
- Prisma schema changes for the foundational data model are migrated.
- Environment example and safe configuration exist.
- Referential integrity, shared error format and strict request validation are verified.
- Seed script exists and is repeatable as scoped by the SRS.

### G2 â€” Catalogue
Must pass: FR-010â€“014, FR-020â€“025; NFR-006.
- Author and book CRUD works.
- Pagination defaults to 20 and caps at 100.
- Lists sort case-insensitively by name/title.
- Book filtering by author works.
- Author deletion with linked books returns 409 and leaves data unchanged.
- Book deletion removes its reading-list entries.

### G3 â€” Reading list
Must pass: FR-030â€“035.
- Member can add, change status and remove a book from their list.
- Duplicate member/book entry returns 409.
- Reading-list results can be filtered by status.
- All reads/updates/deletes are scoped to the authenticated member.
- Attempts to access another member''s entry return 404.

### G4 â€” v1.0
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
| FR-010â€“015 | MUST/SHOULD | Authors | Create/list/detail/update/delete rules and creator attribution |
| FR-016 | COULD | Duplicate-author warning | Backlog |
| FR-020â€“025 | MUST | Books | Create/list/detail/update/delete, author relation and author filter |
| FR-026 | COULD | ISBN/year | Backlog |
| FR-027 | SHOULD | Book attribution | Creator attribution |
| FR-030â€“035 | MUST | Reading list | Add/default status, uniqueness, status change, removal, filter, privacy |
| FR-036 | SHOULD | Book detail | Own status and add/change/remove control |
| FR-037 | COULD | Reading timestamps | Backlog |
| FR-040â€“041 | SHOULD | Search | Case-insensitive partial book title/author name |
| FR-042â€“043 | COULD | Counts/dashboard | Backlog |

## Shared SRS behaviour

- Every endpoint except signup and signin requires a valid token.
- Malformed UUID path parameter â†’ HTTP 400; valid UUID with no record â†’ HTTP 404.
- Request body referencing a nonexistent record â†’ HTTP 400 naming the field.
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
- NFR-009: service line coverage â‰¥70%; each endpoint has at least one success and one failure E2E test; `npm run test:e2e` passes.
- NFR-010: p95 â‰¤300 ms with 1,000 authors and 10,000 books using autocannon (10 connections, 30 seconds).
- NFR-011: Lighthouse accessibility â‰¥90 on each specified page; keyboard-only UC-01â€“UC-07 pass.
- NFR-012: OpenAPI docs at `/docs`; README fresh setup in â‰¤10 steps. COULD/backlog.

## Requirement-to-test convention

Name tests with the requirement or AC identifier where practical, e.g. `FR-035 AC-035.1: member cannot access another member''s entry`. Add a short note in `PROGRESS.md` when any criterion is deferred.
