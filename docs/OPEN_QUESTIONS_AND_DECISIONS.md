# Open Questions and Decision Register

## Rule

Do not silently answer an open question. If it blocks the next task, explain the trade-off and ask the user to decide. Once decided, record the answer, date and rationale here. Never rewrite an existing decision history; append a new entry when a decision changes.

## Open questions from the PRD/SRS

### OQ-01 â€” Where should the JWT be stored? (Blocks final auth/session implementation)

Options in PRD:
- **A. httpOnly cookie via the Next.js server** â€” the PRD labels this as preferred because browser scripts cannot directly read an httpOnly cookie. Requires a deliberate web-to-API session/proxy design and CSRF considerations.
- **B. Client-side storage** â€” simpler direct bearer-token calls, but the PRD identifies token theft through XSS as a risk.

SRS says protected API requests use `Authorization: Bearer <token>`. The client token-storage choice is unresolved. Do not assume that a cookie design and direct browser-to-API bearer calls are interchangeable. Ask for approval before implementing final session storage. If the user approves option A, document how the Next.js server forwards the bearer token and how CSRF/origin protections work.

**Status:** Open.

### OQ-02 â€” Deployment target

Deployment is not defined. Keep development local. Do not introduce cloud hosting, CI/CD provider-specific infrastructure or production environment assumptions until the user chooses a target.

**Status:** Open; not a blocker for local development.

### OQ-03 â€” Can visitors browse the catalogue read-only?

PRD/SRS currently describe visitors as sign-up/sign-in only and say all endpoints except signup/signin require JWT. The open question asks whether read-only public catalogue access is desired. Until decided otherwise, enforce the current documented rule: visitor has no catalogue access.

**Status:** Open; implement the current documented behaviour unless the user explicitly changes it.

### OQ-04 â€” Future co-authorship model

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
### DEC-XXX â€” Short title
- Status: Proposed | Accepted | Rejected | Superseded
- Date:
- Decision:
- Rationale:
- Alternatives:
- Impacted docs/requirements:
- Approved by:
```
