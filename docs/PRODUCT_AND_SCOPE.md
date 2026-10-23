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
