# Functional Requirements Specification — Detailed (FRS-Detailed) — MathBattle

**Version:** 1.0.0
**Status:** Approved for Engineering

---

## 1. Authentication Module

### 1.1 User Registration

**Function Name:** RegisterUser

**Purpose:** Allow a new user to create an account on the platform with the appropriate role.

**Users:** Student (self-register or teacher-created), Teacher (admin-created), Administrator (platform-created)

**Trigger / Entry Point:** POST /api/v1/auth/register

**UI/Screen Description:** Registration form with fields for email, password, confirm password, full name, role, school code, and grade (students only). Onboarding wizard follows successful registration.

**Inputs:**
- email (string, required, unique)
- password (string, required, min 8 chars, complexity rules)
- full_name (string, required)
- role (enum: student | teacher | admin)
- school_code (string, required — links user to school)
- grade (integer 1–12, required for students)
- date_of_birth (date, required for students — COPPA enforcement)

**Business Logic:**
1. Validate all inputs server-side.
2. Check email uniqueness across all users.
3. Validate school_code exists and is active.
4. If student age < 13: set account status to `pending_parental_consent`; send parental consent email.
5. Hash password with bcrypt (cost factor ≥ 12).
6. Create user record with status `active` (or `pending_parental_consent`).
7. Create role-specific profile record (student_profile, teacher_profile, or admin_profile).
8. Send welcome email with temporary password if teacher/admin-created.
9. Log registration event to audit log.

**Outputs / States:**
- 201 Created: user record, JWT, refresh token (if self-register and age ≥ 13)
- 201 Created: pending status message (if age < 13)
- 400 Bad Request: validation errors
- 409 Conflict: email already exists

**Validation Rules:**
- Email: valid format, max 255 chars, unique
- Password: min 8 chars, at least 1 uppercase, 1 number, 1 special character
- School code: must exist in schools table, must be active
- Grade: integer 1–12 (students only)
- Date of birth: must be a valid past date

**Error Handling:**
- Duplicate email: return 409 with field-level error
- Invalid school code: return 400 with clear message
- Age < 13: do not block registration; set pending consent status; do not issue JWT until consent received

**Permissions:** Public endpoint (no auth required)

**Dependencies:** schools table, users table, student_profiles table, email service, audit log

**Acceptance Criteria:**
- Student can register and receive JWT within 10 seconds
- Under-13 student registration triggers parental consent email
- Duplicate email returns 409 with clear error message
- Password complexity enforced server-side
- School code validation prevents orphaned user accounts

---

### 1.2 User Login

**Function Name:** LoginUser

**Purpose:** Authenticate a user and issue a JWT and refresh token.

**Users:** All

**Trigger / Entry Point:** POST /api/v1/auth/login

**UI/Screen Description:** Login form with email and password fields. "Forgot password" link. Redirect to role-appropriate dashboard on success.

**Inputs:**
- email (string, required)
- password (string, required)

**Business Logic:**
1. Look up user by email.
2. Verify password against stored bcrypt hash.
3. Check account status: reject if `suspended`, `deactivated`, or `pending_parental_consent`.
4. If first login: set flag `force_password_change = true` in response.
5. Issue JWT (15-minute expiry) and refresh token (30-day expiry).
6. Store refresh token hash in database.
7. Log login event to audit log with IP and user agent.
8. Apply rate limiting: max 5 failed attempts per 15 minutes per IP.

**Outputs / States:**
- 200 OK: JWT, refresh token, user profile, force_password_change flag
- 401 Unauthorized: invalid credentials
- 403 Forbidden: account suspended or pending consent
- 429 Too Many Requests: rate limit exceeded

**Validation Rules:**
- Email and password must be non-empty
- Rate limit: 5 attempts per 15 minutes per IP

**Error Handling:**
- Invalid credentials: generic "Invalid email or password" (do not reveal which field is wrong)
- Suspended account: "Your account has been suspended. Contact your administrator."
- Rate limit: return 429 with Retry-After header

**Permissions:** Public endpoint

**Dependencies:** users table, refresh_tokens table, rate limiter (Redis), audit log, email service

**Acceptance Criteria:**
- Valid credentials return JWT and refresh token within 500ms
- Invalid credentials return 401 with generic message
- 5 failed attempts trigger 15-minute lockout
- First-login flag triggers password change screen on client

