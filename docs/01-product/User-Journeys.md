# User Journeys — MathBattle

**Version:** 1.0.0

---

## Journey 1 — Student First-Time Onboarding

**Persona:** Any new student
**Trigger:** Teacher or administrator creates a student account and shares login credentials.

### Steps

| Step | User Action | System Responsibility |
|---|---|---|
| 1 | Receives login credentials via email or printed card | System sends welcome email with temporary password |
| 2 | Opens platform URL on any device | System serves responsive login page |
| 3 | Logs in with credentials | System authenticates, forces password change on first login |
| 4 | Completes onboarding wizard (grade, name confirmation) | System assigns grade-level learning path, creates student profile |
| 5 | Views student dashboard for the first time | System shows empty state with guided first action: "Start your first lesson" |
| 6 | Clicks first recommended lesson | System loads first lesson in grade-level learning path |
| 7 | Completes lesson | System records progress, awards first achievement, shows next recommended activity |

### Failure States
- Invalid credentials: show clear error, offer password reset
- No learning path assigned for grade: show placeholder with "Your teacher is setting up your content" message
- Session timeout during onboarding: preserve wizard state, resume on next login

### Success State
Student has completed their first lesson, earned their first achievement, and sees a clear next action on their dashboard.

### Metrics
- Onboarding completion rate (wizard → first lesson)
- Time from first login to first lesson completion

---

## Journey 2 — Student Daily Practice Session

**Persona:** Alex (Struggling Student), Jordan (Competitive Student)
**Trigger:** Student logs in for a daily practice session.

### Steps

| Step | User Action | System Responsibility |
|---|---|---|
| 1 | Logs in | System loads dashboard with streak status, active missions, AI recommendation |
| 2 | Views AI-recommended activity | System surfaces next lesson or practice based on weakness analysis |
| 3 | Starts recommended lesson | System loads lesson with questions, hints available |
| 4 | Answers questions | System validates answers, provides immediate feedback, tracks performance |
| 5 | Completes lesson | System updates progress, awards XP, checks mission completion |
| 6 | Views result summary | System shows score, correct/incorrect breakdown, hint usage |
| 7 | Accepts match invitation or starts solo practice | System routes to match lobby or next practice set |
| 8 | Logs out or session expires | System saves all progress, updates streak |

### Failure States
- Network interruption mid-lesson: auto-save progress, resume on reconnect
- No AI recommendation available: fall back to next item in learning path
- Match opponent disconnects: award win to remaining student, log event

### Success State
Student completes at least one lesson, maintains streak, and sees updated progress on dashboard.

### Metrics
- Daily active students
- Lessons completed per session
- Streak maintenance rate

---

## Journey 3 — Student Multiplayer Match

**Persona:** Jordan (Competitive Student)
**Trigger:** Student initiates or accepts a match challenge.

### Steps

| Step | User Action | System Responsibility |
|---|---|---|
| 1 | Navigates to Matches section | System shows available opponents (same grade), active invitations |
| 2 | Challenges an opponent or accepts invitation | System creates match session, notifies opponent |
| 3 | Both students enter match lobby | System confirms both players ready, loads 10 hidden cards |
| 4 | Match begins | System reveals cards one at a time; both students see same card simultaneously |
| 5 | Student selects answer | System validates answer, applies score: correct = card points, wrong = −1 |
| 6 | Repeats for all 10 cards | System tracks running score for both players |
| 7 | Match ends | System calculates final scores, determines winner, awards XP and rank points |
| 8 | Views result screen | System shows card-by-card breakdown, score comparison, rank change |
| 9 | Returns to dashboard | System updates leaderboard, checks mission/achievement triggers |

### Card Scoring System

| Card Color | Count | Points (Correct) | Points (Wrong) |
|---|---|---|---|
| Green | 4 | +1 | −1 |
| Blue | 3 | +2 | −1 |
| Purple | 1 | +3 | −1 |
| Orange | 1 | +4 | −1 |
| Red | 1 | +5 | −1 |

### Failure States
- Opponent disconnects before match starts: cancel match, no penalty
- Opponent disconnects mid-match: award win to remaining student after 30-second timeout
- Network interruption: attempt reconnect for 30 seconds, then forfeit with no rank penalty
- Anti-cheat trigger (tab switch, focus loss): log event, warn student, forfeit on second violation

