# Service Level Objectives (SLOs) — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Measurable reliability and performance targets for MathBattle production. SLOs drive alerting thresholds and error budgets.

---

## SLI / SLO Summary

| Service | SLI | SLO Target | Measurement Window |
|---|---|---|---|
| REST API availability | Successful requests / total requests | **99.5%** | 30-day rolling |
| REST API latency | P95 response time ≤ 500ms | **95%** of requests | 30-day rolling |
| WebSocket match delivery | Round-trip ≤ 200ms | **99%** of events | 30-day rolling |
| Match completion | Matches completed / matches started | **≥ 80%** | 30-day rolling |
| Background jobs | Jobs succeeded / jobs attempted | **99%** | 30-day rolling |
| Frontend LCP | LCP ≤ 2s on 4G | **90%** of page loads | 30-day rolling |

---

## Error Budget

| SLO | Error Budget (30 days) | Action When Exhausted |
|---|---|---|
| API availability 99.5% | ~3.6 hours downtime | Feature freeze; reliability sprint |
| API latency P95 | 5% of requests may exceed 500ms | Performance investigation required |
| Match completion 80% | 20% incomplete matches allowed | WebSocket team priority review |

---

## Alerting Thresholds

| Alert | Condition | Severity | Response |
|---|---|---|---|
| API error rate | > 1% over 5 min | P1 | On-call investigates |
| API P95 latency | > 800ms over 10 min | P2 | Performance review |
| WebSocket disconnect rate | > 5% over 5 min | P1 | Match server investigation |
| DB connection pool exhausted | > 90% utilization | P1 | Scale or kill long queries |
| Redis unavailable | Any connection failure | P1 | Failover procedure |
| DLQ depth | > 10 jobs | P2 | Worker investigation |
| Uptime probe failure | 2 consecutive failures | P1 | Incident declared |

---

## Dependency SLOs (External)

| Provider | Expected Availability | Fallback |
|---|---|---|
| AI Provider (OpenAI/Anthropic) | 99.9% (provider SLA) | Retry 3×; queue for later; mock in dev |
| Email (SendGrid/Postmark) | 99.95% | Queue and retry; in-app notification as backup |
| Cloud Storage (S3) | 99.99% | Retry uploads; block import until restored |

---

## Review Cadence

| Activity | Frequency |
|---|---|
| SLO dashboard review | Weekly (engineering standup) |
| Error budget status | Bi-weekly (sprint review) |
| SLO target adjustment | Quarterly (with PM and leadership) |

---

## Dashboards

Production dashboards must display:
- Current SLO compliance (%)
- Error budget remaining
- P50/P95/P99 latency by endpoint group
- Match completion rate
- Active WebSocket connections

---

*See `NFR-Detailed.md` for full non-functional requirements and `Monitoring-Alerting-Plan.md` for tooling.*
