# Definition of Done — MathBattle Engineering

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

A work item is **Done** only when all criteria below are met. This applies to human engineers and AI agents.

---

## Story / Task Checklist

### Code
- [ ] Implementation matches acceptance criteria in ticket
- [ ] Code follows project conventions (see `AGENTS.md`, `AI-Agent-Rules.md`)
- [ ] No commented-out code, TODO placeholders, or debug logging left behind
- [ ] TypeScript strict mode passes with no `any` without documented justification

### Testing
- [ ] Unit tests cover success and failure paths for new logic
- [ ] Integration tests added for API endpoints and DB interactions (where applicable)
- [ ] Existing tests pass locally and in CI
- [ ] High-risk areas (auth, WebSocket, AI import) have explicit integration test evidence

### API & Contracts
- [ ] OpenAPI spec updated if endpoints changed (`docs/03-architecture/openapi/openapi.yaml`)
- [ ] Response envelopes match `API-Design.md` (RFC 7807 errors)
- [ ] Breaking changes documented in PR description

### Database
- [ ] Schema changes delivered as migration script only (no manual DB edits)
- [ ] Migration tested locally (`npm run db:migrate` + rollback if supported)
- [ ] Indexes added per `Indexing-Strategy.md` for new query patterns

### Security
- [ ] JWT/RBAC enforced on new endpoints
- [ ] No PII in logs or AI prompts
- [ ] Input validated server-side
- [ ] High-risk changes reviewed by 2 engineers

### Quality
- [ ] ESLint and Prettier pass (`npm run lint`)
- [ ] No new critical/high dependency vulnerabilities
- [ ] Accessibility: new UI meets WCAG 2.1 AA (keyboard nav, contrast, labels)

### Documentation
- [ ] README or inline docs updated if setup/usage changed
- [ ] Environment variables added to `.env.example` if new config introduced

### Review & Merge
- [ ] PR opened with completed template checklist
- [ ] At least 1 approval (2 for high-risk)
- [ ] CI green
- [ ] Squash merged to `main`

---

## Release Definition of Done (MVP)

- [ ] All Phase 1 acceptance criteria in `02-requirements/Acceptance-Criteria.md` met
- [ ] Load test baseline passed (1,000 concurrent users)
- [ ] Security scan: zero critical/high findings
- [ ] Staging sign-off from Product and QA
- [ ] Runbook and deployment checklist completed

---

*See `Code-Review-Checklist.md` for reviewer guidance and `ai/AI-Definition-of-Done.md` for AI agent-specific gates.*
