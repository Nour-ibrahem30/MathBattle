# Data Dictionary — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Column-level metadata for all Phase 1 entities. Canonical schema definitions live in `ERD.md`; this document adds business meaning, PII classification, and validation rules.

**Legend:** PII = Personally Identifiable Information | SPI = Sensitive Personal Information

---

## Identity & Access

### schools

| Column | Type | PII | Description | Valid Values / Rules |
|---|---|---|---|---|
| id | UUID | No | Primary key | Auto-generated |
| name | VARCHAR(255) | No | Display name | 1–255 chars |
| code | VARCHAR(50) | No | Registration code | Unique, alphanumeric |
| country | VARCHAR(100) | No | ISO country name | Required |
| timezone | VARCHAR(100) | No | IANA timezone | e.g., `America/New_York` |
| status | ENUM | No | Operational state | active, suspended, deactivated |
| settings | JSONB | No | School config | Schema validated at app layer |
| deleted_at | TIMESTAMPTZ | No | Soft delete marker | NULL = active |

### users

| Column | Type | PII | Description | Valid Values / Rules |
|---|---|---|---|---|
| id | UUID | No | Primary key | Auto-generated |
| school_id | UUID | No | FK to schools | Required |
| email | VARCHAR(255) | **Yes** | Login identifier | Unique, lowercase |
| password_hash | VARCHAR(255) | SPI | bcrypt hash | Never exposed via API |
| full_name | VARCHAR(255) | **Yes** | Display name | 1–255 chars |
| role | ENUM | No | RBAC role | student, teacher, admin, operator |
| status | ENUM | No | Account state | active, suspended, deactivated, pending_parental_consent |
| force_password_change | BOOLEAN | No | First-login flag | Default false |
| last_login_at | TIMESTAMPTZ | No | Last successful login | UTC |

### student_profiles

| Column | Type | PII | Description | Valid Values / Rules |
|---|---|---|---|---|
| user_id | UUID | No | FK to users | One-to-one |
| grade | SMALLINT | No | Academic grade | 1–12 |
| date_of_birth | DATE | **Yes** | COPPA age check | Past date; not exposed in leaderboards |
| total_xp | INTEGER | No | Cumulative XP | ≥ 0 |
| rank | ENUM | No | Gamification tier | novice → legend |
| streak_count | SMALLINT | No | Current streak days | ≥ 0 |
| streak_last_activity_date | DATE | No | Streak anchor date | School timezone |

### refresh_tokens

| Column | Type | PII | Description | Valid Values / Rules |
|---|---|---|---|---|
| token_hash | VARCHAR(255) | SPI | SHA-256 of refresh token | Never store plaintext |
| expires_at | TIMESTAMPTZ | No | Expiry | Max 30 days from creation |
| revoked_at | TIMESTAMPTZ | No | Revocation time | NULL = active |
| device_info | JSONB | Partial | Hashed UA/IP | No raw IP in production logs |

---

## Learning

### learning_paths, units, lessons

| Entity | Key Business Fields | Notes |
|---|---|---|
| learning_paths | grade, subject, title, school_id | NULL school_id = platform default |
| units | order_index | Unique within path |
| lessons | type, prerequisite_lesson_id, question_count | Types: lesson, practice, challenge, final_assessment |

### lesson_attempts

| Column | Type | PII | Description |
|---|---|---|---|
| answers | JSONB | No | Array of `{question_id, answer, correct, time_taken_seconds}` |
| score_percentage | DECIMAL(5,2) | No | 0.00–100.00 |
| xp_earned | SMALLINT | No | Awarded on completion |

---

## Question Bank

### questions

| Column | Type | PII | Description | Valid Values / Rules |
|---|---|---|---|---|
| question_text | TEXT | No | Question body | Max 5000 chars |
| question_type | ENUM | No | Format | multiple_choice, true_false, short_answer |
| options | JSONB | No | MC options | `[{text, is_correct}]`; exactly one correct for MC |
| difficulty | SMALLINT | No | 1–5 scale | AI-estimated or teacher-set |
| bloom_level | ENUM | No | Cognitive level | remember → create |
| status | ENUM | No | Lifecycle | draft → pending_review → published → archived |
| ai_generated | BOOLEAN | No | Source flag | true = requires teacher review before publish |
| tags | TEXT[] | No | Search tags | GIN indexed |

---

## Matches

### matches

| Column | Type | PII | Description |
|---|---|---|---|
| player1_user_id, player2_user_id | UUID | No | Both same grade enforced |
| status | ENUM | No | pending, active, completed, forfeited, cancelled |
| winner_user_id | UUID | No | NULL = draw |

### match_cards

| Column | Type | Description |
|---|---|---|
| card_color | ENUM | green(1), blue(2), purple(3), orange(4), red(5) |
| card_points | SMALLINT | Matches color value |
| player1_answer, player2_answer | TEXT | Submitted response |

### match_events

| Column | Type | Description |
|---|---|---|
| event_type | ENUM | focus_lost, tab_switched, reconnected, answer_submitted, forfeit_triggered |
| event_data | JSONB | Context payload; no PII |

---

## Gamification

### xp_history

| Column | Description |
|---|---|
| source_type | lesson_completion, match_win, match_loss, match_draw, achievement, mission, streak |
| source_id | UUID reference to originating record |
| amount | Positive integer XP delta |

### achievements

| Column | Description |
|---|---|
| code | Unique slug (e.g., `first_step`) |
| trigger_config | JSON defining unlock conditions |

---

## Audit

### audit_logs

| Column | PII | Description |
|---|---|---|
| action | No | Dot-notation event (e.g., `user.login`) |
| old_value, new_value | Partial | State diff; mask PII fields |
| ip_address | Partial | Hashed in production |
| occurred_at | No | Immutable timestamp |

---

## Enum Reference

| Enum | Values |
|---|---|
| user.role | student, teacher, admin, operator |
| user.status | active, suspended, deactivated, pending_parental_consent |
| student_profiles.rank | novice, apprentice, scholar, expert, master, champion, legend |
| questions.status | draft, pending_review, published, archived |
| questions.bloom_level | remember, understand, apply, analyze, evaluate, create |
| matches.status | pending, active, completed, forfeited, cancelled |
| match_cards.card_color | green, blue, purple, orange, red |

---

## PII Handling Summary

| Field | Storage | API Exposure | Logs | AI Provider |
|---|---|---|---|---|
| email | Encrypted DB | Owner + admin | Never | Never |
| full_name | Encrypted DB | Role-scoped | Never | Never |
| date_of_birth | Encrypted DB | Owner + parent flow | Never | Never |
| password_hash | bcrypt | Never | Never | Never |

---

*See `ERD.md` for full DDL and `Indexing-Strategy.md` for query optimization.*
