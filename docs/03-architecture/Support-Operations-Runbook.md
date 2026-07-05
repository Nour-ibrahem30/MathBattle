# Support Operations Runbook — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Operational procedures for support engineers and on-call staff handling common user and system issues.

---

## Support Tiers

| Tier | Scope | Team |
|---|---|---|
| L1 | Password resets, account lookups, how-to | Customer Support |
| L2 | Data issues, class roster problems, bug triage | Support + Engineering |
| L3 | System outages, security incidents, data corruption | Engineering On-Call |

---

## Common User Issues

### Student Cannot Log In

1. Verify account status in admin panel (active / suspended / pending_parental_consent)
2. If `pending_parental_consent`: resend consent email via admin action
3. If suspended: escalate to school admin
4. If password issue: trigger password reset
5. Check rate limit: max 5 failures / 15 min — wait or clear Redis key `rl:{ip}:login`

### Teacher Cannot See Class

1. Verify teacher assigned to class (`classes.teacher_user_id`)
2. Verify students enrolled (`class_students` where `left_at IS NULL`)
3. Verify school_id matches between teacher and class

### Match Stuck / Disconnected

1. Check match status in DB (`matches.status`)
2. If `active` but both disconnected > 5 min: admin can force-cancel via operator tool
3. Check Redis key `match:{matchId}:state` for stale state
4. If WebSocket server down: check ECS service health

### AI Question Generation Failed

1. Check `ai-jobs` DLQ for failed job
2. Verify `AI_PROVIDER_API_KEY` valid in Secrets Manager
3. Retry job: `npm run jobs:replay -- --queue=ai-jobs --id=<jobId>`
4. If provider outage: inform teacher; suggest manual creation

---

## System Health Checks

| Check | Command / URL | Expected |
|---|---|---|
| API health | `GET /health` | 200 `{ status: "ok" }` |
| DB connectivity | `GET /health/ready` | 200, db: connected |
| Redis | `GET /health/ready` | 200, redis: connected |
| WebSocket | Connect with test JWT | Auth success |
| Worker | Check worker heartbeat metric | < 2 min ago |

---

## Escalation Matrix

| Severity | Example | Response Time | Escalate To |
|---|---|---|---|
| SEV-1 | Full platform down | 15 min | On-call → Tech Lead |
| SEV-2 | Matches broken, login failing | 30 min | On-call |
| SEV-3 | Single feature degraded | 4 hours | L2 support |
| SEV-4 | Cosmetic / minor | Next business day | L1 support |

---

## Data Request Procedures

### Parent Requests Child Data Export
1. Verify parent identity (email matches `parental_consents.parent_email`)
2. Generate export via operator tool (Phase 2) or manual SQL (Phase 1)
3. Deliver via secure link (24-hour expiry)
4. Log action in audit trail

### School Admin Requests User Deletion
1. Verify admin role for the school
2. Initiate soft delete via admin API
3. Confirm 30-day hard delete scheduled
4. Notify admin of timeline

---

## Maintenance Windows

- Scheduled maintenance: Sundays 02:00–04:00 UTC
- Notify users 48 hours in advance via in-app banner
- Zero-downtime deploys preferred; maintenance window for DB major upgrades only

---

*See `Incident-Response-Playbook.md` for outage procedures and `Incident-Postmortem-Template.md` for post-incident docs.*
