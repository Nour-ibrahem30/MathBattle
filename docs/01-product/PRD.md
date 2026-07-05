# Product Requirements Document (PRD) — MathBattle

**Version:** 1.0.0
**Status:** Approved for Engineering
**Owner:** Product Management

---

## 1. Product Overview

MathBattle is an AI-powered educational SaaS web platform that uses gamification to improve mathematics learning for K–12 students. It is not a standalone game. It is a curriculum-aligned learning platform where gamification mechanics exist exclusively to motivate continued learning — never to distract from it.

The platform serves three user roles: **Students**, **Teachers**, and **Administrators**. Each role has a dedicated experience built around their specific goals.

---

## 2. Product Vision

See `01-product/Product-Vision.md`.

---

## 3. Product Goals

| ID | Goal | Metric |
|---|---|---|
| G-01 | Improve student mathematics proficiency | Measurable score improvement within one semester |
| G-02 | Reduce teacher question preparation time | ≥ 50% reduction vs. manual creation |
| G-03 | Provide actionable class analytics to teachers | Teacher dashboard used ≥ 3x per week per active class |
| G-04 | Deliver engaging student experience | ≥ 15 min average session length; ≥ 60% WAU retention at 30 days |
| G-05 | Scale to institutional deployment | Support 100,000 concurrent students |
| G-06 | Maintain platform trust and safety | Zero data breaches; COPPA/FERPA/GDPR compliance |

---

## 4. Success Metrics

| Metric | Target | Measurement Method |
|---|---|---|
| Student WAU retention (30-day) | ≥ 60% | Analytics events |
| Average session length | ≥ 15 minutes | Session tracking |
| AI question acceptance rate | ≥ 75% | Teacher review events |
| Teacher dashboard weekly usage | ≥ 3 sessions/week | Analytics |
| Platform uptime | ≥ 99.5% | Uptime monitoring |
| Page load time (P95) | ≤ 2 seconds | Performance monitoring |
| Match completion rate | ≥ 80% | Match event tracking |
| Support ticket volume | Decreasing month-over-month | Support system |

---

## 5. Target Users

### 5.1 Students (Primary)
K–12 students using the platform for structured mathematics practice, challenges, and competitive matches. Age range: 6–18. May access from school devices or personal devices at home.

### 5.2 Teachers
Classroom mathematics teachers who create assignments, manage question banks, review AI-generated content, monitor student progress, and run class challenges.

### 5.3 Administrators
School principals, department heads, and district coordinators who manage user accounts, review school-wide performance, configure curriculum settings, and access compliance reports.

### 5.4 Platform Operators (Internal)
Internal staff who manage platform configuration, content moderation, AI model oversight, and system health.

---

## 6. Personas

See `01-product/Personas.md` for full persona profiles.

---

## 7. Problem Statement

Students disengage from mathematics practice because traditional drill-based tools are repetitive and provide no sense of progress or reward. Teachers spend excessive time creating and organizing questions without insight into which students need help. Administrators have no unified view of curriculum progress across their school. Existing platforms either over-gamify (sacrificing depth) or under-engage (sacrificing motivation).

---

## 8. Product Principles

1. Education outcomes are the primary measure of success.
2. Gamification is a motivational tool, not a product feature.
3. AI assists teachers; it does not replace teacher judgment.
4. Student data privacy is non-negotiable, especially for minors.
5. Accessibility is a launch requirement.
6. The platform must be usable on low-end devices and slow connections.

---

## 9. Scope

### 9.1 In Scope — Phase 1 (MVP)