---

### 1.3 Password Reset

**Function Name:** ResetPassword

**Purpose:** Allow a user to reset their password via a time-limited email token.

**Users:** All

**Trigger / Entry Point:** POST /api/v1/auth/password-reset/request (request link), POST /api/v1/auth/password-reset/confirm (set new password)

**Inputs (request):** email
**Inputs (confirm):** token, new_password, confirm_password

**Business Logic:**
1. Request: look up user by email. If found, generate a cryptographically random token (32 bytes), store hash with 1-hour expiry, send reset email. Always return 200 (do not reveal if email exists).
2. Confirm: validate token against stored hash, check expiry, validate new password complexity, update password hash, invalidate all existing refresh tokens, log event.

**Outputs:** 200 OK (both steps); 400 for invalid/expired token or password mismatch

**Acceptance Criteria:**
- Reset link expires after 1 hour
- Token is single-use
- All existing sessions invalidated after password reset
- Email enumeration not possible (always return 200 on request)

---

## 2. Learning Path Module

### 2.1 Start Lesson

**Function Name:** StartLesson

**Purpose:** Allow a student to begin a lesson within their enrolled learning path.

**Users:** Student

**Trigger / Entry Point:** POST /api/v1/learning/lessons/{lesson_id}/start

**UI/Screen Description:** Lesson view with question cards, progress indicator, hint button, and submit button. Timer optional (configurable per lesson).

**Inputs:**
- lesson_id (UUID, required)
- JWT (authenticated student)

**Business Logic:**
1. Verify student is enrolled in the learning path containing this lesson.
2. Check prerequisite: previous lesson in unit must be completed (status = `completed`).
3. If prerequisite not met: return 403 with prerequisite information.
4. Create or resume lesson_attempt record with status `in_progress`.
5. Load questions for lesson (ordered, from question bank, filtered by lesson assignment).
6. Return lesson content with questions (answers not included in response).

**Outputs:**
- 200 OK: lesson content, questions (without answers), attempt_id
- 403 Forbidden: prerequisite not met
- 404 Not Found: lesson not found or not in student's path

**Validation Rules:**
- Student must be enrolled in the path
- Prerequisite lesson must be completed
- Lesson must be in `published` status

**Error Handling:**
- Prerequisite not met: return 403 with message indicating which lesson must be completed first
- Lesson not published: return 404

**Permissions:** Authenticated student only

**Dependencies:** learning_paths, lessons, lesson_attempts, questions, enrollments tables

**Acceptance Criteria:**
- Student cannot access lesson without completing prerequisite
- Lesson attempt is created and resumable if student navigates away
- Questions are served without correct answers in the response payload

---

### 2.2 Complete Lesson

**Function Name:** CompleteLesson

**Purpose:** Submit lesson answers, calculate score, update progress, trigger gamification events.

**Users:** Student

**Trigger / Entry Point:** POST /api/v1/learning/lessons/{lesson_id}/complete

**Inputs:**
- attempt_id (UUID)
- answers (array of {question_id, selected_answer, time_taken_seconds})

**Business Logic:**
1. Validate attempt belongs to authenticated student and is `in_progress`.
2. Score each answer: compare to correct_answer in questions table.
3. Calculate score percentage.
4. Update lesson_attempt: status = `completed`, score, completed_at.
5. Update student learning path progress.
6. Trigger AI weakness analysis job (async).
7. Award XP based on score (see gamification rules).
8. Check mission and achievement triggers (async).
9. Determine next recommended activity (AI or fallback to next in path).

**Outputs:**
- 200 OK: score, correct/incorrect per question, XP earned, achievements unlocked, next_activity recommendation
- 400 Bad Request: invalid attempt_id or already completed

**Acceptance Criteria:**
- Score calculated correctly for all answer types
- XP awarded immediately and reflected on dashboard
- Achievements checked and unlocked within 5 seconds
- AI weakness analysis queued (not blocking response)
- Next activity recommendation returned in response

---

## 3. Match Module

### 3.1 Create Match

**Function Name:** CreateMatch

**Purpose:** Initiate a 1v1 multiplayer match between two students of the same grade.

**Users:** Student

