# Code Review Checklist — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## How to Use

Reviewers walk through this checklist for every PR. Not all sections apply to every change — skip irrelevant sections with a note.

---

## Correctness

- [ ] Logic matches ticket acceptance criteria
- [ ] Edge cases handled (empty input, not found, concurrent access)
- [ ] Error paths return correct HTTP status and RFC 7807 body
- [ ] No regressions in related functionality

## Security (Required for All PRs)

- [ ] Authentication required on protected routes
- [ ] RBAC checked for role-appropriate access
- [ ] No secrets, API keys, or credentials in code
- [ ] No PII logged (names, emails, DOB, passwords)
- [ ] User input validated server-side
- [ ] SQL injection prevented (parameterized queries)

## High-Risk Areas (When Applicable)

### Auth / JWT
- [ ] Token expiry unchanged without explicit approval
- [ ] Refresh token rotation preserved
- [ ] Rate limiting on login intact

### WebSocket / Matches
- [ ] Server-authoritative scoring unchanged
- [ ] Reconnect logic tested
- [ ] Anti-cheat events still processed

### AI / Question Import
- [ ] AI content enters as `draft` only
- [ ] No PII sent to AI provider
- [ ] Duplicate detection still runs

### Database
- [ ] Migration is reversible or rollback documented
- [ ] Indexes added for new queries
- [ ] Soft delete respected

## Code Quality

- [ ] Readable, follows existing patterns
- [ ] No unnecessary abstraction or dead code
- [ ] Types are accurate (no unjustified `any`)
- [ ] Functions are focused; files not excessively long

## Tests

- [ ] New logic has unit tests
- [ ] API changes have integration tests
- [ ] Tests are meaningful (not just coverage padding)
- [ ] All CI tests pass

## API & Docs

- [ ] OpenAPI updated if routes changed
- [ ] `.env.example` updated if new env vars
- [ ] Breaking changes called out in PR description

## Frontend (When Applicable)

- [ ] Accessible: keyboard nav, ARIA labels, color contrast
- [ ] Loading, empty, and error states handled
- [ ] Responsive on mobile viewport
- [ ] No hardcoded strings that should be i18n-ready (Phase 2)

## Performance

- [ ] No N+1 queries introduced
- [ ] Appropriate caching or cache invalidation
- [ ] Large lists paginated

---

## Review Outcomes

| Outcome | Action |
|---|---|
| Approve | All required checks pass |
| Request changes | Block merge; list specific items |
| Comment | Non-blocking suggestions |

---

*See `Definition-of-Done.md` for merge gates and `Auth-Security.md` for security baseline.*
