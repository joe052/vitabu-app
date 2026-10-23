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
- Signup password length: 8â€“72 characters.
- Author name: 1â€“200; biography â‰¤5,000.
- Book title: 1â€“300; description â‰¤5,000.
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
