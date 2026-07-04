# Deployment and Operations — MathQuest

**Version:** 1.0.0

---

## Production Topology

```
Diagram: Production Infrastructure

Internet
    │
    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                          CDN (CloudFront/Cloudflare)                     │
│                    Static assets, frontend SPA                           │
└──────────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                     Load Balancer (ALB / Nginx)                          │
│              TLS termination, routing, health checks                     │
└──────────────────────────────────────────────────────────────────────────┘
    │                                    │
    ▼                                    ▼
┌──────────────────┐          ┌──────────────────────┐
│   REST API       │          │  WebSocket Server    │
│   (2+ instances) │          │  (2+ instances)      │
│   Auto-scaling   │          │  Sticky sessions     │
└────────┬─────────┘          └──────────┬───────────┘
         │                               │
         └───────────────┬───────────────┘
                         │
         ┌───────────────▼───────────────┐
         │         Internal Network       │
         │                               │
    ┌────▼────┐  ┌────────┐  ┌──────────┐│
    │PostgreSQL│  │ Redis  │  │ Job Queue││
    │Primary + │  │Cluster │  │ (BullMQ) ││
    │Read Rep. │  │        │  │          ││
    └──────────┘  └────────┘  └──────────┘│
         │                               │
    ┌────▼────────────────────────────────┐
    │         AI Worker Service           │
    │         (1–4 instances)             │
    └─────────────────────────────────────┘
```

---

## Components

| Component | Technology | Instances | Scaling |
|---|---|---|---|
| CDN | CloudFront or Cloudflare | Global | Automatic |
| Load Balancer | AWS ALB or Nginx | 2 (HA) | Manual |
| REST API | Node.js / NestJS | 2–8 | Auto-scaling (CPU/RPS) |
| WebSocket Server | Node.js / Socket.io | 2–4 | Auto-scaling (connections) |
| AI Worker | Node.js | 1–4 | Auto-scaling (queue depth) |
| PostgreSQL | PostgreSQL 15 | 1 primary + 1 read replica | Vertical + read replicas |
| Redis | Redis 7 | 1 primary + 1 replica | Vertical |
| Job Queue | BullMQ (Redis-backed) | Shared with Redis | — |
| Cloud Storage | AWS S3 or GCS | Managed | Automatic |

---

## Environment Separation

| Environment | Purpose | Data | Access |
|---|---|---|---|
| Local | Developer development | Seeded test data | Developer only |
| CI | Automated testing | Fresh per run | CI system only |
| Staging | Pre-production validation | Anonymized production-like | Engineering team |
| Production | Live platform | Real data | Restricted |

**Rules:**
- No production data in non-production environments
- Staging mirrors production configuration exactly
- Environment-specific secrets managed separately (never shared)

---

## Configuration and Secrets

- All secrets stored in secrets manager (AWS Secrets Manager or HashiCorp Vault)
- No secrets in code, environment files committed to version control, or logs
- `.env.example` contains placeholder names only (see root `.env.example`)
- Secrets injected at runtime via environment variables
- Secret rotation: JWT private key rotated annually; database credentials rotated quarterly

**Required Secrets:**
- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection string
- `JWT_PRIVATE_KEY` — RS256 private key for JWT signing
- `JWT_PUBLIC_KEY` — RS256 public key for JWT verification
- `AI_PROVIDER_API_KEY` — AI provider API key
- `EMAIL_SERVICE_API_KEY` — Email service API key
- `STORAGE_BUCKET_NAME` — Cloud storage bucket
- `STORAGE_ACCESS_KEY` — Cloud storage credentials

---

## Release Flow

```
Developer
    │
    ▼
Feature Branch ──► PR ──► Code Review ──► CI Gates Pass
                                                │
                                                ▼
                                          Merge to main
                                                │
                                                ▼
                                    Auto-deploy to Staging
                                                │
                                                ▼
                                    Staging E2E + Smoke Tests
                                                │
                                                ▼
                                    Manual QA Sign-off
                                                │
                                                ▼
                                    Deploy to Production (blue-green)
                                                │
                                                ▼
                                    Production Smoke Tests
                                                │
                                                ▼
                                    Monitor for 30 minutes
```

---

## Zero-Downtime Deployment

**Strategy:** Blue-green deployment for REST API and WebSocket server.

