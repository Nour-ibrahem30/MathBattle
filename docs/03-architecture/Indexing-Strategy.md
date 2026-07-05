# Indexing Strategy — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Defines database indexes beyond those listed in `ERD.md`, query patterns they support, and maintenance guidelines for PostgreSQL 15.

---

## Indexing Principles

1. Every foreign key column is indexed
2. Composite indexes match query filter order (most selective first)
3. Partial indexes for status-filtered queries
4. GIN indexes for array and full-text search columns
5. Avoid over-indexing write-heavy tables (match_events, audit_logs)

---

## Core Indexes

### users
```sql
CREATE UNIQUE INDEX idx_users_email ON users (email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_school_role ON users (school_id, role) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_status ON users (status);
```

### student_profiles
```sql
CREATE UNIQUE INDEX idx_student_profiles_user ON student_profiles (user_id);
CREATE INDEX idx_student_profiles_leaderboard ON student_profiles (total_xp DESC) WHERE total_xp > 0;
CREATE INDEX idx_student_profiles_grade ON student_profiles (grade);
```

### questions
```sql
CREATE INDEX idx_questions_filter ON questions (grade, subject, status, difficulty);
CREATE INDEX idx_questions_school ON questions (school_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_questions_tags ON questions USING GIN (tags);
CREATE INDEX idx_questions_fts ON questions USING GIN (to_tsvector('english', question_text));
```

### lesson_attempts
```sql
CREATE INDEX idx_lesson_attempts_student ON lesson_attempts (student_user_id, lesson_id);
CREATE UNIQUE INDEX idx_lesson_attempts_in_progress
  ON lesson_attempts (student_user_id, lesson_id)
  WHERE status = 'in_progress';
CREATE INDEX idx_lesson_attempts_completed ON lesson_attempts (student_user_id, completed_at DESC)
  WHERE status = 'completed';
```

### matches
```sql
CREATE INDEX idx_matches_players ON matches (player1_user_id, player2_user_id);
CREATE INDEX idx_matches_school_grade ON matches (school_id, grade, status);
CREATE INDEX idx_matches_created ON matches (created_at DESC);
```

### match_events
```sql
CREATE INDEX idx_match_events_match ON match_events (match_id, occurred_at);
CREATE INDEX idx_match_events_user ON match_events (user_id, event_type);
```

### audit_logs
```sql
CREATE INDEX idx_audit_school_time ON audit_logs (school_id, occurred_at DESC);
CREATE INDEX idx_audit_entity ON audit_logs (entity_type, entity_id);
CREATE INDEX idx_audit_action ON audit_logs (action, occurred_at DESC);
```

### notifications
```sql
CREATE INDEX idx_notifications_unread ON notifications (user_id, created_at DESC)
  WHERE read_at IS NULL;
```

### refresh_tokens
```sql
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens (user_id) WHERE revoked_at IS NULL;
CREATE INDEX idx_refresh_tokens_hash ON refresh_tokens (token_hash);
CREATE INDEX idx_refresh_tokens_expiry ON refresh_tokens (expires_at) WHERE revoked_at IS NULL;
```

---

## Query Pattern → Index Mapping

| Query | Index Used |
|---|---|
| Login by email | `idx_users_email` |
| Teacher class roster | `idx_users_school_role` + class_students FK |
| Question bank search (grade + subject) | `idx_questions_filter` |
| Question full-text search | `idx_questions_fts` |
| Student lesson history | `idx_lesson_attempts_completed` |
| School leaderboard | `idx_student_profiles_leaderboard` + Redis cache |
| Match history for user | `idx_matches_players` |
| Unread notifications | `idx_notifications_unread` |
| Audit report by school | `idx_audit_school_time` |

---

## Maintenance

| Task | Frequency |
|---|---|
| `ANALYZE` on high-churn tables | Daily (automated) |
| Review slow query log (> 100ms) | Weekly |
| Reindex bloated indexes | Quarterly |
| Validate index usage (`pg_stat_user_indexes`) | Monthly |

---

## Migration Policy

- All indexes created via Knex/Prisma migration scripts
- New indexes use `CONCURRENTLY` in production migrations
- Drop unused indexes only after 30-day monitoring period

---

*See `ERD.md` for entity definitions and `Caching-Strategy.md` for Redis layer.*
