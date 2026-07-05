# Integration Architecture — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Describes how MathBattle integrates with external systems: patterns, protocols, failure handling, and data boundaries.

---

## Integration Map

```
MathBattle Platform
├── AI Provider (OpenAI / Anthropic)     — HTTPS REST, async via job queue
├── Email Service (SendGrid / Postmark)  — HTTPS REST, async via job queue
├── Cloud Storage (S3 / GCS)             — HTTPS SDK, sync + async
├── CDN (CloudFront / Cloudflare)        — Static asset delivery
└── Identity (future: SAML/OIDC)         — Phase 3, not MVP
```

Phase 1 has no inbound third-party webhooks except future payment (Phase 3). See `Webhook-Strategy.md`.

---

## Integration Patterns

| Pattern | Use Case | Example |
|---|---|---|
| Sync REST (outbound) | Immediate response needed | Login, fetch question |
| Async Job Queue | Long-running or retriable | AI generation, email send |
| Object Storage SDK | File upload/download | Document import, report export |
| WebSocket (inbound from client) | Real-time match | Student ↔ Match server |

---

## AI Provider Integration

| Aspect | Design |
|---|---|
| Protocol | HTTPS REST (provider SDK) |
| Trigger | API enqueues job → AI Worker consumes |
| Auth | API key in Secrets Manager |
| Data sent | Grade, subject, topic, Bloom level — **no PII** |
| Response | Structured JSON → validated → stored as draft question |
| Failure | 3 retries, exponential backoff; DLQ on permanent failure |
| Dev/staging | `AI_PROVIDER=mock` bypasses external call |

See `AI-Architecture.md` and `Third-Party-Integrations.md`.

---

## Email Integration

| Aspect | Design |
|---|---|
| Protocol | HTTPS REST (SendGrid/Postmark API) |
| Trigger | Async job on: registration, password reset, parental consent, assignment publish (Phase 2) |
| Templates | Stored in provider; versioned by template ID env var |
| Failure | Retry 3×; log failure; do not block user registration |
| Dev | `EMAIL_PROVIDER=mock` logs to console |

---

## Cloud Storage Integration

| Aspect | Design |
|---|---|
| Protocol | AWS SDK / GCS client |
| Use cases | Document import uploads, CSV export downloads, static assets |
| Access | Pre-signed URLs for client upload; server-side for processing |
| Bucket structure | `{env}/imports/{schoolId}/`, `{env}/exports/{schoolId}/` |
| Lifecycle | Import files deleted after 30 days post-processing |

---

## Failure Isolation

| Integration Down | Platform Behavior |
|---|---|
| AI Provider | Queue jobs; show "generation in progress" UI; no blocking |
| Email | Queue jobs; registration completes; resend available |
| Storage | Block new imports; existing content served from DB |
| Redis | API degraded mode: no cache, no rate limit (fail open with alert) |
| PostgreSQL | Full outage; 503 responses; no data loss (RDS Multi-AZ) |

---

## Data Boundary Rules

1. No student PII crosses integration boundaries except email service (recipient address only)
2. AI prompts are anonymized and logged without content in production
3. All outbound calls use TLS 1.2+
4. API keys rotated quarterly

---

*See `Third-Party-Integrations.md` for vendor details and `Queue-and-Jobs-Architecture.md` for async processing.*