### Success State
Both students complete the match, scores are recorded, rank and XP are updated, result is visible in match history.

### Metrics
- Match completion rate
- Average match duration
- Rematch rate

---

## Journey 4 — Teacher Creates Assignment

**Persona:** Ms. Rivera (Dedicated Teacher)
**Trigger:** Teacher wants to assign practice to a class before an upcoming lesson.

### Steps

| Step | User Action | System Responsibility |
|---|---|---|
| 1 | Logs in, navigates to Teacher Dashboard | System loads class list with last-activity summary |
| 2 | Selects a class | System shows class roster, recent performance, at-risk student flags |
| 3 | Clicks "Create Assignment" | System opens assignment builder |
| 4 | Selects topic, grade, difficulty range | System filters question bank to matching questions |
| 5 | Reviews and selects questions (or uses AI to generate) | System shows question previews with metadata |
| 6 | Sets due date and assigns to class or individual students | System saves assignment, schedules notifications |
| 7 | Publishes assignment | System notifies students, makes assignment visible on student dashboards |
| 8 | Monitors completion | System shows real-time completion rate and score distribution |

### Failure States
- No questions match filter criteria: suggest broadening filters or offer AI generation
- AI generation fails: show error, allow manual question selection
- Student not in class roster: prompt to add student before assigning

### Success State
Assignment is published, students are notified, teacher can monitor completion in real time.

### Metrics
- Assignments created per teacher per week
- Assignment completion rate
- Time from assignment creation to publication

---

## Journey 5 — Teacher Uses AI Question Generation

**Persona:** Mr. Okafor (New Teacher), Ms. Rivera (Dedicated Teacher)
**Trigger:** Teacher needs questions for a specific topic and does not have enough in the question bank.

### Steps

| Step | User Action | System Responsibility |
|---|---|---|
| 1 | Navigates to Question Bank → AI Generate | System opens AI generation panel |
| 2 | Enters prompt: topic, grade, difficulty, Bloom's level, quantity | System validates inputs |
| 3 | Clicks "Generate" | System sends request to AI engine, shows loading state |
| 4 | Reviews generated questions | System displays questions with metadata, difficulty estimate, duplicate warnings |
| 5 | Edits individual questions if needed | System allows inline editing of question text, options, answer, hints |
| 6 | Approves or rejects each question | System moves approved questions to "Pending Review" status |
| 7 | Publishes approved questions to question bank | System sets status to "Published", makes available for assignments and matches |

### Failure States
- AI generation timeout: show error, allow retry
- All generated questions flagged as duplicates: notify teacher, show existing similar questions
- Generated questions fail quality check: flag with warning, require teacher confirmation before publish

### Success State
Teacher has a set of reviewed, published questions ready for use in assignments or matches.

### Metrics
- AI generation requests per teacher per week
- Acceptance rate of AI-generated questions
- Time from generation to publication

---

## Journey 6 — Administrator Reviews School Performance

**Persona:** Mr. Chen (Administrator)
**Trigger:** Weekly performance review or district reporting deadline.

### Steps

| Step | User Action | System Responsibility |
|---|---|---|
| 1 | Logs in, lands on Admin Dashboard | System shows school-wide summary: active students, lessons completed, average scores |
| 2 | Selects grade level for drill-down | System shows grade-level performance breakdown by subject and unit |
| 3 | Identifies underperforming classes | System highlights classes below threshold with visual indicator |
| 4 | Clicks on a class for detail | System shows class performance, teacher activity, assignment completion rates |
| 5 | Exports report | System generates PDF or CSV report with selected date range and metrics |
| 6 | Manages user accounts if needed | System provides user search, add, deactivate, password reset functions |

### Failure States
- Report generation timeout: queue report, notify admin when ready
- No data for selected period: show empty state with explanation
- User account action fails: show error with retry option

### Success State
Administrator has a complete performance overview and an exportable report ready for district submission.

### Metrics
- Admin dashboard weekly active usage
- Report export frequency
- User management actions per month

---

*See `01-product/Personas.md` for persona context and `02-requirements/FRS-Detailed.md` for function-level specifications.*