1. Deploy new version to "green" environment (separate instance set)
2. Run smoke tests against green
3. Shift 10% of traffic to green (canary)
4. Monitor error rates and latency for 5 minutes
5. If healthy: shift 100% of traffic to green
6. If unhealthy: shift all traffic back to blue (rollback in < 2 minutes)
7. Decommission blue after 30 minutes of stable green

**Database migrations:** Run before deployment; must be backward-compatible with previous version.

---

## Observability

### Logging
- Structured JSON logs (no plain text)
- Log levels: ERROR, WARN, INFO, DEBUG
- No PII in logs (email and IP hashed)
- Centralized log aggregation (CloudWatch, Datadog, or ELK)
- Log retention: 90 days hot, 1 year cold

### Metrics
- Application metrics: request rate, error rate, latency (P50/P95/P99)
- Business metrics: active matches, lessons completed, AI jobs processed
- Infrastructure metrics: CPU, memory, disk, network
- Database metrics: query time, connection pool, replication lag
- Redis metrics: hit rate, memory usage, eviction rate

### Tracing
- Distributed tracing with correlation IDs (X-Request-ID header)
- Trace all requests from API through database and external calls
- Tool: OpenTelemetry + Jaeger or Datadog APM

### Alerting
See `Monitoring-Alerting-Plan.md` for full alert configuration.

**Critical alerts (PagerDuty/on-call):**
- API error rate > 1% for 5 minutes
- P95 latency > 2 seconds for 5 minutes
- Database replication lag > 30 seconds
- WebSocket server connection failures > 5%
- AI worker dead-letter queue depth > 10

---

## Background Jobs

| Job | Trigger | Frequency | Timeout |
|---|---|---|---|
| analyze_weakness | After lesson completion | On-demand | 60s |
| generate_questions | Teacher request | On-demand | 60s |
| import_document | Teacher upload | On-demand | 120s |
| send_notification | Event trigger | On-demand | 10s |
| calculate_leaderboard | Scheduled | Every 5 minutes | 30s |
| expire_refresh_tokens | Scheduled | Daily | 60s |
| purge_soft_deleted_users | Scheduled | Daily | 120s |
| archive_audit_logs | Scheduled | Monthly | 300s |
| generate_report | Admin request | On-demand | 60s |

---

## Backup and Disaster Recovery

See `Backup-Recovery-Plan.md` for full details.

**Summary:**
- PostgreSQL: daily full backup, hourly WAL archiving
- Redis: RDB snapshots every 15 minutes
- Cloud Storage: versioning enabled
- RTO: ≤ 4 hours
- RPO: ≤ 1 hour

---

## Scalability Path

| Trigger | Action |
|---|---|
| API CPU > 70% for 5 minutes | Auto-scale: add 2 API instances |
| WebSocket connections > 5,000 per instance | Auto-scale: add WebSocket instance |
| AI job queue depth > 50 | Auto-scale: add AI worker instance |
| Database read latency > 200ms | Add read replica |
| Database write latency > 100ms | Vertical scale primary |

---

## Failure Modes and Mitigations

| Failure | Impact | Mitigation |
|---|---|---|
| API instance failure | Partial availability | Load balancer routes to healthy instances; auto-scaling replaces |
| Database primary failure | Full write outage | Automatic failover to replica (< 60s); read-only mode during failover |
| Redis failure | Cache miss, rate limiting degraded | API falls back to database; rate limiting temporarily disabled |
| AI provider outage | AI features unavailable | Graceful degradation: disable AI features; show manual fallback |
| WebSocket server failure | Active matches interrupted | Reconnect logic; match state preserved in Redis for 60s |
| Job queue failure | Async jobs delayed | Jobs persist in Redis; processed when queue recovers |

---

## Implementation Checklist

- [ ] Secrets manager configured and all secrets migrated
- [ ] CI/CD pipeline configured with all quality gates
- [ ] Blue-green deployment configured
- [ ] Auto-scaling policies configured
- [ ] Monitoring and alerting configured
- [ ] Log aggregation configured
- [ ] Backup schedule configured and tested
- [ ] Disaster recovery drill completed
- [ ] Load test at 10,000 concurrent users passed
- [ ] Security scan (DAST) passed
- [ ] Accessibility scan passed
- [ ] Smoke test suite defined and passing

---

*See `Deployment-Checklist.md` for the pre-deployment checklist and `Incident-Response-Playbook.md` for incident procedures.*
