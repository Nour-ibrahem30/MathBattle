# Architecture Decision Records (ADR) — MathBattle

**Version:** 1.0.0

---

## Purpose

ADRs document significant architectural decisions, their context, and consequences. Each ADR is immutable once accepted; superseded decisions get a new ADR referencing the old one.

---

## Format

```markdown
# ADR-NNN: Title

**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-XXX
**Date:** YYYY-MM-DD
**Deciders:** Names

## Context
What is the issue?

## Decision
What was decided?

## Consequences
What are the positive and negative outcomes?
```

---

## Index

| ADR | Title | Status | Date |
|---|---|---|---|
| [ADR-001](file:///I:/MathBattle/docs/03-architecture/ADR/ADR-001-modular-monolith.md) | Modular Monolith for Phase 1 | Accepted | 2026-01-01 |
| [ADR-002](file:///I:/MathBattle/docs/03-architecture/ADR/ADR-002-jwt-auth.md) | JWT with Refresh Token Rotation | Accepted | 2026-01-01 |
| [ADR-003](file:///I:/MathBattle/docs/03-architecture/ADR/ADR-003-separate-websocket-server.md) | Separate WebSocket Match Server | Accepted | 2026-01-01 |
| [ADR-004](file:///I:/MathBattle/docs/03-architecture/ADR/ADR-004-postgresql.md) | PostgreSQL as Primary Database | Accepted | 2026-01-01 |
| [ADR-005](file:///I:/MathBattle/docs/03-architecture/ADR/ADR-005-bullmq-jobs.md) | BullMQ for Background Jobs | Accepted | 2026-01-01 |
| [ADR-006](file:///I:/MathBattle/docs/03-architecture/ADR/ADR-006-ai-review-gate.md) | AI Content Requires Teacher Review | Accepted | 2026-01-01 |

---

## Creating a New ADR

1. Copy the format above to `ADR/ADR-NNN-short-title.md`
2. Set status to `Proposed`
3. Discuss in architecture review meeting
4. Update status to `Accepted` after approval
5. Add entry to this index

---

## Related Documents

Key decisions are also summarized in `System-Architecture.md` → Key Architecture Decisions table.
