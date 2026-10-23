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
