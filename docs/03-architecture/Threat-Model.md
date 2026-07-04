# Threat Model — MathQuest

**Version:** 1.0.0
**Method:** STRIDE

---

## System Scope

The threat model covers: Web Frontend, REST API, WebSocket Match Server, AI Worker, PostgreSQL, Redis, Job Queue, and all external integrations (AI Provider, Email Service, Cloud Storage).

---

## Assets

| Asset | Sensitivity | Impact if Compromised |
|---|---|---|
| Student PII (name, email, DOB, grade) | Critical | COPPA/GDPR violation, reputational damage |
| Student learning records | High | FERPA violation, privacy breach |
| Teacher question bank | Medium | Intellectual property loss, curriculum exposure |
| Match results and scores | Medium | Unfair outcomes, trust loss |
| JWT private signing key | Critical | Full platform compromise |
| AI provider API key | High | Financial loss, service abuse |
| Database credentials | Critical | Full data breach |
| Admin credentials | Critical | Full school data access |

---

## Trust Boundaries

1. Public internet → Web Frontend (CDN)
2. Web Frontend → REST API (HTTPS)
3. Web Frontend → WebSocket Server (WSS)
4. REST API → PostgreSQL (internal network)
5. REST API → Redis (internal network)
6. AI Worker → AI Provider (HTTPS, external)
7. REST API → Email Service (HTTPS, external)
8. REST API → Cloud Storage (HTTPS, external)

---

## Entry Points

| Entry Point | Protocol | Authentication |
|---|---|---|
| /auth/login | HTTPS POST | None (public) |
| /auth/register | HTTPS POST | None (public) |
| All other API endpoints | HTTPS | JWT required |
| WebSocket /ws/matches/{id} | WSS | JWT query param |
| Admin dashboard | HTTPS | JWT + admin role |
| AI Worker job queue | Internal | Network isolation |

---

## STRIDE Threat Matrix

### Spoofing

| Threat | Target | Mitigation |
|---|---|---|
| JWT forgery | API authentication | RS256 asymmetric signing; private key in secrets manager |
| Session hijacking | Authenticated sessions | Short JWT expiry (15min); refresh token rotation; HttpOnly cookies |
| Email spoofing (password reset) | User accounts | SPF/DKIM/DMARC on email domain; reset token is single-use |
| Student impersonation in match | Match integrity | JWT validated on WebSocket connection; server-authoritative scoring |

### Tampering

| Threat | Target | Mitigation |
|---|---|---|
| Match score manipulation | Match results | Server-authoritative scoring; client cannot submit scores |
| Question answer exposure | Question bank | Correct answers never included in lesson/match API responses |
| Database record tampering | All data | Parameterized queries; ORM; audit logs; no direct DB access |
| AI prompt injection | AI generation | Input sanitization; prompt templates; output validation |

### Repudiation

| Threat | Target | Mitigation |
|---|---|---|
| Deny match result | Match disputes | Server-authoritative match log; match_events table; immutable audit log |
| Deny question publication | Teacher accountability | Audit log with user_id and timestamp on all question status changes |
| Deny admin action | Admin accountability | Audit log for all admin actions |

### Information Disclosure

| Threat | Target | Mitigation |
|---|---|---|
| Student PII in error messages | Privacy | No PII in error responses or logs |
| Student PII in AI prompts | Privacy | Anonymized prompts; no student identifiers sent to AI provider |
| Question answers in API response | Academic integrity | Correct answers excluded from student-facing responses |
| Cross-school data access | Data isolation | School_id validation on all school-scoped resources |
| JWT private key exposure | Authentication | Key stored in secrets manager; never in code or logs |

### Denial of Service

| Threat | Target | Mitigation |
|---|---|---|
| Login brute force | Authentication | Rate limiting: 5 attempts/15min/IP; account lockout |
| API flooding | Platform availability | Per-user and per-IP rate limiting; WAF |
| AI generation abuse | AI cost | Per-teacher rate limiting (20 req/hour); token budget per request |
| WebSocket connection flooding | Match server | Connection limits per IP; authentication required |
| Large file upload | Import endpoint | File size limit (10MB); async processing |

