# Security Architecture — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

This document describes the defense-in-depth security architecture for MathBattle. Operational auth flows and RBAC details are in `Auth-Security.md`; threat analysis is in `Threat-Model.md`.

---

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: Edge (CDN, WAF, TLS 1.3, DDoS protection)       │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: Application (JWT, RBAC, rate limits, validation)  │
├─────────────────────────────────────────────────────────────┤
│  Layer 3: Data (encryption at rest, soft delete, masking)   │
├─────────────────────────────────────────────────────────────┤
│  Layer 4: Real-time (WebSocket auth, anti-cheat, forfeit)   │
├─────────────────────────────────────────────────────────────┤
│  Layer 5: Operations (audit logs, monitoring, incident IR)  │
└─────────────────────────────────────────────────────────────┘
```

---

## Trust Boundaries

| Boundary | Components | Controls |
|---|---|---|
| Internet → CDN | Browser, CloudFront | TLS, HSTS, CSP headers |
| CDN → API | REST API | JWT validation, rate limiting |
| Browser → WS Server | Match sessions | JWT on connect, room isolation |
| API → Database | PostgreSQL | TLS, least-privilege DB user |
| API → AI Provider | OpenAI/Anthropic | Anonymized prompts, no PII |
| API → Email | SendGrid/Postmark | API key in secrets manager |

---

## Authentication Architecture

- **Pattern:** Stateless JWT (RS256) + refresh token rotation
- **Access token:** 15-minute TTL, claims: `sub`, `role`, `school_id`, `iat`, `exp`
- **Refresh token:** Stored as SHA-256 hash in `refresh_tokens` table; rotated on every use
- **Session invalidation:** Password change revokes all refresh tokens; logout revokes current device token

See `Auth-Security.md` for sequence diagrams.

---

## Authorization (RBAC)

| Role | Scope | Key Permissions |
|---|---|---|
| student | Own data + enrolled content | Lessons, matches, own profile |
| teacher | Own classes + school question bank | Assignments, questions, class reports |
| admin | School-wide | User management, school settings |
| operator | Platform-wide (internal) | Moderation, AI oversight, system config |

Enforcement: NestJS guards on every protected route; WebSocket handshake validates JWT and role.

---

## Data Protection

| Data State | Control |
|---|---|
| In transit | TLS 1.2+ everywhere; WSS for WebSocket |
| At rest | AES-256 (RDS encryption, S3 SSE) |
| In logs | PII redaction middleware; structured JSON logs |
| In backups | Encrypted snapshots; 7-year audit retention |
| Soft delete | `deleted_at` on user-facing entities; 30-day hard delete window |

---

## Input Validation & Output Encoding

- All inputs validated with class-validator DTOs (server-side)
- SQL injection prevented via parameterized queries (Prisma/TypeORM)
- XSS prevented via React auto-escaping + CSP `script-src 'self'`
- CSRF: SameSite cookies not used (JWT in Authorization header); CORS restricted to known origins

---

## Rate Limiting

| Endpoint Class | Limit | Store |
|---|---|---|
| Login | 5 failures / 15 min / IP | Redis |
| Password reset | 3 requests / hour / email | Redis |
| Authenticated API | 1000 req / min / user | Redis |
| AI generation | 10 requests / hour / teacher | Redis |
| WebSocket messages | 60 / min / connection | In-memory + Redis |

---

## Anti-Cheat (Match Security)

- Browser focus/tab visibility events sent to WebSocket server
- 3 focus-loss events within a match → warning; 5 → auto-forfeit
- Answers validated server-side; client cannot submit after timer expiry
- Match state is server-authoritative; client is display-only

---

## AI Security

- Prompts contain no student PII (grade/topic only)
- AI-generated content enters question bank as `draft` only
- Teacher review required before `published` status
- Token budget limits prevent cost abuse
- Provider API keys in AWS Secrets Manager only

---

## Compliance Mapping

| Regulation | Architectural Control |
|---|---|
| COPPA | Parental consent flow; under-13 account lock until consent |
| FERPA | School-scoped data isolation; audit trail |
| GDPR | Soft delete, data export endpoint (Phase 2), retention policy |

See `Compliance-Architecture.md` and `Privacy-Policy.md`.

---

## Security Testing Requirements

| Test Type | Frequency | Tool |
|---|---|---|
| SAST | Every PR | ESLint security plugins, Semgrep |
| Dependency scan | Every build | Dependabot / Snyk |
| DAST | Pre-release | OWASP ZAP |
| Penetration test | Pre-launch + annual | Third-party vendor |

---

*See `Threat-Model.md` for STRIDE analysis and `Audit-Logging-Strategy.md` for security event logging.*
