# Entity-Relationship Design (ERD) — MathQuest

**Version:** 1.0.0

---

## Purpose and Scope

This document defines the data model for MathQuest Phase 1. It covers all entities, relationships, constraints, indexes, and deletion rules. The ERD is the single source of truth for database schema design.

---

## Modeling Standards

- All primary keys: UUID v4 (`id`)
- All timestamps: `created_at`, `updated_at` (UTC, auto-managed)
- Soft delete: `deleted_at` (nullable timestamp) on all user-facing entities
- Audit: `created_by`, `updated_by` (user UUID) on all mutable entities
- Status fields: use enum types defined in this document
- Foreign keys: always indexed
- No nullable foreign keys unless explicitly justified

---

## Domain Areas

1. Identity and Access (users, schools, roles)
2. Learning (paths, units, lessons, progress)
3. Question Bank (questions, versions, tags)
4. Matches (sessions, events, scores)
5. Gamification (XP, ranks, achievements, missions, streaks)
6. AI (jobs, recommendations)
7. Notifications
8. Audit

---

## Entity Catalog

### 1. schools

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | School identifier |
| name | VARCHAR(255) | NOT NULL | School display name |
| code | VARCHAR(50) | UNIQUE, NOT NULL | Registration code |
| country | VARCHAR(100) | NOT NULL | Country |
| timezone | VARCHAR(100) | NOT NULL | School timezone |
| status | ENUM | NOT NULL, DEFAULT 'active' | active, suspended, deactivated |
| settings | JSONB | | School-level configuration |
| created_at | TIMESTAMPTZ | NOT NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL | |
| deleted_at | TIMESTAMPTZ | | Soft delete |

**Indexes:** code (unique), status

---

### 2. users

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | User identifier |
| school_id | UUID | FK → schools.id, NOT NULL | School membership |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login email |
| password_hash | VARCHAR(255) | NOT NULL | bcrypt hash |
| full_name | VARCHAR(255) | NOT NULL | Display name |
| role | ENUM | NOT NULL | student, teacher, admin, operator |
| status | ENUM | NOT NULL, DEFAULT 'active' | active, suspended, deactivated, pending_parental_consent |
| force_password_change | BOOLEAN | NOT NULL, DEFAULT false | First login flag |
| last_login_at | TIMESTAMPTZ | | |
| created_at | TIMESTAMPTZ | NOT NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL | |
| deleted_at | TIMESTAMPTZ | | Soft delete |

**Indexes:** email (unique), school_id, role, status

---

### 3. student_profiles

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, UNIQUE, NOT NULL | One-to-one with users |
| grade | SMALLINT | NOT NULL, CHECK (1–12) | Academic grade level |
| date_of_birth | DATE | NOT NULL | COPPA enforcement |
| total_xp | INTEGER | NOT NULL, DEFAULT 0 | Cumulative XP |
| rank | ENUM | NOT NULL, DEFAULT 'novice' | novice, apprentice, scholar, expert, master, champion, legend |
| streak_count | SMALLINT | NOT NULL, DEFAULT 0 | Current streak days |
| streak_last_activity_date | DATE | | Last activity date for streak |
| avatar_id | UUID | FK → cosmetics.id, nullable | Selected avatar |
| created_at | TIMESTAMPTZ | NOT NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL | |

**Indexes:** user_id (unique), grade, rank, total_xp (for leaderboard queries)

---

### 4. teacher_profiles

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, UNIQUE, NOT NULL | |
| subjects | TEXT[] | | Subjects taught |
| grades | SMALLINT[] | | Grade levels taught |
| created_at | TIMESTAMPTZ | NOT NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL | |

---

### 5. parental_consents

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| student_user_id | UUID | FK → users.id, NOT NULL | |
| parent_email | VARCHAR(255) | NOT NULL | |
| token_hash | VARCHAR(255) | NOT NULL | Consent link token |
| token_expires_at | TIMESTAMPTZ | NOT NULL | |
| consented_at | TIMESTAMPTZ | | NULL until consent given |
| status | ENUM | NOT NULL | pending, consented, expired |
| created_at | TIMESTAMPTZ | NOT NULL | |

**Indexes:** student_user_id, token_hash, status

---

### 6. refresh_tokens

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, NOT NULL | |
| token_hash | VARCHAR(255) | NOT NULL | Hashed refresh token |
| expires_at | TIMESTAMPTZ | NOT NULL | 30-day expiry |
| revoked_at | TIMESTAMPTZ | | NULL if active |
| device_info | JSONB | | User agent, IP (hashed) |
| created_at | TIMESTAMPTZ | NOT NULL | |

