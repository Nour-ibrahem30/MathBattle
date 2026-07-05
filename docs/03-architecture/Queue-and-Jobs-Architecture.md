# Queue and Jobs Architecture — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Defines the background job system for async processing: queues, job types, retry policy, and worker topology.

**Technology:** BullMQ on Redis 7

---

## Architecture

```
REST API ──enqueue──► Redis (BullMQ Queues) ──consume──► Worker Processes
                              │
                              ├── ai-jobs
                              ├── email-jobs
                              ├── notification-jobs
                              ├── analytics-jobs
                              └── report-jobs (Phase 2)
```

Workers run as separate Node.js processes (same codebase, different entry point).

---

## Queue Definitions

| Queue | Concurrency | Priority | Max Retries |
|---|---|---|---|
| `ai-jobs` | 5 | High | 3 |
| `email-jobs` | 10 | Normal | 3 |
| `notification-jobs` | 20 | Normal | 3 |
| `analytics-jobs` | 10 | Low | 2 |
| `report-jobs` | 3 | Low | 3 |

---

## Job Catalog (Phase 1)

### ai-jobs

| Job Name | Trigger | Payload | Output |
|---|---|---|---|
| `generate_questions` | Teacher AI generate request | prompt, grade, subject, count | Draft questions in DB |
| `estimate_difficulty` | Question save | question_id | Updated difficulty field |
| `detect_duplicate` | Import batch | question_ids[] | Flagged duplicates |
| `analyze_weakness` | Phase 2 | student_user_id | Recommendations |

### email-jobs

| Job Name | Trigger | Payload |
|---|---|---|
| `send_welcome` | User registration | user_id, email |
| `send_password_reset` | Reset request | user_id, token |
| `send_parental_consent` | Under-13 registration | student_user_id, parent_email |
| `send_assignment_notice` | Phase 2 | assignment_id, student_ids[] |

### notification-jobs

| Job Name | Trigger | Payload |
|---|---|---|
| `create_notification` | Domain events | user_id, type, title, body, data |
| `batch_notifications` | Assignment publish | user_ids[], template |

### analytics-jobs

| Job Name | Trigger | Payload |
|---|---|---|
| `track_event` | API middleware | event_name, properties (no PII) |
| `aggregate_daily_stats` | Cron (midnight UTC) | date |

---

## Retry Policy

```javascript
{
  attempts: 3,
  backoff: { type: 'exponential', delay: 5000 },
  removeOnComplete: { count: 1000 },
  removeOnFail: false  // keep for DLQ inspection
}
```

| Error Type | Retry? |
|---|---|
| Network timeout | Yes |
| Provider 429 (rate limit) | Yes, with Retry-After delay |
| Provider 5xx | Yes |
| Invalid payload / 4xx | No → DLQ immediately |
| DB constraint violation | No → DLQ |

---

## Dead Letter Queue (DLQ)

- Failed jobs after max retries move to `{queue}-dlq`
- Alert when DLQ depth > 10
- Manual replay via admin CLI: `npm run jobs:replay -- --queue=ai-jobs --id=<jobId>`
- DLQ jobs retained 30 days

---

## Idempotency

Jobs that mutate state include an `idempotencyKey` (UUID):
- Duplicate enqueue with same key is ignored
- Required for: email send, XP award side effects, notification create

---

## Monitoring

| Metric | Alert Threshold |
|---|---|
| Queue depth | > 500 jobs for > 5 min |
| Job processing time P95 | > 60s for ai-jobs |
| Failed job rate | > 5% over 15 min |
| Worker heartbeat | Missing for > 2 min |

---

## Local Development

```bash
# Start Redis
docker compose up -d redis

# Start worker
npm run dev:worker

# Inspect queues (optional)
npx bull-board  # if configured
```

Set `AI_PROVIDER=mock` and `EMAIL_PROVIDER=mock` for offline job processing.

---

*See `Integration-Architecture.md` for external provider details and `Caching-Strategy.md` for Redis shared usage.*
