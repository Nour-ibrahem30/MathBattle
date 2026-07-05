# AI Phase Prompts — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Ready-to-use prompts for AI agents starting each implementation phase. Customize `{TICKET_ID}` and specific scope as needed.

---

## Phase 0 — Foundation

```
You are implementing MathBattle Sprint 0 foundation.

Read first:
- docs/03-architecture/System-Architecture.md
- docs/03-architecture/ERD.md (identity tables)
- docs/03-architecture/Auth-Security.md
- docs/03-architecture/API-Design.md
- ai/AI-Agent-Rules.md

Task: {TICKET_ID} — Set up NestJS project with auth module.
Requirements:
- JWT RS256 with refresh token rotation
- Register, login, refresh, logout endpoints
- bcrypt password hashing (cost ≥ 12)
- Rate limiting on login (5/15min/IP)
- Audit log on login/register
- OpenAPI spec updated
- Unit + integration tests
- Follow Definition of Done in docs/06-engineering/Definition-of-Done.md
```

---

## Phase 1 — Learning Core

```
You are implementing MathBattle learning module.

Read first:
- docs/02-requirements/FRS-Detailed.md §2 (Learning)
- docs/03-architecture/ERD.md §7-12
- docs/03-architecture/Domain-Model.md (Learning context)

Task: {TICKET_ID} — Implement lesson attempt flow.
Requirements:
- Start attempt (one in_progress per student per lesson)
- Submit answers with immediate feedback
- Complete attempt with score calculation and XP event
- Prerequisites enforced
- RBAC: student role only for own attempts
- Tests for success, duplicate attempt, prerequisite block
```

---

## Phase 2 — Question Bank + AI

```
You are implementing MathBattle question bank and AI generation.

Read first:
- docs/03-architecture/AI-Architecture.md
- docs/03-architecture/Queue-and-Jobs-Architecture.md
- docs/03-architecture/Compliance-Architecture.md (no PII to AI)

Task: {TICKET_ID} — Implement AI question generation.
Requirements:
- Enqueue job to ai-jobs queue
- Use mock provider in development
- Store results as draft questions only
- Teacher review endpoint before publish
- No PII in prompts (grade, subject, topic only)
- Retry logic: 3 attempts, exponential backoff
- Tests with mock provider
```

---

## Phase 3 — Matches

```
You are implementing MathBattle WebSocket match server.

Read first:
- docs/03-architecture/Component-Architecture.md (WS section)
- docs/03-architecture/Caching-Strategy.md (match state)
- docs/03-architecture/Auth-Security.md (WS auth)
- AGENTS.md high-risk flows section

Task: {TICKET_ID} — Implement match engine.
Requirements:
- JWT auth on WebSocket connect
- 10 cards per match, weighted random colors
- Server-authoritative answer validation
- 30s timer per card
- Anti-cheat: focus loss detection
- Reconnect with 30s state recovery from Redis
- Persist result to PostgreSQL on completion
- Integration tests for full match flow
- Request human review before merge
```

---

## Phase 4 — Gamification + Classroom

```
You are implementing MathBattle gamification engine.

Read first:
- docs/03-architecture/ERD.md §18-22
- docs/03-architecture/Domain-Model.md (Gamification context)

Task: {TICKET_ID} — Implement XP and rank system.
Requirements:
- Award XP on lesson completion and match results
- Rank thresholds: novice(0) → legend(10000+)
- XP history record for every award
- Idempotent XP award (no double-counting)
- Event-driven: listen to LessonAttemptCompleted, MatchCompleted
- Tests for rank upgrade boundary conditions
```

---

## Phase 5 — Admin + Polish

```
You are implementing MathBattle admin module.

Read first:
- docs/04-ux-and-flows/Admin-Flows.md
- docs/03-architecture/Audit-Logging-Strategy.md

Task: {TICKET_ID} — Implement admin user management.
Requirements:
- List/create/edit/suspend users (school-scoped)
- Admin role required; operator for cross-school
- Suspend revokes all refresh tokens
- Audit log every mutation
- Parental consent resend for under-13 students
- Tests for RBAC isolation between schools
```

---

## General Prompt Suffix

Add to any prompt:

```
Constraints:
- Minimize scope; only change files required for this task
- Do not delete unrelated docstrings or comments
- Never commit secrets
- Run lint and tests before reporting complete
- Report handoff per ai/AI-Definition-of-Done.md
```

---

*See `ai/AI-Implementation-Backlog.md` for task IDs and `ai/AI-Team-Routing.md` for agent selection.*
