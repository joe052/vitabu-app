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
- `name`: required, 1â€“200 characters; indexed, not unique.
- `bio`: optional, maximum 5,000 characters.
- `createdById`: optional FK to `User`, `onDelete: SetNull`.
- `createdAt`, `updatedAt`.
- Has many `Book`.
- Deletion is prohibited while books reference the author; use `onDelete: Restrict`.

## Book

- `id`: UUID string primary key.
- `title`: required, 1â€“300 characters.
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
