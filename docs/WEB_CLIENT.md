# Web Client Requirements

## Stack and principles

- Next.js App Router + TypeScript.
- Web client calls the NestJS REST API; it must not query PostgreSQL directly.
- Keep route pages focused and put reusable UI in appropriately named components.
- Provide loading, empty, success and error states for data-driven pages.
- Forms need labels, keyboard access and field-level validation messages.
- Work down to 360px viewport width and support current desktop Chrome, Firefox, Safari and Edge.

## Routes

- `/signup`: email/password registration.
- `/signin`: email/password sign-in.
- `/`: reading-list summary and recent books if implemented within approved scope; summary counts are COULD.
- `/authors`: paginated author list, search and create entry point.
- `/authors/new`: create author form.
- `/authors/[id]`: author details, all books ordered by title, creator attribution, edit/delete controls.
- `/books`: paginated book list with author name, search and author filter.
- `/books/new`: create book form with existing-author selection.
- `/books/[id]`: book details including author and current member''s reading-list state, plus approved edit/delete/status controls.
- `/reading-list`: current member''s list with status filters.
- `/profile`: current member name and profile editing. Password change is COULD and should remain out of scope unless reprioritized.

## Session rules

- Visitor can access signup/signin only under current requirements.
- Protected pages redirect to `/signin` if the member is not authenticated.
- Sign-out clears the selected client session mechanism and protected pages no longer render as authenticated.
- OQ-01 is unresolved. Do not implement final token persistence before the user approves a storage approach.
- If httpOnly cookies via the Next.js server are selected, explicitly design API forwarding and CSRF/origin protections. Do not expose the cookie to client-side JavaScript.

## UX behaviour

- Confirm destructive deletes.
- If author deletion fails because books exist, show the server''s 409 message and linked-book count.
- Show duplicate reading-list add conflicts in a user-friendly way.
- Preserve list filters and useful context when navigating back from detail pages where practical.
- Do not pretend UI controls enforce security; the API remains authoritative.
- Use clear labels for statuses: â€œWant to readâ€, â€œReadingâ€, â€œReadâ€, while persisting exact enum values.

## Accessibility acceptance

- Every form field has a visible programmatic label.
- Every action is keyboard reachable and has a visible focus indicator.
- Errors are announced/displayed adjacent to the relevant field.
- Do not use color alone to convey status.
- Verify Lighthouse accessibility score â‰¥90 on every page in the SRS route list and manually keyboard-test UC-01â€“UC-07.
