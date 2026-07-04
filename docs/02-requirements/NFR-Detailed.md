# Non-Functional Requirements — Detailed (NFR-Detailed) — MathQuest

**Version:** 1.0.0

---

## Standards and References

| Standard | Application |
|---|---|
| OWASP Top 10 (2021) | Security baseline for all API and web components |
| WCAG 2.1 Level AA | Accessibility baseline for all student and teacher interfaces |
| ISO/IEC 25010 | Quality model reference for software product quality |
| COPPA (US) | Privacy requirements for users under 13 |
| FERPA (US) | Student education record privacy |
| GDPR (EU) | Data protection for EU users |
| RFC 7807 | Problem Details for HTTP APIs (error format) |
| OpenAPI 3.1 | API documentation standard |

---

## NFR-PERF — Performance

| ID | Requirement | Target | Measurement Method | Verification |
|---|---|---|---|---|
| NFR-PERF-01 | API P95 response time | ≤ 500ms | APM (e.g., Datadog, New Relic) | Load test at 10,000 RPS |
| NFR-PERF-02 | API P99 response time | ≤ 1000ms | APM | Load test |
| NFR-PERF-03 | Page LCP (Largest Contentful Paint) | ≤ 2s on 4G | Lighthouse / RUM | Weekly automated Lighthouse run |
| NFR-PERF-04 | WebSocket match round-trip latency | ≤ 200ms | WebSocket ping/pong measurement | Match simulation test |
| NFR-PERF-05 | AI question generation (5 questions) | ≤ 15s | API response time tracking | Integration test with AI provider |
| NFR-PERF-06 | Student dashboard load | ≤ 500ms | APM + RUM | Load test with cache warm |
| NFR-PERF-07 | Database query P95 | ≤ 100ms | Database slow query log | Query analysis in staging |
| NFR-PERF-08 | Background job processing (AI analysis) | ≤ 60s per student | Job queue monitoring | Integration test |

### Performance Testing Approach
- Load testing tool: k6 or Locust
- Baseline: 1,000 concurrent users
- Stress test: 10,000 concurrent users
- Spike test: 0 → 50,000 users in 60 seconds
- Soak test: 5,000 concurrent users for 4 hours
- Match simulation: 1,000 concurrent WebSocket connections

---

## NFR-REL — Reliability

| ID | Requirement | Target | Measurement Method | Verification |
|---|---|---|---|---|
| NFR-REL-01 | Platform uptime | ≥ 99.5% monthly | Uptime monitoring (external probe) | Monthly SLA report |
| NFR-REL-02 | Data durability | ≥ 99.999% | Backup verification tests | Monthly restore test |
| NFR-REL-03 | Match state recovery | Resume within 30s of reconnect | WebSocket reconnect test | Integration test |
| NFR-REL-04 | Background job retry | ≥ 3 retries, exponential backoff | Job queue dead-letter monitoring | Integration test |
| NFR-REL-05 | Zero-downtime deployment | No user-visible downtime during deploy | Deployment monitoring | Every deployment |
| NFR-REL-06 | RTO | ≤ 4 hours | Disaster recovery drill | Quarterly DR drill |
| NFR-REL-07 | RPO | ≤ 1 hour | Backup schedule verification | Monthly |

---

## NFR-SEC — Security

| ID | Requirement | Target | Measurement Method | Verification |
|---|---|---|---|---|
| NFR-SEC-01 | OWASP Top 10 compliance | Zero critical/high findings | SAST + DAST scan | Pre-launch and quarterly |
| NFR-SEC-02 | JWT access token expiry | 15 minutes | Token inspection | Unit test |
| NFR-SEC-03 | Refresh token rotation | On every use | Token audit log | Integration test |
| NFR-SEC-04 | TLS version | TLS 1.2 minimum, TLS 1.3 preferred | SSL Labs scan | Pre-launch |
| NFR-SEC-05 | Data encryption at rest | AES-256 | Infrastructure audit | Pre-launch |
| NFR-SEC-06 | Rate limiting (login) | Max 5 attempts / 15 min / IP | Rate limit test | Integration test |
| NFR-SEC-07 | Rate limiting (API) | Max 1000 req/min per authenticated user | Rate limit test | Load test |
| NFR-SEC-08 | Input validation | All user inputs validated server-side | Code review + SAST | Every PR |
| NFR-SEC-09 | PII in logs | Zero PII in application logs | Log audit | Pre-launch + quarterly |
| NFR-SEC-10 | Anti-cheat detection | Browser focus loss detected within 1s | Integration test | Pre-launch |
| NFR-SEC-11 | Dependency vulnerabilities | Zero critical CVEs in production | Dependency scan (Snyk/Dependabot) | Every build |

