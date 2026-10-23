# Authors & Books Tracker (ABT) â€” Agent Documentation

These documents guide an AI coding agent through implementation of Authors & Books Tracker (ABT). They are derived from:

- `DM-PRD-ABT-001_Authors_Books_Tracker.docx` v0.1
- `DM-SRS-ABT-001_Authors_Books_Tracker.docx` v0.1

## Read order

1. `AGENT_INSTRUCTIONS.md` â€” mandatory operating rules.
2. `PRODUCT_AND_SCOPE.md` â€” product goals, scope and decisions.
3. `REQUIREMENTS_TRACEABILITY.md` â€” requirements and acceptance gates.
4. `OPEN_QUESTIONS_AND_DECISIONS.md` â€” unresolved questions that must not be silently guessed.
5. `ARCHITECTURE.md` â€” fixed architecture and module boundaries.
6. `DATA_MODEL.md` â€” entities, constraints and referential actions.
7. `API_CONTRACT.md` â€” routes and shared API behaviour.
8. `WEB_CLIENT.md` â€” pages, client behaviour and session requirements.
9. `CODING_STANDARDS.md` â€” implementation conventions.
10. `SECURITY.md` â€” non-negotiable security requirements.
11. `TESTING_AND_QUALITY.md` â€” test strategy and measurable quality targets.
12. `IMPLEMENTATION_PLAN.md` â€” staged delivery and gate exit criteria.
13. `DEFINITION_OF_DONE.md` â€” completion checklist for every task and gate.
14. `PROGRESS.md` â€” update this as work advances.

The PRD and SRS remain the source of truth for product requirements. If a conflict or ambiguity is found, stop, document it, and ask for a decision rather than inventing a product rule.

## Intended repository layout

The docs can be created in the project root. A recommended implementation layout is:

```text
/
â”œâ”€â”€ apps/
â”‚   â”œâ”€â”€ api/             # NestJS REST API
â”‚   â””â”€â”€ web/             # Next.js App Router web client
â”œâ”€â”€ packages/            # Only introduce shared packages if justified
â”œâ”€â”€ docs/
â”œâ”€â”€ .env.example
â”œâ”€â”€ .gitignore
â”œâ”€â”€ README.md
â””â”€â”€ package.json         # Root workspace scripts if a monorepo is chosen
```

This layout is a recommendation for organizing the fixed stack, not a decision already specified by the PRD/SRS. Choose and document the package manager/workspace approach before scaffolding.

## Source documents

Keep the original PRD and SRS available to the coding agent. They may be placed in `docs/source/` if desired. Do not overwrite them with summaries.
