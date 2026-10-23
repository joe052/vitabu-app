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
