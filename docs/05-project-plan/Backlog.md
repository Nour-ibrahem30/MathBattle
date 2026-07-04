# Backlog — MathQuest

**Version:** 1.0.0

---

## Phase 1 — MVP Backlog

### Foundation (M1)

| ID | Area | Task | Owner | Dependencies | Acceptance | Risk |
|---|---|---|---|---|---|---|
| B-001 | DevOps | Configure GitHub repo, branch protection, PR template | DevOps | — | PR requires review; main branch protected | Low |
| B-002 | DevOps | GitHub Actions CI: lint, test, build, coverage | DevOps | B-001 | CI passes on every PR | Low |
| B-003 | DevOps | Docker Compose: API, DB, Redis, WebSocket | Engineering | — | `docker compose up` starts full stack | Low |
| B-004 | Backend | PostgreSQL migrations: all Phase 1 entities | Backend | B-003 | All tables created; migrations reversible | Medium |
| B-005 | Backend | Auth: register endpoint | Backend | B-004 | AC-AUTH-01 passes | Low |
| B-006 | Backend | Auth: login endpoint | Backend | B-004 | AC-AUTH-02 passes | Low |
| B-007 | Backend | Auth: JWT generation (RS256) | Backend | B-005 | JWT validates with public key | Low |
| B-008 | Backend | Auth: refresh token rotation | Backend | B-007 | New token issued; old invalidated | Medium |
| B-009 | Backend | Auth: password reset flow | Backend | B-006 | AC-AUTH-03 passes | Low |
| B-010 | Backend | RBAC guards (student/teacher/admin) | Backend | B-007 | 403 returned for wrong role | Medium |
| B-011 | Backend | Rate limiting (Redis-backed) | Backend | B-006 | 429 after 5 failed logins | Medium |
| B-012 | DevOps | Staging environment provisioned | DevOps | B-003 | API accessible at staging URL | Low |

### Learning Core (M2)

| ID | Area | Task | Owner | Dependencies | Acceptance | Risk |
|---|---|---|---|---|---|---|
| B-013 | Backend | Learning path CRUD API | Backend | B-004 | CRUD operations work; school-scoped | Low |
| B-014 | Backend | Lesson start API with prerequisite check | Backend | B-013 | AC-LP-01 passes | Medium |
| B-015 | Backend | Lesson complete API with scoring | Backend | B-014 | AC-LP-02 passes | Medium |
| B-016 | Backend | Question bank CRUD API | Backend | B-004 | All metadata fields stored | Low |
| B-017 | Backend | Question status workflow | Backend | B-016 | AC-QB-03 passes | Low |
| B-018 | Backend | Question version history | Backend | B-016 | Version increments on edit | Low |
| B-019 | Backend | Student enrollment API | Backend | B-013 | Student enrolled; progress record created | Low |
| B-020 | Frontend | Learning path browse UI | Frontend | B-013 | Student can browse and select path | Low |
| B-021 | Frontend | Lesson view UI | Frontend | B-014 | Student can answer questions | Medium |

### Match Engine (M3)

| ID | Area | Task | Owner | Dependencies | Acceptance | Risk |
|---|---|---|---|---|---|---|
| B-022 | Backend | Match creation API | Backend | B-004 | AC-M-01 passes | Medium |
| B-023 | Backend | WebSocket server (Socket.io) | Backend | B-022 | Two clients connect to match room | High |
| B-024 | Backend | Card distribution algorithm | Backend | B-023 | 4G/3B/1P/1O/1R distribution verified | Medium |
| B-025 | Backend | Server-authoritative scoring | Backend | B-024 | AC-M-02 passes | High |
| B-026 | Backend | Anti-cheat: focus detection events | Backend + Frontend | B-023 | AC-M-03 passes | High |
| B-027 | Backend | Match result processing | Backend | B-025 | Result persisted; XP awarded | Medium |
| B-028 | Frontend | Match lobby UI | Frontend | B-022 | Student can challenge opponent | Medium |
| B-029 | Frontend | Match arena UI | Frontend | B-023 | Real-time card reveal and scoring | High |
| B-030 | Frontend | Match result screen | Frontend | B-027 | Score breakdown displayed | Low |

### AI and Import (M4)

