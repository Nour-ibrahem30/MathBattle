# Migration Plan — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Database schema migration strategy from empty database to production, including tooling, naming conventions, and rollback procedures.

**Tool:** Prisma Migrate (or Knex — confirm with team before Sprint 1)

---

## Migration Principles

1. **Never modify production DB manually** — all changes via migration scripts
2. **One migration per logical change** — don't bundle unrelated schema changes
3. **Backward-compatible deploys** — expand-contract pattern for breaking changes
4. **Test locally** — `npm run db:migrate` before PR
5. **Production uses CONCURRENTLY** for new indexes

---

## Naming Convention

```
YYYYMMDDHHMMSS_descriptive_name
```

Examples:
- `20260101000001_init_identity_tables`
- `20260115000002_add_match_events`
- `20260201000003_add_questions_fts_index`

---

## Phase 1 Migration Sequence

| Order | Migration | Tables / Changes |
|---|---|---|
| 1 | init_identity | schools, users, student_profiles, teacher_profiles, refresh_tokens, parental_consents |
| 2 | init_learning | learning_paths, units, lessons, enrollments, lesson_attempts, lesson_questions |
| 3 | init_questions | questions, question_versions |
| 4 | init_matches | matches, match_cards, match_events |
| 5 | init_gamification | xp_history, achievements, student_achievements, missions, student_missions |
| 6 | init_classroom | classes, class_students, assignments, assignment_questions |
| 7 | init_notifications | notifications |
| 8 | init_audit | audit_logs |
| 9 | add_indexes | All indexes per `Indexing-Strategy.md` |
| 10 | seed_achievements | Achievement definitions (reference data) |
| 11 | seed_demo | Development seed data (dev/staging only) |

---

## Expand-Contract Pattern

For breaking schema changes in production:

```
Phase A (expand):  Add new column/table; deploy code that writes to both
Phase B (migrate): Backfill data from old to new
Phase C (contract): Deploy code reading from new only; drop old column
```

Each phase is a separate migration + deployment.

---

## Rollback Procedure

| Scenario | Action |
|---|---|
| Migration fails mid-run | Fix migration script; create new forward migration (never edit applied migrations) |
| Bad migration deployed | Deploy previous application version; run down migration if available |
| Data corruption | Restore from RDS snapshot (RPO ≤ 1 hour) |

---

## Zero-Downtime Rules

- Adding nullable columns: safe in single deploy
- Adding NOT NULL columns: add nullable → backfill → add constraint (3 deploys)
- Renaming columns: add new → migrate data → drop old (3 deploys)
- Dropping columns: stop writing → deploy → drop (2 deploys)

---

## Seed Data

| Seed | Environment | Purpose |
|---|---|---|
| achievements | all | Achievement definitions |
| demo_school | dev, staging | Test accounts and sample content |
| platform_paths | all | Default learning paths per grade |

Production receives achievements and platform paths only — no demo users.

---

## CI Integration

```yaml
# GitHub Actions (conceptual)
- run: npm run db:migrate
- run: npm run test:integration
```

Migration runs against ephemeral PostgreSQL in CI before merge.

---

*See `ERD.md` for schema definitions and `Indexing-Strategy.md` for index migrations.*
