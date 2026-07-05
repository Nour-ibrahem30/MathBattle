# Webhook Strategy — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Defines inbound and outbound webhook patterns. Phase 1 has **no inbound payment webhooks**; this document establishes standards for Phase 2+ integrations.

---

## Phase 1 Scope

| Direction | Webhooks | Notes |
|---|---|---|
| Inbound | None | All client interaction via REST + WebSocket |
| Outbound | None | Email and AI via direct API, not webhooks |

Future: payment provider (Stripe), LMS integrations (Google Classroom, Clever).

---

## Inbound Webhook Standards (Future)

When implemented, all inbound webhooks must follow:

### Security
- Verify signature (HMAC-SHA256 or provider-specific)
- Reject requests older than 5 minutes (timestamp validation)
- IP allowlist where provider publishes static ranges
- Rate limit: 100 req/min per provider

### Processing
```
Provider → API Gateway → POST /webhooks/{provider}
                              │
                              ├── Verify signature
                              ├── Check idempotency (webhook_events table)
                              ├── Enqueue job (never process synchronously)
                              └── Return 200 immediately
                                        │
                                        ▼
                              Worker processes event
```

### Idempotency Table: webhook_events

| Column | Type | Description |
|---|---|---|
| id | UUID | PK |
| provider | VARCHAR | e.g., stripe, clever |
| event_id | VARCHAR | Provider's event ID |
| event_type | VARCHAR | e.g., payment_intent.succeeded |
| payload | JSONB | Raw event body |
| processed_at | TIMESTAMPTZ | NULL until processed |
| created_at | TIMESTAMPTZ | Receipt time |

Unique constraint: `(provider, event_id)`

---

## Outbound Webhook Standards (Future — Phase 3)

Schools may subscribe to platform events:

| Event | Payload |
|---|---|
| `student.enrolled` | student_id (opaque), class_id, timestamp |
| `lesson.completed` | student_id, lesson_id, score |
| `match.completed` | match_id, result summary |

- Payloads contain opaque IDs, no PII
- HMAC signature on every delivery
- 3 retry attempts with exponential backoff
- Subscriber manages endpoint availability

---

## Error Handling

| Scenario | Response |
|---|---|
| Invalid signature | 401, no retry by provider |
| Duplicate event_id | 200 (already processed) |
| Processing failure | 200 to provider; retry via internal job queue |
| Unknown event type | 200; log warning; no processing |

---

## Diagram

See `diagrams/webhook-processing-flow.mmd` for the processing sequence.

---

*See `Integration-Architecture.md` for overall integration patterns and `Third-Party-Integrations.md` for vendor list.*
