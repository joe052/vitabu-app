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
- [ ] Service line coverage â‰¥70%.
- [ ] Every endpoint has at least one successful and one failing E2E test.
- [ ] Seed creates at least 10 authors, 30 books and 2 members and is repeatable.
- [ ] Performance target tested at 1,000 authors and 10,000 books.
- [ ] Lighthouse accessibility â‰¥90 for all specified pages.
- [ ] Keyboard-only UC-01â€“UC-07 journey passes.
- [ ] gitleaks reports zero findings.
- [ ] README setup takes ten steps or fewer.
