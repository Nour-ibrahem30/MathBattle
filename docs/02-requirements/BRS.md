# Business Requirements Specification (BRS) — MathQuest

**Version:** 1.0.0
**Status:** Approved

---

## 1. Business Objectives

| ID | Objective | Metric | Timeline |
|---|---|---|---|
| BO-01 | Improve student mathematics proficiency measurably | ≥ 15% score improvement within one semester | Phase 1 |
| BO-02 | Reduce teacher question preparation time | ≥ 50% reduction vs. manual creation | Phase 1 |
| BO-03 | Provide real-time class analytics to teachers | Teacher dashboard used ≥ 3x/week | Phase 1 |
| BO-04 | Deliver engaging student experience | ≥ 60% WAU retention at 30 days | Phase 1 |
| BO-05 | Scale to institutional deployment | 100,000 concurrent students | Phase 3 |
| BO-06 | Maintain student data trust and safety | Zero data breaches; full regulatory compliance | All phases |
| BO-07 | Achieve institutional sales targets | 10 schools by Beta; 20 by V1 | Phase 2–3 |

---

## 2. Stakeholders

See `01-product/Stakeholder-Map.md`.

---

## 3. Business Processes

### 3.1 Student Learning Process
A student follows a structured learning path (Grade → Subject → Unit → Lesson → Practice → Challenge → Final Assessment). The AI engine recommends the next activity based on performance history. Gamification mechanics (XP, achievements, missions) motivate continued engagement within learning activities.

### 3.2 Teacher Content Management Process
A teacher creates or imports questions into the question bank, reviews AI-generated content, creates assignments for classes, and monitors student progress through the teacher dashboard. AI assists but does not replace teacher judgment.

### 3.3 Multiplayer Match Process
Two students of the same grade are matched. They compete on a set of 10 hidden-card questions with weighted scoring. The system enforces anti-cheat rules. Results are recorded and affect rank and XP.

### 3.4 Administrator Oversight Process
An administrator manages user accounts, reviews school-wide performance, and exports compliance reports. The administrator does not interact with individual student learning content.

### 3.5 AI Content Pipeline Process
AI generates questions from teacher prompts or imported documents. All AI-generated content enters a "Pending Review" state. A teacher must approve each question before it is published to the question bank or used in assignments or matches.

---

## 4. Business Rules

| ID | Rule | Enforcement Point |
|---|---|---|
| BR-01 | AI-generated questions must be reviewed and approved by a teacher before use in any student-facing context | Question Bank — status workflow |
| BR-02 | Multiplayer matches must only pair students of the same grade | Match creation — grade validation |
| BR-03 | A student's score in a match cannot go below zero | Match scoring engine |
| BR-04 | Wrong answer in a match deducts 1 point regardless of card color | Match scoring engine |
| BR-05 | A student must complete a lesson before accessing the challenge for that lesson | Learning path — prerequisite check |
| BR-06 | A student must complete all challenges in a unit before accessing the final assessment | Learning path — prerequisite check |
| BR-07 | A teacher can only manage students and classes within their assigned school | RBAC — school-scoped permissions |
| BR-08 | An administrator can only manage users within their assigned school or district | RBAC — school/district-scoped permissions |
| BR-09 | Student data must not be shared with third parties without explicit institutional consent | Data governance — API and export controls |
| BR-10 | Students under 13 require parental consent before account activation | Registration — age gate and consent flow |
| BR-11 | A question must have at minimum: grade, subject, topic, correct answer, and difficulty before it can be published | Question Bank — publish validation |
| BR-12 | Duplicate questions (same text, same grade) must be flagged before import or generation | AI engine — duplicate detection |
| BR-13 | A match forfeit due to anti-cheat violation does not penalize the non-violating student | Match engine — forfeit rules |
| BR-14 | Streaks are calculated on calendar days; a missed day breaks the streak | Gamification engine — streak calculation |
| BR-15 | Leaderboards are scoped to class or school; no cross-school leaderboards in Phase 1 | Leaderboard — scope enforcement |

---

## 5. Assumptions

See `01-product/Risks-Assumptions.md`.

---

## 6. Constraints

| Constraint | Description |
|---|---|
| Technology | Web-only in Phase 1; no native mobile apps |
| Data | Student data must be stored in compliant regions |
| AI | AI-generated content requires human review; AI provider must be confirmed before development |
| Compliance | COPPA, FERPA, GDPR compliance required before Beta launch |
| Scope | Mathematics only in Phase 1; no other subjects |
| Billing | No in-platform payment processing; institutional billing handled externally |

---

## 7. Success Measurements

See `01-product/Success-Metrics.md`.

---

## 8. Approval and Sign-Off

| Role | Name | Status |
|---|---|---|
| Product Manager | [Product Manager Name] | Pending |
| Engineering Lead | [Engineering Lead Name] | Pending |
| Legal/Compliance | [Legal Name] | Pending |
| Education Lead | [Education Lead Name] | Pending |

---

*See `02-requirements/FRS-Detailed.md` for function-level specifications derived from these business requirements.*
