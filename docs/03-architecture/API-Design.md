# API Design — MathQuest

**Version:** 1.0.0

---

## Overview

MathQuest exposes a REST API for all platform operations. A GraphQL compatibility layer is planned for Phase 2. The API is versioned, authenticated via JWT, and follows RFC 7807 for error responses.

---

## API Standards

- **Protocol:** HTTPS only (TLS 1.2+)
- **Format:** JSON (Content-Type: application/json)
- **Versioning:** URL path versioning (`/api/v1/`)
- **Authentication:** Bearer JWT in Authorization header
- **Error format:** RFC 7807 Problem Details
- **Pagination:** Cursor-based for large collections
- **Idempotency:** POST endpoints that create resources accept `Idempotency-Key` header
- **Rate limiting:** Per-user and per-IP limits enforced via Redis
- **OpenAPI:** All endpoints documented in `openapi/openapi.yaml`

---

## Base URLs

| Environment | Base URL |
|---|---|
| Production | `https://api.mathquest.io/api/v1` |
| Staging | `https://api.staging.mathquest.io/api/v1` |
| Local | `http://localhost:3000/api/v1` |

---

## Resource Naming

- Plural nouns for collections: `/questions`, `/matches`, `/users`
- Nested resources for ownership: `/classes/{class_id}/students`
- Actions as sub-resources: `/questions/{id}/publish`, `/matches/{id}/forfeit`
- No verbs in resource names except for action sub-resources

---

## HTTP Method Semantics

| Method | Use | Idempotent |
|---|---|---|
| GET | Read resource or collection | Yes |
| POST | Create resource or trigger action | No (use Idempotency-Key) |
| PATCH | Partial update | Yes |
| PUT | Full replacement (rare) | Yes |
| DELETE | Soft delete | Yes |

---

## Authentication and Authorization

- All endpoints except `/auth/register`, `/auth/login`, `/auth/password-reset/*` require a valid JWT.
- JWT is passed as: `Authorization: Bearer <token>`
- RBAC is enforced per endpoint. See the Authorization Matrix below.
- School-scoped resources are validated against the authenticated user's `school_id`.

---

## Required Headers

| Header | Required | Description |
|---|---|---|
| Authorization | Yes (authenticated) | Bearer JWT |
| Content-Type | Yes (POST/PATCH) | application/json |
| Accept | Recommended | application/json |
| Idempotency-Key | Recommended (POST) | UUID v4 for safe retries |
| X-Request-ID | Recommended | Client-generated request ID for tracing |

---

## Response Conventions

### Success Response Envelope

