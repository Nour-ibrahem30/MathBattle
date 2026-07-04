# Glossary — MathQuest

**Version:** 1.0.0

---

## A

**Achievement** — A one-time reward unlocked when a student meets a specific trigger condition (e.g., first lesson completed, 7-day streak). Achievements award XP and are displayed on the student dashboard.

**Anti-Cheat** — The system of rules and detection mechanisms that prevent unfair behavior during matches, including browser focus detection and suspicious answer timing analysis.

**Assessment (Final Assessment)** — The summative evaluation at the end of a learning unit. Requires completion of all challenges in the unit as a prerequisite.

---

## B

**Bloom's Taxonomy Level** — A classification of cognitive complexity for questions: Remember, Understand, Apply, Analyze, Evaluate, Create. Used to tag questions in the question bank.

**Business Rule (BR)** — A constraint or policy that governs platform behavior, defined in `02-requirements/BRS.md`.

---

## C

**Card** — A question unit in a multiplayer match. Each card has a color (Green, Blue, Purple, Orange, Red) that determines its point value. Cards are hidden until revealed during the match.

**Challenge** — A learning activity within a unit that follows lesson completion. More difficult than practice; required before the final assessment.

**Class** — A group of students assigned to a teacher within a school. Teachers manage assignments and view analytics at the class level.

**COPPA** — Children's Online Privacy Protection Act (US). Requires parental consent for data collection from users under 13.

---

## D

**Dashboard** — The role-specific home screen for each user type: Student Dashboard, Teacher Dashboard, Administrator Dashboard.

**Difficulty** — A 1–5 integer rating assigned to each question indicating its cognitive challenge level. Used for question bank filtering and AI generation targeting.

**Duplicate Detection** — The AI-powered process of identifying questions in an import or generation batch that are semantically similar to existing questions in the question bank.

---

## E

**Enrollment** — The record linking a student to a learning path. Created when a student begins a path or is assigned one by a teacher.

---

## F

**FERPA** — Family Educational Rights and Privacy Act (US). Governs the privacy of student education records.

**Final Assessment** — See Assessment.

**Focus Detection** — The browser-level mechanism that detects when a student switches tabs or loses window focus during a match. Used for anti-cheat enforcement.

---

## G

**Gamification** — The application of game mechanics (XP, ranks, achievements, missions, streaks, leaderboards, tournaments) within learning activities to motivate continued engagement. Gamification in MathQuest is always secondary to educational outcomes.

**Grade** — The academic year level of a student (1–12). Used to scope learning paths, question bank content, and match pairing.

**GDPR** — General Data Protection Regulation (EU). Governs data protection and privacy for EU users.

---

## H

**Hidden Card** — A match card whose color (and therefore point value) is not revealed to students until the question is presented. Creates strategic uncertainty in matches.

**Hint** — An optional clue attached to a question, available to students during lessons and practice. Up to 3 hints per question. Hint usage is tracked for analytics.

---

## J

**JWT (JSON Web Token)** — The authentication token issued on login. Short-lived (15-minute expiry). Used in the Authorization header of all authenticated API requests.

---

## L

**Leaderboard** — A ranked list of students by XP or match wins, scoped to class or school. Available in Phase 2.

**Learning Path** — The structured curriculum hierarchy: Grade → Subject → Unit → Lesson → Practice → Challenge → Final Assessment.

**Lesson** — A discrete learning activity within a unit. Contains a set of questions. Completion unlocks practice and challenge activities.

---

## M

**Match** — A 1v1 multiplayer session between two students of the same grade. Consists of 10 hidden-card questions with weighted scoring.

**Mission** — A weekly challenge with a specific goal (e.g., "Complete 5 lessons this week"). Completing a mission awards bonus XP.

---

## P

**Practice** — A learning activity following lesson completion. Lower stakes than a challenge; used for reinforcement.

**PRD** — Product Requirements Document. The primary product specification document.

**Pending Review** — The status of AI-generated or imported questions awaiting teacher approval before publication.

---

## Q

**Question Bank** — The repository of all questions on the platform, organized by grade, subject, unit, lesson, topic, and subtopic. Each question has full metadata including Bloom's level, difficulty, hints, solution, tags, and version history.

---

## R

**RBAC (Role-Based Access Control)** — The permission system that restricts platform actions based on user role (student, teacher, administrator, platform operator).

**Rank** — A student's level in the gamification system, determined by total XP. Ranks: Novice, Apprentice, Scholar, Expert, Master, Champion, Legend.

**Refresh Token** — A long-lived token (30-day expiry) used to obtain a new JWT without re-authentication. Rotated on every use.

---

## S

**School Code** — A unique identifier for a school on the platform. Used during registration to link users to their institution.

**Semester** — A half-year academic period (1 or 2). Used to organize questions and learning paths within a grade.

**Soft Delete** — The practice of marking records as deleted (deleted_at timestamp) rather than removing them from the database. Preserves audit history.

**Streak** — A count of consecutive calendar days on which a student has completed at least one learning activity. Broken by a missed day.

---

## T

**Teacher Review** — The mandatory process by which a teacher reviews, edits, and approves AI-generated or imported questions before they are published to the question bank.

**Tournament** — A structured competition between multiple students, available in Phase 2.

---

## U

**Unit** — A collection of lessons, practices, challenges, and a final assessment within a subject. The primary organizational unit of a learning path.

---

## V

**Version History** — The record of all edits to a question, stored as immutable version records. Allows teachers to view and restore previous versions.

---

## W

**WebSocket** — The real-time communication protocol used for multiplayer matches. Provides low-latency bidirectional communication between the client and match server.

---

## X

**XP (Experience Points)** — The currency of the gamification system. Awarded for learning activities, match results, achievements, and missions. Determines student rank.

---

*This glossary is maintained alongside the documentation. Any new term introduced in a document should be added here.*
