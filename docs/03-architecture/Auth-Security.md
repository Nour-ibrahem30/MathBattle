# Authentication and Security — MathQuest

**Version:** 1.0.0

---

## Scope

This document covers authentication flows, session security, RBAC model, endpoint authorization, anti-cheat, and security testing requirements for MathQuest.

---

## Standards Baseline

- OWASP Top 10 (2021) compliance required
- OWASP ASVS Level 2 for authentication
- JWT: RFC 7519
- Password hashing: bcrypt, cost factor ≥ 12
- TLS: 1.2 minimum, 1.3 preferred
- Encryption at rest: AES-256

---

## Authentication Decision

MathQuest uses **JWT (JSON Web Tokens)** with a **refresh token rotation** pattern.

- Access token: short-lived (15 minutes), stateless, signed with RS256
- Refresh token: long-lived (30 days), stored as a hash in the database, rotated on every use
- No server-side session storage for access tokens (stateless scaling)
- Refresh tokens are invalidated on: password change, logout, suspicious activity detection

---

## Authentication Flows

### Standard Login Flow

```
Client                    API Server                  Database
  │                           │                           │
  │── POST /auth/login ───────►│                           │
  │   {email, password}        │── SELECT user by email ──►│
  │                           │◄── user record ────────────│
  │                           │── bcrypt.compare() ────────│
  │                           │── rate limit check ────────│
  │                           │── generate JWT (15min) ────│
  │                           │── generate refresh token ──│
  │                           │── store refresh token hash ►│
  │◄── 200 {jwt, refresh} ────│                           │
```

### Token Refresh Flow

```
Client                    API Server                  Database
  │                           │                           │
  │── POST /auth/refresh ─────►│                           │
  │   {refresh_token}          │── hash token ─────────────│
  │                           │── SELECT by hash ─────────►│
  │                           │◄── token record ───────────│
  │                           │── check expiry ────────────│
  │                           │── check revoked ───────────│
  │                           │── DELETE old token ────────►│
  │                           │── generate new JWT ────────│
  │                           │── generate new refresh ────│
  │                           │── store new refresh hash ──►│
  │◄── 200 {new_jwt, new_refresh}│                         │
```

### Password Reset Flow

```
Client                    API Server              Email Service
  │                           │                       │
  │── POST /auth/password-reset/request ──────────────►│
  │   {email}                  │── generate token ─────│
  │                           │── store token hash ────│
  │                           │── send reset email ───►│
  │◄── 200 (always) ──────────│                       │
  │                           │                       │
  │── POST /auth/password-reset/confirm ──────────────│
  │   {token, new_password}    │── validate token ─────│
  │                           │── update password ─────│
  │                           │── revoke all tokens ───│
  │◄── 200 ───────────────────│                       │
```

---

## Session Security

| Rule | Implementation |
|---|---|
| Access token expiry | 15 minutes |
| Refresh token expiry | 30 days |
| Refresh token rotation | New token issued on every refresh; old token invalidated |
| Concurrent sessions | Allowed (multiple devices); each has its own refresh token |
| Session revocation | On password change, logout, or suspicious activity |
| Token storage (client) | Access token: memory only; Refresh token: HttpOnly cookie or secure storage |
| JWT algorithm | RS256 (asymmetric) — private key signs, public key verifies |

---

## Password Security

| Rule | Implementation |
|---|---|
| Minimum length | 8 characters |
| Complexity | At least 1 uppercase, 1 number, 1 special character |
| Hashing | bcrypt, cost factor 12 |
| Reset token | 32-byte cryptographically random, stored as SHA-256 hash |
| Reset expiry | 1 hour |
| Reset single-use | Token invalidated after use |
| Breach detection | Optional: check against HaveIBeenPwned API on registration |

---

## RBAC Model

### Roles

| Role | Description |
|---|---|
| student | K–12 student; access to own learning data, matches, gamification |
| teacher | Classroom teacher; access to own classes, question bank, assignments, reports |
| admin | School administrator; access to school-wide user management and reports |
| operator | Internal platform staff; access to all schools for support and moderation |

