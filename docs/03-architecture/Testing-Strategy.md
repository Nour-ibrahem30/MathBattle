# Testing Strategy — MathBattle

**Version:** 1.0.0

---

## Goals

1. Prevent regressions in critical learning, match, and authentication flows.
2. Validate business rules (scoring, prerequisites, RBAC) with automated tests.
3. Ensure AI-generated content pipeline is reliable and produces valid output.
4. Verify security controls (JWT, RBAC, rate limiting, anti-cheat) are effective.
5. Confirm WCAG 2.1 AA accessibility compliance.
6. Validate performance targets under load.

---

## Testing Pyramid

```
                    ┌─────────────┐
                    │   E2E Tests │  (10%)
                    │  Playwright │
                   ┌┴─────────────┴┐
                   │ Integration   │  (30%)
                   │ Tests (Jest)  │
                  ┌┴───────────────┴┐
                  │   Unit Tests    │  (60%)
                  │   (Jest/Vitest) │
                  └─────────────────┘
```

---

## Recommended Tooling

| Layer | Tool | Purpose |
|---|---|---|
| Unit | Jest (backend), Vitest (frontend) | Function and module testing |
| Integration | Jest + Supertest | API endpoint testing with real DB (test container) |
| E2E | Playwright | Full user flow testing in browser |
| Load | k6 | Performance and scalability testing |
| Security | OWASP ZAP (DAST), Semgrep (SAST) | Security vulnerability scanning |
| Accessibility | axe-core (automated), manual | WCAG 2.1 AA compliance |
| Contract | Pact (Phase 2) | API contract testing between frontend and backend |
| Coverage | Istanbul/c8 | Code coverage reporting |

---

## Test Environments

| Environment | Purpose | Data |
|---|---|---|
| Local | Developer testing | Seeded test data; Docker Compose |
| CI | Automated test runs on every PR | Fresh test database per run; test containers |
| Staging | Pre-production validation | Anonymized production-like data |
| Production | Smoke tests only | Real data; read-only smoke tests |

---

## Test Data Strategy

- Unit tests: in-memory mocks and fixtures
- Integration tests: test database seeded with factory-generated data (Faker.js)
- E2E tests: dedicated test school with test students and teachers
- No production data in test environments
- Test data factories for all entities (users, questions, matches, etc.)
- Database reset between integration test suites (transaction rollback or truncate)

---

## Unit Test Scope

| Module | Key Test Cases |
|---|---|
| Auth | Password hashing, JWT generation/validation, refresh token rotation, rate limit logic |
| Match Engine | Card distribution (correct counts), scoring (correct/wrong/timeout), minimum score = 0, forfeit logic |
| Gamification | XP award amounts, rank threshold calculation, streak calculation (consecutive days, break on miss) |
| Question Bank | Status transition validation, publish validation (required fields), version increment |
| AI Engine | Prompt template rendering, response parsing, duplicate detection threshold, difficulty estimation |
| Learning Path | Prerequisite check logic, progress calculation |

**Coverage Target:** ≥ 80% line coverage for all modules; 100% for match scoring and auth logic.

---

## Integration Test Scope

| Flow | Test Cases |
|---|---|
| Registration | Valid registration, duplicate email, invalid school code, under-13 consent flow |
| Login | Valid login, invalid credentials, rate limit, suspended account |
| Lesson flow | Start lesson (with/without prerequisite), complete lesson, score calculation, XP award |
| Match creation | Same-grade match, different-grade rejection, duplicate match rejection |
| Question import | Valid CSV, duplicate detection, invalid file type, field mapping |
| AI generation | Successful generation, provider timeout, rate limit |
| RBAC | Student accessing teacher endpoint (403), teacher accessing other school (403) |
| School scope | Teacher can only see own school's data |

---

## E2E Test Scope

