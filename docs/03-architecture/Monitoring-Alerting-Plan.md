# Monitoring and Alerting Plan — MathQuest

**Version:** 1.0.0

---

## Goals

1. Detect and alert on platform degradation before users are significantly impacted.
2. Provide engineering with actionable context for rapid incident resolution.
3. Track business and learning metrics alongside technical metrics.
4. Ensure compliance with SLA targets (99.5% uptime, P95 ≤ 500ms).

---

## Monitoring Principles

- Monitor outcomes (error rates, latency, availability) not just inputs (CPU, memory).
- Every alert must have a runbook entry.
- Alert on symptoms, not causes.
- Minimize alert fatigue: only page on-call for P0/P1 severity.

---

## Tooling

| Tool | Purpose |
|---|---|
| Datadog / New Relic | APM, infrastructure metrics, dashboards |
| CloudWatch (if AWS) | Infrastructure metrics, log aggregation |
| PagerDuty | On-call alerting and escalation |
| Sentry | Frontend and backend error tracking |
| Uptime Robot / Pingdom | External uptime monitoring |
| Lighthouse CI | Frontend performance monitoring |

---

## Health Checks

| Endpoint | Check | Frequency |
|---|---|---|
| GET /health | API liveness | Every 30 seconds |
| GET /health/ready | API readiness (DB + Redis connected) | Every 30 seconds |
| WebSocket /ws/health | WebSocket server liveness | Every 30 seconds |
| Database | Connection pool health | Every 60 seconds |
| Redis | Ping | Every 30 seconds |
| AI Worker | Job queue depth | Every 60 seconds |

---

## Core Metrics

### API Metrics

| Metric | Alert Threshold | Severity |
|---|---|---|
| Request rate (RPS) | Baseline ±50% | P2 |
| Error rate (5xx) | > 1% for 5 minutes | P0 |
| Error rate (4xx) | > 10% for 5 minutes | P2 |
| P95 latency | > 1 second for 5 minutes | P1 |
| P99 latency | > 2 seconds for 5 minutes | P0 |
| API instance health | Any instance unhealthy | P1 |

### WebSocket Metrics

| Metric | Alert Threshold | Severity |
|---|---|---|
| Active connections | > 8,000 per instance | P1 |
| Connection failure rate | > 5% | P1 |
| Match completion rate | < 70% for 30 minutes | P2 |
| Message delivery latency | > 500ms P95 | P1 |

### Database Metrics

| Metric | Alert Threshold | Severity |
|---|---|---|
| Replication lag | > 30 seconds | P1 |
| Connection pool utilization | > 80% | P1 |
| Query P95 latency | > 500ms | P1 |
| Disk usage | > 80% | P1 |
| Long-running queries | > 30 seconds | P2 |

### Redis Metrics

| Metric | Alert Threshold | Severity |
|---|---|---|
| Memory usage | > 80% | P1 |
| Eviction rate | > 0 (unexpected evictions) | P2 |
| Connection failures | > 0 | P0 |
| Hit rate | < 80% | P2 |

### AI Worker Metrics

| Metric | Alert Threshold | Severity |
|---|---|---|
| Job queue depth | > 50 | P2 |
| Dead-letter queue depth | > 10 | P1 |
| Job failure rate | > 10% | P1 |
| AI provider error rate | > 20% | P1 |
| Job processing time P95 | > 90 seconds | P2 |

### Business Metrics

| Metric | Alert Threshold | Severity |
|---|---|---|
| Active matches | Drop > 50% in 10 minutes | P1 |
| Lesson completions per hour | Drop > 70% vs. baseline | P2 |
| Login success rate | < 95% | P1 |
| AI generation success rate | < 80% | P2 |

---

## Alert Severity

| Severity | Description | Response Time | Notification |
|---|---|---|---|
| P0 | Platform down or data loss risk | 15 minutes | PagerDuty (immediate) |
| P1 | Significant degradation affecting users | 30 minutes | PagerDuty (immediate) |
| P2 | Degraded performance, workaround available | 4 hours | Slack #alerts |
| P3 | Minor issue, no user impact | Next business day | Slack #alerts |

---

## Alert Routing

| Alert | Route |
|---|---|
| P0 (any) | On-call engineer + Engineering Lead |
| P1 (any) | On-call engineer |
| P2 (any) | Slack #alerts channel |
| P3 (any) | Slack #alerts channel (low priority) |
| Security incident | Security Lead + Engineering Lead |
| Data breach | CTO + Legal + Engineering Lead |

---

## Dashboards

| Dashboard | Audience | Key Panels |
|---|---|---|
| Platform Health | Engineering | Error rate, latency, uptime, active users |
| Match Operations | Engineering | Active matches, completion rate, WebSocket health |
| AI Engine | Engineering | Job queue depth, generation success rate, latency |
| Business Metrics | Product + Leadership | DAU, lessons completed, matches played, teacher activity |
| Database Health | Engineering | Query latency, replication lag, connection pool |
| Security | Security + Engineering | Failed logins, rate limit hits, anti-cheat events |

---

## Logging Standard

- Format: structured JSON
- Required fields: `timestamp`, `level`, `service`, `request_id`, `message`
- No PII: email and IP hashed before logging
- Log levels: ERROR (exceptions), WARN (degraded behavior), INFO (key events), DEBUG (development only)
- Retention: 90 days hot, 1 year cold archive

---

## Runbook Mapping

| Alert | Runbook |
|---|---|
| API error rate > 1% | `Incident-Response-Playbook.md` → API Degradation |
| Database replication lag | `Incident-Response-Playbook.md` → Database Incident |
| AI worker dead-letter queue | `Incident-Response-Playbook.md` → AI Worker Failure |
| WebSocket connection failures | `Incident-Response-Playbook.md` → Match Server Incident |
| Security alert | `Incident-Response-Playbook.md` → Security Incident |

---

*See `Incident-Response-Playbook.md` for incident procedures and `Backup-Recovery-Plan.md` for recovery procedures.*