```json
{
  "data": { ... },
  "meta": {
    "request_id": "uuid",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### Paginated Collection Response

```json
{
  "data": [ ... ],
  "pagination": {
    "cursor": "next_cursor_value",
    "has_more": true,
    "total": 1250
  },
  "meta": { ... }
}
```

---

## Status Codes

| Code | Meaning |
|---|---|
| 200 | OK — successful GET, PATCH, DELETE |
| 201 | Created — successful POST that creates a resource |
| 202 | Accepted — async operation started |
| 204 | No Content — successful DELETE with no body |
| 400 | Bad Request — validation error |
| 401 | Unauthorized — missing or invalid JWT |
| 403 | Forbidden — authenticated but insufficient permissions |
| 404 | Not Found — resource does not exist or is soft-deleted |
| 409 | Conflict — duplicate resource or state conflict |
| 422 | Unprocessable Entity — business rule violation |
| 429 | Too Many Requests — rate limit exceeded |
| 500 | Internal Server Error — unexpected server error |
| 503 | Service Unavailable — AI provider or dependency unavailable |

---

## Error Format (RFC 7807)

```json
{
  "type": "https://api.mathquest.io/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "One or more fields failed validation.",
  "instance": "/api/v1/questions",
  "errors": [
    { "field": "grade", "message": "Grade must be between 1 and 12." }
  ],
  "request_id": "uuid"
}
```

---

## Pagination

- Default page size: 20
- Maximum page size: 100
- Cursor-based: `?cursor=<opaque_cursor>&limit=20`
- Sorting: `?sort=created_at&order=desc`
- Filtering: `?grade=7&status=published`

---

## Rate Limiting

| Scope | Limit | Window |
|---|---|---|
| Login (per IP) | 5 requests | 15 minutes |
| API (per authenticated user) | 1000 requests | 1 minute |
| AI generation (per teacher) | 20 requests | 1 hour |
| Import (per teacher) | 5 requests | 1 hour |

Rate limit headers returned on every response:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

---

## Authorization Matrix

| Endpoint | Student | Teacher | Admin | Operator |
|---|---|---|---|---|
| POST /auth/register | ✓ | ✓ | ✓ | ✓ |
| POST /auth/login | ✓ | ✓ | ✓ | ✓ |
| GET /dashboard/student | ✓ | — | — | — |
| GET /dashboard/teacher | — | ✓ | — | — |
| GET /dashboard/admin | — | — | ✓ | ✓ |
| GET /learning/paths | ✓ | ✓ | — | — |
| POST /learning/lessons/{id}/start | ✓ | — | — | — |
| POST /learning/lessons/{id}/complete | ✓ | — | — | — |
| GET /questions | ✓ (published only) | ✓ | ✓ | ✓ |
| POST /questions | — | ✓ | — | ✓ |
| PATCH /questions/{id} | — | ✓ (own school) | — | ✓ |
| DELETE /questions/{id} | — | ✓ (own school) | — | ✓ |
| POST /questions/import | — | ✓ | — | ✓ |
| POST /ai/generate-questions | — | ✓ | — | ✓ |
| POST /matches | ✓ | — | — | — |
| GET /matches/{id} | ✓ (participant) | ✓ (own school) | ✓ | ✓ |
| GET /leaderboards | ✓ | ✓ | ✓ | ✓ |
| GET /notifications | ✓ | ✓ | ✓ | — |
| GET /admin/users | — | — | ✓ | ✓ |
| POST /admin/users | — | — | ✓ | ✓ |
| GET /admin/reports | — | — | ✓ | ✓ |

---

## Resource Groups and Endpoint Catalog

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login and receive JWT |
| POST | /auth/logout | Invalidate refresh token |
| POST | /auth/refresh | Exchange refresh token for new JWT |
| POST | /auth/password-reset/request | Request password reset email |
| POST | /auth/password-reset/confirm | Set new password with token |
| GET | /auth/sessions | List active sessions |
| DELETE | /auth/sessions/{id} | Revoke a session |

### Learning

| Method | Endpoint | Description |
|---|---|---|
| GET | /learning/paths | List learning paths (filtered by grade) |
| GET | /learning/paths/{id} | Get learning path detail |
| POST | /learning/paths/{id}/enroll | Enroll student in path |
| GET | /learning/progress | Get student's progress across all paths |
| POST | /learning/lessons/{id}/start | Start a lesson |
| POST | /learning/lessons/{id}/complete | Submit lesson answers |
| GET | /learning/recommendations | Get AI next-activity recommendation |

### Questions

| Method | Endpoint | Description |
|---|---|---|
| GET | /questions | List questions (with filters) |
| POST | /questions | Create question |
| GET | /questions/{id} | Get question detail |
| PATCH | /questions/{id} | Update question (creates new version) |
| DELETE | /questions/{id} | Soft-delete question |
| PATCH | /questions/{id}/status | Change question status |
| GET | /questions/{id}/versions | Get version history |
| POST | /questions/import | Import questions from file |
| GET | /questions/import/{job_id} | Get import job status |

### AI

| Method | Endpoint | Description |
|---|---|---|
| POST | /ai/generate-questions | Generate questions from prompt |
| GET | /ai/jobs/{job_id} | Get AI job status |
| GET | /ai/recommendations/{student_id} | Get AI recommendations for student |
| GET | /ai/weakness-analysis/{student_id} | Get weakness analysis for student |

### Matches

| Method | Endpoint | Description |
|---|---|---|
| POST | /matches | Create match (challenge opponent) |
| GET | /matches | List matches (history) |
| GET | /matches/{id} | Get match detail |
| POST | /matches/{id}/accept | Accept match invitation |
| POST | /matches/{id}/decline | Decline match invitation |
| GET | /matches/{id}/result | Get match result |

### Gamification

| Method | Endpoint | Description |
|---|---|---|
| GET | /gamification/profile | Get student XP, rank, streak |
| GET | /gamification/achievements | List all achievements |
| GET | /gamification/achievements/earned | List student's earned achievements |
| GET | /gamification/missions | List active missions |
| GET | /gamification/missions/progress | Get student's mission progress |
| GET | /leaderboards/class/{class_id} | Class leaderboard |
| GET | /leaderboards/school/{school_id} | School leaderboard |

### Dashboards

| Method | Endpoint | Description |
|---|---|---|
| GET | /dashboard/student | Student dashboard data |
| GET | /dashboard/teacher | Teacher dashboard data |
| GET | /dashboard/admin | Admin dashboard data |

### Classes and Assignments

| Method | Endpoint | Description |
|---|---|---|
| GET | /classes | List teacher's classes |
| POST | /classes | Create class |
| GET | /classes/{id} | Get class detail with roster |
| POST | /classes/{id}/students | Add student to class |
| DELETE | /classes/{id}/students/{student_id} | Remove student from class |
| GET | /classes/{id}/assignments | List class assignments |
| POST | /assignments | Create assignment |
| PATCH | /assignments/{id} | Update assignment |
| POST | /assignments/{id}/publish | Publish assignment |
| GET | /assignments/{id}/results | Get assignment completion results |

### Notifications

| Method | Endpoint | Description |
|---|---|---|
| GET | /notifications | List user notifications |
| PATCH | /notifications/{id}/read | Mark notification as read |
| POST | /notifications/read-all | Mark all as read |

### Administration

| Method | Endpoint | Description |
|---|---|---|
| GET | /admin/users | List school users |
| POST | /admin/users | Create user |
| PATCH | /admin/users/{id} | Update user |
| POST | /admin/users/{id}/deactivate | Deactivate user |
| POST | /admin/users/{id}/reset-password | Trigger password reset |
| GET | /admin/reports/school | School performance report |
| GET | /admin/reports/class/{id} | Class performance report |
| POST | /admin/reports/export | Export report as PDF/CSV |
| GET | /admin/audit-logs | View audit log |

---

## WebSocket API

**Endpoint:** `wss://api.mathquest.io/ws/matches/{match_id}`