- User authentication (student, teacher, administrator)
- Structured learning paths: Grade → Subject → Unit → Lesson → Practice → Challenge → Final Assessment
- Question bank with full metadata (grade, semester, lesson, topic, subtopic, Bloom's level, difficulty, hints, solution, tags, version history, status)
- AI question generation from text prompts
- Document import for question bank (PDF, Word, Excel, CSV) with duplicate detection
- Multiplayer 1v1 matches (same grade, hidden-card scoring system)
- Student dashboard: progress, missions, achievements, history
- Teacher dashboard: classes, assignments, question management, basic reports
- Administrator dashboard: user management, school-wide performance overview
- Notification system (in-app)
- Basic gamification: ranks, achievements, streaks, missions
- JWT authentication with RBAC
- REST API

### 9.2 In Scope — Phase 2 (Beta)

- AI weakness detection and personalized practice recommendations
- Advanced teacher analytics and class reports
- Leaderboards (class and school level)
- Tournaments
- Email notifications
- Cosmetics system (avatars, themes)
- GraphQL API layer

### 9.3 In Scope — Phase 3 (V1)

- Full gamification suite (all mechanics)
- Administrator compliance reports
- AI difficulty calibration per student
- Mobile-responsive optimization pass
- Third-party LMS integration hooks

### 9.4 Out of Scope (All Phases)

- Native mobile applications (iOS/Android)
- Subjects other than mathematics
- Video content or live tutoring
- Payment processing (institutional billing handled externally)
- Social features (messaging, friend lists)
- Parent portal (future consideration)

---

## 10. Technical Context

- Responsive web application (mobile-first)
- REST API (Phase 1), GraphQL compatibility layer (Phase 2)
- AI provider integration for question generation and analysis
- Cloud-hosted, multi-tenant, horizontally scalable
- JWT + RBAC authentication
- PostgreSQL primary database with Redis caching
- Background job queue for AI processing and notifications
- See `03-architecture/System-Architecture.md` for full technical context

---

## 11. Functional Requirements Summary

| Module | Key Functions |
|---|---|
| Authentication | Register, login, logout, password reset, session management, RBAC |
| Learning Paths | Browse, enroll, progress tracking, AI next-activity recommendation |
| Question Bank | Create, edit, import, tag, version, review, publish, archive |
| AI Engine | Generate questions, analyze weaknesses, estimate difficulty, detect duplicates |
| Matches | Create match, join match, play hidden-card round, score, result, history |
| Gamification | Earn XP, level up, unlock achievements, complete missions, maintain streaks |
| Dashboards | Student progress view, teacher class view, admin school view |
| Notifications | In-app alerts for matches, achievements, assignments, system events |
| Administration | User management, school configuration, audit logs, reports |

See `02-requirements/FRS-Detailed.md` for full function specifications.

---

## 12. Core User Journeys

See `01-product/User-Journeys.md` for full journey maps.

**Summary:**
1. Student onboarding → first lesson → first match
2. Teacher creates assignment → monitors student progress → reviews AI-generated questions
3. Administrator reviews school performance → manages users → exports compliance report

---

## 13. Non-Functional Expectations

| Attribute | Requirement |
|---|---|
| Performance | P95 page load ≤ 2s; API response ≤ 500ms for standard requests |
| Availability | ≥ 99.5% uptime (excluding scheduled maintenance) |
| Scalability | 100,000 concurrent students without architecture changes |
| Security | OWASP Top 10 compliance; JWT; RBAC; encryption at rest and in transit |
| Accessibility | WCAG 2.1 AA |
| Privacy | COPPA, FERPA, GDPR (minors) compliance |
| Browser support | Chrome, Firefox, Safari, Edge — last 2 major versions |

See `02-requirements/NFR-Detailed.md` for full non-functional requirements.

---

## 14. Design and Brand Requirements

- Visual style: Modern educational SaaS, inspired by Duolingo's gamification aesthetic
- Color system: Accessible contrast ratios (WCAG AA minimum)
- Typography: Readable at small sizes on mobile devices
- Iconography: Consistent, meaningful, not decorative
- Motion: Subtle, purposeful, respects `prefers-reduced-motion`
- No dark patterns in gamification mechanics

---

## 15. Constraints and Assumptions

### Constraints
- Phase 1 is web-only; no native mobile apps
- AI-generated questions must pass teacher review before classroom use
- Student age data must be collected to enforce COPPA compliance
- All student data must be stored in compliant regions

### Assumptions
- Schools provide device access for students (BYOD or school-issued)
- Teachers have basic digital literacy
- Curriculum alignment is based on a generalized K–12 mathematics framework; specific national curriculum mapping is a future enhancement
- AI provider (e.g., OpenAI, Anthropic, or equivalent) is selected before Phase 1 development begins

---

## 16. Risks

See `01-product/Risks-Assumptions.md` for full risk register.

**Top risks:**
- AI question quality below acceptable threshold → mitigation: mandatory teacher review gate
- Student data privacy breach → mitigation: privacy-by-design architecture, legal review before launch
- Match fairness issues → mitigation: grade-level matching, difficulty calibration, anti-cheat system
- Low teacher adoption → mitigation: onboarding flow, time-saving AI tools, minimal friction dashboard

---

## 17. Acceptance Criteria

| Feature | Acceptance Criteria |
|---|---|
| Authentication | Student can register, log in, and access their dashboard within 60 seconds |
| Learning Path | Student can complete a full lesson and receive AI next-activity recommendation |
| Match | Two students can complete a 10-card match with correct scoring and result display |
| Question Import | Teacher can import a CSV of 50 questions; duplicates flagged; all metadata preserved |
| AI Generation | Teacher can generate 10 questions from a prompt; review and publish within 5 minutes |
| Dashboard | Teacher can view class progress for all students within 3 clicks from login |

See `02-requirements/Acceptance-Criteria.md` for full criteria.

---

## 18. Priorities

| Priority | Feature Area |
|---|---|
| P0 (Launch blocker) | Authentication, Learning Paths, Question Bank, Matches, Student Dashboard |
| P1 (Launch required) | Teacher Dashboard, AI Generation, Notifications, Basic Gamification |
| P2 (Post-launch) | Advanced Analytics, Tournaments, Leaderboards, Cosmetics |
| P3 (Future) | Mobile Apps, Additional Subjects, LMS Integrations |

---

## 19. Future Enhancements

- Parent portal with progress visibility
- Natural language tutoring within lessons
- National competition infrastructure
- Open curriculum marketplace
- District-level analytics and compliance reporting
- Integration with Google Classroom, Microsoft Teams for Education, Canvas

---

## 20. Open Notes

- AI provider selection: confirm before Phase 1 development begins
- Legal review of privacy policy for minors: required before Beta launch
- Curriculum framework alignment: confirm target national curriculum before question bank schema is finalized
- Anti-cheat technical approach: confirm browser focus detection method and legal acceptability per jurisdiction

---

*See `02-requirements/FRS-Detailed.md` for implementation-ready function specifications.*
