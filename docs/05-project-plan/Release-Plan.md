# Release Plan — MathQuest

**Version:** 1.0.0

---

## Release Strategy

MathQuest uses a phased release strategy: internal testing → pilot school → general availability. Each release gate must be passed before proceeding.

---

## Release Gates

### Gate 1: Internal Alpha (End of Week 10)
- All P0 features implemented
- Unit and integration tests passing (coverage ≥ 80%)
- No critical security findings (SAST)
- Internal team can complete all primary user journeys

### Gate 2: Pilot Launch (End of Week 12)
- All P0 and P1 features implemented
- E2E tests passing for all primary journeys
- DAST security scan: zero critical/high findings
- WCAG 2.1 AA accessibility audit passed
- Load test: P95 ≤ 500ms at 1,000 concurrent users
- Privacy policy draft reviewed by legal
- Pilot school accounts created and teachers trained

### Gate 3: Beta Launch (Month 6)
- AI weakness analysis and recommendations live
- Teacher analytics dashboard complete
- Legal review of privacy policy complete and published
- ≥ 5 schools onboarded
- AI question acceptance rate ≥ 75%

### Gate 4: V1 General Availability (Month 9)
- Full gamification suite live
- Admin compliance reports available
- SOC 2 Type II audit initiated
- 99.5% uptime SLA met for 30 consecutive days
- ≥ 20 schools onboarded

---

## Release Process

1. Feature branch merged to `main` after code review and CI gates pass
2. Auto-deploy to staging
3. Staging E2E tests run automatically
4. QA sign-off on staging
5. Deploy to production (blue-green)
6. Production smoke tests run
7. Monitor for 30 minutes
8. Release notes published

---

## Rollback Procedure

1. Detect issue via monitoring or smoke test failure
2. Shift traffic back to previous (blue) deployment
3. Verify rollback successful via smoke tests
4. Investigate root cause
5. Fix and re-deploy through full release process

**Rollback time target:** ≤ 15 minutes

---

## Release Communication

| Audience | Channel | Timing |
|---|---|---|
| Engineering team | Slack #releases | On every deployment |
| Pilot schools | Email | Before major releases |
| All schools | In-app announcement | On feature releases |
| Status page | status.mathquest.io | On any incident |

---

*See `03-architecture/Deployment-Checklist.md` for the pre-deployment checklist.*
