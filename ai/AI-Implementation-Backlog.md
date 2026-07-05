# AI Implementation Backlog — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Prioritized implementation backlog for AI agents and engineers. Aligned with `docs/05-project-plan/Backlog.md` and Phase 1 MVP scope.

---

## Sprint 0 — Foundation

| ID | Task | Module | Depends On | Priority |
|---|---|---|---|---|
| IMP-001 | Project scaffold (NestJS + React + Docker Compose) | infra | — | P0 |
| IMP-002 | Database migrations: identity tables | auth | IMP-001 | P0 |
| IMP-003 | JWT auth module (register, login, refresh, logout) | auth | IMP-002 | P0 |
| IMP-004 | RBAC guards and school_id scoping | shared | IMP-003 | P0 |
| IMP-005 | Audit logger service | shared | IMP-003 | P0 |
| IMP-006 | OpenAPI skeleton with auth endpoints | api | IMP-003 | P0 |

---

## Sprint 1 — Learning Core

| ID | Task | Module | Depends On | Priority |
|---|---|---|---|---|
| IMP-010 | Migrations: learning tables | learning | IMP-002 | P0 |
| IMP-011 | Learning path CRUD + seed data | learning | IMP-010 | P0 |
| IMP-012 | Lesson attempt flow (start, answer, complete) | learning | IMP-011, IMP-004 | P0 |
| IMP-013 | Student dashboard API | dashboard | IMP-012 | P0 |
| IMP-014 | Frontend: login + student dashboard | frontend | IMP-003, IMP-013 | P0 |

---

## Sprint 2 — Question Bank + AI

| ID | Task | Module | Depends On | Priority |
|---|---|---|---|---|
| IMP-020 | Migrations: question tables | questions | IMP-002 | P0 |
| IMP-021 | Question CRUD + search | questions | IMP-020 | P0 |
| IMP-022 | BullMQ setup + AI worker scaffold | ai | IMP-001 | P0 |
| IMP-023 | AI question generation (mock provider) | ai | IMP-022, IMP-021 | P0 |
| IMP-024 | Document import pipeline | questions | IMP-021 | P0 |
| IMP-025 | Teacher question bank UI | frontend | IMP-021 | P0 |

---

## Sprint 3 — Matches

| ID | Task | Module | Depends On | Priority |
|---|---|---|---|---|
| IMP-030 | Migrations: match tables | matches | IMP-002 | P0 |
| IMP-031 | WebSocket server scaffold + JWT auth | matches | IMP-003 | P0 |
| IMP-032 | Match engine (lobby, cards, scoring) | matches | IMP-031, IMP-021 | P0 |
| IMP-033 | Anti-cheat (focus detection) | matches | IMP-032 | P0 |
| IMP-034 | Match reconnect + state recovery | matches | IMP-032 | P0 |
| IMP-035 | Frontend: match lobby + arena | frontend | IMP-032 | P0 |

---

## Sprint 4 — Gamification + Classroom

| ID | Task | Module | Depends On | Priority |
|---|---|---|---|---|
| IMP-040 | Migrations: gamification tables | gamification | IMP-002 | P0 |
| IMP-041 | XP, rank, achievement engine | gamification | IMP-040, IMP-012, IMP-032 | P0 |
| IMP-042 | Missions and streaks | gamification | IMP-041 | P0 |
| IMP-043 | Class and assignment management | classroom | IMP-004 | P0 |
| IMP-044 | Teacher dashboard API + UI | dashboard | IMP-043 | P0 |

---

## Sprint 5 — Admin + Polish

| ID | Task | Module | Depends On | Priority |
|---|---|---|---|---|
| IMP-050 | Admin user management | admin | IMP-004 | P0 |
| IMP-051 | Admin reports + audit log UI | admin | IMP-005 | P0 |
| IMP-052 | Notification system | notifications | IMP-004 | P0 |
| IMP-053 | Parental consent flow | auth | IMP-003 | P0 |
| IMP-054 | E2E test suite (Playwright) | testing | All above | P0 |
| IMP-055 | Performance baseline (k6) | testing | All above | P0 |

---

## Open Decisions

| Decision | Options | Target Date |
|---|---|---|
| AI Provider | OpenAI GPT-4 Turbo / Anthropic Claude 3.5 | Before Sprint 2 |
| ORM | Prisma / TypeORM | Before Sprint 0 |
| Email Provider | SendGrid / Postmark | Before Sprint 5 |

---

*See `docs/05-project-plan/Backlog.md` for full product backlog and `ai/AI-Phase-Prompts.md` for agent prompts per sprint.*