**Trigger / Entry Point:** POST /api/v1/matches

**Inputs:**
- opponent_id (UUID, optional — if not provided, system finds available opponent)
- JWT (authenticated student)

**Business Logic:**
1. Validate initiating student is authenticated and active.
2. If opponent_id provided: validate opponent is same grade, same school, active, not in another match.
3. If no opponent_id: find available opponent from match queue (same grade, same school).
4. Create match record with status `pending`.
5. Send match invitation notification to opponent.
6. Set 60-second acceptance timeout; if not accepted, cancel match.

**Outputs:**
- 201 Created: match_id, opponent info (name, rank), status `pending`
- 404 Not Found: opponent not found or not eligible
- 409 Conflict: student already in an active match

**Acceptance Criteria:**
- Match only created between same-grade students
- Acceptance timeout enforced (60 seconds)
- Student cannot be in two matches simultaneously

---

### 3.2 Play Match

**Function Name:** PlayMatch

**Purpose:** Execute the real-time match session with hidden-card question delivery and scoring.

**Users:** Student (both participants)

**Trigger / Entry Point:** WebSocket connection to /ws/matches/{match_id}

**UI/Screen Description:** Match arena showing both players' scores, current card (hidden until revealed), question text, answer options, timer per card (30 seconds), running score.

**Business Logic:**
1. Both students connect via WebSocket.
2. System confirms both connected; sets match status to `active`.
3. System selects 10 questions from question bank matching both students' grade.
4. Card distribution: 4 Green (1pt), 3 Blue (2pt), 1 Purple (3pt), 1 Orange (4pt), 1 Red (5pt). Shuffled.
5. For each card:
   a. Reveal card color and question simultaneously to both players.
   b. 30-second answer timer per card.
   c. Accept first answer from each player (or timeout = no answer).
   d. Score: correct = +card_points; wrong or timeout = −1 (minimum score = 0).
   e. Broadcast both players' running scores.
6. After 10 cards: calculate final scores, determine winner (higher score wins; tie = draw).
7. Update match record: status = `completed`, scores, winner_id.
8. Award XP and rank points.
9. Check anti-cheat log for violations.

**Anti-Cheat Rules:**
- Browser focus loss during match: log event, send warning to student.
- Second focus loss: forfeit match for violating student; opponent wins.
- Tab switch detection: same as focus loss.
- Suspicious answer timing (< 1 second consistently): flag for review, do not auto-forfeit.

**Outputs (WebSocket events):**
- `match_started`: both players connected, match begins
- `card_revealed`: card color, question, options, timer
- `answer_received`: confirmation of answer submission
- `card_result`: correct/incorrect, points awarded, running scores
- `match_completed`: final scores, winner, XP earned, rank change
- `match_forfeited`: reason, winner

**Acceptance Criteria:**
- Both players see same question simultaneously
- Scoring is server-authoritative (client cannot manipulate score)
- Anti-cheat events logged and second violation triggers forfeit
- Match result persisted even if one player disconnects after completion
- Minimum score is 0 (cannot go negative)

---

## 4. Question Bank Module

### 4.1 Create Question

**Function Name:** CreateQuestion

**Purpose:** Allow a teacher to create a new question with full metadata.

**Users:** Teacher

**Trigger / Entry Point:** POST /api/v1/questions

**Inputs:**
- question_text (string, required, max 2000 chars)
- question_type (enum: multiple_choice | true_false | short_answer)
- options (array of {text, is_correct} — required for multiple_choice)
- correct_answer (string — required for true_false and short_answer)
- grade (integer 1–12, required)
- semester (integer 1–2, required)
- subject (string, required)
- unit (string, required)
- lesson (string, required)
- topic (string, required)
- subtopic (string, optional)
- bloom_level (enum: remember | understand | apply | analyze | evaluate | create)
- difficulty (integer 1–5, required)
- hints (array of strings, optional, max 3)
- solution_explanation (string, optional)
- tags (array of strings, optional)
- status (enum: draft | pending_review | published — default: draft)

**Business Logic:**
1. Validate all required fields.
2. For multiple_choice: validate exactly one option has is_correct = true.
3. Check for duplicates: run similarity check against existing questions in same grade/topic.
4. If duplicate detected: return warning with similar question IDs; allow teacher to proceed or cancel.
5. Create question record with version = 1, created_by = authenticated teacher.
6. Log creation to audit log.

