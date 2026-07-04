# Roadmap — MathQuest

**Version:** 1.0.0

---

## Roadmap Overview

| Phase | Name | Duration | Target Completion | Primary Goal |
|---|---|---|---|---|
| Phase 1 | MVP | 3 months | Month 3 | Core learning, matches, question bank, basic dashboards |
| Phase 2 | Beta | 3 months | Month 6 | AI expansion, teacher analytics, gamification depth |
| Phase 3 | V1 | 3 months | Month 9 | Full platform, tournaments, admin portal, compliance |
| Phase 4 | V2 | 6 months | Month 15 | AI maturity, mobile PWA, LMS integrations |
| Phase 5 | V3 | 9 months | Month 24 | Competitions, marketplace, district management |

---

## Phase 1 — MVP (Months 1–3)

**Goal:** Deliver a working platform that a pilot school can use for structured mathematics practice and 1v1 matches.

### Deliverables

| Module | Features |
|---|---|
| Authentication | Register, login, logout, password reset, JWT, RBAC (student/teacher/admin) |
| Learning Paths | Grade → Subject → Unit → Lesson → Practice → Challenge → Final Assessment navigation |
| Question Bank | Create, edit, tag, version, publish, archive; full metadata schema |
| AI Generation | Generate questions from text prompts; basic duplicate detection |
| Document Import | CSV and Excel import with field mapping and validation |
| Matches | 1v1 same-grade hidden-card matches; 10-card format; weighted scoring; result screen |
| Gamification | XP, ranks, achievements (10 types), streaks, missions (weekly) |
| Student Dashboard | Progress overview, active missions, recent matches, AI recommendation |
| Teacher Dashboard | Class roster, assignment creation, question management, basic completion reports |
| Admin Dashboard | User management (add/deactivate/reset), school configuration |
| Notifications | In-app notifications for matches, achievements, assignments |
| Security | JWT, RBAC, rate limiting, basic anti-cheat (browser focus detection) |
| API | REST API for all modules |

### Exit Criteria
- 1 pilot school onboarded with ≥ 50 active students and ≥ 3 teachers
- Match completion rate ≥ 80%
- No P0 security vulnerabilities
- WCAG 2.1 AA compliance verified

---

## Phase 2 — Beta (Months 4–6)

**Goal:** Expand AI capabilities, deepen teacher analytics, and add competitive gamification features.

### Deliverables

| Module | Features |
|---|---|
| AI Engine | Weakness detection per student; personalized practice recommendations; difficulty calibration |
| Document Import | PDF and Word import with OCR fallback |
| Teacher Analytics | At-risk student identification; class performance trends; topic gap analysis |
| Gamification | Leaderboards (class and school); cosmetics (avatars, themes); tournaments |
| Notifications | Email notifications; web push notifications |
| API | GraphQL compatibility layer |
| Security | Audit logs; suspicious activity alerts |
| Performance | PWA manifest; offline lesson caching |

### Exit Criteria
- ≥ 5 schools onboarded
- AI question acceptance rate ≥ 75%
- Teacher dashboard weekly usage ≥ 3 sessions/week
- Legal review of privacy policy complete

---

## Phase 3 — V1 (Months 7–9)

**Goal:** Full production-ready platform with compliance, advanced analytics, and complete gamification.

### Deliverables

| Module | Features |
|---|---|
| Admin Portal | School-wide performance reports; curriculum compliance export; multi-class management |
| AI Engine | Predictive failure detection; Bloom's level targeting in generation |
| Gamification | Full tournament infrastructure; seasonal competitions; achievement badges |
| Analytics | Full analytics pipeline; teacher and admin BI dashboards |
| Compliance | COPPA parental consent flow; GDPR right-to-erasure; data residency controls |
| Integrations | Google Classroom hooks (assignment sync) |
| Performance | Full load testing at 100,000 concurrent users |

### Exit Criteria
- ≥ 20 schools onboarded
- SOC 2 Type II audit initiated
- 99.5% uptime SLA met for 30 consecutive days
- All P0 and P1 backlog items resolved

---

## Phase 4 — V2 (Months 10–15)

**Goal:** AI maturity, mobile experience, and LMS integrations.

### Deliverables
- AI natural language tutoring within lessons (beta)
- Progressive Web App (PWA) with offline support
- LMS integrations: Canvas, Microsoft Teams for Education
- District-level analytics dashboard
- Advanced AI difficulty calibration per student
- API rate limiting and developer documentation (internal)

---

## Phase 5 — V3 (Months 16–24)

**Goal:** National competition infrastructure, curriculum marketplace, district management.

### Deliverables
- National and international competition hosting
- Open curriculum marketplace (teacher-created content)
- District management portal (multi-school administration)
- Native mobile apps (iOS, Android) — evaluation phase
- Additional STEM subjects (Science) — evaluation phase
- Public API for third-party integrations

---

## Roadmap Diagram (Textual)

```
Month:  1    2    3    4    5    6    7    8    9    10   11   12   15   24
        |----MVP----|----Beta----|------V1------|--------V2--------|---V3---|
Auth    [===]
Learn   [=========]
QB      [=========]
AI-Gen  [====]      [==========]
Matches [=========]
Gamif.  [====]      [==========][=============]
Dash    [=========][==========][=============]
Admin              [==========][=============]
Comply                         [=============]
Mobile                                        [==================]
Market                                                            [=======]
```

---

## Dependencies

| Phase | Dependency | Owner |
|---|---|---|
| Phase 1 | AI provider contract signed | CTO |
| Phase 1 | Pilot school agreement | Business |
| Phase 2 | Legal review of privacy policy | Legal |
| Phase 2 | PDF/Word parsing library selected | Engineering |
| Phase 3 | SOC 2 audit firm engaged | Operations |
| Phase 4 | LMS API access agreements | Business |
| Phase 5 | Competition governance rules defined | Product |

---

*See `05-project-plan/Milestones.md` for sprint-level milestones and `05-project-plan/Backlog.md` for task-level breakdown.*
