# User Stories — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Format

Stories follow: **As a [role], I want [goal], so that [benefit].**

Priority: P0 (MVP) | P1 (Beta) | P2 (V1)

---

## Authentication & Onboarding

| ID | Priority | Story | Acceptance Criteria Ref |
|---|---|---|---|
| US-AUTH-01 | P0 | As a **student**, I want to register with my school code and grade, so that I can access my learning path. | AC-AUTH-01 |
| US-AUTH-02 | P0 | As a **student under 13**, I want my parent to receive a consent email, so that I can use the platform legally. | AC-AUTH-02 |
| US-AUTH-03 | P0 | As a **user**, I want to log in and receive a secure session, so that I can access my dashboard. | AC-AUTH-03 |
| US-AUTH-04 | P0 | As a **user**, I want to reset my password via email, so that I can recover my account. | AC-AUTH-04 |
| US-AUTH-05 | P0 | As an **admin**, I want to create teacher accounts, so that teachers can manage classes without self-registration. | AC-AUTH-05 |

---

## Learning

| ID | Priority | Story | Acceptance Criteria Ref |
|---|---|---|---|
| US-LRN-01 | P0 | As a **student**, I want to view my grade-aligned learning path, so that I know what to study next. | AC-LRN-01 |
| US-LRN-02 | P0 | As a **student**, I want to complete lessons with immediate feedback, so that I learn from mistakes. | AC-LRN-02 |
| US-LRN-03 | P0 | As a **student**, I want prerequisites enforced, so that I build knowledge in the right order. | AC-LRN-03 |
| US-LRN-04 | P0 | As a **student**, I want to see my progress percentage, so that I feel motivated to continue. | AC-LRN-04 |
| US-LRN-05 | P1 | As a **student**, I want AI-recommended practice for my weak topics, so that I improve faster. | AC-LRN-05 |

---

## Question Bank

| ID | Priority | Story | Acceptance Criteria Ref |
|---|---|---|---|
| US-QB-01 | P0 | As a **teacher**, I want to create and edit questions with full metadata, so that content is searchable and aligned. | AC-QB-01 |
| US-QB-02 | P0 | As a **teacher**, I want AI to generate draft questions from a prompt, so that I save preparation time. | AC-QB-02 |
| US-QB-03 | P0 | As a **teacher**, I want to import questions from PDF/Word/Excel, so that I can migrate existing content. | AC-QB-03 |
| US-QB-04 | P0 | As a **teacher**, I want duplicate detection on import, so that my bank stays clean. | AC-QB-04 |
| US-QB-05 | P0 | As a **teacher**, I want to review and publish AI-generated questions, so that only verified content reaches students. | AC-QB-05 |

---

## Matches

| ID | Priority | Story | Acceptance Criteria Ref |
|---|---|---|---|
| US-MATCH-01 | P0 | As a **student**, I want to challenge a same-grade peer to a 1v1 match, so that I can compete while learning. | AC-MATCH-01 |
| US-MATCH-02 | P0 | As a **student**, I want real-time match updates, so that the game feels fair and responsive. | AC-MATCH-02 |
| US-MATCH-03 | P0 | As a **student**, I want to reconnect if my connection drops, so that I don't lose my match unfairly. | AC-MATCH-03 |
| US-MATCH-04 | P0 | As a **student**, I want focus-loss warnings, so that matches stay fair. | AC-MATCH-04 |
| US-MATCH-05 | P0 | As a **student**, I want to see match history and results, so that I can track my performance. | AC-MATCH-05 |

---

## Gamification

| ID | Priority | Story | Acceptance Criteria Ref |
|---|---|---|---|
| US-GAME-01 | P0 | As a **student**, I want to earn XP and rank up, so that I feel rewarded for learning. | AC-GAME-01 |
| US-GAME-02 | P0 | As a **student**, I want to unlock achievements, so that I have milestones to pursue. | AC-GAME-02 |
| US-GAME-03 | P0 | As a **student**, I want weekly missions, so that I have short-term goals. | AC-GAME-03 |
| US-GAME-04 | P0 | As a **student**, I want to maintain a daily streak, so that I build consistent habits. | AC-GAME-04 |
| US-GAME-05 | P1 | As a **student**, I want to see class leaderboards, so that I can compare with peers. | AC-GAME-05 |

---

## Teacher & Classroom

| ID | Priority | Story | Acceptance Criteria Ref |
|---|---|---|---|
| US-TCH-01 | P0 | As a **teacher**, I want to manage classes and rosters, so that I can organize my students. | AC-TCH-01 |
| US-TCH-02 | P0 | As a **teacher**, I want to create and publish assignments, so that students have structured homework. | AC-TCH-02 |
| US-TCH-03 | P0 | As a **teacher**, I want a dashboard showing class progress, so that I can identify struggling students. | AC-TCH-03 |
| US-TCH-04 | P1 | As a **teacher**, I want detailed analytics reports, so that I can adjust my teaching. | AC-TCH-04 |

---

## Administration

| ID | Priority | Story | Acceptance Criteria Ref |
|---|---|---|---|
| US-ADM-01 | P0 | As an **admin**, I want to manage users in my school, so that accounts stay accurate. | AC-ADM-01 |
| US-ADM-02 | P0 | As an **admin**, I want a school-wide performance overview, so that I can report to leadership. | AC-ADM-02 |
| US-ADM-03 | P0 | As an **admin**, I want to configure school settings, so that the platform fits our policies. | AC-ADM-03 |
| US-ADM-04 | P1 | As an **admin**, I want compliance and audit reports, so that we meet FERPA requirements. | AC-ADM-04 |

---

## Notifications

| ID | Priority | Story | Acceptance Criteria Ref |
|---|---|---|---|
| US-NOTIF-01 | P0 | As a **student**, I want in-app notifications for match invites and achievements, so that I don't miss events. | AC-NOTIF-01 |
| US-NOTIF-02 | P1 | As a **teacher**, I want email notifications for assignment deadlines, so that I stay informed. | AC-NOTIF-02 |

---

*See `Acceptance-Criteria.md` for detailed AC definitions and `Requirements-Traceability-Matrix.md` for full mapping.*
