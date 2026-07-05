# Audit Logging Strategy — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Defines what events are audited, log format, retention, access controls, and compliance alignment.

---

## Audit Scope

All security-sensitive and data-mutating operations are logged to the `audit_logs` table (append-only).

### Always Audited

| Category | Actions |
|---|---|
| Authentication | login, logout, failed_login, password_reset, token_refresh |
| Authorization | role_change, permission_denied (sampled 1%) |
| User management | user.create, user.update, user.suspend, user.delete |
| Content | question.create, question.publish, question.archive, question.import |
| Classroom | assignment.publish, class.create, student.add, student.remove |
| Match | match.create, match.forfeit, match.complete |
| Admin | school.settings_update, bulk_user_import |
| Consent | parental_consent.sent, parental_consent.granted |
| AI | ai.generate_requested, ai.question_accepted, ai.question_rejected |

### Never Audited

- Read-only queries (GET requests)
- Health check endpoints
- Static asset requests
- Cache hits/misses

---

## Log Record Format

| Field | Required | Notes |
|---|---|---|
| id | Yes | UUID |
| user_id | Conditional | NULL for system/unauthenticated events |
| school_id | Conditional | Scoped to actor's school |
| action | Yes | Dot notation: `entity.verb` |
| entity_type | If applicable | e.g., `question`, `user`, `match` |
| entity_id | If applicable | UUID of affected entity |
| old_value | On update/delete | JSON diff; PII fields masked |
| new_value | On create/update | JSON diff; PII fields masked |
| ip_address | Yes | Hashed (SHA-256) in production |
| user_agent | Yes | Truncated to 500 chars |
| occurred_at | Yes | UTC timestamp, immutable |

---

## PII Masking in Audit Logs

| Field | Stored As |
|---|---|
| email | `***@domain.com` (domain visible for support) |
| full_name | `[REDACTED]` |
| password | Never logged |
| date_of_birth | Never logged |
| answer content | Never logged |

---

## Retention

| Period | Storage | Access |
|---|---|---|
| 0–12 months | PostgreSQL (hot) | Admin UI + API |
| 12–84 months | S3 cold archive (Parquet) | Compliance export only |
| 84+ months | Delete per policy | — |

See `Data-Retention-Policy.md`.

---

## Access Control

| Role | Access |
|---|---|
| operator | Full audit log search (platform-wide) |
| admin | School-scoped audit log (own school only) |
| teacher | No direct audit access |
| student | No access |

Audit log API: `GET /api/v1/admin/audit-logs?school_id=&action=&from=&to=`

---

## Implementation

- `AuditLogger` service in shared layer
- Called from services after successful mutations (not in controllers)
- Async write acceptable (within 1 second of action)
- Failed audit write: log error alert but do not block user action

---

## Monitoring

- Alert if audit write failure rate > 0.1%
- Weekly sample review of failed_login patterns
- Quarterly compliance export for FERPA audits

---

*See `Auth-Security.md` for auth events and `Compliance-Architecture.md` for regulatory mapping.*
