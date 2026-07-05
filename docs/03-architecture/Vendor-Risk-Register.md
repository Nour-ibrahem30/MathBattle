# Vendor Risk Register — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Tracks third-party vendor risks, mitigations, and review schedule.

---

## Risk Register

| Vendor | Service | Criticality | Risk Level | Key Risks | Mitigations | DPA Signed | Last Review |
|---|---|---|---|---|---|---|---|
| OpenAI / Anthropic | AI generation | High | Medium | Outage, cost overrun, data leakage | Mock fallback, token limits, no PII in prompts, job queue retry | Required before prod | — |
| SendGrid / Postmark | Email | Medium | Low | Deliverability, outage | Queue retry, mock in dev, secondary provider eval | Required before prod | — |
| AWS (RDS) | Database | Critical | Low | Regional outage | Multi-AZ, daily backups, cross-region snapshot | AWS DPA | — |
| AWS (ElastiCache) | Redis | Critical | Medium | Memory exhaustion, outage | LRU policy, alerts, match state rebuild from DB | AWS DPA | — |
| AWS (S3) | Storage | Medium | Low | Bucket misconfiguration | IAM least privilege, bucket policies, encryption | AWS DPA | — |
| CloudFront | CDN | High | Low | Cache poisoning | HTTPS only, signed URLs for private content | AWS DPA | — |
| Datadog | Monitoring | Medium | Low | Data exposure in logs | PII scrubbing, log exclusion rules | Required | — |
| Sentry | Error tracking | Medium | Medium | Stack traces with PII | PII scrubbing rules, before-send filter | Required | — |
| GitHub | Source control | High | Low | Secret leak | Secret scanning, branch protection | GitHub DPA | — |
| Stripe (Phase 3) | Payments | High | Medium | PCI scope, webhook fraud | Stripe-hosted checkout, webhook signature verify | Required before launch | — |

---

## Risk Scoring

| Level | Criteria |
|---|---|
| Critical | Platform unusable if vendor fails; no fallback |
| High | Major feature degraded; fallback exists but limited |
| Medium | Feature delayed; fallback available |
| Low | Minimal user impact |

---

## Review Schedule

| Activity | Frequency |
|---|---|
| Vendor SLA review | Quarterly |
| DPA renewal check | Annually |
| Penetration of vendor security docs | Annually |
| Cost review (AI provider) | Monthly |
| Failover drill (DB, Redis) | Quarterly |

---

## Vendor Exit Strategy

| Vendor | Exit Plan |
|---|---|
| AI Provider | Abstract behind `AIProviderInterface`; swap provider via env var |
| Email | Abstract behind `EmailServiceInterface`; dual-provider config |
| AWS | Infrastructure as code (Terraform/CDK); documented restore from backups |
| Datadog/Sentry | Standard metrics export; replace with alternative APM |

---

*See `Third-Party-Integrations.md` for integration details and `Compliance-Architecture.md` for DPA requirements.*
