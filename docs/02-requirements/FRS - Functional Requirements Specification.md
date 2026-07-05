# Functional Requirements Specification — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Executive summary of functional requirements for MathBattle Phase 1. Full specifications with inputs, outputs, and acceptance criteria are in `FRS-Detailed.md`.

---

## Module Summary

| Module | Key Functions | Priority |
|---|---|---|
| Authentication | Register, login, logout, password reset, parental consent | P0 |
| Learning | Paths, units, lessons, attempts, progress tracking | P0 |
| Question Bank | CRUD, import, AI generation, versioning, publish workflow | P0 |
| Matches | Lobby, 1v1 real-time, scoring, anti-cheat, history | P0 |
| Gamification | XP, ranks, achievements, missions, streaks | P0 |
| Classroom | Classes, rosters, assignments | P0 |
| Dashboard | Student, teacher, admin views | P0 |
| Notifications | In-app notifications | P0 |
| AI | Question generation, duplicate detection, difficulty estimation | P0 |
| Admin | User management, school settings, reports, audit | P0 |

---

## Phase 1 Functional Scope

### In Scope
- JWT authentication with RBAC (student, teacher, admin, operator)
- Structured learning paths with prerequisites
- Question bank with full metadata and version history
- AI question generation (teacher-reviewed before publish)
- Document import (PDF, Word, Excel, CSV)
- Multiplayer 1v1 matches with hidden-card scoring
- Basic gamification (XP, ranks, achievements, missions, streaks)
- Teacher class and assignment management
- Administrator user and school management
- In-app notification system
- REST API (OpenAPI documented)

### Out of Scope (Phase 1)
- GraphQL API (Phase 2)
- Email notifications (Phase 2)
- Leaderboards and tournaments (Phase 2)
- Cosmetics/avatars (Phase 2)
- Payment/subscriptions (Phase 3)
- LMS integrations (Phase 3)
- Mobile native apps (Phase 3)

---

## Requirements Traceability

| Document | Relationship |
|---|---|
| `FRS-Detailed.md` | Full function specifications |
| `User-Stories.md` | Agile user stories |
| `Acceptance-Criteria.md` | Testable acceptance criteria |
| `Requirements-Traceability-Matrix.md` | Full RTM |
| `BRS.md` | Business requirements source |

---

## Key Business Rules

1. Students under 13 require parental consent before account activation
2. AI-generated questions cannot be published without teacher review
3. Match opponents must be the same grade level
4. Only one in-progress lesson attempt per student per lesson
5. XP is awarded on lesson completion and match results
6. All data queries scoped by school_id (except platform operators)

---

*See `FRS-Detailed.md` for complete function-level specifications.*
