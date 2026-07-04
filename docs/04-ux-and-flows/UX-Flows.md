# UX Flows — MathQuest

**Version:** 1.0.0

---

## Design Principles

- Mobile-first responsive design
- Minimal cognitive load: one primary action per screen
- Immediate feedback on all interactions (loading states, success, error)
- Gamification elements visible but not dominant
- Accessibility: WCAG 2.1 AA; keyboard navigable; screen reader compatible

---

## Flow 1 — Student Login and Dashboard

```
[Login Page]
  │ Enter email + password
  │ Submit
  ▼
[Auth Validation]
  ├── Invalid credentials → Show inline error "Invalid email or password"
  ├── Rate limited → Show "Too many attempts. Try again in X minutes."
  ├── First login → Redirect to [Password Change Screen]
  └── Success → Redirect to [Student Dashboard]

[Student Dashboard]
  ├── Header: Avatar, Rank badge, XP bar, Streak flame icon
  ├── Section: "Continue Learning" → AI-recommended next activity card
  ├── Section: "Active Missions" → Up to 3 mission progress bars
  ├── Section: "Recent Matches" → Last 3 match results
  └── Section: "Recent Achievements" → Last 3 achievement badges
```

---

## Flow 2 — Student Lesson Flow

```
[Student Dashboard]
  │ Click "Continue Learning" or browse paths
  ▼
[Learning Path View]
  │ Shows: Grade, Subject, Units with progress indicators
  │ Click on a Unit
  ▼
[Unit View]
  │ Shows: Lessons, Practice, Challenge, Final Assessment
  │ Locked items shown with lock icon + prerequisite label
  │ Click on available Lesson
  ▼
[Lesson Start Screen]
  │ Shows: Lesson title, question count, estimated time, hint availability
  │ Click "Start Lesson"
  ▼
[Lesson Question View]
  │ Progress bar at top (e.g., "Question 3 of 10")
  │ Question text (large, readable)
  │ Answer options (A, B, C, D for multiple choice)
  │ "Show Hint" button (if hints available)
  │ Submit answer
  ▼
[Answer Feedback]
  ├── Correct → Green highlight, brief celebration animation, "Next" button
  └── Wrong → Red highlight, show correct answer, brief explanation, "Next" button
  ▼
[Lesson Complete Screen]
  │ Score: X/10 (X%)
  │ XP earned: +XX XP
  │ Achievements unlocked (if any)
  │ "Next Activity" button (AI recommendation)
  └── "Back to Dashboard" button
```

---

## Flow 3 — Multiplayer Match Flow

```
[Match Lobby]
  │ Shows: "Find a Match" button, active invitations list
  │ Click "Find a Match"
  ▼
[Matchmaking Screen]
  │ "Finding opponent in your grade..." (animated)
  │ Opponent found → Show opponent name and rank
  │ "Challenge!" button
  ▼
[Match Waiting Room]
  │ Shows: Your avatar + rank vs. Opponent avatar + rank
  │ "Waiting for opponent to accept..." (60-second countdown)
  ├── Opponent declines → "Opponent declined. Find another match?"
  └── Opponent accepts → Transition to Match Arena
  ▼
[Match Arena]
  │ Layout:
  │   Top: Player 1 score | Card counter (1/10) | Player 2 score
  │   Center: Hidden card (face down, color revealed on flip)
  │   Below card: Question text + answer options
  │   Bottom: 30-second timer bar
  │
  │ Card flip animation → Question revealed
  │ Student selects answer
  │ Timer expires or answer submitted
  ▼
[Card Result]
  │ Both players' answers revealed
  │ Score update animation
  │ Brief pause (2 seconds) → Next card
  ▼
[Match Complete Screen]
  │ Final scores: Player 1 XX | Player 2 XX
  │ Winner banner (or "Draw!")
  │ XP earned, rank change
  │ Card-by-card breakdown (expandable)
  │ "Play Again" | "Back to Dashboard"
```

---

## Flow 4 — Teacher AI Question Generation

```
[Teacher Dashboard]
  │ Click "Generate Questions" (quick action)
  ▼
[AI Generation Panel]
  │ Form fields:
  │   Grade (dropdown 1–12)
  │   Subject (dropdown)
  │   Topic (text input with autocomplete)
  │   Subtopic (optional text input)
  │   Bloom's Level (dropdown)
  │   Difficulty (slider 1–5)
  │   Question Type (radio: Multiple Choice / True-False / Short Answer)
  │   Quantity (number input 1–20)
  │   Additional Instructions (optional textarea)
  │ Click "Generate"
  ▼
[Loading State]
  │ "Generating X questions... This may take up to 15 seconds."
  │ Progress indicator
  ▼
[Review Screen]
  │ Generated questions displayed as cards
  │ Each card shows: question text, options, correct answer, difficulty, Bloom's level
  │ Duplicate warning badge if similar question exists
  │ Actions per card: ✓ Approve | ✗ Reject | ✎ Edit
  │ "Approve All" button
  ▼
[Publish Confirmation]
  │ "X questions approved. Publish to question bank?"
  │ "Publish" → Questions set to 'published' status
  │ Success toast: "X questions published to your question bank."
```

---

## Flow 5 — Teacher Creates Assignment

```
[Teacher Dashboard]
  │ Click "Create Assignment"
  ▼
[Assignment Builder — Step 1: Details]
  │ Assignment title
  │ Select class (dropdown)
  │ Due date (date picker)
  │ Description (optional)
  │ "Next" button
  ▼
[Assignment Builder — Step 2: Questions]
  │ Question bank filter panel (grade, topic, difficulty, Bloom's level)
  │ Question list with checkboxes
  │ Selected questions panel (right side, drag to reorder)
  │ "Generate More" button → Opens AI generation panel in modal
  │ "Next" button (requires ≥ 1 question selected)
  ▼
[Assignment Builder — Step 3: Review]
  │ Summary: class name, due date, question count
  │ Question list preview
  │ "Save as Draft" | "Publish Now"
  ▼
[Published Confirmation]
  │ "Assignment published. Students have been notified."
  │ Link to assignment results page
```

---

## Flow 6 — Admin User Management

```
[Admin Dashboard]
  │ Click "Manage Users"
  ▼
[User List]
  │ Search bar (name, email)
  │ Filter: Role, Status, Grade
  │ User table: Name | Email | Role | Grade | Status | Last Active | Actions
  │ "Add User" button
  ▼
[Add User Form]
  │ Full name, email, role (dropdown), grade (if student), class (if student)
  │ "Create Account" → System sends welcome email with temporary password
  ▼
[User Detail]
  │ User info, status, last login
  │ Actions: Reset Password | Deactivate | Reactivate
  │ Confirmation modal for destructive actions
```

---

## Anti-Cheat UX Flow (During Match)

```
[Match Arena — Student switches tab]
  │
  ▼
[Warning Toast — First violation]
  │ "⚠️ Warning: Switching tabs during a match is not allowed.
  │  A second violation will result in a forfeit."
  │ Match continues
  ▼
[Second violation]
  │
  ▼
[Forfeit Screen]
  │ "Match forfeited due to repeated tab switching."
  │ "Your opponent has been awarded the win."
  │ No rank penalty for opponent
  │ "Back to Dashboard" button
```

---

*See `Information-Architecture.md` for sitemap and `Low-Fidelity-Wireframes.md` for layout descriptions.*