| Journey | Playwright Test |
|---|---|
| Student onboarding | Register → onboarding wizard → first lesson → achievement |
| Student daily session | Login → dashboard → lesson → complete → XP update |
| Match flow | Login → challenge opponent → match lobby → play 10 cards → result |
| Teacher assignment | Login → create assignment → select questions → publish → verify student notification |
| AI generation | Login → AI panel → generate 5 questions → review → approve → publish |
| Admin user management | Login → add student → deactivate teacher → export report |

---

## Security Test Scope

| Test | Tool | Frequency |
|---|---|---|
| SAST scan | Semgrep | Every PR |
| Dependency vulnerability scan | Snyk/Dependabot | Every build |
| DAST scan | OWASP ZAP | Before every release |
| JWT algorithm confusion | Manual | Pre-launch |
| IDOR test (school scope) | Manual | Pre-launch |
| Rate limit bypass | Manual | Pre-launch |
| SQL injection | OWASP ZAP | Before every release |
| XSS | OWASP ZAP | Before every release |
| Anti-cheat bypass | Manual | Pre-launch |
| Privilege escalation | Manual | Pre-launch |

---

## Accessibility Test Scope

| Test | Tool | Frequency |
|---|---|---|
| Automated WCAG scan | axe-core (Playwright integration) | Every E2E run |
| Keyboard navigation | Manual | Pre-launch and after major UI changes |
| Screen reader (NVDA) | Manual | Pre-launch |
| Screen reader (VoiceOver) | Manual | Pre-launch |
| Color contrast | Contrast analyzer | Design review |
| Reduced motion | Manual | Pre-launch |

---

## Performance Test Scope

| Test | Tool | Target | Frequency |
|---|---|---|---|
| API load test (1,000 concurrent) | k6 | P95 ≤ 500ms | Before every release |
| API stress test (10,000 concurrent) | k6 | No errors | Before V1 |
| WebSocket load test (1,000 matches) | k6 | Latency ≤ 200ms | Before Phase 2 |
| Database query performance | pgBench | P95 ≤ 100ms | Before every release |
| Dashboard load time | Lighthouse | LCP ≤ 2s | Weekly |
| AI generation latency | Custom | ≤ 15s for 5 questions | Before every release |

---

## Coverage Targets

| Layer | Target |
|---|---|
| Unit (overall) | ≥ 80% |
| Unit (match scoring) | 100% |
| Unit (auth logic) | 100% |
| Unit (gamification rules) | 100% |
| Integration (critical paths) | ≥ 90% |
| E2E (primary user journeys) | 100% of defined journeys |

---

## CI/CD Gates

| Gate | Blocks Merge | Blocks Deploy to Staging | Blocks Deploy to Production |
|---|---|---|---|
| Unit tests pass | Yes | Yes | Yes |
| Integration tests pass | Yes | Yes | Yes |
| Coverage ≥ 80% | Yes | Yes | Yes |
| SAST scan (no critical/high) | Yes | Yes | Yes |
| Dependency scan (no critical CVEs) | Yes | Yes | Yes |
| E2E tests pass | No | Yes | Yes |
| DAST scan (no critical/high) | No | No | Yes |
| Accessibility scan (no critical) | No | Yes | Yes |
| Load test (P95 ≤ 500ms) | No | No | Yes |

---

## Flakiness Control

- E2E tests use explicit waits (no fixed sleep)
- Test database reset between suites (not between individual tests)
- Flaky tests quarantined immediately; fixed within 1 sprint
- Flakiness rate target: < 1% of test runs

---

## Test Ownership

| Module | Owner |
|---|---|
| Auth, Security | Backend Lead |
| Match Engine | Backend Lead |
| Learning, Gamification | Backend Engineer |
| AI Engine | AI Engineer |
| Frontend components | Frontend Engineer |
| E2E journeys | QA Engineer |
| Performance | DevOps Engineer |
| Accessibility | Frontend Engineer + QA |

---

*See `Deployment-Operations.md` for CI/CD pipeline configuration and `Auth-Security.md` for security test details.*