**Outputs:**
- 201 Created: question record with ID
- 400 Bad Request: validation errors
- 200 OK with warning: duplicate detected (teacher must confirm)

**Acceptance Criteria:**
- Question created with all metadata fields
- Duplicate detection runs on creation
- Version 1 created automatically
- Teacher cannot publish question without required fields

---

### 4.2 Import Questions

**Function Name:** ImportQuestions

**Purpose:** Allow a teacher to bulk-import questions from CSV, Excel, PDF, or Word documents.

**Users:** Teacher

**Trigger / Entry Point:** POST /api/v1/questions/import (multipart/form-data)

**Inputs:**
- file (required: .csv, .xlsx, .xls, .pdf, .docx)
- field_mapping (JSON object mapping file columns to question fields — for CSV/Excel)
- grade (integer — applied to all imported questions if not in file)
- default_status (enum: draft | pending_review — default: pending_review)

**Business Logic:**
1. Validate file type and size (max 10MB).
2. Parse file based on type:
   - CSV/Excel: map columns to question fields using field_mapping.
   - PDF/Word: extract text, use AI to identify question structure.
3. Validate each parsed question against required field rules.
4. Run duplicate detection on all parsed questions.
5. Create import_job record with status `processing`.
6. Process questions asynchronously (background job).
7. For each question: create record with status `pending_review` (or `draft` if specified).
8. On completion: update import_job with results (total, imported, duplicates, errors).
9. Notify teacher via in-app notification.

**Outputs:**
- 202 Accepted: import_job_id (processing is async)
- 400 Bad Request: invalid file type or size
- GET /api/v1/questions/import/{job_id}: job status and results

**Acceptance Criteria:**
- CSV import of 50 questions completes within 60 seconds
- Duplicate questions flagged with reference to existing question
- All imported questions enter pending_review status
- Teacher notified on completion with summary (imported, duplicates, errors)
- Parsing errors reported per row with clear description

---

## 5. AI Engine Module

### 5.1 Generate Questions

**Function Name:** GenerateQuestions

**Purpose:** Use AI to generate curriculum-aligned questions based on teacher-specified parameters.

**Users:** Teacher

**Trigger / Entry Point:** POST /api/v1/ai/generate-questions

**Inputs:**
- grade (integer 1–12, required)
- subject (string, required)
- topic (string, required)
- subtopic (string, optional)
- bloom_level (enum, optional)
- difficulty (integer 1–5, optional)
- quantity (integer 1–20, required)
- additional_instructions (string, optional, max 500 chars)

**Business Logic:**
1. Validate inputs.
2. Construct AI prompt using template with all parameters.
3. Send request to AI provider (async job for quantities > 5).
4. Parse AI response into question objects.
5. Run difficulty estimation on each generated question.
6. Run duplicate detection against existing question bank.
7. Set all generated questions to status `pending_review`.
8. Return questions to teacher for review.

**Outputs:**
- 200 OK (sync, ≤ 5 questions): array of generated questions with metadata and duplicate warnings
- 202 Accepted (async, > 5 questions): job_id
- 503 Service Unavailable: AI provider unavailable (with fallback message)

**Error Handling:**
- AI provider timeout (> 30 seconds): return 503, suggest retry
- AI returns malformed response: log error, return 500 with user-friendly message
- All generated questions are duplicates: return 200 with warning, show existing similar questions

**Acceptance Criteria:**
- 5 questions generated within 15 seconds
- All generated questions include grade, topic, difficulty, Bloom's level
- Duplicate detection runs before returning to teacher
- Teacher can edit any field before approving
- AI provider failure does not crash the platform

---

## 6. Gamification Module

### 6.1 XP and Rank System

**Function Name:** AwardXP

**Purpose:** Award experience points for learning activities and update student rank.

**Users:** System (triggered by lesson completion, match result, achievement unlock)

**Trigger / Entry Point:** Internal event — triggered by lesson completion, match completion, achievement unlock

**XP Award Table:**