**Indexes:** user_id, token_hash, expires_at

---

### 7. learning_paths

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| school_id | UUID | FK → schools.id, nullable | NULL = platform default |
| grade | SMALLINT | NOT NULL | |
| subject | VARCHAR(100) | NOT NULL | |
| title | VARCHAR(255) | NOT NULL | |
| description | TEXT | | |
| status | ENUM | NOT NULL, DEFAULT 'active' | active, archived |
| created_by | UUID | FK → users.id | |
| created_at | TIMESTAMPTZ | NOT NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL | |
| deleted_at | TIMESTAMPTZ | | |

**Indexes:** grade, subject, status, school_id

---

### 8. units

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| learning_path_id | UUID | FK → learning_paths.id, NOT NULL | |
| title | VARCHAR(255) | NOT NULL | |
| order_index | SMALLINT | NOT NULL | Display order |
| status | ENUM | NOT NULL, DEFAULT 'active' | |
| created_at | TIMESTAMPTZ | NOT NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL | |
| deleted_at | TIMESTAMPTZ | | |

**Indexes:** learning_path_id, order_index

---

### 9. lessons

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| unit_id | UUID | FK → units.id, NOT NULL | |
| title | VARCHAR(255) | NOT NULL | |
| type | ENUM | NOT NULL | lesson, practice, challenge, final_assessment |
| order_index | SMALLINT | NOT NULL | |
| prerequisite_lesson_id | UUID | FK → lessons.id, nullable | |
| question_count | SMALLINT | NOT NULL, DEFAULT 10 | |
| time_limit_seconds | INTEGER | nullable | NULL = no limit |
| status | ENUM | NOT NULL, DEFAULT 'active' | |
| created_at | TIMESTAMPTZ | NOT NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL | |
| deleted_at | TIMESTAMPTZ | | |

**Indexes:** unit_id, type, order_index, prerequisite_lesson_id

---

### 10. lesson_questions

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| lesson_id | UUID | FK → lessons.id, NOT NULL | |
| question_id | UUID | FK → questions.id, NOT NULL | |
| order_index | SMALLINT | NOT NULL | |

**Indexes:** lesson_id, question_id; UNIQUE (lesson_id, question_id)

---

### 11. enrollments

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| student_user_id | UUID | FK → users.id, NOT NULL | |
| learning_path_id | UUID | FK → learning_paths.id, NOT NULL | |
| enrolled_at | TIMESTAMPTZ | NOT NULL | |
| completed_at | TIMESTAMPTZ | | |
| status | ENUM | NOT NULL, DEFAULT 'active' | active, completed, dropped |

**Indexes:** student_user_id, learning_path_id; UNIQUE (student_user_id, learning_path_id)

---

### 12. lesson_attempts

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| student_user_id | UUID | FK → users.id, NOT NULL | |
| lesson_id | UUID | FK → lessons.id, NOT NULL | |
| status | ENUM | NOT NULL, DEFAULT 'in_progress' | in_progress, completed, abandoned |
| score_percentage | DECIMAL(5,2) | | NULL until completed |
| xp_earned | SMALLINT | | |
| started_at | TIMESTAMPTZ | NOT NULL | |
| completed_at | TIMESTAMPTZ | | |
| answers | JSONB | | Array of {question_id, answer, correct, time_taken_seconds} |

**Indexes:** student_user_id, lesson_id, status, started_at

---

### 13. questions

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| school_id | UUID | FK → schools.id, nullable | NULL = platform question |
| created_by | UUID | FK → users.id, NOT NULL | |
| question_text | TEXT | NOT NULL | |
| question_type | ENUM | NOT NULL | multiple_choice, true_false, short_answer |
| options | JSONB | | [{text, is_correct}] for multiple_choice |
| correct_answer | TEXT | | For true_false and short_answer |
| grade | SMALLINT | NOT NULL | |
| semester | SMALLINT | NOT NULL, CHECK (1–2) | |
| subject | VARCHAR(100) | NOT NULL | |
| unit | VARCHAR(255) | NOT NULL | |
| lesson | VARCHAR(255) | NOT NULL | |
| topic | VARCHAR(255) | NOT NULL | |
| subtopic | VARCHAR(255) | | |
| bloom_level | ENUM | NOT NULL | remember, understand, apply, analyze, evaluate, create |
| difficulty | SMALLINT | NOT NULL, CHECK (1–5) | |
| hints | TEXT[] | | Max 3 hints |
| solution_explanation | TEXT | | |
| tags | TEXT[] | | |
| status | ENUM | NOT NULL, DEFAULT 'draft' | draft, pending_review, published, archived |
| version | SMALLINT | NOT NULL, DEFAULT 1 | |
| ai_generated | BOOLEAN | NOT NULL, DEFAULT false | |
| imported | BOOLEAN | NOT NULL, DEFAULT false | |
| created_at | TIMESTAMPTZ | NOT NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL | |
| deleted_at | TIMESTAMPTZ | | |