**Authentication:** JWT passed as query parameter on connection: `?token=<jwt>`

### Client → Server Events

| Event | Payload | Description |
|---|---|---|
| `join_match` | `{ match_id }` | Player joins match room |
| `submit_answer` | `{ card_index, answer }` | Player submits answer for current card |
| `focus_lost` | `{ timestamp }` | Browser focus lost (anti-cheat) |
| `focus_regained` | `{ timestamp }` | Browser focus regained |

### Server → Client Events

| Event | Payload | Description |
|---|---|---|
| `match_ready` | `{ opponent_name, opponent_rank }` | Both players connected |
| `card_revealed` | `{ card_index, color, points, question, options, timer_seconds }` | Card revealed |
| `answer_received` | `{ card_index, correct, points_awarded, running_score }` | Answer processed |
| `card_completed` | `{ card_index, player1_score, player2_score }` | Both players answered |
| `match_completed` | `{ winner_id, player1_score, player2_score, xp_earned, rank_change }` | Match ended |
| `match_forfeited` | `{ forfeited_by, reason, winner_id }` | Match forfeited |
| `anti_cheat_warning` | `{ violation_count, message }` | Anti-cheat warning |
| `opponent_disconnected` | `{ timeout_seconds }` | Opponent disconnected |

---

## Cache Rules

| Endpoint | Cache Strategy | TTL |
|---|---|---|
| GET /learning/paths | Redis cache | 5 minutes |
| GET /dashboard/student | Redis cache | 60 seconds |
| GET /leaderboards/* | Redis cache | 30 seconds |
| GET /questions (published) | Redis cache | 5 minutes |
| GET /gamification/achievements | Redis cache | 1 hour |
| All POST/PATCH/DELETE | No cache | — |

---

## Security Rules

- All endpoints validate JWT signature and expiry before processing
- School-scoped resources validate `school_id` match between JWT claims and resource
- Student endpoints validate student is enrolled in the relevant path/class
- Teacher endpoints validate teacher owns the class/assignment
- No student PII returned in error messages or logs
- Idempotency keys stored for 24 hours to prevent duplicate operations

---

*See `openapi/openapi.yaml` for the full OpenAPI 3.1 specification and `Error-Handling-Strategy.md` for error handling details.*
