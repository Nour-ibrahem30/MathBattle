# Incident Response Playbook — MathQuest

**Version:** 1.0.0

---

## Goals

- Resolve P0/P1 incidents within SLA targets.
- Minimize student and teacher impact during incidents.
- Ensure clear communication and accountability during incidents.
- Capture learnings to prevent recurrence.

---

## Incident Model

An incident is any unplanned event that causes or risks causing degradation to the MathQuest platform, student data, or user trust.

---

## Severity Levels

| Severity | Definition | Examples | Response SLA |
|---|---|---|---|
| P0 | Platform down or data loss | API returning 5xx for all requests; database failure; data breach | Acknowledge in 15 min; resolve in 4 hours |
| P1 | Significant degradation | Match server down; AI generation failing; login failures > 5% | Acknowledge in 30 min; resolve in 8 hours |
| P2 | Degraded performance | Slow API responses; AI generation slow; notification delays | Acknowledge in 4 hours; resolve in 24 hours |
| P3 | Minor issue | Single feature broken; cosmetic issue | Acknowledge next business day |

---

## Roles

| Role | Responsibility |
|---|---|
| Incident Commander | Coordinates response; makes decisions; communicates status |
| Technical Lead | Diagnoses root cause; implements fix |
| Communications Lead | Updates status page; notifies affected schools if needed |
| On-Call Engineer | First responder; initial triage |

---

## First 15 Minutes (P0/P1)

1. **Acknowledge** the alert in PagerDuty.
2. **Assess** severity: check dashboards, error rates, affected users.
3. **Declare** incident in Slack #incidents channel: "INCIDENT DECLARED: [brief description] — Severity: P[X] — IC: [name]"
4. **Open** incident channel: #incident-YYYY-MM-DD-[description]
5. **Assign** roles (IC, Technical Lead, Comms Lead).
6. **Update** status page: "We are investigating an issue affecting [feature]."
7. **Begin** diagnosis (see domain runbooks below).

---

## Decision Matrix

| Situation | Action |
|---|---|
| API error rate > 5% | Consider rolling back last deployment |
| Database primary down | Verify automatic failover; if not triggered, initiate manual failover |
| Data breach suspected | Immediately notify Security Lead and CTO; do not attempt to fix without security review |
| Match server down | Disable match creation; notify active match players |
| AI provider down | Disable AI features; show manual fallback message |
| Deployment caused incident | Rollback immediately; do not attempt hotfix in production |

---

## Communication Format

**Status page update template:**
```
[Time UTC] — We are [investigating / aware of] an issue affecting [feature].
Students may experience [description of impact].
We will provide an update in [X] minutes.
```

**Resolution update:**
```
[Time UTC] — The issue affecting [feature] has been resolved.
[Brief description of what happened and what was fixed.]
We apologize for the inconvenience.
```

**School notification (P0 only):**
```
Subject: MathQuest Service Disruption — [Date]
We experienced a service disruption from [start time] to [end time] UTC.
[Description of impact.]
[Description of resolution.]
No student data was lost / [description of any data impact].
```

---

## Domain Runbooks

### API Degradation
1. Check API error rate dashboard.
2. Check recent deployments (last 2 hours).
3. If deployment-related: rollback immediately.
4. Check database connection pool utilization.
5. Check Redis connectivity.
6. Check for memory/CPU spikes on API instances.
7. If memory leak: restart API instances one at a time.
8. If database issue: see Database Incident runbook.

### Database Incident
1. Check database health dashboard.
2. Check replication lag.
3. If primary down: verify automatic failover status; if not triggered, initiate manual failover.
4. If replication lag > 5 minutes: investigate network or disk I/O issues.
5. If data corruption suspected: stop writes immediately; contact Engineering Lead.
6. After recovery: verify data integrity (row counts, key record checks).

### Match Server Incident
1. Check WebSocket server health.
2. Check active connection count.
3. If server down: restart WebSocket instances.
4. Notify active match players via in-app notification: "Match interrupted. Please try again."
5. Check match state in Redis: if state preserved, matches can resume on reconnect.
6. If state lost: forfeit affected matches with no rank penalty; log affected match IDs.

### AI Worker Failure
1. Check AI worker health and job queue depth.
2. Check dead-letter queue for failed jobs.
3. If AI provider down: disable AI generation features; show manual fallback.
4. If worker crashed: restart AI worker instances.
5. Requeue failed jobs from dead-letter queue after recovery.
6. Notify affected teachers: "AI generation is temporarily unavailable."

### Security Incident
1. **Do not attempt to fix without Security Lead involvement.**
2. Immediately notify: Security Lead, Engineering Lead, CTO.
3. Preserve all logs and evidence (do not delete or modify).
4. If data breach suspected: notify Legal immediately.
5. Isolate affected systems if breach is active.
6. Follow legal notification requirements (GDPR: 72 hours; COPPA: as required).

---

## Post-Incident Review Template

**Incident ID:** INC-YYYY-MM-DD-XXX
**Severity:** P[X]
**Duration:** [start time] to [end time] UTC
**Impact:** [number of affected users, features impacted]

**Timeline:**
- [Time]: [Event]
- [Time]: [Event]

**Root Cause:** [Description]

**Contributing Factors:** [List]

**Resolution:** [What was done to resolve]

**Action Items:**
| Action | Owner | Due Date |
|---|---|---|
| [Preventive measure] | [Owner] | [Date] |

**Lessons Learned:** [What we learned]

---

## Closure Criteria

An incident is closed when:
1. The root cause is identified and documented.
2. The immediate fix is deployed and verified.
3. The status page is updated to "Resolved."
4. Affected schools are notified (P0 only).
5. A post-incident review is scheduled (P0/P1) or documented (P2).
6. Action items are logged in the backlog.

---

*See `Monitoring-Alerting-Plan.md` for alert configuration and `Backup-Recovery-Plan.md` for data recovery procedures.*
