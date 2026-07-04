# Acceptance Criteria — MathQuest

**Version:** 1.0.0

---

## Authentication

### AC-AUTH-01: Student Registration
- Given a valid email, password, school code, and grade, when a student submits the registration form, then an account is created and a JWT is returned within 10 seconds.
- Given an email that already exists, when registration is submitted, then a 409 error is returned with a clear message.
- Given a student under 13, when registration is submitted, then the account is created with `pending_parental_consent` status and a parental consent email is sent.
- Given an invalid school code, when registration is submitted, then a 400 error is returned.

### AC-AUTH-02: Login
- Given valid credentials, when login is submitted, then a JWT and refresh token are returned within 500ms.
- Given invalid credentials, when login is submitted, then a 401 error is returned with a generic message (no field-level disclosure).
- Given 5 failed login attempts within 15 minutes, when a 6th attempt is made, then a 429 error is returned with a Retry-After header.
- Given a suspended account, when login is submitted, then a 403 error is returned with a contact-administrator message.

### AC-AUTH-03: Password Reset
- Given a valid email, when a reset is requested, then a reset email is sent and a 200 response is returned regardless of whether the email exists.
- Given a valid reset token, when a new password is submitted, then the password is updated and all existing sessions are invalidated.
- Given an expired reset token (> 1 hour), when a new password is submitted, then a 400 error is returned.

---

## Learning Paths

### AC-LP-01: Lesson Prerequisite
- Given a student who has not completed the previous lesson, when they attempt to start the next lesson, then a 403 error is returned with the prerequisite lesson identified.
- Given a student who has completed the prerequisite, when they start the next lesson, then the lesson loads within 2 seconds.

### AC-LP-02: Lesson Completion
- Given a student who submits all answers, when the lesson is completed, then the score is calculated correctly, XP is awarded, and the next recommended activity is returned.
- Given a student who scores 100%, when the lesson is completed, then the "Perfect Score" achievement is triggered.
- Given a network interruption mid-lesson, when the student reconnects, then their progress is preserved and they can resume.

### AC-LP-03: Final Assessment Prerequisite
- Given a student who has not completed all unit challenges, when they attempt to start the final assessment, then a 403 error is returned listing incomplete challenges.

---

## Matches

### AC-M-01: Match Creation
- Given two students of the same grade, when a match is created, then both students are notified and the match lobby loads within 3 seconds.
- Given a student who attempts to challenge an opponent of a different grade, then the match creation is rejected with a clear error.
- Given a student already in an active match, when they attempt to create another match, then a 409 error is returned.

### AC-M-02: Match Scoring
- Given a correct answer on a Green card (1pt), when scored, then the student's score increases by 1.
- Given a correct answer on a Red card (5pt), when scored, then the student's score increases by 5.
- Given a wrong answer on any card, when scored, then the student's score decreases by 1 (minimum 0).
- Given a student whose score is 0 and they answer wrong, when scored, then the score remains 0.

### AC-M-03: Anti-Cheat
- Given a student who switches browser tabs during a match, when detected, then a warning notification is sent and the event is logged.
- Given a student who switches tabs a second time, when detected, then the match is forfeited for that student and the opponent wins.
- Given a match forfeit due to anti-cheat, when the result is recorded, then the non-violating student receives full win XP and rank points.

### AC-M-04: Match Completion
- Given both students complete all 10 cards, when the match ends, then final scores, winner, XP earned, and rank change are displayed within 2 seconds.
- Given a match result, when recorded, then it appears in both students' match history within 5 seconds.

---

## Question Bank

### AC-QB-01: Question Creation
- Given a teacher who submits a question with all required fields, when created, then the question is saved with status `draft` and version 1.
- Given a teacher who submits a question missing required fields, when submitted, then a 400 error is returned with field-level validation messages.
- Given a question similar to an existing one, when created, then a duplicate warning is returned with the similar question ID.

### AC-QB-02: Question Import
- Given a valid CSV file with 50 questions, when imported, then all questions are processed within 60 seconds and the teacher is notified with a summary.
- Given a CSV with duplicate questions, when imported, then duplicates are flagged in the summary and not imported without teacher confirmation.
- Given an invalid file type, when uploaded, then a 400 error is returned immediately.

### AC-QB-03: Question Publishing
- Given a question in `pending_review` status with all required fields, when a teacher approves it, then the status changes to `published` and it becomes available for assignments and matches.
- Given a question missing required fields, when a teacher attempts to publish it, then a 400 error is returned listing missing fields.

---

## AI Engine

### AC-AI-01: Question Generation
- Given a teacher who requests 5 questions for Grade 7, Algebra, difficulty 3, when generated, then 5 questions are returned within 15 seconds with all metadata fields populated.
- Given an AI provider timeout, when generation is requested, then a 503 error is returned with a user-friendly message and retry suggestion.
- Given generated questions that are all duplicates, when returned, then a warning is shown with links to existing similar questions.

---

## Gamification

### AC-G-01: XP Award
- Given a student who completes a lesson with ≥ 80% score, when the lesson is completed, then 20 XP is awarded and reflected on the dashboard within 2 seconds.
- Given a student who wins a match, when the match ends, then 25 XP is awarded.

### AC-G-02: Rank Up
- Given a student whose XP crosses a rank threshold, when XP is awarded, then the rank is updated and a rank-up notification is displayed.

### AC-G-03: Streak
- Given a student who completes an activity on consecutive calendar days, when the streak is calculated, then the streak count increments correctly.
- Given a student who misses a calendar day, when the streak is calculated, then the streak resets to 0.

---

## Dashboards

### AC-D-01: Student Dashboard
- Given an authenticated student, when the dashboard is loaded, then it renders within 500ms with current XP, streak, active missions, and AI recommendation.
- Given a new student with no activity, when the dashboard is loaded, then an empty state is shown with a "Start your first lesson" call to action.

### AC-D-02: Teacher Dashboard
- Given an authenticated teacher, when the dashboard is loaded, then it renders within 1 second with class list, at-risk student flags, and recent assignment completion rates.
- Given a class with no activity in 7 days, when the dashboard is loaded, then the class is flagged as at-risk.

### AC-D-03: Admin Dashboard
- Given an authenticated administrator, when the dashboard is loaded, then school-wide performance summary is visible within 2 seconds.
- Given an administrator who requests a report export, when the export is complete, then a PDF or CSV is downloadable within 10 seconds.

---

*See `02-requirements/Requirements-Traceability-Matrix.md` for traceability to business rules and architecture.*
