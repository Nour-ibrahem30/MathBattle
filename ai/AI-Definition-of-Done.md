# AI Definition of Done — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

AI-specific completion criteria. Human engineering DoD is in `docs/06-engineering/Definition-of-Done.md`. AI agents must satisfy **both** documents.

---

## Before Starting

- [ ] Read `ai/AI-Agent-Rules.md` and `AGENTS.md`
- [ ] Consult `ai/AI-Context-Index.md` for relevant docs
- [ ] Understand acceptance criteria for the task

---

## During Implementation

- [ ] Follow existing code patterns (no unnecessary abstraction)
- [ ] Use entity names from `ERD.md` exactly
- [ ] Enforce JWT + RBAC on new endpoints
- [ ] Validate all inputs server-side
- [ ] No PII in logs, console output, or AI prompts
- [ ] AI-generated content saved as `draft` status only
- [ ] Schema changes via migration script only

---

## Before Marking Complete

### Code Quality
- [ ] TypeScript strict — no unjustified `any`
- [ ] No TODO placeholders or empty functions
- [ ] No unrelated changes outside task scope
- [ ] Docstrings/comments preserved (non-destructive editing)

### Testing
- [ ] Unit tests for success and failure paths
- [ ] Integration tests for API/DB changes
- [ ] `npm run lint` passes
- [ ] `npm run test` passes

### Contracts
- [ ] OpenAPI updated if routes changed
- [ ] `.env.example` updated if new env vars
- [ ] Error responses follow RFC 7807 format

### Security (Always)
- [ ] No secrets committed
- [ ] school_id scoping on data queries
- [ ] High-risk changes flagged for human review

---

## High-Risk Completion Gates

For auth, WebSocket, AI import, anti-cheat, or migration tasks:

- [ ] Integration test evidence provided
- [ ] Security checklist from `Code-Review-Checklist.md` verified
- [ ] Human review requested (AI cannot self-approve)

---

## Handoff Format

When completing a task, report:
1. Files changed (with brief description)
2. Tests added
3. Docs updated
4. Manual verification steps
5. Open questions or blockers

---

*See `docs/06-engineering/Definition-of-Done.md` for full team DoD.*