---

## NFR-SCALE — Scalability

| ID | Requirement | Target | Measurement Method | Verification |
|---|---|---|---|---|
| NFR-SCALE-01 | Concurrent students | 100,000 without architecture changes | Load test | Phase 3 load test |
| NFR-SCALE-02 | Concurrent matches | 10,000 simultaneous WebSocket connections | WebSocket load test | Phase 2 load test |
| NFR-SCALE-03 | Question bank size | 1,000,000 questions, P95 search ≤ 200ms | Database query test | Phase 3 |
| NFR-SCALE-04 | Horizontal API scaling | Stateless; scale by adding instances | Architecture review | Pre-launch |
| NFR-SCALE-05 | Database read scaling | Read replicas for analytics queries | Database monitoring | Phase 2 |

---

## NFR-ACC — Accessibility

| ID | Requirement | Target | Measurement Method | Verification |
|---|---|---|---|---|
| NFR-ACC-01 | WCAG 2.1 AA compliance | Zero AA violations | axe-core automated scan + manual audit | Pre-launch |
| NFR-ACC-02 | Keyboard navigation | All primary flows keyboard-navigable | Manual keyboard test | Pre-launch |
| NFR-ACC-03 | Screen reader compatibility | NVDA + VoiceOver compatible | Manual screen reader test | Pre-launch |
| NFR-ACC-04 | Color contrast (normal text) | ≥ 4.5:1 | Contrast analyzer | Design review |
| NFR-ACC-05 | Color contrast (large text) | ≥ 3:1 | Contrast analyzer | Design review |
| NFR-ACC-06 | Reduced motion | All animations respect prefers-reduced-motion | CSS audit | Pre-launch |
| NFR-ACC-07 | Focus indicators | Visible focus ring on all interactive elements | Visual inspection | Pre-launch |

---

## NFR-MAINT — Maintainability

| ID | Requirement | Target | Measurement Method | Verification |
|---|---|---|---|---|
| NFR-MAINT-01 | Test coverage (critical paths) | ≥ 80% | Coverage report | Every build |
| NFR-MAINT-02 | API documentation | 100% of endpoints in OpenAPI 3.1 | OpenAPI completeness check | Every PR |
| NFR-MAINT-03 | Schema changes via migrations | 100% — no direct schema edits | Migration audit | Every PR |
| NFR-MAINT-04 | Deployment rollback time | ≤ 15 minutes | Rollback drill | Quarterly |
| NFR-MAINT-05 | Code review coverage | 100% of production changes reviewed | PR policy enforcement | Every PR |
| NFR-MAINT-06 | Documentation currency | Docs updated within 1 sprint of feature change | Doc review in DoD | Every sprint |

---

## NFR-PRIV — Privacy

| ID | Requirement | Target | Measurement Method | Verification |
|---|---|---|---|---|
| NFR-PRIV-01 | COPPA compliance | Parental consent for under-13 before activation | Legal review + test | Pre-Beta launch |
| NFR-PRIV-02 | FERPA compliance | School controls student data; no third-party disclosure | Legal review | Pre-launch |
| NFR-PRIV-03 | GDPR right to erasure | Student data deletable within 30 days of request | Erasure test | Pre-launch |
| NFR-PRIV-04 | Data minimization | Only necessary data collected | Privacy audit | Pre-launch |
| NFR-PRIV-05 | Data residency | Student data stored in compliant regions | Infrastructure audit | Pre-launch |

---

*See `03-architecture/Auth-Security.md`, `03-architecture/Threat-Model.md`, and `03-architecture/Testing-Strategy.md` for implementation details.*
