# Requirements Traceability Matrix (RTM) — MathQuest

**Version:** 1.0.0

---

## Purpose
This matrix traces every product requirement from its business source through to architecture, API, data, and test coverage. It is the single source of traceability for the MathQuest platform.

---

## Traceability Table

| Req ID | Source (BRS/PRD) | Requirement Summary | FRS Function | Architecture Doc | API Endpoint | Data Entity | Test Coverage | Status |
|---|---|---|---|---|---|---|---|---|
| REQ-001 | BR-01 | AI questions require teacher review before use | F-QB-07, F-AI-01 | Component-Architecture | POST /ai/generate-questions, PATCH /questions/{id}/status | questions.status | Unit + Integration | Phase 1 |
| REQ-002 | BR-02 | Matches pair same-grade students only | F-M-01 | System-Architecture | POST /matches | matches.grade_constraint | Integration + E2E | Phase 1 |
| REQ-003 | BR-03 | Match score cannot go below zero | F-M-02 (PlayMatch) | System-Architecture | WebSocket match events | match_scores | Unit | Phase 1 |
| REQ-004 | BR-04 | Wrong answer = −1 point | F-M-02 (PlayMatch) | System-Architecture | WebSocket match events | match_scores | Unit | Phase 1 |
| REQ-005 | BR-05 | Lesson prerequisite enforced | F-LP-03 | Component-Architecture | POST /learning/lessons/{id}/start | lesson_attempts, enrollments | Integration | Phase 1 |
| REQ-006 | BR-06 | All unit challenges required before final assessment | F-LP-07 | Component-Architecture | POST /learning/assessments/{id}/start | learning_progress | Integration | Phase 1 |
| REQ-007 | BR-07 | Teacher scoped to own school | F-D-02 | Auth-Security | All teacher endpoints | users.school_id | Integration + Security | Phase 1 |
| REQ-008 | BR-08 | Admin scoped to own school/district | F-A-01 | Auth-Security | All admin endpoints | users.school_id | Integration + Security | Phase 1 |
| REQ-009 | BR-09 | No student PII to third parties | NFR-PRIV-02 | Privacy-Policy, Data-Architecture | All export endpoints | users, student_profiles | Security + Privacy audit | Phase 1 |
| REQ-010 | BR-10 | Under-13 requires parental consent | F-AUTH-01 | Auth-Security, Compliance-Architecture | POST /auth/register | users.status, parental_consents | Integration + Legal | Phase 2 |
| REQ-011 | BR-11 | Question publish validation | F-QB-04 | Component-Architecture | PATCH /questions/{id}/status | questions | Unit | Phase 1 |
| REQ-012 | BR-12 | Duplicate question detection | F-QB-06, F-AI-01 | AI-Architecture | POST /questions/import, POST /ai/generate-questions | questions | Integration | Phase 1 |
| REQ-013 | BR-13 | Anti-cheat forfeit rules | F-M-02 | Auth-Security | WebSocket match events | match_events, matches | Integration + E2E | Phase 1 |
| REQ-014 | BR-14 | Streak calculation rules | F-G-05 | Component-Architecture | Internal event | student_profiles.streak | Unit | Phase 1 |
| REQ-015 | BR-15 | Leaderboard scoped to class/school | F-G-06 | Component-Architecture | GET /leaderboards | leaderboards | Integration | Phase 2 |
| REQ-016 | G-01 | Improve student proficiency | F-LP-04, F-AI-05 | AI-Architecture | GET /dashboard/student | lesson_attempts, ai_recommendations | Analytics | Phase 1 |
| REQ-017 | G-02 | Reduce teacher prep time | F-AI-01, F-QB-06 | AI-Architecture | POST /ai/generate-questions | questions | Teacher survey | Phase 1 |
| REQ-018 | G-04 | Engaging student experience | F-G-01 through F-G-05 | Component-Architecture | Multiple | xp_history, achievements | Analytics | Phase 1 |
| REQ-019 | NFR-PERF-01 | API P95 ≤ 500ms | All API functions | Deployment-Operations | All | All | Load test | Phase 1 |
| REQ-020 | NFR-REL-01 | ≥ 99.5% uptime | All | Deployment-Operations | All | All | Uptime monitoring | Phase 1 |
| REQ-021 | NFR-SEC-01 | OWASP Top 10 compliance | All | Threat-Model, Auth-Security | All | All | SAST + DAST | Phase 1 |
| REQ-022 | NFR-ACC-01 | WCAG 2.1 AA | All UI functions | UX-Flows | All | N/A | axe-core + manual | Phase 1 |
| REQ-023 | NFR-PRIV-01 | COPPA compliance | F-AUTH-01 | Compliance-Architecture | POST /auth/register | parental_consents | Legal + Integration | Phase 2 |
| REQ-024 | NFR-SCALE-01 | 100,000 concurrent students | All | System-Architecture | All | All | Load test | Phase 3 |

---

## Coverage Summary

| Phase | Total Requirements | Architecture Covered | API Covered | Data Covered | Test Defined |
|---|---|---|---|---|---|
| Phase 1 | 20 | 20 | 20 | 20 | 20 |
| Phase 2 | 3 | 3 | 3 | 3 | 3 |
| Phase 3 | 1 | 1 | 1 | 1 | 1 |

---

## Maintenance Rules

- Every new requirement added to BRS or PRD must have a corresponding RTM entry within the same sprint.
- Every RTM entry must have at least one test coverage reference before the requirement is marked `Phase 1`.
- RTM is reviewed at the start of every sprint planning session.

---

*See `02-requirements/Acceptance-Criteria.md` for detailed acceptance criteria per requirement.*