| ID | Area | Task | Owner | Dependencies | Acceptance | Risk |
|---|---|---|---|---|---|---|
| B-031 | Backend | AI provider client (abstracted) | Backend | — | Provider switchable via config | High |
| B-032 | Backend | Question generation API | Backend | B-031 | AC-AI-01 passes | High |
| B-033 | Backend | Prompt template engine | Backend | B-031 | Templates render correctly | Medium |
| B-034 | Backend | AI job queue (BullMQ) | Backend | B-031 | Jobs processed; retries work | Medium |
| B-035 | Backend | CSV/Excel import API | Backend | B-016 | AC-QB-02 passes | Medium |
| B-036 | Backend | Duplicate detection (exact match) | Backend | B-016 | Duplicates flagged in import | Medium |
| B-037 | Frontend | AI generation panel UI | Frontend | B-032 | Teacher can generate and review | Medium |
| B-038 | Frontend | Import UI with field mapping | Frontend | B-035 | Teacher can import CSV | Medium |

### Gamification (M5)

| ID | Area | Task | Owner | Dependencies | Acceptance | Risk |
|---|---|---|---|---|---|---|
| B-039 | Backend | XP award system | Backend | B-015, B-027 | AC-G-01 passes | Low |
| B-040 | Backend | Rank threshold calculation | Backend | B-039 | AC-G-02 passes | Low |
| B-041 | Backend | Achievement catalog and triggers | Backend | B-039 | AC-G-03 passes | Medium |
| B-042 | Backend | Mission system (weekly) | Backend | B-039 | Missions created; progress tracked | Medium |
| B-043 | Backend | Streak calculation | Backend | B-039 | Streak breaks on missed day | Medium |
| B-044 | Frontend | XP bar and rank badge | Frontend | B-039 | Visible on dashboard | Low |
| B-045 | Frontend | Achievement notification | Frontend | B-041 | Toast shown on unlock | Low |

### Dashboards and Notifications (M6)

| ID | Area | Task | Owner | Dependencies | Acceptance | Risk |
|---|---|---|---|---|---|---|
| B-046 | Backend | Student dashboard API | Backend | B-039, B-041 | AC-D-01 passes | Low |
| B-047 | Backend | Teacher dashboard API | Backend | B-015, B-019 | AC-D-02 passes | Medium |
| B-048 | Backend | Admin dashboard API | Backend | B-004 | AC-D-03 passes | Low |
| B-049 | Backend | At-risk student detection | Backend | B-015 | Students flagged correctly | Medium |
| B-050 | Backend | In-app notification system | Backend | B-004 | Notifications delivered within 5s | Low |
| B-051 | Frontend | Student dashboard | Frontend | B-046 | Loads within 500ms | Medium |
| B-052 | Frontend | Teacher dashboard | Frontend | B-047 | Loads within 1s | Medium |
| B-053 | Frontend | Admin dashboard | Frontend | B-048 | Loads within 2s | Low |
| B-054 | Frontend | Notification center | Frontend | B-050 | Unread count visible | Low |

### Launch Prep (M7)

| ID | Area | Task | Owner | Dependencies | Acceptance | Risk |
|---|---|---|---|---|---|---|
| B-055 | Security | OWASP DAST scan | Security | All | Zero critical/high findings | High |
| B-056 | QA | WCAG 2.1 AA accessibility audit | QA | All frontend | Zero AA violations | Medium |
| B-057 | DevOps | Load test: 1,000 concurrent users | DevOps | All | P95 ≤ 500ms | Medium |
| B-058 | QA | E2E test suite: all primary journeys | QA | All | All journeys passing | Medium |
| B-059 | Backend | OpenAPI documentation complete | Backend | All | 100% endpoint coverage | Low |
| B-060 | DevOps | Production environment provisioned | DevOps | B-012 | Production accessible | Medium |
| B-061 | CS | Pilot school onboarding | Customer Success | B-060 | ≥ 50 students, ≥ 3 teachers active | High |

---

## Phase 2 — Beta Backlog (High Level)

| ID | Area | Task | Priority |
|---|---|---|---|
| B-100 | AI | Weakness analysis per student | P1 |
| B-101 | AI | Personalized next-activity recommendation | P1 |
| B-102 | AI | PDF/Word document import | P1 |
| B-103 | Analytics | At-risk student identification (advanced) | P1 |
| B-104 | Analytics | Class performance trend charts | P1 |
| B-105 | Gamification | Class and school leaderboards | P2 |
| B-106 | Gamification | Cosmetics system (avatars, themes) | P2 |
| B-107 | Gamification | Tournament infrastructure | P2 |
| B-108 | Notifications | Email notifications | P1 |
| B-109 | API | GraphQL compatibility layer | P2 |
| B-110 | Security | Audit log viewer (admin) | P1 |

---

*See `05-project-plan/Milestones.md` for milestone targets and `01-product/Roadmap.md` for phase roadmap.*