**Indexes:** grade, subject, topic, difficulty, bloom_level, status, school_id, tags (GIN), question_text (full-text search)

---

### 14. question_versions

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| question_id | UUID | FK → questions.id, NOT NULL | |
| version | SMALLINT | NOT NULL | |
| snapshot | JSONB | NOT NULL | Full question state at this version |
| changed_by | UUID | FK → users.id, NOT NULL | |
| change_reason | TEXT | | |
| created_at | TIMESTAMPTZ | NOT NULL | |

**Indexes:** question_id, version; UNIQUE (question_id, version)

---

### 15. matches

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| school_id | UUID | FK → schools.id, NOT NULL | |
| player1_user_id | UUID | FK → users.id, NOT NULL | |
| player2_user_id | UUID | FK → users.id, NOT NULL | |
| grade | SMALLINT | NOT NULL | Both players must be same grade |
| status | ENUM | NOT NULL, DEFAULT 'pending' | pending, active, completed, forfeited, cancelled |
| player1_score | SMALLINT | | |
| player2_score | SMALLINT | | |
| winner_user_id | UUID | FK → users.id, nullable | NULL = draw or incomplete |
| forfeit_reason | TEXT | | |
| started_at | TIMESTAMPTZ | | |
| completed_at | TIMESTAMPTZ | | |
| created_at | TIMESTAMPTZ | NOT NULL | |

**Indexes:** player1_user_id, player2_user_id, school_id, status, grade, created_at

---

### 16. match_cards

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| match_id | UUID | FK → matches.id, NOT NULL | |
| question_id | UUID | FK → questions.id, NOT NULL | |
| card_color | ENUM | NOT NULL | green, blue, purple, orange, red |
| card_points | SMALLINT | NOT NULL | 1, 2, 3, 4, 5 |
| order_index | SMALLINT | NOT NULL | 1–10 |
| player1_answer | TEXT | | |
| player1_correct | BOOLEAN | | |
| player1_time_seconds | SMALLINT | | |
| player2_answer | TEXT | | |
| player2_correct | BOOLEAN | | |
| player2_time_seconds | SMALLINT | | |

**Indexes:** match_id

---

### 17. match_events

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| match_id | UUID | FK → matches.id, NOT NULL | |
| user_id | UUID | FK → users.id, NOT NULL | |
| event_type | ENUM | NOT NULL | focus_lost, tab_switched, reconnected, answer_submitted, forfeit_triggered |
| event_data | JSONB | | |
| occurred_at | TIMESTAMPTZ | NOT NULL | |

**Indexes:** match_id, user_id, event_type

---

### 18. xp_history

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| student_user_id | UUID | FK → users.id, NOT NULL | |
| amount | SMALLINT | NOT NULL | |
| source_type | ENUM | NOT NULL | lesson_completion, match_win, match_loss, match_draw, achievement, mission, streak |
| source_id | UUID | | Reference to source record |
| created_at | TIMESTAMPTZ | NOT NULL | |

**Indexes:** student_user_id, source_type, created_at

---

### 19. achievements

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| code | VARCHAR(50) | UNIQUE, NOT NULL | e.g., 'first_step', 'perfect_score' |
| name | VARCHAR(100) | NOT NULL | |
| description | TEXT | NOT NULL | |
| xp_reward | SMALLINT | NOT NULL | |
| icon_url | VARCHAR(500) | | |
| trigger_type | ENUM | NOT NULL | lesson_complete, match_win, streak, rank_up, etc. |
| trigger_config | JSONB | NOT NULL | Trigger condition parameters |

---

### 20. student_achievements

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| student_user_id | UUID | FK → users.id, NOT NULL | |
| achievement_id | UUID | FK → achievements.id, NOT NULL | |
| earned_at | TIMESTAMPTZ | NOT NULL | |

**Indexes:** student_user_id, achievement_id; UNIQUE (student_user_id, achievement_id)

---

### 21. missions

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| title | VARCHAR(255) | NOT NULL | |
| description | TEXT | NOT NULL | |
| xp_reward | SMALLINT | NOT NULL | |
| mission_type | ENUM | NOT NULL | weekly, daily (Phase 2) |
| target_type | ENUM | NOT NULL | lessons_completed, matches_won, streak_days, correct_answers |
| target_count | SMALLINT | NOT NULL | |
| active_from | DATE | NOT NULL | |
| active_until | DATE | NOT NULL | |

