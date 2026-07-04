# Milestones — MathQuest

**Version:** 1.0.0

---

## Phase 1 — MVP Milestones

### M1: Foundation (End of Week 2)

| Task | Owner | Status |
|---|---|---|
| GitHub repository configured with branch protection | Engineering Lead | — |
| CI/CD pipeline (GitHub Actions): lint, test, build | DevOps | — |
| Docker Compose for local development | Engineering | — |
| PostgreSQL schema: all Phase 1 migrations | Backend | — |
| Redis configured | DevOps | — |
| Authentication module: register, login, logout, JWT, refresh | Backend | — |
| RBAC guards implemented | Backend | — |
| Password reset flow | Backend | — |
| `.env.example` complete | Engineering | — |
| Staging environment provisioned | DevOps | — |

**Exit Criteria:** Developer can run the full stack locally; CI passes on every PR; auth endpoints tested.

---

### M2: Learning Core (End of Week 5)

| Task | Owner | Status |
|---|---|---|
| Learning path, unit, lesson data model | Backend | — |
| Learning path CRUD API | Backend | — |
| Lesson start/complete API with prerequisite enforcement | Backend | — |
| Question bank CRUD API | Backend | — |
| Question metadata schema (all fields) | Backend | — |
| Question status workflow (draft → pending_review → published) | Backend | — |
| Question version history | Backend | — |
| Student enrollment API | Backend | — |
| Learning progress tracking | Backend | — |
| Frontend: learning path browse and lesson view | Frontend | — |

**Exit Criteria:** Student can browse paths, start a lesson, answer questions, and see their score.

---

### M3: Match Engine (End of Week 7)

| Task | Owner | Status |
|---|---|---|
| Match creation API | Backend | — |
| WebSocket server (Socket.io) | Backend | — |
| Match lobby (waiting room) | Backend + Frontend | — |
| Card distribution algorithm (4G/3B/1P/1O/1R) | Backend | — |
| Real-time question delivery | Backend | — |
| Server-authoritative scoring | Backend | — |
| Anti-cheat: browser focus detection | Frontend + Backend | — |
| Match result processing and persistence | Backend | — |
| Match result screen | Frontend | — |
| Match history API | Backend | — |

**Exit Criteria:** Two students can complete a full 10-card match with correct scoring; anti-cheat events logged.

---

### M4: AI and Import (End of Week 9)

| Task | Owner | Status |
|---|---|---|
| AI provider client (abstracted interface) | Backend | — |
| Question generation API | Backend | — |
| Prompt template engine | Backend | — |
| AI job queue (BullMQ) | Backend | — |
| AI generation review UI | Frontend | — |
| CSV/Excel import API | Backend | — |
| Import field mapping | Backend | — |
| Duplicate detection (exact match) | Backend | — |
| Import job queue and status API | Backend | — |
| Import result notification | Backend | — |

**Exit Criteria:** Teacher can generate 5 questions from a prompt and import 50 questions from CSV; duplicates flagged.

---

### M5: Gamification (End of Week 10)

| Task | Owner | Status |
|---|---|---|
| XP award system | Backend | — |
| Rank threshold calculation | Backend | — |
| Achievement catalog (10 achievements) | Backend | — |
| Achievement trigger evaluation | Backend | — |
| Mission system (weekly missions) | Backend | — |
| Streak calculation | Backend | — |
| XP history table | Backend | — |
| Gamification events on lesson/match completion | Backend | — |
| Frontend: XP bar, rank badge, achievement notifications | Frontend | — |

**Exit Criteria:** Student earns XP and achievements after lesson completion and match; streak tracked correctly.

---

### M6: Dashboards and Notifications (End of Week 11)

| Task | Owner | Status |
|---|---|---|
| Student dashboard API | Backend | — |
| Teacher dashboard API | Backend | — |
| Admin dashboard API | Backend | — |
| At-risk student detection | Backend | — |
| In-app notification system | Backend | — |
| Notification delivery (match invitation, achievement, assignment) | Backend | — |
| Frontend: student dashboard | Frontend | — |
| Frontend: teacher dashboard | Frontend | — |
| Frontend: admin dashboard | Frontend | — |
| Frontend: notification center | Frontend | — |

**Exit Criteria:** All three dashboards load within performance targets; notifications delivered within 5 seconds.

---

### M7: Launch Ready (End of Week 12)

| Task | Owner | Status |
|---|---|---|
| OWASP DAST security scan — zero critical/high | Security | — |
| SAST scan — zero critical/high | Engineering | — |
| WCAG 2.1 AA accessibility audit | QA | — |
| Load test: P95 ≤ 500ms at 1,000 concurrent users | DevOps | — |
| E2E test suite: all primary journeys passing | QA | — |
| OpenAPI documentation complete | Backend | — |
| Privacy policy draft reviewed by legal | Legal | — |
| Production environment provisioned and hardened | DevOps | — |
| Pilot school onboarding: accounts created, teachers trained | Customer Success | — |
| Deployment checklist completed | Engineering Lead | — |

**Exit Criteria:** All quality gates pass; pilot school onboarded; production deployment complete.

---

## Phase 2 — Beta Milestones (Months 4–6)

| Milestone | Target | Key Deliverables |
|---|---|---|
| M8: AI Expansion | Month 4 | Weakness analysis, personalized recommendations, PDF/Word import |
| M9: Teacher Analytics | Month 5 | At-risk detection, class performance trends, topic gap analysis |
| M10: Gamification Depth | Month 6 | Leaderboards, cosmetics, tournaments, email notifications |

---

*See `05-project-plan/Backlog.md` for task-level breakdown and `01-product/Roadmap.md` for phase-level roadmap.*
