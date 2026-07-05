# Error Handling Strategy — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Defines how MathBattle handles, formats, logs, and exposes errors across REST API, WebSocket, background jobs, and frontend.

---

## Standards

- HTTP errors follow **RFC 7807** Problem Details format
- WebSocket errors use structured event payloads
- All user-facing messages are safe (no stack traces, no internal IDs leaked)
- Correlation ID (`X-Request-Id`) on every request for tracing

---

## REST API Error Envelope

```json
{
  "type": "https://api.mathbattle.io/errors/validation-failed",
  "title": "Validation Failed",
  "status": 400,
  "detail": "One or more fields failed validation.",
  "instance": "/api/v1/auth/register",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "errors": [
    { "field": "email", "message": "Email is already registered." }
  ]
}
```

### Standard Error Types

| HTTP Status | type slug | When |
|---|---|---|
| 400 | `validation-failed` | DTO validation errors |
| 401 | `unauthorized` | Missing or invalid JWT |
| 403 | `forbidden` | Valid JWT, insufficient role/scope |
| 404 | `not-found` | Resource does not exist or soft-deleted |
| 409 | `conflict` | Duplicate email, concurrent attempt |
| 422 | `business-rule-violation` | Valid input, rule failure (e.g., wrong grade match) |
| 429 | `rate-limit-exceeded` | Rate limit hit |
| 500 | `internal-error` | Unhandled server error |
| 503 | `service-unavailable` | Dependency down (DB, Redis, AI) |

---

## Exception Handling (NestJS)

```
Request → ValidationPipe → Controller → Service
                                              │
                              DomainException ─┤
                              NotFoundException┤
                              ForbiddenException┤→ GlobalExceptionFilter → RFC 7807 response
                              Unhandled Error ──┘
```

### Rules
1. Services throw domain-specific exceptions, not HTTP exceptions directly
2. Global filter maps exceptions to RFC 7807 responses
3. Never catch and swallow errors silently
4. 500 errors log full stack trace server-side only

---

## WebSocket Error Events

```json
{
  "event": "error",
  "data": {
    "code": "MATCH_NOT_FOUND",
    "message": "This match is no longer available.",
    "recoverable": false
  }
}
```

| Code | Recoverable | Action |
|---|---|---|
| `AUTH_FAILED` | No | Disconnect client |
| `MATCH_NOT_FOUND` | No | Redirect to lobby |
| `ANSWER_TIMEOUT` | Yes | Auto-submit empty answer |
| `FOCUS_WARNING` | Yes | Display warning UI |
| `CONNECTION_LOST` | Yes | Reconnect with state recovery (30s window) |

---

## Background Job Errors

| Failure Type | Retry | Dead Letter |
|---|---|---|
| Transient (AI timeout, DB lock) | 3 retries, exponential backoff | After 3 failures |
| Permanent (invalid payload) | No retry | Immediate DLQ |
| Provider rate limit | Retry after `Retry-After` | After 3 failures |

DLQ jobs are monitored; alerts fire if DLQ depth > 10.

---

## Frontend Error Handling

| Context | UX Pattern |
|---|---|
| Form validation | Inline field errors from 400 response |
| Auth failure | Redirect to login with message |
| Network error | Retry banner with exponential backoff |
| 500 error | Generic "Something went wrong" + support link |
| WebSocket disconnect | Reconnect overlay with countdown |
| Empty states | Dedicated empty state components (see UX docs) |

---

## Logging Rules

| Level | Use | PII |
|---|---|---|
| error | Unhandled exceptions, DLQ, security events | Never |
| warn | Rate limits, retries, deprecated API use | Never |
| info | Request completed, job finished | Never |
| debug | Development only | Never |

Every log entry includes: `requestId`, `userId` (if auth), `action`, `duration_ms`.

---

## Error Monitoring

- Sentry (or equivalent) captures 500 errors with stack traces
- Alert on error rate > 1% of requests over 5 minutes
- Weekly error review in engineering standup

---

*See `API-Design.md` for endpoint-specific error codes and `openapi/openapi.yaml` for documented responses.*
