# Functional Requirements Specification (FRS) — MathBattle

**Version:** 1.0.0
**Note:** This is the short implementation reference. See `FRS-Detailed.md` for full function specifications.

---

## 1. Document Overview

This document defines the functional requirements for MathBattle Phase 1 (MVP). It covers all user-facing and system functions required for launch. Each function is traceable to a business rule in `BRS.md` and an acceptance criterion in `Acceptance-Criteria.md`.

---

## 2. Scope

Phase 1 (MVP) only. Phase 2 and beyond are noted as future where relevant.

---

## 3. Global Rules

- All authenticated requests must include a valid JWT in the Authorization header.
- All responses follow the standard API response envelope (see `03-architecture/API-Design.md`).
- All user inputs are validated server-side regardless of client-side validation.
- All destructive actions (delete, deactivate) use soft delete with audit log entry.
- All timestamps are stored in UTC.
- All student-facing content must pass teacher review before use.

---

## 4. Authentication Functions

| ID | Function | Users | Description |
|---|---|---|---|
| F-AUTH-01 | Register | Student, Teacher, Admin | Create account with email, password, role, grade (student), school |
| F-AUTH-02 | Login | All | Authenticate with email and password; receive JWT + refresh token |
| F-AUTH-03 | Logout | All | Invalidate refresh token; clear session |
| F-AUTH-04 | Password Reset | All | Request reset link via email; set new password via token |
| F-AUTH-05 | Refresh Token | All | Exchange refresh token for new JWT |
| F-AUTH-06 | First Login Password Change | All | Force password change on first login |
| F-AUTH-07 | Session Management | All | View and revoke active sessions |

---

## 5. Learning Path Functions

| ID | Function | Users | Description |
|---|---|---|---|
| F-LP-01 | Browse Learning Paths | Student | View available paths by grade and subject |
| F-LP-02 | Enroll in Path | Student | Enroll in a learning path; system creates progress record |
| F-LP-03 | Start Lesson | Student | Access lesson content; prerequisite check enforced |
| F-LP-04 | Complete Lesson | Student | Submit answers; receive score and feedback; unlock next activity |
| F-LP-05 | Start Practice | Student | Access practice set for completed lesson |
| F-LP-06 | Start Challenge | Student | Access challenge after completing lesson; prerequisite enforced |
| F-LP-07 | Start Final Assessment | Student | Access final assessment after completing all unit challenges |
| F-LP-08 | View Progress | Student | View completion status for all path items |
| F-LP-09 | AI Next-Activity Recommendation | Student | Receive AI-recommended next activity based on performance |

---

## 6. Question Bank Functions

| ID | Function | Users | Description |
|---|---|---|---|
| F-QB-01 | Create Question | Teacher | Create question with full metadata |
| F-QB-02 | Edit Question | Teacher | Edit question; create new version; preserve history |
| F-QB-03 | Tag Question | Teacher | Add/edit tags, Bloom's level, difficulty, topic |
| F-QB-04 | Publish Question | Teacher | Move question from Draft to Published; validation enforced |
| F-QB-05 | Archive Question | Teacher | Soft-delete question; remove from active use |
| F-QB-06 | Import Questions | Teacher | Import from CSV, Excel, PDF, Word; field mapping; duplicate detection |
| F-QB-07 | Review AI Questions | Teacher | Review, edit, approve, or reject AI-generated questions |
| F-QB-08 | Search Question Bank | Teacher | Search by grade, topic, difficulty, Bloom's level, tags |
| F-QB-09 | View Question History | Teacher | View version history for any question |

---

## 7. AI Engine Functions

| ID | Function | Users | Description |
|---|---|---|---|
| F-AI-01 | Generate Questions | Teacher | Generate questions from prompt with grade, topic, difficulty, Bloom's level, quantity |
| F-AI-02 | Detect Duplicates | System | Flag questions similar to existing bank entries during import or generation |
| F-AI-03 | Estimate Difficulty | System | Estimate difficulty score for generated or imported questions |
| F-AI-04 | Analyze Student Weaknesses | System | Identify weak topics per student based on answer history |
| F-AI-05 | Recommend Next Activity | System | Recommend next lesson or practice based on weakness analysis |

---

## 8. Match Functions

| ID | Function | Users | Description |
|---|---|---|---|
| F-M-01 | Create Match | Student | Initiate 1v1 match; system finds same-grade opponent |
| F-M-02 | Accept Match | Student | Accept match invitation |
| F-M-03 | Play Match | Student | Answer hidden-card questions; real-time scoring |
| F-M-04 | View Match Result | Student | View card-by-card breakdown, final scores, rank change |
| F-M-05 | View Match History | Student | View past matches with results |
| F-M-06 | Forfeit Match | System | Auto-forfeit on disconnect timeout or anti-cheat violation |

---

## 9. Gamification Functions

| ID | Function | Users | Description |
|---|---|---|---|
| F-G-01 | Earn XP | Student | Award XP for lesson completion, correct answers, match wins |
| F-G-02 | Level Up / Rank | Student | Advance rank when XP threshold reached |
| F-G-03 | Earn Achievement | Student | Unlock achievement when trigger condition met |
| F-G-04 | Complete Mission | Student | Complete weekly mission; award bonus XP |
| F-G-05 | Maintain Streak | Student | Track daily login and activity streak |
| F-G-06 | View Leaderboard | Student | View class or school leaderboard (Phase 2) |

---

## 10. Dashboard Functions

| ID | Function | Users | Description |
|---|---|---|---|
| F-D-01 | Student Dashboard | Student | Progress overview, missions, achievements, AI recommendation, match history |
| F-D-02 | Teacher Dashboard | Teacher | Class roster, assignment management, at-risk flags, question bank access |
| F-D-03 | Admin Dashboard | Admin | User management, school configuration, performance overview |

---

## 11. Notification Functions

| ID | Function | Users | Description |
|---|---|---|---|
| F-N-01 | Match Invitation | Student | In-app notification when challenged to a match |
| F-N-02 | Assignment Published | Student | In-app notification when teacher publishes assignment |
| F-N-03 | Achievement Unlocked | Student | In-app notification when achievement earned |
| F-N-04 | Streak Warning | Student | In-app notification when streak at risk |
| F-N-05 | System Announcement | All | In-app notification for platform updates |

---

## 12. Administration Functions

| ID | Function | Admin | Description |
|---|---|---|---|
| F-A-01 | Manage Users | Admin | Add, deactivate, reset password for students and teachers |
| F-A-02 | Configure School | Admin | Set school name, grade levels, curriculum settings |
| F-A-03 | View Performance Reports | Admin | View school-wide performance by grade, class, subject |
| F-A-04 | Export Reports | Admin | Export performance data as PDF or CSV |
| F-A-05 | View Audit Logs | Admin | View user action audit trail |

---

## 13. Future Functions (Phase 2+)

- Tournaments (F-G-07)
- Cosmetics system (F-G-08)
- Email notifications (F-N-06)
- Advanced AI analytics (F-AI-06)
- GraphQL API (F-API-02)

---

*See `FRS-Detailed.md` for full function specifications including inputs, business logic, validation, error handling, and acceptance criteria.*
