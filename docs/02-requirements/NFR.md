# Non-Functional Requirements (NFR) — MathBattle

**Version:** 1.0.0
**Note:** This is the short quality reference. See `NFR-Detailed.md` for full specifications.

---

## Purpose
Define the quality attributes that MathBattle must meet across all phases. These requirements are non-negotiable for launch unless explicitly deferred with documented justification.

## Scope
All platform components: web frontend, REST API, WebSocket server, AI engine, background jobs, database, and infrastructure.

---

## Performance

| Requirement | Target |
|---|---|
| API response time (P95) | ≤ 500ms for standard requests |
| API response time (P99) | ≤ 1000ms |
| Page load time (P95, LCP) | ≤ 2 seconds on 4G connection |
| WebSocket match latency | ≤ 200ms round-trip |
| AI question generation (5 questions) | ≤ 15 seconds |
| Dashboard load time | ≤ 500ms (with caching) |
| Report generation | ≤ 10 seconds (sync); async with notification for larger reports |

## Usability

- Onboarding wizard completable in under 5 minutes for new students
- Teacher can create and publish an assignment in under 10 minutes
- All primary actions reachable within 3 clicks from the dashboard
- Error messages are human-readable and actionable
- Mobile-first responsive design; usable on screens ≥ 320px wide

## Reliability

| Requirement | Target |
|---|---|
| Platform uptime | ≥ 99.5% (excluding scheduled maintenance) |
| Scheduled maintenance window | ≤ 4 hours/month, off-peak hours |
| Data durability | ≥ 99.999% (no data loss) |
| Match state recovery | Resume within 30 seconds of reconnect |
| Background job retry | At least 3 retries with exponential backoff |

## Security

- OWASP Top 10 compliance
- JWT authentication with 15-minute access token expiry
- Refresh token rotation on every use
- All data encrypted in transit (TLS 1.2+) and at rest (AES-256)
- RBAC enforced on every API endpoint
- Rate limiting on all public endpoints
- Input validation and output encoding on all user-supplied data
- Anti-cheat: browser focus detection during matches
- No student PII in logs or error messages

## Scalability

| Requirement | Target |
|---|---|
| Concurrent students | 100,000 without architecture changes |
| Concurrent matches | 10,000 simultaneous |
| Question bank size | 1,000,000 questions without performance degradation |
| Horizontal scaling | Stateless API servers; scale by adding instances |

## Accessibility

- WCAG 2.1 Level AA compliance
- Keyboard navigable for all primary flows
- Screen reader compatible (ARIA labels, semantic HTML)
- Color contrast ratio ≥ 4.5:1 for normal text
- `prefers-reduced-motion` respected for all animations

## SEO

- Marketing pages: server-side rendered, meta tags, Open Graph
- Application pages: not indexed (authenticated, no SEO requirement)

## Maintainability

- Test coverage ≥ 80% for critical paths
- All API endpoints documented in OpenAPI 3.1
- All database schema changes via migrations only
- Code review required for all production changes
- Deployment rollback achievable within 15 minutes

## Availability and Stability

- Zero-downtime deployments (blue-green or rolling)
- Database backups: daily full, hourly incremental
- RTO (Recovery Time Objective): ≤ 4 hours
- RPO (Recovery Point Objective): ≤ 1 hour
- Incident response SLA: P0 acknowledged within 15 minutes

---

*See `NFR-Detailed.md` for measurable targets, verification approaches, and quality attribute test mapping.*
