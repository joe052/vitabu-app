# Testing and Quality Strategy

## Test layers

1. **Unit tests:** service business rules, validation helpers and transformations.
2. **API E2E tests:** run against a disposable PostgreSQL test database and exercise the real HTTP API.
3. **Web checks:** lint, type-check, component/form tests where configured, and manual route journeys.
4. **Database checks:** migrations from an empty database, migration status/no drift, referential actions and repeatable seed.
5. **Quality checks:** accessibility audit, secret scan and performance measurement.

## Required API scenarios

### Auth
- Signup accepts valid email and password length 8â€“72.
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
- Creator attribution shows member name/email or â€œUnknownâ€ after account deletion.

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
- Malformed UUID path ID â†’ 400; valid but missing ID â†’ 404.
- Unknown properties on every write endpoint â†’ 400.
- Error responses for 400/401/404/409 have `statusCode`, `message`, `error`.
- Pagination default 20; maximum 100; limit above 100 â†’ 400.

## Quality targets from SRS

- Service layer line coverage â‰¥70%.
- Every endpoint has at least one successful and one failing E2E test.
- `npm run test:e2e` passes.
- p95 â‰¤300 ms for list/detail endpoints with 1,000 authors and 10,000 books, measured locally with autocannon, 10 connections for 30 seconds.
- Lighthouse accessibility â‰¥90 on all listed pages.
- Manual keyboard-only test for UC-01 to UC-07.
- gitleaks scan: zero findings.
- `prisma migrate status` reports no drift and clean database builds from migrations alone.
- Seed creates at least 10 authors, 30 books and 2 members; running twice creates no duplicates or errors.

## Reporting

For each gate, report commands actually run and their outcomes. Distinguish:
- PASS â€” command/test ran and passed.
- FAIL â€” command/test ran and failed.
- NOT RUN â€” not executed.
- BLOCKED â€” unable to execute, with reason and next step.

Do not describe unexecuted checks as passing.
