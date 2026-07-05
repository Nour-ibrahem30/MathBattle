# Third-Party Integrations — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Integration Registry

| Vendor | Category | Phase | Protocol | Criticality |
|---|---|---|---|---|
| OpenAI or Anthropic | AI generation | 1 | HTTPS REST | High |
| SendGrid or Postmark | Transactional email | 1 (mock dev) | HTTPS REST | Medium |
| AWS S3 (or GCS) | Object storage | 1 | HTTPS SDK | Medium |
| CloudFront (or Cloudflare) | CDN | 1 | DNS + CDN | High |
| AWS RDS PostgreSQL | Database | 1 | TLS TCP | Critical |
| AWS ElastiCache Redis | Cache / Queue | 1 | TLS TCP | Critical |
| Datadog (or equivalent) | APM / Monitoring | 1 | HTTPS | Medium |
| Sentry | Error tracking | 1 | HTTPS | Medium |
| GitHub Actions | CI/CD | 1 | HTTPS | High |
| Stripe | Payments | 3 | HTTPS + Webhooks | Future |

---

## AI Provider

| Aspect | Detail |
|---|---|
| Candidates | OpenAI GPT-4 Turbo, Anthropic Claude 3.5 Sonnet |
| Decision | Confirm before Sprint 1 (see project plan) |
| Usage | Question generation, difficulty estimation, duplicate detection, weakness analysis (Phase 2) |
| Auth | API key in AWS Secrets Manager |
| Rate limits | Enforced at app layer: 10 req/hour/teacher |
| Data policy | No PII in prompts; review provider DPA for COPPA |
| Fallback | Mock provider in dev; queue retry in prod |
| Cost control | Token budget per request; monthly spend alert |

---

## Email Provider

| Aspect | Detail |
|---|---|
| Candidates | SendGrid, Postmark |
| Usage | Welcome, password reset, parental consent, assignment notices (Phase 2) |
| Auth | API key in Secrets Manager |
| Templates | Managed in provider dashboard; IDs in env vars |
| Dev mode | `EMAIL_PROVIDER=mock` — log to console |
| Deliverability | SPF, DKIM, DMARC configured for `mathbattle.io` domain |

---

## Cloud Storage

| Aspect | Detail |
|---|---|
| Provider | AWS S3 (primary) |
| Buckets | `mathbattle-{env}-assets`, `mathbattle-{env}-imports` |
| Access | IAM roles for ECS tasks; pre-signed URLs for client uploads |
| Encryption | SSE-S3 (AES-256) |
| Lifecycle | Import files expire after 30 days |

---

## CDN

| Aspect | Detail |
|---|---|
| Provider | CloudFront in front of S3 static hosting |
| Assets | React SPA build, achievement icons, avatar images |
| Cache | Long TTL for hashed assets; no-cache for index.html |
| Security | HTTPS only; HSTS header |

---

## Monitoring & Error Tracking

| Tool | Purpose |
|---|---|
| Datadog | APM, infrastructure metrics, SLO dashboards |
| Sentry | Frontend and backend error capture |
| UptimeRobot / Datadog Synthetics | External uptime probes |

---

## Vendor Selection Criteria

1. COPPA/FERPA-compatible data processing agreement
2. SOC 2 Type II certification (preferred)
3. SLA ≥ 99.9% for critical services
4. EU data residency option (GDPR)
5. Reasonable pricing at 100K student scale

---

*See `Vendor-Risk-Register.md` for risk assessments and `Integration-Architecture.md` for patterns.*