| Event | XP Awarded |
|---|---|
| Lesson completed (score ≥ 50%) | 10 XP |
| Lesson completed (score ≥ 80%) | 20 XP |
| Lesson completed (score = 100%) | 30 XP |
| Match win | 25 XP |
| Match draw | 10 XP |
| Match loss | 5 XP |
| Achievement unlocked | 15 XP |
| Mission completed | 50 XP |
| Daily streak maintained | 5 XP |

**Rank Thresholds:**

| Rank | XP Required | Badge Color |
|---|---|---|
| Novice | 0 | Grey |
| Apprentice | 100 | Green |
| Scholar | 300 | Blue |
| Expert | 700 | Purple |
| Master | 1500 | Orange |
| Champion | 3000 | Red |
| Legend | 6000 | Gold |

**Business Logic:**
1. Receive XP award event with student_id and amount.
2. Update student_profile.total_xp.
3. Check if new XP total crosses a rank threshold.
4. If rank up: update student_profile.rank, create rank_up event, trigger achievement check.
5. Log XP event to xp_history table.

**Acceptance Criteria:**
- XP awarded within 2 seconds of triggering event
- Rank update reflected on dashboard immediately
- XP history queryable for student analytics

---

### 6.2 Achievements

**Function Name:** CheckAchievements

**Purpose:** Evaluate achievement trigger conditions and unlock achievements for students.

**Users:** System

**Trigger / Entry Point:** Internal event — triggered after lesson completion, match completion, XP award, streak update

**Achievement Catalog (Phase 1):**

| ID | Name | Trigger Condition |
|---|---|---|
| ACH-01 | First Step | Complete first lesson |
| ACH-02 | Perfect Score | Score 100% on any lesson |
| ACH-03 | On Fire | Maintain 7-day streak |
| ACH-04 | Match Winner | Win first match |
| ACH-05 | Undefeated | Win 5 matches in a row |
| ACH-06 | Scholar | Reach Scholar rank |
| ACH-07 | Speed Demon | Complete a lesson in under 5 minutes with ≥ 80% score |
| ACH-08 | Completionist | Complete all lessons in a unit |
| ACH-09 | Mission Master | Complete 10 weekly missions |
| ACH-10 | Question Crusher | Answer 500 questions correctly |

**Business Logic:**
1. On trigger event: evaluate all unearned achievements for the student.
2. For each achievement: check trigger condition against student's event history.
3. If condition met: create student_achievement record, award XP, send in-app notification.
4. Achievements are one-time only (cannot be earned twice).

**Acceptance Criteria:**
- Achievement unlocked within 5 seconds of trigger event
- Achievement notification displayed on student dashboard
- Duplicate achievement prevention enforced

---

## 7. Dashboard Module

### 7.1 Student Dashboard

**Function Name:** GetStudentDashboard

**Purpose:** Provide a student with a personalized overview of their progress, missions, and recommendations.

**Users:** Student

**Trigger / Entry Point:** GET /api/v1/dashboard/student

**Response Includes:**
- Current rank and XP (with progress to next rank)
- Active streak count
- Active missions (up to 3) with progress
- Recent achievements (last 5)
- AI-recommended next activity
- Recent match history (last 5)
- Learning path progress summary (current unit, % complete)
- Pending assignments (from teacher)

**Performance Requirement:** Response within 500ms (cached where possible)

**Acceptance Criteria:**
- Dashboard loads within 500ms
- All data is current (max 60-second cache for non-real-time data)
- Empty states shown for new students with guided first action

---

### 7.2 Teacher Dashboard

**Function Name:** GetTeacherDashboard

**Purpose:** Provide a teacher with a class overview, at-risk student flags, and quick access to key actions.

**Users:** Teacher

**Trigger / Entry Point:** GET /api/v1/dashboard/teacher

**Response Includes:**
- Class list with last-activity summary per class
- At-risk student flags (students with no activity in 7 days or score < 50% on last assessment)
- Recent assignment completion rates
- Question bank summary (total questions, pending review count)
- Quick actions: Create Assignment, Generate Questions, View Reports

**Acceptance Criteria:**
- At-risk students identified correctly based on defined criteria
- Dashboard loads within 1 second
- Teacher can navigate to any class detail within 2 clicks

---

*See `02-requirements/Acceptance-Criteria.md` for full acceptance criteria and `03-architecture/API-Design.md` for API specifications.*
