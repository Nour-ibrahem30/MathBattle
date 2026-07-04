# Project Plan — MathQuest

**Version:** 1.0.0

---

## Project Overview

MathQuest is an AI-powered educational SaaS web platform. This project plan covers Phase 1 (MVP) delivery over 12 weeks (3 months), targeting a pilot school launch.

---

## Technical Direction

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, TailwindCSS |
| Backend | Node.js 20, NestJS, TypeScript |
| Database | PostgreSQL 15 |
| Cache | Redis 7 |
| Job Queue | BullMQ |
| WebSocket | Socket.io |
| ORM | Prisma or TypeORM |
| Testing | Jest, Vitest, Playwright |
| CI/CD | GitHub Actions |
| Infrastructure | AWS (ECS, RDS, ElastiCache, S3, CloudFront) |
| AI Provider | TBD (OpenAI / Anthropic) — confirm before Sprint 1 |

---

## Goals

- Deliver a working MVP that a pilot school can use for structured mathematics practice and 1v1 matches.
- Onboard 1 pilot school with ≥ 50 active students and ≥ 3 teachers by end of Phase 1.
- Achieve match completion rate ≥ 80%.
- Pass all security and accessibility gates before launch.

---

## Phase 1 Scope

See `01-product/Scope.md` for full scope table.

**In scope:** Authentication, Learning Paths, Question Bank, AI Generation (basic), CSV/Excel Import, Matches, Gamification (XP/rank/achievements/streaks/missions), Student Dashboard, Teacher Dashboard, Admin Dashboard, In-app Notifications, REST API.

---

## Assumptions

- AI provider selected and API key available by Week 1.
- Pilot school identified and onboarding contact confirmed by Week 8.
- Design system (colors, typography, components) finalized by Week 2.
- No native mobile app in Phase 1.

---

## Milestones

| Milestone | Target Week | Deliverable |
|---|---|---|
| M1: Foundation | Week 2 | Auth, DB schema, CI/CD pipeline, dev environment |
| M2: Learning Core | Week 5 | Learning paths, lessons, question bank CRUD |
| M3: Match Engine | Week 7 | 1v1 matches, WebSocket server, scoring |
| M4: AI and Import | Week 9 | AI generation, CSV/Excel import, duplicate detection |
| M5: Gamification | Week 10 | XP, ranks, achievements, missions, streaks |
| M6: Dashboards | Week 11 | Student, teacher, admin dashboards |
| M7: Launch Ready | Week 12 | Security audit, accessibility audit, load test, pilot onboarding |

---

## Weekly Plan

| Week | Focus | Key Deliverables |
|---|---|---|
| 1 | Setup | Repo, CI/CD, Docker Compose, DB migrations, auth module skeleton |
| 2 | Auth | Register, login, logout, password reset, JWT, RBAC, refresh tokens |
| 3 | Data Model | All migrations, seed data, question bank CRUD |
| 4 | Learning Paths | Path/unit/lesson structure, enrollment, prerequisite logic |
| 5 | Lesson Engine | Lesson start/complete, scoring, progress tracking |
| 6 | Match Foundation | Match creation, WebSocket server, match lobby |
| 7 | Match Engine | Card distribution, scoring, anti-cheat, result processing |
| 8 | AI Generation | AI provider integration, question generation, prompt templates |
| 9 | Import + Duplicate | CSV/Excel import, duplicate detection, import job queue |
| 10 | Gamification | XP, ranks, achievements, missions, streaks |
| 11 | Dashboards + Notif | Student/teacher/admin dashboards, in-app notifications |
| 12 | Launch Prep | Security audit, accessibility audit, load test, bug fixes, pilot onboarding |

---

## Dependencies

| Dependency | Owner | Required By |
|---|---|---|
| AI provider API key | CTO | Week 8 |
| Design system finalized | Design | Week 2 |
| Pilot school contact | Business | Week 8 |
| Legal review of privacy policy | Legal | Before launch |
| Cloud infrastructure provisioned | DevOps | Week 1 |

---

## Risks

See `01-product/Risks-Assumptions.md` for full risk register.

**Top Phase 1 risks:**
- AI provider not selected by Week 1 → delays AI module by 2 weeks
- Match WebSocket complexity underestimated → delays match engine
- Security audit findings require significant rework → delays launch

---

## Acceptance Criteria

Phase 1 is complete when:
- All P0 and P1 features are implemented and tested
- All CI/CD quality gates pass
- Security audit: zero critical/high findings
- Accessibility audit: WCAG 2.1 AA compliant
- Load test: P95 ≤ 500ms at 1,000 concurrent users
- Pilot school onboarded with ≥ 50 active students
- Match completion rate ≥ 80% in pilot

---

## Deliverables

| Deliverable | Format |
|---|---|
| Working web application | Deployed to staging and production |
| REST API | Deployed; OpenAPI documentation complete |
| Test suite | Unit + integration + E2E; coverage ≥ 80% |
| Documentation | This docs package |
| Pilot onboarding guide | `06-engineering/Onboarding-Guide.md` |

---

*See `05-project-plan/Milestones.md` for sprint-level breakdown and `05-project-plan/Backlog.md` for task-level detail.*