---

### 22. student_missions

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| student_user_id | UUID | FK → users.id, NOT NULL | |
| mission_id | UUID | FK → missions.id, NOT NULL | |
| progress | SMALLINT | NOT NULL, DEFAULT 0 | |
| status | ENUM | NOT NULL, DEFAULT 'active' | active, completed, expired |
| completed_at | TIMESTAMPTZ | | |

**Indexes:** student_user_id, mission_id, status; UNIQUE (student_user_id, mission_id)

---

### 23. notifications

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, NOT NULL | |
| type | ENUM | NOT NULL | match_invitation, assignment_published, achievement_unlocked, streak_warning, system |
| title | VARCHAR(255) | NOT NULL | |
| body | TEXT | NOT NULL | |
| data | JSONB | | Action payload |
| read_at | TIMESTAMPTZ | | NULL = unread |
| created_at | TIMESTAMPTZ | NOT NULL | |

**Indexes:** user_id, read_at, created_at

---

### 24. classes

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| school_id | UUID | FK → schools.id, NOT NULL | |
| teacher_user_id | UUID | FK → users.id, NOT NULL | |
| name | VARCHAR(255) | NOT NULL | |
| grade | SMALLINT | NOT NULL | |
| academic_year | VARCHAR(10) | NOT NULL | e.g., '2024-25' |
| status | ENUM | NOT NULL, DEFAULT 'active' | |
| created_at | TIMESTAMPTZ | NOT NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL | |
| deleted_at | TIMESTAMPTZ | | |

**Indexes:** school_id, teacher_user_id, grade, status

---

### 25. class_students

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| class_id | UUID | FK → classes.id, NOT NULL | |
| student_user_id | UUID | FK → users.id, NOT NULL | |
| joined_at | TIMESTAMPTZ | NOT NULL | |
| left_at | TIMESTAMPTZ | | |

**Indexes:** class_id, student_user_id; UNIQUE (class_id, student_user_id) WHERE left_at IS NULL

---

### 26. assignments

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| class_id | UUID | FK → classes.id, NOT NULL | |
| created_by | UUID | FK → users.id, NOT NULL | |
| title | VARCHAR(255) | NOT NULL | |
| description | TEXT | | |
| due_date | TIMESTAMPTZ | | |
| status | ENUM | NOT NULL, DEFAULT 'draft' | draft, published, closed |
| published_at | TIMESTAMPTZ | | |
| created_at | TIMESTAMPTZ | NOT NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL | |
| deleted_at | TIMESTAMPTZ | | |

**Indexes:** class_id, created_by, status, due_date

---

### 27. assignment_questions

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| assignment_id | UUID | FK → assignments.id, NOT NULL | |
| question_id | UUID | FK → questions.id, NOT NULL | |
| order_index | SMALLINT | NOT NULL | |

---

### 28. audit_logs

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, nullable | NULL for system events |
| school_id | UUID | FK → schools.id, nullable | |
| action | VARCHAR(100) | NOT NULL | e.g., 'user.login', 'question.publish' |
| entity_type | VARCHAR(100) | | |
| entity_id | UUID | | |
| old_value | JSONB | | Before state |
| new_value | JSONB | | After state |
| ip_address | VARCHAR(45) | | Hashed or masked |
| user_agent | TEXT | | |
| occurred_at | TIMESTAMPTZ | NOT NULL | |

**Indexes:** user_id, school_id, action, entity_type, entity_id, occurred_at

---

## Critical Constraints

- `matches.player1_user_id` and `matches.player2_user_id` must have the same grade (enforced at application layer + DB check constraint via trigger)
- `lesson_attempts`: only one `in_progress` attempt per student per lesson at a time (partial unique index)
- `student_achievements`: one achievement per student (unique constraint)
- `questions.status` can only transition: draft → pending_review → published → archived (enforced at application layer)

---

## Deletion and Retention Rules

| Entity | Soft Delete | Hard Delete | Retention |
|---|---|---|---|
| users | Yes (deleted_at) | 30 days after soft delete | Per GDPR/FERPA |
| questions | Yes | Never (version history preserved) | Indefinite |
| matches | No | Never | 2 years |
| audit_logs | No | Never (archive to cold storage after 1 year) | 7 years |
| notifications | No | 90 days after read | 90 days |
| refresh_tokens | No | On expiry or revocation | 30 days |

---

*See `Data-Dictionary.md` for column-level metadata and `Indexing-Strategy.md` for full index specifications.*