### Permission Scopes

| Scope | Description |
|---|---|
| own | User can only access their own records |
| school | User can access records within their school |
| all | User can access all records (operator only) |

### RBAC Enforcement Rules

1. Every API endpoint declares its required role(s) and scope.
2. AuthGuard validates JWT on every request.
3. RBACGuard checks role against endpoint requirements.
4. ScopeGuard validates school_id match for school-scoped resources.
5. No endpoint is accessible without explicit role declaration.
6. Default deny: if no role matches, return 403.

---

## Anti-Cheat System

### Browser Focus Detection

**Purpose:** Detect tab switching and window focus loss during multiplayer matches to prevent students from looking up answers.

**Implementation:**
- Client-side: `document.addEventListener('visibilitychange', ...)` and `window.addEventListener('blur', ...)`
- Events sent to WebSocket server immediately on detection
- Server logs event with timestamp and violation count

**Enforcement Rules:**

| Violation | Action |
|---|---|
| First focus loss | Log event; send `anti_cheat_warning` to student; no score penalty |
| Second focus loss | Forfeit match for violating student; opponent wins; log event |
| Suspicious answer timing (< 1s consistently for 5+ cards) | Flag match for review; no auto-forfeit; teacher/admin can review |

**Configuration:**
- Focus detection can be disabled per assignment by teacher (for accessibility accommodations)
- Sensitivity threshold configurable by school administrator

**Edge Cases:**
- Accidental tab switch (< 2 seconds): still counts as violation (consistent enforcement)
- Screen reader navigation: may trigger false positives; accessibility mode disables focus detection
- Mobile browser: focus events behave differently; mobile-specific detection logic required

---

## CSRF Protection

- API is stateless (JWT-based); CSRF tokens not required for API endpoints
- If cookies are used for refresh tokens: SameSite=Strict, HttpOnly, Secure flags required
- Double-submit cookie pattern if SameSite is not sufficient for target browsers

---

## Security Headers

All API responses must include:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; ...
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## Input Validation and Output Encoding

- All user inputs validated server-side using a validation pipe (class-validator or Zod)
- SQL injection: prevented by parameterized queries (ORM enforced)
- XSS: all user-generated content HTML-encoded on output
- File uploads: type validation, size limits, virus scanning (Phase 2)
- JSON: strict schema validation on all request bodies

---

## Audit Logging

All security-relevant events are logged to the `audit_logs` table:

| Event | Logged Fields |
|---|---|
| user.login | user_id, ip (hashed), user_agent, success/failure |
| user.login_failed | ip (hashed), email (hashed), attempt count |
| user.password_reset | user_id, timestamp |
| user.session_revoked | user_id, session_id, reason |
| question.published | user_id, question_id |
| question.archived | user_id, question_id |
| match.forfeited | match_id, user_id, reason |
| admin.user_deactivated | admin_id, target_user_id |
| admin.report_exported | admin_id, report_type, date_range |

**Rules:**
- No PII in log values (email and IP are hashed)
- Audit logs are append-only (no updates or deletes)
- Retained for 7 years (archived to cold storage after 1 year)

---

## Security Testing Checklist

- [ ] OWASP Top 10 DAST scan before every release
- [ ] SAST scan on every PR (automated)
- [ ] Dependency vulnerability scan on every build (Snyk/Dependabot)
- [ ] JWT algorithm confusion attack test
- [ ] Rate limiting bypass test
- [ ] IDOR (Insecure Direct Object Reference) test for all school-scoped resources
- [ ] Anti-cheat bypass test (WebSocket message manipulation)
- [ ] SQL injection test on all filter parameters
- [ ] XSS test on all user-generated content fields
- [ ] Password reset token enumeration test
- [ ] Session fixation test
- [ ] Privilege escalation test (student accessing teacher endpoints)

---

*See `Threat-Model.md` for STRIDE analysis and `Security-Architecture.md` for infrastructure security controls.*
