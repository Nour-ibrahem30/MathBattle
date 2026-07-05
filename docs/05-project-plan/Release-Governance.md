# Release Governance — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Defines release cadence, approval gates, versioning, and communication for MathBattle.

---

## Release Types

| Type | Cadence | Approval | Example |
|---|---|---|---|
| MVP Release | Milestone-based | PM + Tech Lead + QA | v1.0.0-mvp |
| Patch | As needed (hotfix) | Tech Lead | v1.0.1 |
| Minor | Bi-weekly sprint end | PM + Tech Lead | v1.1.0 |
| Major | Phase milestones | Leadership | v2.0.0 |

---

## Versioning

Semantic Versioning: `MAJOR.MINOR.PATCH`

- **MAJOR:** Breaking changes, phase transitions
- **MINOR:** New features, backward compatible
- **PATCH:** Bug fixes, security patches

Pre-release tags: `v1.0.0-beta.1`, `v1.0.0-rc.1`

---

## Release Process

```
Feature Complete → Code Freeze → Staging QA → Release Approval → Production Deploy → Monitor
```

| Stage | Duration | Owner |
|---|---|---|
| Code freeze | 24 hours before release | Tech Lead |
| Staging QA | 1–2 days | QA + PM |
| Release approval | Go/No-Go meeting | PM, Tech Lead, QA |
| Production deploy | Scheduled window | On-call engineer |
| Post-release monitor | 30 min – 24 hours | On-call engineer |

---

## Go/No-Go Criteria

**Go:**
- All release-scope tickets Done
- Staging QA sign-off
- No open SEV-1/SEV-2 bugs
- Deployment checklist prepared
- On-call assigned

**No-Go:**
- Critical bug found in staging
- Migration untested
- Error budget exhausted (< 10% remaining)

---

## Communication

| Audience | Channel | Timing |
|---|---|---|
| Engineering | `#releases` | 48h before, at deploy, post-deploy |
| Stakeholders | Email summary | Post-deploy |
| Users | In-app banner (major only) | 24h before maintenance |

---

## Rollback Authority

| Severity | Who Can Rollback |
|---|---|
| SEV-1 | On-call engineer (immediate) |
| SEV-2 | On-call + Tech Lead notification |
| SEV-3 | Fix-forward preferred; rollback at Tech Lead discretion |

---

## Release Artifacts

Each release must include:
- [ ] CHANGELOG.md entry
- [ ] Git tag on `main`
- [ ] Deployment checklist completed
- [ ] Known issues documented

---

*See `Release-Plan.md` for phase timeline and `Deployment-Checklist.md` for deploy steps.*
