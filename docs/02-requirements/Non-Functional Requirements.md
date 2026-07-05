# Non-Functional Requirements — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Executive summary of non-functional requirements. Full detail in `NFR-Detailed.md`.

---

## Categories

| Category | ID Prefix | Summary |
|---|---|---|
| Performance | NFR-PERF | API ≤ 500ms P95; LCP ≤ 2s; match latency ≤ 200ms |
| Reliability | NFR-REL | 99.5% uptime; RTO ≤ 4h; RPO ≤ 1h |
| Security | NFR-SEC | OWASP Top 10; JWT 15min; TLS 1.2+; zero PII in logs |
| Scalability | NFR-SCALE | 100,000 concurrent students; horizontal API scaling |
| Usability | NFR-USE | WCAG 2.1 AA; mobile-responsive; ≤ 3 clicks to start lesson |
| Maintainability | NFR-MAINT | 80% unit test coverage on business logic; OpenAPI contracts |
| Compliance | NFR-COMP | COPPA, FERPA, GDPR alignment |
| Operability | NFR-OPS | Structured logging; monitoring; zero-downtime deploys |

---

## Key Targets (Phase 1 MVP)

| Requirement | Target |
|---|---|
| Platform uptime | ≥ 99.5% monthly |
| API P95 response time | ≤ 500ms |
| Page load (LCP) | ≤ 2 seconds on 4G |
| WebSocket match latency | ≤ 200ms round-trip |
| Concurrent users supported | 100,000 |
| Accessibility | WCAG 2.1 Level AA |
| Data encryption | AES-256 at rest; TLS in transit |
| Student data retention | Per `Data-Retention-Policy.md` |

---

## Standards

- OWASP Top 10 (2021)
- WCAG 2.1 AA
- RFC 7807 (API errors)
- OpenAPI 3.1
- COPPA / FERPA / GDPR

---

## Verification

| NFR Category | Verification Method |
|---|---|
| Performance | k6 load tests, Lighthouse CI |
| Reliability | Uptime probes, DR drills |
| Security | SAST, DAST, pen test |
| Scalability | Stress tests to 10K RPS |
| Usability | Accessibility audit, user testing |
| Compliance | Legal review, audit log verification |

---

*See `NFR-Detailed.md` for per-requirement IDs, targets, and measurement methods.*
