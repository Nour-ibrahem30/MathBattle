# Delivery Risks — MathQuest

**Version:** 1.0.0

---

## Risk Register

| ID | Risk | Probability | Impact | Severity | Mitigation | Owner |
|---|---|---|---|---|---|---|
| DR-01 | AI provider not selected by Week 1 | Medium | High | High | Escalate to CTO immediately; use mock AI provider for development; AI module delayed by 2 weeks max | CTO |
| DR-02 | WebSocket match engine complexity underestimated | Medium | High | High | Spike in Week 1 to validate Socket.io approach; allocate senior backend engineer | Engineering Lead |
| DR-03 | Security audit findings require significant rework | Medium | High | High | Run SAST on every PR; address findings continuously; do not defer to Week 12 | Security + Engineering |
| DR-04 | Pilot school not identified by Week 8 | Medium | High | High | Business team to confirm pilot school by Week 4; fallback: internal test school | Business |
| DR-05 | Frontend performance targets not met | Low | Medium | Medium | Lighthouse CI on every PR; performance budget enforced from Week 1 | Frontend Lead |
| DR-06 | Database migration errors in production | Low | Critical | High | All migrations tested in staging; rollback scripts required; migration-only schema changes | Backend Lead |
| DR-07 | AI generation quality below acceptable threshold | High | Medium | High | Teacher review gate is mandatory; quality issues do not block launch | AI Engineer |
| DR-08 | Team member departure during Phase 1 | Low | High | Medium | Documentation-first culture; pair programming on high-risk modules | Engineering Lead |
| DR-09 | Legal review of privacy policy delayed | Medium | High | High | Engage legal in Week 4; privacy policy is Beta launch blocker, not MVP | Legal + Product |
| DR-10 | Load test failure at 1,000 concurrent users | Low | High | High | Performance testing from Week 8; address bottlenecks before Week 12 | DevOps |

---

## Contingency Plans

| Risk | Contingency |
|---|---|
| DR-01 (AI provider delay) | Build AI module with mock provider; swap real provider when available; no feature delay |
| DR-02 (WebSocket complexity) | Reduce match to polling-based (HTTP) for MVP if WebSocket not ready; WebSocket in Phase 2 |
| DR-03 (Security findings) | Defer non-critical findings to Phase 2; P0/P1 findings block launch |
| DR-04 (No pilot school) | Use internal test school with real teachers and students for launch validation |
| DR-06 (Migration errors) | Maintain rollback scripts for every migration; test restore procedure weekly |

---

*See `01-product/Risks-Assumptions.md` for product and business risks.*
