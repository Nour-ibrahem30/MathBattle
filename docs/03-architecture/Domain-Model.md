# Domain Model — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

This document defines the bounded contexts, aggregate roots, entities, value objects, and domain events for MathBattle Phase 1. It complements `ERD.md` (persistence) and `Component-Architecture.md` (runtime modules).

---

## Bounded Contexts

| Context | Responsibility | Primary Aggregates |
|---|---|---|
| Identity & Access | Authentication, authorization, school membership | User, School, RefreshToken |
| Learning | Curriculum structure and student progress | LearningPath, Unit, Lesson, Enrollment, LessonAttempt |
| Question Bank | Question lifecycle, versioning, import | Question, QuestionVersion |
| Match | Real-time 1v1 competitive sessions | Match, MatchCard, MatchEvent |
| Gamification | XP, ranks, achievements, missions, streaks | StudentProfile, Achievement, Mission |
| Classroom | Teacher classes and assignments | Class, Assignment |
| AI | Async generation and analysis jobs | AIJob (transient) |
| Notifications | In-app user notifications | Notification |
| Audit | Immutable activity trail | AuditLog |

---

## Aggregate Catalog

### Identity & Access

#### School (Aggregate Root)
- **Entities:** none
- **Value Objects:** SchoolCode, Timezone, SchoolSettings
- **Invariants:** code is unique; status transitions: active → suspended → deactivated
- **Domain Events:** `SchoolCreated`, `SchoolSuspended`

#### User (Aggregate Root)
- **Entities:** StudentProfile | TeacherProfile (role-specific)
- **Value Objects:** Email, PasswordHash, Role, UserStatus
- **Invariants:** email unique globally; student must have profile with grade 1–12; under-13 requires parental consent before activation
- **Domain Events:** `UserRegistered`, `UserLoggedIn`, `UserSuspended`, `ParentalConsentGranted`

#### RefreshToken (Entity, owned by User)
- **Invariants:** one active token per device session; revoked on password change or logout

---

### Learning

#### LearningPath (Aggregate Root)
- **Entities:** Unit → Lesson (tree)
- **Invariants:** units and lessons have unique order_index within parent; prerequisite graph must be acyclic
- **Domain Events:** `LearningPathPublished`, `LessonCompleted`

#### Enrollment (Aggregate Root)
- **Entities:** none
- **Invariants:** one active enrollment per student per path; completion sets completed_at
- **Domain Events:** `StudentEnrolled`, `PathCompleted`

#### LessonAttempt (Aggregate Root)
- **Entities:** AnswerRecord (embedded in answers JSONB)
- **Invariants:** only one `in_progress` attempt per student per lesson; score calculated only on completion
- **Domain Events:** `LessonAttemptStarted`, `LessonAttemptCompleted`

---

### Question Bank

#### Question (Aggregate Root)
- **Entities:** QuestionVersion
- **Value Objects:** BloomLevel, Difficulty (1–5), QuestionMetadata (grade, subject, topic, tags)
- **Invariants:** status transitions: draft → pending_review → published → archived; published questions require at least one correct answer; AI-generated questions start as draft
- **Domain Events:** `QuestionCreated`, `QuestionPublished`, `QuestionArchived`

---

### Match

#### Match (Aggregate Root)
- **Entities:** MatchCard, MatchEvent
- **Value Objects:** CardColor, CardPoints, MatchStatus
- **Invariants:** both players same grade; exactly 10 cards per match; server is authoritative for scoring; forfeit ends match immediately
- **Domain Events:** `MatchCreated`, `MatchStarted`, `MatchCompleted`, `MatchForfeited`, `FocusLostDetected`

---

### Gamification

#### StudentProfile (Aggregate Root)
- **Value Objects:** Rank, XP, StreakCount
- **Invariants:** XP never negative; rank derived from total_xp thresholds; streak increments once per calendar day with activity
- **Domain Events:** `XPAwarded`, `RankUpgraded`, `StreakExtended`, `AchievementUnlocked`

#### Mission (Aggregate Root)
- **Entities:** StudentMission (per student progress)
- **Invariants:** progress cannot exceed target_count; completion awards XP once
- **Domain Events:** `MissionCompleted`

---

### Classroom

#### Class (Aggregate Root)
- **Entities:** ClassStudent (membership)
- **Invariants:** student can belong to multiple classes; left_at set on removal, not hard delete
- **Domain Events:** `StudentJoinedClass`, `StudentRemovedFromClass`

#### Assignment (Aggregate Root)
- **Entities:** AssignmentQuestion
- **Invariants:** published assignments immutable except status → closed; due_date optional
- **Domain Events:** `AssignmentPublished`, `AssignmentClosed`

---

## Value Objects

| Value Object | Fields | Validation |
|---|---|---|
| Email | string | RFC 5322 format, max 255 chars, lowercase normalized |
| SchoolCode | string | Alphanumeric, 6–50 chars, unique |
| Grade | integer | 1–12 inclusive |
| Difficulty | integer | 1–5 inclusive |
| BloomLevel | enum | remember, understand, apply, analyze, evaluate, create |
| CardColor | enum | green(1), blue(2), purple(3), orange(4), red(5) |
| Rank | enum | novice → legend (7 tiers) |

---

## Domain Events (Internal)

Events are emitted within the application layer and consumed by:
- Gamification module (XP, achievements)
- Notification module (in-app alerts)
- Audit module (compliance trail)
- Analytics pipeline (async via job queue)

| Event | Producer | Consumers |
|---|---|---|
| `LessonAttemptCompleted` | Learning | Gamification, Analytics |
| `MatchCompleted` | Match | Gamification, Analytics |
| `QuestionPublished` | Question Bank | Search index, Cache invalidation |
| `AchievementUnlocked` | Gamification | Notifications |
| `AssignmentPublished` | Classroom | Notifications |

---

## Context Map (Relationships)

```
Identity ──► Learning (user owns enrollments)
Identity ──► Match (user participates)
Identity ──► Classroom (teacher/student membership)
Learning ──► Question Bank (lessons reference questions)
Match ──► Question Bank (match cards reference questions)
AI ──► Question Bank (generates draft questions)
Gamification ◄── Learning, Match (XP sources)
Audit ◄── All contexts (cross-cutting)
```

---

## Ubiquitous Language

| Term | Definition |
|---|---|
| Learning Path | Ordered curriculum: grade + subject → units → lessons |
| Lesson Attempt | Single student session working through a lesson's questions |
| Match | 1v1 real-time competition with 10 hidden-value cards |
| Card | One question round in a match with color-coded point value |
| Question Bank | Repository of tagged, versioned assessment items |
| XP | Experience points earned through learning and matches |
| Rank | Student tier derived from cumulative XP |
| Parental Consent | COPPA-required approval for users under 13 |

---

*See `ERD.md` for physical schema and `Component-Architecture.md` for module mapping.*
