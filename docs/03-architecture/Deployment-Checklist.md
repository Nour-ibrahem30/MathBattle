# Deployment Checklist — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Pre-Deploy

- [ ] All PRs for release merged to `main`
- [ ] CI green on `main` (lint, unit, integration)
- [ ] Database migrations reviewed and tested on staging
- [ ] OpenAPI spec matches deployed routes
- [ ] Feature flags configured for release scope
- [ ] Rollback plan documented in release ticket
- [ ] On-call engineer assigned
- [ ] Stakeholders notified in `#releases`

---

## Staging Verification

- [ ] Migrations applied successfully
- [ ] Smoke test: login (student, teacher, admin)
- [ ] Smoke test: complete one lesson
- [ ] Smoke test: start and finish one match
- [ ] Smoke test: create and publish one question
- [ ] AI generation works (or mock confirmed)
- [ ] Email delivery works (or mock confirmed)
- [ ] No error spike in Sentry/Datadog
- [ ] QA sign-off recorded

---

## Production Deploy

- [ ] Create release tag: `vX.Y.Z`
- [ ] Run database migrations (if any)
- [ ] Deploy API containers (rolling update)
- [ ] Deploy WebSocket server
- [ ] Deploy AI worker
- [ ] Deploy frontend to CDN (invalidate cache)
- [ ] Verify health endpoints: `/health`, `/health/ready`

---

## Post-Deploy Verification

- [ ] Production smoke test: login
- [ ] Production smoke test: lesson completion
- [ ] Monitor error rate for 30 minutes (< 0.1%)
- [ ] Monitor API P95 latency (< 500ms)
- [ ] Monitor WebSocket connection success rate
- [ ] No DLQ buildup
- [ ] Update CHANGELOG.md
- [ ] Announce in `#releases`

---

## Rollback Procedure

If critical issue detected within 1 hour:

1. Revert to previous container image tag
2. Rollback frontend CDN to previous build
3. If migration caused issue: deploy previous app version (migration rollback only if down script exists)
4. Declare incident; begin postmortem if SEV-1/2

---

## Environment-Specific Notes

| Environment | Deploy Trigger | Approval |
|---|---|---|
| Staging | Merge to `main` | Automatic |
| Production | Release tag | Tech Lead + PM |

---

*See `Deployment-Operations.md` for infrastructure details and `Release-Governance.md` for release process.*