### Elevation of Privilege

| Threat | Target | Mitigation |
|---|---|---|
| Student accessing teacher endpoints | RBAC | Role check on every endpoint; default deny |
| Teacher accessing other school's data | Data isolation | School_id scope validation |
| Student manipulating match via WebSocket | Match integrity | Server validates all events; client events are inputs only |
| JWT role claim manipulation | RBAC | Role stored in JWT claims signed with private key; cannot be modified |

---

## OWASP Top 10 Mapping

| OWASP Risk | MathQuest Mitigation |
|---|---|
| A01: Broken Access Control | RBAC on every endpoint; school-scope validation; default deny |
| A02: Cryptographic Failures | TLS 1.2+; AES-256 at rest; bcrypt passwords; RS256 JWT |
| A03: Injection | Parameterized queries; ORM; input validation; output encoding |
| A04: Insecure Design | Threat model; security review in DoD; privacy by design |
| A05: Security Misconfiguration | Security headers; secrets manager; no default credentials |
| A06: Vulnerable Components | Dependency scanning (Snyk/Dependabot) on every build |
| A07: Auth Failures | Short JWT expiry; refresh rotation; rate limiting; bcrypt |
| A08: Software Integrity | Signed deployments; dependency lock files; SAST in CI |
| A09: Logging Failures | Audit logs; structured logging; no PII in logs |
| A10: SSRF | AI provider calls via worker only; no user-controlled URLs |

---

## Critical Threat Scenarios

### Scenario 1: JWT Private Key Compromise
- **Impact:** Attacker can forge tokens for any user, including admins
- **Mitigation:** Key stored in secrets manager (AWS Secrets Manager/Vault); key rotation procedure documented; access limited to API server process only
- **Detection:** Anomalous login patterns; geographic anomalies; audit log review

### Scenario 2: Student Data Breach
- **Impact:** COPPA/GDPR violation; reputational damage; regulatory fines
- **Mitigation:** Encryption at rest and in transit; minimal data collection; no PII in AI prompts; access controls; audit logs
- **Detection:** Anomalous data export volumes; unauthorized access alerts; database activity monitoring

### Scenario 3: Match Score Manipulation
- **Impact:** Unfair outcomes; trust loss; leaderboard corruption
- **Mitigation:** Server-authoritative scoring; client events are inputs only; match_events audit trail
- **Detection:** Score anomaly detection; match event log review

### Scenario 4: AI Prompt Injection
- **Impact:** Malicious content in question bank; inappropriate questions for students
- **Mitigation:** Input sanitization; prompt templates with parameter injection (not string concatenation); output validation; teacher review gate
- **Detection:** Content moderation on AI output; teacher review flags

---

## Threat Register

| ID | Threat | STRIDE | Severity | Status |
|---|---|---|---|---|
| T-01 | JWT forgery | Spoofing | Critical | Mitigated (RS256) |
| T-02 | Match score manipulation | Tampering | High | Mitigated (server-authoritative) |
| T-03 | Student PII in AI prompts | Information Disclosure | High | Mitigated (anonymized prompts) |
| T-04 | Cross-school data access | Information Disclosure | High | Mitigated (school_id scope) |
| T-05 | Login brute force | DoS | Medium | Mitigated (rate limiting) |
| T-06 | AI prompt injection | Tampering | Medium | Mitigated (templates + review gate) |
| T-07 | Privilege escalation (student → teacher) | Elevation | High | Mitigated (RBAC) |
| T-08 | Database credential exposure | Information Disclosure | Critical | Mitigated (secrets manager) |
| T-09 | Anti-cheat bypass | Tampering | Medium | Partially mitigated (server-side detection) |
| T-10 | Parental consent bypass (under-13) | Elevation | High | Mitigated (age gate + consent flow) |

---

## Review Cadence

- Threat model reviewed: before each major release and after any significant architecture change
- Penetration test: annually (external) and before V1 launch
- DAST scan: before every production release

---

*See `Auth-Security.md` for authentication controls and `Security-Architecture.md` for infrastructure security.*
